import { Heart } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

export function Footer() {
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <footer className="glass-card mt-10 py-3">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-foreground/80 flex items-center justify-center gap-1">
          © 2025 Made with{" "}
          <Heart className="h-3.5 w-3.5 fill-primary text-primary" /> in
          Vangvieng. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
