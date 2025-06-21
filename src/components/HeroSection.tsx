import React from "react";
import Floating1 from "../SVGs/Hero/Floating1";
import Floating2 from "../SVGs/Hero/Floating2";
import Floating3 from "../SVGs/Hero/Floating3";
import Floating4 from "../SVGs/Hero/Floating4";
import Floating5 from "../SVGs/Hero/Floating5";
import Floating6 from "../SVGs/Hero/Floating6";

interface HeroSectionProps {
  onStart?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStart }) => {
  return (
    <section className="bg-white rounded-2xl w-full max-w-6xl mx-auto p-4 sm:p-8 md:p-12 flex flex-col items-center relative shadow-sm overflow-visible min-h-[400px] sm:min-h-[500px] md:min-h-[700px]">
      {/* Floating SVGs */}
      <Floating1 className="hidden sm:block absolute left-2 top-2 w-10 opacity-80 animate-float-slow" />
      <Floating2 className="hidden sm:block absolute right-2 top-8 w-12 opacity-80 animate-float" />
      <Floating3 className="hidden sm:block absolute left-1/4 top-1/2 w-10 opacity-70 animate-float-delay" />
      <Floating4 className="hidden sm:block absolute right-1/4 top-1/3 w-12 opacity-70 animate-float" />
      <Floating5 className="hidden sm:block absolute left-8 bottom-2 w-10 opacity-60 animate-float-slow" />
      <Floating6 className="hidden sm:block absolute right-8 bottom-4 w-10 opacity-60 animate-float-delay" />
      {/* Top badge */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black text-white rounded-full px-4 py-1 text-xs sm:text-sm font-semibold">The Kow Company / Onboarding</div>
      {/* Title */}
      <h1 className="mt-20 sm:mt-24 text-3xl sm:text-5xl md:text-6xl font-bold text-center leading-tight text-black">Transform Your<br /><span className="bg-gradient-to-r from-green-600 via-green-500 to-green-700 bg-clip-text text-transparent">Digital Experience</span></h1>
      {/* Description */}
      <p className="mt-6 sm:mt-8 text-center text-black max-w-xs sm:max-w-2xl text-md sm:text-base">Enhance, retouch, and transform your visuals with precision. Our 2D image editing services include color correction, background removal, compositing, and fine-tuned enhancements to bring your creative vision to life. Perfect for marketing assets, product visuals, and digital content that demands polish and clarity.</p>
      {/* CTA Button */}
      <button
        className="mt-8 sm:mt-10 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 sm:px-8 py-3 rounded-md flex items-center gap-2 transition-colors shadow-lg active:scale-95 focus:scale-95 duration-150 text-base sm:text-lg"
        onClick={onStart}
      >
        Start Onboarding <span>→</span>
      </button>
    </section>
  );
};

export default HeroSection; 