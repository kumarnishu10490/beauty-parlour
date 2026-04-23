import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { Target, Eye } from "lucide-react";

// ✅ Images import karo (IMPORTANT)
import heroImg from "@/assets/hero-salon.jpg";
import rubiImg from "@/assets/rubi.png";
import sakshiImg from "@/assets/sakshi.png";

const AboutPage = () => {
  return (
    <PageTransition>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-hero section-padding">
          <div className="max-w-7xl mx-auto text-center">
            <AnimatedSection>
              <span className="text-sm font-medium text-primary tracking-widest uppercase">
                About Us
              </span>
              <h1 className="heading-display mt-3">
                Our <span className="text-gradient-gold">Story</span>
              </h1>
            </AnimatedSection>
          </div>
        </section>

        {/* Story */}
        <section className="section-padding bg-background">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <img
                  src={heroImg}
                  alt="Our salon"
                  className="w-full h-96 object-cover" />
                
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <h2 className="heading-section mb-6">
                A Journey of{" "}
                <span className="text-gradient-rose">Beauty & Passion</span>
              </h2>

              <p className="text-muted-foreground mb-4">
                Founded over a decade ago, Sakshi Beauty Parlour began with a
                simple vision — to make beauty services accessible.
              </p>

              <p className="text-muted-foreground">
                Today, we proudly serve hundreds of clients and have trained many
                students.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Mission Vision */}
        <section className="section-padding bg-gradient-luxury">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
            {[
            {
              icon: Target,
              title: "Our Mission",
              text: "Empower individuals with beauty skills."
            },
            {
              icon: Eye,
              title: "Our Vision",
              text: "Become top beauty training institute."
            }].
            map((item, i) =>
            <AnimatedSection key={i}>
                <motion.div className="glass-card-hover p-8 rounded-3xl">
                  <item.icon className="mb-4" />
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p>{item.text}</p>
                </motion.div>
              </AnimatedSection>
            )}
          </div>
        </section>

        {/* Founder */}
        <section className="section-padding bg-background">
          <div className="max-w-7xl mx-auto space-y-10">

            {/* Rubi */}
            <AnimatedSection>
              <div className="glass-card p-8 flex flex-col md:flex-row items-center gap-6">
                <img
                  src={rubiImg}
                  alt="Rubi Kumari - Founder"
                  className="w-40 h-40 rounded-full object-cover" />
                
                <div>
                  <h3 className="text-2xl font-bold">Rubi Kumari</h3>
                  <p className="text-primary">Founder & Senior Trainer</p>
                  <p>With over 10+ years of experience in the beauty industry, Rubi has trained hundreds+ of students and served thousands of clients. Her passion for beauty and dedication to teaching have made Sakshi Beauty a name synonymous with excellence..</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Sakshi */}
            <AnimatedSection>
              <div className="glass-card p-8 flex flex-col md:flex-row items-center gap-6">
                <img
                  src={sakshiImg}
                  alt="Sakshi Yadav - Co Founder "
                  className="w-40 h-40 rounded-full object-cover" />
                
                <div>
                  <h3 className="text-2xl font-bold">Sakshi Yadav</h3>
                  <p className="text-primary">Co-Founder & Junior Trainer</p>
                  <p>With over 3+ years of experience in the beauty industry, Sakshi has served thousands of clients. Her passion for beauty have made Sakshi Beauty a name synonymous with excellence..</p>
                </div>
              </div>
            </AnimatedSection>

          </div>
        </section>
      </main>

      <Footer />
    </PageTransition>);

};

export default AboutPage;