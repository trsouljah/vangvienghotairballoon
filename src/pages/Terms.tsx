import { useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { FAB } from "@/components/mobile/FAB";
import { BookingDialog } from "@/components/BookingDialog";

export default function Terms() {
  const isMobile = useIsMobile();
  const [bookingOpen, setBookingOpen] = useState(false);

  const sections = [
    {
      id: 1,
      title: "1. Booking & Payment",
      content: [
        "Bookings can be made via WhatsApp or directly through our website.",
        "A booking is confirmed only after full payment or a partial deposit, depending on the agreement.",
        "We accept payments in local currency (LAK) or US Dollars (USD).",
      ],
    },
    {
      id: 2,
      title: "2. Pricing & Services",
      content: [
        "All prices include pick-up and drop-off service.",
        "Pick-up is scheduled 1 hour before the flight time.",
        "Flight duration may vary depending on weather conditions and cannot be guaranteed precisely.",
      ],
    },
    {
      id: 3,
      title: "3. Flight Schedules",
      content: [
        "Hot Air Balloon: Two flights — Sunrise and Sunset (30–45 minutes).",
        "Paramotor: Available at any time during daylight hours (15 minutes).",
      ],
    },
    {
      id: 4,
      title: "4. Cancellations & Changes",
      content: [
        "Cancellation 24 hours before the flight: Full refund.",
        "Cancellation within less than 24 hours: A partial refund may apply or no refund depending on circumstances.",
        "If the flight is canceled due to weather or safety reasons, you may reschedule or receive a full refund.",
      ],
    },
    {
      id: 5,
      title: "5. Safety Guidelines",
      content: [
        "All flights use certified equipment and are operated by professional local pilots.",
        "Passengers must follow all crew instructions at all times.",
        "The crew reserves the right to cancel or delay flights if any safety risk is detected.",
      ],
    },
    {
      id: 6,
      title: "6. Liability",
      content: [
        "The company is not responsible for lost personal belongings during the activity.",
        "Participation is at the customer's own risk after reading and understanding the safety instructions.",
      ],
    },
    {
      id: 7,
      title: "7. Privacy",
      content: [
        "We respect your privacy and never share your information with any third party.",
      ],
    },
  ];

  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
            Terms & Conditions
          </h1>
          <p className="text-xl text-foreground/80">
            Please read our terms and conditions carefully before booking your adventure
          </p>
        </div>

        {/* Terms Content */}
        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-8 md:p-12 rounded-2xl">
            <h2 className="text-3xl font-bold gradient-text mb-8 text-center">
              Vangvieng Hot Air Balloon – Terms & Conditions
            </h2>

            <div className="space-y-8">
              {sections.map((section) => (
                <div key={section.id} className="border-b border-white/20 pb-6 last:border-b-0">
                  <h3 className="text-2xl font-bold text-primary mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.content.map((item, index) => (
                      <li key={index} className="flex items-start text-foreground/90 leading-relaxed">
                        <span className="text-primary mr-3 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-white/20 text-center">
              <p className="text-foreground/80 mb-6">
                By booking with us, you acknowledge that you have read, understood, and agree to these terms and conditions.
              </p>
              <button
                onClick={() => setBookingOpen(true)}
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg gradient-bg text-white font-semibold text-lg"
              >
                I Agree - Book Now
              </button>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-5xl mx-auto mt-12">
          <div className="glass-card p-8 rounded-2xl text-center border-2 border-primary/30">
            <h2 className="text-2xl font-bold gradient-text mb-4">
              Questions About Our Terms?
            </h2>
            <p className="text-foreground/80 mb-6">
              If you have any questions or concerns about our terms and conditions, please don't hesitate to contact us.
            </p>
            <a
              href="https://wa.me/8562092624128"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors"
            >
              Contact Us via WhatsApp
            </a>
          </div>
        </div>
      </div>

      <BookingDialog open={bookingOpen} onOpenChange={setBookingOpen} />
      {isMobile && <FAB onClick={() => setBookingOpen(true)} />}
    </div>
  );
}
