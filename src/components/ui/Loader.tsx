import  { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onStartReveal: () => void;
  onComplete: () => void;
}

export const Loader = ({ onStartReveal, onComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const maskCircleRef = useRef<SVGCircleElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  const hasRevealed = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial State: Text is small and faded, SVG is centered
      gsap.set(textRef.current, { opacity: 0, scale: 0.9 });
      gsap.set(ringRef.current, { strokeDashoffset: 880, rotation: -90, transformOrigin: 'center' });
      
      const tl = gsap.timeline();

      // 2. Fade in the typography
      tl.to(textRef.current, { opacity: 1, scale: 1, duration: 1, ease: "power3.out" });

      // 3. The Active Load Phase (Fixes the "Static" feel)
      // This draws the ring and simultaneously rotates it slowly for an organic, kinetic feel
      const counter = { val: 0 };
      tl.to(counter, {
        val: 100,
        duration: 2.8, 
        ease: "power2.inOut",
        onUpdate: () => setProgress(Math.round(counter.val)),
      }, "<")
      .to(ringRef.current, {
        strokeDashoffset: 0, // Draws the circle
        rotation: 90,        // Slow rotation while loading
        duration: 2.8,
        ease: "power2.inOut"
      }, "<");

      // 4. The Portal Reveal (The "Awwwards" moment)
      tl.to(textRef.current, {
        opacity: 0,
        scale: 0.5, // Sucks the text inward
        duration: 0.6,
        ease: "back.in(2)"
      })
      .add(() => {
        // Trigger the Hero animation right as the portal starts opening
        if (!hasRevealed.current) {
          hasRevealed.current = true;
          onStartReveal();
        }
      })
      // We calculate a radius large enough to cover any monitor size
      .to([maskCircleRef.current, ringRef.current], {
        attr: { r: () => Math.max(window.innerWidth, window.innerHeight) * 1.2 },
        strokeWidth: 4, // Thicken the ring slightly as it expands
        opacity: 0.8,
        duration: 1.5,
        ease: "expo.inOut",
        onComplete: onComplete 
      });
      
    });

    return () => ctx.revert();
  }, [onStartReveal, onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center bg-transparent">
      
      {/* 
        The SVG Mask Layer 
        This is a giant black rectangle with a transparent hole cut out of it. 
        We animate the radius (r) of the hole to reveal the site underneath.
      */}
      <svg ref={svgRef} className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <mask id="portalMask">
            {/* White keeps the black overlay visible */}
            <rect width="100%" height="100%" fill="white" />
            {/* Black cuts a hole in the overlay. It starts at r="0" (no hole) */}
            <circle ref={maskCircleRef} cx="50%" cy="50%" r="0" fill="black" />
          </mask>
          
          {/* Subtle glow filter for the Halo ring */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* The Black Screen Overlay */}
        <rect width="100%" height="100%" fill="#0a0a0c" mask="url(#portalMask)" />

        {/* The Glowing Halo Ring (r=140 means circumference is ~880) */}
        <circle 
          ref={ringRef} 
          cx="50%" 
          cy="50%" 
          r="140" 
          fill="none" 
          stroke="#ffffff" 
          strokeWidth="1.5" 
          strokeDasharray="880" 
          filter="url(#glow)"
        />
      </svg>

      {/* Kinetic Typography Overlay */}
      <div ref={textRef} className="relative z-10 flex flex-col items-center justify-center text-white mix-blend-difference">
        <span className="block text-xs uppercase tracking-[0.4em] font-semibold mb-6 opacity-60">
          Decrypting
        </span>
        <div className="flex flex-col items-center gap-2 overflow-hidden">
          <span className="text-[clamp(3rem,6vw,5rem)] font-medium leading-none tracking-tighter" style={{ letterSpacing: '-0.04em'}}>
            Halo
          </span>
          {/* We use tabular-nums so the width doesn't jump around as numbers change */}
          <span className="text-xl font-mono font-light opacity-80 tabular-nums">
            {progress.toString().padStart(3, '0')}%
          </span>
        </div>
      </div>
      
    </div>
  );
};