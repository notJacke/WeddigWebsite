import { View } from 'react-native';
import Svg, { Line, Path } from 'react-native-svg';
import { colors, css } from '@/theme';

export function Arrow({ color = colors.charcoal }: { color?: string }) {
  return (
    <Svg width={26} height={10} viewBox="0 0 26 10" fill="none" aria-hidden>
      <Path d="M0 5h24M20 1l4.5 4L20 9" stroke={color} strokeWidth={1} />
    </Svg>
  );
}

export function MenuIcon({ color }: { color: string }) {
  return (
    <Svg width={30} height={14} viewBox="0 0 30 14" aria-hidden>
      <Line x1={0} y1={1} x2={30} y2={1} stroke={color} strokeWidth={1.2} />
      <Line x1={8} y1={13} x2={30} y2={13} stroke={color} strokeWidth={1.2} />
    </Svg>
  );
}

export function CloseIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" aria-hidden>
      <Line x1={2} y1={2} x2={20} y2={20} stroke={color} strokeWidth={1.2} />
      <Line x1={20} y1={2} x2={2} y2={20} stroke={color} strokeWidth={1.2} />
    </Svg>
  );
}

export function Pin({ color = colors.gold, size = 34 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size * 1.3} viewBox="0 0 30 39" fill="none" aria-hidden>
      <Path d="M15 38C15 38 28 24 28 14A13 13 0 0 0 2 14C2 24 15 38 15 38Z" stroke={color} strokeWidth={1} />
      <Path d="M15 19a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" stroke={color} strokeWidth={1} />
    </Svg>
  );
}

/** A hand-drawn sprig that sketches itself in. */
export function Sprig({ color = colors.sage, width = 150, flip }: { color?: string; width?: number; flip?: boolean }) {
  return (
    <View {...css('draw')} style={flip ? { transform: [{ scaleX: -1 }] } : undefined} aria-hidden>
      <Svg width={width} height={width * 0.3} viewBox="0 0 200 60" fill="none">
        <Path d="M4 44C50 52 110 46 196 12" stroke={color} strokeWidth={1} strokeLinecap="round" />
        <Path d="M40 48C36 36 44 26 58 22C60 36 54 44 40 48Z" stroke={color} strokeWidth={0.9} />
        <Path d="M50 49C60 58 72 58 84 53C76 44 62 42 50 49Z" stroke={color} strokeWidth={0.9} />
        <Path d="M86 45C84 32 92 22 106 18C108 32 100 41 86 45Z" stroke={color} strokeWidth={0.9} />
        <Path d="M98 43C108 51 120 50 131 44C122 36 109 35 98 43Z" stroke={color} strokeWidth={0.9} />
        <Path d="M132 33C131 22 138 14 150 10C152 22 145 30 132 33Z" stroke={color} strokeWidth={0.9} />
        <Path d="M144 29C153 36 163 35 172 30C165 22 153 22 144 29Z" stroke={color} strokeWidth={0.9} />
      </Svg>
    </View>
  );
}

/** A thin gold rule with a small diamond at its centre. */
export function Flourish({ color = colors.gold }: { color?: string }) {
  return (
    <Svg width={140} height={12} viewBox="0 0 140 12" fill="none" aria-hidden>
      <Line x1={0} y1={6} x2={60} y2={6} stroke={color} strokeWidth={0.8} />
      <Path d="M70 1.5 74.5 6 70 10.5 65.5 6Z" stroke={color} strokeWidth={0.8} />
      <Line x1={80} y1={6} x2={140} y2={6} stroke={color} strokeWidth={0.8} />
    </Svg>
  );
}
