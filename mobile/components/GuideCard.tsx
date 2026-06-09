import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Guide } from '../lib/guides';
import { colors } from '../theme';
import { GuideIcon } from './GuideIcon';

type GuideCardProps = {
  guide: Guide;
  onPress: () => void;
  nested?: boolean;
};

export function GuideCard({ guide, onPress, nested = false }: GuideCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        nested && styles.cardNested,
        pressed && styles.cardPressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${guide.title}. ${guide.shortDescription}`}
    >
      <View style={styles.row}>
        <GuideIcon guide={guide} />
        <View style={styles.content}>
          <Text style={[styles.title, nested && styles.titleNested]}>
            {guide.title}
          </Text>
          <Text style={[styles.description, nested && styles.descriptionNested]}>
            {guide.shortDescription}
          </Text>
          <Text style={styles.cta}>Открыть инструкцию →</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: 20,
  },
  cardPressed: {
    borderColor: colors.accent,
  },
  cardNested: {
    marginLeft: 20,
    padding: 16,
    borderStyle: 'dashed',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.foreground,
    lineHeight: 26,
  },
  titleNested: {
    fontSize: 18,
  },
  description: {
    marginTop: 8,
    fontSize: 18,
    color: colors.muted,
    lineHeight: 26,
  },
  descriptionNested: {
    fontSize: 16,
  },
  cta: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    color: colors.accent,
  },
});
