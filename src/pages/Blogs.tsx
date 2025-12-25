import { useState } from "react";
import { MapPin, Camera, Heart, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/useIsMobile";
import { FAB } from "@/components/mobile/FAB";
import { BookingDialog } from "@/components/BookingDialog";

export default function Blogs() {
  const [selectedBlog, setSelectedBlog] = useState<number | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const isMobile = useIsMobile();

  const blogs = [
    {
      icon: MapPin,
      title: "Travel Tips for Vang Vieng",
      excerpt: "Vang Vieng is one of Laos' top adventure destinations. With a bit of preparation, you can enjoy every moment of your trip.",
      content: [
        "🗓️ Best Time to Visit: November to March offers the best weather",
        "👕 What to Wear: Comfortable clothes, light jacket, walking shoes",
        "📅 Book One Day in Advance: Sunrise flights sell out quickly",
        "📱 Bring Only Essentials: Phone, camera, sunglasses",
        "🗺️ Use Google Maps Offline: Internet coverage may be weak in some areas",
        "💧 Don't Miss Water Activities: Kayaking, caves, Blue Lagoon",
      ],
    },
    {
      icon: Camera,
      title: "Behind the Scenes of Balloon & Paramotor Flights",
      excerpt: "Ever wondered what happens before you lift off into the sky? Here's a look behind the scenes.",
      content: [
        "🌤️ Weather Check: Pilots analyze wind speed and direction",
        "🎈 Preparing Equipment: Inspecting balloon, engine, burner, safety gear",
        "👥 Passenger Briefing: How to board, sit, land, safety instructions",
        "📡 Ground Crew: Tracks balloon path, supports landing",
        "📸 After Landing: Photos, souvenirs, refreshments",
      ],
    },
    {
      icon: Heart,
      title: "Real Traveler Stories",
      excerpt: "Hear from travelers who experienced the magic of flying over Vang Vieng.",
      content: [
        '🇫🇷 Sarah from France: "Sunrise was magical… couldn\'t stop taking photos! The views of the limestone karsts were absolutely breathtaking."',
        '🇸🇦 Ahmed from Saudi Arabia: "Best memory of my trip to Laos. The pilot was professional and friendly. Highly recommend!"',
        '🇰🇷 Lisa from Korea: "Paramotor changed everything! The feeling of freedom is indescribable. Worth every dollar!"',
      ],
    },
    {
      icon: Sparkles,
      title: "Latest Activities & Adventures in Vang Vieng",
      excerpt: "Vang Vieng is not only about balloons and paramotors — discover new attractions!",
      content: [
        "🌲 Forest Zipline: Soar through the jungle canopy",
        "🛶 Cave Tubing: Float through mystical underground rivers",
        "💎 Blue Lagoon 5: The newest and most stunning lagoon",
        "🏍️ Mountain ATV Tours: Explore rugged terrain",
        "🌅 New Sunset Viewpoints: Hidden spots for perfect photos",
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
          Vang Vieng Adventures Blog
        </h1>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          Welcome to the Vang Vieng Hot Air Balloon Blog — your gateway to discovering the magic of adventure from the sky! Here, we share travel tips, behind-the-scenes stories, and the latest activities in the region.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {blogs.map((blog, index) => (
          <div
            key={index}
            onClick={() => setSelectedBlog(index)}
            className="glass-card p-6 rounded-xl cursor-pointer hover:border-primary/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <blog.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
            <p className="text-foreground/70 text-sm">{blog.excerpt}</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-6 rounded-xl border-2 border-primary/30">
        <h3 className="text-xl font-bold mb-3">✨ Planning Your Visit?</h3>
        <p className="text-foreground/80">
          Don't miss the sunrise balloon ride — it's the most popular experience! Book 1-2 days in advance to secure your spot.
        </p>
      </div>

      <Dialog open={selectedBlog !== null} onOpenChange={() => setSelectedBlog(null)}>
        <DialogContent className="glass-card border-2 border-white/20 max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedBlog !== null && (
            <>
              <DialogHeader>
                <DialogTitle className="gradient-text text-2xl">
                  {blogs[selectedBlog].title}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-3 mt-4">
                {blogs[selectedBlog].content.map((item, index) => (
                  <p key={index} className="text-foreground/80">
                    {item}
                  </p>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <BookingDialog open={bookingOpen} onOpenChange={setBookingOpen} />
      {isMobile && <FAB onClick={() => setBookingOpen(true)} />}
    </div>
  );
}
