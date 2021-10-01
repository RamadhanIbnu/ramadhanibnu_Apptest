import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput as TextInputRN,
  View,
} from 'react-native';

const TextInput = ({
  label,
  placeholder,
  onPress,
  defaultValue,
  value,
  onChangeText,
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInputRN
        placeholder={placeholder}
        style={styles.input}
        defaultValue={defaultValue}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  label: {fontSize: 16, fontFamily: 'Poppins-Regular'},
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 9,
    marginTop: 6,
    marginBottom: 20,
  },
});
