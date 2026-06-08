import type { ImageSourcePropType } from 'react-native';
import { guideImages } from './guideImages';

export function getGuideImageSource(src: string): ImageSourcePropType | null {
  return guideImages[src] ?? null;
}
