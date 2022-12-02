const { convertInputToArrayOfArrays } = require('../utils');

const moves = convertInputToArrayOfArrays('./input.txt');

/* Part One */

// Win conditions:
// Rock > Scissors, Scissors > Paper, Paper > Rock

// Could refactor into one big object with three subfields per shape, like so:
// const shapes = {
//   ROCK: {
//     opponentShape: 'A',
//     myShape: 'X',
//     shapeScore: 1,
//   }
// };
// etc.

const opponentShapes = {
  ROCK: 'A',
  PAPER: 'B',
  SCISSORS: 'C',
};

const myShapes = {
  ROCK: 'X',
  PAPER: 'Y',
  SCISSORS: 'Z',
};

const scorePerShape = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
};

const scorePerOutcome = {
  LOSS: 0,
  DRAW: 3,
  WIN: 6,
};

const compareMovesAndCalculateOutcome = (firstMove, secondMove) => {
  const { ROCK, PAPER, SCISSORS } = myShapes;
  const { WIN, LOSS, DRAW } = scorePerOutcome;

  switch (firstMove) {
    case opponentShapes.ROCK:
      if (secondMove === ROCK) return DRAW;
      if (secondMove === PAPER) return WIN;
      if (secondMove === SCISSORS) return LOSS;
    case opponentShapes.PAPER:
      if (secondMove === ROCK) return LOSS;
      if (secondMove === PAPER) return DRAW;
      if (secondMove === SCISSORS) return WIN;
    case opponentShapes.SCISSORS:
      if (secondMove === ROCK) return WIN;
      if (secondMove === PAPER) return LOSS;
      if (secondMove === SCISSORS) return DRAW;
  }
};

const getShapeScore = move => {
  const shape = Object.keys(myShapes).find(shape => myShapes[shape] === move);
  return scorePerShape[shape];
};

const calculateTotalScore = moves => {
  return moves.reduce((totalScore, moveSet) => {
    const [opponentMove, myMove] = moveSet;
    const outcomeScore = compareMovesAndCalculateOutcome(opponentMove, myMove);
    const shapeScore = getShapeScore(myMove);
    const roundScore = outcomeScore + shapeScore;
    return totalScore + roundScore;
  }, 0);
};

// Answer:
// console.log(calculateTotalScore(moves));

/* Part Two */

const neededOutcomes = {
  LOSS: 'X',
  DRAW: 'Y',
  WIN: 'Z',
};

const chooseCorrectResponse = (firstMove, neededOutcome) => {
  const { ROCK, PAPER, SCISSORS } = myShapes;
  const { WIN, LOSS, DRAW } = neededOutcomes;

  switch (firstMove) {
    case opponentShapes.ROCK:
      if (neededOutcome === LOSS) return SCISSORS;
      if (neededOutcome === DRAW) return ROCK;
      if (neededOutcome === WIN) return PAPER;
    case opponentShapes.PAPER:
      if (neededOutcome === LOSS) return ROCK;
      if (neededOutcome === DRAW) return PAPER;
      if (neededOutcome === WIN) return SCISSORS;
    case opponentShapes.SCISSORS:
      if (neededOutcome === LOSS) return PAPER;
      if (neededOutcome === DRAW) return SCISSORS;
      if (neededOutcome === WIN) return ROCK;
  }
};

const calculateMyMoveAndTotalScore = moves => {
  return moves.reduce((totalScore, moveSet) => {
    const [opponentMove, neededOutcome] = moveSet;
    const myMove = chooseCorrectResponse(opponentMove, neededOutcome);
    const outcomeScore = compareMovesAndCalculateOutcome(opponentMove, myMove);
    const shapeScore = getShapeScore(myMove);
    const roundScore = outcomeScore + shapeScore;
    return totalScore + roundScore;
  }, 0);
};

// Answer:
console.log(calculateMyMoveAndTotalScore(moves));
