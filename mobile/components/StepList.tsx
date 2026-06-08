import { Image, StyleSheet, Text, View } from 'react-native';
import type { GuideStep } from '../lib/guides';
import { getGuideImageSource } from '../lib/images';
import { colors } from '../theme';
import { StepText } from './StepText';

type StepListProps = {
  steps: GuideStep[];
};

export function StepList({ steps }: StepListProps) {
  return (
    <View style={styles.list}>
      {steps.map((step, index) => {
        const imageSource = step.image
          ? getGuideImageSource(step.image.src)
          : null;

        return (
          <View key={index} style={styles.step}>
            <View style={styles.stepRow}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{index + 1}</Text>
              </View>
              <StepText step={step} />
            </View>

            {imageSource && step.image ? (
              <View
                style={
                  step.image.variant === 'icon'
                    ? styles.iconImageWrap
                    : styles.screenshotWrap
                }
              >
                <Image
                  source={imageSource}
                  accessibilityLabel={step.image.alt}
                  style={
                    step.image.variant === 'icon'
                      ? styles.iconImage
                      : styles.screenshot
                  }
                  resizeMode={
                    step.image.variant === 'icon' ? 'contain' : 'contain'
                  }
                />
              </View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 16,
  },
  step: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: 16,
  },
  stepRow: {
    flexDirection: 'row',
    gap: 16,
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  iconImageWrap: {
    marginTop: 16,
    alignItems: 'center',
  },
  iconImage: {
    width: 96,
    height: 96,
    borderRadius: 16,
  },
  screenshotWrap: {
    marginTop: 16,
  },
  screenshot: {
    width: '100%',
    height: 280,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
});
