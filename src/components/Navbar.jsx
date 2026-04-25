import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
{ path: "/", label: "Home" },
{ path: "/services", label: "Services" },
{ path: "/courses", label: "Courses" },
{ path: "/gallery", label: "Gallery" },
{ path: "/about", label: "About" },
{ path: "/contact", label: "Contact" },
{ path: "/admin", label: "Admin" }];



const aiLinks = [
{ path: "/ai/skin-analysis", label: "🧴 Skin Analysis" },
{ path: "/ai/hairstyle", label: "💇 Hairstyle Try-On" },
{ path: "/ai/consultant", label: "💬 Beauty Consultant" },
{ path: "/ai/course-advisor", label: "📚 Course Advisor" }];



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30"
      style={{ willChange: "transform" }}>
      
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1.5 sm:gap-2 group">
          <img src="/logo.png" alt="Sakshi Beauty Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
          <span className="font-heading text-lg sm:text-xl font-bold text-foreground">
            Sakshi <span className="text-gradient-gold">Beauty</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) =>
          <Link
            key={link.path}
            to={link.path}
            className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
            location.pathname === link.path ?
            "text-primary" :
            "text-muted-foreground hover:text-foreground"}`
            }>
            
              {link.label}
              {location.pathname === link.path &&
            <motion.div
              layoutId="nav-indicator"
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />

            }
            </Link>
          )}

          {/* AI Dropdown */}
          <div className="relative">
            <button
              onClick={() => setAiOpen(!aiOpen)}
              className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors duration-300 ${
              location.pathname.startsWith("/ai") ? "text-primary" : "text-muted-foreground hover:text-foreground"}`
              }>
              
              AI Features <ChevronDown className={`w-3.5 h-3.5 transition-transform ${aiOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {aiOpen &&
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute top-full right-0 mt-3 w-52 glass-card rounded-2xl py-2 shadow-lg z-50"
                onMouseLeave={() => setAiOpen(false)}>
                
                  {aiLinks.map((link) =>
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setAiOpen(false)}
                  className={`block px-4 py-2.5 text-sm transition-colors ${
                  location.pathname === link.path ? "text-primary bg-blush/20" : "text-muted-foreground hover:text-foreground hover:bg-blush/10"}`
                  }>
                  
                      {link.label}
                    </Link>
                )}
                </motion.div>
              }
            </AnimatePresence>
          </div>

          <Link to="/contact" className="btn-luxury text-sm !px-6 !py-2.5">
            Book Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-foreground">
          
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen &&
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden glass-card border-t border-border/30">
          
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) =>
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-sm font-medium py-2 ${
              location.pathname === link.path ? "text-primary" : "text-muted-foreground"}`
              }>
              
                  {link.label}
                </Link>
            )}
              <div className="border-t border-border/30 pt-2 mt-1">
                <p className="text-xs text-muted-foreground font-medium mb-2">✨ AI Features</p>
                {aiLinks.map((link) =>
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block text-sm font-medium py-2 ${
                location.pathname === link.path ? "text-primary" : "text-muted-foreground"}`
                }>
                
                    {link.label}
                  </Link>
              )}
              </div>
              <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="btn-luxury text-sm text-center !px-6 !py-2.5">
              
                Book Now
              </Link>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </motion.nav>);

};

export default Navbar;