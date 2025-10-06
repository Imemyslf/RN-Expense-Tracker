import { StyleSheet } from "react-native";

import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpenseOutput";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { ExpensesContext } from "../store/expenses-context";
import { Expense } from "../types/types";
import { getDateMinusDays } from "../utils/date";
import { fetchExpense } from "../utils/http";

const RecentExpenses: React.FC = () => {
  const expensesCtx = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    const getExpenseHandler = async () => {
      const expenses: Expense[] = await fetchExpense();
      setIsFetching(false);
      expensesCtx.setExpense(expenses);
    };

    getExpenseHandler();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });
  console.log("Recent-Expenses", recentExpenses);
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensePeriod="Last 7 days"
      fallBacktext="No expenses registered for the last 7 days."
    />
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({});
