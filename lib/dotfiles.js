'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
var glob = require('glob');
var path = require('path');
var Either_1 = require('fp-ts/lib/Either');
var IO_1 = require('fp-ts/lib/IO');
var Task_1 = require('fp-ts/lib/Task');
var TaskEither_1 = require('fp-ts/lib/TaskEither');
var function_1 = require('fp-ts/lib/function');
var fs_1 = require('./fs');
var log_1 = require('./log');
var globTask = function(pattern) {
  return new TaskEither_1.TaskEither(
    new Task_1.Task(function() {
      return new Promise(function(resolve) {
        return glob(pattern, {dot: true}, function(err, matches) {
          return resolve(err ? Either_1.left(err) : Either_1.right(matches));
        });
      });
    })
  );
};
var getDotfiles = function() {
  return TaskEither_1.fromIO(
    new IO_1.IO(function() {
      return __dirname;
    })
  )
    .map(function(d) {
      return path.resolve(d, '..', 'tpl', 'dotfiles');
    })
    .chain(function(base) {
      return globTask(base + '/*');
    });
};
exports.copyDotfiles = function(dest) {
  return getDotfiles()
    .chain(function(files) {
      return log_1
        .logger(log_1.INFO('Copy configuration files...'))
        .chain(function(_) {
          return fs_1.copyFiles(files, dest);
        })
        .chain(function(_) {
          return log_1.logger(log_1.SUCCESS('Configuration files installed'));
        });
    })
    .map(function_1.constant('OK'));
};
//# sourceMappingURL=dotfiles.js.map
