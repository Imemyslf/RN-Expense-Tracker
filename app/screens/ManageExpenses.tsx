import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { GlobalStyles } from "../constants/styles";
import { RootStackScreen } from "../navigation/navigation";
import { ExpensesContext } from "../store/expenses-context";
import { ExpenseDataType } from "../types/types";
import { deleteExpense, storeExpense, updateExpense } from "../utils/http";

type ManageExpensesScreenProps = NativeStackScreenProps<
  RootStackScreen,
  "ManageExpenses"
>;

const ManageExpenses = (props: ManageExpensesScreenProps) => {
  const expensesCtx = useContext(ExpensesContext);
  const [isSubmbitting, setIsSubmitting] = useState<boolean>(false);

  const editedExpenseId = props.route.params?.expenseId;
  console.log(editedExpenseId);

  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: isEditing ? "Edit-Expense" : "Add-Expense",
    });
  }, [props, isEditing]);

  const deletExpenseHandler = async () => {
    setIsSubmitting(true);
    await deleteExpense(editedExpenseId!);
    expensesCtx.deleteExpense(editedExpenseId!);
    props.navigation.goBack();
  };

  const cancleHandler = () => {
    props.navigation.goBack();
  };

  const confirmHandler = async (expenseData: ExpenseDataType) => {
    setIsSubmitting(true);
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, expenseData);
      await updateExpense(editedExpenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      expensesCtx.addExpense({ ...expenseData, id: id });
    }
    props.navigation.goBack();
  };

  if (isSubmbitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancle={cancleHandler}
        onConfirm={confirmHandler}
        submitButtonLable={isEditing ? "Update" : "Add"}
        defaultValues={selectedExpense}
      />

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
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
