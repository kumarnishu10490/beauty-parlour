import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageSquare, Calendar, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const QuickActionToolbar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const actions = [
    { 
      icon: Phone, 
      label: "Call", 
      href: "tel:9304825053",
      color: "bg-white text-primary" 
    },
    { 
      icon: MessageSquare, 
      label: "WhatsApp", 
      href: "https://wa.me/919304825053",
      color: "bg-white text-[#25D366]" 
    },
    { 
      icon: Calendar, 
      label: "Book Now", 
      href: "/contact",
      color: "bg-gradient-to-r from-primary to-rose-gold text-white",
      isPrimary: true 
    }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md lg:hidden"
        >
          <div className="bg-foreground/90 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-white/10 flex items-center gap-2">
            {actions.map((action, i) => (
              <motion.a
                key={action.label}
                href={action.href}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${action.color}`}
              >
                <action.icon className="w-4 h-4" />
                <span>{action.label}</span>
                {action.isPrimary && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-3 h-3 opacity-50" />
                  </motion.div>
                )}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickActionToolbar;
