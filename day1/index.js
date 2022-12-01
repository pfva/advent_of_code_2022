const { convertInputToArrayOfStrings } = require('../utils/index');

/* Part One */

const calories = convertInputToArrayOfStrings('./input.txt');

const calculateCalorieSums = calorieList => {
  const calorieSums = [];
  const initialValue = 0;

  calorieList.reduce((total, current) => {
    if (current === '') {
      calorieSums.push(total);
      return initialValue;
    }
    return total + parseInt(current);
  }, initialValue);

  return calorieSums;
};

const getMaxCaloriesCarried = calories => {
  const calorieSums = calculateCalorieSums(calories);
  return Math.max(...calorieSums);
};

// Answer:
console.log(getMaxCaloriesCarried(calories));

/* Part Two */

const getTopThreeMaxCalories = calories => {
  const calorieSums = calculateCalorieSums(calories);
  const sortedCalorieSums = sortCalorieSums(calorieSums);
  const topThreeSums = sortedCalorieSums.slice(0, 3);

  return topThreeSums.reduce((total, current) => total + current, 0);
};

const sortCalorieSums = calorieSums => {
  return calorieSums.sort((a, b) => a - b).reverse();
};

// Answer:
console.log(getTopThreeMaxCalories(calories));
