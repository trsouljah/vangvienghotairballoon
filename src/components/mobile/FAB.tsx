import { Calendar } from "lucide-react";
import { useHaptic } from "@/hooks/useHaptic";

interface FABProps {
  onClick: () => void;
}

export function FAB({ onClick }: FABProps) {
  const haptic = useHaptic();

  const handleClick = () => {
    haptic.medium();
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-20 right-4 z-40 h-14 w-14 rounded-full gradient-bg shadow-lg flex items-center justify-center transition-transform active:scale-95"
    >
      <Calendar className="h-6 w-6 text-white" />
    </button>
  );
}
