import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";

export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: Date;
}

export interface ExpenseItemProps {
  id?: string;
  description: string;
  amount: number;
  date: Date;
}

export interface ExpenseListProps {
  expenses: Expense[];
}

export interface ExpensesSummaryProps {
  expenses: Expense[];
  periodName: string;
}

export interface ExpensesOutputProps {
  expenses: Expense[];
  expensePeriod: string;
  fallBacktext?: string;
}

export interface IconButtonProps {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  size: number;
  color: string;
  onPress: () => void;
}

export interface ButtonProps {
  children: string;
  onPress: () => void;
  mode?: string;
  style?: object;
}

export interface ExpensesContextType {
  expenses: Expense[];
  addExpense: (expense: ExpenseItemProps) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (
    id: string,
    { description, amount, date }: ExpenseItemProps
  ) => void;
}

export interface ExpenseContextProviderProps {
  children: ReactNode;
}

export type ExpenseAction =
  | { type: "ADD"; payload: ExpenseItemProps }
  | { type: "UPDATE"; payload: { id: string; data: ExpenseItemProps } }
  | { type: "DELETE"; payload: string };
