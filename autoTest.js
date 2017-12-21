#!/usr/bin/env node

'use strict';

var assert = require('assert');
var path = require('path');

var fakeShim = require('./fakeShim');

var args = process.argv.slice(2); // remove node, and script name

assert.equal(args, 0, 'wrong number of arguments; expected 0');

require.cache[require.resolve(path.join(process.cwd(), './shim'))] = require.cache[require.resolve('./fakeShim')];

var autoPath = path.join(process.cwd(), './auto');

console.log('## Requiring ' + autoPath + '...');

require(autoPath);

console.log('## shim was called ' + fakeShim.calls.length + ' times');

assert.deepEqual(fakeShim.calls, [undefined, []], 'shim was invoked with no receiver or arguments');

console.log('## shim was invoked with no receiver or arguments');
