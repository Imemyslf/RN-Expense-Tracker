import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useLayoutEffect } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { RootStackScreen } from "../navigation/navigation";
import { ExpensesContext } from "../store/expenses-context";

type ManageExpensesScreenProps = NativeStackScreenProps<
  RootStackScreen,
  "ManageExpenses"
>;

const ManageExpenses = (props: ManageExpensesScreenProps) => {
  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = props.route.params?.expenseId;
  console.log(editedExpenseId);

  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: isEditing ? "Edit-Expense" : "Add-Expense",
    });
  }, [props, isEditing]);

  const deletExpenseHandler = () => {
    expensesCtx.deleteExpense(editedExpenseId!);
    props.navigation.goBack();
  };
  const cancleHandler = () => {
    props.navigation.goBack();
  };
  const confirmHandler = () => {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, {
        description: "Test!!",
        amount: 19.99,
        date: new Date("2025-05-16"),
      });
    } else {
      expensesCtx.addExpense({
        description: "Test",
        amount: 19.99,
        date: new Date(),
      });
    }
    props.navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TextInput />
      <View style={styles.buttons}>
        <Button mode="flat" onPress={cancleHandler} style={styles.button}>
          Cancle
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deletExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
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
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
