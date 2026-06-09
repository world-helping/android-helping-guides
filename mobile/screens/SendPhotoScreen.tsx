import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QuickLinks } from '../components/QuickLinks';
import type { QuickLink } from '../lib/guides';
import type { RootStackParamList } from '../navigation';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'SendPhoto'>;

const photoToolLinks: QuickLink[] = [
  {
    kind: 'openCamera',
    hint: 'Сделайте снимок — ниже появятся кнопки для отправки.',
  },
  {
    kind: 'openGallery',
    label: 'Выбрать фото из галереи',
    hint: 'Выберите один или несколько снимков — ниже появятся кнопки для отправки.',
  },
];

export function SendPhotoScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          onPress={() => navigation.navigate('Home')}
          style={styles.backButton}
        >
          <Text style={styles.backLink}>← На главную</Text>
        </Pressable>

        <View style={styles.header}>
          <Text style={styles.icon} accessibilityElementsHidden>
            📤
          </Text>
          <View style={styles.headerText}>
            <Text style={styles.title}>Отправить фото</Text>
            <Text style={styles.description}>
              Сделайте снимок или выберите готовое фото из галереи, затем
              отправьте в Telegram, MAX или другое приложение.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Быстрые действия</Text>
          <QuickLinks links={photoToolLinks} />
        </View>

        <View style={styles.guideLinks}>
          <Pressable
            onPress={() => navigation.navigate('Guide', { slug: 'take-photo' })}
            style={({ pressed }) => [
              styles.guideLink,
              pressed && styles.guideLinkPressed,
            ]}
          >
            <Text style={styles.guideLinkText}>
              📷 Как фотографировать? — открыть инструкцию
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('Guide', { slug: 'send-photo' })}
            style={({ pressed }) => [
              styles.guideLinkSecondary,
              pressed && styles.guideLinkSecondaryPressed,
            ]}
          >
            <Text style={styles.guideLinkSecondaryText}>
              Подробная инструкция по отправке →
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 32,
    gap: 32,
  },
  backButton: {
    minHeight: 44,
    justifyContent: 'center',
  },
  backLink: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.accent,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  icon: {
    fontSize: 48,
    lineHeight: 52,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.foreground,
    lineHeight: 34,
  },
  description: {
    marginTop: 8,
    fontSize: 18,
    lineHeight: 28,
    color: colors.muted,
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.foreground,
  },
  guideLinks: {
    gap: 12,
  },
  guideLink: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: 16,
  },
  guideLinkPressed: {
    borderColor: colors.accent,
  },
  guideLinkText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.foreground,
    lineHeight: 26,
  },
  guideLinkSecondary: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  guideLinkSecondaryPressed: {
    opacity: 0.7,
  },
  guideLinkSecondaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.accent,
  },
});
