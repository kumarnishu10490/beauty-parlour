import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { Camera, Loader2, Scissors, Sparkles } from "lucide-react";
import { toast } from "sonner";



const AIHairstylePage = () => {
  const [image, setImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [selected, setSelected] = useState(null);
  const fileRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      setResults(null);
      setSelected(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/beauty-ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
        },
        body: JSON.stringify({
          type: "hairstyle",
          userMessage: "Based on a typical Indian woman's face, suggest the best trending hairstyles. Consider different face shapes and hair textures common in India. Give me 6 hairstyle suggestions with match percentages."
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Analysis failed");

      const content = data?.result || "";
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        setResults(JSON.parse(jsonMatch[0]));
      } else {
        toast.error("Could not parse AI response. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Analysis failed. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <PageTransition>
      <Navbar />
      <main>
        <section className="pt-32 pb-16 bg-gradient-hero section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <span className="text-sm font-medium text-primary tracking-widest uppercase">AI Powered</span>
              <h1 className="heading-display mt-3">
                Hairstyle <span className="text-gradient-rose">Try-On</span>
              </h1>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
                Upload your photo and discover which hairstyles suit you best — powered by AI face analysis.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <AnimatedSection>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-primary/30 rounded-3xl p-10 text-center cursor-pointer hover:border-primary/60 transition-colors duration-300 bg-blush/10 aspect-square flex items-center justify-center">
                  
                  <input type="file" ref={fileRef} accept="image/*" onChange={handleUpload} className="hidden" />
                  {image ?
                  <img src={image} alt="Your photo" className="w-full h-full rounded-2xl object-cover" /> :

                  <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-blush/30 flex items-center justify-center">
                        <Camera className="w-8 h-8 text-primary" />
                      </div>
                      <p className="font-heading text-xl font-semibold text-foreground">Upload Your Photo</p>
                      <p className="text-sm text-muted-foreground">Front-facing photo works best</p>
                    </div>
                  }
                </div>
                {image && !results &&
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-center">
                    <button onClick={handleAnalyze} disabled={analyzing} className="btn-luxury inline-flex items-center gap-2">
                      {analyzing ?
                    <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Finding styles...
                        </> :

                    <>
                          <Scissors className="w-5 h-5" />
                          Find My Hairstyles
                        </>
                    }
                    </button>
                  </motion.div>
                }
              </AnimatedSection>

              <div>
                <AnimatePresence>
                  {results &&
                  <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                      <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                        <Sparkles className="w-5 h-5 text-primary inline mr-2" />
                        Top Matches For You
                      </h3>
                      {results.map((style, i) =>
                    <motion.div
                      key={style.name}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => setSelected(i)}
                      className={`glass-card rounded-2xl p-5 cursor-pointer transition-all duration-300 ${
                      selected === i ? "ring-2 ring-primary shadow-lg" : "hover:shadow-md"}`
                      }>
                      
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-heading text-lg font-semibold text-foreground">{style.name}</h4>
                              <p className="text-sm text-muted-foreground mt-0.5">{style.desc}</p>
                            </div>
                            <span className="text-lg font-bold text-gradient-gold">{style.match}</span>
                          </div>
                        </motion.div>
                    )}
                      <div className="text-center mt-6">
                        <button onClick={() => {setResults(null);setImage(null);}} className="text-sm text-primary underline hover:text-primary/80">
                          Try Again
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground text-center mt-4">
                        Visit Sakshi Beauty Parlour to get your perfect hairstyle! ✨
                      </p>
                    </motion.div>
                  }
                </AnimatePresence>
                {!results &&
                <div className="flex items-center justify-center h-full min-h-[300px]">
                    <p className="text-muted-foreground text-center">Upload a photo to see AI-recommended hairstyles</p>
                  </div>
                }
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>);

};

export default AIHairstylePage;