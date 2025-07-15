
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-kawaii-cream px-4">
      <div className="text-center max-w-md">
        <div className="mb-6 relative">
          <div className="w-32 h-32 mx-auto bg-kawaii-lilac rounded-full flex items-center justify-center">
            <span className="text-6xl">😢</span>
          </div>
          <div className="absolute top-0 right-1/4 w-4 h-4 bg-kawaii-pink rounded-full animate-float"></div>
          <div className="absolute bottom-0 left-1/4 w-3 h-3 bg-kawaii-gold rounded-full animate-float" style={{ animationDelay: "1s" }}></div>
        </div>
        
        <h1 className="text-4xl font-display text-purple-700 mb-4">Oopsie!</h1>
        <p className="text-xl text-purple-600 mb-6">
          Bintu can't find this page! It seems our fluffy mascot has misplaced it.
        </p>
        
        <div className="mb-8">
          <p className="text-sm text-purple-500">
            You're looking for: <span className="font-mono bg-kawaii-lilac/30 px-2 py-1 rounded">{location.pathname}</span>
          </p>
        </div>
        
        <Button asChild>
          <Link to="/">
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
