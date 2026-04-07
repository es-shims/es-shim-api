'use strict';

/** @type {[unknown, unknown[]][]} */
const calls = [];
/** @type {{ calls: typeof calls } & ((this: unknown) => void)} */
const shim = function fakeShim(...args) {
	calls[calls.length] = [this, args];
};
shim.calls = calls;

module.exports = shim;
