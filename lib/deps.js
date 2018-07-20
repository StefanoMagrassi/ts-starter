'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
var child_process = require('child_process');
var fs = require('fs');
var path = require('path');
var TaskEither_1 = require('fp-ts/lib/TaskEither');
var function_1 = require('fp-ts/lib/function');
var log_1 = require('./log');
var pkg_1 = require('./pkg');
var exec = function(cmd, cwd) {
  return TaskEither_1.taskify(child_process.exec)(cmd, {cwd: cwd});
};
exports.installDependencies = function(dest) {
  return pkg_1
    .getPackageTpl('package.devDependecies.json')
    .map(function(depsList) {
      return depsList.join(' ');
    })
    .chain(function(deps) {
      return TaskEither_1.taskify(fs.access)(path.join(dest, 'yarn.lock'))
        .map(function(_) {
          return 'yarn add -D';
        })
        .alt(TaskEither_1.taskEither.of('npm i -D'))
        .chain(function(cmd) {
          return log_1
            .logger(log_1.INFO('Installing dependencies...'))
            .chain(function(_) {
              return exec(cmd + ' ' + deps, dest);
            })
            .chain(function(_) {
              return log_1.logger(log_1.SUCCESS('Dependencies installed'));
            });
        })
        .map(function_1.constant('OK'));
    });
};
//# sourceMappingURL=deps.js.map
