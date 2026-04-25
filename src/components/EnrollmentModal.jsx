import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, MapPin, Sparkles } from "lucide-react";

const EnrollmentModal = ({ isOpen, onClose, courseTitle }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: ""
  });

  const getCourseDetails = (title) => {
    if (title.includes("Basic")) {
      return {
        eng: "Skincare, Threading, Waxing, and Basic Makeup application.",
        hindi: "स्किनकेयर, थ्रेडिंग, वैक्सिंग और बेसिक मेकअप की पूरी ट्रेनिंग।"
      };
    } else if (title.includes("Advanced")) {
      return {
        eng: "HD Makeup, Airbrush Techniques, and Portfolio Building.",
        hindi: "एचडी मेकअप, एयरब्रश तकनीक और प्रोफेशनल पोर्टफोलियो बनाना।"
      };
    } else if (title.includes("Bridal")) {
      return {
        eng: "Traditional/Modern Bridal looks and Saree Draping.",
        hindi: "ट्रेडिशनल और मॉडर्न ब्राइडल लुक के साथ साड़ी ड्रेपिंग की ट्रेनिंग।"
      };
    }
    return { eng: "Complete Professional Beauty Training.", hindi: "प्रोफेशनल ब्यूटी ट्रेनिंग।" };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const details = getCourseDetails(courseTitle);
    
    const message = `🌟 *NEW COURSE ENROLLMENT* 🌟

*Course:* ${courseTitle}
*Student Name:* ${formData.name}
*Address:* ${formData.address}

---
📖 *ENROLLMENT DETAILS / कोर्स की जानकारी:*

*English:* I want to enroll for the "${courseTitle}". I'm interested in learning ${details.eng}

*Hindi:* नमस्ते! मैं "${courseTitle}" में शामिल होना चाहती हूँ। मुझे ${details.hindi} सीखने में रुचि है।

Please guide me with the next steps! 🙏`;

    const whatsappUrl = `https://wa.me/919304825053?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md glass-card rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>

            <div className="mb-8">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-foreground">Course Enrollment</h2>
              <p className="text-muted-foreground text-sm mt-1">Enroll in <span className="text-primary font-semibold">{courseTitle}</span></p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Your Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-background border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Your Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                  <input
                    required
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Enter your city/address"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-background border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full btn-luxury py-4 flex items-center justify-center gap-2 group"
              >
                Send to WhatsApp
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            </form>

            <p className="text-[10px] text-center text-muted-foreground mt-6 uppercase tracking-widest">
              By enrolling, you agree to our training terms
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EnrollmentModal;
