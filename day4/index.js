const { convertInputToArrayOfStrings } = require('../utils');

const sectionAssignments = convertInputToArrayOfStrings('./input.txt');

/* Part One */

const createArrayOfSections = (start, end) => {
  const array = [];
  for (let index = +start; index <= end; index++) {
    array.push(index);
  }
  return array;
};

const makeSectionArray = section => {
  const [startOfSection, endOfSection] = section.split('-');
  return createArrayOfSections(startOfSection, endOfSection);
};

const findHasIntersection = (firstArray, secondArray) => {
  const firstSet = new Set(firstArray);
  const secondSet = new Set(secondArray);
  // Checks if the second array contains all of the items of the first, or vice versa
  const intersection = secondArray.every(item => firstSet.has(item)) || firstArray.every(item => secondSet.has(item));
  return intersection;
};

const findNumberOfCompletelyOverlappingAssignments = sectionAssignments => {
  return sectionAssignments.reduce((total, sectionAssignment) => {
    const [firstSectionAssignment, secondSectionAssignment] = sectionAssignment.split(',');
    const firstSectionArray = makeSectionArray(firstSectionAssignment);
    const secondSectionArray = makeSectionArray(secondSectionAssignment);
    const hasIntersection = findHasIntersection(firstSectionArray, secondSectionArray);
    return hasIntersection ? (total += 1) : total;
  }, 0);
};

// Answer:
console.log(findNumberOfCompletelyOverlappingAssignments(sectionAssignments));

/* Part Two */

const findIntersection = (firstArray, secondArray) => {
  const firstSet = new Set(firstArray);
  const intersection = secondArray.filter(item => firstSet.has(item));
  return intersection.length;
};

const findNumberOfOverlappingAssignments = sectionAssignments => {
  return sectionAssignments.reduce((total, sectionAssignment) => {
    const [firstSectionAssignment, secondSectionAssignment] = sectionAssignment.split(',');
    const firstSectionArray = makeSectionArray(firstSectionAssignment);
    const secondSectionArray = makeSectionArray(secondSectionAssignment);
    const hasIntersection = findIntersection(firstSectionArray, secondSectionArray);
    return hasIntersection ? (total += 1) : total;
  }, 0);
};

// Answer:
console.log(findNumberOfOverlappingAssignments(sectionAssignments));
