import { StyleSheet, View } from 'react-native';
import { Btn } from '@/components/Btn';
import { Body, Heading, Script } from '@/components/Type';

export default function NotFound() {
  return (
    <View style={styles.page}>
      <Script>Oh dear</Script>
      <Heading level={1} style={styles.center}>
        We can’t find that page
      </Heading>
      <Body style={styles.center}>Let’s get you back to the celebration.</Body>
      <Btn label="Back to home" href="/" arrow center />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { alignItems: 'center', justifyContent: 'center', gap: 18, paddingTop: 200, paddingBottom: 140, paddingHorizontal: 24 },
  center: { textAlign: 'center' },
});
