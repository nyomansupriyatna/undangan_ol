import React, { useRef, useState, useEffect } from 'react';

// Reusable hook: useIntersectionObserver
// - ref: React ref to observe
// - options: IntersectionObserver options (root, rootMargin, threshold)
// - return: boolean isIntersecting
export function useIntersectionObserver(ref, options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        console.log("Component sudah dirender");
    });

    useEffect(() => {
        console.log("Hanya dijalankan 1 kali");
    }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // If IntersectionObserver is not supported, assume visible
    if (!('IntersectionObserver' in window)) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // entry.isIntersecting is true when element is in viewport
        setIsIntersecting(entry.isIntersecting);
      });
    }, options);

    observer.observe(node);

    return () => observer.unobserve(node);
  }, [ref, JSON.stringify(options)]);

  return isIntersecting;
}

// Example 1: Animate when element enters viewport
export default function AnimatedCard() {
  const ref = useRef(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.2 });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Intersection Observer — React example</h1>

        <div style={{ height: 300 }} className="mb-8 bg-white rounded shadow flex items-center justify-center">
          <p className="text-gray-500">Scroll down to reveal the card</p>
        </div>

        <div
          ref={ref}
          // Tailwind: transition + transform for a smooth entrance
          className={`bg-white rounded-xl p-6 shadow-lg transform transition-all duration-700 ease-out
            ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}`}
        >
          <h2 className="text-xl font-semibold">Hello 1 — I animate when visible</h2>
          <p className="mt-2 text-gray-600">This card uses a reusable useIntersectionObserver hook to detect when it enters the viewport.</p>
        </div>
        <div
          ref={ref}
          // Tailwind: transition + transform for a smooth entrance
          className={`bg-white rounded-xl p-6 shadow-lg transform transition-all duration-700 ease-out
            ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}`}
        >
          <h2 className="text-xl font-semibold">Hello 2 — I animate when visible</h2>
          <p className="mt-2 text-gray-600">This card uses a reusable useIntersectionObserver hook to detect when it enters the viewport.</p>
        </div>
        <div
          ref={ref}
          // Tailwind: transition + transform for a smooth entrance
          className={`bg-white rounded-xl p-6 shadow-lg transform transition-all duration-700 ease-out
            ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}`}
        >
          <h2 className="text-xl font-semibold">Hello 3 — I animate when visible</h2>
          <p className="mt-2 text-gray-600">This card uses a reusable useIntersectionObserver hook to detect when it enters the viewport.</p>
        </div>

        <div style={{ height: 600 }} className="mt-8" />
      </div>
    </div>
  );
}

// Example 2: Lazy-loading images using the same hook
export function LazyImage({ src, alt, className = '', placeholder = null }) {
  const ref = useRef(null);
  const visible = useIntersectionObserver(ref, { rootMargin: '200px 0px' });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (visible && src) {
      const img = new Image();
      img.src = src;
      img.onload = () => setLoaded(true);
    }
  }, [visible, src]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {!loaded && (placeholder || <div className="w-full h-48 bg-gray-200 animate-pulse" />)}
      {loaded && <img src={src} alt={alt} className="w-full h-auto block" />}
    </div>
  );
}

<LazyImage/>

/*
How to use
1. Put these components in a file, e.g. src/components/IntersectionExamples.jsx
2. Ensure Tailwind is installed if you want those classes (plain CSS also works)
3. Import and render <AnimatedCard /> or <LazyImage src="..." alt="..." /> in your app

Notes & tips
- Adjust threshold and rootMargin to tweak when elements become "visible".
- Debounce or unobserve if you only need a single 'enter' event (memory optimization).
- For server-side rendering (Next.js) guard window checks — this hook uses window.* so it runs client-side.
*/
