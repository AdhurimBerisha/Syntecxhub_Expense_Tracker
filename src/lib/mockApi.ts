export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

const CATEGORIES = ["Food", "Transport", "Entertainment", "Utilities", "Shopping", "Health"];

const mockExpenses: Expense[] = [
  { id: "1", description: "Grocery shopping", amount: 85.5, category: "Food", date: "2026-03-28" },
  { id: "2", description: "Uber ride", amount: 24.0, category: "Transport", date: "2026-03-27" },
  { id: "3", description: "Netflix subscription", amount: 15.99, category: "Entertainment", date: "2026-03-26" },
  { id: "4", description: "Electric bill", amount: 120.0, category: "Utilities", date: "2026-03-25" },
  { id: "5", description: "New headphones", amount: 79.99, category: "Shopping", date: "2026-03-24" },
  { id: "6", description: "Gym membership", amount: 45.0, category: "Health", date: "2026-03-23" },
  { id: "7", description: "Coffee & pastry", amount: 12.4, category: "Food", date: "2026-03-22" },
  { id: "8", description: "Gas station", amount: 55.0, category: "Transport", date: "2026-03-21" },
];

export const fetchExpenses = (): Promise<Expense[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockExpenses]), 800);
  });
};

export { CATEGORIES };
