'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
var chalk_1 = require('chalk');
var Console_1 = require('fp-ts/lib/Console');
var TaskEither_1 = require('fp-ts/lib/TaskEither');
var function_1 = require('fp-ts/lib/function');
var withPrefix = function(x) {
  return '\n> ' + x;
};
exports.WARNING = function_1.compose(
  chalk_1.default.bold.yellowBright,
  withPrefix
);
exports.ERROR = function_1.compose(
  chalk_1.default.bold.redBright,
  withPrefix
);
exports.SUCCESS = function_1.compose(
  chalk_1.default.bold.greenBright,
  withPrefix
);
exports.INFO = function_1.compose(
  chalk_1.default.cyanBright,
  withPrefix
);
exports.logger = function(x) {
  return TaskEither_1.fromIO(Console_1.log(x));
};
exports.toMsg = function(err) {
  return err.message;
};
//# sourceMappingURL=log.js.map
