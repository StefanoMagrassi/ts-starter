import * as fs from 'fs';
import * as path from 'path';

import {array} from 'fp-ts/lib/Array';
import {TaskEither, taskEither, taskify} from 'fp-ts/lib/TaskEither';
import {sequence} from 'fp-ts/lib/Traversable';
import {constUndefined} from 'fp-ts/lib/function';

export const readFile = (
  p: string,
  encoding: string
): TaskEither<NodeJS.ErrnoException, string> =>
  taskify<string, string, NodeJS.ErrnoException, string>(fs.readFile)(
    p,
    encoding
  );

export const writeFile = (
  p: string,
  data: string,
  options: {flag: string}
): TaskEither<NodeJS.ErrnoException, void> =>
  taskify<string, string, {flag: string}, NodeJS.ErrnoException, void>(
    fs.writeFile
  )(p, data, options);

export const copyFile = (
  from: string,
  to: string
): TaskEither<NodeJS.ErrnoException, void> =>
  taskify<string, string, NodeJS.ErrnoException, void>(fs.copyFile)(from, to);

export const copyFiles = (
  files: string[],
  dest: string
): TaskEither<Error, void> =>
  sequence(taskEither, array)(
    files.map(f => copyFile(f, path.join(dest, path.basename(f))))
  ).map(constUndefined);
