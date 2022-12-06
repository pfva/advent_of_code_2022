const fs = require('fs');

const getInput = filePath => fs.readFileSync(filePath, 'utf8').trimEnd();

const datastream = getInput('./input.txt');

/* Part One */

console.log(datastream);

const lastFourCharacters = [];
let pointer = 1;

const findStartOfPacketMarker = datastream => {
  // Remove the first character in the array before adding the next
  // to keep the length at 4
  if (lastFourCharacters.length === 14) {
    lastFourCharacters.shift();
  }

  // Add the most recent character to the array
  lastFourCharacters.push(datastream[0]);

  // Create a set

  const characterSet = new Set(lastFourCharacters);
  // Find if there are any duplicates in the set
  if (characterSet.size === 14) {
    return pointer;
  }

  // Increment pointer
  pointer++;

  // Call function recursively with ever-decreasing datastream
  return findStartOfPacketMarker(datastream.slice(1));
};

// Answer:
console.log(findStartOfPacketMarker(datastream));

/* Part Two */
// Modified the above function to save 14 instead of 4 characters
// TODO: Clean up and make it take a size parameter when I get back home after work
