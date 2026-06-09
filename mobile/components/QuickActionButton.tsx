import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

type QuickActionButtonProps = {
  icon: string;
  label: string;
  description: string;
  onPress: () => void;
};

export function QuickActionButton({
  icon,
  label,
  description,
  onPress,
}: QuickActionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      accessibilityRole="button"
      accessibilityLabel={`${label}. ${description}`}
    >
      <Text style={styles.icon} accessibilityElementsHidden>
        {icon}
      </Text>
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: 20,
  },
  cardPressed: {
    borderColor: colors.accent,
    backgroundColor: '#f0f6ff',
  },
  icon: {
    fontSize: 36,
    lineHeight: 40,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  label: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.foreground,
    lineHeight: 26,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.muted,
  },
});
