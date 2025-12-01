import { AnimatePresence, motion } from "framer-motion";

export default function FadeIn({ children, duration = 0.8, delay = 0, y = 20, x = 0, rotate = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0, rotate }}
      transition={{ duration, delay, ease: "easeIn" }}
      viewport={{ once: false }}
    >
      {children}
    </motion.div>

  );
}
