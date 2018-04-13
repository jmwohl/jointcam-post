#! /usr/bin/env node

var program = require('commander'),
    fs = require('fs'),
    path = require('path'),
    filename;

program
    .version('0.1')
    .arguments('[filename]')
    .action(function(fn) {
        filename = fn;
    })
    .parse(process.argv);

loadfile();

function loadfile() {
    console.log('loading file', filename);
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) throw err;
      var converted = convert(data);
      writeFile(converted);
    });
}

function writeFile(contents) {
    var filepath = path.parse(filename);
    fs.writeFile(filepath.name + '.out' +filepath.ext, contents, (err) => {
      if (err) throw err;
      console.log('File saved.');
    });
}

function convert(contents) {
    // console.log('convert', contents);
    // replace x y z i j f
    return contents.replace(/([XYZIJF])(.*?)\s/g, inToMm);
}

function inToMm(match, dim, inches) {
    // console.log(dim, inches);
    var mm = parseFloat(inches) * 25.4;
    return dim + mm.toFixed(3);
}