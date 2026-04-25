import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import bridalImg from "@/assets/bridal-makeup.jpg";
import hairImg from "@/assets/hair-styling.jpg";
import mehndiImg from "@/assets/mehndi.jpg";
import facialImg from "@/assets/facial-care.jpg";
import hairSmoothImg from "@/assets/hair-smoothening.jpg";
import partyImg from "@/assets/party-makeup.jpg";
import heroImg from "@/assets/hero-salon.jpg";
import img1 from "@/assets/img1.jpeg";
import img2 from "@/assets/img2.jpeg";

const galleryImages = [
{ src: bridalImg, title: "Bridal Elegance", category: "Bridal" },
{ src: hairImg, title: "Hair Artistry", category: "Hair" },
{ src: mehndiImg, title: "Mehndi Magic", category: "Mehndi" },
{ src: facialImg, title: "Skincare Luxury", category: "Skincare" },
{ src: hairSmoothImg, title: "Smooth & Silky", category: "Hair" },
{ src: partyImg, title: "Party Glamour", category: "Makeup" },
{ src: heroImg, title: "Our Studio", category: "Studio" },
{ src: bridalImg, title: "Bridal Perfection", category: "Bridal" },
{ src: img1, title: "Our Studio", category: "Studio" },
{ src: img2, title: "Bridal Perfection", category: "Bridal" }];



const categories = ["All", "Bridal", "Hair", "Makeup", "Mehndi", "Skincare", "Studio"];

const GalleryPage = () => {
  const [filter, setFilter] = useState("All");
  const [selectedImg, setSelectedImg] = useState(null);
  const [firebaseImages, setFirebaseImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const q = query(collection(db, "gallery"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ 
          src: doc.data().url, 
          title: doc.data().title || "Gallery Image", 
          category: doc.data().category || "All",
          id: doc.id
        }));
        setFirebaseImages(data);
      } catch (e) {
        console.error("Error fetching gallery from Firebase", e);
      }
    };
    fetchImages();
  }, []);

  const allImages = [...galleryImages, ...firebaseImages];
  const filtered = filter === "All" ? allImages : allImages.filter((g) => g.category === filter);

  return (
    <PageTransition>
      <Navbar />
      <main>
        <section className="pt-32 pb-16 bg-gradient-hero section-padding">
          <div className="max-w-7xl mx-auto text-center">
            <AnimatedSection>
              <span className="text-sm font-medium text-primary tracking-widest uppercase">Gallery</span>
              <h1 className="heading-display mt-3">
                Student <span className="text-gradient-rose">Gallery</span>
              </h1>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
                Explore our students' beautiful work and transformations.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="max-w-7xl mx-auto">
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat) =>
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === cat ?
                "bg-primary text-primary-foreground" :
                "bg-blush text-blush-foreground hover:bg-primary/10"}`
                }>
                
                  {cat}
                </button>
              )}
            </div>

            {/* Masonry Grid */}
            <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              <AnimatePresence>
                {filtered.map((img, i) =>
                <motion.div
                  key={img.title + i}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="break-inside-avoid group cursor-pointer"
                  onClick={() => setSelectedImg(img.src)}>
                  
                    <div className="rounded-2xl overflow-hidden relative">
                      <img
                      src={img.src}
                      alt={img.title}
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy" />
                    
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-all duration-300 flex items-end">
                        <div className="p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-primary-foreground font-heading font-semibold">{img.title}</p>
                          <p className="text-primary-foreground/70 text-sm">{img.category}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-foreground/90 flex items-center justify-center p-6"
          onClick={() => setSelectedImg(null)}>
          
            <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            src={selectedImg}
            alt="Gallery preview"
            className="max-w-full max-h-[85vh] rounded-2xl object-contain" />
          
          </motion.div>
        }
      </AnimatePresence>

      <Footer />
    </PageTransition>);

};

export default GalleryPage;