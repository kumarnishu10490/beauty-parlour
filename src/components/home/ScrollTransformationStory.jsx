import { motion } from "framer-motion";
import AnimatedSection from "../AnimatedSection";
import facialImg from "@/assets/facial-care.jpg";
import partyImg from "@/assets/party-makeup.jpg";
import bridalImg from "@/assets/bridal-makeup.jpg";

const stages = [
  {
    title: "Natural Beauty",
    description: "Every transformation begins with understanding your unique beauty. We start with a fresh canvas.",
    img: facialImg,
    step: "01"
  },
  {
    title: "Soft Enhancement",
    description: "Subtle touches that bring out your natural glow — skincare, base, and delicate highlights.",
    img: partyImg,
    step: "02"
  },
  {
    title: "Complete Transformation",
    description: "The final masterpiece — a stunning bridal or glamour look that makes you feel like royalty.",
    img: bridalImg,
    step: "03"
  }];

const ScrollTransformationStory = () => {
  return (
    <section className="relative bg-background overflow-hidden section-padding">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="text-sm font-medium text-primary tracking-widest uppercase">
            The Journey
          </span>
          <h2 className="heading-section mt-3">
            A Beauty <span className="text-gradient-rose">Transformation</span> Story
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Discover the stages of a breathtaking beauty transformation, curated just for you.
          </p>
        </AnimatedSection>

        {/* Timeline Layout */}
        <div className="relative space-y-20 md:space-y-32">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-0.5 bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20 -translate-x-1/2" />

          {stages.map((stage, i) => (
            <div key={stage.step} className="relative z-10">
              <div className={`flex flex-col lg:flex-row items-center gap-10 md:gap-16 ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
                
                {/* Text Content */}
                <motion.div 
                  initial={{ opacity: 0, x: i % 2 !== 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`w-full lg:w-1/2 ${i % 2 !== 0 ? "lg:pl-12" : "lg:pr-12 text-left lg:text-right"}`}
                >
                  <span className="inline-block text-5xl md:text-7xl font-heading font-bold text-gradient-gold opacity-40 mb-2">
                    {stage.step}
                  </span>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {stage.title}
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {stage.description}
                  </p>
                </motion.div>

                {/* Center Node (Desktop) */}
                <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-background border-4 border-primary rounded-full items-center justify-center shadow-lg z-20">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                </div>

                {/* Image */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="w-full lg:w-1/2"
                >
                  <div className="rounded-3xl overflow-hidden shadow-2xl relative group">
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                    <img
                      src={stage.img}
                      alt={stage.title}
                      className="w-full h-72 md:h-96 lg:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </motion.div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ScrollTransformationStory;