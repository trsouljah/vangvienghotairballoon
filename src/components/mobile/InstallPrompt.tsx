import { Download } from "lucide-react";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";
import { useIsStandalone } from "@/hooks/useIsStandalone";
import { Button } from "@/components/ui/button";

export function InstallPrompt() {
  const { isInstallable, promptInstall } = useInstallPrompt();
  const isStandalone = useIsStandalone();

  if (!isInstallable || isStandalone) return null;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={promptInstall}
      className="h-8 w-8 p-0"
    >
      <Download className="h-4 w-4" />
    </Button>
  );
}
