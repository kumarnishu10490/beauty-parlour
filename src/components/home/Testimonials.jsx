import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "../AnimatedSection";
import { Star, Quote } from "lucide-react";

const testimonials = [
{
  name: "Priya Sharma",
  role: "Bridal Client",
  text: "Sakshi made my wedding day absolutely magical! The bridal makeup was flawless and lasted the entire day. Truly the best in town.",
  rating: 5
},
{
  name: "Anjali Patel",
  role: "Training Graduate",
  text: "The advanced makeup course completely transformed my career. The practical training and mentorship were invaluable. I now run my own salon!",
  rating: 5
},
{
  name: "Meera Joshi",
  role: "Regular Client",
  text: "I've been visiting Sakshi Beauty for over 3 years. The quality, hygiene, and attention to detail are consistently exceptional.",
  rating: 5
},
{
  name: "Kavita Desai",
  role: "Training Student",
  text: "The friendly environment and hands-on approach make learning so enjoyable. I feel confident to pursue my dream career in beauty.",
  rating: 5
}];


const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-padding bg-gradient-luxury relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <span className="text-sm font-medium text-primary tracking-widest uppercase">Testimonials</span>
          <h2 className="heading-section mt-3">
            Words from Our <span className="text-gradient-rose">Beautiful</span> Clients
          </h2>
        </AnimatedSection>

        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-3xl p-8 md:p-12 text-center">
              
              <Quote className="w-10 h-10 text-primary/30 mx-auto mb-4" />
              <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6 font-heading italic">
                "{testimonials[current].text}"
              </p>
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: testimonials[current].rating }).map((_, i) =>
                <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                )}
              </div>
              <div className="font-heading font-semibold text-foreground">
                {testimonials[current].name}
              </div>
              <div className="text-sm text-muted-foreground">{testimonials[current].role}</div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) =>
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
            i === current ? "bg-primary w-8" : "bg-primary/30"}`
            } />

          )}
        </div>
      </div>
    </section>);

};

export default Testimonials;