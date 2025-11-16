import { useState } from "react";
import { CircleDot, Plane, Shield, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/BookingDialog";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/useIsMobile";
import { FAB } from "@/components/mobile/FAB";
import heroImage from "@/assets/hero-balloon.webp";

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const services = [
    {
      icon: CircleDot,
      title: "Hot Air Balloon Experience",
      description: "Float peacefully above Vang Vieng's limestone karsts and rice paddies",
      details: [
        "Two shifts: Sunrise & Sunset",
        "Flight time: 30-45 minutes",
        "Price: $100 per person",
      ],
      link: "/services?service=balloon",
    },
    {
      icon: Plane,
      title: "Paramotor Flight",
      description: "Feel the adrenaline rush of powered paragliding",
      details: [
        "Available anytime during daylight",
        "Flight time: 15 minutes",
        "Price: $80 per person",
      ],
      link: "/services?service=paramotor",
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Professional Pilots",
      description: "Certified and experienced professionals",
    },
    {
      icon: Clock,
      title: "Flexible Schedules",
      description: "Multiple shifts to fit your plans",
    },
    {
      icon: Users,
      title: "Small Groups",
      description: "Intimate experience with personalized attention",
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Highest safety standards",
    },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          height: isMobile ? "60vh" : "100vh",
          minHeight: isMobile ? "60vh" : "100vh",
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold gradient-text animate-float mb-6">
            Soar Above Vang Vieng
          </h1>
          <p className="text-lg md:text-xl text-foreground/90 mb-8 max-w-2xl mx-auto">
            Experience breathtaking views from hot air balloons and paramotor flights over the stunning landscapes of Vang Vieng, Laos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="gradient-bg text-white animate-glow"
              onClick={() => setBookingOpen(true)}
            >
              Book Your Adventure
            </Button>
            {!isMobile && (
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 hover:bg-white/10"
                onClick={() => navigate("/services")}
              >
                Explore Adventures
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Choose Your Adventure
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="glass-card p-6 md:p-8 rounded-2xl">
              <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mb-6">
                <service.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-foreground/80 mb-6">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.details.map((detail, i) => (
                  <li key={i} className="text-sm text-foreground/70">
                    • {detail}
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                className="w-full border-primary/50 hover:bg-primary/10"
                onClick={() => navigate(service.link)}
              >
                View Details
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Why Choose Us
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="glass-card p-6 rounded-xl text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <BookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
      />

      {isMobile && <FAB onClick={() => setBookingOpen(true)} />}
    </div>
  );
}
