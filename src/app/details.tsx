import type { ReactNode } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Btn } from '@/components/Btn';
import { Container, Reveal } from '@/components/Layout';
import { Ledger } from '@/components/Ledger';
import { MapPanel } from '@/components/MapPanel';
import { PageHead } from '@/components/PageHead';
import { Photo } from '@/components/Photo';
import { Body, C, CBlock, Eyebrow, Heading } from '@/components/Type';
import type { PhotoKey } from '@/content/photos';
import { copyText, isTbc, wedding, weddingDate } from '@/content/wedding';
import { pageMetadata } from '@/lib/seo';
import { colors, css, fonts } from '@/theme';

export function generateMetadata() {
  return pageMetadata('Information', 'Schema, adresser, kartor, boende, klädkod och allt annat du behöver inför dagen.', '/details');
}

const { details, venues } = wedding;
const { ceremony, reception } = venues;

const sections = [
  { id: 'schedule', label: 'Schema' },
  { id: 'where', label: 'När & var' },
  { id: 'maps', label: 'Kartor' },
  { id: 'stay', label: 'Övernattning' },
  { id: 'dress', label: 'Klädkod' },
  { id: 'more', label: 'Bra att veta' },
];

const placeLabel: Record<string, string> = { ceremony: 'Domkyrka', reception: 'Stadshotell', transfer: 'Resa' };

function jumpTo(id: string) {
  if (Platform.OS === 'web') document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function Section({ id, letter, title, children, tint }: { id: string; letter: string; title: string; children: ReactNode; tint?: boolean }) {
  return (
    <View nativeID={id} {...css('band')} style={[styles.section, tint && styles.tint]}>
      <Container>
        <View {...css('row-md', 'gap-xl-md')} style={styles.sectionRow}>
          <Reveal tokens="w-40-md sticky-md" style={styles.sectionHead}>
            <Text style={styles.letter}>{letter}</Text>
            <Heading>{title}</Heading>
          </Reveal>
          <View {...css('fill-md')}>{children}</View>
        </View>
      </Container>
    </View>
  );
}

export default function Details() {
  return (
    <View>
      <PageHead eyebrow="Allt du behöver veta" title="Information">
        <View role="list" style={styles.index}>
          {sections.map((section) => (
            <Pressable key={section.id} role="button" onPress={() => jumpTo(section.id)} {...css('choice')} style={styles.indexItem}>
              <Text style={styles.indexText}>{section.label}</Text>
            </Pressable>
          ))}
        </View>
      </PageHead>

      <Section id="schedule" letter="A" title="Dagen, timme för timme">
        <View>
          {details.schedule.map((item, index) => {
            const last = index === details.schedule.length - 1;
            return (
              <Reveal key={item.what} style={styles.timelineRow}>
                <View style={styles.timelineTime}>
                  <C v={item.time} style={styles.timeText} />
                </View>
                <View style={styles.timelineRail}>
                  <View style={[styles.dot, item.place === 'transfer' && styles.dotTravel]} />
                  {last ? null : <View style={styles.rail} />}
                </View>
                <View style={styles.timelineBody}>
                  <Text style={styles.what}>{item.what}</Text>
                  <Eyebrow style={styles.place}>{placeLabel[item.place]}</Eyebrow>
                </View>
              </Reveal>
            );
          })}
        </View>
      </Section>

      <Section id="where" letter="B" title="När, var & hur" tint>
        <View style={styles.stack}>
          <Reveal>
            <Eyebrow style={styles.ledgerHead}>Datum</Eyebrow>
            <Ledger rows={[{ label: 'Datum', value: weddingDate() }]} />
          </Reveal>
          <Reveal>
            <Eyebrow style={styles.ledgerHead}>Först, vigseln</Eyebrow>
            <Ledger
              rows={[
                { label: 'Var', value: ceremony.name },
                { label: 'Börjar', value: ceremony.time },
                { label: 'Adress', value: ceremony.address },
              ]}
            />
          </Reveal>
          <Reveal>
            <Eyebrow style={styles.ledgerHead}>Sedan, festen</Eyebrow>
            <Ledger
              rows={[
                { label: 'Var', value: reception.name },
                { label: 'Börjar', value: reception.time },
                { label: 'Adress', value: reception.address },
              ]}
            />
          </Reveal>
          <Reveal>
            <Eyebrow style={styles.ledgerHead}>Mellan platserna</Eyebrow>
            <Ledger rows={[{ label: 'Transport', value: venues.transfer }]} />
          </Reveal>
        </View>
      </Section>

      <Section id="maps" letter="C" title="Platser & kartor">
        <View style={styles.stack}>
          {[ceremony, reception].map((venue) => (
            <Reveal key={venue.name} style={styles.mapBlock}>
              <View>
                <Eyebrow>{venue.eyebrow}</Eyebrow>
                <Heading level={3} size="h3">
                  {venue.name}
                </Heading>
              </View>
              <MapPanel name={venue.name} city={venue.city} address={venue.address} query={venue.mapsQuery} />
            </Reveal>
          ))}
        </View>
      </Section>

      <Section id="stay" letter="D" title="Övernattning" tint>
        <View style={styles.stack}>
          <Reveal>
            <CBlock v={details.stay.intro}>
              <Body>{copyText(details.stay.intro)}</Body>
            </CBlock>
          </Reveal>
          {details.stay.hotels.map((hotel, index) => (
            <Reveal key={index} style={styles.hotel}>
              <Heading level={3} size="h3">
                <C v={hotel.name} />
              </Heading>
              <Ledger
                rows={[
                  { label: 'Avstånd', value: hotel.distance },
                  { label: 'Rumspris', value: hotel.rate },
                  { label: 'Boka senast', value: hotel.deadline },
                ]}
              />
              {hotel.bookingUrl ? <Btn compact variant="line" label="Boka" href={hotel.bookingUrl} external /> : null}
            </Reveal>
          ))}
          <Reveal>
            <Eyebrow style={styles.ledgerHead}>Efter festen</Eyebrow>
            <C v={details.stay.gettingBack} style={styles.bodySerif} />
          </Reveal>
        </View>
      </Section>

      <Section id="dress" letter="E" title="Klädkod">
        <View style={styles.stack}>
          <Reveal style={styles.dressText}>
            <Heading level={3} size="h3">
              <C v={details.dressCode.title} />
            </Heading>
            <CBlock v={details.dressCode.explanation}>
              <Body>{copyText(details.dressCode.explanation)}</Body>
            </CBlock>
          </Reveal>
          {details.dressCode.palette.length ? (
            <Reveal style={styles.dressText}>
              <View style={styles.swatches}>
                {details.dressCode.palette.map((swatch) => (
                  <View key={swatch.name} style={styles.swatch}>
                    <View style={[styles.swatchColor, { backgroundColor: swatch.hex }]} />
                    <Text style={styles.swatchName}>{swatch.name}</Text>
                  </View>
                ))}
              </View>
              <C v={details.dressCode.paletteNote} style={styles.note} />
            </Reveal>
          ) : null}
          <View style={styles.mood}>
            {details.dressCode.moodboard.map((name, index) => (
              <View key={name} style={[styles.moodItem, index === 1 && styles.moodDrop]}>
                <Photo name={name as PhotoKey} shape="tall" delay={index * 100} />
              </View>
            ))}
          </View>
        </View>
      </Section>

      <Section id="more" letter="F" title="Bra att veta" tint>
        <View>
          {details.extras.map((item) => (
            <Reveal key={item.title} style={styles.extra}>
              <Text style={styles.what}>{item.title}</Text>
              <C v={item.body} style={styles.extraBody} />
            </Reveal>
          ))}
          <Reveal style={styles.extra}>
            <Text style={styles.what}>{details.contact.title}</Text>
            <Text style={styles.extraBody}>
              {details.contact.body}{' '}
              {isTbc(details.contact.email) ? (
                <C v={details.contact.email} />
              ) : (
                <Text role="link" {...({ href: `mailto:${details.contact.email}` } as object)} style={styles.mail}>
                  {details.contact.email}
                </Text>
              )}
            </Text>
          </Reveal>
        </View>
      </Section>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingVertical: 80 },
  tint: { backgroundColor: colors.champagne },
  sectionRow: { gap: 40 },
  sectionHead: { gap: 10 },
  letter: { fontFamily: fonts.serifItalic, fontSize: 30, lineHeight: 36, color: colors.gold },
  stack: { gap: 48 },
  index: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10 },
  indexItem: { borderWidth: 1, borderColor: colors.hairline, paddingVertical: 10, paddingHorizontal: 16 },
  indexText: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.charcoal },
  timelineRow: { flexDirection: 'row' },
  timelineTime: { width: 112, paddingTop: 3 },
  timeText: { fontFamily: fonts.serifItalic, fontSize: 18, lineHeight: 24, color: colors.taupeDeep },
  timelineRail: { width: 28, alignItems: 'center' },
  dot: { width: 9, height: 9, borderRadius: 5, marginTop: 9, backgroundColor: colors.gold },
  dotTravel: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.gold },
  rail: { flex: 1, width: 1, marginTop: 4, backgroundColor: 'rgba(181,154,99,0.55)' },
  timelineBody: { flex: 1, paddingLeft: 10, paddingBottom: 38, gap: 4 },
  what: { fontFamily: fonts.serif, fontSize: 25, lineHeight: 31, color: colors.charcoal },
  place: { fontSize: 11, color: colors.sageDeep },
  ledgerHead: { marginBottom: 14 },
  mapBlock: { gap: 18 },
  hotel: { gap: 16 },
  bodySerif: { fontFamily: fonts.serif, fontSize: 21, lineHeight: 30, color: colors.charcoal },
  dressText: { gap: 14 },
  swatches: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  swatch: { alignItems: 'center', gap: 8 },
  swatchColor: { width: 60, height: 84, borderWidth: 1, borderColor: colors.hairline, borderRadius: 30 },
  swatchName: { fontFamily: fonts.sans, fontSize: 12, lineHeight: 16, color: colors.taupeDeep },
  note: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, color: colors.taupeDeep },
  mood: { flexDirection: 'row', gap: 12 },
  moodItem: { flex: 1 },
  moodDrop: { marginTop: 32 },
  extra: { borderTopWidth: 1, borderTopColor: colors.hairline, paddingVertical: 22, gap: 6 },
  extraBody: { fontFamily: fonts.sans, fontSize: 17, lineHeight: 28, color: colors.charcoalSoft },
  mail: { color: colors.sageDeep, textDecorationLine: 'underline' },
});
