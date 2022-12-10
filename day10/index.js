const { convertInputToArrayOfStrings } = require('../utils');

const instructions = convertInputToArrayOfStrings('./input.txt');

/* Part One */

// There is probably a more efficient way than to just push the instructions onto an array
const stack = [];

for (const instruction of instructions) {
  const [command, value] = instruction.split(' ');
  if (command === 'noop') {
    stack.push(0);
  }
  if (command === 'addx') {
    stack.push(0);
    stack.push(+value);
  }
}

let totalSignalStrength = 0;

const findSignalStrength = cycle => {
  let x = 1;

  for (let i = 0; i < stack.length; i++) {
    if (i + 1 === cycle) {
      const signalStrength = x * cycle;
      totalSignalStrength += signalStrength;
      return signalStrength;
    }
    x += stack[i];
  }
};

// findSignalStrength(20);
// findSignalStrength(60);
// findSignalStrength(100);
// findSignalStrength(140);
// findSignalStrength(180);
// findSignalStrength(220);

// Answer:
// console.log(totalSignalStrength);

/* Part Two */

let screen = '';

const drawOnScreen = () => {
  let x = 1;
  let j;

  for (let i = 0; i < stack.length; i++) {
    j = i;
    // TODO: Clean up this "pro" code
    if (i >= 40) {
      j = i - 40;
    }
    if (i >= 80) {
      j = i - 80;
    }
    if (i >= 120) {
      j = i - 120;
    }
    if (i >= 160) {
      j = i - 160;
    }
    if (i >= 200) {
      j = i - 200;
    }
    if (j === x || j === x - 1 || j === x + 1) {
      screen += '#';
    } else {
      screen += '.';
    }
    x += stack[i];
  }
};

drawOnScreen();

// Answer:
console.log(screen.slice(0, 40));
console.log(screen.slice(40, 80));
console.log(screen.slice(80, 120));
console.log(screen.slice(120, 160));
console.log(screen.slice(160, 200));
console.log(screen.slice(200, 240));
