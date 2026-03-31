import { useState, useEffect, useCallback } from "react";
import { fetchExpenses, type Expense } from "@/lib/mockApi";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import ExpenseSummary from "@/components/ExpenseSummary";
import { Wallet } from "lucide-react";

const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect: fetch initial data from mock API
  useEffect(() => {
    fetchExpenses().then((data) => {
      setExpenses(data);
      setLoading(false);
    });
  }, []);

  // useCallback: stable add handler passed to form
  const handleAddExpense = useCallback(
    (expense: Omit<Expense, "id">) => {
      const newExpense: Expense = {
        ...expense,
        id: crypto.randomUUID(),
      };
      setExpenses((prev) => [newExpense, ...prev]);
    },
    []
  );

  // useCallback: stable delete handler
  const handleDeleteExpense = useCallback((id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-4xl mx-auto flex items-center gap-3 py-4 px-4">
          <div className="p-2 rounded-lg bg-primary text-primary-foreground">
            <Wallet className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Expense Tracker</h1>
            <p className="text-xs text-muted-foreground">Track your spending effortlessly</p>
          </div>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <>
            <ExpenseSummary expenses={expenses} />

            <div className="rounded-xl border border-border bg-card p-5">
              <ExpenseForm onAddExpense={handleAddExpense} />
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
