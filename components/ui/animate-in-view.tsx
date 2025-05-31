"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimateInViewProps {
  children: ReactNode;
  className?: string;
}

export function AnimateInView({
  children,
  className = "",
}: AnimateInViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimateStagger({
  children,
  className = "",
  delay = 0.1,
}: AnimateInViewProps & { delay?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            staggerChildren: delay,
          },
        },
        hidden: {
          opacity: 0,
          y: 20,
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimateStaggerItem({
  children,
  className = "",
}: AnimateInViewProps) {
  return (
    <motion.div
      variants={{
        visible: {
          opacity: 1,
          y: 0,
        },
        hidden: {
          opacity: 0,
          y: 20,
        },
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
