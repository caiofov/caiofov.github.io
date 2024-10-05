import { motion } from "framer-motion";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export const OpacityReveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  stiffness?: number;
}> = ({ children, delay = 0, stiffness = 20 }) => {
  return (
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
  );
};

export const OpacityRevealSequence: React.FC<{
  children: React.ReactNode[];
  delayIncrease?: number | ((len: number) => number);
  delayInit?: number;
}> = ({ children, delayIncrease = 0.5, delayInit = 0 }) => {
  let delay = delayInit;

  let delayIcc =
    typeof delayIncrease == "number"
      ? delayIncrease
      : delayIncrease(children.length);

  return (
    <>
      {children.map((child) => {
        delay += delayIcc;
        return (
          <OpacityReveal key={uuidv4()} delay={delay}>
            {child}
          </OpacityReveal>
        );
      })}
    </>
  );
};
