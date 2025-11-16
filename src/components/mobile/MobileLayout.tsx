import { ReactNode, useState } from "react";
import { MobileAppBar } from "./MobileAppBar";
import { MobileBottomNav } from "./MobileBottomNav";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { FileText, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface MobileLayoutProps {
  children: ReactNode;
}

export function MobileLayout({ children }: MobileLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen pb-16 pt-14">
      <MobileAppBar onMenuClick={() => setMenuOpen(true)} />

      {children}

      <MobileBottomNav />

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="glass-card border-r border-white/20">
          <SheetHeader>
            <SheetTitle className="gradient-text text-xl">Menu</SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-4 mt-6">
            <Link
              to="/terms"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
            >
              <FileText className="h-5 w-5 text-foreground/80" />
              <span className="text-foreground/80">Terms & Conditions</span>
            </Link>

            <Button
              className="gradient-bg text-white w-full justify-start gap-3"
              onClick={() => {
                window.open("https://wa.me/8562092624128", "_blank");
                setMenuOpen(false);
              }}
            >
              <MessageCircle className="h-5 w-5" />
              Contact Us
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
