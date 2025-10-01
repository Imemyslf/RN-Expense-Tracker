import { View } from "react-native";

import ExpenseList from "./ExpensesList";
import ExpenseSummary from "./ExpensesSummary";

interface ExpensesOutputProps {
  expenses: number;
  expensePeriod: string;
}

const ExpensesOutput = ({ expenses, expensePeriod }: ExpensesOutputProps) => {
  return (
    <View>
      <ExpenseSummary expenses={expenses} periodName={expensePeriod} />
      <ExpenseList />
    </View>
  );
};

export default ExpensesOutput;
