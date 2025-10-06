import { FlatList, StyleSheet } from "react-native";

import { Expense, ExpenseListProps } from "../../types/types";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ expenses }: ExpenseListProps) => {
  const renderExpenseItem = ({ item }: { item: Expense }) => {
    return <ExpenseItem {...item} />;
  };

  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpenseList;

const styles = StyleSheet.create({});
