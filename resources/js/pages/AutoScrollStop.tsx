import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function App() {
  const sectionRefs = [useRef(null), useRef(null), useRef(null)];
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    if (!autoScroll) return;
    let index = 0;
    const interval = setInterval(() => {
      sectionRefs[index].current?.scrollIntoView({ behavior: "smooth" });
      index = (index + 1) % sectionRefs.length;
    }, 3000);
    return () => clearInterval(interval);
  }, [autoScroll]);

  return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen overflow-y-scroll snap-y snap-mandatory relative">
      <button
        onClick={() => setAutoScroll(!autoScroll)}
        className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-xl shadow-lg z-50"
      >
        {autoScroll ? "Stop Auto Scroll" : "Start Auto Scroll"}
      </button>
      {sectionRefs.map((ref, i) => (
        <AnimatedSection key={i} title={`Section ${i + 1}`} ref={ref} />
      ))}
    </div>
  );
}

// Animated section using framer-motion + useInView
const AnimatedSection = ({ title }, ref) => {
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      className="h-screen flex items-center justify-center snap-center bg-gray-900 text-white text-4xl font-bold"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      {title}
    </motion.section>
  );
};
