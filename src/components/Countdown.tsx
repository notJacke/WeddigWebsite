import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { wedding } from '@/content/wedding';
import { timeUntil, type Remaining } from '@/lib/countdown';
import { colors, css, fonts } from '@/theme';
import { Eyebrow } from './Type';

const units = ['days', 'hours', 'minutes', 'seconds'] as const;
const unitLabels: Record<(typeof units)[number], string> = { days: 'dagar', hours: 'timmar', minutes: 'minuter', seconds: 'sekunder' };

export function Countdown() {
  const iso = wedding.date.iso;
  // Stays null until mounted, so the pre-rendered page never shows a stale time.
  const [left, setLeft] = useState<Remaining | null>(null);

  useEffect(() => {
    if (!iso) return;
    const tick = () => setLeft(timeUntil(iso, Date.now()));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [iso]);

  if (left?.done) {
    return <Text style={styles.message}>Idag är dagen.</Text>;
  }

  return (
    <View>
      <View style={styles.row} role="timer" aria-label="Tid kvar till bröllopet">
        {units.map((unit, index) => {
          const value = left ? String(left[unit]).padStart(unit === 'days' ? 1 : 2, '0') : '–';
          return (
            <View key={unit} style={[styles.unit, index > 0 && styles.divider]}>
              <Text key={value} {...css('t-numeral', !!left && unit === 'seconds' && 'tick')} style={styles.number} {...{ 'aria-hidden': unit === 'seconds' }}>
                {value}
              </Text>
              <Eyebrow style={styles.label}>{unitLabels[unit]}</Eyebrow>
            </View>
          );
        })}
      </View>
      {iso ? null : <Text style={styles.waiting}>Nedräkningen börjar när vårt datum är bestämt.</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', width: '100%' },
  unit: { flex: 1, alignItems: 'center', gap: 10, paddingHorizontal: 4 },
  divider: { borderLeftWidth: 1, borderLeftColor: 'rgba(181,154,99,0.5)' },
  number: { fontFamily: fonts.serifLight, fontSize: 44, lineHeight: 48, color: colors.charcoal },
  label: { fontSize: 10, letterSpacing: 2 },
  message: { fontFamily: fonts.serifItalic, fontSize: 40, lineHeight: 48, color: colors.charcoal, textAlign: 'center' },
  waiting: { marginTop: 28, fontFamily: fonts.serifItalic, fontSize: 20, lineHeight: 28, color: colors.taupeDeep, textAlign: 'center' },
});
