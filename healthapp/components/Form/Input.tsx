import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputEndEditingEventData,
  TextStyle,
} from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-paper';
import { COLORS } from '../../lib/constants';

type InputProps = {
  label: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  style?: TextStyle;
  mode?: 'flat' | 'outlined';
  error?: boolean;
  value?: string;
  id?: string;
  onChangeText?: ((text: string) => void) & Function;
  onPress?: () => void;
  onBlur?:
    | ((e: NativeSyntheticEvent<FocusEvent>) => void) & ((args: any) => void);
  onEndEditing?: (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => void;
  secureTextEntry?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};
const Input = ({
  label,
  placeholder,
  keyboardType,
  multiline = false,
  style,
  mode,
  error,
  value,
  id,
  onChangeText,
  onPress,
  onBlur,
  onEndEditing,
  secureTextEntry,
  leftIcon,
  rightIcon,
}: Partial<typeof TextInput> & InputProps) => {
  return (
    <TextInput
      style={{ ...styles.container, ...style }}
      mode={mode ?? 'flat'}
      label={label}
      value={value}
      id={id}
      multiline={multiline}
      onChangeText={onChangeText}
      onPress={onPress}
      onBlur={onBlur}
      onEndEditing={onEndEditing}
      placeholder={placeholder}
      keyboardType={keyboardType}
      error={error}
      secureTextEntry={secureTextEntry}
      left={leftIcon}
      right={rightIcon}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: '100%',
    marginVertical: 10,
  },
});
