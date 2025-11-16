import { ArrowLeft, Menu } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { InstallPrompt } from "./InstallPrompt";

interface MobileAppBarProps {
  onMenuClick: () => void;
  showBack?: boolean;
}

export function MobileAppBar({ onMenuClick, showBack }: MobileAppBarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "VV Balloon";
      case "/services":
        return "Adventures";
      case "/blogs":
        return "Blog";
      case "/faqs":
        return "FAQs";
      case "/terms":
        return "Terms";
      default:
        return "VV Balloon";
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 glass-card h-14 flex items-center justify-between px-4">
      <button onClick={showBack ? () => navigate(-1) : onMenuClick}>
        {showBack ? <ArrowLeft size={20} /> : <Menu size={20} />}
      </button>

      <h1 className="text-lg font-bold gradient-text">{getPageTitle()}</h1>

      <InstallPrompt />
    </div>
  );
}
