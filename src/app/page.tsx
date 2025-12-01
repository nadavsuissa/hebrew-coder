'use client';

import AnimatedBackground from '@/components/home/AnimatedBackground';
import HeroSection from '@/components/home/HeroSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import CoursesPreviewSection from '@/components/home/CoursesPreviewSection';
import CTASection from '@/components/home/CTASection';
import Footer from '@/components/home/Footer';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0B1120] text-white overflow-hidden">
      <AnimatedBackground />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <CoursesPreviewSection />
      <CTASection />
      <Footer />
    </main>
  );
}
