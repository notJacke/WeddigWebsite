export type Remaining = { days: number; hours: number; minutes: number; seconds: number; done: boolean };

export function timeUntil(targetIso: string, now: number): Remaining {
  const total = Math.floor((new Date(targetIso).getTime() - now) / 1000);
  if (total <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    done: false,
  };
}
