import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const RevealText = ({ text, className = "" }: { text: string, className?: string }) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const words = containerRef.current.querySelectorAll('.reveal-word');
    
    gsap.fromTo(words, 
      { y: '110%', rotateZ: 5, opacity: 0 },
      {
        y: '0%', rotateZ: 0, opacity: 1,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      }
    );
  }, []);

  return (
    <h1 ref={containerRef} className={className}>
      {text.split(/(\s+|<br\s*\/?>)/).map((word, i) => {
        if (word.match(/<br\s*\/?>/)) return <br key={i} />;
        if (!word.trim()) return <span key={i}> </span>;
        return (
          <span key={i} className="inline-block overflow-hidden pb-1 -mb-1 relative">
            <span className="reveal-word inline-block will-change-transform origin-bottom-left">
              {word}
            </span>
          </span>
        );
      })}
    </h1>
  );
};