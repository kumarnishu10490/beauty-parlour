import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import FloatingParticles from "../FloatingParticles";
import heroImg from "@/assets/hero-salon.jpg";

const StatCounter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime;
      let animationFrame;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(Math.floor(eased * end));
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
};

const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero">
      <FloatingParticles count={30} />
      
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0" style={{ y: bgY, willChange: "transform" }}>
        <img
          src={heroImg}
          alt="Sakshi Beauty Parlour luxury interior"
          className="w-full h-full object-cover opacity-20 scale-110"
          loading="eager"
          decoding="async" />
        
        <div className="absolute inset-0 bg-gradient-to-r from-cream/90 via-cream/70 to-transparent" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blush/50 text-primary text-sm font-medium mb-6"
            style={{ willChange: "transform, opacity" }}>
            
            ✨ Sakshi Beauty Parlour & Training Centre
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-2 mb-4 text-xs font-semibold text-gold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            MSME Registered Business 🇮🇳
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="heading-display mb-6"
            style={{ willChange: "transform, opacity" }}>
            
            Beauty is an Art.
            <br />
            <span className="text-gradient-rose">We Teach You</span>
            <br />
            to Master It.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed"
            style={{ willChange: "transform, opacity" }}>
            
            Transform your passion into profession. Sakshi Beauty Parlour & Training Centre offers
            premium beauty services and professional training courses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4"
            style={{ willChange: "transform, opacity" }}>
            
            <Link to="/services" className="btn-luxury">
              Explore Services
            </Link>
            <Link to="/courses" className="btn-outline-luxury">
              Join Training
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex gap-8 mt-12"
            style={{ willChange: "opacity" }}>
            
            {[
            { num: 1000, label: "Happy Clients" },
            { num: 200, label: "Students Trained" },
            { num: 10, label: "Years Experience" }].
            map((stat) =>
            <div key={stat.label}>
                <div className="text-2xl font-heading font-bold text-gradient-gold">
                  <StatCounter end={stat.num} />+
                </div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hidden lg:block relative"
          style={{ willChange: "transform, opacity" }}>
          
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-elegant">
            <img
              src={heroImg}
              alt="Sakshi Beauty Parlour interior"
              className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-110"
              decoding="async" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-blush/20" />
            <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-white/20 rounded-2xl p-5 border border-white/30">
              <p className="font-heading text-lg text-white font-semibold">Sakshi Beauty Parlour</p>
              <p className="text-white/80 text-sm">Where beauty meets excellence ✨</p>
            </div>
          </div>
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-blush/60 blur-xl" />
          
          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-gold/20 blur-xl" />
          
        </motion.div>
      </div>
    </section>);

};

export default HeroSection;