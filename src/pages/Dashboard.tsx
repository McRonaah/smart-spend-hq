
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, LineChart, ResponsiveContainer, Pie, Cell, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { ArrowDown, ArrowUp, DollarSign, Landmark, PiggyBank, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

// Mock data for charts
const SPENDING_DATA = [
  { name: "Groceries", value: 500, color: "#6366F1" },
  { name: "Rent", value: 1200, color: "#10B981" },
  { name: "Utilities", value: 300, color: "#F59E0B" },
  { name: "Entertainment", value: 200, color: "#EF4444" },
  { name: "Transportation", value: 150, color: "#8B5CF6" }
];

const MONTHLY_SPENDING = [
  { month: "Jan", amount: 2100 },
  { month: "Feb", amount: 1900 },
  { month: "Mar", amount: 2300 },
  { month: "Apr", amount: 2800 },
  { month: "May", amount: 2400 },
  { month: "Jun", amount: 2200 },
  { month: "Jul", amount: 2450 },
];

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
}

const StatCard = ({ title, value, icon, trend }: StatCardProps) => (
  <Card className="stat-card">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <h3 className="stat-title">{title}</h3>
      <div className="h-4 w-4 text-muted-foreground">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="stat-value">{value}</div>
      {trend && (
        <p className={`text-xs ${trend.positive ? "text-budget-safe" : "text-budget-danger"} flex items-center gap-1 mt-1`}>
          {trend.positive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
          {trend.value} from last month
        </p>
      )}
    </CardContent>
  </Card>
);

export default function Dashboard() {
  const [progressValue, setProgressValue] = useState(0);
  
  // Animate progress bar on component mount
  useEffect(() => {
    const timer = setTimeout(() => setProgressValue(72), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, Alex!</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Total Balance" 
            value="$12,580" 
            icon={<DollarSign className="h-4 w-4" />}
            trend={{ value: "5.2%", positive: true }}
          />
          <StatCard 
            title="Monthly Spending" 
            value="$2,450" 
            icon={<Wallet className="h-4 w-4" />}
            trend={{ value: "2.1%", positive: false }}
          />
          <StatCard 
            title="Savings" 
            value="$4,250" 
            icon={<PiggyBank className="h-4 w-4" />} 
            trend={{ value: "8.5%", positive: true }}
          />
          <StatCard 
            title="Investments" 
            value="$6,320" 
            icon={<Landmark className="h-4 w-4" />}
            trend={{ value: "3.2%", positive: true }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-7 lg:col-span-4">
            <CardHeader>
              <CardTitle>Spending Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={MONTHLY_SPENDING} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                  <Legend />
                  <Line type="monotone" dataKey="amount" stroke="#6366F1" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="col-span-7 lg:col-span-3">
            <CardHeader>
              <CardTitle>Spending Categories</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={SPENDING_DATA}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {SPENDING_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-3 lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Budget Overview</CardTitle>
              <Button variant="outline" size="sm">View all</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div>Monthly Budget</div>
                  <div className="font-medium">
                    $2,450 / $3,400
                  </div>
                </div>
                <Progress value={progressValue} className="h-2" />
              </div>
              
              {[
                { category: "Groceries", spent: 500, total: 600, progress: 83 },
                { category: "Entertainment", spent: 200, total: 300, progress: 66 },
                { category: "Transportation", spent: 150, total: 200, progress: 75 }
              ].map((budget, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div>{budget.category}</div>
                    <div className="font-medium">
                      ${budget.spent} / ${budget.total}
                    </div>
                  </div>
                  <Progress value={budget.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Grocery Store", amount: -120.50, date: "Today" },
                { name: "Salary Deposit", amount: 3200, date: "Yesterday" },
                { name: "Electric Bill", amount: -95.40, date: "Jun 15" },
                { name: "Restaurant", amount: -65.20, date: "Jun 14" }
              ].map((transaction, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{transaction.name}</p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                  <div className={transaction.amount > 0 ? "text-budget-safe font-medium" : "text-foreground font-medium"}>
                    {transaction.amount > 0 ? "+" : ""}{transaction.amount.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    })}
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">View all transactions</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
