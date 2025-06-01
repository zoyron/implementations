#!/usr/bin/env node

const fs = require('fs');

let args = process.argv[2];
let fileName = process.argv[3];

if (!fileName) {
  fileName = args;
  args = null;
}

if (fs.existsSync(fileName)) {
  switch (args) {
    case '-b':
      console.log(`${byteCount()} ${fileName}`);
      break;
    case '-l':
      console.log(`${lineCount()} ${fileName}`);
      break;
    case '-w':
      console.log(`${wordCount()} ${fileName}`);
      break;
    case '-c':
      console.log(`${charCount()} ${fileName}`);
      break;
    case null:
      console.log(`${lineCount()} ${wordCount()} ${byteCount()} ${fileName}`);
      break;
    default:
      console.log(`Invalid option.\nThe following options are supported
        -w\tprints the number of words in the file
        -l\tprints the number of lines in the file
        -b\tprints the number of bytes in the file
        -c\tprints the number of characters in the file`);
  }
} else {
  console.log('Enter a valid file name that exists');
}

// function implementations

/**
 * This function returns the number of bytes in the given file.
 */
function byteCount() {
  try {
    let buffer = fs.readFileSync(fileName); // open file as binary sequence
    return buffer.length;
  } catch (e) {
    console.log(e.message);
  }
}

/**
 * This function returns the number of lines in the given file.
 */
function lineCount() {
  try {
    let data = fs.readFileSync(fileName, 'utf-8');
    return data.split(/\r\n|\r|\n/).length;
  } catch (e) {
    console.log(e.message);
  }
}

/**
 * This function returns the number of words in the given file.
 */
function wordCount() {
  try {
    let data = fs.readFileSync(fileName, 'utf-8');
    return data.split(/\s+/g).filter(Boolean).length;
  } catch (e) {
    console.log(e.message);
  }
}

/**
 * This function returns the number of characters in the given file.
 */
function charCount() {
  try {
    let data = fs.readFileSync(fileName, 'utf-8');
    return data.length;
  } catch (e) {
    console.log(e.message);
  }
}
