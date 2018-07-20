'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
var TaskEither_1 = require('fp-ts/lib/TaskEither');
var args_1 = require('./args');
var deps_1 = require('./deps');
var dotfiles_1 = require('./dotfiles');
var pkg_1 = require('./pkg');
exports.program = function(args) {
  return TaskEither_1.fromIOEither(args_1.destination(args))
    .chain(args_1.checkDestionation)
    .chain(function(dest) {
      return pkg_1
        .preparePkgJson(dest)
        .chain(function(_) {
          return deps_1.installDependencies(dest);
        })
        .chain(function(_) {
          return dotfiles_1.copyDotfiles(dest);
        });
    });
};
//# sourceMappingURL=index.js.map
