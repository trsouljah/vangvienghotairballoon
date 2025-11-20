import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/BookingDialog";
import { ServiceGallery } from "@/components/ServiceGallery";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/useIsMobile";
import { FAB } from "@/components/mobile/FAB";
import { balloonGallery, paramotorGallery } from "@/lib/gallery-data";
import heroImage from "@/assets/hero-balloon.jpg";

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<"balloon" | "paramotor">("balloon");
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const openGallery = (type: "balloon" | "paramotor") => {
    setSelectedGallery(type);
    setGalleryOpen(true);
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          height: isMobile ? "70vh" : "100vh",
          minHeight: isMobile ? "70vh" : "100vh",
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold gradient-text animate-float mb-6">
            Vangvieng Hot Air Balloon
          </h1>
          <p className="text-xl md:text-2xl text-foreground/90 mb-8 max-w-3xl mx-auto font-light">
            Experience the breathtaking beauty of Vang Vieng from above. 
            Soar through the skies on unforgettable hot air balloon and paramotor adventures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="gradient-bg text-white animate-glow text-lg px-8 py-6"
              onClick={() => setBookingOpen(true)}
            >
              Book Your Adventure
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/40 hover:bg-white/10 text-lg px-8 py-6 bg-black/30"
              onClick={() => navigate("/services")}
            >
              Explore Adventures
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Our Services
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Choose your perfect aerial adventure in Vang Vieng
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Hot Air Balloon */}
          <div className="glass-card p-8 rounded-2xl hover:scale-105 transition-transform duration-300">
            <div className="text-6xl mb-6 text-center">🎈</div>
            <h3 className="text-3xl font-bold mb-4 text-center gradient-text">
              Hot Air Balloon Trips
            </h3>
            <p className="text-foreground/80 mb-6 text-center">
              Float peacefully above Vang Vieng's stunning limestone karsts and emerald rice paddies
            </p>
            <ul className="space-y-3 mb-6 text-foreground/90">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span><strong>Two shifts:</strong> Sunrise & Sunset</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span><strong>Flight time:</strong> 30 to 45 minutes depending on weather</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span><strong>Price:</strong> $100 per person</span>
              </li>
            </ul>
            <div className="flex gap-3">
              <Button
                className="flex-1 gradient-bg text-white"
                onClick={() => setBookingOpen(true)}
              >
                Book Now
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-primary/50 hover:bg-primary/10"
                onClick={() => openGallery("balloon")}
              >
                View Gallery
              </Button>
            </div>
          </div>

          {/* Paramotor */}
          <div className="glass-card p-8 rounded-2xl hover:scale-105 transition-transform duration-300">
            <div className="text-6xl mb-6 text-center">🪂</div>
            <h3 className="text-3xl font-bold mb-4 text-center gradient-text">
              Paramotor Flights
            </h3>
            <p className="text-foreground/80 mb-6 text-center">
              Feel the thrill of powered paragliding with breathtaking aerial views
            </p>
            <ul className="space-y-3 mb-6 text-foreground/90">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span><strong>Available:</strong> Anytime during daylight</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span><strong>Flight duration:</strong> 15 minutes</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span><strong>Price:</strong> $80 per person</span>
              </li>
            </ul>
            <div className="flex gap-3">
              <Button
                className="flex-1 gradient-bg text-white"
                onClick={() => setBookingOpen(true)}
              >
                Book Now
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-primary/50 hover:bg-primary/10"
                onClick={() => openGallery("paramotor")}
              >
                View Gallery
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              About Us
            </h2>
          </div>

          <div className="glass-card p-8 md:p-12 rounded-2xl space-y-8">
            <div>
              <p className="text-lg text-foreground/90 leading-relaxed">
                Welcome to <strong className="gradient-text">Vangvieng Hot Air Balloon</strong> — your trusted adventure partner in the heart of Laos.
                We specialize in creating unforgettable aerial experiences above Vang Vieng, one of the most iconic and breathtaking destinations in the country.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold gradient-text mb-4">Our Mission</h3>
              <p className="text-foreground/90 leading-relaxed mb-3">
                Our mission is simple:
              </p>
              <p className="text-lg text-foreground/90 leading-relaxed">
                👉 To help travelers explore, discover, and fall in love with the natural beauty of Vang Vieng from the sky.
              </p>
              <p className="text-foreground/90 leading-relaxed mt-4">
                From thrilling hot air balloon flights to exciting paramotor adventures, we are dedicated to offering safe, unique, and memorable journeys for every visitor.
              </p>
              <p className="text-foreground/90 leading-relaxed mt-4">
                At Vangvieng Hot Air Balloon, we are proud to work with skilled and experienced local pilots who ensure you enjoy a truly authentic and safe adventure.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold gradient-text mb-6">🌟 Why Choose Us</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-semibold text-primary mb-2">Easy & Flexible Booking</h4>
                    <p className="text-foreground/80">
                      A simple and flexible booking system via WhatsApp, with payment available in local currency (LAK) or US Dollars (USD).
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-primary mb-2">Safety First</h4>
                    <p className="text-foreground/80">
                      We operate with certified equipment and trained guides for every activity. Your safety is our top priority.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-semibold text-primary mb-2">Personalized Support</h4>
                    <p className="text-foreground/80">
                      Fast responses, friendly assistance, and flexible booking options tailored to your needs.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-primary mb-2">Convenient Services</h4>
                    <p className="text-foreground/80">
                      All prices include pick-up and drop-off service. Pick-up is scheduled 1 hour before the flight for your comfort and convenience.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 p-6 rounded-xl border border-primary/30">
              <h3 className="text-2xl font-bold gradient-text mb-4">🛡 Safety Guaranteed</h3>
              <ul className="space-y-2 text-foreground/90">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>A highly reliable and committed team</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Professional, certified, and highly experienced pilots</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Certified equipment and regular safety inspections</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <BookingDialog open={bookingOpen} onOpenChange={setBookingOpen} />
      
      <ServiceGallery
        images={selectedGallery === "balloon" ? balloonGallery : paramotorGallery}
        open={galleryOpen}
        onOpenChange={setGalleryOpen}
      />

      {isMobile && <FAB onClick={() => setBookingOpen(true)} />}
    </div>
  );
}
