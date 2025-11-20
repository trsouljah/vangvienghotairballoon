import { useIsMobile } from "@/hooks/useIsMobile";
import { FAB } from "@/components/mobile/FAB";
import { useState } from "react";
import { BookingDialog } from "@/components/BookingDialog";

export default function Blogs() {
  const isMobile = useIsMobile();
  const [bookingOpen, setBookingOpen] = useState(false);

  const blogs = [
    {
      id: 1,
      title: "Travel Tips for Vang Vieng",
      icon: "✈️",
      content: [
        {
          subtitle: "Best Time to Visit",
          text: "The ideal time is from November to March when the weather is dry and visibility is perfect for balloon and paramotor flights.",
        },
        {
          subtitle: "What to Wear",
          text: "Comfortable clothing, a light jacket for early-morning flights, and suitable walking or outdoor shoes.",
        },
        {
          subtitle: "Book Your Activities One Day in Advance",
          text: "Especially sunrise balloon flights — they are the most popular and sell out quickly.",
        },
        {
          subtitle: "Bring Only the Essentials",
          text: "Phone, camera, sunglasses. Avoid carrying heavy items during the flight.",
        },
        {
          subtitle: "Use Google Maps Offline",
          text: "Internet coverage may be weak in some areas outside the town.",
        },
        {
          subtitle: "Don't Miss the Water Activities",
          text: "Kayaking, caves, and the Blue Lagoon — all worth spending a full day exploring.",
        },
      ],
    },
    {
      id: 2,
      title: "Behind the Scenes of Balloon & Paramotor Flights",
      icon: "🎬",
      content: [
        {
          subtitle: "Weather Check",
          text: "Before every flight, pilots analyze wind speed and direction to ensure safety. If the wind is too strong, the team may delay or reschedule.",
        },
        {
          subtitle: "Preparing the Equipment",
          text: "Inspecting the balloon and paramotor engine, checking burner flame power and air temperature, preparing the baskets and safety equipment.",
        },
        {
          subtitle: "Passenger Briefing",
          text: "The crew explains how to board and sit, landing position, and safety instructions during the flight.",
        },
        {
          subtitle: "The Ground Crew",
          text: "A dedicated team tracks the balloon's path from the ground and arrives at the landing spot to support the pilot and passengers.",
        },
        {
          subtitle: "After Landing",
          text: "Photos, souvenirs, and a small refreshment to celebrate an unforgettable experience.",
        },
      ],
    },
    {
      id: 3,
      title: "Real Traveler Stories",
      icon: "💬",
      content: [
        {
          subtitle: '"My First Time Flying Over the Mountains!" — Sarah from France',
          text: "Sarah always dreamed of seeing Laos from above. \"Sunrise was magical… I couldn't stop taking photos!\"",
        },
        {
          subtitle: '"Best Memory of My Trip" — Ahmed from Saudi Arabia',
          text: "Ahmed was nervous at first but decided to try. \"The pilot explained everything — once we lifted off, I felt like I was in another world!\"",
        },
        {
          subtitle: '"Paramotor Changed Everything!" — Lisa from Korea',
          text: "\"The feeling of freedom in the air is indescribable… I was literally flying over the rice fields!\"",
        },
        {
          subtitle: "What Brings Travelers Together?",
          text: "The beauty, the excitement, and the unforgettable memories that stay with them forever.",
        },
      ],
    },
    {
      id: 4,
      title: "Latest Activities & Adventures in Vang Vieng",
      icon: "🌄",
      content: [
        {
          subtitle: "Forest Zipline",
          text: "A fast and fun experience above the trees, perfect for families and adventurers.",
        },
        {
          subtitle: "Cave Tubing",
          text: "A peaceful yet exciting journey through river caves — one of the most popular activities.",
        },
        {
          subtitle: "Blue Lagoon 5",
          text: "The newest lagoon with turquoise water and lush green hills.",
        },
        {
          subtitle: "Mountain ATV Tours",
          text: "An action-packed ride through the hills, mud trails, and scenic viewpoints.",
        },
        {
          subtitle: "New Sunset Viewpoints",
          text: "Freshly built platforms offering breathtaking sunset views across Vang Vieng.",
        },
      ],
    },
  ];

  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
            Our Blog
          </h1>
          <p className="text-xl text-foreground/90 leading-relaxed">
            Welcome to the <strong className="gradient-text">Vangvieng Hot Air Balloon Blog</strong> — your gateway to discovering the magic of adventure from the sky!
          </p>
          <p className="text-lg text-foreground/80 mt-4">
            Here, we share travel tips for Vang Vieng, behind-the-scenes of balloon and paramotor flights, 
            real stories from travelers, and the latest activities and adventures in the region.
          </p>
          <p className="text-lg text-foreground/80 mt-4">
            Our goal is to help you plan your next trip and explore Vang Vieng from a new perspective — from above the clouds.
          </p>
        </div>

        {/* Blog Posts */}
        <div className="max-w-5xl mx-auto space-y-12">
          {blogs.map((blog) => (
            <article key={blog.id} className="glass-card p-8 md:p-12 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl">{blog.icon}</div>
                <h2 className="text-3xl md:text-4xl font-bold gradient-text">
                  {blog.title}
                </h2>
              </div>

              <div className="space-y-6">
                {blog.content.map((section, index) => (
                  <div key={index}>
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      {section.subtitle}
                    </h3>
                    <p className="text-foreground/90 leading-relaxed">
                      {section.text}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Recommended Partner */}
        <div className="max-w-5xl mx-auto mt-16">
          <div className="glass-card p-8 md:p-12 rounded-2xl border-2 border-primary/30">
            <h2 className="text-3xl font-bold gradient-text mb-4 text-center">
              Recommended Experiences in Vang Vieng
            </h2>
            <p className="text-lg text-foreground/90 text-center leading-relaxed">
              If you are looking for more activities and tours in Vang Vieng, we highly recommend{" "}
              <strong className="text-primary">Chill Trip Vangvieng Tours</strong>.
            </p>
            <p className="text-foreground/80 text-center mt-4">
              Visit{" "}
              <a
                href="https://chilltripvibe.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-semibold"
              >
                chilltripvibe.com
              </a>{" "}
              to ensure a safe, professional, and fully organized adventure experience.
            </p>
          </div>
        </div>
      </div>

      <BookingDialog open={bookingOpen} onOpenChange={setBookingOpen} />
      {isMobile && <FAB onClick={() => setBookingOpen(true)} />}
    </div>
  );
}
