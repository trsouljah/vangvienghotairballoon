import { MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/useIsMobile";
import { FAB } from "@/components/mobile/FAB";
import { useState } from "react";
import { BookingDialog } from "@/components/BookingDialog";

export default function FAQs() {
  const isMobile = useIsMobile();
  const [bookingOpen, setBookingOpen] = useState(false);

  const faqs = [
    {
      question: "How long is the flight?",
      answer: "Hot Air Balloon flights last 30-45 minutes depending on weather conditions. Paramotor flights are 15 minutes long.",
    },
    {
      question: "Is pick-up included in the price?",
      answer: "Yes! All prices include complimentary pick-up and drop-off service. We'll pick you up 1 hour before your scheduled flight time.",
    },
    {
      question: "Can I book through WhatsApp?",
      answer: "Absolutely! We offer fast and flexible booking through WhatsApp at +856 20 9262 4128. It's our most popular booking method.",
    },
    {
      question: "Are the flights safe?",
      answer: "Safety is our top priority. We use certified equipment, maintain regular safety checks, and employ experienced professional pilots. All flights follow strict safety protocols.",
    },
    {
      question: "What happens if the weather is bad?",
      answer: "If weather conditions are unsuitable for flying, we will reschedule your flight for another day or offer a full refund. Your safety always comes first.",
    },
    {
      question: "What is the best time for balloon flights?",
      answer: "Sunrise flights (5:30-6:30 AM) are the most popular due to calm winds and magical lighting. However, sunset flights (4:30-5:30 PM) offer equally stunning views with beautiful colors.",
    },
    {
      question: "Can I pay in USD?",
      answer: "Yes, we accept both LAK (Lao Kip) and USD for your convenience.",
    },
    {
      question: "What should I wear?",
      answer: "Wear comfortable clothing and closed-toe shoes. For morning flights, bring a light jacket as it can be cool before sunrise. Avoid loose items that could blow away.",
    },
    {
      question: "How many people can fly in a hot air balloon?",
      answer: "Typically, our balloons accommodate 2-6 passengers plus the pilot. The exact number depends on weather conditions and weight distribution.",
    },
    {
      question: "Do I need any special physical fitness?",
      answer: "No special fitness is required. However, passengers should be able to stand comfortably for the duration of the flight and be able to climb into and out of the basket.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          Everything you need to know about your adventure
        </p>
      </div>

      <div className="max-w-3xl mx-auto mb-12">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="glass-card px-6 rounded-xl border-none"
            >
              <AccordionTrigger className="text-left hover:no-underline py-4">
                <span className="font-semibold">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="glass-card p-6 md:p-8 rounded-xl border-2 border-primary/30 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-3">Still have questions?</h2>
        <p className="text-foreground/80 mb-6">
          We're here to help! Contact us directly via WhatsApp for immediate assistance.
        </p>
        <Button
          size="lg"
          className="gradient-bg text-white"
          onClick={() => window.open("https://wa.me/8562092624128", "_blank")}
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          Contact Us on WhatsApp
        </Button>
      </div>

      <BookingDialog open={bookingOpen} onOpenChange={setBookingOpen} />
      {isMobile && <FAB onClick={() => setBookingOpen(true)} />}
    </div>
  );
}
