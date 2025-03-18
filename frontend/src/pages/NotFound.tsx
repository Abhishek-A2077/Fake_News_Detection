
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4 animate-fade-in">
        <div className="glass p-8 rounded-xl max-w-md">
          <div className="w-16 h-16 glass flex items-center justify-center rounded-full mx-auto mb-6">
            <AlertTriangle className="h-8 w-8 text-falsehood" />
          </div>
          <h1 className="text-4xl font-bold mb-4 font-display">404</h1>
          <p className="text-xl text-muted-foreground mb-8">Oops! This page couldn't be verified as real.</p>
          <Button 
            className="btn-shine" 
            onClick={() => navigate("/")}
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
