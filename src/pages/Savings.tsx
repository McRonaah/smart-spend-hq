
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Calendar, Edit, PlusCircle, Trash2 } from "lucide-react";
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
import { toast } from "@/components/ui/sonner";

interface SavingGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
}

const MOCK_SAVING_GOALS: SavingGoal[] = [
  {
    id: "1",
    name: "Emergency Fund",
    targetAmount: 10000,
    currentAmount: 6500,
    targetDate: "2023-12-31",
  },
  {
    id: "2",
    name: "Vacation",
    targetAmount: 3000,
    currentAmount: 1200,
    targetDate: "2023-09-15",
  },
  {
    id: "3",
    name: "New Car",
    targetAmount: 20000,
    currentAmount: 8500,
    targetDate: "2024-06-30",
  },
  {
    id: "4",
    name: "Home Down Payment",
    targetAmount: 50000,
    currentAmount: 15000,
    targetDate: "2025-01-15",
  },
];

export default function Savings() {
  const [savingGoals, setSavingGoals] = useState<SavingGoal[]>(MOCK_SAVING_GOALS);
  const [open, setOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<SavingGoal | null>(null);

  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: "",
    currentAmount: "",
    targetDate: new Date().toISOString().slice(0, 10),
  });

  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.targetDate) {
      toast.error("Please fill all required fields");
      return;
    }

    const goalToAdd = {
      id: editingGoal ? editingGoal.id : Date.now().toString(),
      name: newGoal.name,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: parseFloat(newGoal.currentAmount || "0"),
      targetDate: newGoal.targetDate,
    };

    if (editingGoal) {
      setSavingGoals(
        savingGoals.map((goal) =>
          goal.id === editingGoal.id ? goalToAdd : goal
        )
      );
      toast.success("Saving goal updated successfully");
    } else {
      setSavingGoals([...savingGoals, goalToAdd]);
      toast.success("Saving goal added successfully");
    }

    setNewGoal({
      name: "",
      targetAmount: "",
      currentAmount: "",
      targetDate: new Date().toISOString().slice(0, 10),
    });
    setEditingGoal(null);
    setOpen(false);
  };

  const handleEdit = (goal: SavingGoal) => {
    setEditingGoal(goal);
    setNewGoal({
      name: goal.name,
      targetAmount: goal.targetAmount.toString(),
      currentAmount: goal.currentAmount.toString(),
      targetDate: goal.targetDate,
    });
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    setSavingGoals(savingGoals.filter((goal) => goal.id !== id));
    toast.success("Saving goal deleted successfully");
  };

  // Calculate the total savings
  const totalSavings = savingGoals.reduce(
    (sum, goal) => sum + goal.currentAmount,
    0
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Savings Goals</h2>
            <p className="text-muted-foreground mt-1">
              Track and manage your saving goals
            </p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Saving Goal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingGoal ? "Edit Saving Goal" : "Create New Saving Goal"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Goal Name
                  </label>
                  <Input
                    id="name"
                    placeholder="e.g., Emergency Fund"
                    value={newGoal.name}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="targetAmount" className="text-sm font-medium">
                    Target Amount
                  </label>
                  <Input
                    id="targetAmount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newGoal.targetAmount}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, targetAmount: e.target.value })
                    }
                  />
                </div>
                {editingGoal && (
                  <div className="space-y-2">
                    <label htmlFor="currentAmount" className="text-sm font-medium">
                      Current Amount
                    </label>
                    <Input
                      id="currentAmount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={newGoal.currentAmount}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, currentAmount: e.target.value })
                      }
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <label htmlFor="targetDate" className="text-sm font-medium">
                    Target Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="targetDate"
                      type="date"
                      className="pl-8"
                      value={newGoal.targetDate}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, targetDate: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleAddGoal}>
                  {editingGoal ? "Update Goal" : "Add Goal"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Total Savings</CardTitle>
              <CardDescription>Current amount in all saving goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                ${totalSavings.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Saving Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">50/30/20 Rule</h4>
                <p className="text-sm text-muted-foreground">
                  Allocate 20% of your income to savings and debt repayment.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Emergency Fund</h4>
                <p className="text-sm text-muted-foreground">
                  Build an emergency fund to cover 3-6 months of expenses.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Your Saving Goals</h3>
          
          <div className="grid gap-4 md:grid-cols-2">
            {savingGoals.map((goal) => {
              const percentage = Math.min(
                Math.round((goal.currentAmount / goal.targetAmount) * 100),
                100
              );
              
              const daysLeft = Math.ceil(
                (new Date(goal.targetDate).getTime() - new Date().getTime()) /
                  (1000 * 60 * 60 * 24)
              );
              
              const amountLeft = goal.targetAmount - goal.currentAmount;
              
              return (
                <Card key={goal.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{goal.name}</CardTitle>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(goal)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(goal.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardDescription>
                      Target: ${goal.targetAmount.toLocaleString()} by{" "}
                      {new Date(goal.targetDate).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>${goal.currentAmount.toLocaleString()}</span>
                          <span>${goal.targetAmount.toLocaleString()}</span>
                        </div>
                        <Progress 
                          value={percentage} 
                          className={`h-2 ${percentage >= 100 ? 'bg-budget-safe' : ''}`} 
                        />
                        <div className="text-xs text-muted-foreground text-right">
                          {percentage}% complete
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/50 pt-2">
                    <div className="w-full flex justify-between text-sm text-muted-foreground">
                      <div>
                        ${amountLeft.toLocaleString()} left
                      </div>
                      <div>
                        {daysLeft > 0 ? `${daysLeft} days remaining` : "Goal date passed"}
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
            
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Card className="flex items-center justify-center min-h-[227px] border-dashed cursor-pointer hover:border-primary hover:bg-primary/5">
                  <div className="text-center">
                    <PlusCircle className="h-10 w-10 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 font-medium">Create New Goal</h3>
                  </div>
                </Card>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
