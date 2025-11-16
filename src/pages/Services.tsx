import { useState, useEffect } from "react";
import { CircleDot, Plane, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/BookingDialog";
import { useSearchParams } from "react-router-dom";
import { useIsMobile } from "@/hooks/useIsMobile";
import { FAB } from "@/components/mobile/FAB";

export default function Services() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [balloonImageIndex, setBalloonImageIndex] = useState(0);
  const [paramotorImageIndex, setParamotorImageIndex] = useState(0);
  const [searchParams] = useSearchParams();
  const isMobile = useIsMobile();

  const balloonImages = [
    "https://images.unsplash.com/photo-1498887960847-2a5e46312788",
    "https://images.unsplash.com/photo-1508672019048-805c876b67e2",
    "https://images.unsplash.com/photo-1496096265110-f83ad7f96608",
  ];

  const paramotorImages = [
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
    "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96",
    "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7",
  ];

  useEffect(() => {
    const service = searchParams.get("service");
    if (service === "balloon") {
      document.getElementById("balloon")?.scrollIntoView({ behavior: "smooth" });
    } else if (service === "paramotor") {
      document.getElementById("paramotor")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [searchParams]);

  const openBooking = (service: string) => {
    setSelectedService(service);
    setBookingOpen(true);
  };

  const nextImage = (
    currentIndex: number,
    setIndex: (index: number) => void,
    totalImages: number
  ) => {
    setIndex((currentIndex + 1) % totalImages);
  };

  const prevImage = (
    currentIndex: number,
    setIndex: (index: number) => void,
    totalImages: number
  ) => {
    setIndex((currentIndex - 1 + totalImages) % totalImages);
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
          Our Adventures
        </h1>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          Choose your perfect aerial experience and create unforgettable memories above Vang Vieng
        </p>
      </div>

      {/* Hot Air Balloon Section */}
      <section id="balloon" className="mb-16 scroll-mt-20">
        <div className="glass-card p-6 md:p-10 rounded-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center">
              <CircleDot className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold">Hot Air Balloon Experience</h2>
          </div>

          {/* Image Gallery */}
          <div className="relative mb-8 rounded-xl overflow-hidden">
            <img
              src={balloonImages[balloonImageIndex]}
              alt="Hot Air Balloon"
              className="w-full h-64 md:h-96 object-cover"
            />
            <button
              onClick={() =>
                prevImage(balloonImageIndex, setBalloonImageIndex, balloonImages.length)
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 glass-card p-2 rounded-full"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() =>
                nextImage(balloonImageIndex, setBalloonImageIndex, balloonImages.length)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 glass-card p-2 rounded-full"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Flight Details</h3>
              <ul className="space-y-2 text-foreground/80">
                <li>• Shifts: Sunrise (5:30-6:30 AM) & Sunset (4:30-5:30 PM)</li>
                <li>• Duration: 30-45 minutes</li>
                <li>• Price: $100 per person</li>
                <li>• Capacity: 2-6 passengers per balloon</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">What's Included</h3>
              <ul className="space-y-2 text-foreground/80">
                <li>• Round-trip transportation</li>
                <li>• Safety briefing by certified pilots</li>
                <li>• 30-45 minute balloon flight</li>
                <li>• Complimentary photos</li>
                <li>• Post-flight refreshments</li>
              </ul>
            </div>
          </div>

          <p className="text-foreground/80 mb-6">
            Float gently above Vang Vieng's breathtaking landscape as the sun paints the sky. Our hot air balloon rides offer unparalleled views of limestone karsts, winding rivers, and emerald rice paddies. Each flight is a peaceful journey that will remain in your memory forever.
          </p>

          <Button
            size="lg"
            className="gradient-bg text-white w-full md:w-auto"
            onClick={() => openBooking("Hot Air Balloon")}
          >
            Book Hot Air Balloon
          </Button>
        </div>
      </section>

      {/* Paramotor Section */}
      <section id="paramotor" className="scroll-mt-20">
        <div className="glass-card p-6 md:p-10 rounded-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center">
              <Plane className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold">Paramotor Flight</h2>
          </div>

          {/* Image Gallery */}
          <div className="relative mb-8 rounded-xl overflow-hidden">
            <img
              src={paramotorImages[paramotorImageIndex]}
              alt="Paramotor Flight"
              className="w-full h-64 md:h-96 object-cover"
            />
            <button
              onClick={() =>
                prevImage(paramotorImageIndex, setParamotorImageIndex, paramotorImages.length)
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 glass-card p-2 rounded-full"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() =>
                nextImage(paramotorImageIndex, setParamotorImageIndex, paramotorImages.length)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 glass-card p-2 rounded-full"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Flight Details</h3>
              <ul className="space-y-2 text-foreground/80">
                <li>• Available anytime during daylight hours</li>
                <li>• Duration: 15 minutes</li>
                <li>• Price: $80 per person</li>
                <li>• Individual flights with pilot</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">What's Included</h3>
              <ul className="space-y-2 text-foreground/80">
                <li>• Round-trip transportation</li>
                <li>• Safety briefing and equipment</li>
                <li>• 15 minute powered flight</li>
                <li>• Complimentary photos</li>
                <li>• Post-flight refreshments</li>
              </ul>
            </div>
          </div>

          <p className="text-foreground/80 mb-6">
            Feel the adrenaline rush of powered paragliding over Vang Vieng's stunning landscapes. Our paramotor flights combine the thrill of flight with spectacular aerial views, offering a unique perspective of the region's natural beauty.
          </p>

          <Button
            size="lg"
            className="gradient-bg text-white w-full md:w-auto"
            onClick={() => openBooking("Paramotor Flight")}
          >
            Book Paramotor Flight
          </Button>
        </div>
      </section>

      <BookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        serviceType={selectedService}
      />

      {isMobile && <FAB onClick={() => setBookingOpen(true)} />}
    </div>
  );
}
