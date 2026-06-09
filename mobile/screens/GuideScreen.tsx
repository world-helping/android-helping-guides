import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GuideIcon } from '../components/GuideIcon';
import { QuickLinks } from '../components/QuickLinks';
import { RelatedGuideLinks } from '../components/RelatedGuideLinks';
import { StepList } from '../components/StepList';
import { getGuideBySlug } from '../lib/guides';
import type { RootStackParamList } from '../navigation';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Guide'>;

export function GuideScreen({ navigation, route }: Props) {
  const guide = getGuideBySlug(route.params.slug);

  if (!guide) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundTitle}>Гайд не найден</Text>
          <Pressable onPress={() => navigation.navigate('Home')}>
            <Text style={styles.backLink}>← На главную</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

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
          <GuideIcon guide={guide} size="header" />
          <View style={styles.headerText}>
            <Text style={styles.title}>{guide.title}</Text>
            <Text style={styles.description}>{guide.shortDescription}</Text>
          </View>
        </View>

        {guide.quickLinks.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Быстрые ссылки</Text>
            <Text style={styles.sectionIntro}>
              Здесь собраны быстрые действия и подсказки для этого гайда. Если
              действие недоступно, выполните шаги ниже вручную.
            </Text>
            <QuickLinks links={guide.quickLinks} />
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Пошаговая инструкция</Text>
          <StepList steps={guide.steps} />
        </View>

        {guide.tips && guide.tips.length > 0 ? (
          <View style={styles.tips}>
            <Text style={styles.tipsTitle}>Полезно знать</Text>
            {guide.tips.map((tip) => (
              <View key={tip} style={styles.tipRow}>
                <Text style={styles.tipBullet}>•</Text>
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {guide.relatedGuides && guide.relatedGuides.length > 0 ? (
          <RelatedGuideLinks
            slugs={guide.relatedGuides}
            onPress={(relatedSlug) =>
              navigation.navigate('Guide', { slug: relatedSlug })
            }
          />
        ) : null}
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
  sectionIntro: {
    fontSize: 18,
    lineHeight: 28,
    color: colors.muted,
  },
  tips: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.success,
    backgroundColor: colors.successBg,
    padding: 20,
    gap: 12,
  },
  tipsTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.successText,
  },
  tipRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
  },
  tipBullet: {
    fontSize: 18,
    lineHeight: 28,
    color: colors.successText,
  },
  tipText: {
    flex: 1,
    fontSize: 18,
    lineHeight: 28,
    color: colors.successText,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
  notFoundTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.foreground,
  },
});
