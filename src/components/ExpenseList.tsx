import { useMemo, useCallback, useState } from "react";
import type { Expense } from "@/lib/mockApi";
import { CATEGORIES } from "@/lib/mockApi";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

const ExpenseList = ({ expenses, onDelete }: ExpenseListProps) => {
  const [filterCategory, setFilterCategory] = useState("all");

  // useMemo: only recompute filtered list when dependencies change
  const filteredExpenses = useMemo(() => {
    if (filterCategory === "all") return expenses;
    return expenses.filter((e) => e.category === filterCategory);
  }, [expenses, filterCategory]);

  // useCallback: stable delete handler
  const handleDelete = useCallback(
    (id: string) => {
      onDelete(id);
    },
    [onDelete]
  );

  const categoryIcon: Record<string, string> = {
    Food: "🍔",
    Transport: "🚗",
    Entertainment: "🎬",
    Utilities: "💡",
    Shopping: "🛍️",
    Health: "💊",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="text-xl font-semibold tracking-tight">Transactions</h2>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-[160px] bg-secondary/50 border-border">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredExpenses.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No expenses found.</p>
      ) : (
        <ul className="space-y-2">
          {filteredExpenses.map((expense) => (
            <li
              key={expense.id}
              className="flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xl flex-shrink-0">{categoryIcon[expense.category] ?? "📦"}</span>
                <div className="min-w-0">
                  <p className="font-medium truncate">{expense.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {expense.category} · {expense.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="font-semibold text-expense">
                  -${expense.amount.toFixed(2)}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => handleDelete(expense.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
