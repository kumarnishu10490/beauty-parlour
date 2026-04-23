import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedSection from "../AnimatedSection";
import { Wand2, ArrowRight, RotateCcw, Sparkles } from "lucide-react";

const questions = [
{
  question: "Aapka occasion kya hai?",
  options: [
  { label: "💒 Wedding / Engagement", tags: ["bridal"] },
  { label: "🎉 Party / Event", tags: ["party"] },
  { label: "🧖 Self Care Day", tags: ["selfcare"] },
  { label: "📸 Photoshoot", tags: ["photoshoot"] }]

},
{
  question: "Aapki top priority kya hai?",
  options: [
  { label: "✨ Glowing Skin", tags: ["skin"] },
  { label: "💇 Perfect Hair", tags: ["hair"] },
  { label: "💄 Stunning Makeup", tags: ["makeup"] },
  { label: "💅 Complete Grooming", tags: ["grooming"] }]

},
{
  question: "Budget range?",
  options: [
  { label: "Under ₹1,000", tags: ["budget"] },
  { label: "₹1,000 - ₹3,000", tags: ["mid"] },
  { label: "₹3,000 - ₹10,000", tags: ["premium"] },
  { label: "₹10,000+", tags: ["luxury"] }]

}];









const recommendations = {
  "bridal-makeup-luxury": { title: "Royal Bridal Package", desc: "Complete bridal makeup, hairstyling, mehndi, draping & trial session", price: "₹15,000+", emoji: "👑" },
  "bridal-makeup-premium": { title: "Bridal Makeup Deluxe", desc: "HD bridal makeup with hairstyling and saree draping", price: "₹8,000 - ₹15,000", emoji: "💍" },
  "bridal-hair-luxury": { title: "Bridal Hair & Styling", desc: "Premium hair styling with extensions and accessories", price: "₹5,000+", emoji: "👸" },
  "party-makeup-mid": { title: "Party Glam Package", desc: "Party makeup with hairstyling — ready to shine!", price: "₹2,000 - ₹3,000", emoji: "🎉" },
  "party-makeup-budget": { title: "Quick Party Look", desc: "Light party makeup to look fabulous on a budget", price: "Under ₹1,000", emoji: "💃" },
  "selfcare-skin-mid": { title: "Glow Facial Package", desc: "Gold facial + cleanup + head massage for total relaxation", price: "₹1,500 - ₹2,500", emoji: "🧖" },
  "selfcare-skin-budget": { title: "Basic Cleanup & Glow", desc: "Deep cleanup with moisturizing for fresh skin", price: "₹500 - ₹800", emoji: "✨" },
  "selfcare-grooming-mid": { title: "Complete Grooming Session", desc: "Waxing, threading, manicure & pedicure combo", price: "₹1,500 - ₹2,500", emoji: "💅" },
  "photoshoot-makeup-premium": { title: "Photoshoot Ready Package", desc: "Camera-ready HD makeup with contouring & hairstyling", price: "₹3,000 - ₹5,000", emoji: "📸" },
  "selfcare-hair-mid": { title: "Hair Spa & Treatment", desc: "Deep conditioning hair spa with head massage", price: "₹1,000 - ₹2,000", emoji: "💆" },
  "default": { title: "Customized Beauty Package", desc: "Humse baat karo — aapke liye perfect package banayenge!", price: "Contact for pricing", emoji: "💖" }
};

const getRecommendation = (answers) => {
  const allTags = answers.flat();
  // Try specific combo first
  const occasion = allTags.find((t) => ["bridal", "party", "selfcare", "photoshoot"].includes(t)) || "selfcare";
  const priority = allTags.find((t) => ["skin", "hair", "makeup", "grooming"].includes(t)) || "makeup";
  const budget = allTags.find((t) => ["budget", "mid", "premium", "luxury"].includes(t)) || "mid";

  const key = `${occasion}-${priority}-${budget}`;
  return recommendations[key] || recommendations["default"];
};

const FindYourLookQuiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const handleAnswer = (tags) => {
    const newAnswers = [...answers, tags];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setResult(getRecommendation(newAnswers));
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <section className="section-padding bg-gradient-luxury">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection className="text-center mb-10">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary tracking-widest uppercase bg-blush/50 px-4 py-1.5 rounded-full">
            <Wand2 className="w-4 h-4" /> Interactive Quiz
          </span>
          <h2 className="heading-section mt-4">
            Find Your Perfect <span className="text-gradient-gold">Look</span>
          </h2>
          <p className="text-muted-foreground mt-2">3 simple sawaal — aur hum batayenge aapke liye best service!</p>
        </AnimatedSection>

        <div className="glass-card rounded-3xl p-8 md:p-10 min-h-[320px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!result ?
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}>
              
                {/* Progress */}
                <div className="flex items-center gap-2 mb-6">
                  {questions.map((_, i) =>
                <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden bg-secondary">
                      <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: i <= step ? "100%" : "0%" }}
                    transition={{ duration: 0.4 }} />
                  
                    </div>
                )}
                </div>

                <p className="text-xs text-muted-foreground mb-2">Question {step + 1} of {questions.length}</p>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                  {questions[step].question}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {questions[step].options.map((opt) =>
                <motion.button
                  key={opt.label}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(opt.tags)}
                  className="text-left p-4 rounded-2xl border-2 border-border bg-card hover:border-primary hover:bg-blush/20 transition-all duration-300 text-base font-medium text-foreground">
                  
                      {opt.label}
                    </motion.button>
                )}
                </div>
              </motion.div> :

            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center">
              
                <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="text-6xl mb-4">
                
                  {result.emoji}
                </motion.div>
                <p className="text-xs text-primary font-medium tracking-widest uppercase mb-2 flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3" /> Recommended for you
                </p>
                <h3 className="font-heading text-3xl font-bold text-foreground mb-2">{result.title}</h3>
                <p className="text-muted-foreground mb-2">{result.desc}</p>
                <p className="text-lg font-bold text-gradient-gold mb-6">{result.price}</p>

                <div className="flex flex-wrap gap-3 justify-center">
                  <Link to="/contact">
                    <motion.div whileHover={{ scale: 1.05 }} className="btn-luxury text-sm flex items-center gap-2">
                      Book Now <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </Link>
                  <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={reset}
                  className="btn-outline-luxury text-sm flex items-center gap-2 !px-6 !py-3">
                  
                    <RotateCcw className="w-4 h-4" /> Retake Quiz
                  </motion.button>
                </div>
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </div>
    </section>);

};

export default FindYourLookQuiz;