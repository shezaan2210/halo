import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const UseCasesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   // Pin the left text column while scrolling through the section
  //   if (window.innerWidth > 768) {
  //     ScrollTrigger.create({
  //       trigger: containerRef.current,
  //       start: "top 20%",
  //       end: "bottom 80%",
  //       pin: leftColRef.current,
  //       pinSpacing: false,
  //     });
  //   }
  // }, []);

  return (
    <section ref={containerRef} className="bg-[#F5F5F5] px-6 py-32 relative">
      <div className="max-w-[96vw] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        
        {/* Pinned Left Column */}
        <div ref={leftColRef} className="md:pr-12 will-change-transform">
          <span className="block text-black/60 text-xs tracking-widest uppercase mb-4 font-semibold">
            USD Halo in Practice
          </span>
          <h2 className="text-[clamp(3rem,6vw,4.5rem)] font-medium leading-[0.9] mb-6" style={{ letterSpacing: '-0.04em' }}>
            Use modes
          </h2>
          <p className="text-black/60 text-lg leading-relaxed max-w-sm">
            USD Halo powers a wide range of modes for builders, companies and treasuries wanting safe and rewarding stablecoin integrations plus more.
          </p>
        </div>
        
        {/* Scrolling Right Column */}
        <div className="relative rounded-[2rem] overflow-hidden min-h-[720px] shadow-2xl">
          <video 
            autoPlay muted loop playsInline 
            className="object-cover absolute inset-0 w-full h-full scale-105"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_183428_ab5e672a-f608-4dcb-b319-f3e040f02e2d.mp4" type="video/mp4" />
          </video>
          
          <div className="relative z-10 p-10 md:p-14 flex flex-col items-start bg-gradient-to-b from-white/10 to-transparent">
            <h3 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-tight mb-5 text-black" style={{ letterSpacing: '-0.03em' }}>
              Commerce
            </h3>
            <p className="text-black/80 text-lg max-w-md mb-10 font-sans leading-relaxed">
              Lift customer retention by offering USD Halo, a trusted dollar-backed stablecoin with strong yields, letting your patrons earn with zero effort on your platform.
            </p>
            
            <a href="#" className="group inline-flex items-center gap-4 text-black font-medium text-lg relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full">
              Know more
              <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center group-hover:bg-white transition-all duration-300 group-hover:translate-x-1 shadow-sm">
                <ArrowRight className="w-4 h-4 text-black" />
              </div>
            </a>
          </div>
        </div>
        
      </div>
    </section>
  );
};