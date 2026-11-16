export type RsvpForm = {
  fullName: string;
  email: string;
  attending: boolean | null;
  dietary: string;
  food: string;
  /** Whether the person replying is also signing up one more invited guest. */
  withGuest: boolean;
  guestName: string;
  guestDietary: string;
  guestFood: string;
  comments: string;
  song: string;
  special: string;
};

export const emptyForm: RsvpForm = {
  fullName: '',
  email: '',
  attending: null,
  dietary: '',
  food: '',
  withGuest: false,
  guestName: '',
  guestDietary: '',
  guestFood: '',
  comments: '',
  song: '',
  special: '',
};

export type FormErrors = Partial<Record<'fullName' | 'email' | 'attending' | 'guestName', string>>;

export function validate(form: RsvpForm): FormErrors {
  const errors: FormErrors = {};
  if (!form.fullName.trim()) errors.fullName = 'Skriv ditt namn.';
  if (!form.email.trim()) errors.email = 'Fyll i din e-postadress.';
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim())) errors.email = 'E-postadressen ser inte riktigt rätt ut.';
  if (form.attending === null) errors.attending = 'Berätta om du kan komma.';
  if (form.attending && form.withGuest && !form.guestName.trim()) errors.guestName = 'Fyll i personens namn.';
  return errors;
}

export type SubmitResult = 'ok' | 'already_responded' | 'not_configured' | 'failed';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export function newSubmissionId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

/**
 * Saves a response through the submit_rsvp database function.
 * This is the Supabase REST API called directly, so guests do not download the
 * whole Supabase client for a single request.
 */
export async function submitRsvp(form: RsvpForm, submissionId: string): Promise<SubmitResult> {
  if (!url || !key) return 'not_configured';
  const withGuest = !!form.attending && form.withGuest;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(`${url}/rest/v1/rpc/submit_rsvp`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        apikey: key,
        // Older anon keys are JWTs and also need this header. Newer publishable keys must not send it.
        ...(key.startsWith('eyJ') ? { Authorization: `Bearer ${key}` } : {}),
      },
      body: JSON.stringify({
        p_submission_id: submissionId,
        p_full_name: form.fullName,
        p_email: form.email,
        p_attending: form.attending,
        p_guest_count: form.attending ? (withGuest ? 2 : 1) : 0,
        p_guest_names: withGuest ? [form.guestName.trim()] : [],
        p_dietary_requirements: form.attending ? form.dietary : '',
        p_food_preference: form.attending ? form.food : '',
        p_guest_dietary_requirements: withGuest ? form.guestDietary : '',
        p_guest_food_preference: withGuest ? form.guestFood : '',
        p_comments: form.comments,
        p_song_request: form.attending ? form.song : '',
        p_special_information: form.attending ? form.special : '',
      }),
    });
    if (!response.ok) return 'failed';
    const status = await response.json();
    return status === 'already_responded' ? 'already_responded' : status === 'ok' ? 'ok' : 'failed';
  } catch {
    return 'failed';
  } finally {
    clearTimeout(timeout);
  }
}
