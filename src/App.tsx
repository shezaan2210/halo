import React, { useState, useCallback } from 'react';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { InfoSection } from './components/sections/InfoSection';
import { BackedBySection } from './components/sections/BackedBySection';
import { UseCasesSection } from './components/sections/UseCasesSection';
import { CustomCursor } from './components/ui/CustomCursor';
import { Noise } from './components/ui/Noise';
import { Loader } from './components/ui/Loader';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isRevealing, setIsRevealing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // 1. Lock the functions in memory so they don't trigger re-renders in the Loader
  const handleStartReveal = useCallback(() => {
    setIsRevealing(true);
  }, []);

  const handleComplete = useCallback(() => {
    setIsComplete(true);
  }, []);

  return (
    <>
      <CustomCursor />
      <Noise />
      
      {!isComplete && (
        <Loader 
          // 2. Pass the memoized functions instead of inline arrow functions
          onStartReveal={handleStartReveal} 
          onComplete={handleComplete} 
        />
      )}

      <ReactLenis root options={{ lerp: 0.07, smoothWheel: true }}>
        <div className="relative flex flex-col bg-[#F5F5F5] min-h-screen w-full selection:bg-black selection:text-white">
          <div className="h-screen w-full flex flex-col overflow-hidden relative">
            <Navbar isLoaded={isRevealing} />
            <HeroSection isLoaded={isRevealing} />
          </div>
          
          <div className="relative z-20 bg-[#F5F5F5]">
            <InfoSection />
            <BackedBySection />
            <UseCasesSection />
          </div>
        </div>
      </ReactLenis>
    </>
  );
}

export default App;