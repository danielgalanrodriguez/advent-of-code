exports.readFile = (path) => {
  const fs = require('fs')
  const file = fs.readFileSync(path, { encoding: 'utf8' })
  const fileByLine = file.split(/\r?\n/)
  return fileByLine
}

exports.readEntireFile = (path) => {
  const fs = require('fs')
  const file = fs.readFileSync(path, { encoding: 'utf8' })
  return file
}

exports.sortNumberList = (a, b) => a - b
