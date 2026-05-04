import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use GSAP to set the centering so it doesn't get overwritten by x/y setters
    // We also start it at opacity 0
    gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });

    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    let isActive = false;

    const onMouseMove = (e: MouseEvent) => {
      // Fade in the cursor on the very first mouse movement
      if (!isActive) {
        gsap.to(cursor, { opacity: 1, duration: 0.3 });
        // Snap directly to mouse on first move to prevent it flying in from the top left
        currentX = e.clientX;
        currentY = e.clientY;
        isActive = true;
      }
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Render loop synced with GSAP's requestAnimationFrame
    gsap.ticker.add(() => {
      if (!isActive) return;
      // Spring physics (lerp)
      const dt = 1.0 - Math.pow(1.0 - 0.2, gsap.ticker.deltaRatio()); 
      currentX += (mouseX - currentX) * dt;
      currentY += (mouseY - currentY) * dt;
      xSet(currentX);
      ySet(currentY);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      // CRITICAL FIXES: 
      // 1. bg-white (required for mix-blend-difference to invert)
      // 2. Removed hidden classes (so it works on resized dev windows)
      // 3. z-[9999] so it floats above the loader screen
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full mix-blend-difference pointer-events-none z-[9999]"
    />
  );
};