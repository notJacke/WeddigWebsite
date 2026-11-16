import type { ReactNode } from 'react';
import { StyleSheet, Text, View, type StyleProp, type TextStyle } from 'react-native';
import { copyText, isTbc, wedding, type Copy } from '@/content/wedding';
import { colors, css, fonts } from '@/theme';

type TextProps = { children: ReactNode; style?: StyleProp<TextStyle> };

export function Heading({
  children,
  level = 2,
  size = 'h2',
  style,
}: TextProps & { level?: 1 | 2 | 3; size?: 'display' | 'h1' | 'h2' | 'h3' }) {
  return (
    <Text role="heading" aria-level={level} {...css(`t-${size}`)} style={[styles.heading, styles[size], style]}>
      {children}
    </Text>
  );
}

export function Eyebrow({ children, style }: TextProps) {
  return <Text style={[styles.eyebrow, style]}>{children}</Text>;
}

export function Body({ children, style }: TextProps) {
  return <Text style={[styles.body, style]}>{children}</Text>;
}

export function Lead({ children, style }: TextProps) {
  return (
    <Text {...css('t-lead')} style={[styles.lead, style]}>
      {children}
    </Text>
  );
}

export function Script({ children, style }: TextProps) {
  return <Text style={[styles.script, style]}>{children}</Text>;
}

const showMarks = wedding.site.previewMode;

/** Renders content from wedding.ts, marking anything that is still a placeholder. */
export function C({ v, style }: { v: Copy; style?: StyleProp<TextStyle> }) {
  const marked = showMarks && isTbc(v);
  return (
    <Text {...(marked ? { dataSet: { tbc: '' } } : {})} style={[style, marked && styles.tbc]}>
      {copyText(v)}
    </Text>
  );
}

/** A paragraph-length placeholder, labelled instead of underlined so it stays readable. */
export function CBlock({ v, children, center }: { v: Copy; children: ReactNode; center?: boolean }) {
  return (
    <View>
      {showMarks && isTbc(v) ? <SampleTag center={center} /> : null}
      {children}
    </View>
  );
}

export function SampleTag({ label = 'Exempeltext', onDark, center }: { label?: string; onDark?: boolean; center?: boolean }) {
  return (
    <Text {...{ dataSet: { tbcTag: '' } }} style={[styles.tag, onDark && { color: colors.goldLight }, center && { alignSelf: 'center' }]}>
      {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  heading: { fontFamily: fonts.serifLight, color: colors.charcoal },
  display: { fontSize: 84, lineHeight: 80 },
  h1: { fontSize: 52, lineHeight: 54 },
  h2: { fontSize: 40, lineHeight: 44 },
  h3: { fontSize: 28, lineHeight: 33, fontFamily: fonts.serif },
  eyebrow: {
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: colors.taupeDeep,
  },
  body: { fontFamily: fonts.sans, fontSize: 17, lineHeight: 29, color: colors.charcoalSoft },
  lead: { fontFamily: fonts.serifItalic, fontSize: 23, lineHeight: 32, color: colors.charcoal },
  script: { fontFamily: fonts.script, fontSize: 40, lineHeight: 48, color: colors.gold },
  tbc: { textDecorationLine: 'underline', textDecorationStyle: 'dotted', textDecorationColor: colors.gold },
  tag: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    fontFamily: fonts.sansMedium,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: colors.gold,
  },
});
