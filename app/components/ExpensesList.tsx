import { FlatList } from "react-native";

import { Expense } from "../types/types";

interface ExpenseListProps {
  expenses: Expense;
}

// {}: ExpenseListProps

const ExpenseList = () => {
  return <FlatList />;
};

export default ExpenseList;
