import { motion, useAnimation, useInView } from "framer-motion";
import React, { PropsWithChildren, useEffect, useRef } from "react";
import { MotionGroup, MotionGroupProps } from "../MotionGroup";

export const PopRevealOnVisible: React.FC<{
  children: React.ReactNode;
  delay?: number;
  stiffness?: number;
}> = ({ children, delay = 0, stiffness = 20 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const mainControls = useAnimation();

  useEffect(() => {
    mainControls.start(isInView ? "visible" : "hidden");
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: {
          scale: 0,
        },
        visible: {
          scale: 1,
        },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{
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

export const PopReveal: React.FC<
  PropsWithChildren<{
    delay?: number;
    stiffness?: number;
  }>
> = ({ children, delay = 0, stiffness = 100 }) => {
  return (
    <motion.div
      animate={{ scale: [0, 1] }}
      transition={{
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

export const PopRevealSequence: React.FC<
  PropsWithChildren<{
    staggerChildren?: number;
    delay?: number;
    stiffness?: number;
    parentProps?: MotionGroupProps;
    childProps?: MotionGroupProps;
  }>
> = ({
  children,
  staggerChildren = 0.5,
  delay = 0,
  stiffness = 100,
  parentProps,
  childProps,
}) => {
  return (
    <MotionGroup
      component={motion.div}
      variants={{
        hidden: { scale: 0 },
        show: {
          scale: 1,
          transition: {
            type: "spring",
            stiffness,
            ease: "easeInOut",
            delay,
            staggerChildren,
          },
        },
      }}
      initial="hidden"
      animate="show"
      {...parentProps}
    >
      {React.Children.map(children, (child) => (
        <MotionGroup
          component={motion.div}
          variants={{
            hidden: { scale: 0 },
            show: { scale: 1 },
          }}
          {...childProps}
        >
          {child}
        </MotionGroup>
      ))}
    </MotionGroup>
  );
};
