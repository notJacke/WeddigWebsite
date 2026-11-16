import type { ComponentRef, RefObject } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import Svg, { Path } from 'react-native-svg';
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

/** A real checkbox for keyboards and screen readers, with an optional hint under the label. */
export function Checkbox({ label, hint, checked, onChange }: { label: string; hint?: string; checked: boolean; onChange: (next: boolean) => void }) {
  return (
    <Pressable role="checkbox" aria-checked={checked} onPress={() => onChange(!checked)} {...css('choice')} style={styles.check}>
      <View style={[styles.checkBox, checked && styles.checkBoxOn]}>
        {checked ? (
          <Svg width={14} height={14} viewBox="0 0 14 14" fill="none" aria-hidden>
            <Path d="M2 7.5 5.5 11 12 3.5" stroke={colors.ivory} strokeWidth={1.6} />
          </Svg>
        ) : null}
      </View>
      <View style={styles.checkText}>
        <Text style={styles.checkLabel}>{label}</Text>
        {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      </View>
    </Pressable>
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
  check: { flexDirection: 'row', alignItems: 'flex-start', gap: 14, borderWidth: 1, borderColor: colors.taupe, paddingVertical: 16, paddingHorizontal: 18 },
  checkBox: { width: 24, height: 24, marginTop: 1, borderWidth: 1, borderColor: colors.taupe, alignItems: 'center', justifyContent: 'center' },
  checkBoxOn: { backgroundColor: colors.sageDeep, borderColor: colors.sageDeep },
  checkText: { flex: 1, gap: 2 },
  checkLabel: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 24, color: colors.charcoal },
});
