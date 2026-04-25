import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import AnimatedSection from "../AnimatedSection";
import * as Icons from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, limit } from "firebase/firestore";

const ServicesPreview = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const q = query(collection(db, "services"), limit(6));
        const querySnapshot = await getDocs(q);
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

        {loading ? (
          <div className="flex justify-center items-center h-40 relative z-10">
            <Icons.Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {services.map((service, i) => {
              const IconComponent = Icons[service.icon] || Icons.Sparkles;
              return (
                <AnimatedSection key={service.id} delay={i * 0.1}>
                  <motion.div
                    onClick={() => navigate(`/contact?service=${encodeURIComponent(service.title)}`)}
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card-hover rounded-2xl overflow-hidden group cursor-pointer h-full flex flex-col relative z-20">

                    <div className="relative h-48 overflow-hidden pointer-events-none shrink-0">
                      {service.img ? (
                        <img
                          src={service.img}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy" />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                           <IconComponent className="w-12 h-12 text-gray-300" />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <IconComponent className="w-8 h-8 text-primary-foreground drop-shadow-lg" />
                      </div>
                    </div>
                    
                    <div className="p-6 pointer-events-none flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <h3 className="font-heading text-xl font-semibold text-foreground leading-tight">{service.title}</h3>
                        {service.price && (
                          <span className="text-sm font-bold text-gradient-gold whitespace-nowrap bg-gold/10 px-2 py-1 rounded-md">{service.price}</span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground line-clamp-2 quill-content flex-1" dangerouslySetInnerHTML={{ __html: service.desc }}></div>
                    </div>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        )}

        <AnimatedSection className="text-center mt-12 relative z-10">
          <Link to="/services" className="btn-outline-luxury">
            View All Services
          </Link>
        </AnimatedSection>
      </div>
    </section>);

};

export default ServicesPreview;