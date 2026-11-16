import { useEffect, useRef, useState, type ComponentRef } from 'react';
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { Btn } from '@/components/Btn';
import { Flourish } from '@/components/Art';
import { Heading, Lead, Script } from '@/components/Type';
import { copyText, wedding } from '@/content/wedding';
import { emptyForm, newSubmissionId, submitRsvp, validate, type FormErrors, type RsvpForm as FormState, type SubmitResult } from '@/lib/rsvp';
import { colors, css, fonts } from '@/theme';
import { Choice, Field, FieldError, Stepper } from './Fields';

const { maxGuests, foodOptions, privacy } = wedding.rsvp;
const contact = copyText(wedding.details.contact.email);

const failureMessages: Partial<Record<SubmitResult, string>> = {
  already_responded: `Vi har redan fått ett svar från den här e-postadressen. Om något har ändrats, skriv till oss på ${contact}.`,
  not_configured: 'OSA-formuläret är inte kopplat ännu, så ditt svar sparades inte.',
  failed: 'Vi kunde inte skicka ditt svar. Dina svar finns kvar, så kontrollera din anslutning och försök igen.',
};

export function RsvpForm({ onSent }: { onSent: () => void }) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [failure, setFailure] = useState<SubmitResult | null>(null);
  const nameRef = useRef<ComponentRef<typeof TextInput>>(null);
  const emailRef = useRef<ComponentRef<typeof TextInput>>(null);
  // Reused across retries, so a reply that reached the database is never stored twice.
  const submissionId = useRef<string | null>(null);
  const inFlight = useRef(false);

  const update = (patch: Partial<FormState>, clear?: keyof FormErrors) => {
    setForm((current) => ({ ...current, ...patch }));
    setFailure(null);
    if (clear) setErrors((current) => ({ ...current, [clear]: undefined }));
  };

  const setGuestName = (index: number, name: string) => {
    const guestNames = [...form.guestNames];
    guestNames[index] = name;
    update({ guestNames }, `guest${index}`);
  };

  const submit = async () => {
    if (inFlight.current) return;
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) {
      if (found.fullName) nameRef.current?.focus();
      else if (found.email) emailRef.current?.focus();
      return;
    }
    inFlight.current = true;
    setStatus('sending');
    setFailure(null);
    submissionId.current ??= newSubmissionId();
    const result = await submitRsvp(form, submissionId.current);
    inFlight.current = false;
    if (result === 'ok') {
      setStatus('sent');
      onSent();
    } else {
      setStatus('idle');
      setFailure(result);
    }
  };

  if (status === 'sent') return <Success form={form} />;

  const hasErrors = Object.values(errors).some(Boolean);
  const sending = status === 'sending';

  return (
    <View role="form" aria-label="OSA" style={styles.form}>
      <Field
        id="full-name"
        label="Ditt för- och efternamn"
        required
        inputRef={nameRef}
        value={form.fullName}
        onChangeText={(fullName) => update({ fullName }, 'fullName')}
        error={errors.fullName}
        autoComplete="name"
        maxLength={200}
      />
      <Field
        id="email"
        label="E-postadress"
        required
        inputRef={emailRef}
        value={form.email}
        onChangeText={(email) => update({ email }, 'email')}
        error={errors.email}
        autoComplete="email"
        inputMode="email"
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={320}
      />

      <View style={styles.group}>
        <Text nativeID="attending-label" style={styles.groupLabel}>
          Kommer du?
        </Text>
        <View role="group" aria-labelledby="attending-label" {...css('row-md')} style={styles.choices}>
          <Choice large label="Ja, gärna!" selected={form.attending === true} onPress={() => update({ attending: true }, 'attending')} />
          <Choice large label="Tyvärr kan jag inte komma" selected={form.attending === false} onPress={() => update({ attending: false }, 'attending')} />
        </View>
        <FieldError message={errors.attending} />
      </View>

      {form.attending ? (
        <View {...css('rise')} style={styles.form}>
          <Stepper label="Antal gäster, inklusive dig" value={form.guestCount} min={1} max={maxGuests} onChange={(guestCount) => update({ guestCount })} />
          {Array.from({ length: form.guestCount - 1 }, (_, index) => (
            <Field
              key={index}
              id={`guest-${index}`}
              label={`Namn på gäst ${index + 2}`}
              required
              value={form.guestNames[index] ?? ''}
              onChangeText={(name) => setGuestName(index, name)}
              error={errors[`guest${index}`]}
              maxLength={200}
            />
          ))}
          <Field
            id="dietary"
            label="Specialkost och allergier"
            hint="För alla i ditt sällskap. Lämna tomt om det inte finns några."
            multiline
            value={form.dietary}
            onChangeText={(dietary) => update({ dietary })}
            maxLength={2000}
          />
          {foodOptions.length ? (
            <View style={styles.group}>
              <Text nativeID="food-label" style={styles.groupLabel}>
                Matpreferens
              </Text>
              <View role="group" aria-labelledby="food-label" style={styles.chips}>
                {foodOptions.map((option) => (
                  <Choice key={option} label={option} selected={form.food === option} onPress={() => update({ food: form.food === option ? '' : option })} />
                ))}
              </View>
            </View>
          ) : null}
          <Field id="song" label="En låt som får dig att dansa" hint="Valfritt" value={form.song} onChangeText={(song) => update({ song })} maxLength={300} />
          <Field
            id="special"
            label="Något mer vi borde veta?"
            hint="Valfritt. Till exempel behov av tillgänglighet."
            multiline
            value={form.special}
            onChangeText={(special) => update({ special })}
            maxLength={2000}
          />
        </View>
      ) : null}

      <Field
        id="comments"
        label={form.attending === false ? 'Ett meddelande till oss' : 'Kommentarer eller ett meddelande till oss'}
        hint="Valfritt"
        multiline
        value={form.comments}
        onChangeText={(comments) => update({ comments })}
        maxLength={4000}
      />

      <View style={styles.footer}>
        {failure ? (
          <Text role="alert" style={styles.failure}>
            {failureMessages[failure]}
          </Text>
        ) : hasErrors ? (
          <Text role="alert" style={styles.failure}>
            Kontrollera de markerade svaren ovan.
          </Text>
        ) : null}
        <Btn center label={sending ? 'Skickar ditt svar…' : 'Skicka svar'} onPress={submit} disabled={sending} busy={sending} />
        <Text style={styles.privacy}>{privacy}</Text>
      </View>
    </View>
  );
}

function Success({ form }: { form: FormState }) {
  const ref = useRef<ComponentRef<typeof View>>(null);
  const firstName = form.fullName.trim().split(/\s+/)[0];

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    (ref.current as unknown as HTMLElement | null)?.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <View ref={ref} tabIndex={-1} role="status" {...css('rise')} style={styles.success}>
      <Script>{form.attending ? 'Hurra!' : 'Tack'}</Script>
      <Heading level={2} style={styles.center}>
        {form.attending ? `Tack för ditt svar, ${firstName}!` : `Tack för att du hörde av dig, ${firstName}.`}
      </Heading>
      <Flourish />
      <Lead style={styles.center}>
        {form.attending ? 'Vi längtar efter att fira med dig.' : 'Vi kommer att sakna dig och tänka på dig under dagen.'}
      </Lead>
      {form.attending ? <Btn center label="Se information om dagen" href="/details" variant="line" arrow /> : <Btn center label="Till startsidan" href="/" variant="line" />}
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: 30 },
  group: { gap: 10 },
  groupLabel: { fontFamily: fonts.sansMedium, fontSize: 14, lineHeight: 22, color: colors.charcoal },
  choices: { gap: 10 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  footer: { alignItems: 'center', gap: 16, marginTop: 6 },
  failure: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 22, color: colors.error, textAlign: 'center' },
  privacy: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: colors.taupeDeep, textAlign: 'center' },
  success: { alignItems: 'center', gap: 20, paddingVertical: 24 },
  center: { textAlign: 'center' },
});
