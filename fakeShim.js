'use strict';

var calls = [];
var shim = function fakeShim() {
	calls.push([this, Array.prototype.slice.call(arguments)]);
};
shim.calls = calls;

module.exports = shim;
