import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const proofs = [
  { name: "Priya S.", service: "Bridal Makeup", rating: 5, time: "2 min ago", location: "Dipka" },
  { name: "Khushi R.", service: "Hair Smoothening", rating: 5, time: "5 min ago", location: "Korba" },
  { name: "Puja K.", service: "Gold Facial", rating: 4, time: "8 min ago", location: "Dipka" },
  { name: "Priya S.", service: "Party Makeup", rating: 5, time: "12 min ago", location: "Gevra" },
  { name: "Khushi R.", service: "Beauty Course", rating: 5, time: "15 min ago", location: "Dipka" },
  { name: "Puja K.", service: "Mehndi Design", rating: 5, time: "20 min ago", location: "Pali" }
];


const SocialProofPopup = () => {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show first popup after 5 seconds
    const initialDelay = setTimeout(() => {
      setVisible(true);
    }, 5000);

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (!visible) return;

    // Hide after 4 seconds, then show next after 8 seconds
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 4000);

    const showNext = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % proofs.length);
      setVisible(true);
    }, 10000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(showNext);
    };
  }, [visible, current]);

  const proof = proofs[current];

  return (
    <div className="fixed bottom-28 sm:bottom-24 left-3 sm:left-4 z-40 max-w-[280px] sm:max-w-xs">
      <AnimatePresence>
        {visible &&
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="glass-card rounded-2xl p-4 shadow-lg cursor-pointer"
          style={{ willChange: "transform, opacity" }}
          onClick={() => setVisible(false)}>
          
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blush flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary">
                {proof.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground leading-tight">
                  {proof.name} <span className="font-normal text-muted-foreground">booked</span>
                </p>
                <p className="text-sm font-medium text-primary">{proof.service}</p>
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: proof.rating }).map((_, i) =>
                <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                )}
                  <span className="text-xs text-muted-foreground ml-1">{proof.time} • {proof.location}</span>
                </div>
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

};

export default SocialProofPopup;