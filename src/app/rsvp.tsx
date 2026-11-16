import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Flourish } from '@/components/Art';
import { Container } from '@/components/Layout';
import { RsvpForm } from '@/components/rsvp/RsvpForm';
import { C, Eyebrow, Heading, Lead, Script } from '@/components/Type';
import { wedding } from '@/content/wedding';
import { pageMetadata } from '@/lib/seo';
import { colors, css } from '@/theme';

export function generateMetadata() {
  return pageMetadata('RSVP', 'Let us know whether you can join us for our wedding in Karlstad.', '/rsvp');
}

export default function Rsvp() {
  const [sent, setSent] = useState(false);
  return (
    <View {...css('page-head')} style={styles.page}>
      <Container style={styles.container}>
        <View style={styles.card}>
          <View style={styles.innerFrame}>
            {sent ? null : (
              <View {...css('rise')} style={styles.head}>
                <Script>Kindly reply</Script>
                <Heading level={1} size="h1" style={styles.center}>
                  RSVP
                </Heading>
                <Flourish />
                <Lead style={styles.center}>{wedding.rsvp.intro}</Lead>
                <Eyebrow style={styles.center}>
                  Please reply by: <C v={wedding.rsvp.deadline} />
                </Eyebrow>
              </View>
            )}
            <RsvpForm onSent={() => setSent(true)} />
          </View>
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { backgroundColor: colors.champagne, paddingTop: 110, paddingBottom: 56 },
  container: { maxWidth: 820, paddingHorizontal: 14 },
  card: { backgroundColor: colors.paper, padding: 8 },
  innerFrame: { borderWidth: 1, borderColor: 'rgba(181,154,99,0.55)', paddingHorizontal: 20, paddingVertical: 48 },
  head: { alignItems: 'center', gap: 14, marginBottom: 44 },
  center: { textAlign: 'center' },
});
