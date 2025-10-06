import { StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "@/app/constants/styles";
import { ExpensesOutputProps } from "@/app/types/types";
import ExpenseList from "./ExpensesList";
import ExpenseSummary from "./ExpensesSummary";

const ExpensesOutput = ({
  expenses,
  expensePeriod,
  fallBacktext,
}: ExpensesOutputProps) => {
  let content = <Text style={styles.infoText}>{fallBacktext}</Text>;

  if (expenses.length > 0) {
    content = <ExpenseList expenses={expenses} />;
  }
  return (
    <View style={styles.container}>
      <ExpenseSummary expenses={expenses} periodName={expensePeriod} />
      {content}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
