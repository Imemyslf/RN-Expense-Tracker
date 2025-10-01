import { Text, View } from "react-native";

interface ExpensesSummaryProps {
  expenses: number;
  periodName: string;
}

const ExpenseSummary = ({ expenses, periodName }: ExpensesSummaryProps) => {
  return (
    <View>
      <Text>{periodName}</Text>
      <Text>${expenses}</Text>
    </View>
  );
};

export default ExpenseSummary;
