import * as glob from 'glob';
import * as path from 'path';

import {left, right} from 'fp-ts/lib/Either';
import {IO} from 'fp-ts/lib/IO';
import {Task} from 'fp-ts/lib/Task';
import {TaskEither, fromIO} from 'fp-ts/lib/TaskEither';
import {constant} from 'fp-ts/lib/function';

import {copyFiles} from './fs';
import {INFO, SUCCESS, logger} from './log';

const globTask = (pattern: string): TaskEither<Error, string[]> =>
  new TaskEither(
    new Task(
      () =>
        new Promise(resolve =>
          glob(pattern, {dot: true}, (err, matches) =>
            resolve(
              err ? left<Error, string[]>(err) : right<Error, string[]>(matches)
            )
          )
        )
    )
  );

const getDotfiles = (): TaskEither<Error, string[]> =>
  fromIO<Error, string>(new IO(() => __dirname))
    .map(d => path.resolve(d, '..', 'tpl', 'dotfiles'))
    .chain(base => globTask(`${base}/*`));

export const copyDotfiles = (dest: string): TaskEither<Error, string> =>
  getDotfiles()
    .chain(files =>
      logger(INFO('Copy configuration files...'))
        .chain(_ => copyFiles(files, dest))
        .chain(_ => logger(SUCCESS('Configuration files installed')))
    )
    .map(constant('OK'));
