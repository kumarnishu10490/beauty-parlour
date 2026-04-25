import AnimatedSection from "../AnimatedSection";
import { motion } from "framer-motion";
import { GraduationCap, HandHeart, Award, BadgeIndianRupee, Smile } from "lucide-react";

const features = [
{ icon: GraduationCap, title: "Professional Trainers", desc: "Learn from certified beauty experts with years of industry experience" },
{ icon: HandHeart, title: "Hands-On Training", desc: "Practical sessions with real clients for genuine learning" },
{ icon: Award, title: "MSME Certified Courses", desc: "Receive government-recognized MSME certificates upon course completion" },
{ icon: BadgeIndianRupee, title: "Affordable Fees", desc: "Quality education at competitive prices with EMI options" },
{ icon: Smile, title: "Friendly Environment", desc: "Supportive and encouraging atmosphere for every student" }];


const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="text-sm font-medium text-primary tracking-widest uppercase">Why Choose Us</span>
          <h2 className="heading-section mt-3">
            The <span className="text-gradient-gold">Sakshi</span> Difference
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((f, i) =>
          <AnimatedSection key={f.title} delay={i * 0.1}>
              <motion.div
              whileHover={{ y: -6 }}
              className="glass-card-hover rounded-2xl p-6 text-center h-full">
              
                <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-14 h-14 rounded-2xl bg-blush flex items-center justify-center mx-auto mb-4">
                
                  <f.icon className="w-7 h-7 text-primary" />
                </motion.div>
                <h3 className="font-heading text-lg font-semibold mb-2 text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            </AnimatedSection>
          )}
        </div>
      </div>
    </section>);

};

export default WhyChooseUs;