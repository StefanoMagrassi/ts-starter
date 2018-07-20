import * as path from 'path';

import {Either, left, right} from 'fp-ts/lib/Either';
import {IO} from 'fp-ts/lib/IO';
import {TaskEither, fromEither, fromIO, taskEither} from 'fp-ts/lib/TaskEither';
import {constant} from 'fp-ts/lib/function';

import {readFile, writeFile} from './fs';
import {INFO, logger} from './log';

const parseToJSON = (x: string): Either<Error, any> => {
  try {
    const parsed = JSON.parse(x);
    return right(parsed);
  } catch (e) {
    return left(e);
  }
};

const readJson = (source: string): TaskEither<Error, any> =>
  readFile(source, 'utf-8')
    .alt(taskEither.of('{}'))
    .chain(x => fromEither(parseToJSON(x)));

export const getPackageTpl = (fileName: string): TaskEither<Error, any> =>
  fromIO<Error, string>(new IO(() => __dirname))
    .map(d => path.resolve(d, '..', 'tpl', fileName))
    .chain(readJson);

const addJest = (src: {}): TaskEither<Error, {}> =>
  getPackageTpl('package.jest.json').map(jest => ({...src, jest}));

const addScripts = (src: {}): TaskEither<Error, {}> =>
  getPackageTpl('package.scripts.json').map(scripts => ({...src, scripts}));

const addTypings = (src: {}): TaskEither<Error, {}> =>
  getPackageTpl('package.typings.json').map(typings =>
    Object.assign({}, src, typings)
  );

const updatePkgJson = (dest: string, json: {}): TaskEither<Error, string> =>
  writeFile(dest, JSON.stringify(json, null, 2), {flag: 'w+'}).chain(() =>
    logger(INFO(`${dest} updated`)).map(constant('OK'))
  );

export const preparePkgJson = (dest: string): TaskEither<Error, string> => {
  const pkg = path.join(dest, 'package.json');

  return readJson(pkg)
    .chain(addTypings)
    .chain(addScripts)
    .chain(addJest)
    .chain(content => updatePkgJson(pkg, content));
};
