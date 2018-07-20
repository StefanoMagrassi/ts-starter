import {IOEither} from 'fp-ts/lib/IOEither';
import {TaskEither} from 'fp-ts/lib/TaskEither';
export declare const destination: (args: string[]) => IOEither<Error, string>;
export declare const checkDestionation: (
  dest: string
) => TaskEither<Error, string>;
