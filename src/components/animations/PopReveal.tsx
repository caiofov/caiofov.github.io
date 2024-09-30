import { motion } from "framer-motion";
import React from "react";

export const PopReveal: React.FC<{
  children: JSX.Element;
  delay?: number;
  stiffness?: number;
}> = ({ children, delay = 0, stiffness = 100 }) => {
  return (
    <div>
      <motion.div
        animate={{ scale: [0, 1] }}
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

export const PopRevealSequence: React.FC<{
  children: JSX.Element[];
  delayIncrease?: number;
  delayInit?: number;
}> = ({ children, delayIncrease = 0, delayInit = 0 }) => {
  let delay = 0;
  return (
    <>
      {children.map((child, idx) => {
        delay += delayIncrease;
        return <PopReveal delay={delay}>{child}</PopReveal>;
      })}
    </>
  );
};
