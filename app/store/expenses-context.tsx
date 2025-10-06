import { createContext, useReducer } from "react";
import {
  Expense,
  ExpenseAction,
  ExpenseContextProviderProps,
  ExpenseItemProps,
  ExpensesContextType,
} from "../types/types";

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  setExpense: () => {},
  addExpense: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
});

const expenseReducer = (state: Expense[], action: ExpenseAction): Expense[] => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "ADD":
      return [action.payload, ...state];
    case "UPDATE":
      const updatedableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updateableExpense = state[updatedableExpenseIndex];
      const updatedItem: Expense = {
        ...updateableExpense,
        ...action.payload.data,
        id: action.payload.id,
      };
      const updatedExpenses = [...state];
      updatedExpenses[updatedableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
};

export const ExpensesContextProvider = ({
  children,
}: ExpenseContextProviderProps) => {
  const [expenseState, dispatch] = useReducer(expenseReducer, []);

  function setExpense(expenseData: Expense[]) {
    dispatch({ type: "SET", payload: expenseData });
  }

  function addExpense(expenseData: Expense) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id: string) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id: string, expenseData: ExpenseItemProps) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expenseState,
    setExpense: setExpense,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};
