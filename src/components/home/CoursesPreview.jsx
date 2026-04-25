import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedSection from "../AnimatedSection";
import { Clock, Users, Award, ArrowRight } from "lucide-react";
import trainingImg from "@/assets/training-class.jpg";

const courses = [
{
  title: "Basic Beauty Course",
  duration: "3 Months",
  students: "50+ Enrolled",
  features: ["Skincare Basics", "Daily Makeup", "Hair Styling Fundamentals"],
  price: "₹12,000",
  originalPrice: "₹15,000",
  highlight: false
},
{
  title: "Advanced Makeup Course",
  duration: "6 Months",
  students: "30+ Enrolled",
  features: ["HD Makeup", "Airbrush Techniques", "Fashion Makeup", "Portfolio Building"],
  price: "₹16,000",
  originalPrice: "₹18,000",
  highlight: true
},
{
  title: "Bridal Makeup Training",
  duration: "4 Months",
  students: "40+ Enrolled",
  features: ["Bridal Looks", "Draping & Styling", "Client Handling", "Business Skills"],
  price: "₹23,000",
  originalPrice: "₹25,000",
  highlight: false
}];


const CoursesPreview = () => {
  return (
    <section className="section-padding bg-gradient-hero relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection direction="left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Award className="w-4 h-4" /> Professional Training Centre
            </div>
            <h2 className="heading-section mb-6">
              Master the Art of <span className="text-gradient-rose">Beauty</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Transform your passion into a rewarding career. Sakshi Beauty Training Centre offers 
              hands-on practical learning with industry-recognized certifications.
            </p>
            
            <div className="relative group rounded-3xl overflow-hidden shadow-luxury">
              <img
                src={trainingImg}
                alt="Beauty training classroom"
                className="w-full h-80 object-cover transition-transform duration-1000 group-hover:scale-110"
                loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 right-6 p-4 glass-card rounded-2xl translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-foreground font-bold italic">"Empowering the next generation of beauty experts"</p>
              </div>
            </div>
          </AnimatedSection>

          <div className="space-y-6">
            {courses.map((course, i) =>
            <AnimatedSection key={course.title} delay={0.2 + (i * 0.2)} direction="right">
                <Link to="/courses" className="block">
                  <motion.div
                  whileHover={{ x: 12, y: -4 }}
                  className={`relative group glass-card-hover rounded-[2rem] p-8 border border-white/20 transition-all duration-500 ${
                  course.highlight ? "bg-white/40 shadow-glow-sm" : "bg-white/20"}`
                  }>
                    
                    {/* Step indicator */}
                    <div className="absolute -left-3 -top-3 w-10 h-10 rounded-xl bg-foreground text-primary flex items-center justify-center font-heading font-bold shadow-lg">
                      0{i+1}
                    </div>

                    {course.highlight &&
                  <span className="absolute top-6 right-8 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-primary text-primary-foreground">
                        Best Choice
                      </span>
                  }
                    
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-3">{course.title}</h3>
                    
                    <div className="flex gap-4 mb-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <span className="flex items-center gap-1.5 bg-white/50 px-3 py-1.5 rounded-lg border border-white/30">
                        <Clock className="w-3.5 h-3.5 text-primary" /> {course.duration}
                      </span>
                      <span className="flex items-center gap-1.5 bg-white/50 px-3 py-1.5 rounded-lg border border-white/30">
                        <Users className="w-3.5 h-3.5 text-gold" /> {course.students}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {course.features.map((f) =>
                    <span key={f} className="px-3 py-1.5 text-[10px] font-bold rounded-lg bg-primary/10 text-primary border border-primary/10 uppercase tracking-tighter">
                          {f}
                        </span>
                    )}
                    </div>

                    <div className="flex items-center gap-3 mb-6">
                      <div className="text-2xl font-heading font-bold text-gradient-gold">
                        {course.price}
                      </div>
                      <div className="text-sm text-muted-foreground line-through opacity-50">
                        {course.originalPrice}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Details <ArrowRight className="w-3 h-3" />
                    </div>

                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </motion.div>
                </Link>
              </AnimatedSection>
            )}
            
            <AnimatedSection delay={0.8} direction="right" className="pt-4">
              <Link to="/courses" className="btn-luxury w-full py-4 text-center group">
                Explore Detailed Curriculum
                <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>);
};

export default CoursesPreview;