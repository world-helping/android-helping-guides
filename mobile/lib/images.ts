import type { ImageSourcePropType } from 'react-native';
import { appIcons } from './appIcons';
import { guideImages } from './guideImages';

export function getGuideImageSource(src: string): ImageSourcePropType | null {
  return guideImages[src] ?? appIcons[src] ?? null;
}
