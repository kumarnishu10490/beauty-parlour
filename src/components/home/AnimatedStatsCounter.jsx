import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedSection from "../AnimatedSection";
import { Users, GraduationCap, Calendar, Award } from "lucide-react";

const stats = [
  { icon: Users, value: 1000, suffix: "+", label: "Happy Clients", color: "text-primary" },
  { icon: GraduationCap, value: 200, suffix: "+", label: "Students Trained", color: "text-gold" },
  { icon: Calendar, value: 10, suffix: "+", label: "Years Experience", color: "text-rose-gold" },
  { icon: Award, value: 15, suffix: "+", label: "Certified Courses", color: "text-accent" }
];


const useCountUp = (end, duration, shouldStart) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, shouldStart]);

  return count;
};

const StatCard = ({ stat, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useCountUp(stat.value, 2000 + index * 300, isInView);

  return (
    <AnimatedSection delay={index * 0.15}>
      <motion.div
        ref={ref}
        whileHover={{ y: -6, scale: 1.05 }}
        className="text-center p-6">
        
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 200, delay: index * 0.1 }}
          className="w-16 h-16 rounded-full bg-blush/60 flex items-center justify-center mx-auto mb-4">
          
          <stat.icon className={`w-8 h-8 ${stat.color}`} />
        </motion.div>
        <motion.div
          className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-1">
          
          {count.toLocaleString()}{stat.suffix}
        </motion.div>
        <p className="text-sm text-muted-foreground font-medium tracking-wide">{stat.label}</p>
      </motion.div>
    </AnimatedSection>);

};

const AnimatedStatsCounter = () => {
  return (
    <section className="section-padding bg-gradient-luxury relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-gold blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="heading-section text-foreground">
            Our <span className="text-gradient-gold">Achievements</span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) =>
          <div key={stat.label} className="text-foreground">
              <StatCard stat={stat} index={i} />
            </div>
          )}
        </div>
      </div>
    </section>);

};

export default AnimatedStatsCounter;