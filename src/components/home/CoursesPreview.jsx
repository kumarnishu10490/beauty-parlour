import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedSection from "../AnimatedSection";
import { Clock, Users } from "lucide-react";
import trainingImg from "@/assets/training-class.jpg";

const courses = [
{
  title: "Basic Beauty Course",
  duration: "3 Months",
  students: "50+ Enrolled",
  features: ["Skincare Basics", "Daily Makeup", "Hair Styling Fundamentals"],
  highlight: false
},
{
  title: "Advanced Makeup Course",
  duration: "6 Months",
  students: "30+ Enrolled",
  features: ["HD Makeup", "Airbrush Techniques", "Fashion Makeup", "Portfolio Building"],
  highlight: true
},
{
  title: "Bridal Makeup Training",
  duration: "4 Months",
  students: "40+ Enrolled",
  features: ["Bridal Looks", "Draping & Styling", "Client Handling", "Business Skills"],
  highlight: false
}];


const CoursesPreview = () => {
  return (
    <section className="section-padding bg-gradient-luxury relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection direction="left">
            <span className="text-sm font-medium text-primary tracking-widest uppercase">Training Centre</span>
            <h2 className="heading-section mt-3 mb-6">
              Master the Art of <span className="text-gradient-rose">Beauty</span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Join our professional beauty training courses and transform your passion into a rewarding career. 
              Learn from industry experts with hands-on practical training.
            </p>
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={trainingImg}
                alt="Beauty training classroom"
                className="w-full h-72 object-cover rounded-2xl"
                loading="lazy" />
              
            </div>
          </AnimatedSection>

          <div className="flex flex-col gap-6">
            {courses.map((course, i) =>
            <AnimatedSection key={course.title} delay={i * 0.15} direction="right">
                <motion.div
                whileHover={{ x: 8 }}
                className={`glass-card-hover rounded-2xl p-6 ${
                course.highlight ? "ring-2 ring-primary/30" : ""}`
                }>
                
                  {course.highlight &&
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground mb-3">
                      Most Popular
                    </span>
                }
                  <h3 className="font-heading text-xl font-semibold text-foreground">{course.title}</h3>
                  <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" /> {course.students}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {course.features.map((f) =>
                  <span key={f} className="px-3 py-1 text-xs rounded-full bg-blush text-blush-foreground">
                        {f}
                      </span>
                  )}
                  </div>
                </motion.div>
              </AnimatedSection>
            )}
            <AnimatedSection delay={0.4} direction="right">
              <Link to="/courses" className="btn-luxury inline-block text-center">
                Explore All Courses
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>);

};

export default CoursesPreview;