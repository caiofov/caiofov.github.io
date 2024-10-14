import { motion, useAnimation, useInView } from "framer-motion";
import React, { PropsWithChildren, useEffect, useRef } from "react";
import { MotionGroup, MotionGroupProps } from "../MotionGroup";

type PopRevealProps = {
  delay?: number;
  stiffness?: number;
  parentProps?: MotionGroupProps;
};
type PopRevealSequenceProps = {
  staggerChildren?: number;
  childProps?: MotionGroupProps;
} & PopRevealProps;

const popVariants = {
  hidden: { scale: 0 },
  visible: { scale: 1 },
};

const transitionBase = (delay: number, stiffness: number) => ({
  type: "spring",
  stiffness: stiffness,
  ease: "easeInOut",
  delay: delay,
});

export const PopRevealOnVisible: React.FC<
  PropsWithChildren<PopRevealProps>
> = ({ children, delay = 0, stiffness = 20, parentProps }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const mainControls = useAnimation();

  useEffect(() => {
    mainControls.start(isInView ? "visible" : "hidden");
  }, [isInView]);

  return (
    <MotionGroup
      component={motion.div}
      ref={ref}
      variants={popVariants}
      initial="hidden"
      animate={mainControls}
      transition={{ ...transitionBase(delay, stiffness) }}
      {...parentProps}
    >
      {children}
    </MotionGroup>
  );
};

export const PopReveal: React.FC<PropsWithChildren<PopRevealProps>> = ({
  children,
  delay = 0,
  stiffness = 100,
  parentProps,
}) => {
  return (
    <MotionGroup
      component={motion.div}
      variants={popVariants}
      initial="hidden"
      animate="visible"
      transition={{ ...transitionBase(delay, stiffness) }}
      {...parentProps}
    >
      {children}
    </MotionGroup>
  );
};

export const PopRevealSequence: React.FC<
  PropsWithChildren<PopRevealSequenceProps>
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
      variants={popVariants}
      transition={{
        ...transitionBase(delay, stiffness),
        staggerChildren,
      }}
      initial="hidden"
      animate="visible"
      {...parentProps}
    >
      {React.Children.map(children, (child) => (
        <MotionGroup
          component={motion.div}
          variants={popVariants}
          {...childProps}
        >
          {child}
        </MotionGroup>
      ))}
    </MotionGroup>
  );
};
