import { StyleSheet, Text, View } from 'react-native';
import { Container } from '@/components/Layout';
import { PageHead } from '@/components/PageHead';
import { photos } from '@/content/photos';
import { pageMetadata } from '@/lib/seo';
import { colors, fonts } from '@/theme';

export function generateMetadata() {
  return pageMetadata('Fotografer', 'Upphovspersoner till fotografierna på den här webbplatsen.', '/credits');
}

const credited = Object.values(photos).filter((photo) => photo.credit);

export default function Credits() {
  return (
    <View>
      <PageHead eyebrow="Med tack" title="Fotografer" />
      <Container narrow style={styles.list}>
        {credited.map((photo) => (
          <Text key={photo.credit!.url} style={styles.row}>
            {photo.credit!.title}, {photo.credit!.author}, {photo.credit!.license}.{' '}
            <Text role="link" {...({ href: photo.credit!.url, hrefAttrs: { target: '_blank', rel: 'noopener noreferrer' } } as object)} style={styles.link}>
              Källa
            </Text>
          </Text>
        ))}
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: 14, paddingBottom: 96 },
  row: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 24, color: colors.charcoalSoft },
  link: { color: colors.sageDeep, textDecorationLine: 'underline' },
});
