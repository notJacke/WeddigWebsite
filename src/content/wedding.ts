/**
 * EVERYTHING GUESTS READ LIVES IN THIS FILE.
 *
 * Anything wrapped in tbc('...') is a placeholder. It shows on the site with a
 * dotted gold underline. To confirm a detail, replace the whole tbc('...') with
 * a plain string:
 *
 *     address: tbc('Gatuadress meddelas senare'),
 *     address: 'Riktiga gatan 1, 652 00 Karlstad',
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
const ceremonyTime = tbc('Tid meddelas senare');
const receptionTime = tbc('Tid meddelas senare');
const ceremonyAddress = tbc('Gatuadress meddelas senare');
const receptionAddress = tbc('Gatuadress meddelas senare');
const contactEmail = tbc('hello@your-domain.example');

export const wedding = {
  site: {
    /** Shows the dotted underlines, "sample" tags and preview note. Set to false for launch. */
    previewMode: true,
    /** Set to false to ask search engines not to list the site. */
    allowSearchEngines: true,
    description: 'Du är inbjuden att fira vårt bröllop i Karlstad. Vår historia, platserna, praktisk information och OSA.',
  },

  couple: {
    partnerOne: 'Emmy',
    partnerTwo: 'Samuel',
  },

  date: {
    /**
     * The start of the wedding day, with its Swedish UTC offset (+01:00 in winter, +02:00 in summer).
     * Example: '2027-06-12T14:00:00+02:00'. While null, the site shows
     * "Datum meddelas senare" and the countdown waits.
     */
    iso: null as string | null,
    announcedLabel: tbc('Datum meddelas senare'),
  },

  location: 'Karlstad, Sverige',

  home: {
    invitation: 'Vi bjuder in dig att fira vårt bröllop i Karlstad!',
    welcomeHeading: tbc('Fira vår dag med oss!'),
    welcomeBody: tbc(
      'Nu ska vi snart gifta oss! Vi vill gärna fira vår dag med alla våra vänner, och hoppas att du kan komma. Vi ser fram emot en energifylld dag med god mat, dryck och dans!',
    ),
    signature: tbc('Hälsningar, Emmy & Samuel'),
    storyQuote: tbc('Exempelcitat. En mening om er två som får gästerna att le.'),
    closingHeading: 'Kommer du?',
    closingBody: 'Ditt svar hjälper oss att planera en dag med plats för alla.',
  },

  story: {
    heading: 'Vår historia',
    intro: tbc(
      'Exempelintroduktion. Berätta för gästerna vilka ni är som par: hur ni kompletterar varandra, vad ni gör en lugn söndag och vad de som står er närmast skulle säga om er.',
    ),
    chapters: [
      {
        label: 'Hur vi träffades',
        when: tbc('År'),
        title: tbc('Början'),
        body: tbc('Exempeltext. Var var ni, vem sa hej först, och när förstod ni att det här var något speciellt?'),
        photo: 'storyMet',
      },
      {
        label: 'Ögonblick på vägen',
        when: tbc('År'),
        title: tbc('Åren däremellan'),
        body: tbc('Exempeltext. Resorna, hemmen, de tunga dagarna och de vanliga som gjorde er två till en familj.'),
        photo: 'storyMoments',
      },
      {
        label: 'Vår förlovning',
        when: tbc('År'),
        title: tbc('Frågan'),
        body: tbc('Exempeltext. Var det hände, vad som sades och vem ni ringde först.'),
        photo: 'storyEngagement',
      },
      {
        label: 'Varför den här dagen',
        when: tbc('Nästa'),
        title: tbc('Alla vi älskar, på ett ställe'),
        body: tbc('Exempeltext. Varför den här dagen betyder så mycket för er, och vad det betyder att få dela den med era gäster.'),
        photo: 'storyDay',
      },
    ],
  },

  venues: {
    intro: 'Vår dag äger rum på två platser i Karlstad. Vi börjar i domkyrkan och fortsätter på hotellet.',
    ceremony: {
      eyebrow: 'Vigseln',
      name: 'Karlstads Domkyrka',
      city: 'Karlstad, Sverige',
      mapsQuery: 'Karlstads domkyrka, Karlstad, Sweden',
      description: tbc('Exempelbeskrivning. Några ord om varför ni valde domkyrkan och vad gästerna kan se fram emot här.'),
      address: ceremonyAddress,
      time: ceremonyTime,
      note: tbc('Information om ankomst meddelas senare'),
      photo: 'ceremony',
    },
    reception: {
      eyebrow: 'Festen',
      name: 'Karlstads Stadshotell',
      city: 'Karlstad, Sverige',
      mapsQuery: 'Stadshotellet Karlstad, Sweden',
      description: tbc('Exempelbeskrivning. Några ord om hotellet och kvällen ni planerar här.'),
      address: receptionAddress,
      time: receptionTime,
      schedule: [
        { time: tbc('Tid ej klar'), what: 'Välkomstdrink' },
        { time: tbc('Tid ej klar'), what: 'Middag' },
        { time: tbc('Tid ej klar'), what: 'Tal' },
        { time: tbc('Tid ej klar'), what: 'Fest och dans' },
      ],
      photo: 'reception',
    },
    transfer: tbc('Hur gästerna tar sig mellan de två platserna meddelas senare.'),
  },

  details: {
    schedule: [
      { time: tbc('Tid ej klar'), what: 'Gästerna anländer', place: 'ceremony' },
      { time: ceremonyTime, what: 'Vigsel i Karlstads Domkyrka', place: 'ceremony' },
      { time: tbc('Tid ej klar'), what: 'Gratulationer och fotografering', place: 'ceremony' },
      { time: tbc('Tid ej klar'), what: 'Transport till Karlstads Stadshotell', place: 'transfer' },
      { time: receptionTime, what: 'Välkomstdrink', place: 'reception' },
      { time: tbc('Tid ej klar'), what: 'Middag', place: 'reception' },
      { time: tbc('Tid ej klar'), what: 'Tal', place: 'reception' },
      { time: tbc('Tid ej klar'), what: 'Fest och dans', place: 'reception' },
    ],
    stay: {
      intro: tbc('Vi håller fortfarande på att ordna boende. Rekommenderade hotell, eventuella rumspriser och sista bokningsdag kommer att finnas här.'),
      /** Set bookingUrl to a real link to show a "Boka" button. */
      hotels: [
        {
          name: tbc('Rekommenderat hotell'),
          distance: tbc('Avstånd till platserna meddelas senare'),
          rate: tbc('Rumspris meddelas senare'),
          deadline: tbc('Sista bokningsdag meddelas senare'),
          bookingUrl: null as string | null,
        },
        {
          name: tbc('Ytterligare hotellalternativ'),
          distance: tbc('Avstånd till platserna meddelas senare'),
          rate: tbc('Rumspris meddelas senare'),
          deadline: tbc('Sista bokningsdag meddelas senare'),
          bookingUrl: null as string | null,
        },
      ],
      gettingBack: tbc('Information om hur du tar dig tillbaka till hotellet efter festen kommer senare.'),
    },
    dressCode: {
      title: tbc('Klädkod ej bestämd'),
      explanation: tbc('Exempeltext. När den är bestämd, beskriv vad gästerna ska ha på sig, inklusive praktiska saker som dansvänliga skor eller ett extra lager till kvällen.'),
      /** Inspiration colours. Leave the array empty to hide the palette. */
      palette: [
        { name: 'Elfenben', hex: '#F3ECDF' },
        { name: 'Champagne', hex: '#E3D5BD' },
        { name: 'Salvia', hex: '#A3AF9A' },
        { name: 'Gråbrun', hex: '#A5978A' },
        { name: 'Kolgrå', hex: '#3A3936' },
      ],
      paletteNote: tbc('Exempelpalett, endast som inspiration.'),
      moodboard: ['moodOne', 'moodTwo', 'moodThree'],
    },
    extras: [
      { title: 'Parkering', body: tbc('Information om parkering meddelas senare.') },
      { title: 'Kollektivtrafik', body: tbc('Information om kollektivtrafik meddelas senare.') },
      { title: 'Taxi', body: tbc('Information om taxi meddelas senare.') },
      { title: 'Barn och respektive', body: tbc('Hur vi gör med barn och respektive meddelar vi här.') },
      { title: 'Specialkost', body: 'Berätta om allergier och specialkost i ditt OSA-svar.' },
    ],
    contact: {
      title: 'Frågor?',
      body: 'Hör gärna av dig. Vi hjälper gärna till.',
      email: contactEmail,
    },
  },

  rsvp: {
    deadline: tbc('Svarsdatum meddelas senare'),
    intro: 'Låt oss veta om du kan komma. Ett svar kan gälla hela ditt sällskap.',
    /** Largest party one reply can cover, including the person replying (20 at most). */
    maxGuests: 6,
    /** Leave the array empty to hide the food preference question. */
    foodOptions: ['Inga önskemål', 'Vegetarisk', 'Vegansk', 'Pescetarian'],
    privacy: 'Vi använder bara dina svar för att planera vårt bröllop.',
  },
};

export const coupleNames = () => `${copyText(wedding.couple.partnerOne)} & ${copyText(wedding.couple.partnerTwo)}`;

/** The wedding date for display, or a marked placeholder while no date is set. */
export function weddingDate(): Copy {
  if (!wedding.date.iso) return wedding.date.announcedLabel;
  return new Intl.DateTimeFormat('sv-SE', {
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
