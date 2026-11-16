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
  already_responded: `We already have a reply from this email address. If something has changed, please write to us at ${contact}.`,
  not_configured: 'The RSVP form is not connected yet, so your reply was not saved.',
  failed: 'We could not send your reply. Your answers are still here, so please check your connection and try again.',
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
    <View role="form" aria-label="RSVP" style={styles.form}>
      <Field
        id="full-name"
        label="Your full name"
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
        label="Email address"
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
          Will you attend?
        </Text>
        <View role="group" aria-labelledby="attending-label" {...css('row-md')} style={styles.choices}>
          <Choice large label="Yes, happily!" selected={form.attending === true} onPress={() => update({ attending: true }, 'attending')} />
          <Choice large label="Unfortunately, I cannot attend" selected={form.attending === false} onPress={() => update({ attending: false }, 'attending')} />
        </View>
        <FieldError message={errors.attending} />
      </View>

      {form.attending ? (
        <View {...css('rise')} style={styles.form}>
          <Stepper label="Number of guests, including you" value={form.guestCount} min={1} max={maxGuests} onChange={(guestCount) => update({ guestCount })} />
          {Array.from({ length: form.guestCount - 1 }, (_, index) => (
            <Field
              key={index}
              id={`guest-${index}`}
              label={`Name of guest ${index + 2}`}
              required
              value={form.guestNames[index] ?? ''}
              onChangeText={(name) => setGuestName(index, name)}
              error={errors[`guest${index}`]}
              maxLength={200}
            />
          ))}
          <Field
            id="dietary"
            label="Dietary requirements and allergies"
            hint="For everyone in your party. Leave blank if there are none."
            multiline
            value={form.dietary}
            onChangeText={(dietary) => update({ dietary })}
            maxLength={2000}
          />
          {foodOptions.length ? (
            <View style={styles.group}>
              <Text nativeID="food-label" style={styles.groupLabel}>
                Food preference
              </Text>
              <View role="group" aria-labelledby="food-label" style={styles.chips}>
                {foodOptions.map((option) => (
                  <Choice key={option} label={option} selected={form.food === option} onPress={() => update({ food: form.food === option ? '' : option })} />
                ))}
              </View>
            </View>
          ) : null}
          <Field id="song" label="A song that will get you dancing" hint="Optional" value={form.song} onChangeText={(song) => update({ song })} maxLength={300} />
          <Field
            id="special"
            label="Anything else we should know?"
            hint="Optional. For example, accessibility needs."
            multiline
            value={form.special}
            onChangeText={(special) => update({ special })}
            maxLength={2000}
          />
        </View>
      ) : null}

      <Field
        id="comments"
        label={form.attending === false ? 'A message for us' : 'Comments or a message for us'}
        hint="Optional"
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
            Please check the highlighted answers above.
          </Text>
        ) : null}
        <Btn center label={sending ? 'Sending your reply…' : 'Send reply'} onPress={submit} disabled={sending} busy={sending} />
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
      <Script>{form.attending ? 'Hooray!' : 'Thank you'}</Script>
      <Heading level={2} style={styles.center}>
        {form.attending ? `Thank you for your response, ${firstName}!` : `Thank you for letting us know, ${firstName}.`}
      </Heading>
      <Flourish />
      <Lead style={styles.center}>
        {form.attending ? 'We can’t wait to celebrate with you.' : 'You will be missed, and we will be thinking of you on the day.'}
      </Lead>
      {form.attending ? <Btn center label="See the wedding details" href="/details" variant="line" arrow /> : <Btn center label="Back to home" href="/" variant="line" />}
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
