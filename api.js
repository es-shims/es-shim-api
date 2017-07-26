#!/usr/bin/env node

'use strict';

var test = require('tape');
var path = require('path');
var fs = require('fs');
var existsSync = path.existsSync || fs.existsSync;

var args = process.argv.slice(2); // remove node, and script name

var argEqualsBound = function (arg) {
	return arg === '--bound';
};
var argEqualsProperty = function (arg) {
	return arg === '--property';
};
var not = function (fn) {
	return function () {
		return !fn.apply(this, arguments);
	};
};

var isBound = args.some(argEqualsBound);
var isProperty = args.some(argEqualsProperty);
var makeEntries = function (name) {
	return [name, name];
};
var moduleNames = args
	.filter(not(argEqualsBound))
	.filter(not(argEqualsProperty))
	.map(makeEntries);

if (moduleNames.length < 1) {
	var packagePath = path.join(process.cwd(), 'package.json');
	if (!existsSync(packagePath)) {
		console.error('Error: No package.json found in the current directory');
		console.error('at least one module name is required when not run in a directory with a package.json');
		process.exit(1);
	}
	var pkg = require(packagePath);
	if (!pkg.name) {
		console.error('Error: No "name" found in package.json');
		process.exit(2);
	}
	moduleNames.push([pkg.name + ' (current directory)', [path.join(process.cwd(), pkg.main || ''), process.cwd()]]);
}
var requireOrEvalError = function (name) {
	try {
		return require(name);
	} catch (e) {
		return new EvalError(e.message);
	}
};
var validateModule = function validateAPIModule(t, nameOrFilePaths) {
	var name = nameOrFilePaths;
	var packageDir = nameOrFilePaths;
	if (Array.isArray(nameOrFilePaths)) {
		name = nameOrFilePaths[0];
		packageDir = nameOrFilePaths[1];
	}
	var module = requireOrEvalError(name);
	if (module instanceof EvalError) {
		return module;
	}
	var implementation = requireOrEvalError(packageDir + '/implementation');
	var shim = requireOrEvalError(packageDir + '/shim');
	var getPolyfill = requireOrEvalError(packageDir + '/polyfill');

	t.test('export', function (st) {
		st.equal(typeof module, 'function', 'module is a function');
		st.test('module is NOT bound (pass `--bound` to skip this test)', { skip: isBound }, function (st2) {
			st2.equal(module, getPolyfill(), 'module.exports === getPolyfill()');
			st2.end();
		});
		st.end();
	});

	t.test('implementation', function (st) {
		st.equal(implementation, module.implementation, 'module.exports.implementaton === implementation.js');
		if (isProperty) {
			st.comment('# SKIP implementation that is a data property need not be a function');
		} else {
			st.equal(typeof implementation, 'function', 'implementation is a function');
		}
		st.end();
	});

	t.test('polyfill', function (st) {
		st.equal(getPolyfill, module.getPolyfill, 'module.exports.getPolyfill === polyfill.js');
		st.equal(typeof getPolyfill, 'function', 'getPolyfill is a function');
		st.end();
	});

	t.test('shim', function (st) {
		st.equal(shim, module.shim, 'module.exports.shim === shim.js');
		st.equal(typeof shim, 'function', 'shim is a function');
		if (typeof shim === 'function') {
			st.equal(shim(), getPolyfill(), 'shim returns polyfill');
		}
		st.end();
	});

	return void 0;
};

moduleNames.forEach(function (data) {
	var name = data[0];
	var filePath = data[1];
	test('es-shim API : testing module: ' + name, function (t) {
		t.comment('* ----------------------------- * #');
		t.error(validateModule(t, filePath), 'expected no error');
		t.end();
	});
});
