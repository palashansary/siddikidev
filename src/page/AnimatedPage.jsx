import React from "react";
import { m } from "framer-motion";

const animations = {
  initial: { opacity: 0, x: -200 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 200 },
};

const AnimatedPage = ({ children }) => {
  return (
    <m.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ ease: "easeInOut", duration: 0.4 }}
    >
      {children}
    </m.div>
  );
};

export default AnimatedPage;
