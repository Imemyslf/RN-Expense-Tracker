import axios from "axios";
import { Expense, ExpenseItemProps } from "../types/types";

const BACKEND_URL = `https://expense-tracker-41636-default-rtdb.asia-southeast1.firebasedatabase.app/`;

export const storeExpense = async (expenseData: ExpenseItemProps) => {
  const response = await axios.post(BACKEND_URL + "expense.json", expenseData);
  return response.data.name;
};

export const fetchExpense = async () => {
  const response = await axios.get(BACKEND_URL + "expense.json");

  let expenses: Expense[] = [];

  console.log(response.data);
  for (const key in response.data) {
    const expenseObj: Expense = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
};

export const updateExpense = async (
  id: string,
  expenseData: ExpenseItemProps
) => {
  return await axios.put(BACKEND_URL + `/expense/${id}.json`, expenseData);
};

export const deleteExpense = async (id: string) => {
  return await axios.delete(BACKEND_URL + `/expense/${id}.json`);
};
