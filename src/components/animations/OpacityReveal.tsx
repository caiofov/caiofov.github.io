import { motion } from "framer-motion";
import React from "react";

export const OpacityReveal: React.FC<{
  children: JSX.Element;
  delay?: number;
  stiffness?: number;
}> = ({ children, delay = 0, stiffness = 20 }) => {
  return (
    <div>
      <motion.div
        animate={{ opacity: [0, 1] }}
        transition={{
          times: [0, 1],
          type: "spring",
          stiffness: stiffness,
          ease: "easeInOut",
          delay: delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const OpacityRevealSequence: React.FC<{
  children: JSX.Element[];
  delayIncrease?: number;
  delayInit?: number;
}> = ({ children, delayIncrease = 0.5, delayInit = 0 }) => {
  let delay = delayInit;
  return (
    <>
      {children.map((child, idx) => {
        delay += delayIncrease;
        return <OpacityReveal delay={delay}>{child}</OpacityReveal>;
      })}
    </>
  );
};
