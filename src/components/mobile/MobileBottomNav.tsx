import { Home, Plane, BookOpen, HelpCircle, MoreHorizontal } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useHaptic } from "@/hooks/useHaptic";

export function MobileBottomNav() {
  const location = useLocation();
  const haptic = useHaptic();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/services", label: "Adventures", icon: Plane },
    { path: "/blogs", label: "Blog", icon: BookOpen },
    { path: "/faqs", label: "FAQs", icon: HelpCircle },
    { path: "/terms", label: "More", icon: MoreHorizontal },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card h-16 pb-safe">
      <div className="flex items-center justify-around h-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => haptic.light()}
              className={cn(
                "flex flex-col items-center justify-center min-w-[64px] px-3 py-2 transition-all active:scale-95",
                active && "animate-pulse"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 mb-1",
                  active ? "text-primary" : "text-foreground/60"
                )}
              />
              <span
                className={cn(
                  "text-xs font-medium",
                  active ? "text-primary" : "text-foreground/60"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
