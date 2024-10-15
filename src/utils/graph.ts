export const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const distBetweenPoints = (p1: number[], p2: number[]) => {
  const [dirX, dirY] = [p2[0] - p1[0], p2[1] - p1[1]];
  return Math.sqrt(dirX * dirX + dirY * dirY);
};

export const generatePointsGrid = (
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
    points.push([]);
    let py = 0.5 / (y - lastY);
    for (let x = 0; x < numX; x++) {
      let px = 0.5 / (x - lastX);
      if (Math.random() > 0.45 + py + px) {
        points[y].push([(x + 1) * c, (y + 1) * c]);
        lastX = x;
        lastY = y;
      }
    }
  }

  return points;
};
export const generatePoints = (maxX: number, maxY: number) => {
  const points: number[][] = [];

  let lastX = 0;
  let lastY = 0;

  for (let y = 0; y < maxY; y++) {
    let py = 0.5 / (y - lastY);
    for (let x = 1; x < maxX; x++) {
      let px = 0.5 / (x - lastX);
      if (Math.random() > 0.5 + py + px) {
        points.push([x, y]);
        lastX = x;
        lastY = y;
      }
    }
    lastX = 0;
  }

  return points;
};
export const generateLinesByNeighbors = (points: number[][][]) => {
  const lines: number[][][] = [];

  for (let idxY = 0; idxY < points.length; idxY++) {
    for (let idxX = 0; idxX < points[idxY].length; idxX++) {
      [
        idxX + 1 < points[idxY].length ? points[idxY][idxX + 1] : undefined,
        idxY + 1 < points.length && idxX - 1 >= 0
          ? points[idxY + 1][idxX - 1]
          : undefined,
        idxY + 1 < points.length ? points[idxY + 1][idxX] : undefined,
        idxY + 1 < points.length && idxX + 1 < points[idxY + 1].length
          ? points[idxY + 1][idxX + 1]
          : undefined,
      ]
        .filter((i) => i !== undefined && i.length > 0)
        .map((neighbor) =>
          lines.push([points[idxY][idxX], neighbor as number[]])
        );
    }
  }

  return lines;
};

export const generateLinesByDistance = (points: number[][]) => {
  let flatted = points.filter((v) => v.length > 0).sort(distBetweenPoints);

  const lines = [];
  for (let idx = 0; idx < flatted.length; idx++) {
    if (idx == flatted.length - 1) break;
    lines.push(flatted.slice(idx, idx + 2));
  }

  return lines;
};

export const pickLinePairs = (points: number[][]) => {
  const lines: number[][][] = [];
  const keys: string[] = [];

  const includes = (p1: number[], p2: number[]) =>
    keys.includes(`${p1}-${p2}`) || keys.includes(`${p2}-${p1}`);

  const add = (p1: number[], p2: number[]) => {
    lines.push([p1, p2]);
    keys.push(`${p1}-${p2}`);
  };

  const sortedPoints = points.slice();
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    sortedPoints.sort(
      (a, b) => distBetweenPoints(a, point) - distBetweenPoints(b, point)
    );

    if (!includes(point, sortedPoints[1])) add(point, sortedPoints[1]);
    else if (!includes(point, sortedPoints[2])) add(point, sortedPoints[2]);
  }

  return lines;
};

export const generateLinesByPairs = (
  points: number[][],
  maxX: number,
  maxY: number
) => {
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
