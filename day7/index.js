const fs = require('fs');

const getInput = filePath => fs.readFileSync(filePath, 'utf8').trimEnd().split('$ ');

const commandSections = getInput('./input.txt');

// console.log(commandSections);

// TODO: Should have probably used a Tree data structure and built the file tree recursively, going into each dir/file and adding a node with size value
// Then traversed it recursively as well to find the answer instead of this mess, but couldn't figure out how

/* Part One */

let fileTree = { '/': 0 };
const filePaths = ['/'];

for (const line of commandSections) {
  if (line.startsWith('cd')) {
    const [command] = line.split('\n');
    const [, arg] = command.split(' ');
    if (arg === '..') {
      filePaths.pop();
    }
    if (arg.match(/\w/)) {
      filePaths.push(`${filePaths[filePaths.length - 1]}${arg}/`);
    }
  }
  if (line.startsWith('ls')) {
    const [, ...list] = line.split('\n');
    for (const output of list) {
      const [size, filename] = output.split(' ');
      if (size === 'dir') {
        if (filePaths.length === 1) {
          filePaths.push(`${filePaths[filePaths.length - 1]}${filename}/`);
        } else {
          filePaths.push(`${filePaths[filePaths.length - 2]}${filename}/`);
        }
      } else {
        for (const path of filePaths) {
          fileTree[path] = (fileTree[path] || 0) + Number(size);
        }
      }
    }
  }
}

// Answer:
// console.log(
//   Object.values(fileTree)
//     .filter(size => size <= 100000)
//     .reduce((acc, size) => acc + size)
// );

/* Part Two */

//Answer:
// console.log(Math.min(...Object.values(fileTree).filter(size => size >= fileTree['/'] - 40000000)));
// Took some inspiration from this nice solution: https://github.com/leyanlo/advent-of-code/blob/main/2022/day-07.js
