#! /usr/bin/env node

import {program} from './index';
import {main} from './runner';

// --- Run the program
main(program(process.argv.slice(2)));
