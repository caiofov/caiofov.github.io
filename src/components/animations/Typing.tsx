import React from "react";
import { ReactTyped } from "react-typed";

export const Typing: React.FC<{
  text: string;
  duration: number;
  delay?: number;
}> = ({ text, duration, delay }) => {
  return (
    <ReactTyped
      strings={[text]}
      typeSpeed={duration}
      startDelay={delay}
      onComplete={(self) => self.cursor.remove()}
    />
  );
};
