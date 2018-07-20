import {TaskEither} from 'fp-ts/lib/TaskEither';
export declare const WARNING: (a: string) => string;
export declare const ERROR: (a: string) => string;
export declare const SUCCESS: (a: string) => string;
export declare const INFO: (a: string) => string;
export declare const logger: (x: string) => TaskEither<Error, void>;
export declare const toMsg: (err: Error) => string;
