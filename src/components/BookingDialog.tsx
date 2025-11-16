import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useHaptic } from "@/hooks/useHaptic";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceType?: string;
}

export function BookingDialog({
  open,
  onOpenChange,
  serviceType = "",
}: BookingDialogProps) {
  const haptic = useHaptic();
  const [formData, setFormData] = useState({
    service: serviceType,
    name: "",
    date: "",
    people: "1",
    accommodation: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    haptic.success();

    const message = `Hi! I'd like to book:

Service: ${formData.service}
Name: ${formData.name}
Date: ${formData.date}
Number of People: ${formData.people}
Accommodation: ${formData.accommodation}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/8562092624128?text=${encodedMessage}`, "_blank");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-2 border-white/20 max-w-md">
        <DialogHeader>
          <DialogTitle className="gradient-text text-2xl">
            Book Your Adventure
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="service" className="text-foreground">
              Service
            </Label>
            <Input
              id="service"
              required
              className="glass-input mt-1"
              placeholder="Hot Air Balloon or Paramotor"
              value={formData.service}
              onChange={(e) =>
                setFormData({ ...formData, service: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="name" className="text-foreground">
              Your Name
            </Label>
            <Input
              id="name"
              required
              className="glass-input mt-1"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="date" className="text-foreground">
              Reservation Date
            </Label>
            <Input
              id="date"
              type="date"
              required
              className="glass-input mt-1"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="people" className="text-foreground">
              Number of People
            </Label>
            <Input
              id="people"
              type="number"
              min="1"
              required
              className="glass-input mt-1"
              placeholder="1"
              value={formData.people}
              onChange={(e) =>
                setFormData({ ...formData, people: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="accommodation" className="text-foreground">
              Accommodation/Hostel Name
            </Label>
            <Input
              id="accommodation"
              required
              className="glass-input mt-1"
              placeholder="Where are you staying?"
              value={formData.accommodation}
              onChange={(e) =>
                setFormData({ ...formData, accommodation: e.target.value })
              }
            />
          </div>

          <Button type="submit" className="gradient-bg w-full text-white">
            Confirm Booking via WhatsApp
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
