import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Blogs from "./pages/Blogs";
import FAQs from "./pages/FAQs";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MobileLayout } from "./components/mobile/MobileLayout";
import { ScrollToTop } from "./components/ScrollToTop";
import { useIsMobile } from "./hooks/useIsMobile";
import backgroundImage from "@/assets/background-balloons.jpg";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen w-full">
      <div
        className="fixed-background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      <div className="relative z-10 w-full">
        {!isMobile ? (
          <>
            <Header />
            <main className="pt-20">{children}</main>
            <Footer />
          </>
        ) : (
          <MobileLayout>{children}</MobileLayout>
        )}
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
