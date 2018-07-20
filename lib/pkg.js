'use strict';
var __assign =
  (this && this.__assign) ||
  Object.assign ||
  function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
Object.defineProperty(exports, '__esModule', {value: true});
var path = require('path');
var Either_1 = require('fp-ts/lib/Either');
var IO_1 = require('fp-ts/lib/IO');
var TaskEither_1 = require('fp-ts/lib/TaskEither');
var function_1 = require('fp-ts/lib/function');
var fs_1 = require('./fs');
var log_1 = require('./log');
var parseToJSON = function(x) {
  try {
    var parsed = JSON.parse(x);
    return Either_1.right(parsed);
  } catch (e) {
    return Either_1.left(e);
  }
};
var readJson = function(source) {
  return fs_1
    .readFile(source, 'utf-8')
    .alt(TaskEither_1.taskEither.of('{}'))
    .chain(function(x) {
      return TaskEither_1.fromEither(parseToJSON(x));
    });
};
exports.getPackageTpl = function(fileName) {
  return TaskEither_1.fromIO(
    new IO_1.IO(function() {
      return __dirname;
    })
  )
    .map(function(d) {
      return path.resolve(d, '..', 'tpl', fileName);
    })
    .chain(readJson);
};
var addJest = function(src) {
  return exports.getPackageTpl('package.jest.json').map(function(jest) {
    return __assign({}, src, {jest: jest});
  });
};
var addScripts = function(src) {
  return exports.getPackageTpl('package.scripts.json').map(function(scripts) {
    return __assign({}, src, {scripts: scripts});
  });
};
var addTypings = function(src) {
  return exports.getPackageTpl('package.typings.json').map(function(typings) {
    return Object.assign({}, src, typings);
  });
};
var updatePkgJson = function(dest, json) {
  return fs_1
    .writeFile(dest, JSON.stringify(json, null, 2), {flag: 'w+'})
    .chain(function() {
      return log_1
        .logger(log_1.INFO(dest + ' updated'))
        .map(function_1.constant('OK'));
    });
};
exports.preparePkgJson = function(dest) {
  var pkg = path.join(dest, 'package.json');
  return readJson(pkg)
    .chain(addTypings)
    .chain(addScripts)
    .chain(addJest)
    .chain(function(content) {
      return updatePkgJson(pkg, content);
    });
};
//# sourceMappingURL=pkg.js.map
