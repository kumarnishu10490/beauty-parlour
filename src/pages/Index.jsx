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
import AnimatedSection from "@/components/AnimatedSection";

const Index = () => {
  return (
    <PageTransition>
      <Navbar />
      <OffersTicker />
      <main>
        <HeroSection />
        <ScrollTransformationStory />

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