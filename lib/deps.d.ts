import {TaskEither} from 'fp-ts/lib/TaskEither';
export declare const installDependencies: (
  dest: string
) => TaskEither<Error, string>;
