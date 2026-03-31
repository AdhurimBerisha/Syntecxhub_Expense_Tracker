import { useMemo } from "react";
import type { Expense } from "@/lib/mockApi";
import { CATEGORIES } from "@/lib/mockApi";
import { DollarSign, TrendingDown, BarChart3 } from "lucide-react";

interface ExpenseSummaryProps {
  expenses: Expense[];
}

const ExpenseSummary = ({ expenses }: ExpenseSummaryProps) => {
  // useMemo: derive totals and breakdowns only when expenses change
  const { total, topCategory, count } = useMemo(() => {
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const byCategory: Record<string, number> = {};
    expenses.forEach((e) => {
      byCategory[e.category] = (byCategory[e.category] || 0) + e.amount;
    });
    const topCategory = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];
    return { total, topCategory, count: expenses.length };
  }, [expenses]);

  const cards = [
    {
      label: "Total Spent",
      value: `$${total.toFixed(2)}`,
      icon: DollarSign,
      accent: "bg-primary/10 text-primary",
    },
    {
      label: "Transactions",
      value: count.toString(),
      icon: BarChart3,
      accent: "bg-accent/20 text-accent-foreground",
    },
    {
      label: "Top Category",
      value: topCategory ? `${topCategory[0]}` : "—",
      sub: topCategory ? `$${topCategory[1].toFixed(2)}` : undefined,
      icon: TrendingDown,
      accent: "bg-destructive/10 text-destructive",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-border bg-card p-5 space-y-2"
        >
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${card.accent}`}>
              <card.icon className="h-4 w-4" />
            </div>
            <span className="text-sm text-muted-foreground">{card.label}</span>
          </div>
          <p className="text-2xl font-bold tracking-tight">{card.value}</p>
          {card.sub && <p className="text-sm text-muted-foreground">{card.sub}</p>}
        </div>
      ))}
    </div>
  );
};

export default ExpenseSummary;
