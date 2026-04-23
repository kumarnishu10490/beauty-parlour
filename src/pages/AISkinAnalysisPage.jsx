import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { AlertCircle, Camera, Droplets, Loader2, Shield, Sparkles, Sun } from "lucide-react";
import { toast } from "sonner";







const iconMap = [Sparkles, Droplets, Sun, Shield];

const AISkinAnalysisPage = () => {
  const [image, setImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const fileRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      setResults(null);
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
          type: "skin-analysis",
          userMessage: "Please analyze my skin. I have uploaded a selfie. Based on general Indian skin types, give me a detailed analysis with treatment recommendations available at Sakshi Beauty Parlour."
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Analysis failed");

      const content = data?.result || "";
      // Extract JSON from response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        setResults(parsed);
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
                Skin <span className="text-gradient-rose">Analysis</span>
              </h1>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
                Upload your photo and let our AI analyze your skin type, detect concerns, and recommend the perfect treatments.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <div
                onClick={() => fileRef.current?.click()}
                className="relative border-2 border-dashed border-primary/30 rounded-3xl p-12 text-center cursor-pointer hover:border-primary/60 transition-colors duration-300 bg-blush/10">
                
                <input type="file" ref={fileRef} accept="image/*" onChange={handleUpload} className="hidden" />
                {image ?
                <div className="flex flex-col items-center gap-4">
                    <img src={image} alt="Uploaded" className="w-48 h-48 rounded-2xl object-cover shadow-lg" />
                    <p className="text-sm text-muted-foreground">Click to change photo</p>
                  </div> :

                <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-blush/30 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-primary" />
                    </div>
                    <p className="font-heading text-xl font-semibold text-foreground">Upload Your Selfie</p>
                    <p className="text-sm text-muted-foreground">Clear, well-lit face photo works best</p>
                  </div>
                }
              </div>
            </AnimatedSection>

            {image && !results &&
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 text-center">
                <button onClick={handleAnalyze} disabled={analyzing} className="btn-luxury inline-flex items-center gap-2">
                  {analyzing ?
                <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      AI Analyzing...
                    </> :

                <>
                      <Sparkles className="w-5 h-5" />
                      Analyze My Skin
                    </>
                }
                </button>
              </motion.div>
            }

            <AnimatePresence>
              {results &&
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mt-12 space-y-8">
                  <div className="glass-card rounded-3xl p-8 text-center">
                    <h3 className="font-heading text-2xl font-bold text-foreground">Your Skin Type</h3>
                    <p className="text-3xl font-heading font-bold text-gradient-rose mt-2">{results.skinType}</p>
                    <div className="flex flex-wrap justify-center gap-3 mt-4">
                      {results.concerns.map((c) =>
                    <span key={c} className="px-4 py-1.5 rounded-full bg-blush/40 text-sm font-medium text-foreground flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-primary" /> {c}
                        </span>
                    )}
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-foreground text-center">Recommended Treatments</h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {results.recommendations.map((rec, i) => {
                    const Icon = iconMap[i % iconMap.length];
                    return (
                      <motion.div
                        key={rec.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.15 }}
                        className="glass-card-hover rounded-2xl p-6">
                        
                          <Icon className="w-8 h-8 text-primary mb-3" />
                          <h4 className="font-heading text-lg font-semibold text-foreground">{rec.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{rec.desc}</p>
                          {rec.price && <p className="text-sm font-semibold text-primary mt-2">{rec.price}</p>}
                        </motion.div>);

                  })}
                  </div>

                  <div className="text-center mt-8 space-y-3">
                    <button onClick={() => {setResults(null);setImage(null);}} className="btn-outline-luxury text-sm !px-6 !py-2.5">
                      Analyze Again
                    </button>
                    <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                      <AlertCircle className="w-3 h-3" /> AI analysis is for guidance only. Visit us for professional consultation.
                    </p>
                  </div>
                </motion.div>
              }
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>);

};

export default AISkinAnalysisPage;