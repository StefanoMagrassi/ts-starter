import * as fs from 'fs';
import * as path from 'path';

import {warn} from 'fp-ts/lib/Console';
import {left, right} from 'fp-ts/lib/Either';
import {IO} from 'fp-ts/lib/IO';
import {IOEither, fromEither as ioeFromEither} from 'fp-ts/lib/IOEither';
import {TaskEither, taskify} from 'fp-ts/lib/TaskEither';

import {WARNING} from './log';

const checkArgs = (args: string[]): IOEither<Error, string[]> =>
  ioeFromEither(
    args.length === 0
      ? left(new Error('Destination must be specified'))
      : right(args)
  );

const destFromCwd = (args: string[]): IO<string> =>
  new IO(() => path.resolve(process.cwd(), args[0]));

const warnAboutExtraArgs = (args: string[]): IO<string> =>
  args.length > 1
    ? warn(WARNING('Extra arguments will be ignored')).chain(_ =>
        destFromCwd(args)
      )
    : destFromCwd(args);

export const destination = (args: string[]): IOEither<Error, string> =>
  checkArgs(args).chain(
    as =>
      new IOEither(warnAboutExtraArgs(as).map(xs => right<Error, string>(xs)))
  );

export const checkDestionation = (dest: string): TaskEither<Error, string> =>
  taskify(fs.stat)(dest).map(_ => dest);
