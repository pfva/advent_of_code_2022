const { convertInputToArrayOfStrings } = require('../utils');

const moves = convertInputToArrayOfStrings('./input.txt');

/* Part One */

// Create Stack data structure
class Stack {
  data = [];

  constructor(...initialData) {
    this.data = Array.from(initialData);
  }

  push(item) {
    this.data.push(...item);
  }

  pop() {
    return this.data.pop();
  }

  popNumberOfItems(amount) {
    return this.data.splice(-amount, amount);
  }

  peek() {
    return this.data[this.data.length - 1];
  }
}

// Manually enter problem data today
const Stack1 = new Stack(['F'], ['H'], ['B'], ['V'], ['R'], ['Q'], ['D'], ['P']);
const Stack2 = new Stack(['L'], ['D'], ['Z'], ['Q'], ['W'], ['V']);
const Stack3 = new Stack(['H'], ['L'], ['Z'], ['Q'], ['G'], ['R'], ['P'], ['C']);
const Stack4 = new Stack(['R'], ['D'], ['H'], ['F'], ['J'], ['V'], ['B']);
const Stack5 = new Stack(['Z'], ['W'], ['L'], ['C']);
const Stack6 = new Stack(['J'], ['R'], ['P'], ['N'], ['T'], ['G'], ['V'], ['M']);
const Stack7 = new Stack(['J'], ['R'], ['L'], ['V'], ['M'], ['B'], ['S']);
const Stack8 = new Stack(['D'], ['P'], ['J']);
const Stack9 = new Stack(['D'], ['C'], ['N'], ['W'], ['V']);

const STACKS = {
  1: Stack1,
  2: Stack2,
  3: Stack3,
  4: Stack4,
  5: Stack5,
  6: Stack6,
  7: Stack7,
  8: Stack8,
  9: Stack9,
};

const moveItem = (source, destination, times) => {
  for (let index = 0; index < times; index++) {
    STACKS[destination].push(STACKS[source].pop());
  }
};

const findTopCrates = moves => {
  for (const move of moves) {
    const [times, source, destination] = move.match(/move (\d+) from (\d+) to (\d+)/).slice(1);
    moveItem(source, destination, times);
  }

  const topCrates = Object.values(STACKS).reduce((acc, current) => {
    return (acc += current.peek());
  }, '');

  return topCrates;
};

// Answer:
// console.log(findTopCrates(moves));

/* Part Two */

const moveItems = (source, destination, amount) => {
  STACKS[destination].push(STACKS[source].popNumberOfItems(amount));
};

const findTopCratesAfterShift = moves => {
  for (const move of moves) {
    const [amount, source, destination] = move.match(/move (\d+) from (\d+) to (\d+)/).slice(1);
    moveItems(source, destination, amount);
  }

  const topCratesAfterShift = Object.values(STACKS).reduce((acc, current) => {
    return (acc += current.peek());
  }, '');

  return topCratesAfterShift;
};

// Need to comment out the first answer before running this one, because it's mutating the test data
// Answer:
console.log(findTopCratesAfterShift(moves));
