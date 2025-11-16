import { CreditCard, FileText, Calendar, AlertCircle, Shield, Lock } from "lucide-react";

export default function Terms() {
  const sections = [
    {
      icon: CreditCard,
      title: "Booking & Payment",
      content: [
        "Bookings can be made via WhatsApp or our website",
        "Confirmed after full payment or deposit",
        "We accept both LAK and USD",
      ],
    },
    {
      icon: FileText,
      title: "Pricing & Services",
      content: [
        "All prices include complimentary pick-up and drop-off",
        "Pick-up is scheduled 1 hour before flight",
        "Flight duration may vary depending on weather conditions",
      ],
    },
    {
      icon: Calendar,
      title: "Flight Schedules",
      content: [
        "Hot Air Balloon: Sunrise & Sunset shifts (30-45 minutes)",
        "Paramotor: Available anytime during daylight (15 minutes)",
      ],
    },
    {
      icon: AlertCircle,
      title: "Cancellations & Changes",
      content: [
        "24+ hours notice: Full refund available",
        "Less than 24 hours: Partial or no refund",
        "Weather cancellations: Reschedule or full refund",
      ],
    },
    {
      icon: Shield,
      title: "Safety Guidelines",
      content: [
        "Passengers must follow pilot instructions",
        "Prohibited items: Smoking, alcohol, illegal substances",
        "We reserve the right to refuse service for safety reasons",
        "Not recommended for pregnant passengers or those with serious medical conditions",
      ],
    },
    {
      icon: Lock,
      title: "Liability & Insurance",
      content: [
        "Passengers fly at their own risk",
        "Company liability is limited as per Lao laws",
        "Travel insurance recommended",
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
          Terms & Conditions
        </h1>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {sections.map((section, index) => (
          <div key={index} className="glass-card p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <section.icon className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">{section.title}</h2>
            </div>
            <ul className="space-y-2">
              {section.content.map((item, i) => (
                <li key={i} className="text-foreground/80 flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
