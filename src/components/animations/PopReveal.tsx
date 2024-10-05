import { motion } from "framer-motion";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export const PopReveal: React.FC<{
  children: JSX.Element;
  delay?: number;
  stiffness?: number;
}> = ({ children, delay = 0, stiffness = 100 }) => {
  return (
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
  );
};

export const PopRevealSequence: React.FC<{
  children: JSX.Element[];
  delayIncrease?: number;
  delayInit?: number;
}> = ({ children, delayIncrease = 0.5, delayInit = 0 }) => {
  let delay = delayInit;
  return (
    <>
      {children.map((child, idx) => {
        delay += delayIncrease;
        return (
          <PopReveal key={uuidv4()} delay={delay}>
            {child}
          </PopReveal>
        );
      })}
    </>
  );
};
