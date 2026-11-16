export const colors = {
  ivory: '#FAF6EF',
  paper: '#FFFDF9',
  champagne: '#EFE6D6',
  sage: '#8A9A82',
  sageDeep: '#4E5B4C',
  evergreen: '#2F3A33',
  taupe: '#B8AC9E',
  taupeDeep: '#6E6257',
  charcoal: '#2B2A28',
  charcoalSoft: '#4A4743',
  gold: '#B59A63',
  goldLight: '#DCC99E',
  error: '#9B3B2E',
  hairline: 'rgba(43,42,40,0.16)',
  hairlineOnDark: 'rgba(250,246,239,0.24)',
};

export const fonts = {
  serifLight: 'CormorantGaramond_300Light',
  serif: 'CormorantGaramond_400Regular',
  serifItalic: 'CormorantGaramond_400Regular_Italic',
  serifMedium: 'CormorantGaramond_500Medium',
  sans: 'DMSans_400Regular',
  sansMedium: 'DMSans_500Medium',
  script: 'GreatVibes_400Regular',
};

export const NAV_HEIGHT = 76;

/**
 * Attaches responsive and motion rules from src/theme/global.css.
 * Layout breakpoints are CSS rather than JS so the pre-rendered HTML is already
 * correct on every screen size, with no jump when the page becomes interactive.
 */
export const css = (...tokens: (string | false | undefined)[]) =>
  ({ dataSet: { r: tokens.filter(Boolean).join(' ') } }) as object;
