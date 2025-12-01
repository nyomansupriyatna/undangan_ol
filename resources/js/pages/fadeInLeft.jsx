import { AnimatePresence, motion } from "framer-motion";

export default function FadeInLeft({ children, duration = 1, delay = 0, y = 0, x = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x, scale: 0 }}
      whileInView={{ opacity: 3, x: 0, scale: 1, rotate: '360deg' }}
      transition={{ duration, delay, ease: "easeOut" }}
      viewport={{ once: false }}
    >
      {children}
    </motion.div>

  );
}
