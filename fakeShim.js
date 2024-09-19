'use strict';

const calls = [];
const shim = function fakeShim(...args) {
	calls.push([this, args]);
};
shim.calls = calls;

module.exports = shim;
