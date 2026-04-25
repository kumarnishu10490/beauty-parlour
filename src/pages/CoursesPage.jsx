import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { Clock, Users, Award, CheckCircle2, Loader2 } from "lucide-react";
import trainingImg from "@/assets/training-class.jpg";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";



const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCourses(data);
      } catch (e) {
        console.error("Error fetching courses", e);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <PageTransition>
      <Navbar />
      <main>
        <section className="pt-32 pb-16 bg-gradient-hero section-padding">
          <div className="max-w-7xl mx-auto text-center">
            <AnimatedSection>
              <span className="text-sm font-medium text-primary tracking-widest uppercase">Training Centre</span>
              <h1 className="heading-display mt-3">
                Professional Beauty <span className="text-gradient-gold">Courses</span>
              </h1>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
                Transform your passion into a rewarding career with our industry-recognized beauty courses.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="max-w-7xl mx-auto">
            {/* Overview image */}
            <AnimatedSection className="mb-16">
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <img src={trainingImg} alt="Beauty training facility" className="w-full h-72 md:h-96 object-cover" loading="lazy" />
              </div>
            </AnimatedSection>

            {/* Course Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[40vh]">
              {loading ? (
                <div className="col-span-full flex justify-center items-center">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
              ) : courses.length === 0 ? (
                <div className="col-span-full text-center text-muted-foreground">
                  <p>No courses available right now. Please check back later.</p>
                </div>
              ) : (
                courses.map((course, i) =>
                <AnimatedSection key={course.id} delay={i * 0.15}>
                    <motion.div
                    whileHover={{ y: -8 }}
                    className={`glass-card-hover rounded-3xl p-8 h-full flex flex-col ${course.popular ? "ring-2 ring-primary/40" : ""}`}>
                    
                      {course.popular &&
                    <span className="inline-block self-start px-4 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground mb-4">
                          Most Popular
                        </span>
                    }
                      <h3 className="font-heading text-2xl font-bold text-foreground mb-2">{course.title}</h3>
                      <div className="text-muted-foreground text-sm mb-4 quill-content" dangerouslySetInnerHTML={{ __html: course.description }}></div>
                      
                      <div className="flex gap-4 mb-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {course.duration}</span>
                        <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {course.students}</span>
                      </div>

                      <div className="space-y-2 mb-6 flex-1">
                        {course.modules && course.modules.map((m) =>
                      <div key={m} className="flex items-center gap-2 text-sm text-foreground">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            {m}
                          </div>
                      )}
                      </div>

                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-2xl font-heading font-bold text-gradient-gold">
                          {course.price}
                        </div>
                        {course.originalPrice && (
                          <div className="text-sm text-muted-foreground line-through opacity-50">
                            {course.originalPrice}
                          </div>
                        )}
                      </div>
                      <Link to="/contact" className="btn-luxury text-center">
                        Enroll Now
                      </Link>
                    </motion.div>
                  </AnimatedSection>
                )
              )}
            </div>

            {/* Certificate info */}
            <AnimatedSection className="mt-16">
              <div className="glass-card rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                <div className="w-20 h-20 rounded-full bg-blush flex items-center justify-center flex-shrink-0">
                  <Award className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Certified Training</h3>
                  <p className="text-muted-foreground">
                    All graduates receive a recognized professional certificate upon successful completion of their course, 
                    helping you establish credibility and launch your beauty career with confidence.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>);

};

export default CoursesPage;