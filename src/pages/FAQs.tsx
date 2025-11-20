import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { FAB } from "@/components/mobile/FAB";
import { BookingDialog } from "@/components/BookingDialog";

export default function FAQs() {
  const isMobile = useIsMobile();
  const [bookingOpen, setBookingOpen] = useState(false);

  const faqs = [
    {
      id: "1",
      question: "How long is the flight?",
      answer: "Hot Air Balloon: 30–45 minutes depending on the weather conditions. Paramotor: 15 minutes of thrilling flight time.",
    },
    {
      id: "2",
      question: "Is pick-up included in the price?",
      answer: "Yes! All prices include pick-up and drop-off from your hotel or accommodation. We pick you up 1 hour before your scheduled flight time.",
    },
    {
      id: "3",
      question: "Can I book through WhatsApp?",
      answer: "Yes! We offer fast and flexible booking via WhatsApp. Simply click the 'Book Now' button on our website and you'll be directed to WhatsApp with a pre-filled booking form.",
    },
    {
      id: "4",
      question: "Are the flights safe?",
      answer: "Absolutely. All equipment is certified and regularly inspected. Our pilots are highly experienced professionals with extensive training in flying over Vang Vieng. Your safety is our top priority.",
    },
    {
      id: "5",
      question: "What happens if the weather is bad?",
      answer: "Safety comes first. If weather conditions are not suitable for flying, we will reschedule your flight to another day or issue a full refund. We monitor weather conditions closely before every flight.",
    },
    {
      id: "6",
      question: "What is the best time for balloon flights?",
      answer: "Sunrise is the most popular time due to calm winds and stunning golden light, but sunset offers equally spectacular views with beautiful colors. Both shifts provide unforgettable experiences.",
    },
    {
      id: "7",
      question: "Can I pay in USD?",
      answer: "Yes, we accept both LAK (Lao Kip) and USD for your convenience. Payment can be arranged through our booking process.",
    },
  ];

  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-foreground/80">
            Find answers to common questions about our hot air balloon and paramotor adventures
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 md:p-12 rounded-2xl">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border border-white/20 rounded-lg px-6 bg-white/5"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <span className="text-lg font-semibold text-foreground pr-4">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80 pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Still Have Questions */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="glass-card p-8 rounded-2xl text-center border-2 border-primary/30">
            <h2 className="text-2xl font-bold gradient-text mb-4">
              Still Have Questions?
            </h2>
            <p className="text-foreground/80 mb-6">
              We're here to help! Contact us directly via WhatsApp or book your adventure now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/8562092624128"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors"
              >
                Contact via WhatsApp
              </a>
              <button
                onClick={() => setBookingOpen(true)}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg gradient-bg text-white font-semibold"
              >
                Book Your Adventure
              </button>
            </div>
          </div>
        </div>
      </div>

      <BookingDialog open={bookingOpen} onOpenChange={setBookingOpen} />
      {isMobile && <FAB onClick={() => setBookingOpen(true)} />}
    </div>
  );
}
