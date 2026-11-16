import { StyleSheet, Text, View } from 'react-native';
import { Btn } from '@/components/Btn';
import { Container, Reveal } from '@/components/Layout';
import { Ledger } from '@/components/Ledger';
import { MapPanel } from '@/components/MapPanel';
import { PageHead } from '@/components/PageHead';
import { Photo } from '@/components/Photo';
import { Body, C, CBlock, Eyebrow, Heading, Lead } from '@/components/Type';
import { copyText, wedding } from '@/content/wedding';
import { pageMetadata } from '@/lib/seo';
import { colors, css, fonts } from '@/theme';

export function generateMetadata() {
  return pageMetadata('Platserna', 'Vårt bröllop äger rum på två platser i Karlstad: Karlstads Domkyrka och Karlstads Stadshotell.', '/venues');
}

const { ceremony, reception, intro, transfer } = wedding.venues;

export default function Venues() {
  return (
    <View>
      <PageHead eyebrow="En dag, två platser" title="Platserna">
        <Lead style={styles.center}>{intro}</Lead>
      </PageHead>

      <Ceremony />

      <View style={styles.transfer}>
        <View style={styles.transferLine} />
        <Reveal style={styles.transferBody}>
          <Eyebrow style={styles.center}>Och sedan</Eyebrow>
          <C v={transfer} style={styles.transferText} />
        </Reveal>
        <View style={styles.transferLine} />
      </View>

      <Reception />
    </View>
  );
}

function Ceremony() {
  return (
    <View nativeID="ceremony">
      <Container>
        <Photo name="ceremony" shape="cine" priority />
        <View {...css('row-md', 'gap-xl-md')} style={styles.detail}>
          <View {...css('fill-md')} style={styles.text}>
            <Reveal style={styles.titleRow}>
              <Text style={styles.number}>I</Text>
              <View style={styles.titleText}>
                <Eyebrow>{ceremony.eyebrow}</Eyebrow>
                <Heading>{ceremony.name}</Heading>
              </View>
            </Reveal>
            <Reveal delay={100}>
              <CBlock v={ceremony.description}>
                <Body>{copyText(ceremony.description)}</Body>
              </CBlock>
            </Reveal>
            <Reveal delay={200}>
              <Ledger
                rows={[
                  { label: 'Vigseln börjar', value: ceremony.time },
                  { label: 'Adress', value: ceremony.address },
                  { label: 'Ankomst', value: ceremony.note },
                ]}
              />
            </Reveal>
          </View>
          <View {...css('fill-md')}>
            <Reveal>
              <MapPanel name={ceremony.name} city={ceremony.city} address={ceremony.address} query={ceremony.mapsQuery} />
            </Reveal>
          </View>
        </View>
      </Container>
    </View>
  );
}

function Reception() {
  return (
    <View nativeID="reception" style={styles.reception}>
      <Container>
        <View {...css('row-rev-md', 'gap-xl-md')} style={styles.receptionTop}>
          <View {...css('w-60-md')}>
            <Photo name="reception" shape="wide" />
          </View>
          <View {...css('fill-md', 'center-v-md')} style={styles.text}>
            <Reveal style={styles.titleRow}>
              <Text style={[styles.number, { color: colors.goldLight }]}>II</Text>
              <View style={styles.titleText}>
                <Eyebrow style={styles.onDarkMuted}>{reception.eyebrow}</Eyebrow>
                <Heading style={styles.onDark}>{reception.name}</Heading>
              </View>
            </Reveal>
            <Reveal delay={100}>
              <CBlock v={reception.description}>
                <Body style={styles.onDark}>{copyText(reception.description)}</Body>
              </CBlock>
            </Reveal>
          </View>
        </View>

        <View {...css('row-md', 'gap-xl-md')} style={styles.detail}>
          <View {...css('fill-md')} style={styles.text}>
            <Reveal>
              <Ledger
                onDark
                rows={[
                  { label: 'Festen börjar', value: reception.time },
                  { label: 'Adress', value: reception.address },
                  ...reception.schedule.map((item) => ({ label: item.what, value: item.time })),
                ]}
              />
            </Reveal>
            <Reveal>
              <Btn label="Hela schemat" href="/details" variant="lightLine" arrow />
            </Reveal>
          </View>
          <View {...css('fill-md')}>
            <Reveal>
              <MapPanel name={reception.name} city={reception.city} address={reception.address} query={reception.mapsQuery} onDark />
            </Reveal>
          </View>
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { textAlign: 'center' },
  detail: { gap: 48, marginTop: 56 },
  text: { gap: 28 },
  titleRow: { flexDirection: 'row', gap: 20, alignItems: 'flex-start' },
  titleText: { flex: 1, gap: 8 },
  number: { fontFamily: fonts.serifItalic, fontSize: 44, lineHeight: 52, color: colors.gold },
  transfer: { alignItems: 'center', paddingTop: 72 },
  transferLine: { width: 1, height: 72, backgroundColor: colors.gold },
  transferBody: { alignItems: 'center', gap: 10, paddingVertical: 24, paddingHorizontal: 24, maxWidth: 560 },
  transferText: { fontFamily: fonts.serifItalic, fontSize: 25, lineHeight: 34, color: colors.charcoal, textAlign: 'center' },
  reception: { backgroundColor: colors.evergreen, paddingVertical: 96 },
  receptionTop: { gap: 40 },
  onDark: { color: colors.ivory },
  onDarkMuted: { color: colors.taupe },
});
