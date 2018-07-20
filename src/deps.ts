import * as child_process from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

import {TaskEither, taskEither, taskify} from 'fp-ts/lib/TaskEither';
import {constant} from 'fp-ts/lib/function';

import {INFO, SUCCESS, logger} from './log';
import {getPackageTpl} from './pkg';

const exec = (cmd: string, cwd: string): TaskEither<Error, string> =>
  taskify<string, {cwd: string}, Error, string>(child_process.exec)(cmd, {cwd});

export const installDependencies = (dest: string): TaskEither<Error, string> =>
  getPackageTpl('package.devDependecies.json')
    .map<string>((depsList: string[]) => depsList.join(' '))
    .chain(deps =>
      taskify(fs.access)(path.join(dest, 'yarn.lock'))
        .map(_ => 'yarn add -D')
        .alt(taskEither.of('npm i -D'))
        .chain(cmd =>
          logger(INFO('Installing dependencies...'))
            .chain(_ => exec(`${cmd} ${deps}`, dest))
            .chain(_ => logger(SUCCESS('Dependencies installed')))
        )
        .map(constant('OK'))
    );
