
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, AlertCircle, Edit, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";

// Mock data
const CATEGORIES = [
  "Food & Dining",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Rent & Housing",
  "Shopping",
  "Travel",
  "Health",
  "Education",
  "Other",
];

interface Budget {
  id: string;
  category: string;
  amount: number;
  spent: number;
  period: "monthly" | "yearly";
}

const MOCK_BUDGETS: Budget[] = [
  {
    id: "1",
    category: "Food & Dining",
    amount: 600,
    spent: 485,
    period: "monthly",
  },
  {
    id: "2",
    category: "Transportation",
    amount: 300,
    spent: 210,
    period: "monthly",
  },
  {
    id: "3",
    category: "Entertainment",
    amount: 400,
    spent: 385,
    period: "monthly",
  },
  {
    id: "4",
    category: "Utilities",
    amount: 500,
    spent: 420,
    period: "monthly",
  },
  {
    id: "5",
    category: "Shopping",
    amount: 300,
    spent: 325,
    period: "monthly",
  },
];

export default function Budgets() {
  const [budgets, setBudgets] = useState<Budget[]>(MOCK_BUDGETS);
  const [open, setOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  const [newBudget, setNewBudget] = useState({
    category: "",
    amount: "",
    spent: "0",
    period: "monthly",
  });

  const handleAddBudget = () => {
    if (!newBudget.category || !newBudget.amount) {
      toast.error("Please fill all required fields");
      return;
    }

    const budgetToAdd = {
      id: editingBudget ? editingBudget.id : Date.now().toString(),
      category: newBudget.category,
      amount: parseFloat(newBudget.amount),
      spent: parseFloat(newBudget.spent),
      period: newBudget.period as "monthly" | "yearly",
    };

    if (editingBudget) {
      setBudgets(
        budgets.map((budget) =>
          budget.id === editingBudget.id ? budgetToAdd : budget
        )
      );
      toast.success("Budget updated successfully");
    } else {
      setBudgets([...budgets, budgetToAdd]);
      toast.success("Budget added successfully");
    }

    setNewBudget({
      category: "",
      amount: "",
      spent: "0",
      period: "monthly",
    });
    setEditingBudget(null);
    setOpen(false);
  };

  const handleEdit = (budget: Budget) => {
    setEditingBudget(budget);
    setNewBudget({
      category: budget.category,
      amount: budget.amount.toString(),
      spent: budget.spent.toString(),
      period: budget.period,
    });
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    setBudgets(budgets.filter((budget) => budget.id !== id));
    toast.success("Budget deleted successfully");
  };

  const calculateProgressColor = (spent: number, amount: number) => {
    const percentage = (spent / amount) * 100;
    if (percentage >= 100) return "bg-budget-danger";
    if (percentage >= 80) return "bg-budget-warning";
    return "bg-budget-safe";
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Budget Planner</h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Budget
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingBudget ? "Edit Budget" : "Create New Budget"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Category
                  </label>
                  <Select
                    value={newBudget.category}
                    onValueChange={(value) =>
                      setNewBudget({ ...newBudget, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="amount" className="text-sm font-medium">
                    Budget Amount
                  </label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newBudget.amount}
                    onChange={(e) =>
                      setNewBudget({ ...newBudget, amount: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="period" className="text-sm font-medium">
                    Period
                  </label>
                  <Select
                    value={newBudget.period}
                    onValueChange={(value) =>
                      setNewBudget({ ...newBudget, period: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {editingBudget && (
                  <div className="space-y-2">
                    <label htmlFor="spent" className="text-sm font-medium">
                      Amount Spent
                    </label>
                    <Input
                      id="spent"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={newBudget.spent}
                      onChange={(e) =>
                        setNewBudget({ ...newBudget, spent: e.target.value })
                      }
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <Button onClick={handleAddBudget}>
                  {editingBudget ? "Update Budget" : "Create Budget"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {budgets.map((budget) => {
            const percentage = Math.min(
              Math.round((budget.spent / budget.amount) * 100),
              100
            );
            const isOverBudget = budget.spent > budget.amount;
            const progressColorClass = calculateProgressColor(
              budget.spent,
              budget.amount
            );

            return (
              <Card key={budget.id} className="budget-card">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{budget.category}</CardTitle>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(budget)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(budget.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    {budget.period === "monthly" ? "Monthly" : "Yearly"} Budget
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        ${budget.spent.toFixed(2)} / ${budget.amount.toFixed(2)}
                      </span>
                      <span className="text-sm font-medium">{percentage}%</span>
                    </div>
                    <Progress
                      value={percentage}
                      className={`h-2 ${progressColorClass}`}
                    />
                    {isOverBudget && (
                      <div className="flex items-center text-budget-danger text-sm mt-2">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        <span>
                          Over budget by $
                          {(budget.spent - budget.amount).toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </CardFooter>
              </Card>
            );
          })}

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Card className="budget-card flex items-center justify-center min-h-[227px] border-dashed cursor-pointer hover:border-primary hover:bg-primary/5">
                <div className="text-center">
                  <PlusCircle className="h-10 w-10 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 font-medium">Create New Budget</h3>
                </div>
              </Card>
            </DialogTrigger>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Budget Tips</CardTitle>
            <CardDescription>
              Advice to help you stay on track with your budgets
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">50/30/20 Rule</h4>
              <p className="text-sm text-muted-foreground">
                Try allocating 50% of your income to needs, 30% to wants, and
                20% to savings and debt repayment.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Track Every Expense</h4>
              <p className="text-sm text-muted-foreground">
                Keep track of all your expenses, even small ones, to get an
                accurate picture of your spending habits.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Review Regularly</h4>
              <p className="text-sm text-muted-foreground">
                Review your budgets at least once a month and adjust as needed
                based on your actual spending.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
