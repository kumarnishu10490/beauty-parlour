import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedSection from "../AnimatedSection";
import bridalImg from "@/assets/bridal-makeup.jpg";
import facialImg from "@/assets/facial-care.jpg";
import partyImg from "@/assets/party-makeup.jpg";

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
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.05, 0.30, 0.40], [1, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.35, 0.45, 0.60, 0.70], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.65, 0.75, 0.90, 1.0], [0, 1, 1, 1]);
  const opacities = [opacity1, opacity2, opacity3];

  const scale1 = useTransform(scrollYProgress, [0, 0.05, 0.30, 0.40], [1, 1, 1, 0.95]);
  const scale2 = useTransform(scrollYProgress, [0.35, 0.45, 0.60, 0.70], [0.93, 1, 1, 0.95]);
  const scale3 = useTransform(scrollYProgress, [0.65, 0.75, 0.90, 1.0], [0.93, 1, 1, 1]);
  const scales = [scale1, scale2, scale3];

  const y1 = useTransform(scrollYProgress, [0, 0.05, 0.30, 0.40], ["0px", "0px", "0px", "-40px"]);
  const y2 = useTransform(scrollYProgress, [0.35, 0.45, 0.60, 0.70], ["60px", "0px", "0px", "-40px"]);
  const y3 = useTransform(scrollYProgress, [0.65, 0.75, 0.90, 1.0], ["60px", "0px", "0px", "0px"]);
  const ys = [y1, y2, y3];

  const progressWidth = useTransform(scrollYProgress, [0, 0.85], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative bg-background">
      {/* Section header */}
      <div className="section-padding pb-8">
        <div className="max-w-7xl mx-auto text-center">
          <AnimatedSection>
            <span className="text-sm font-medium text-primary tracking-widest uppercase">
              The Journey
            </span>
            <h2 className="heading-section mt-3">
              A Beauty <span className="text-gradient-rose">Transformation</span> Story
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Scroll through the stages of a breathtaking beauty transformation
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Progress bar */}
      <div className="sticky top-20 z-20 px-6 md:px-20">
        <div className="max-w-3xl mx-auto h-1 bg-blush rounded-full overflow-hidden">
          <motion.div
            style={{ width: progressWidth }}
            className="h-full rounded-full"
            // Using inline style for gradient since this is a dynamic element
            {...{ style: { width: progressWidth, background: "linear-gradient(90deg, hsl(340 60% 55%), hsl(38 70% 55%))" } }} />
          
        </div>
      </div>

    {/* Stages */}
      <div className="min-h-[400vh] relative px-6 md:px-12 lg:px-20 py-16">
        <div className="sticky top-32 max-w-7xl mx-auto">
          <div className="relative min-h-[70vh] flex items-center">
            {stages.map((stage, i) =>
            <motion.div
              key={stage.step}
              style={{ opacity: opacities[i], scale: scales[i], y: ys[i], willChange: "transform, opacity" }}
              className="absolute inset-0 flex items-center">
              
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-6xl font-heading font-bold text-gradient-gold opacity-30">
                        {stage.step}
                      </span>
                      <div className="h-px flex-1 bg-border" />
                    </div>
                    <h3 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                      {stage.title}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                      {stage.description}
                    </p>
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-2xl">
                    <img
                    src={stage.img}
                    alt={stage.title}
                    className="w-full h-80 md:h-96 object-cover"
                    loading="lazy"
                    decoding="async" />
                  
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>);

};

export default ScrollTransformationStory;