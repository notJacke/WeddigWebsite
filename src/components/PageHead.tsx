import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { css } from '@/theme';
import { Sprig } from './Art';
import { Container } from './Layout';
import { Eyebrow, Heading } from './Type';

/** The opening of every inner page: a label, a large title and a sprig. */
export function PageHead({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <View {...css('page-head')} style={styles.head}>
      <Container style={styles.inner}>
        <View {...css('rise')}>
          <Eyebrow style={styles.center}>{eyebrow}</Eyebrow>
        </View>
        <View {...css('rise', 'd1')}>
          <Heading level={1} size="h1" style={styles.center}>
            {title}
          </Heading>
        </View>
        <Sprig />
        {children ? (
          <View {...css('rise', 'd2')} style={styles.intro}>
            {children}
          </View>
        ) : null}
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  head: { paddingTop: 140, paddingBottom: 48 },
  inner: { alignItems: 'center', gap: 20 },
  center: { textAlign: 'center' },
  intro: { maxWidth: 780, marginTop: 8, alignItems: 'center' },
});
