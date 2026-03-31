import { useState, useRef, useCallback, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORIES } from "@/lib/mockApi";
import { Plus } from "lucide-react";

interface ExpenseFormProps {
  onAddExpense: (expense: { description: string; amount: number; category: string; date: string }) => void;
}

const ExpenseForm = ({ onAddExpense }: ExpenseFormProps) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const descriptionRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!description || !amount || !category || !date) return;

      onAddExpense({
        description,
        amount: parseFloat(amount),
        category,
        date,
      });

      setDescription("");
      setAmount("");
      setCategory("");
      setDate(new Date().toISOString().split("T")[0]);

      // useRef: focus back to first field after submission
      descriptionRef.current?.focus();
    },
    [description, amount, category, date, onAddExpense]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">Add Expense</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          ref={descriptionRef}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-secondary/50 border-border"
        />
        <Input
          type="number"
          placeholder="Amount"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-secondary/50 border-border"
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="bg-secondary/50 border-border">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-secondary/50 border-border"
        />
      </div>
      <Button type="submit" className="w-full sm:w-auto gap-2">
        <Plus className="h-4 w-4" />
        Add Expense
      </Button>
    </form>
  );
};

export default ExpenseForm;
