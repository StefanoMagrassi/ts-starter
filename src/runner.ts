/*tslint:disable:no-console*/

import {TaskEither} from 'fp-ts/lib/TaskEither';
import {ERROR, SUCCESS, toMsg} from './log';

const endWithError = (err: Error): void => {
  console.error(ERROR(toMsg(err)));
  process.exit(1);
};

const endWithSuccess = (msg: string): void => {
  console.log(SUCCESS(msg));
  process.exit(0);
};

// --- Run the program
export const main = (program: TaskEither<Error, string>): Promise<void> =>
  program.run().then(result => result.fold(endWithError, endWithSuccess));
