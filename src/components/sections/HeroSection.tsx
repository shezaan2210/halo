import { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroBrandMarquee } from './HeroBrandMarquee';
import { MagneticButton } from '../ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = ({ isLoaded }: { isLoaded: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // 1. Initial State Setup (Prevent Flashing)
  useEffect(() => {
    gsap.set(".hero-word", { y: '110%', rotateZ: 5, opacity: 0 });
    gsap.set(".hero-desc", { y: 20, opacity: 0 });
    gsap.set(".hero-btn", { scale: 0.9, opacity: 0 });
    gsap.set(".hero-marquee", { opacity: 0 });
  }, []);

  // 2. Parallax Video Effect
  useEffect(() => {
    if (!videoRef.current) return;
    gsap.to(videoRef.current, {
      y: '15%',
      ease: 'none',
      scrollTrigger: {
        trigger: videoRef.current.parentElement,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });
  }, []);

  // 3. The Synchronized Intro Choreography
  useEffect(() => {
    if (!isLoaded) return;

    // We add a tiny 0.2s delay so the curtain has moved up just enough to reveal the text flowing in
    const tl = gsap.timeline({ delay: 0.2 });

    tl.to(".hero-word", { 
      y: '0%', 
      rotateZ: 0, 
      opacity: 1, 
      duration: 1.2, 
      stagger: 0.08, 
      ease: "power4.out" 
    })
    .to(".hero-desc", { 
      y: 0, 
      opacity: 1, 
      duration: 1, 
      ease: "power3.out" 
    }, "-=0.8")
    .to(".hero-btn", { 
      scale: 1, 
      opacity: 1, 
      duration: 0.8, 
      ease: "back.out(1.5)" 
    }, "-=0.8")
    .to(".hero-marquee", { 
      opacity: 1, 
      duration: 1 
    }, "-=0.6");
  }, [isLoaded]);

  return (
    <div className="flex-1 px-6 pt-20 pb-6 flex items-end">
      <div className="max-w-[96vw] mx-auto w-full h-full relative z-10">
        <div 
          className="relative w-full rounded-2xl overflow-hidden h-full flex flex-col justify-end" 
          style={{ minHeight: 'calc(100vh - 96px)' }}
        >
          {/* Parallax Video Wrapper */}
          <div className="absolute inset-0 -top-[15%] h-[130%] w-full overflow-hidden z-0">
            <video 
              ref={videoRef}
              autoPlay muted loop playsInline 
              className="object-cover w-full h-full will-change-transform"
            >
              <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4" type="video/mp4" />
            </video>
          </div>
          
          <div className="relative z-10 flex flex-col items-start justify-start p-12 pt-36 bg-gradient-to-t from-black/10 to-transparent w-full h-full">
            
            <h1 className="text-black text-[clamp(3.5rem,8vw,5.5rem)] font-medium leading-[0.95] max-w-2xl mb-6">
              <span className="inline-block overflow-hidden pb-1 -mb-1 relative">
                <span className="hero-word inline-block origin-bottom-left will-change-transform">Your</span>
              </span>{' '}
              <span className="inline-block overflow-hidden pb-1 -mb-1 relative">
                <span className="hero-word inline-block origin-bottom-left will-change-transform">Wealth</span>
              </span>
              <br />
              <span className="inline-block overflow-hidden pb-1 -mb-1 relative">
                <span className="hero-word inline-block origin-bottom-left will-change-transform">Works</span>
              </span>
            </h1>
            
            <p className="hero-desc text-black/80 text-[clamp(1rem,1.5vw,1.125rem)] max-w-md mb-10 leading-relaxed font-sans">
              An automated, reward-powered digital dollar built for native passive earnings and effortless connection into DeFi.
            </p>
            
            <div className="hero-btn">
              <MagneticButton>
                <button className="btn-fill inline-flex items-center gap-3 bg-black text-white text-lg font-medium pl-8 pr-2 py-2 rounded-full overflow-hidden z-10">
                  <span className="relative z-10">Join us</span>
                  <div className="bg-white rounded-full p-2 flex items-center justify-center relative z-10">
                    <ArrowRight className="w-5 h-5 text-black" />
                  </div>
                </button>
              </MagneticButton>
            </div>
            
            <div className="hero-marquee w-full max-w-md mt-24 overflow-hidden relative">
              <HeroBrandMarquee />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};