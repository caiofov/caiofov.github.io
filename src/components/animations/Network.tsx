import { motion } from "framer-motion";
import * as React from "react";
import {
  generateLinesByPairs,
  generatePoints,
  randomIntFromInterval,
} from "../../utils/graph";
import { useMatches } from "@mantine/core";

const Network: React.FC<{ color: string }> = ({ color }) => {
  const [radius, strokeWidth] = useMatches({
    lg: [15, 5],
    md: [12, 3],
    base: [8, 2],
  });
  const circleProps = { fill: color, r: radius };
  const lineProps = { stroke: color, strokeWidth };

  const width = Math.floor(window.innerWidth * 0.85);
  const height = Math.floor(window.innerHeight * 0.9);

  const points = generatePoints(width, height, radius, radius * 2);
  const lines = generateLinesByPairs(points, width, height);
  return (
    <motion.svg
      style={{ filter: "blur(5px)" }}
      opacity="70%"
      width={width}
      height={height}
    >
      {points.map(([x, y]) => {
        return (
          <motion.circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: randomIntFromInterval(0, 5),
              type: "spring",
            }}
            {...circleProps}
          />
        );
      })}
      {lines.map(([[x1, y1], [x2, y2]], idx) => {
        const dir = [x2 - x1, y2 - y1];
        const dist = Math.sqrt(dir[0] * dir[0] + dir[1] * dir[1]);

        const ux = dir[0] / dist;
        const uy = dir[1] / dist;
        return (
          <motion.line
            key={`${x1}-${y1}-${x2}-${y2}`}
            x1={x1 + radius * ux}
            y1={y1 + radius * uy}
            x2={x2 - radius * ux}
            y2={y2 - radius * uy}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: randomIntFromInterval(0, 5) + idx / 10,
            }}
            {...lineProps}
          />
        );
      })}
    </motion.svg>
  );
};
export default Network;
