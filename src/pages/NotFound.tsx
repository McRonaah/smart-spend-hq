
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-5 px-4">
        <div className="space-y-2">
          <h1 className="text-7xl font-bold text-primary">404</h1>
          <h2 className="text-3xl font-semibold">Page not found</h2>
          <p className="text-muted-foreground">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Return to dashboard
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
