import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";

export function Header() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  if (isMobile) return null;

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Adventures" },
    { path: "/blogs", label: "Blog" },
    { path: "/faqs", label: "FAQs" },
    { path: "/terms", label: "T&C" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 glass-card transition-transform duration-300",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold gradient-text">
          Vangvieng Hot Air Balloon
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm transition-colors hover:text-primary",
                isActive(link.path)
                  ? "text-primary font-semibold"
                  : "text-foreground/80"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button
            size="sm"
            className="gradient-bg text-white"
            onClick={() =>
              window.open("https://wa.me/8562092624128", "_blank")
            }
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Contact Us
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 glass-card md:hidden">
            <nav className="flex flex-col p-4 gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-sm py-2 transition-colors",
                    isActive(link.path)
                      ? "text-primary font-semibold"
                      : "text-foreground/80"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                size="sm"
                className="gradient-bg text-white w-full"
                onClick={() => {
                  window.open("https://wa.me/8562092624128", "_blank");
                  setMobileMenuOpen(false);
                }}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Contact Us
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
