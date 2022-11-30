const fs = require('fs');

const convertInputToArrayOfNumbers = filePath => {
  return fs
    .readFileSync(filePath, 'utf8')
    .split('\n')
    .map(number => parseInt(number));
};

const convertInputToArrayOfStrings = filePath => {
  return fs.readFileSync(filePath, 'utf8').toString().split('\n');
};

const convertInputToArrayOfArrays = filePath => {
  return fs
    .readFileSync(filePath, 'utf8')
    .toString()
    .split('\n')
    .map(item => item.split(' '));
};

exports.convertInputToArrayOfNumbers = convertInputToArrayOfNumbers;
exports.convertInputToArrayOfStrings = convertInputToArrayOfStrings;
exports.convertInputToArrayOfArrays = convertInputToArrayOfArrays;
