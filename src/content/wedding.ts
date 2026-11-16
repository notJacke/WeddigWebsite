/**
 * EVERYTHING GUESTS READ LIVES IN THIS FILE.
 *
 * Anything wrapped in tbc('...') is a placeholder. It shows on the site with a
 * dotted gold underline. To confirm a detail, replace the whole tbc('...') with
 * a plain string:
 *
 *     address: tbc('Street address to be confirmed'),
 *     address: 'Real Street 1, 652 00 Karlstad',
 *
 * Run `npm run check:content` to list every placeholder that is left.
 * Photos are swapped in src/content/photos.ts.
 */

export type Tbc = { text: string; tbc: true };
export type Copy = string | Tbc;

const tbc = (text: string): Tbc => ({ text, tbc: true });

export const isTbc = (value: Copy): value is Tbc => typeof value !== 'string';
export const copyText = (value: Copy): string => (isTbc(value) ? value.text : value);

// Times used in more than one place. Change them once here.
const ceremonyTime = tbc('Time to be confirmed');
const receptionTime = tbc('Time to be confirmed');
const ceremonyAddress = tbc('Street address to be confirmed');
const receptionAddress = tbc('Street address to be confirmed');
const contactEmail = tbc('hello@your-domain.example');

export const wedding = {
  site: {
    /** Shows the dotted underlines, "sample" tags and preview note. Set to false for launch. */
    previewMode: true,
    /** Set to false to ask search engines not to list the site. */
    allowSearchEngines: true,
    description: 'You are invited to celebrate our wedding in Karlstad, Sweden. Our story, the venues, the practical details and your RSVP.',
  },

  couple: {
    partnerOne: tbc('Alex'),
    partnerTwo: tbc('Sam'),
  },

  date: {
    /**
     * The start of the wedding day, with its Swedish UTC offset (+01:00 in winter, +02:00 in summer).
     * Example: '2027-06-12T14:00:00+02:00'. While null, the site shows
     * "Date to be announced" and the countdown waits.
     */
    iso: null as string | null,
    announcedLabel: tbc('Date to be announced'),
  },

  location: 'Karlstad, Sweden',

  home: {
    invitation: 'Together with our families, we invite you to celebrate our wedding.',
    welcomeHeading: tbc('We would love nothing more than to have you beside us.'),
    welcomeBody: tbc(
      'Sample welcome message. Replace this with a few words to your guests: why you are glad they are part of your lives, and what you are looking forward to about the day.',
    ),
    signature: tbc('With love, Alex & Sam'),
    storyQuote: tbc('Sample quote. One sentence about the two of you that makes guests smile.'),
    closingHeading: 'Will you join us?',
    closingBody: 'Your reply helps us plan a day that has room for everyone.',
  },

  story: {
    heading: 'Our Story',
    intro: tbc(
      'Sample introduction. Tell guests who you are as a couple: how you balance each other, what you do on a slow Sunday, and what the people closest to you would say about you.',
    ),
    chapters: [
      {
        label: 'How we met',
        when: tbc('Year'),
        title: tbc('The beginning'),
        body: tbc('Sample text. Where were you, who said hello first, and when did you realise this was something special?'),
        photo: 'storyMet',
      },
      {
        label: 'Moments along the way',
        when: tbc('Year'),
        title: tbc('The years in between'),
        body: tbc('Sample text. The trips, the homes, the hard days and the ordinary ones that turned the two of you into a family.'),
        photo: 'storyMoments',
      },
      {
        label: 'Our engagement',
        when: tbc('Year'),
        title: tbc('The question'),
        body: tbc('Sample text. Where it happened, what was said, and who you called first.'),
        photo: 'storyEngagement',
      },
      {
        label: 'Why this day',
        when: tbc('Next'),
        title: tbc('Everyone we love, in one place'),
        body: tbc('Sample text. Why this day means so much to you, and what it means to share it with your guests.'),
        photo: 'storyDay',
      },
    ],
  },

  venues: {
    intro: 'Our day takes place in two locations in Karlstad. We begin at the cathedral and continue at the hotel.',
    ceremony: {
      eyebrow: 'The ceremony',
      name: 'Karlstads Domkyrka',
      city: 'Karlstad, Sweden',
      mapsQuery: 'Karlstads domkyrka, Karlstad, Sweden',
      description: tbc('Sample description. A few words on why you chose the cathedral and what guests can look forward to here.'),
      address: ceremonyAddress,
      time: ceremonyTime,
      note: tbc('Arrival information to be confirmed'),
      photo: 'ceremony',
    },
    reception: {
      eyebrow: 'The celebration',
      name: 'Karlstads Stadshotell',
      city: 'Karlstad, Sweden',
      mapsQuery: 'Stadshotellet Karlstad, Sweden',
      description: tbc('Sample description. A few words about the hotel and the evening you are planning here.'),
      address: receptionAddress,
      time: receptionTime,
      schedule: [
        { time: tbc('Time TBC'), what: 'Welcome drinks' },
        { time: tbc('Time TBC'), what: 'Dinner' },
        { time: tbc('Time TBC'), what: 'Speeches' },
        { time: tbc('Time TBC'), what: 'Party and dancing' },
      ],
      photo: 'reception',
    },
    transfer: tbc('How guests travel between the two venues is still to be confirmed.'),
  },

  details: {
    schedule: [
      { time: tbc('Time TBC'), what: 'Guest arrival', place: 'ceremony' },
      { time: ceremonyTime, what: 'Wedding ceremony at Karlstads Domkyrka', place: 'ceremony' },
      { time: tbc('Time TBC'), what: 'Congratulations and photographs', place: 'ceremony' },
      { time: tbc('Time TBC'), what: 'Transportation to Karlstads Stadshotell', place: 'transfer' },
      { time: receptionTime, what: 'Welcome drinks', place: 'reception' },
      { time: tbc('Time TBC'), what: 'Dinner', place: 'reception' },
      { time: tbc('Time TBC'), what: 'Speeches', place: 'reception' },
      { time: tbc('Time TBC'), what: 'Party and dancing', place: 'reception' },
    ],
    stay: {
      intro: tbc('We are still arranging accommodation. Recommended hotels, any room rates and booking dates will appear here.'),
      /** Set bookingUrl to a real link to show a "Book" button. */
      hotels: [
        {
          name: tbc('Recommended hotel'),
          distance: tbc('Distance to venues to be confirmed'),
          rate: tbc('Room rate to be confirmed'),
          deadline: tbc('Booking deadline to be confirmed'),
          bookingUrl: null as string | null,
        },
        {
          name: tbc('Second hotel option'),
          distance: tbc('Distance to venues to be confirmed'),
          rate: tbc('Room rate to be confirmed'),
          deadline: tbc('Booking deadline to be confirmed'),
          bookingUrl: null as string | null,
        },
      ],
      gettingBack: tbc('Information about getting back to your hotel after the party will follow.'),
    },
    dressCode: {
      title: tbc('Dress code to be decided'),
      explanation: tbc('Sample text. Once decided, describe what guests should wear, including anything practical such as shoes for dancing or a layer for the evening.'),
      /** Inspiration colours. Leave the array empty to hide the palette. */
      palette: [
        { name: 'Ivory', hex: '#F3ECDF' },
        { name: 'Champagne', hex: '#E3D5BD' },
        { name: 'Sage', hex: '#A3AF9A' },
        { name: 'Taupe', hex: '#A5978A' },
        { name: 'Charcoal', hex: '#3A3936' },
      ],
      paletteNote: tbc('Sample palette for inspiration only.'),
      moodboard: ['moodOne', 'moodTwo', 'moodThree'],
    },
    extras: [
      { title: 'Parking', body: tbc('Parking information to be confirmed.') },
      { title: 'Public transportation', body: tbc('Public transportation information to be confirmed.') },
      { title: 'Taxi', body: tbc('Taxi information to be confirmed.') },
      { title: 'Children and plus-ones', body: tbc('Our policy on children and plus-ones will be shared here.') },
      { title: 'Dietary requirements', body: 'Please tell us about allergies and dietary requirements in your RSVP.' },
    ],
    contact: {
      title: 'Questions?',
      body: 'Please get in touch. We are happy to help.',
      email: contactEmail,
    },
  },

  rsvp: {
    deadline: tbc('Reply date to be confirmed'),
    intro: 'Please let us know whether you can join us. One reply can cover everyone in your party.',
    /** Largest party one reply can cover, including the person replying (20 at most). */
    maxGuests: 6,
    /** Leave the array empty to hide the food preference question. */
    foodOptions: ['No preference', 'Vegetarian', 'Vegan', 'Pescatarian'],
    privacy: 'We only use your answers to plan our wedding.',
  },
};

export const coupleNames = () => `${copyText(wedding.couple.partnerOne)} & ${copyText(wedding.couple.partnerTwo)}`;

/** The wedding date for display, or a marked placeholder while no date is set. */
export function weddingDate(): Copy {
  if (!wedding.date.iso) return wedding.date.announcedLabel;
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Stockholm',
  }).format(new Date(wedding.date.iso));
}

/** Walks the content and returns the path of every remaining placeholder. */
export function listPlaceholders(node: unknown = wedding, path = ''): { path: string; text: string }[] {
  if (!node || typeof node !== 'object') return [];
  if ('tbc' in node && 'text' in node) return [{ path, text: String(node.text) }];
  return Object.entries(node).flatMap(([key, child]) => listPlaceholders(child, path ? `${path}.${key}` : key));
}
