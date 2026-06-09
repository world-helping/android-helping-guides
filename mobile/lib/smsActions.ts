import * as IntentLauncher from 'expo-intent-launcher';
import { Alert, Linking, Platform } from 'react-native';

export async function openSmsInbox(): Promise<void> {
  if (Platform.OS === 'android') {
    try {
      await IntentLauncher.startActivityAsync('android.intent.action.MAIN', {
        category: 'android.intent.category.APP_MESSAGING',
      });
      return;
    } catch {
      // fall through to Linking
    }
  }

  try {
    await Linking.openURL('sms:');
  } catch {
    Alert.alert(
      'Не удалось открыть сообщения',
      'Найдите приложение «Сообщения» на главном экране.',
    );
  }
}

export async function openNewSms(): Promise<void> {
  try {
    await Linking.openURL('sms:');
  } catch {
    Alert.alert(
      'Не удалось открыть сообщения',
      'Найдите приложение «Сообщения» на главном экране.',
    );
  }
}
