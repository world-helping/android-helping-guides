import { Image, StyleSheet, Text, View } from 'react-native';
import type { Guide } from '../lib/guides';
import { getGuideImageSource } from '../lib/images';

type GuideIconProps = {
  guide: Pick<Guide, 'icon' | 'iconSrc'>;
  size?: 'card' | 'header';
};

export function GuideIcon({ guide, size = 'card' }: GuideIconProps) {
  const iconSource = guide.iconSrc ? getGuideImageSource(guide.iconSrc) : null;

  if (iconSource) {
    return (
      <Image
        source={iconSource}
        style={size === 'header' ? styles.headerImage : styles.cardImage}
        accessibilityLabel={guide.icon}
        resizeMode="contain"
      />
    );
  }

  return (
    <Text
      style={size === 'header' ? styles.headerEmoji : styles.cardEmoji}
      accessibilityElementsHidden
    >
      {guide.icon}
    </Text>
  );
}

const styles = StyleSheet.create({
  cardImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  headerImage: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  cardEmoji: {
    fontSize: 36,
    lineHeight: 40,
  },
  headerEmoji: {
    fontSize: 48,
    lineHeight: 52,
  },
});
