const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8').trimEnd();

/* Part One */

const toDirection = {
  U: [-1, 0],
  R: [0, 1],
  D: [1, 0],
  L: [0, -1],
};

function getNumberOfPositions(input, part) {
  const knots = [...Array(part === 2 ? 10 : 2)].map(() => [0, 0]);
  const visited = { 0: { 0: 1 } };

  for (const line of input.split('\n')) {
    let [char, steps] = line.split(' ');
    const direction = toDirection[char];
    steps = Number(steps);

    for (let i = 0; i < steps; i++) {
      let head = knots[0];
      let tail;
      head[0] += direction[0];
      head[1] += direction[1];

      for (let j = 1; j < knots.length; j++) {
        tail = knots[j];
        const distance = head.map((_, i) => head[i] - tail[i]);
        if (distance.some(x => Math.abs(x) > 1)) {
          const dir2 = distance.map(Math.sign);
          tail[0] += dir2[0];
          tail[1] += dir2[1];
        }
        head = tail;
      }
      visited[tail[0]] = visited[tail[0]] ?? {};
      visited[tail[0]][tail[1]] = 1;
    }
  }
  console.log(
    Object.values(visited)
      .map(row => Object.values(row))
      .flat()
      .reduce((acc, n) => acc + n)
  );
}

// Answers:
getNumberOfPositions(input, 1);
getNumberOfPositions(input, 2);
