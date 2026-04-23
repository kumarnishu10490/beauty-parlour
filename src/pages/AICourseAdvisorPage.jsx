import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, CheckCircle2, Clock, GraduationCap, Loader2, Star } from "lucide-react";
import { toast } from "sonner";

const questions = [
{
  question: "Aapka beauty mein kaunsa area sabse zyada interest hai?",
  options: ["Makeup", "Hair Styling", "Skin Care", "Nail Art", "Mehndi"]
},
{
  question: "Aapka current experience level kya hai?",
  options: ["Complete Beginner", "Basic Knowledge", "Intermediate", "Want to Specialize"]
},
{
  question: "Aap kitna time de sakte hain training ke liye?",
  options: ["2 Weeks Crash Course", "1 Month Regular", "3 Months Professional", "6 Months Advanced"]
},
{
  question: "Aapka goal kya hai?",
  options: ["Self-grooming", "Freelance Artist", "Own Salon/Parlour", "Join a Brand"]
}];




const AICourseAdvisorPage = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      fetchRecommendations(newAnswers);
    }
  };

  const fetchRecommendations = async (allAnswers) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/beauty-ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
        },
        body: JSON.stringify({
          type: "course-advisor",
          userMessage: `Here are my preferences:
- Interest area: ${allAnswers[0]}
- Experience level: ${allAnswers[1]}
- Time commitment: ${allAnswers[2]}
- Career goal: ${allAnswers[3]}

Please recommend the best 3 beauty courses available at Sakshi Beauty Parlour & Training Centre.`
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to get recommendations");

      const content = data?.result || "";
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        setCourses(JSON.parse(jsonMatch[0]));
        setShowResults(true);
      } else {
        toast.error("Could not parse AI response. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Failed to get recommendations.");
    } finally {
      setLoading(false);
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers([]);
    setShowResults(false);
    setCourses([]);
  };

  const progress = answers.length / questions.length * 100;

  return (
    <PageTransition>
      <Navbar />
      <main>
        <section className="pt-32 pb-16 bg-gradient-hero section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <span className="text-sm font-medium text-primary tracking-widest uppercase">AI Powered</span>
              <h1 className="heading-display mt-3">
                Course <span className="text-gradient-rose">Advisor</span>
              </h1>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
                Answer a few questions and our AI will recommend the perfect beauty course for you.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              {loading ?
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-16">
                  <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                  <p className="font-heading text-xl font-semibold text-foreground">AI aapke liye best courses dhundh raha hai...</p>
                  <p className="text-muted-foreground mt-2 text-sm">Based on: {answers.join(", ")}</p>
                </motion.div> :
              !showResults ?
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}>
                
                  <div className="mb-8">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>Question {step + 1} of {questions.length}</span>
                      <span>{Math.round(progress)}% complete</span>
                    </div>
                    <div className="h-2 bg-blush/30 rounded-full overflow-hidden">
                      <motion.div
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--gold)))" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }} />
                    
                    </div>
                  </div>

                  <div className="glass-card rounded-3xl p-8">
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                      {questions[step].question}
                    </h3>
                    <div className="space-y-3">
                      {questions[step].options.map((opt) =>
                    <motion.button
                      key={opt}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(opt)}
                      className="w-full text-left px-6 py-4 rounded-2xl bg-blush/10 hover:bg-blush/30 border border-transparent hover:border-primary/20 transition-all duration-200 text-foreground font-medium flex items-center justify-between group">
                      
                          {opt}
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </motion.button>
                    )}
                    </div>
                  </div>

                  {answers.length > 0 &&
                <div className="mt-6 flex flex-wrap gap-2">
                      {answers.map((a, i) =>
                  <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium">
                          {a}
                        </span>
                  )}
                    </div>
                }
                </motion.div> :

              <motion.div key="results" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-blush/30 flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-foreground">Your Perfect Courses</h3>
                    <p className="text-muted-foreground mt-2">Based on: {answers.join(", ")}</p>
                  </div>

                  {courses.map((course, i) =>
                <motion.div
                  key={course.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="glass-card-hover rounded-2xl p-6">
                  
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-heading text-xl font-bold text-foreground">{course.title}</h4>
                          <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" /> {course.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 text-gold" /> Match: {course.match}
                            </span>
                          </div>
                        </div>
                        <span className="text-2xl font-bold text-gradient-gold">{course.match}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {course.highlights.map((h) =>
                    <span key={h} className="text-sm text-muted-foreground flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" /> {h}
                          </span>
                    )}
                      </div>
                    </motion.div>
                )}

                  <div className="text-center space-y-4 mt-8">
                    <a href="/contact" className="btn-luxury inline-block">
                      Enroll Now — Contact Us
                    </a>
                    <br />
                    <button onClick={restart} className="text-sm text-primary underline hover:text-primary/80">
                      Retake Quiz
                    </button>
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

export default AICourseAdvisorPage;