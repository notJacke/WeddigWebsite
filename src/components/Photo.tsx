import { Image } from 'expo-image';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { photos, type PhotoKey } from '@/content/photos';
import { wedding } from '@/content/wedding';
import { css, fonts } from '@/theme';
import { Reveal } from './Layout';

type Props = {
  name: PhotoKey;
  shape?: 'tall' | 'wide' | 'cine';
  style?: StyleProp<ViewStyle>;
  /** Fills its parent instead of taking its own shape. */
  fill?: boolean;
  priority?: boolean;
  delay?: number;
};

export function SampleBadge() {
  if (!wedding.site.previewMode) return null;
  return (
    <View style={styles.badge} {...{ dataSet: { tbcTag: '' } }}>
      <Text style={styles.badgeText}>Exempelfoto</Text>
    </View>
  );
}

export function PhotoImage({ name, priority }: { name: PhotoKey; priority?: boolean }) {
  const photo = photos[name];
  return (
    <Image
      source={photo.source}
      alt={photo.alt}
      contentFit="cover"
      contentPosition={photo.focus ?? 'center'}
      transition={priority ? 0 : 500}
      priority={priority ? 'high' : 'normal'}
      style={StyleSheet.absoluteFill}
    />
  );
}

export function Photo({ name, shape = 'tall', style, fill, priority, delay }: Props) {
  const inner = (
    <View {...css('photo-zoom', !fill && `photo-${shape}`)} style={[styles.frame, fill && StyleSheet.absoluteFill]}>
      <PhotoImage name={name} priority={priority} />
      {photos[name].placeholder ? <SampleBadge /> : null}
    </View>
  );
  if (fill) return inner;
  return (
    <Reveal image delay={delay} style={style}>
      {inner}
    </Reveal>
  );
}

const styles = StyleSheet.create({
  frame: { width: '100%', overflow: 'hidden', backgroundColor: '#E6DCCB' },
  badge: { position: 'absolute', left: 12, bottom: 12, paddingVertical: 4, paddingHorizontal: 8, backgroundColor: 'rgba(250,246,239,0.88)' },
  badgeText: { fontFamily: fonts.sansMedium, fontSize: 10, lineHeight: 14, letterSpacing: 1.2, textTransform: 'uppercase', color: '#6E6257' },
});
