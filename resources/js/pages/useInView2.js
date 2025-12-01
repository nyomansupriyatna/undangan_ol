// hooks/useInView.tsx
import { useEffect, useRef, useState } from "react";

export default function useInView2(options) {
  const ref2 = useRef(null);
  const [isInView2, setIsInView2] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView2(entry.isIntersecting);
      },
      { threshold: 0.2, ...options }
    );

    if (ref2.current) observer.observe(ref2.current);

    return () => {
      if (ref2.current) observer.unobserve(ref2.current);
    };
  }, [options]);

  return [ref2, isInView2];
}
