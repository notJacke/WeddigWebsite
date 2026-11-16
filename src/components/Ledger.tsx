import { StyleSheet, Text, View } from 'react-native';
import type { Copy } from '@/content/wedding';
import { colors, css, fonts } from '@/theme';
import { C } from './Type';

/** Label and value rows divided by hairlines, like the back of an invitation. */
export function Ledger({ rows, onDark }: { rows: { label: string; value: Copy }[]; onDark?: boolean }) {
  const line = onDark ? colors.hairlineOnDark : colors.hairline;
  return (
    <View>
      {rows.map((row) => (
        <View key={row.label} {...css('row-md')} style={[styles.row, { borderTopColor: line }]}>
          <Text {...css('w-40-md')} style={[styles.label, onDark && { color: colors.taupe }]}>
            {row.label}
          </Text>
          <C v={row.value} style={[styles.value, onDark && { color: colors.ivory }]} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { borderTopWidth: 1, paddingVertical: 16, gap: 4 },
  label: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 28, color: colors.taupeDeep },
  value: { flex: 1, fontFamily: fonts.serif, fontSize: 21, lineHeight: 28, color: colors.charcoal },
});
