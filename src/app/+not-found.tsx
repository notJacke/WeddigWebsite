import { StyleSheet, View } from 'react-native';
import { Btn } from '@/components/Btn';
import { Body, Heading, Script } from '@/components/Type';

export default function NotFound() {
  return (
    <View style={styles.page}>
      <Script>Hoppsan</Script>
      <Heading level={1} style={styles.center}>
        Vi hittar inte den sidan
      </Heading>
      <Body style={styles.center}>Vi hjälper dig tillbaka till firandet.</Body>
      <Btn label="Till startsidan" href="/" arrow center />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { alignItems: 'center', justifyContent: 'center', gap: 18, paddingTop: 200, paddingBottom: 140, paddingHorizontal: 24 },
  center: { textAlign: 'center' },
});
