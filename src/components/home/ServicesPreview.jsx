import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedSection from "../AnimatedSection";
import { Sparkles, Heart, Scissors, Flower2, Palette, Hand } from "lucide-react";
import bridalImg from "@/assets/bridal-makeup.jpg";
import hairImg from "@/assets/hair-styling.jpg";
import facialImg from "@/assets/facial-care.jpg";
import mehndiImg from "@/assets/mehndi.jpg";
import hairSmoothImg from "@/assets/hair-smoothening.jpg";

const services = [
{ icon: Heart, title: "Bridal Makeup", desc: "Your dream bridal look, crafted to perfection", img: bridalImg },
{ icon: Sparkles, title: "Party Makeup", desc: "Glamorous looks for every special occasion", img: bridalImg },
{ icon: Flower2, title: "Facial & Skin Care", desc: "Rejuvenate your skin with premium treatments", img: facialImg },
{ icon: Scissors, title: "Hair Cut & Styling", desc: "Trendy cuts and styles by expert stylists", img: hairImg },
{ icon: Palette, title: "Hair Smoothening", desc: "Silky smooth hair with professional treatments", img: hairSmoothImg },
{ icon: Hand, title: "Mehndi Design", desc: "Intricate and beautiful henna artistry", img: mehndiImg }];


const ServicesPreview = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="text-sm font-medium text-primary tracking-widest uppercase">Our Services</span>
          <h2 className="heading-section mt-3">
            Beauty Services <span className="text-gradient-gold">Crafted for You</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            From bridal transformations to everyday beauty, we offer premium services that make you feel extraordinary.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) =>
          <AnimatedSection key={service.title} delay={i * 0.1}>
              <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="glass-card-hover rounded-2xl overflow-hidden group cursor-pointer">
              
                <div className="relative h-48 overflow-hidden">
                  <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy" />
                
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <service.icon className="w-8 h-8 text-primary-foreground drop-shadow-lg" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-2 text-foreground">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.desc}</p>
                </div>
              </motion.div>
            </AnimatedSection>
          )}
        </div>

        <AnimatedSection className="text-center mt-12">
          <Link to="/services" className="btn-outline-luxury">
            View All Services
          </Link>
        </AnimatedSection>
      </div>
    </section>);

};

export default ServicesPreview;