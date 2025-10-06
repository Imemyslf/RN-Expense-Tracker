import { GlobalStyles } from "@/app/constants/styles";
import { InputProps } from "@/app/types/types";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const Input = ({ label, invalid, style, textInputConfig }: InputProps) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidlable]}>
        {label}
      </Text>
      <TextInput
        {...textInputConfig}
        style={[
          styles.input,
          textInputConfig?.multiline && styles.inputMultiline,
          invalid && styles.invalidInput,
        ]}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 5,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    verticalAlign: "top",
  },
  invalidlable: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
