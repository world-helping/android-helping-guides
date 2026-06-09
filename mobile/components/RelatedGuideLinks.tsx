import { Pressable, StyleSheet, Text, View } from 'react-native';
import { getGuideBySlug } from '../lib/guides';
import { GuideIcon } from './GuideIcon';
import { colors } from '../theme';

type RelatedGuideLinksProps = {
  slugs: string[];
  onPress: (slug: string) => void;
};

export function RelatedGuideLinks({ slugs, onPress }: RelatedGuideLinksProps) {
  const items = slugs
    .map((slug) => getGuideBySlug(slug))
    .filter((guide) => guide !== undefined);

  if (items.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Подробные инструкции</Text>
      <View style={styles.list}>
        {items.map((guide) => (
          <Pressable
            key={guide.slug}
            onPress={() => onPress(guide.slug)}
            style={({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel={`${guide.title}. Открыть инструкцию`}
          >
            <GuideIcon guide={guide} />
            <View style={styles.content}>
              <Text style={styles.title}>{guide.title}</Text>
              <Text style={styles.cta}>Открыть инструкцию →</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.foreground,
  },
  list: {
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: 16,
  },
  cardPressed: {
    borderColor: colors.accent,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.foreground,
    lineHeight: 26,
  },
  cta: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.accent,
  },
});
