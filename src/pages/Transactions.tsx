
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, ArrowUpRight, ArrowDownLeft, ChevronDown, ChevronUp } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data
interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: "income" | "expense";
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    date: "2023-06-20",
    description: "Salary Deposit",
    category: "Income",
    amount: 3200,
    type: "income",
  },
  {
    id: "2",
    date: "2023-06-19",
    description: "Grocery Store",
    category: "Food & Dining",
    amount: 120.5,
    type: "expense",
  },
  {
    id: "3",
    date: "2023-06-18",
    description: "Electric Bill",
    category: "Utilities",
    amount: 95.4,
    type: "expense",
  },
  {
    id: "4",
    date: "2023-06-17",
    description: "Gas Station",
    category: "Transportation",
    amount: 45.2,
    type: "expense",
  },
  {
    id: "5",
    date: "2023-06-16",
    description: "Freelance Payment",
    category: "Income",
    amount: 850,
    type: "income",
  },
  {
    id: "6",
    date: "2023-06-15",
    description: "Restaurant",
    category: "Food & Dining",
    amount: 67.8,
    type: "expense",
  },
  {
    id: "7",
    date: "2023-06-14",
    description: "Internet Bill",
    category: "Utilities",
    amount: 75,
    type: "expense",
  },
  {
    id: "8",
    date: "2023-06-13",
    description: "Movie Tickets",
    category: "Entertainment",
    amount: 32,
    type: "expense",
  },
  {
    id: "9",
    date: "2023-06-12",
    description: "Investment Dividends",
    category: "Income",
    amount: 125.5,
    type: "income",
  },
  {
    id: "10",
    date: "2023-06-10",
    description: "Shopping Mall",
    category: "Shopping",
    amount: 215.75,
    type: "expense",
  },
];

const CATEGORIES = [
  "All",
  "Income",
  "Food & Dining",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Shopping",
];

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortField, setSortField] = useState<"date" | "amount">("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Calculate summary values
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = income - expenses;

  const handleSort = (field: "date" | "amount") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Apply filters and sorting
  const filteredTransactions = transactions
    .filter((transaction) => {
      const matchesSearch = transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" || transaction.category === categoryFilter;
      const matchesType =
        typeFilter === "all" ||
        (typeFilter === "income" && transaction.type === "income") ||
        (typeFilter === "expense" && transaction.type === "expense");
      return matchesSearch && matchesCategory && matchesType;
    })
    .sort((a, b) => {
      if (sortField === "date") {
        return sortDirection === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        // Amount sorting
        return sortDirection === "asc" ? a.amount - b.amount : b.amount - a.amount;
      }
    });

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
          <p className="text-muted-foreground mt-2">
            View and manage all your transactions
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Income
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-budget-safe flex items-center">
                <ArrowDownLeft className="mr-2 h-4 w-4" />
                ${income.toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-budget-danger flex items-center">
                <ArrowUpRight className="mr-2 h-4 w-4" />
                ${expenses.toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${balance >= 0 ? "text-budget-safe" : "text-budget-danger"}`}>
                ${balance.toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-8 w-full md:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
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

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("date")}
                >
                  <div className="flex items-center">
                    Date
                    {sortField === "date" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead
                  className="text-right cursor-pointer"
                  onClick={() => handleSort("amount")}
                >
                  <div className="flex items-center justify-end">
                    Amount
                    {sortField === "amount" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {new Date(transaction.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {transaction.type === "income" ? (
                          <ArrowDownLeft className="mr-2 h-4 w-4 text-budget-safe" />
                        ) : (
                          <ArrowUpRight className="mr-2 h-4 w-4 text-budget-danger" />
                        )}
                        {transaction.description}
                      </div>
                    </TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell
                      className={`text-right font-medium ${
                        transaction.type === "income"
                          ? "text-budget-safe"
                          : ""
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {transaction.amount.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex justify-end">
          <Button variant="outline">Export Transactions</Button>
        </div>
      </div>
    </AppLayout>
  );
}
