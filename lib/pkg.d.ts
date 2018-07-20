import {TaskEither} from 'fp-ts/lib/TaskEither';
export declare const getPackageTpl: (
  fileName: string
) => TaskEither<Error, any>;
export declare const preparePkgJson: (
  dest: string
) => TaskEither<Error, string>;
