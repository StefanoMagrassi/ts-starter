'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
var fs = require('fs');
var path = require('path');
var Array_1 = require('fp-ts/lib/Array');
var TaskEither_1 = require('fp-ts/lib/TaskEither');
var Traversable_1 = require('fp-ts/lib/Traversable');
var function_1 = require('fp-ts/lib/function');
exports.readFile = function(p, encoding) {
  return TaskEither_1.taskify(fs.readFile)(p, encoding);
};
exports.writeFile = function(p, data, options) {
  return TaskEither_1.taskify(fs.writeFile)(p, data, options);
};
exports.copyFile = function(from, to) {
  return TaskEither_1.taskify(fs.copyFile)(from, to);
};
exports.copyFiles = function(files, dest) {
  return Traversable_1.sequence(TaskEither_1.taskEither, Array_1.array)(
    files.map(function(f) {
      return exports.copyFile(f, path.join(dest, path.basename(f)));
    })
  ).map(function_1.constUndefined);
};
//# sourceMappingURL=fs.js.map
