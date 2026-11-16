import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { hasPlaceholderPhotos } from '@/content/photos';
import { listPlaceholders, wedding, weddingDate } from '@/content/wedding';
import { colors, css, fonts } from '@/theme';
import { Flourish } from './Art';
import { Container } from './Layout';
import { navItems } from './Nav';
import { C } from './Type';

const showNotice = wedding.site.previewMode && (listPlaceholders().length > 0 || hasPlaceholderPhotos);

export function Footer() {
  return (
    <View>
      {showNotice ? (
        <View style={styles.notice} {...{ dataSet: { previewNotice: '' } }}>
          <Container>
            <Text style={styles.noticeText}>
              <Text style={styles.noticeStrong}>Preview. </Text>
              Details with a <Text style={styles.noticeMark}>dotted underline</Text>, and anything labelled “sample”, are placeholders and not confirmed.
            </Text>
          </Container>
        </View>
      ) : null}
      <View role="contentinfo" style={styles.footer}>
        <Container style={styles.inner}>
          <Text style={styles.names}>
            <C v={wedding.couple.partnerOne} /> & <C v={wedding.couple.partnerTwo} />
          </Text>
          <Flourish color={colors.goldLight} />
          <Text style={styles.meta}>
            <C v={weddingDate()} />  ·  {wedding.location}
          </Text>
          <View {...css('row-md')} style={styles.links}>
            {[...navItems, { label: 'RSVP', href: '/rsvp' as const }].map((item) => (
              <Link key={item.label} href={item.href} {...css('text-link')} style={styles.link}>
                {item.label}
              </Link>
            ))}
          </View>
          <Link href="/credits" {...css('text-link')} style={styles.credit}>
            Photo credits
          </Link>
        </Container>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notice: { backgroundColor: colors.champagne, paddingVertical: 14 },
  noticeText: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: colors.charcoalSoft, textAlign: 'center' },
  noticeStrong: { fontFamily: fonts.sansMedium },
  noticeMark: { textDecorationLine: 'underline', textDecorationStyle: 'dotted', textDecorationColor: colors.gold },
  footer: { backgroundColor: colors.evergreen, paddingVertical: 72 },
  inner: { alignItems: 'center', gap: 22 },
  names: { fontFamily: fonts.script, fontSize: 52, lineHeight: 64, color: colors.ivory, textAlign: 'center' },
  meta: { fontFamily: fonts.serifItalic, fontSize: 20, lineHeight: 28, color: colors.ivory, textAlign: 'center' },
  links: { gap: 28, alignItems: 'center', marginTop: 14 },
  link: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, color: colors.ivory, letterSpacing: 0.5 },
  credit: { fontFamily: fonts.sans, fontSize: 12, lineHeight: 18, color: colors.taupe },
});
