import Constants from 'expo-constants';
import {
  cacheDirectory,
  copyAsync,
  getContentUriAsync,
  getInfoAsync,
} from 'expo-file-system/legacy';
import * as IntentLauncher from 'expo-intent-launcher';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { Alert, Linking, Platform } from 'react-native';

export type SavePhotoResult =
  | { success: true }
  | {
      success: false;
      code: 'expo-go' | 'permission-denied' | 'unavailable' | 'failed';
      message: string;
    };

/** В Expo Go на Android сохранение в системную галерею недоступно. */
export function isGallerySaveLimited(): boolean {
  return (
    Constants.executionEnvironment === 'storeClient' ||
    Constants.appOwnership === 'expo'
  );
}

function isExpoGoMediaLibraryError(error: unknown): boolean {
  const message = errorMessage(error).toLowerCase();
  return message.includes('expo go') || message.includes('development build');
}

const TELEGRAM_PACKAGES = [
  'org.telegram.messenger',
  'org.telegram.messenger.web',
] as const;

export const MAX_PACKAGE = 'ru.oneme.app';

const PLAY_STORE_URLS = {
  telegram: 'market://details?id=org.telegram.messenger',
  max: `market://details?id=${MAX_PACKAGE}`,
} as const;

function errorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Произошла неизвестная ошибка';
}

function alertWithSettings(title: string, message: string) {
  Alert.alert(title, message, [
    { text: 'Отмена', style: 'cancel' },
    { text: 'Настройки', onPress: () => Linking.openSettings() },
  ]);
}

function normalizeUri(uri: string): string {
  if (uri.startsWith('file://') || uri.startsWith('content://')) {
    return uri;
  }

  if (uri.startsWith('/')) {
    return `file://${uri}`;
  }

  return uri;
}

export async function ensureLocalFileUri(uri: string): Promise<string> {
  const normalized = normalizeUri(uri);

  if (
    normalized.startsWith('file://') &&
    /\.(jpe?g|png|webp|heic|gif)$/i.test(normalized)
  ) {
    const info = await getInfoAsync(normalized);
    if (info.exists) {
      return normalized;
    }
  }

  if (!cacheDirectory) {
    throw new Error('Кэш приложения недоступен');
  }

  const dest = `${cacheDirectory}photo_${Date.now()}.jpg`;
  await copyAsync({ from: normalized, to: dest });

  const info = await getInfoAsync(dest);
  if (!info.exists) {
    throw new Error('Не удалось подготовить файл фото');
  }

  return dest;
}

async function requestGallerySavePermission(): Promise<boolean> {
  try {
    let permission = await MediaLibrary.getPermissionsAsync(true, ['photo']);

    if (!permission.granted) {
      permission = await MediaLibrary.requestPermissionsAsync(true, ['photo']);
    }

    if (!permission.granted) {
      permission = await MediaLibrary.requestPermissionsAsync(false, ['photo']);
    }

    return permission.granted;
  } catch (error) {
    if (isExpoGoMediaLibraryError(error)) {
      return false;
    }
    throw error;
  }
}

export async function savePhotoToGallery(uri: string): Promise<SavePhotoResult> {
  if (isGallerySaveLimited()) {
    return {
      success: false,
      code: 'expo-go',
      message:
        'Фото готово к отправке ниже. Сохранение в галерею заработает в установленной версии приложения (не в Expo Go).',
    };
  }

  try {
    const available = await MediaLibrary.isAvailableAsync();
    if (!available) {
      return {
        success: false,
        code: 'unavailable',
        message: 'На этом устройстве нельзя сохранить фото в галерею.',
      };
    }

    const hasPermission = await requestGallerySavePermission();
    if (!hasPermission) {
      if (isGallerySaveLimited()) {
        return {
          success: false,
          code: 'expo-go',
          message:
            'Фото готово к отправке ниже. Сохранение в галерею заработает в установленной версии приложения.',
        };
      }

      alertWithSettings(
        'Нужен доступ к галерее',
        'Разрешите приложению сохранять фото в настройках телефона.',
      );
      return {
        success: false,
        code: 'permission-denied',
        message: 'Нет доступа к галерее.',
      };
    }

    const localUri = await ensureLocalFileUri(uri);

    try {
      await MediaLibrary.createAssetAsync(localUri);
    } catch {
      await MediaLibrary.saveToLibraryAsync(localUri);
    }

    return { success: true };
  } catch (error) {
    if (isExpoGoMediaLibraryError(error)) {
      return {
        success: false,
        code: 'expo-go',
        message:
          'Фото готово к отправке ниже. Сохранение в галерею заработает в установленной версии приложения.',
      };
    }

    const message = errorMessage(error);
    Alert.alert(
      'Не удалось сохранить фото',
      `${message}\n\nПроверьте доступ к галерее в настройках телефона.`,
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Настройки', onPress: () => Linking.openSettings() },
      ],
    );
    return { success: false, code: 'failed', message };
  }
}

async function isPackageInstalled(packageName: string): Promise<boolean> {
  if (Platform.OS !== 'android') {
    return false;
  }

  try {
    const icon = await IntentLauncher.getApplicationIconAsync(packageName);
    return icon.length > 0;
  } catch {
    return false;
  }
}

async function findInstalledPackage(
  packageNames: readonly string[],
): Promise<string | null> {
  for (const packageName of packageNames) {
    if (await isPackageInstalled(packageName)) {
      return packageName;
    }
  }

  return null;
}

function alertInstallApp(appLabel: string, playStoreUrl: string) {
  Alert.alert(
    `${appLabel} не установлен`,
    `Установите ${appLabel}, чтобы отправить фото.`,
    [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Установить',
        onPress: () => {
          Linking.openURL(playStoreUrl).catch(() => {
            Linking.openURL(
              playStoreUrl.replace(
                'market://',
                'https://play.google.com/store/apps/',
              ),
            );
          });
        },
      },
    ],
  );
}

async function shareToAndroidPackage(packageName: string, localUri: string) {
  const contentUri = await getContentUriAsync(localUri);

  await IntentLauncher.startActivityAsync('android.intent.action.SEND', {
    type: 'image/jpeg',
    packageName,
    extra: {
      'android.intent.extra.STREAM': contentUri,
    },
    flags: 1,
  });
}

async function shareWithSystemSheet(localUri: string, dialogTitle: string) {
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(localUri, {
      dialogTitle,
      mimeType: 'image/jpeg',
    });
    return;
  }

  Alert.alert(
    'Поделиться не получилось',
    'Откройте фото в «Галерее» или «Фото» и нажмите «Поделиться».',
  );
}

async function shareSinglePhotoToApp(
  uri: string,
  target: 'telegram' | 'max' | 'other',
  dialogTitle: string,
) {
  const localUri = await ensureLocalFileUri(uri);

  if (target === 'telegram') {
    if (Platform.OS === 'android') {
      const packageName = await findInstalledPackage(TELEGRAM_PACKAGES);
      if (!packageName) {
        alertInstallApp('Telegram', PLAY_STORE_URLS.telegram);
        return;
      }

      await shareToAndroidPackage(packageName, localUri);
      return;
    }

    await shareWithSystemSheet(localUri, dialogTitle);
    return;
  }

  if (target === 'max') {
    if (Platform.OS !== 'android') {
      Alert.alert(
        'MAX доступен на Android',
        'Отправка фото в MAX поддерживается на Android-телефонах.',
      );
      return;
    }

    if (!(await isPackageInstalled(MAX_PACKAGE))) {
      alertInstallApp('MAX', PLAY_STORE_URLS.max);
      return;
    }

    await shareToAndroidPackage(MAX_PACKAGE, localUri);
    return;
  }

  await shareWithSystemSheet(localUri, dialogTitle);
}

export async function sharePhotosToApp(
  uris: string[],
  target: 'telegram' | 'max' | 'other',
) {
  if (uris.length === 0) {
    return;
  }

  const appLabel =
    target === 'telegram'
      ? 'Telegram'
      : target === 'max'
        ? 'MAX'
        : 'другие приложения';

  if (uris.length === 1) {
    try {
      await shareSinglePhotoToApp(uris[0], target, `Отправить в ${appLabel}`);
    } catch (error) {
      Alert.alert('Не удалось отправить фото', errorMessage(error));
    }
    return;
  }

  Alert.alert(
    `Отправить в ${appLabel}`,
    `Выбрано фото: ${uris.length}. Откроется окно отправки для каждого снимка по очереди. Дальше выберите получателя в ${appLabel}.`,
    [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Продолжить',
        onPress: async () => {
          for (let index = 0; index < uris.length; index++) {
            try {
              await shareSinglePhotoToApp(
                uris[index],
                target,
                `Отправить в ${appLabel} (${index + 1} из ${uris.length})`,
              );
            } catch (error) {
              Alert.alert('Не удалось отправить фото', errorMessage(error));
              break;
            }
          }
        },
      },
    ],
  );
}
