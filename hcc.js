#! /usr/bin/env node

var program = require('commander'),
    fs = require('fs'),
    path = require('path'),
    filename;

program
    .version('0.1')
    .arguments('[filename]')
    .option('-i, --inplace', 'Perform conversion in place.')
    .action(function(fn) {
        filename = fn;
    })
    .parse(process.argv);

loadfile();

function loadfile() {
    console.log('Loading file', filename);
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) throw err;
      var converted = convert(data);
      writeFile(converted);
    });
}

function writeFile(contents) {
    var filepath = path.parse(filename);
    var name = program.inplace ? filename : filepath.name + '.out' + filepath.ext;
    fs.writeFile(name, contents, (err) => {
      if (err) throw err;
      console.log('File converted.');
    });
}

function convert(contents) {
    // replace x y z i j f
    return contents.replace(/([XYZIJF])(.*?)\s/g, inToMm);
}

function inToMm(match, dim, inches) {
    var mm = parseFloat(inches) * 25.4;
    return dim + mm.toFixed(3);
}