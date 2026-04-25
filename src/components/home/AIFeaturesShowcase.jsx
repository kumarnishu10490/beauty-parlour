import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedSection from "../AnimatedSection";
import { Scan, Scissors, MessageCircle, BookOpen, ArrowRight, Sparkles } from "lucide-react";

const aiFeatures = [
{
  icon: Scan,
  title: "AI Skin Analysis",
  desc: "Photo upload karo, instant skin type aur treatment recommendations paao",
  path: "/ai/skin-analysis",
  gradient: "from-primary to-rose-gold",
  emoji: "🧴"
},
{
  icon: Scissors,
  title: "Hairstyle Try-On",
  desc: "Apne face shape ke hisaab se perfect hairstyle suggestions paao",
  path: "/ai/hairstyle",
  gradient: "from-gold to-accent",
  emoji: "💇"
},
{
  icon: MessageCircle,
  title: "Beauty Consultant",
  desc: "24/7 AI beauty expert se beauty tips aur product recommendations lo",
  path: "/ai/consultant",
  gradient: "from-rose-gold to-primary",
  emoji: "💬"
},
{
  icon: BookOpen,
  title: "Course Advisor",
  desc: "Quiz do aur jaano kaunsa beauty course tumhare liye best hai",
  path: "/ai/course-advisor",
  gradient: "from-accent to-gold",
  emoji: "📚"
}];


const AIFeaturesShowcase = () => {
  return (
    <section className="section-padding bg-gradient-luxury relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary tracking-widest uppercase bg-blush/50 px-4 py-1.5 rounded-full">
            <Sparkles className="w-4 h-4" /> AI-Powered
          </span>
          <h2 className="heading-section mt-4">
            Smart <span className="text-gradient-gold">Beauty Tools</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            India ka pehla AI-powered beauty parlour — technology se beauty ko next level pe le jaao
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiFeatures.map((feature, i) =>
          <AnimatedSection key={feature.title} delay={i * 0.1}>
              <Link to={feature.path}>
                <motion.div
                whileHover={{ y: -5, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="glass-card rounded-3xl p-6 h-full cursor-pointer group relative overflow-hidden"
                style={{ willChange: "transform" }}>
                
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-gold/5 rounded-3xl" />

                  <div className="relative z-10">
                    <div className="text-4xl mb-4">{feature.emoji}</div>
                    <motion.div
                    whileHover={{ rotate: 5 }}
                    className="w-12 h-12 rounded-2xl bg-blush flex items-center justify-center mb-4">
                    
                      <feature.icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{feature.desc}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      Try Now <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            </AnimatedSection>
          )}
        </div>
      </div>
    </section>);

};

export default AIFeaturesShowcase;