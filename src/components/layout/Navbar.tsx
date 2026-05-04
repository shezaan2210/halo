import { useEffect } from 'react';
import gsap from 'gsap';
import { LogoIcon } from '../ui/LogoIcon';
import { MagneticButton } from '../ui/MagneticButton';

export const Navbar = ({ isLoaded }: { isLoaded: boolean }) => {
  
  // 1. Instantly hide elements on mount (prevent flashing)
  useEffect(() => {
    gsap.set(".nav-item", { y: -30, opacity: 0 });
  }, []);

  // 2. Animate in when the loader triggers the reveal
  useEffect(() => {
    if (!isLoaded) return;
    
    gsap.to(".nav-item", { 
      y: 0, 
      opacity: 1, 
      duration: 1, 
      stagger: 0.1, 
      ease: "power4.out", 
      delay: 0.2 // Tiny delay to sync perfectly with curtain lift
    });
  }, [isLoaded]);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-6 mix-blend-difference text-white">
      <div className="max-w-[96vw] mx-auto flex items-center justify-between">
        <div className="nav-item flex items-center gap-3">
          <LogoIcon className="w-7 h-7 text-white" />
          <span className="text-2xl font-medium tracking-tight">Halo</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-sm tracking-wide font-medium">
          {['Network', 'Ecosystem', 'Rewards', 'Help', 'News'].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="nav-item relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all hover:after:w-full">
              {link}
            </a>
          ))}
        </div>
        
        <div className="nav-item">
          <MagneticButton>
            <button className="bg-white text-black text-sm tracking-wide font-semibold px-8 py-3 rounded-full hover:scale-105 transition-transform duration-300 will-change-transform">
              Open Wallet
            </button>
          </MagneticButton>
        </div>
      </div>
    </nav>
  );
};