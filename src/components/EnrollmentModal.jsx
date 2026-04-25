import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, MapPin, Sparkles } from "lucide-react";

const EnrollmentModal = ({ isOpen, onClose, courseTitle }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: ""
  });

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
        <div className="fixed inset-0 z-[200] flex items-start sm:items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-[2rem] sm:rounded-[2.5rem] p-7 sm:p-10 shadow-2xl overflow-hidden mt-10 sm:mt-0 mb-10 sm:mb-0"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl" />
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-zinc-800 transition-colors z-10"
            >
              <X className="w-5 h-5 text-zinc-500" />
            </button>

            <div className="mb-8">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center mb-4 border border-rose-500/20">
                <Sparkles className="w-6 h-6 text-rose-500" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Join Our Academy</h2>
              <p className="text-zinc-400 text-sm mt-1">Enrollment for <span className="text-rose-400 font-bold">{courseTitle}</span></p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Student Name</label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-500" />
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full pl-12 pr-6 py-4 rounded-2xl bg-zinc-950 border border-zinc-800 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all text-white placeholder:text-zinc-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Current Address</label>
                <div className="relative">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-500" />
                  <input
                    required
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="City / Locality"
                    className="w-full pl-12 pr-6 py-4 rounded-2xl bg-zinc-950 border border-zinc-800 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all text-white placeholder:text-zinc-700"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-400 hover:to-purple-400 text-white py-4 rounded-2xl flex items-center justify-center gap-3 group text-sm font-black uppercase tracking-widest shadow-xl shadow-rose-500/20"
              >
                Send Request
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            </form>

            <p className="text-[10px] text-center text-zinc-500 mt-8 uppercase tracking-[0.15em] font-medium">
              We will contact you on WhatsApp with batch timing
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EnrollmentModal;
