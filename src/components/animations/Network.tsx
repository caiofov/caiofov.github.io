import { motion } from "framer-motion";
import * as React from "react";
function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomItemFromList<T>(list: T[]) {
  return list[Math.floor(Math.random() * list.length)];
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
  const points: number[][][] = [];
  let lastX = 0;
  let lastY = 0;
  for (let y = 0; y < numY; y++) {
    points.push([[]]);
    let py = 0.6 / (y - lastY);
    for (let x = 1; x < numX; x++) {
      let px = 0.6 / (x - lastX);
      if (Math.random() > 0.3 + py + px) {
        points[y].push([x * c, y * c]);
        lastX = x;
        lastY = y;
      }
    }
  }

  return points;
};
const getNeighbors = (list: number[][][], idxY: number, idxX: number) => {
  return [
    idxY - 1 >= 0 && idxX - 1 >= 0 ? list[idxY - 1][idxX - 1] : undefined,
    idxY - 1 >= 0 ? list[idxY - 1][idxX] : undefined,
    idxY - 1 >= 0 && idxX + 1 < list[idxY - 1].length
      ? list[idxY - 1][idxX + 1]
      : undefined,
    idxX - 1 >= 0 ? list[idxY][idxX - 1] : undefined,
    idxX + 1 < list[idxY].length ? list[idxY][idxX + 1] : undefined,
    idxY + 1 < list.length && idxX - 1 >= 0
      ? list[idxY + 1][idxX - 1]
      : undefined,
    idxY + 1 < list.length ? list[idxY + 1][idxX] : undefined,
    idxY + 1 < list.length && idxX + 1 < list[idxY + 1].length
      ? list[idxY + 1][idxX + 1]
      : undefined,
  ].filter((i) => i !== undefined && i.length > 0);
};

const generateLines = (points: number[][][]) => {
  const lines: number[][][] = [];

  for (let idxY = 1; idxY < points.length; idxY++) {
    const elements = points[idxY];
    for (let idxX = 1; idxX < elements.length; idxX++) {
      if (Math.random() > 0.7) {
        const items = getNeighbors(points, idxY, idxX);

        if (items.length) {
          const item: number[] = randomItemFromList(items) as number[];
          lines.push([points[idxY][idxX], item]);
        }
      }
    }
  }
  return lines;
};

const Network: React.FC<{ color: string }> = ({ color }) => {
  const radius = 15;
  const circleProps = { fill: color, r: radius };
  const lineProps = { stroke: color, strokeWidth: 5 };

  const width = Math.floor(window.innerWidth * 0.65);
  const height = Math.floor(window.innerHeight * 1.2);

  const points = generatePoints(width, height, radius, radius * 2);
  const lines = generateLines(points);
  return (
    <motion.svg style={{ filter: "blur(2px)" }} width={width} height={height}>
      {points
        .slice(1)
        .flat()
        .filter((v) => v.length > 0)
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
