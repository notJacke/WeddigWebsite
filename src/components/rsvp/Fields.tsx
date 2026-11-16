import type { ComponentRef, RefObject } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { colors, css, fonts } from '@/theme';

type FieldProps = TextInputProps & {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  inputRef?: RefObject<ComponentRef<typeof TextInput> | null>;
};

export function Field({ id, label, hint, error, required, inputRef, multiline, style, ...input }: FieldProps) {
  const labelId = `${id}-label`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error && errorId, hint && hintId].filter(Boolean).join(' ') || undefined;
  return (
    <View style={styles.field}>
      <Text nativeID={labelId} style={styles.label} onPress={() => inputRef?.current?.focus()}>
        {label}
        {required ? <Text style={styles.required}> (obligatoriskt)</Text> : null}
      </Text>
      <TextInput
        ref={inputRef}
        nativeID={id}
        aria-labelledby={labelId}
        aria-describedby={describedBy}
        aria-invalid={!!error}
        aria-required={required}
        multiline={multiline}
        numberOfLines={multiline ? 3 : undefined}
        placeholderTextColor={colors.taupe}
        {...css('field')}
        style={[styles.input, multiline && styles.multiline, !!error && styles.inputError, style]}
        {...input}
      />
      {hint ? (
        <Text nativeID={hintId} style={styles.hint}>
          {hint}
        </Text>
      ) : null}
      <FieldError id={errorId} message={error} />
    </View>
  );
}

export function FieldError({ id, message }: { id?: string; message?: string }) {
  if (!message) return null;
  return (
    <Text nativeID={id} style={styles.error}>
      {message}
    </Text>
  );
}

/** A selectable option; a real button with a pressed state for keyboards and screen readers. */
export function Choice({ label, selected, onPress, large }: { label: string; selected: boolean; onPress: () => void; large?: boolean }) {
  return (
    <Pressable
      role="button"
      aria-pressed={selected}
      onPress={onPress}
      {...css('choice')}
      style={[styles.choice, large && styles.choiceLarge, selected && styles.choiceOn]}
    >
      <Text style={[large ? styles.choiceTextLarge : styles.choiceText, selected && styles.choiceTextOn]}>{label}</Text>
    </Pressable>
  );
}

export function Stepper({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (next: number) => void }) {
  const button = (text: string, aria: string, next: number, disabled: boolean) => (
    <Pressable role="button" aria-label={aria} disabled={disabled} onPress={() => onChange(next)} {...css('choice')} style={[styles.stepBtn, disabled && styles.stepOff]}>
      <Text style={styles.stepSign}>{text}</Text>
    </Pressable>
  );
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.stepRow}>
        {button('−', 'En gäst färre', value - 1, value <= min)}
        <Text aria-live="polite" style={styles.stepValue}>
          {value}
        </Text>
        {button('+', 'En gäst till', value + 1, value >= max)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: 6 },
  label: { fontFamily: fonts.sansMedium, fontSize: 14, lineHeight: 22, color: colors.charcoal },
  required: { fontFamily: fonts.sans, color: colors.taupeDeep },
  input: {
    fontFamily: fonts.serif,
    fontSize: 22,
    lineHeight: 30,
    color: colors.charcoal,
    borderBottomWidth: 1,
    borderBottomColor: colors.taupe,
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  multiline: { minHeight: 92, textAlignVertical: 'top' },
  inputError: { borderBottomColor: colors.error },
  hint: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: colors.taupeDeep },
  error: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.error },
  choice: { borderWidth: 1, borderColor: colors.taupe, paddingVertical: 11, paddingHorizontal: 18, backgroundColor: 'transparent' },
  choiceLarge: { flex: 1, paddingVertical: 22, alignItems: 'center' },
  choiceOn: { backgroundColor: colors.sageDeep, borderColor: colors.sageDeep },
  choiceText: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 22, color: colors.charcoal },
  choiceTextLarge: { fontFamily: fonts.serifItalic, fontSize: 24, lineHeight: 30, color: colors.charcoal, textAlign: 'center' },
  choiceTextOn: { color: colors.ivory },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: 18, marginTop: 4 },
  stepBtn: { width: 48, height: 48, borderWidth: 1, borderColor: colors.taupe, alignItems: 'center', justifyContent: 'center' },
  stepOff: { opacity: 0.35 },
  stepSign: { fontFamily: fonts.sans, fontSize: 22, lineHeight: 26, color: colors.charcoal },
  stepValue: { fontFamily: fonts.serif, fontSize: 34, lineHeight: 40, minWidth: 34, textAlign: 'center', color: colors.charcoal },
});
