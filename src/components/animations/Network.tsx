import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  generatePoints,
  pickLinePairs,
  randomIntFromInterval,
} from "../../utils/graph";
import { useMatches } from "@mantine/core";

function safePoints(maxX: number, maxY: number) {
  return [
    [0.2, 0.2],
    [0.2, 0.5],
    [0.3, 0.6],
    [0.4, 0.3],
    [0.5, 0.2],
    [0.5, 0.5],
    [0.5, 0.8],
    [0.6, 0.3],
    [0.6, 0.9],
    [0.7, 0.5],
    [0.8, 0.8],
    [0.8, 0.2],
    [0.9, 0.3],
    [0.9, 0.6],
  ].map(([x, y]) => {
    const xReal = Math.round(x * maxX);
    const yReal = Math.round(y * maxY);
    return [xReal, yReal];
  });
}

const Network: React.FC<{ color: string; width: number; height: number }> = ({
  color,
  width,
  height,
}) => {
  const [radius, strokeWidth] = useMatches({
    lg: [10, 4],
    md: [9, 3],
    base: [8, 2],
  });
  const circleProps = { fill: color, r: radius };
  const lineProps = { stroke: color, strokeWidth };
  const c = radius * 4;
  const [cellSizeX, setCellSizeX] = useState(Math.floor(width / c));
  const [cellSizeY, setCellSizeY] = useState(Math.floor(height / c));
  const [cellNumX, setCellNumX] = useState(Math.floor(width / cellSizeX));
  const [cellNumY, setCellNumY] = useState(Math.floor(height / cellSizeY));

  const [points, setPoints] = useState<number[][]>([]);
  const [lines, setLines] = useState<number[][][]>([]);
  useEffect(() => {
    setCellSizeX(Math.floor(width / 15));
  }, [width]);
  useEffect(() => {
    setCellSizeY(Math.floor(height / 15));
  }, [height]);
  useEffect(() => {
    setCellNumX(Math.floor(width / cellSizeX));
  }, [cellSizeX]);
  useEffect(() => {
    setCellNumY(Math.floor(height / cellSizeY));
  }, [cellSizeY]);
  useEffect(() => {
    const gen = generatePoints(cellNumX, cellNumY, 0.4, 0.4, 0.4);
    setPoints(gen.length > 6 ? gen : safePoints(cellNumX, cellNumY));
  }, [cellNumX, cellNumY]);
  useEffect(() => {
    setLines(pickLinePairs(points));
  }, [points]);

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
            cx={x * cellSizeX}
            cy={y * cellSizeY}
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: randomIntFromInterval(0, 5),
              repeat: Infinity,
              delay: randomIntFromInterval(0, 5),
              type: "spring",
            }}
            {...circleProps}
          />
        );
      })}
      {lines.map(([p1, p2], idx) => {
        const x1 = p1[0] * cellSizeX;
        const y1 = p1[1] * cellSizeY;
        const x2 = p2[0] * cellSizeX;
        const y2 = p2[1] * cellSizeY;

        const dir = [x2 - x1, y2 - y1];
        const dist = Math.sqrt(dir[0] * dir[0] + dir[1] * dir[1]);

        const ux = dir[0] / dist;
        const uy = dir[1] / dist;
        return (
          <motion.line
            key={`${p1}-${p2}`}
            x1={x1 + radius * ux}
            y1={y1 + radius * uy}
            x2={x2 - radius * ux}
            y2={y2 - radius * uy}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: randomIntFromInterval(3, 7),
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
