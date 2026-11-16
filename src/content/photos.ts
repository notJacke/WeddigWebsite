/**
 * Every photograph on the site.
 *
 * To use your own: put the image in assets/photos/, point `source` at it, update
 * `alt` to describe it, set `placeholder: false` and delete `credit`.
 * `focus` picks the part of the photo that stays visible when cropped, e.g. 'top' or 'left'.
 *
 * The current images are freely licensed samples from Wikimedia Commons.
 * The credits appear on /credits, as their licenses require, until they are replaced.
 */

import type { ImageContentPosition } from 'expo-image';

type Credit = { title: string; author: string; license: string; url: string };
type PhotoEntry = { source: number; alt: string; placeholder: boolean; focus?: ImageContentPosition; credit?: Credit };

const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`;

const entries = {
  hero: {
    source: require('../../assets/photos/hero.webp'),
    alt: 'A bride and groom embracing outdoors, her veil catching the light',
    placeholder: true,
    focus: 'top',
    credit: { title: 'Wedding couple at old building', author: 'Scott Webb', license: 'CC0', url: commons('Wedding_couple_at_old_building_(Unsplash_BLx6ystEhk).jpg') },
  },
  welcome: {
    source: require('../../assets/photos/welcome.webp'),
    alt: 'A couple leaning close together with a bouquet of pale roses',
    placeholder: true,
    credit: { title: 'Couple embraces with a bouquet of roses', author: 'Shixart1985', license: 'CC BY 2.0', url: commons('Couple_embraces_with_a_bouquet_of_roses_at_an_outdoor_wedding.jpg') },
  },
  ceremony: {
    source: require('../../assets/photos/ceremony.webp'),
    alt: 'The white walls of Karlstads Domkyrka framed by green trees',
    placeholder: true,
    credit: { title: 'Karlstads domkyrka view2', author: 'Håkan Svensson (Xauxa)', license: 'CC BY 2.5', url: commons('Karlstads_domkyrka_view2.jpg') },
  },
  reception: {
    source: require('../../assets/photos/reception.webp'),
    alt: 'The yellow facade of the Stadshotell in Karlstad reflected in the river',
    placeholder: true,
    credit: { title: 'Stadshotellet, Karlstad 01', author: 'I99pema', license: 'CC BY-SA 4.0', url: commons('Stadshotellet,_Karlstad_01.jpg') },
  },
  storyTeaser: {
    source: require('../../assets/photos/storyTeaser.webp'),
    alt: 'Black and white photograph of hands and a wedding band',
    placeholder: true,
    credit: { title: 'Groom touching wedding band', author: 'Sweet Ice Cream Photography', license: 'CC0', url: commons('Groom_touching_wedding_band_(Unsplash).jpg') },
  },
  storyMet: {
    source: require('../../assets/photos/storyMet.webp'),
    alt: 'A vintage illustration of a couple sitting together on a garden bench',
    placeholder: true,
    credit: { title: 'Flower Wedding', author: 'Walter Crane', license: 'Public domain', url: commons('Flower_Wedding_Master_Files_0006.jpg') },
  },
  storyMoments: {
    source: require('../../assets/photos/storyMoments.webp'),
    alt: 'A ring casting a heart-shaped shadow on sheet music',
    placeholder: true,
    credit: { title: 'Wedding ring with heart shadow', author: 'Petar Milošević', license: 'CC BY-SA 4.0', url: commons('Wedding_ring_with_heart_shadow.jpg') },
  },
  storyEngagement: {
    source: require('../../assets/photos/storyEngagement.webp'),
    alt: 'A ring being placed on a hand',
    placeholder: true,
    credit: { title: 'Placing a wedding ring', author: 'Petar Milošević', license: 'CC BY-SA 4.0', url: commons('Placing_a_wedding_ring.jpg') },
  },
  storyDay: {
    source: require('../../assets/photos/storyDay.webp'),
    alt: 'A table laid for a wedding meal with flowers and fine china',
    placeholder: true,
    credit: { title: 'Wedding Table Setting', author: 'Tamilchandran', license: 'CC0', url: commons('Wedding_Table_Setting.jpg') },
  },
  closing: {
    source: require('../../assets/photos/closing.webp'),
    alt: 'A table set with a white floral centrepiece',
    placeholder: true,
    credit: { title: 'Elegant table setting with white floral centerpiece', author: 'Bhullargraphic', license: 'CC BY-SA 4.0', url: commons('Legant_table_setting_with_white_floral_centerpiece.jpg') },
  },
  moodOne: {
    source: require('../../assets/photos/moodOne.webp'),
    alt: 'Two rings resting on pale fabric',
    placeholder: true,
    credit: { title: 'Wedding rings', author: 'JG16', license: 'CC BY-SA 4.0', url: commons('Wedding_rings_-_14-02-11.jpg') },
  },
  moodTwo: {
    source: require('../../assets/photos/moodTwo.webp'),
    alt: 'A cream rose in close-up',
    placeholder: true,
    focus: 'left',
    credit: { title: 'Wedding rings and roses', author: 'Dako99', license: 'CC BY-SA 3.0', url: commons('Wedding_rings_and_roses.jpg') },
  },
  moodThree: {
    source: require('../../assets/photos/moodThree.webp'),
    alt: 'A table with folded napkins and candles',
    placeholder: true,
    credit: { title: 'Table setting during a German wedding party', author: 'Mattes', license: 'Public domain', url: commons('Table_setting_during_a_German_wedding_party_showing_a_simple_example_of_decorative_napkin_folding_2006.jpg') },
  },
} satisfies Record<string, PhotoEntry>;

export type PhotoKey = keyof typeof entries;
export const photos: Record<PhotoKey, PhotoEntry> = entries;
export const hasPlaceholderPhotos = Object.values(photos).some((photo) => photo.placeholder);
