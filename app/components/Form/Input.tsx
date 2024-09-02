import {KeyboardTypeOptions, StyleSheet} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';
import {COLORS} from '../../lib/constants';

type InputProps = {
  label: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  style?: any;
  mode?: 'flat' | 'outlined';
  error?: boolean;
  value?: string;
  onChangeText?: any;
  secureTextEntry?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};
const Input = ({
  label,
  placeholder,
  keyboardType,
  style,
  mode,
  error,
  value,
  onChangeText,
  secureTextEntry,
  leftIcon,
  rightIcon,
}: InputProps) => {
  return (
    <TextInput
      style={{...styles.container, ...style}}
      mode={mode ?? 'flat'}
      label={label}
      value={value}
      onChangeText={onChangeText}
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
