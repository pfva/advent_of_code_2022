const { convertInputToArrayOfStrings } = require('../utils/index');

const rucksacks = convertInputToArrayOfStrings('./input.txt');

/* Part One */

// The UTF-16 charcode for lowercase 'a' is 97, and the priority score for it in our system is 1
const CHARCODE_DIFFERENCE_FOR_LOWERCASE = 96;
// The UTF-16 charcode for uppercase 'A' is 65, and the priority score for it in our system is 27
const CHARCODE_DIFFERENCE_FOR_UPPERCASE = 38;

const splitIntoCompartments = rucksack => {
  const firstCompartment = rucksack.slice(0, rucksack.length / 2);
  const secondCompartment = rucksack.slice(rucksack.length / 2);
  return { firstCompartment, secondCompartment };
};

const findDuplicateItem = (firstCompartment, secondCompartment) => {
  for (let item of firstCompartment) {
    if (secondCompartment.includes(item)) return item;
  }
};

const getPriorityScore = item => {
  if (item === item.toLowerCase()) {
    return item.charCodeAt(0) - CHARCODE_DIFFERENCE_FOR_LOWERCASE;
  } else {
    return item.charCodeAt(0) - CHARCODE_DIFFERENCE_FOR_UPPERCASE;
  }
};

const summedPriorityScore = rucksacks.reduce((totalScore, rucksack) => {
  const { firstCompartment, secondCompartment } = splitIntoCompartments(rucksack);
  const duplicateItem = findDuplicateItem(firstCompartment, secondCompartment);
  const priorityScore = getPriorityScore(duplicateItem);
  return (totalScore += priorityScore);
}, 0);

// Answer:
// console.log(summedPriorityScore);

/* Part Two */

const createGroupsOfThree = rucksacks => {
  const badgeGroups = [];
  const currentGroup = [];
  for (let rucksack of rucksacks) {
    currentGroup.push(rucksack);
    if (currentGroup.length === 3) {
      badgeGroups.push([...currentGroup]);
      currentGroup.length = 0;
    }
  }
  return badgeGroups;
};

// This can probably be optimized much more
// I think that ".includes()" stops when it finds a hit and does not search the rest of the string, but not sure
const findBadgeItem = badgeGroup => {
  const [firstRucksack, secondRucksack, thirdRucksack] = badgeGroup;
  for (let item of firstRucksack) {
    if (secondRucksack.includes(item)) {
      if (thirdRucksack.includes(item)) {
        return item;
      }
    }
  }
};

const badgeGroups = createGroupsOfThree(rucksacks);

const summedBadgeGroupPriorityScore = badgeGroups.reduce((totalScore, badgeGroup) => {
  const badgeItem = findBadgeItem(badgeGroup);
  const priorityScore = getPriorityScore(badgeItem);
  return (totalScore += priorityScore);
}, 0);

// Answer:
console.log(summedBadgeGroupPriorityScore);
