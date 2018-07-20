/// <reference types="node" />
import {TaskEither} from 'fp-ts/lib/TaskEither';
export declare const readFile: (
  p: string,
  encoding: string
) => TaskEither<NodeJS.ErrnoException, string>;
export declare const writeFile: (
  p: string,
  data: string,
  options: {
    flag: string;
  }
) => TaskEither<NodeJS.ErrnoException, void>;
export declare const copyFile: (
  from: string,
  to: string
) => TaskEither<NodeJS.ErrnoException, void>;
export declare const copyFiles: (
  files: string[],
  dest: string
) => TaskEither<Error, void>;
