import Hero from "@/components/Home/Hero";
import Templates from "@/components/Home/Templates";
import Features from "@/components/Home/Features";
import HowItWorks from "@/components/Home/HowItWorks";
import Testimonials from "@/components/Home/Testimonials";
import Pricing from "@/components/Home/Pricing";
import FAQ from "@/components/Home/FAQ";
import CTA from "@/components/Home/CTA";

export default function Home() {
  return (
    <main className="relative">
      {/* Background gradient for the entire page */}
      <div className="fixed inset-0 bg-gradient-to-b from-white via-gray-50 to-gray-100 -z-10" />
      
      {/* Animated background shapes */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-100 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-100 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-100 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      <Hero />
      <Features />
      <Templates />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
    </main>
  );
}
