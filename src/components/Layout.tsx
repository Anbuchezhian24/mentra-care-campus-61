import { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { Button } from "./ui/button";
import { AlertCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* SOS Banner */}
      <div className="bg-destructive text-destructive-foreground px-4 py-2 text-center text-sm font-medium">
        <div className="flex items-center justify-center gap-2">
          <AlertCircle className="h-4 w-4" />
          Need immediate help? 
          <Button 
            size="sm" 
            variant="outline" 
            className="ml-2 h-6 bg-white/20 border-white/30 text-white hover:bg-white hover:text-destructive"
            asChild
          >
            <Link to="/sos">
              <Phone className="h-3 w-3 mr-1" />
              SOS
            </Link>
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="pb-16">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-card border-t mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-primary mb-2">MentraCare</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Your trusted space for student well-being.
            </p>
            <p className="text-xs text-muted-foreground">
              © 2024 MentraCare. Confidential mental health support platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};