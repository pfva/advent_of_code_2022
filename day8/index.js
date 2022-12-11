const fs = require('fs');

const trees = fs.readFileSync('./input.txt', 'utf8').trimEnd();

/* Part One */

const directions = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
];

const getVisibleTrees = trees => {
  const treeMap = trees.split('\n').map(line => line.split('').map(Number));
  const visibles = treeMap.map(row => row.map(() => 0));
  for (let i = 0; i < treeMap.length; i++) {
    for (let j = 0; j < treeMap[i].length; j++) {
      outer: for (const [di, dj] of directions) {
        let [i2, j2] = [i + di, j + dj];
        for (; treeMap[i2]?.[j2] !== undefined; i2 += di, j2 += dj) {
          if (treeMap[i2][j2] >= treeMap[i][j]) {
            continue outer;
          }
        }
        visibles[i][j] = 1;
        break;
      }
    }
  }
  console.log(visibles.flat().reduce((acc, n) => acc + n));
};

// Answer:
// getVisibleTrees(trees);

/* Part Two */

const getHighestScenicScore = trees => {
  const treeMap = trees.split('\n').map(line => line.split('').map(Number));
  const scores = treeMap.map(row => row.map(() => 1));
  for (let i = 0; i < treeMap.length; i++) {
    for (let j = 0; j < treeMap[i].length; j++) {
      for (const [di, dj] of directions) {
        let [i2, j2] = [i + di, j + dj];
        for (; treeMap[i2]?.[j2] !== undefined; i2 += di, j2 += dj) {
          if (treeMap[i2][j2] >= treeMap[i][j]) {
            i2 += di;
            j2 += dj;
            break;
          }
        }
        scores[i][j] *= Math.abs(i2 - di - i) + Math.abs(j2 - dj - j);
      }
    }
  }
  console.log(Math.max(...scores.flat()));
};

// Answer:
// getHighestScenicScore(trees);
