import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 animate-gradient" />

      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* 404 Text */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-9xl md:text-[200px] font-bold text-gradient leading-none mb-4">
            404
          </h1>
          <div className="flex items-center justify-center gap-2 mb-6">
            <AlertCircle className="w-6 h-6 text-destructive animate-pulse" />
            <p className="text-2xl md:text-3xl font-semibold text-foreground">
              Page Not Found
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8 space-y-3 animate-fade-in delay-200">
          <p className="text-lg text-muted-foreground">
            Oops! The page you're looking for seems to have wandered off into
            the digital void.
          </p>
          <p className="text-sm text-muted-foreground/80">
            Don't worry though, even the best explorers get lost sometimes.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in delay-300">
          <Button
            asChild
            size="lg"
            className="gap-2 shadow-elegant hover:shadow-glow transition-all"
          >
            <Link to="/">
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link to="/blog">
              <Search className="w-5 h-5" />
              Explore Blog
            </Link>
          </Button>
        </div>

        {/* Error Path Info */}
        <div className="mt-12 p-4 rounded-lg bg-muted/50 border border-border animate-fade-in delay-500">
          <p className="text-xs text-muted-foreground font-mono">
            Requested path:{" "}
            <span className="text-foreground">{location.pathname}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
