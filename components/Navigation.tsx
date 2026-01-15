import { Button } from "./ui/button";
import { 
  Heart, 
  ShoppingCart,
  Pill,
  FlaskConical,
  Stethoscope,
  Brain,
  Crown,
  Tag,
  Menu
} from "lucide-react";
import { PageView } from "../App";
import { useState } from "react";

interface NavigationProps {
  onNavigate: (view: PageView) => void;
  onGetStarted?: () => void;
  cartCount?: number;
}

export function Navigation({ onNavigate, onGetStarted, cartCount = 0 }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainMenuItems = [
    { label: "Home", view: "home" as PageView },
    { label: "Features", view: "features" as PageView },
    { label: "How it Works", view: "how-it-works" as PageView },
    { label: "Pricing", view: "pricing" as PageView },
    { label: "AI & Advanced Features", view: "ai-features" as PageView },
  ];

  const categoryItems = [
    { label: "Medicine", view: "medicine" as PageView, icon: Pill },
    { label: "Healthcare", view: "healthcare" as PageView, icon: Heart },
    { label: "Doctor Consult", view: "doctor-consult" as PageView, icon: Stethoscope },
    { label: "Lab Tests", view: "lab-tests" as PageView, icon: FlaskConical },
    { label: "PLUS", view: "plus" as PageView, icon: Crown },
    { label: "Health Insights", view: "health-insights" as PageView, icon: Brain },
    { label: "Offers", view: "offers" as PageView, icon: Tag },
  ];

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Nav */}
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate("home")}> 
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-fuchsia-500 rounded-lg flex items-center justify-center shadow-sm">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl text-foreground">E-Clinic</span>
          </div>
          
          {/* Desktop Main Menu */}
          <div className="hidden lg:flex items-center gap-6">
            {mainMenuItems.map((item) => (
              <button
                key={item.view}
                onClick={() => onNavigate(item.view)}
                className="text-sm text-foreground/80 hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => onNavigate("contact")}
              className="text-sm text-foreground/80 hover:text-primary transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              className="hidden md:flex"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1 rounded-full">
                  {cartCount}
                </span>
              )}
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => onNavigate("login")}
              className="hidden md:flex"
            >
              Login
            </Button>
            {onGetStarted && (
              <Button onClick={onGetStarted} className="hidden md:flex">
                Get Started
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="border-t border-border hidden md:block bg-secondary/40">
          <div className="flex items-center gap-6 py-2 overflow-x-auto">
            {categoryItems.map((item) => (
              <button
                key={item.view}
                onClick={() => onNavigate(item.view)}
                className="flex items-center gap-2 whitespace-nowrap text-foreground/70 hover:text-primary transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t py-4 space-y-2">
            {mainMenuItems.map((item) => (
              <button
                key={item.view}
                onClick={() => {
                  onNavigate(item.view);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-accent rounded"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onNavigate("contact");
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-accent rounded"
            >
              Contact
            </button>
            <div className="border-t pt-2 mt-2">
              {categoryItems.map((item) => (
                <button
                  key={item.view}
                  onClick={() => {
                    onNavigate(item.view);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 hover:bg-accent rounded"
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
