// hooks/useInView.ts
import { useEffect, useRef, useState } from "react";

export function useInView(threshold = 0.1) {
   const ref = useRef<HTMLDivElement>(null);
   const [visible, setVisible] = useState(false);

   useEffect(() => {
      const el = ref.current;
      if (!el) return;

      // Create observer with better options
      const obs = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting) {
               setVisible(true);
               obs.disconnect(); // Only trigger once
            }
         },
         {
            threshold: threshold,
            rootMargin: "50px" // This helps trigger earlier
         }
      );

      obs.observe(el);
      return () => obs.disconnect();
   }, [threshold]);

   return { ref, visible };
}