import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Heart, 
  MessageCircle, 
  Calendar, 
  BookOpen, 
  Users, 
  BarChart3, 
  Menu, 
  X,
  Phone,
  LogIn,
  LogOut,
  LayoutDashboard
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, requireAuth: true },
  { name: "Home", href: "/", icon: Heart, requireAuth: false },
  { name: "Mentra Bot", href: "/chat", icon: MessageCircle, requireAuth: true },
  { name: "Book Counsellor", href: "/booking", icon: Calendar, requireAuth: true },
  { name: "Resources", href: "/resources", icon: BookOpen, requireAuth: false },
  { name: "Forum", href: "/forum", icon: Users, requireAuth: true },
  { name: "Mood Tracker", href: "/mood", icon: BarChart3, requireAuth: true },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, userRole } = useAuth();

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Filter navigation based on auth status
  const visibleNavigation = navigation.filter(item => 
    !item.requireAuth || (item.requireAuth && user)
  );

  return (
    <nav className="bg-card/95 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">MentraCare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {visibleNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            {user && userRole && (
              <div className="ml-2 px-2 py-1 bg-secondary/20 rounded-full text-xs font-medium text-secondary">
                {userRole}
              </div>
            )}
          </div>

          {/* Auth & SOS Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              asChild
            >
              <Link to="/sos">
                <Phone className="h-4 w-4 mr-1" />
                SOS
              </Link>
            </Button>
            {user ? (
              <Button 
                size="sm" 
                variant="outline"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-1" />
                Sign Out
              </Button>
            ) : (
              <Button size="sm" asChild>
                <Link to="/login">
                  <LogIn className="h-4 w-4 mr-1" />
                  Login
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t py-4">
            <div className="space-y-2">
              {visibleNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              {user && userRole && (
                <div className="px-3 py-1">
                  <div className="px-2 py-1 bg-secondary/20 rounded-full text-xs font-medium text-secondary inline-block">
                    {userRole}
                  </div>
                </div>
              )}
              <div className="flex space-x-2 pt-2 border-t">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link to="/sos" onClick={() => setIsOpen(false)}>
                    <Phone className="h-4 w-4 mr-1" />
                    SOS
                  </Link>
                </Button>
                {user ? (
                  <Button 
                    size="sm" 
                    className="flex-1"
                    variant="outline"
                    onClick={() => {
                      setIsOpen(false);
                      handleSignOut();
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Sign Out
                  </Button>
                ) : (
                  <Button size="sm" className="flex-1" asChild>
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <LogIn className="h-4 w-4 mr-1" />
                      Login
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};