import { motion, useAnimation, useInView } from "framer-motion";
import React, { PropsWithChildren, useEffect, useRef } from "react";
import { createPolymorphicComponent, Group, GroupProps } from "@mantine/core";
import { MotionProps } from "framer-motion";

const MotionGroup = createPolymorphicComponent<MotionProps, GroupProps>(Group);
type MotionGroupProps = React.ComponentProps<typeof MotionGroup>;

export type BaseRevealProps = {
  duration?: number;
  delay?: number;
  stiffness?: number;
  parentProps?: MotionGroupProps;
};

export type BaseRevealSequenceProps = {
  staggerChildren?: number;
  childProps?: MotionGroupProps;
} & BaseRevealProps;

type BaseRevealComponentProps = {
  property: string;
} & BaseRevealProps;

type BaseRevealSequenceComponentProps = {
  property: string;
} & BaseRevealSequenceProps;

const BaseVariants = (property: string) => ({
  hidden: { [property]: 0 },
  visible: { [property]: 1 },
});

const transitionBase = (
  delay?: number,
  stiffness?: number,
  duration?: number
) => ({
  type: "spring",
  stiffness,
  ease: "easeInOut",
  delay,
  duration,
});

export const BaseRevealOnVisible: React.FC<
  PropsWithChildren<BaseRevealComponentProps>
> = ({ children, delay, stiffness, duration, parentProps, property }) => {
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
      variants={BaseVariants(property)}
      initial="hidden"
      animate={mainControls}
      transition={{ ...transitionBase(delay, stiffness, duration) }}
      {...parentProps}
    >
      {children}
    </MotionGroup>
  );
};

export const BaseReveal: React.FC<
  PropsWithChildren<BaseRevealComponentProps>
> = ({ children, delay, stiffness, duration, parentProps, property }) => {
  return (
    <MotionGroup
      component={motion.div}
      variants={BaseVariants(property)}
      initial="hidden"
      animate="visible"
      transition={{ ...transitionBase(delay, stiffness, duration) }}
      {...parentProps}
    >
      {children}
    </MotionGroup>
  );
};

export const BaseRevealSequence: React.FC<
  PropsWithChildren<BaseRevealSequenceComponentProps>
> = ({
  children,
  staggerChildren,
  delay,
  stiffness,
  duration,
  parentProps,
  childProps,
  property,
}) => {
  return (
    <MotionGroup
      component={motion.div}
      variants={BaseVariants(property)}
      transition={{
        ...transitionBase(delay, stiffness, duration),
        staggerChildren,
      }}
      initial="hidden"
      animate="visible"
      {...parentProps}
    >
      {React.Children.map(children, (child) => (
        <MotionGroup
          component={motion.div}
          variants={BaseVariants(property)}
          {...childProps}
        >
          {child}
        </MotionGroup>
      ))}
    </MotionGroup>
  );
};
