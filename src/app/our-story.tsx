import { StyleSheet, View } from 'react-native';
import { Flourish } from '@/components/Art';
import { Btn } from '@/components/Btn';
import { Container, Reveal } from '@/components/Layout';
import { PageHead } from '@/components/PageHead';
import { Photo } from '@/components/Photo';
import { Body, C, CBlock, Eyebrow, Heading, Lead } from '@/components/Type';
import type { PhotoKey } from '@/content/photos';
import { copyText, wedding } from '@/content/wedding';
import { pageMetadata } from '@/lib/seo';
import { colors, css, fonts } from '@/theme';

export function generateMetadata() {
  return pageMetadata('Vår historia', 'Hur vi träffades, ögonblicken på vägen och varför den här dagen betyder så mycket för oss.', '/our-story');
}

const { story } = wedding;

export default function OurStory() {
  return (
    <View>
      <PageHead eyebrow="Vi två" title={story.heading}>
        <CBlock v={story.intro} center>
          <Lead style={styles.center}>{copyText(story.intro)}</Lead>
        </CBlock>
      </PageHead>

      <Container style={styles.chapters}>
        {story.chapters.map((chapter, index) => (
          <View key={chapter.label} {...css(index % 2 ? 'row-rev-md' : 'row-md', 'gap-xl-md')} style={styles.chapter}>
            <View {...css('fill-md')}>
              <Photo name={chapter.photo as PhotoKey} shape="tall" />
            </View>
            <View {...css('fill-md', 'center-v-md')} style={styles.text}>
              <Reveal>
                <C v={chapter.when} style={styles.when} />
              </Reveal>
              <Reveal delay={80}>
                <Eyebrow>{`Kapitel ${['I', 'II', 'III', 'IV', 'V', 'VI'][index] ?? index + 1}  ·  ${chapter.label}`}</Eyebrow>
              </Reveal>
              <Reveal delay={160}>
                <Heading>
                  <C v={chapter.title} />
                </Heading>
              </Reveal>
              <Reveal delay={240}>
                <CBlock v={chapter.body}>
                  <Body>{copyText(chapter.body)}</Body>
                </CBlock>
              </Reveal>
            </View>
          </View>
        ))}
      </Container>

      <Reveal style={styles.end}>
        <Flourish />
        <Heading size="h3" style={styles.center}>
          Nästa kapitel vill vi gärna dela med dig.
        </Heading>
        <Btn label="OSA" href="/rsvp" arrow center />
      </Reveal>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { textAlign: 'center' },
  chapters: { gap: 96, paddingBottom: 40 },
  chapter: { gap: 32 },
  text: { gap: 16 },
  when: { fontFamily: fonts.serifItalic, fontSize: 56, lineHeight: 60, color: colors.gold },
  end: { alignItems: 'center', gap: 26, paddingVertical: 96, paddingHorizontal: 24 },
});
