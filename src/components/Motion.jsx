import React from "react";
import { motion } from "framer-motion";

// Small, shared animation building blocks. All motion is disabled for
// visitors who prefer reduced motion (see <MotionConfig> in App.jsx).

const ease = [0.22, 1, 0.36, 1];
const viewport = { once: true, amount: 0.15 };

// Fades and rises into place the first time it scrolls into view.
export const Reveal = ({ as = "div", children, delay = 0, y = 28, x = 0, className, ...rest }) => {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={viewport}
      transition={{ duration: 0.7, ease, delay }}
      {...rest}
    >
      {children}
    </Component>
  );
};

const groupVariants = {
  hidden: {},
  show: (stagger = 0.08) => ({ transition: { staggerChildren: stagger } }),
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease } },
};

// Parent that reveals its <StaggerItem> children one after another.
export const StaggerGroup = ({ as = "div", children, stagger = 0.08, className, ...rest }) => {
  const Component = motion[as];
  return (
    <Component
      className={className}
      variants={groupVariants}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      {...rest}
    >
      {children}
    </Component>
  );
};

export const StaggerItem = ({ as = "div", children, className, ...rest }) => {
  const Component = motion[as];
  return (
    <Component className={className} variants={itemVariants} {...rest}>
      {children}
    </Component>
  );
};

// Gentle, endless up-and-down drift for illustrations.
export const Float = ({ children, distance = 12, duration = 6, className }) => (
  <motion.div
    className={className}
    animate={{ y: [0, -distance, 0] }}
    transition={{ duration, ease: "easeInOut", repeat: Infinity }}
  >
    {children}
  </motion.div>
);
