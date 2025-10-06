import { useContext } from "react";
import { StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpenseOutput";
import { ExpensesContext } from "../store/expenses-context";

const AllExpenses = () => {
  const expenseCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expenses={expenseCtx.expenses}
      expensePeriod="Total"
      fallBacktext="No registered expenses found!"
    />
  );
};

export default AllExpenses;

const styles = StyleSheet.create({});
