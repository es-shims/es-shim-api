#!/usr/bin/env node

'use strict';

const assert = require('assert');
const path = require('path');

const args = process.argv.slice(2); // remove node, and script name

assert.equal(args, 0, 'wrong number of arguments; expected 0');

const fakeShim = require('./fakeShim');
assert.equal(fakeShim.calls.length, 0, 'shim was not yet called');

require.cache[require.resolve(path.join(process.cwd(), './shim'))] = require.cache[require.resolve('./fakeShim')];

const autoPath = path.join(process.cwd(), './auto');

console.log(`## Requiring ${autoPath}...`);

require(autoPath);

console.log(`## shim was called ${fakeShim.calls.length} times`);

assert.equal(fakeShim.calls.length, 1, 'shim was called once');
assert.deepEqual(fakeShim.calls, [[undefined, []]], 'shim was invoked with no receiver or arguments');

console.log('## shim was invoked with no receiver or arguments');
