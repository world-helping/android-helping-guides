import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GuideCard } from '../components/GuideCard';
import { QuickActionButton } from '../components/QuickActionButton';
import { getCatalogGuides, getSubGuides } from '../lib/guides';
import { openSmsInbox } from '../lib/smsActions';
import type { RootStackParamList } from '../navigation';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            Простые инструкции для вашего телефона
          </Text>
          <Text style={styles.heroText}>
            Крупный текст, понятные шаги и кнопки быстрого перехода в нужные
            приложения. Откройте нужную тему ниже.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Быстрые действия</Text>
          <View style={styles.quickActions}>
            <QuickActionButton
              icon="📤"
              label="Отправить фото"
              description="Сделать снимок или выбрать из галереи"
              onPress={() => navigation.navigate('SendPhoto')}
            />
            <QuickActionButton
              icon="💰"
              label="Узнать баланс"
              description="Проверить остаток на счёте телефона"
              onPress={() => navigation.navigate('Guide', { slug: 'balance' })}
            />
            <QuickActionButton
              icon="💬"
              label="SMS сообщения"
              description="Открыть входящие сообщения"
              onPress={() => openSmsInbox()}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Все гайды</Text>
          <View style={styles.guideList}>
            {getCatalogGuides().map((guide) => (
              <View key={guide.slug} style={styles.guideGroup}>
                <GuideCard
                  guide={guide}
                  onPress={() =>
                    navigation.navigate('Guide', { slug: guide.slug })
                  }
                />
                {getSubGuides(guide.slug).map((subGuide) => (
                  <GuideCard
                    key={subGuide.slug}
                    guide={subGuide}
                    nested
                    onPress={() =>
                      navigation.navigate('Guide', { slug: subGuide.slug })
                    }
                  />
                ))}
              </View>
            ))}
          </View>
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
  hero: {
    borderRadius: 16,
    backgroundColor: colors.accent,
    padding: 24,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    lineHeight: 34,
  },
  heroText: {
    marginTop: 12,
    fontSize: 18,
    lineHeight: 28,
    color: 'rgba(255,255,255,0.95)',
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.foreground,
  },
  quickActions: {
    gap: 12,
  },
  guideList: {
    gap: 16,
  },
  guideGroup: {
    gap: 12,
  },
});
