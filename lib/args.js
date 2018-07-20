'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
var fs = require('fs');
var path = require('path');
var Console_1 = require('fp-ts/lib/Console');
var Either_1 = require('fp-ts/lib/Either');
var IO_1 = require('fp-ts/lib/IO');
var IOEither_1 = require('fp-ts/lib/IOEither');
var TaskEither_1 = require('fp-ts/lib/TaskEither');
var log_1 = require('./log');
var checkArgs = function(args) {
  return IOEither_1.fromEither(
    args.length === 0
      ? Either_1.left(new Error('Destination must be specified'))
      : Either_1.right(args)
  );
};
var destFromCwd = function(args) {
  return new IO_1.IO(function() {
    return path.resolve(process.cwd(), args[0]);
  });
};
var warnAboutExtraArgs = function(args) {
  return args.length > 1
    ? Console_1.warn(log_1.WARNING('Extra arguments will be ignored')).chain(
        function(_) {
          return destFromCwd(args);
        }
      )
    : destFromCwd(args);
};
exports.destination = function(args) {
  return checkArgs(args).chain(function(as) {
    return new IOEither_1.IOEither(
      warnAboutExtraArgs(as).map(function(xs) {
        return Either_1.right(xs);
      })
    );
  });
};
exports.checkDestionation = function(dest) {
  return TaskEither_1.taskify(fs.stat)(dest).map(function(_) {
    return dest;
  });
};
//# sourceMappingURL=args.js.map
