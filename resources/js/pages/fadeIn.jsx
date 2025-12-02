import { animate, AnimatePresence, motion } from "framer-motion";

export default function FadeIn({ children, duration = 0.8, delay = 0, y = 20, x = 0, rotate = 0, once = false, opacity = 1, yy = 0, xx = 0, times = 0 }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y, x, scale: 0 }}
        whileInView={{ opacity, y: yy, x: xx, rotate, scale: 1 }}
        transition={{ duration, delay, ease: "easeInOut", times }}
        viewport={{ once }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div >
    </AnimatePresence>

  );
}
