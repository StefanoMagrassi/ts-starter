import chalk from 'chalk';
import {log} from 'fp-ts/lib/Console';
import {TaskEither, fromIO} from 'fp-ts/lib/TaskEither';
import {compose} from 'fp-ts/lib/function';

const withPrefix = (x: string): string => `\n> ${x}`;

export const WARNING = compose<string, string, string>(
  chalk.bold.yellowBright,
  withPrefix
);

export const ERROR = compose<string, string, string>(
  chalk.bold.redBright,
  withPrefix
);

export const SUCCESS = compose<string, string, string>(
  chalk.bold.greenBright,
  withPrefix
);

export const INFO = compose<string, string, string>(
  chalk.cyanBright,
  withPrefix
);

export const logger = (x: string): TaskEither<Error, void> => fromIO(log(x));

export const toMsg = (err: Error): string => err.message;
