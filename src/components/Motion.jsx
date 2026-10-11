import React, { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

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

// Counts the number inside a value like "30%" or "3+" up from zero the first
// time it scrolls into view. Values without a number render as-is.
export const CountUp = ({ value, duration = 1.4, className }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const match = /^(\D*)(\d+(?:\.\d+)?)(.*)$/.exec(value || "");
  const target = match ? Number(match[2]) : 0;
  const decimals = match?.[2].split(".")[1]?.length || 0;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!match || !inView) return;
    if (reduceMotion) return setCurrent(target);
    const controls = animate(0, target, { duration, ease: "easeOut", onUpdate: setCurrent });
    return () => controls.stop();
  }, [inView, target, duration, reduceMotion]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!match) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={className} aria-label={value}>
      {match[1]}
      {current.toFixed(decimals)}
      {match[3]}
    </span>
  );
};
