import { useEffect, useRef, useState, type ComponentRef, type ReactNode } from 'react';
import { Platform, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { css } from '@/theme';

/** Centred content column with responsive side gutters. */
export function Container({ children, style, narrow }: { children: ReactNode; style?: StyleProp<ViewStyle>; narrow?: boolean }) {
  return (
    <View {...css('gutter')} style={[styles.container, narrow && styles.narrow, style]}>
      {children}
    </View>
  );
}

/** Fades content in the first time it scrolls into view. */
export function Reveal({
  children,
  style,
  image,
  delay = 0,
  tokens = '',
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  image?: boolean;
  delay?: number;
  tokens?: string;
}) {
  const ref = useRef<ComponentRef<typeof View>>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current as unknown as Element | null;
    if (Platform.OS !== 'web' || !node || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const state = shown ? 'in' : image ? 'out-image' : 'out';
  return (
    <View
      ref={ref}
      {...({ dataSet: { reveal: state, r: tokens } } as object)}
      style={[delay ? ({ transitionDelay: `${delay}ms` } as ViewStyle) : null, style]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', maxWidth: 1320, alignSelf: 'center', paddingHorizontal: 24 },
  narrow: { maxWidth: 860 },
});
