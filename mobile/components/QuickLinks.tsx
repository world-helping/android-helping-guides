import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { QuickLink } from '../lib/guides';
import { savePhotoToGallery, sharePhotosToApp } from '../lib/photoActions';
import { colors } from '../theme';

type QuickLinksProps = {
  links: QuickLink[];
};

type SelectedPhotosState = {
  selectedUris: string[];
  setSelectedUris: (uris: string[]) => void;
};

function addUniqueUris(existing: string[], incoming: string[]): string[] {
  return [...incoming, ...existing].filter(
    (uri, index, arr) => arr.indexOf(uri) === index,
  );
}

function alertWithSettings(title: string, message: string) {
  Alert.alert(title, message, [
    { text: 'Отмена', style: 'cancel' },
    { text: 'Настройки', onPress: () => Linking.openSettings() },
  ]);
}

function SelectedPhotosPanel({
  uris,
  onClear,
}: {
  uris: string[];
  onClear: () => void;
}) {
  if (uris.length === 0) {
    return null;
  }

  const clearSelection = () => {
    Alert.alert(
      'Сбросить выбор?',
      'Выбранные фото будут убраны из списка. Сами снимки в галерее останутся.',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Сбросить', style: 'destructive', onPress: onClear },
      ],
    );
  };

  return (
    <View style={styles.previewCard}>
      <View style={styles.selectedHeader}>
        <Text style={styles.selectedCount}>Выбрано фото: {uris.length}</Text>
        <Pressable
          onPress={clearSelection}
          style={({ pressed }) => [
            styles.clearButton,
            pressed && styles.clearButtonPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Сбросить выбранные фото"
        >
          <Text style={styles.clearButtonText}>Сбросить</Text>
        </Pressable>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.previewRow}
      >
        {uris.map((uri) => (
          <Image
            key={uri}
            source={{ uri }}
            style={styles.previewThumb}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      <Text style={styles.shareTitle}>Куда отправить?</Text>
      <Text style={styles.shareHint}>
        Откроется {uris.length === 1 ? 'выбранное приложение' : 'приложение'} —
        выберите, кому отправить фото.
      </Text>

      <Pressable
        onPress={() => sharePhotosToApp(uris, 'telegram')}
        style={({ pressed }) => [
          styles.button,
          styles.telegramButton,
          pressed && styles.telegramButtonPressed,
        ]}
      >
        <Text style={styles.buttonText}>✈️ Telegram</Text>
      </Pressable>

      <Pressable
        onPress={() => sharePhotosToApp(uris, 'max')}
        style={({ pressed }) => [
          styles.button,
          styles.maxButton,
          pressed && styles.maxButtonPressed,
        ]}
      >
        <Text style={styles.buttonText}>💬 MAX</Text>
      </Pressable>

      <Pressable
        onPress={() => sharePhotosToApp(uris, 'other')}
        style={({ pressed }) => [
          styles.button,
          styles.otherShareButton,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.otherShareButtonText}>Другие приложения</Text>
      </Pressable>
    </View>
  );
}

export function QuickLinks({ links }: QuickLinksProps) {
  const [selectedUris, setSelectedUris] = useState<string[]>([]);

  if (links.length === 0) {
    return null;
  }

  return (
    <View style={styles.list}>
      {links.map((link, index) => (
        <QuickLinkItem
          key={index}
          link={link}
          selectedUris={selectedUris}
          setSelectedUris={setSelectedUris}
        />
      ))}
      <SelectedPhotosPanel
        uris={selectedUris}
        onClear={() => setSelectedUris([])}
      />
    </View>
  );
}

function QuickLinkItem({
  link,
  selectedUris,
  setSelectedUris,
}: { link: QuickLink } & SelectedPhotosState) {
  if ('kind' in link) {
    switch (link.kind) {
      case 'openContacts':
        return <OpenContactsCard hint={link.hint} />;
      case 'openSms':
        return (
          <ActionCard
            label="Открыть сообщения (SMS)"
            hint={link.hint}
            onPress={() => Linking.openURL('sms:')}
          />
        );
      case 'newSms':
        return (
          <ActionCard
            label="Новое SMS"
            hint={link.hint}
            onPress={() => Linking.openURL('sms:')}
          />
        );
      case 'openCamera':
        return (
          <OpenCameraCard
            hint={link.hint}
            selectedUris={selectedUris}
            setSelectedUris={setSelectedUris}
          />
        );
      case 'openGallery':
        return (
          <OpenGalleryCard
            label={link.label}
            hint={link.hint}
            selectedUris={selectedUris}
            setSelectedUris={setSelectedUris}
          />
        );
    }
  }

  return (
    <ActionCard
      label={link.label}
      hint={link.hint}
      onPress={() => Linking.openURL(link.href)}
    />
  );
}

function ActionCard({
  label,
  hint,
  onPress,
}: {
  label: string;
  hint?: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.card}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>{label}</Text>
      </Pressable>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

function OpenContactsCard({ hint }: { hint?: string }) {
  return (
    <View style={styles.card}>
      <View style={styles.infoButton}>
        <Text style={styles.infoButtonText}>Откройте «Контакты» вручную</Text>
      </View>
      <Text style={styles.hint}>
        Приложение не может надёжно открыть «Контакты». Найдите его на главном
        экране или в списке приложений.
      </Text>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

function OpenCameraCard({
  hint,
  selectedUris,
  setSelectedUris,
}: {
  hint?: string;
} & SelectedPhotosState) {
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    kind: 'success' | 'info';
  } | null>(null);

  const openCamera = async () => {
    setStatusMessage(null);

    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        alertWithSettings(
          'Нужен доступ к камере',
          'Разрешите доступ к камере в настройках телефона.',
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 0.8,
      });

      if (result.canceled || !result.assets[0]) {
        return;
      }

      const uri = result.assets[0].uri;
      setSelectedUris(addUniqueUris(selectedUris, [uri]));

      const saveResult = await savePhotoToGallery(uri);
      if (saveResult.success) {
        setStatusMessage({
          text: 'Фото сохранено в галерею',
          kind: 'success',
        });
      } else if (saveResult.code === 'expo-go') {
        setStatusMessage({ text: saveResult.message, kind: 'info' });
      }
    } catch (error) {
      Alert.alert(
        'Ошибка камеры',
        error instanceof Error ? error.message : 'Не удалось сделать снимок.',
      );
    }
  };

  return (
    <View style={styles.card}>
      <Pressable
        onPress={openCamera}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>Открыть камеру</Text>
      </Pressable>
      {statusMessage ? (
        <Text
          style={
            statusMessage.kind === 'success'
              ? styles.successMessage
              : styles.infoMessage
          }
        >
          {statusMessage.text}
        </Text>
      ) : null}
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

function OpenGalleryCard({
  label = 'Открыть галерею',
  hint,
  selectedUris,
  setSelectedUris,
}: {
  label?: string;
  hint?: string;
} & SelectedPhotosState) {
  const openGallery = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        alertWithSettings(
          'Нужен доступ к галерее',
          'Разрешите доступ к фото в настройках телефона.',
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsMultipleSelection: true,
        selectionLimit: 0,
        quality: 0.8,
      });

      if (!result.canceled && result.assets.length > 0) {
        setSelectedUris(
          addUniqueUris(
            selectedUris,
            result.assets.map((asset) => asset.uri),
          ),
        );
      }
    } catch (error) {
      Alert.alert(
        'Ошибка галереи',
        error instanceof Error ? error.message : 'Не удалось выбрать фото.',
      );
    }
  };

  return (
    <View style={styles.card}>
      <Pressable
        onPress={openGallery}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>{label}</Text>
      </Pressable>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 16,
  },
  card: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: 16,
  },
  previewCard: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: 16,
    gap: 12,
  },
  button: {
    minHeight: 52,
    borderRadius: 12,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  buttonPressed: {
    backgroundColor: colors.accentHover,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  infoButton: {
    minHeight: 52,
    borderRadius: 12,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  infoButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.foreground,
    textAlign: 'center',
  },
  successMessage: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    color: colors.success,
  },
  infoMessage: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 24,
    color: colors.muted,
  },
  hint: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 24,
    color: colors.muted,
  },
  selectedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  selectedCount: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.foreground,
  },
  clearButton: {
    minHeight: 44,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  clearButtonPressed: {
    borderColor: colors.muted,
    backgroundColor: colors.card,
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.foreground,
  },
  shareTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.foreground,
  },
  shareHint: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.muted,
  },
  previewRow: {
    gap: 12,
  },
  previewThumb: {
    width: 120,
    height: 120,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  telegramButton: {
    backgroundColor: '#0088cc',
  },
  telegramButtonPressed: {
    backgroundColor: '#006699',
  },
  maxButton: {
    backgroundColor: '#5b6b82',
  },
  maxButtonPressed: {
    backgroundColor: '#465366',
  },
  otherShareButton: {
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.border,
  },
  otherShareButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.foreground,
    textAlign: 'center',
  },
});
