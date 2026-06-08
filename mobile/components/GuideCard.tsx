import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Guide } from '../lib/guides';
import { colors } from '../theme';

type GuideCardProps = {
  guide: Guide;
  onPress: () => void;
};

export function GuideCard({ guide, onPress }: GuideCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      accessibilityRole="button"
      accessibilityLabel={`${guide.title}. ${guide.shortDescription}`}
    >
      <View style={styles.row}>
        <Text style={styles.icon} accessibilityElementsHidden>
          {guide.icon}
        </Text>
        <View style={styles.content}>
          <Text style={styles.title}>{guide.title}</Text>
          <Text style={styles.description}>{guide.shortDescription}</Text>
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
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  icon: {
    fontSize: 36,
    lineHeight: 40,
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
  description: {
    marginTop: 8,
    fontSize: 18,
    color: colors.muted,
    lineHeight: 26,
  },
  cta: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    color: colors.accent,
  },
});
