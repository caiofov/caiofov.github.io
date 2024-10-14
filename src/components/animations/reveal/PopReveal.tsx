import React, { PropsWithChildren } from "react";
import {
  BaseReveal,
  BaseRevealOnVisible,
  BaseRevealProps,
  BaseRevealSequence,
  BaseRevealSequenceProps,
} from "./BaseReveal";

export const PopRevealOnVisible: React.FC<
  PropsWithChildren<BaseRevealProps>
> = ({ delay = 0, stiffness = 20, ...props }) => {
  return (
    <BaseRevealOnVisible
      delay={delay}
      stiffness={stiffness}
      {...props}
      property="scale"
    />
  );
};

export const PopReveal: React.FC<PropsWithChildren<BaseRevealProps>> = ({
  delay = 0,
  stiffness = 100,
  ...props
}) => {
  return (
    <BaseReveal
      delay={delay}
      stiffness={stiffness}
      {...props}
      property="scale"
    />
  );
};

export const PopRevealSequence: React.FC<
  PropsWithChildren<BaseRevealSequenceProps>
> = ({ staggerChildren = 0.5, delay = 0, stiffness = 100, ...props }) => {
  return (
    <BaseRevealSequence
      delay={delay}
      stiffness={stiffness}
      staggerChildren={staggerChildren}
      {...props}
      property="scale"
    />
  );
};
