import { Link, type Href } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, css, fonts } from '@/theme';
import { Arrow } from './Art';

type Variant = 'solid' | 'line' | 'light' | 'lightLine';

const tokens: Record<Variant, string> = {
  solid: 'btn btn-solid',
  line: 'btn btn-line',
  light: 'btn btn-light',
  lightLine: 'btn btn-light-line',
};

type Props = {
  label: string;
  variant?: Variant;
  href?: Href | string;
  external?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  busy?: boolean;
  arrow?: boolean;
  compact?: boolean;
  center?: boolean;
};

export function Btn({ label, variant = 'solid', href, external, onPress, disabled, busy, arrow, compact, center }: Props) {
  const box = [styles.base, styles[variant], compact && styles.compact, disabled && styles.disabled, center && styles.center];
  const color = variant === 'solid' || variant === 'lightLine' ? colors.ivory : colors.charcoal;

  const inner = (
    <View style={styles.row}>
      <Text {...css(busy && 'pulse')} style={[styles.label, { color }, compact && styles.labelCompact]}>
        {label}
      </Text>
      {arrow ? (
        <View {...css('btn-arrow')}>
          <Arrow color={color} />
        </View>
      ) : null}
    </View>
  );

  if (href && external) {
    const anchor = { href, hrefAttrs: { target: '_blank', rel: 'noopener noreferrer' } } as object;
    return (
      <Pressable role="link" {...anchor} {...css(tokens[variant])} style={box}>
        {inner}
      </Pressable>
    );
  }

  if (href) {
    return (
      <Link href={href as Href} asChild>
        {/* Link's asChild requires a flattened style object. */}
        <Pressable role="link" {...css(tokens[variant])} style={StyleSheet.flatten(box)}>
          {inner}
        </Pressable>
      </Link>
    );
  }
  return (
    <Pressable
      role="button"
      onPress={onPress}
      disabled={disabled}
      aria-busy={busy}
      {...css(tokens[variant])}
      style={box}
    >
      {inner}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { borderWidth: 1, paddingVertical: 18, paddingHorizontal: 34, alignSelf: 'flex-start', alignItems: 'center', justifyContent: 'center' },
  compact: { paddingVertical: 11, paddingHorizontal: 20 },
  center: { alignSelf: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  solid: { backgroundColor: colors.charcoal, borderColor: colors.charcoal },
  line: { backgroundColor: 'transparent', borderColor: colors.charcoal },
  light: { backgroundColor: colors.ivory, borderColor: colors.ivory },
  lightLine: { backgroundColor: 'transparent', borderColor: 'rgba(250,246,239,0.7)' },
  disabled: { opacity: 0.6 },
  label: { fontFamily: fonts.sansMedium, fontSize: 13, lineHeight: 18, letterSpacing: 2.2, textTransform: 'uppercase', textAlign: 'center' },
  labelCompact: { fontSize: 12, letterSpacing: 1.8 },
});
