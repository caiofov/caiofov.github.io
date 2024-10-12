import { motion } from "framer-motion";
import * as React from "react";
function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const generatePoints = (
  maxX: number,
  maxY: number,
  radius: number,
  margin: number
) => {
  const c = radius * 2 + margin;
  const numX = Math.floor(maxX / c);
  const numY = Math.floor(maxY / c);
  const points: number[][] = [];
  let lastX = 0;
  let lastY = 0;
  for (let y = 0; y < numY; y++) {
    let py = 0.5 / (y - lastY);
    for (let x = 1; x < numX; x++) {
      let px = 0.5 / (x - lastX);
      if (Math.random() > 0.5 + py + px) {
        points.push([x * c, y * c]);
        lastX = x;
        lastY = y;
      }
    }
  }

  return points;
};

const generateLines = (points: number[][], maxX: number, maxY: number) => {
  const lines: number[][][] = [];

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[j];
      const [px, py] = [Math.abs(x2 - x1) / maxX, Math.abs(y2 - y1) / maxY];
      let pr = 0;
      if (lines.length) {
        if (lines[lines.length - 1].includes([x1, y1])) pr += 0.1;
        if (lines[lines.length - 1].includes([x2, y2])) pr += 0.1;
      }
      if (Math.random() > 0.4 + px + py + pr) {
        lines.push([
          [x1, y1],
          [x2, y2],
        ]);
      }
    }
  }

  return lines;
};

const Network: React.FC<{ color: string }> = ({ color }) => {
  const radius = 15;
  const circleProps = { fill: color, r: radius };
  const lineProps = { stroke: color, strokeWidth: 5 };

  const width = Math.floor(window.innerWidth * 0.85);
  const height = Math.floor(window.innerHeight * 1.5);

  const points = generatePoints(width, height, radius, radius * 2);
  const lines = generateLines(points, width, height);
  return (
    <motion.svg style={{ filter: "blur(2px)" }} width={width} height={height}>
      {points
        .slice(1)
        // .flat()
        // .filter((v) => v.length > 0)
        .map(([x, y]) => {
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
      {lines.map(([[x1, y1], [x2, y2]]) => {
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
              delay: randomIntFromInterval(0, 5),
            }}
            {...lineProps}
          />
        );
      })}
    </motion.svg>
  );
};
export default Network;
