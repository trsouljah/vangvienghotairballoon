import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/BookingDialog";
import { ServiceGallery } from "@/components/ServiceGallery";
import { useIsMobile } from "@/hooks/useIsMobile";
import { FAB } from "@/components/mobile/FAB";
import { balloonGallery, paramotorGallery } from "@/lib/gallery-data";

export default function Services() {
  const [searchParams] = useSearchParams();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<"balloon" | "paramotor">("balloon");
  const isMobile = useIsMobile();

  useEffect(() => {
    const service = searchParams.get("service");
    if (service === "balloon" || service === "paramotor") {
      setSelectedGallery(service);
    }
  }, [searchParams]);

  const openGallery = (type: "balloon" | "paramotor") => {
    setSelectedGallery(type);
    setGalleryOpen(true);
  };

  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
            Our Services
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Experience the magic of Vang Vieng from above with our premium aerial adventures
          </p>
        </div>

        {/* Hot Air Balloon Service */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="glass-card p-8 md:p-12 rounded-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-7xl mb-6">🎈</div>
                <h2 className="text-4xl font-bold gradient-text mb-4">
                  Hot Air Balloon Trips
                </h2>
                <p className="text-lg text-foreground/90 mb-6 leading-relaxed">
                  Float peacefully above Vang Vieng's stunning limestone karsts, winding rivers, and emerald rice paddies. 
                  Experience the serenity of sunrise or the golden glow of sunset from a unique perspective.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="bg-primary/10 p-4 rounded-lg border border-primary/30">
                    <h3 className="font-semibold text-primary mb-2">Schedule</h3>
                    <p className="text-foreground/90">Two shifts available: Sunrise & Sunset</p>
                  </div>
                  <div className="bg-primary/10 p-4 rounded-lg border border-primary/30">
                    <h3 className="font-semibold text-primary mb-2">Duration</h3>
                    <p className="text-foreground/90">30 to 45 minutes (weather dependent)</p>
                  </div>
                  <div className="bg-primary/10 p-4 rounded-lg border border-primary/30">
                    <h3 className="font-semibold text-primary mb-2">Price</h3>
                    <p className="text-foreground/90 text-2xl font-bold">$100 per person</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    size="lg"
                    className="flex-1 gradient-bg text-white"
                    onClick={() => setBookingOpen(true)}
                  >
                    Book Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 border-primary/50 hover:bg-primary/10"
                    onClick={() => openGallery("balloon")}
                  >
                    View Gallery
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {balloonGallery.slice(0, 4).map((image) => (
                  <div
                    key={image.id}
                    className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => openGallery("balloon")}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/20">
              <h3 className="text-2xl font-bold mb-4">What's Included</h3>
              <ul className="grid md:grid-cols-2 gap-3 text-foreground/90">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Pick-up and drop-off from your accommodation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Professional certified pilot</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Safety briefing and equipment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Breathtaking aerial views</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Photo opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Unforgettable memories</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Paramotor Service */}
        <div className="max-w-6xl mx-auto">
          <div className="glass-card p-8 md:p-12 rounded-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 grid grid-cols-2 gap-4">
                {paramotorGallery.slice(0, 4).map((image) => (
                  <div
                    key={image.id}
                    className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => openGallery("paramotor")}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="order-1 md:order-2">
                <div className="text-7xl mb-6">🪂</div>
                <h2 className="text-4xl font-bold gradient-text mb-4">
                  Paramotor Flights
                </h2>
                <p className="text-lg text-foreground/90 mb-6 leading-relaxed">
                  Feel the adrenaline rush of powered paragliding as you soar through the skies of Vang Vieng. 
                  Experience the thrill of flight with the freedom and excitement of a paramotor adventure.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="bg-primary/10 p-4 rounded-lg border border-primary/30">
                    <h3 className="font-semibold text-primary mb-2">Schedule</h3>
                    <p className="text-foreground/90">Available anytime during daylight hours</p>
                  </div>
                  <div className="bg-primary/10 p-4 rounded-lg border border-primary/30">
                    <h3 className="font-semibold text-primary mb-2">Duration</h3>
                    <p className="text-foreground/90">15 minutes of pure excitement</p>
                  </div>
                  <div className="bg-primary/10 p-4 rounded-lg border border-primary/30">
                    <h3 className="font-semibold text-primary mb-2">Price</h3>
                    <p className="text-foreground/90 text-2xl font-bold">$80 per person</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    size="lg"
                    className="flex-1 gradient-bg text-white"
                    onClick={() => setBookingOpen(true)}
                  >
                    Book Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 border-primary/50 hover:bg-primary/10"
                    onClick={() => openGallery("paramotor")}
                  >
                    View Gallery
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/20">
              <h3 className="text-2xl font-bold mb-4">What's Included</h3>
              <ul className="grid md:grid-cols-2 gap-3 text-foreground/90">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Pick-up and drop-off from your accommodation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Experienced professional pilot</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Complete safety equipment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Thrilling aerial experience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Stunning panoramic views</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Adventure of a lifetime</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="max-w-6xl mx-auto mt-16">
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-3xl font-bold gradient-text mb-6 text-center">
              Important Information
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-foreground/90">
              <div>
                <h3 className="font-semibold text-primary mb-2">Pick-up Service</h3>
                <p>We pick you up 1 hour before your scheduled flight time from your accommodation.</p>
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-2">Weather Dependent</h3>
                <p>Flights may be rescheduled due to weather conditions for your safety.</p>
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-2">Payment Options</h3>
                <p>We accept both LAK (local currency) and USD for your convenience.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
