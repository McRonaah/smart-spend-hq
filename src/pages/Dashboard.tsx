import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/hooks/useProfile";
import { toast } from "@/components/ui/sonner";
import { User } from "@supabase/supabase-js";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const { profile, loading } = useProfile(user);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            {loading 
              ? "Loading..." 
              : `Welcome back, ${profile?.full_name || 'User'}!`
            }
          </p>
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
