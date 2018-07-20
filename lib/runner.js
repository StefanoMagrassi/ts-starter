'use strict';
/*tslint:disable:no-console*/
Object.defineProperty(exports, '__esModule', {value: true});
var log_1 = require('./log');
var endWithError = function(err) {
  console.error(log_1.ERROR(log_1.toMsg(err)));
  process.exit(1);
};
var endWithSuccess = function(msg) {
  console.log(log_1.SUCCESS(msg));
  process.exit(0);
};
// --- Run the program
exports.main = function(program) {
  return program.run().then(function(result) {
    return result.fold(endWithError, endWithSuccess);
  });
};
//# sourceMappingURL=runner.js.map
