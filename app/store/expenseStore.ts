import { create } from 'zustand';



export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

interface ExpenseState {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => Promise<void>;
}

export const useExpenseStore = create<ExpenseState>((set) => ({
  expenses: [],

  addExpense: (expense) =>
    set((state) => ({
      expenses: [expense, ...state.expenses],
    })),

  deleteExpense: (id) =>
    new Promise<void>((resolve) => {
      set((state) => ({
        expenses: state.expenses.filter(
          (item) => item.id !== id
        ),
      }));
      resolve();
    }),
}));