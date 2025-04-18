
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { PlusCircle, Filter, Search, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
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

interface Expense {
  id: string;
  date: string;
  category: string;
  amount: number;
  description: string;
}

const MOCK_EXPENSES: Expense[] = [
  {
    id: "1",
    date: "2023-06-18",
    category: "Food & Dining",
    amount: 45.8,
    description: "Dinner at Italian restaurant",
  },
  {
    id: "2",
    date: "2023-06-17",
    category: "Transportation",
    amount: 25.5,
    description: "Uber ride",
  },
  {
    id: "3",
    date: "2023-06-15",
    category: "Entertainment",
    amount: 18.0,
    description: "Movie tickets",
  },
  {
    id: "4",
    date: "2023-06-12",
    category: "Utilities",
    amount: 85.2,
    description: "Electricity bill",
  },
  {
    id: "5",
    date: "2023-06-10",
    category: "Shopping",
    amount: 120.45,
    description: "New clothes",
  },
  {
    id: "6",
    date: "2023-06-08",
    category: "Food & Dining",
    amount: 32.4,
    description: "Grocery shopping",
  },
  {
    id: "7",
    date: "2023-06-05",
    category: "Health",
    amount: 65.0,
    description: "Pharmacy",
  },
];

export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>(MOCK_EXPENSES);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const [newExpense, setNewExpense] = useState({
    date: new Date().toISOString().slice(0, 10),
    category: "",
    amount: "",
    description: "",
  });

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || expense.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddExpense = () => {
    if (!newExpense.category || !newExpense.amount || !newExpense.description) {
      toast.error("Please fill all required fields");
      return;
    }

    const expenseToAdd = {
      id: editingExpense ? editingExpense.id : Date.now().toString(),
      date: newExpense.date,
      category: newExpense.category,
      amount: parseFloat(newExpense.amount),
      description: newExpense.description,
    };

    if (editingExpense) {
      setExpenses(
        expenses.map((exp) =>
          exp.id === editingExpense.id ? expenseToAdd : exp
        )
      );
      toast.success("Expense updated successfully");
    } else {
      setExpenses([expenseToAdd, ...expenses]);
      toast.success("Expense added successfully");
    }

    setNewExpense({
      date: new Date().toISOString().slice(0, 10),
      category: "",
      amount: "",
      description: "",
    });
    setEditingExpense(null);
    setOpen(false);
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setNewExpense({
      date: expense.date,
      category: expense.category,
      amount: expense.amount.toString(),
      description: expense.description,
    });
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
    toast.success("Expense deleted successfully");
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Expenses</h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingExpense ? "Edit Expense" : "Add New Expense"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium">
                    Date
                  </label>
                  <Input
                    id="date"
                    type="date"
                    value={newExpense.date}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, date: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Category
                  </label>
                  <Select
                    value={newExpense.category}
                    onValueChange={(value) =>
                      setNewExpense({ ...newExpense, category: value })
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
                    Amount
                  </label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newExpense.amount}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, amount: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Input
                    id="description"
                    placeholder="Enter a description"
                    value={newExpense.description}
                    onChange={(e) =>
                      setNewExpense({
                        ...newExpense,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleAddExpense}>
                  {editingExpense ? "Update Expense" : "Add Expense"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
          <div className="flex items-center w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search expenses..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select
              value={categoryFilter}
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>
                      {new Date(expense.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell className="text-right">
                      {expense.amount.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(expense)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(expense.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No expenses found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
}
