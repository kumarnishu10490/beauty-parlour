import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import ServicesPage from "./pages/ServicesPage";
import CoursesPage from "./pages/CoursesPage";
import GalleryPage from "./pages/GalleryPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import WhatsAppButton from "./components/WhatsAppButton";
import SocialProofPopup from "./components/SocialProofPopup";
import AISkinAnalysisPage from "./pages/AISkinAnalysisPage";
import AIHairstylePage from "./pages/AIHairstylePage";
import AIBeautyConsultantPage from "./pages/AIBeautyConsultantPage";
import AICourseAdvisorPage from "./pages/AICourseAdvisorPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminContact from "./pages/admin/AdminContact";
import AdminServices from "./pages/admin/AdminServices";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminAppointments from "./pages/admin/AdminAppointments";
import AdminLayout from "./components/admin/AdminLayout";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/ai/skin-analysis" element={<AISkinAnalysisPage />} />
        <Route path="/ai/hairstyle" element={<AIHairstylePage />} />
        <Route path="/ai/consultant" element={<AIBeautyConsultantPage />} />
        <Route path="/ai/course-advisor" element={<AICourseAdvisorPage />} />
        
        <Route path="*" element={<NotFound />} />
        {/* Admin routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/gallery" element={<AdminGallery />} />
          <Route path="/admin/contact" element={<AdminContact />} />
          <Route path="/admin/services" element={<AdminServices />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/appointments" element={<AdminAppointments />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
        <WhatsAppButton />
        <SocialProofPopup />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);


export default App;