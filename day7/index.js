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

class Node {
  constructor(key, value = key, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.children = [];
  }
}

class Tree {
  constructor(key, value = key) {
    this.root = new Node(key, value);
  }

  *traversal(node = this.root) {
    yield node;
    if (node.children.length) {
      for (let child of node.children) {
        yield* this.traversal(child);
      }
    }
  }

  insert(parentNodeKey, key, value = key) {
    for (let node of this.traversal()) {
      if (node.key === parentNodeKey) {
        node.children.push(new Node(key, value, node));
        return true;
      }
    }
    return false;
  }

  find(key) {
    for (let node of this.traversal()) {
      if (node.key === key) return node;
    }
    return undefined;
  }
}

let tree = {};
const filepath = [];

for (const line of commandSections) {
  if (line.startsWith('cd')) {
    const [command] = line.split('\n');
    const [, arg] = command.split(' ');
    if (arg === '/') {
      tree = new Tree(arg, {});
      filepath.push(arg);
    }
    if (arg === '..') {
      filepath.pop();
    }
    if (arg.match(/\w/)) {
      filepath.push(`${arg}`);
    }
  }
  if (line.startsWith('ls')) {
    const [, ...list] = line.split('\n');
    for (const contents of list) {
      const [size, filename] = contents.split(' ');
      tree.insert(filepath[filepath.length - 1], filename, size);
    }
  }
}

console.log(tree);
console.log(
  [...tree.traversal()]
    .map(x => Number(x.value))
    .filter(x => !Number.isNaN(x))
    .filter(size => size <= 100000)
    .reduce((sum, num) => sum + num, 0)
);
// console.log([...tree.traversal()]);
// console.log(filepath);
