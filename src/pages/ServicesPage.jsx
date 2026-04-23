import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import * as Icons from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import partyImg from "@/assets/party-makeup.jpg";
import facialImg from "@/assets/facial-care.jpg";
import hairImg from "@/assets/hair-styling.jpg";
import hairSmoothImg from "@/assets/hair-smoothening.jpg";
import mehndiImg from "@/assets/mehndi.jpg";


const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "services"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setServices(data);
      } catch (e) {
        console.error("Error fetching services", e);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <PageTransition>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-hero section-padding">
          <div className="max-w-7xl mx-auto text-center">
            <AnimatedSection>
              <span className="text-sm font-medium text-primary tracking-widest uppercase">Our Services</span>
              <h1 className="heading-display mt-3">
                Premium Beauty <span className="text-gradient-rose">Services</span>
              </h1>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
                Experience luxury beauty treatments designed to make you look and feel your absolute best.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding bg-background min-h-[50vh]">
          <div className="max-w-7xl mx-auto space-y-10 md:space-y-16">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <Icons.Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            ) : services.length === 0 ? (
              <div className="text-center text-muted-foreground">
                <p>No services found. Add some from the Admin Panel.</p>
              </div>
            ) : (
              services.map((service, i) => {
                const IconComponent = Icons[service.icon] || Icons.Sparkles;
                return (
                  <AnimatedSection key={service.id} direction={i % 2 === 0 ? "left" : "right"}>
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center ${i % 2 !== 0 ? "lg:direction-rtl" : ""}`}>
                      <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
                        <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl md:rounded-3xl overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
                        
                          {service.img ? (
                            <img src={service.img} alt={service.title} className="w-full h-48 sm:h-64 lg:h-80 object-cover" loading="lazy" />
                          ) : (
                            <div className="h-48 sm:h-64 lg:h-80 flex flex-col items-center justify-center text-gray-400">
                              <IconComponent className="w-16 h-16 mb-2 opacity-50" />
                              <span>No Image</span>
                            </div>
                          )}
                        </motion.div>
                      </div>
                      <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 md:mb-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blush flex items-center justify-center shrink-0">
                            <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                          </div>
                          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">{service.title}</h2>
                        </div>
                        <div className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 md:mb-4 quill-content" dangerouslySetInnerHTML={{ __html: service.desc }}></div>
                        <p className="text-base sm:text-lg font-heading font-semibold text-gradient-gold mb-4 md:mb-6">{service.price}</p>
                        <Link to="/contact" className="btn-luxury inline-block text-sm sm:text-base">
                          Book Appointment
                        </Link>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })
            )}
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>);

};

export default ServicesPage;