import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Flourish, Sprig } from '@/components/Art';
import { Btn } from '@/components/Btn';
import { Countdown } from '@/components/Countdown';
import { Container, Reveal } from '@/components/Layout';
import { Photo, PhotoImage, SampleBadge } from '@/components/Photo';
import { Body, C, CBlock, Eyebrow, Heading, Lead, Script } from '@/components/Type';
import { photos } from '@/content/photos';
import { wedding, weddingDate } from '@/content/wedding';
import { pageMetadata } from '@/lib/seo';
import { colors, css, fonts } from '@/theme';

export function generateMetadata() {
  return pageMetadata(null, wedding.site.description, '/');
}

const { home, couple, venues, location } = wedding;

export default function Home() {
  return (
    <View>
      <Hero />
      <Welcome />
      <CountdownBand />
      <TwoPlaces />
      <StoryTeaser />
      <Closing />
    </View>
  );
}

function Hero() {
  return (
    <View {...css('hero')} style={styles.hero}>
      <View {...css('kenburns')} style={StyleSheet.absoluteFill}>
        <PhotoImage name="hero" priority />
      </View>
      <View {...css('scrim')} style={StyleSheet.absoluteFill} />
      {photos.hero.placeholder ? <SampleBadge /> : null}

      <Container style={styles.heroInner}>
        <View role="heading" aria-level={1} {...css('row-md', 'wrap-md', 'center-row-md')} style={styles.heroNames}>
          <View {...css('rise')}>
            <C v={couple.partnerOne} style={styles.heroName} {...css('t-display')} />
          </View>
          <View {...css('rise', 'd1')}>
            <Text style={styles.ampersand}>&</Text>
          </View>
          <View {...css('rise', 'd2')}>
            <C v={couple.partnerTwo} style={styles.heroName} {...css('t-display')} />
          </View>
        </View>

        <View {...css('rise', 'd3')} style={styles.heroCopy}>
          <Lead style={styles.heroLead}>{home.invitation}</Lead>
          <Flourish color={colors.goldLight} />
          <Text style={styles.heroMeta}>
            <C v={weddingDate()} />  ·  {location}
          </Text>
        </View>

        <View {...css('rise', 'd4', 'row-md')} style={styles.heroButtons}>
          <Btn label="OSA" href="/rsvp" variant="light" arrow center />
          <Btn label="Läs mer om dagen" href="/details" variant="lightLine" center />
        </View>
      </Container>
    </View>
  );
}

function Welcome() {
  return (
    <View {...css('band')} style={styles.band}>
      <Container>
        <View {...css('row-md', 'gap-xl-md')} style={styles.stack}>
          <View {...css('fill-md')} style={styles.welcomeText}>
            <Reveal>
              <Eyebrow>Välkommen</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <Heading>
                <C v={home.welcomeHeading} />
              </Heading>
            </Reveal>
            <Reveal delay={200}>
              <CBlock v={home.welcomeBody}>
                <Body>{typeof home.welcomeBody === 'string' ? home.welcomeBody : home.welcomeBody.text}</Body>
              </CBlock>
            </Reveal>
            <Reveal delay={300}>
              <Script>
                <C v={home.signature} />
              </Script>
            </Reveal>
          </View>
          <View {...css('fill-md')}>
            <Photo name="welcome" shape="tall" />
          </View>
        </View>
      </Container>
    </View>
  );
}

function CountdownBand() {
  return (
    <View style={styles.countdownBand}>
      <Container narrow>
        <Reveal style={styles.countdownInner}>
          <View style={styles.sprig}>
            <Sprig />
          </View>
          <Eyebrow style={styles.center}>Nedräkning till vår dag</Eyebrow>
          <Countdown />
        </Reveal>
      </Container>
    </View>
  );
}

function TwoPlaces() {
  const places = [
    { venue: venues.ceremony, photo: 'ceremony' as const, number: 'I', tokens: 'fill-md' },
    { venue: venues.reception, photo: 'reception' as const, number: 'II', tokens: 'fill-md drop-md' },
  ];
  return (
    <View {...css('band')} style={styles.band}>
      <Container>
        <Reveal style={styles.placesHead}>
          <Eyebrow>En dag, två platser</Eyebrow>
          <Heading style={styles.center}>Från domkyrkan till festen</Heading>
        </Reveal>
        <View {...css('row-md', 'gap-lg-md')} style={styles.stack}>
          {places.map(({ venue, photo, number, tokens }, index) => (
            <View key={venue.name} {...css(...tokens.split(' '))} style={styles.place}>
              <Photo name={photo} shape="tall" delay={index * 120} />
              <Reveal delay={index * 120} style={styles.placeCaption}>
                <Text style={styles.placeNumber}>{number}</Text>
                <View style={styles.placeText}>
                  <Eyebrow>{venue.eyebrow}</Eyebrow>
                  <Heading level={3} size="h3">
                    {venue.name}
                  </Heading>
                </View>
              </Reveal>
            </View>
          ))}
        </View>
        <Reveal style={styles.centerRow}>
          <Btn label="Se platserna" href="/venues" variant="line" arrow center />
        </Reveal>
      </Container>
    </View>
  );
}

function StoryTeaser() {
  return (
    <View style={styles.story}>
      <Container>
        <View {...css('row-md', 'gap-xl-md')} style={styles.stack}>
          <View {...css('w-40-md')}>
            <Photo name="storyTeaser" shape="tall" />
          </View>
          <View {...css('fill-md', 'center-v-md')} style={styles.storyText}>
            <Reveal>
              <Eyebrow>Vår historia</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <Heading>
                <C v={home.storyQuote} />
              </Heading>
            </Reveal>
            <Reveal delay={200}>
              <Link href="/our-story" {...css('text-link')} style={styles.storyLink}>
                Läs hur allt började
              </Link>
            </Reveal>
          </View>
        </View>
      </Container>
    </View>
  );
}

function Closing() {
  return (
    <View style={styles.closing}>
      <Photo name="closing" fill />
      <View {...css('scrim-even')} style={StyleSheet.absoluteFill} />
      <Container narrow style={styles.closingInner}>
        <Reveal style={styles.closingStack}>
          <Script style={styles.closingScript}>{home.closingHeading}</Script>
          <Lead style={styles.closingBody}>{home.closingBody}</Lead>
          <Text style={styles.closingDeadline}>
            OSA senast: <C v={wedding.rsvp.deadline} />
          </Text>
          <Btn label="OSA" href="/rsvp" variant="light" arrow center />
        </Reveal>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { minHeight: 720, backgroundColor: colors.evergreen, justifyContent: 'flex-end', overflow: 'hidden' },
  heroInner: { alignItems: 'center', paddingTop: 120, paddingBottom: 56, gap: 28 },
  heroNames: { alignItems: 'center', columnGap: 28 },
  heroName: { fontFamily: fonts.serifLight, fontSize: 84, lineHeight: 84, color: colors.ivory, textAlign: 'center' },
  ampersand: { fontFamily: fonts.script, fontSize: 56, lineHeight: 62, color: colors.goldLight },
  heroCopy: { alignItems: 'center', gap: 16, maxWidth: 620 },
  heroLead: { color: colors.ivory, textAlign: 'center' },
  heroMeta: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 24, letterSpacing: 1, color: colors.ivory, textAlign: 'center' },
  heroButtons: { gap: 12, alignItems: 'center' },
  band: { paddingVertical: 84 },
  stack: { gap: 48 },
  welcomeText: { gap: 26, justifyContent: 'center' },
  countdownBand: { backgroundColor: colors.champagne, paddingVertical: 88 },
  countdownInner: { gap: 32 },
  sprig: { alignSelf: 'center' },
  center: { textAlign: 'center' },
  placesHead: { alignItems: 'center', gap: 16, marginBottom: 64 },
  place: { gap: 22 },
  placeCaption: { flexDirection: 'row', alignItems: 'flex-start', gap: 20 },
  placeNumber: { fontFamily: fonts.serifItalic, fontSize: 30, lineHeight: 36, color: colors.gold },
  placeText: { flex: 1, gap: 6 },
  centerRow: { alignItems: 'center', marginTop: 72 },
  story: { backgroundColor: colors.paper, paddingVertical: 96 },
  storyText: { gap: 26 },
  storyLink: { fontFamily: fonts.sansMedium, fontSize: 14, lineHeight: 24, letterSpacing: 0.5, color: colors.sageDeep, textDecorationLine: 'underline' },
  closing: { minHeight: 620, justifyContent: 'center', overflow: 'hidden', backgroundColor: colors.evergreen },
  closingInner: { paddingVertical: 120 },
  closingStack: { alignItems: 'center', gap: 20 },
  closingScript: { fontSize: 72, lineHeight: 88, color: colors.ivory, textAlign: 'center' },
  closingBody: { color: colors.ivory, textAlign: 'center' },
  closingDeadline: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 24, color: colors.ivory, marginBottom: 12, textAlign: 'center' },
});
