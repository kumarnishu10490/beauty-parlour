import { motion } from "framer-motion";
import { Phone } from "lucide-react";

const WHATSAPP_NUMBER = "919304825053"; // Replace with actual number
const MESSAGE = "Hi! I'd like to book an appointment at Sakshi Beauty Parlour.";
const CALL_NUMBER = "tel:+919304825053"; // Replace with actual number

const WhatsAppButton = () => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-center gap-2 sm:gap-3">
      {/* Call Now */}
      <motion.a
        href={CALL_NUMBER}
        aria-label="Call Now"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.3, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 bg-primary text-primary-foreground px-4 sm:px-5 py-2.5 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
        
        <Phone className="w-5 h-5" />
        <span className="text-sm font-semibold hidden sm:inline">Call Now</span>
      </motion.a>

      {/* WhatsApp Book Now */}
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 bg-[#25D366] text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
        
        <svg viewBox="0 0 32 32" className="w-6 h-6 fill-white">
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.9 15.9 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.336 22.616c-.396 1.116-2.346 2.076-3.234 2.19-.81.1-1.83.144-2.952-.186a27.14 27.14 0 01-2.67-1.002c-4.698-2.034-7.77-6.81-8.004-7.126-.234-.316-1.896-2.52-1.896-4.806s1.2-3.414 1.626-3.882c.426-.468.93-.588 1.242-.588.312 0 .624.002.894.016.288.014.672-.108 1.05.804.396.948 1.338 3.27 1.458 3.504.12.234.198.51.036.822-.162.312-.246.51-.486.786-.24.276-.504.618-.72.828-.24.234-.492.492-.21.96.276.468 1.236 2.04 2.652 3.306 1.824 1.632 3.36 2.136 3.834 2.376.468.24.744.198 1.02-.12.276-.312 1.176-1.374 1.488-1.842.312-.468.624-.39 1.056-.234.432.156 2.742 1.296 3.21 1.53.468.234.78.354.894.546.12.198.12 1.122-.276 2.238z" />
        </svg>
        <span className="text-sm font-semibold hidden sm:inline">Book Now</span>
      </motion.a>
    </div>);

};

export default WhatsAppButton;