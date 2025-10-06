import { GlobalStyles } from "@/app/constants/styles";
import {
  ExpenseDataType,
  ExpenseFormProps,
  InputValueTypes,
} from "@/app/types/types";
import { getFormattedDate } from "@/app/utils/date";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../UI/Button";
import Input from "./Input";

const ExpenseForm = ({
  onCancle,
  onConfirm,
  submitButtonLable,
  defaultValues,
}: ExpenseFormProps) => {
  const [inputs, setInputs] = useState<InputValueTypes>({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description.toString() : "",
      isValid: true,
    },
  });

  const inputChangeHandler = (
    inputIdentifier: string,
    enteredValue: string
  ) => {
    setInputs((currentValues) => {
      return {
        ...currentValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  };

  const submitHandler = () => {
    const [date, month, year] = inputs.date.value.split("/");
    const formattedDate = `${year}-${month}-${date}`;
    console.log("formatted Date:- ", formattedDate);
    console.log("new Date:- ", new Date(formattedDate));

    const expenseData: ExpenseDataType = {
      amount: +inputs.amount.value,
      date: new Date(formattedDate),
      description: inputs.description.value,
    };

    console.log("expenseData.date:- ", expenseData.date);
    console.log(
      "new Date(formattedDate).toString() ",
      new Date(formattedDate).toString()
    );
    console.log("formattedDate.toString() ", formattedDate.toString());

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    console.log(amountIsValid, dateIsValid, descriptionIsValid);

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      //   Alert.alert("Invalid input", "Please check your input values");
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onConfirm(expenseData);
  };

  const formIsValid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            value: inputs.amount.value,
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
          }}
          style={styles.inputRowInput}
        />
        <Input
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "DD/MM/YYYY",
            // placeholder: "YYYY-MM-DD",
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
          style={styles.inputRowInput}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />

      {formIsValid && (
        <Text style={styles.errorText}>
          Invalid Inputs: Please check your entered data!
        </Text>
      )}

      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancle} style={styles.button}>
          Cancle
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLable}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 24,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputRowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    flex: 1,
    margin: 4,
    borderRadius: 8,
  },
});
