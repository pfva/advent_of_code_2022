const fs = require('fs');

const convertInputToArrayOfNumbers = filePath => {
  return fs.readFileSync(filePath, 'utf8').trimEnd().split('\n').map(Number);
};

const convertInputToArrayOfStrings = filePath => {
  return fs.readFileSync(filePath, 'utf8').trimEnd().toString().split('\n');
};

const convertInputToArrayOfArrays = filePath => {
  return fs
    .readFileSync(filePath, 'utf8')
    .trimEnd()
    .toString()
    .split('\n')
    .map(item => item.split(' '));
};

module.exports = {
  convertInputToArrayOfNumbers,
  convertInputToArrayOfStrings,
  convertInputToArrayOfArrays,
};
