
import { NavLink } from "react-router-dom";
import { 
  BarChart3, 
  Home, 
  CreditCard, 
  Wallet, 
  Target, 
  ChevronRight, 
  ChevronLeft, 
  MessageSquare,
  PiggyBank
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  open: boolean;
}

function NavItem({ to, icon: Icon, label, open }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center py-2 px-3 mb-1 rounded-md text-sm font-medium transition-colors",
          open ? "justify-start" : "justify-center",
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-foreground hover:bg-muted"
        )
      }
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      {open && <span className="ml-3">{label}</span>}
    </NavLink>
  );
}

export function Sidebar({ open, onToggle }: SidebarProps) {
  return (
    <div
      className={cn(
        "bg-card border-r shadow-sm transition-all duration-300 flex flex-col",
        open ? "w-64" : "w-16"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b">
        {open && (
          <h2 className="text-lg font-bold">
            Smart<span className="text-primary">Spend</span>
          </h2>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className={cn(!open && "mx-auto")}
        >
          {open ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </Button>
      </div>
      <nav className="flex-1 p-3">
        <NavItem to="/" icon={Home} label="Dashboard" open={open} />
        <NavItem to="/expenses" icon={CreditCard} label="Expenses" open={open} />
        <NavItem to="/budgets" icon={Target} label="Budgets" open={open} />
        <NavItem to="/transactions" icon={Wallet} label="Transactions" open={open} />
        <NavItem to="/savings" icon={PiggyBank} label="Savings" open={open} />
        <NavItem to="/reports" icon={BarChart3} label="Reports" open={open} />
        <NavItem to="/assistant" icon={MessageSquare} label="Assistant" open={open} />
      </nav>
      <div className="p-3 border-t">
        <div className={cn(
          "p-2 text-xs text-muted-foreground rounded-md bg-muted",
          !open && "text-center"
        )}>
          {open ? (
            <p>Free tier: 85% used</p>
          ) : (
            <p>85%</p>
          )}
        </div>
      </div>
    </div>
  );
}
