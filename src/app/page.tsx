import { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { TemplateShowcase } from "@/components/landing/TemplateShowcase";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "CV Builder — Free Modern Resume & CV Maker | ATS-Optimized",
  description:
    "Build beautiful, recruiter-approved, ATS-friendly resumes and CVs in minutes. Live real-time A4 preview, multiple professional templates, instant PDF download.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <TemplateShowcase />
        <FeaturesGrid />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
