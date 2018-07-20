import {TaskEither, fromIOEither} from 'fp-ts/lib/TaskEither';

import {checkDestionation, destination} from './args';
import {installDependencies} from './deps';
import {copyDotfiles} from './dotfiles';
import {preparePkgJson} from './pkg';

export const program = (args: string[]): TaskEither<Error, string> =>
  fromIOEither(destination(args))
    .chain(checkDestionation)
    .chain(dest =>
      preparePkgJson(dest)
        .chain(_ => installDependencies(dest))
        .chain(_ => copyDotfiles(dest))
    );
