import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import FloatingParticles from "../FloatingParticles";
import heroImg from "@/assets/hero-salon.jpg";

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
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src={heroImg}
          alt="Sakshi Beauty Parlour luxury interior"
          className="w-full h-full object-cover opacity-20 scale-110"
          loading="eager" />
        
        <div className="absolute inset-0 bg-gradient-to-r from-cream/90 via-cream/70 to-transparent" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blush/50 text-primary text-sm font-medium mb-6">
            
            ✨ Sakshi Beauty Parlour & Training Centre
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="heading-display mb-6">
            
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
            className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
            
            Transform your passion into profession. Sakshi Beauty Parlour & Training Centre offers
            premium beauty services and professional training courses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4">
            
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
            className="flex gap-8 mt-12">
            
            {[
            { num: "500+", label: "Happy Clients" },
            { num: "200+", label: "Students Trained" },
            { num: "10+", label: "Years Experience" }].
            map((stat) =>
            <div key={stat.label}>
                <div className="text-2xl font-heading font-bold text-gradient-gold">{stat.num}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hidden lg:block relative">
          
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-elegant">
            <img
              src={heroImg}
              alt="Sakshi Beauty Parlour interior"
              className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-110" />
            
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