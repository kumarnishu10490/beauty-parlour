import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedSection from "../AnimatedSection";
import FloatingParticles from "../FloatingParticles";

const CTASection = () => {
  return (
    <section className="relative section-padding bg-foreground overflow-hidden">
      <FloatingParticles count={15} />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="heading-section text-primary-foreground mb-6">
            Ready to Begin Your
            <br />
            <span className="text-gradient-gold">Beauty Journey?</span>
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-10 max-w-2xl mx-auto">
            Whether you want to look your best or build a career in beauty, Sakshi Beauty is your destination.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/services">
              <motion.div whileHover={{ scale: 1.05 }} className="btn-luxury">
                Book Beauty Services
              </motion.div>
            </Link>
            <Link to="/courses">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 rounded-full font-medium tracking-wide border-2 border-gold text-gold transition-all duration-300 hover:bg-gold hover:text-gold-foreground">
                
                Join Training Courses
              </motion.div>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>);

};

export default CTASection;