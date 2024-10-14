import React, { PropsWithChildren } from "react";
import {
  BaseReveal,
  BaseRevealOnVisible,
  BaseRevealProps,
  BaseRevealSequence,
  BaseRevealSequenceProps,
} from "./BaseReveal";

export const OpacityRevealOnVisible: React.FC<
  PropsWithChildren<BaseRevealProps>
> = ({ duration = 1, delay = 0, stiffness = 20, ...props }) => {
  return (
    <BaseRevealOnVisible
      duration={duration}
      delay={delay}
      stiffness={stiffness}
      {...props}
      property="opacity"
    />
  );
};

export const OpacityReveal: React.FC<PropsWithChildren<BaseRevealProps>> = ({
  delay = 0,
  stiffness = 20,
  ...props
}) => {
  return (
    <BaseReveal
      delay={delay}
      stiffness={stiffness}
      {...props}
      property="opacity"
    />
  );
};

export const OpacityRevealSequence: React.FC<
  PropsWithChildren<BaseRevealSequenceProps>
> = ({ staggerChildren = 0.5, delay = 0, stiffness = 100, ...props }) => {
  return (
    <BaseRevealSequence
      delay={delay}
      stiffness={stiffness}
      staggerChildren={staggerChildren}
      {...props}
      property="opacity"
    />
  );
};
