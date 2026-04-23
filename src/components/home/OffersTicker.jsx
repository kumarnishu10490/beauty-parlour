import { motion } from "framer-motion";
import { Gift, Percent, Clock, Sparkles } from "lucide-react";

const offers = [
{ icon: Gift, text: "🎉 Bridal Package — Flat 20% OFF this month!" },
{ icon: Percent, text: "💇 Hair Smoothening @ ₹3,999 only (was ₹5,000)" },
{ icon: Clock, text: "⏰ Book before Sunday — Free Facial with any Makeup!" },
{ icon: Sparkles, text: "✨ New Batch Starting — Beauty Course @ ₹4,999/month" },
{ icon: Gift, text: "🎁 Refer a friend & get 15% OFF your next visit" },
{ icon: Percent, text: "💅 Manicure + Pedicure Combo — ₹799 only!" }];


const OffersTicker = () => {
  // Double the offers for seamless loop
  const doubled = [...offers, ...offers];

  return (
    <div className="bg-foreground overflow-hidden py-2 md:py-2.5 relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-foreground to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-foreground to-transparent z-10" />

      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
        
        {doubled.map((offer, i) =>
        <span key={i} className="inline-flex items-center gap-2 text-sm text-primary-foreground/90 font-medium">
            <offer.icon className="w-3.5 h-3.5 text-gold flex-shrink-0" />
            {offer.text}
          </span>
        )}
      </motion.div>
    </div>);

};

export default OffersTicker;