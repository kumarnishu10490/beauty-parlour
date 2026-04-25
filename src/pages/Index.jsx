import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OffersTicker from "@/components/home/OffersTicker";
import HeroSection from "@/components/home/HeroSection";
import ScrollTransformationStory from "@/components/home/ScrollTransformationStory";
import ServicesPreview from "@/components/home/ServicesPreview";
import CoursesPreview from "@/components/home/CoursesPreview";
import AIFeaturesShowcase from "@/components/home/AIFeaturesShowcase";
import FindYourLookQuiz from "@/components/home/FindYourLookQuiz";
import AnimatedStatsCounter from "@/components/home/AnimatedStatsCounter";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import bridalImg from "@/assets/bridal-makeup.jpg";
import facialImg from "@/assets/facial-care.jpg";
import AnimatedSection from "@/components/AnimatedSection";

const Index = () => {
  return (
    <PageTransition>
      <Navbar />
      <OffersTicker />
      <main>
        <HeroSection />
        <ScrollTransformationStory />
        
        {/* Transformation Section */}
        <section className="section-padding bg-gradient-luxury overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="text-sm font-medium text-primary tracking-widest uppercase bg-blush/50 px-4 py-1.5 rounded-full">
                The Wow Factor
              </span>
              <h2 className="heading-section mt-6">
                See the <span className="text-gradient-rose">Magic</span> Happen
              </h2>
              <p className="text-lg text-muted-foreground mt-6 leading-relaxed">
                Experience the precision and artistry of Sakshi Beauty. Use the slider to see how we enhance natural beauty into a stunning masterpiece.
              </p>
              <div className="flex gap-6 mt-10">
                <div className="text-center">
                  <div className="text-3xl font-heading font-bold text-primary">100%</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Satisfaction</div>
                </div>
                <div className="h-12 w-px bg-border/50" />
                <div className="text-center">
                  <div className="text-3xl font-heading font-bold text-gold">Premium</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Products</div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <BeforeAfterSlider 
                beforeImg={facialImg}
                afterImg={bridalImg}
                beforeLabel="Natural Look"
                afterLabel="Bridal Glam"
              />
            </AnimatedSection>
          </div>
        </section>

        <ServicesPreview />
        <CoursesPreview />
        <FindYourLookQuiz />
        <AIFeaturesShowcase />
        <AnimatedStatsCounter />
        <WhyChooseUs />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </PageTransition>);

};

export default Index;