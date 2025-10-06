import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { KeyboardTypeOptions } from "react-native";

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
  setExpense: (expense: Expense[]) => void;
  addExpense: (expense: Expense) => void;
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
  | { type: "ADD"; payload: Expense }
  | { type: "UPDATE"; payload: { id: string; data: ExpenseItemProps } }
  | { type: "DELETE"; payload: string }
  | { type: "SET"; payload: Expense[] };

export interface InputProps {
  label: string;
  invalid: boolean;
  textInputConfig: {
    keyboardType?: KeyboardTypeOptions;
    onChangeText?: (text: string) => void;
    placeholder?: string;
    multiline?: boolean;
    value?: string;
  };
  style?: object;
}

export interface ExpenseFormProps {
  onCancle: () => void;
  onConfirm: (data: ExpenseDataType) => void;
  submitButtonLable: string;
  defaultValues: Expense | undefined;
}

export interface ExpenseDataType {
  amount: number;
  description: string;
  date: Date;
}

export interface InputValueTypes {
  amount: { value: string; isValid: boolean };
  date: { value: string; isValid: boolean };
  description: { value: string; isValid: boolean };
}
