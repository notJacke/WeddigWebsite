import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { copyText, isTbc, type Copy } from '@/content/wedding';
import { mapsDirectionsUrl, mapsOpenUrl } from '@/lib/maps';
import { colors, css, fonts } from '@/theme';
import { Pin } from './Art';
import { Btn } from './Btn';
import { canEmbedMap, MapEmbed } from './MapEmbed';

type Props = { name: string; city: string; address: Copy; query: string; onDark?: boolean };

/**
 * The Google map loads only when a guest asks for it. That keeps pages fast and
 * means Google is not contacted, or cookies set, until someone chooses to see it.
 */
export function MapPanel({ name, city, address, query, onDark }: Props) {
  const [showMap, setShowMap] = useState(false);
  const [copied, setCopied] = useState<'idle' | 'done' | 'failed'>('idle');

  const copy = async () => {
    try {
      await Clipboard.setStringAsync(isTbc(address) ? `${name}, ${city}` : copyText(address));
      setCopied('done');
    } catch {
      setCopied('failed');
    }
    setTimeout(() => setCopied('idle'), 2400);
  };

  const line = onDark ? 'lightLine' : 'line';

  return (
    <View style={styles.wrap}>
      <View {...css('map-paper')} style={[styles.map, onDark && styles.mapDark]}>
        {showMap ? (
          <MapEmbed query={query} title={`Map showing ${name}`} />
        ) : (
          <View style={styles.preview}>
            <Pin color={onDark ? colors.goldLight : colors.gold} />
            <Text style={[styles.name, onDark && { color: colors.ivory }]}>{name}</Text>
            <Text style={[styles.city, onDark && { color: colors.taupe }]}>{city}</Text>
            {canEmbedMap ? <Btn compact center variant={line} label="Show map" onPress={() => setShowMap(true)} /> : null}
          </View>
        )}
      </View>
      <View style={styles.actions}>
        <Btn compact variant={line} label="Open in Google Maps" href={mapsOpenUrl(query)} external />
        <Btn compact variant={line} label="Get directions" href={mapsDirectionsUrl(query)} external />
        <Btn compact variant={line} label={copied === 'done' ? 'Copied' : copied === 'failed' ? 'Could not copy' : 'Copy address'} onPress={copy} />
      </View>
      <Text aria-live="polite" style={styles.srOnly}>
        {copied === 'done' ? 'Address copied' : ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 18 },
  map: { height: 320, backgroundColor: colors.champagne, overflow: 'hidden' },
  mapDark: { backgroundColor: 'rgba(250,246,239,0.07)' },
  preview: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, padding: 20 },
  name: { fontFamily: fonts.serif, fontSize: 26, lineHeight: 32, color: colors.charcoal, textAlign: 'center', marginTop: 8 },
  city: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, color: colors.taupeDeep, marginBottom: 12 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  srOnly: { position: 'absolute', width: 1, height: 1, overflow: 'hidden', opacity: 0 },
});
