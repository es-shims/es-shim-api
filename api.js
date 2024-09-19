#!/usr/bin/env node

'use strict';

const test = require('tape');
const path = require('path');
const {
	existsSync,
	readdirSync,
	statSync,
} = require('fs');
const { spawn } = require('child_process');

const flatMap = require('array.prototype.flatmap');
const keys = require('object-keys');
const includes = require('array-includes');
const inspect = require('object-inspect');
const semver = require('semver');

const { version } = require('./package.json');
const major = semver.major(version);

const args = process.argv.slice(2); // remove node, and script name

function argEquals(argName) {
	return (arg) => arg === argName;
}
function not(fn) {
	return function () {
		// eslint-disable-next-line prefer-rest-params
		return !fn.apply(this, arguments);
	};
}
function isArg(x) {
	return x.slice(0, 2) === '--';
}

const isBound = args.some(argEquals('--bound'));
const isProperty = args.some(argEquals('--property'));
const skipShimPolyfill = args.some(argEquals('--skip-shim-returns-polyfill'));
const skipAutoShim = args.some(argEquals('--skip-auto-shim'));
let isMulti = args.some(argEquals('--multi'));
const extraIgnoreDirs = flatMap(args, (x) => (x.startsWith('--ignore-dirs=') ? x.slice('--ignore-dirs='.length).split(',') : []));

const ignoreDirs = ['node_modules', 'coverage', 'helpers', 'test', 'aos'].concat(extraIgnoreDirs);

function makeEntries(name) {
	return [name, name];
}
const moduleNames = args.filter(not(isArg)).map(makeEntries);
let pkg;
if (moduleNames.length < 1) {
	const packagePath = path.join(process.cwd(), 'package.json');
	if (!existsSync(packagePath)) {
		console.error('Error: No package.json found in the current directory');
		console.error('at least one module name is required when not run in a directory with a package.json');
		process.exit(1);
	}
	pkg = require(packagePath);
	if (!pkg.name) {
		console.error('Error: No "name" found in package.json');
		process.exit(2);
	}
	moduleNames.push([`${pkg.name} (current directory)`, [path.join(process.cwd(), pkg.main || ''), process.cwd()]]);

	const mainIsJSON = path.extname(require.resolve(process.cwd())) === '.json';
	if (isMulti && !mainIsJSON) {
		console.error('Error: --multi requires package.json main to be a JSON file');
		process.exit(3);
	}
	if (!isMulti && mainIsJSON) {
		isMulti = true;
		console.error('# automatic `--multi` mode enabled');
	}
}

function requireOrEvalError(name) {
	try {
		return require(name);
	} catch (e) {
		return new EvalError(e.message);
	}
}
const testAuto = function testAutoModule(t, prefix, packageDir, asMulti) {
	t.test(`${prefix}auto`, (st) => {
		const msg = 'auto is present';
		if (skipAutoShim) {
			st.comment(`# SKIP ${msg}`);
			st.end();
		} else {
			require(path.join(packageDir, '/auto'));
			st.comment(`${msg} (pass \`--skip-auto-shim\` to skip this test)`);
			const proc = spawn(path.join(__dirname, asMulti ? 'multiAutoTest.js' : 'autoTest.js'), [], { cwd: packageDir, stdio: 'inherit' });
			st.plan(1);
			proc.on('close', (code) => {
				st.equal(code, 0, 'auto invokes shim');
			});
		}
	});
};
const doValidation = function doActualValidation(t, packageDir, name) {
	const module = requireOrEvalError(name);
	if (module instanceof EvalError) {
		return module;
	}
	const implementation = requireOrEvalError(`${packageDir}/implementation`);
	const shim = requireOrEvalError(`${packageDir}/shim`);
	const getPolyfill = requireOrEvalError(`${packageDir}/polyfill`);

	const prefix = isMulti ? `${path.basename(packageDir)}: ` : '';

	t.test(`${prefix}export`, (st) => {
		if (isProperty) {
			st.comment('# SKIP module that is a data property need not be a function');
		} else if (isMulti) {
			st.notEqual(typeof module, 'undefined', 'module is not `undefined`');
		} else {
			st.equal(typeof module, 'function', 'module is a function (pass `--property` to skip this test)');
		}

		st.test('module is NOT bound (pass `--bound` to skip this test)', { skip: isBound }, (st2) => {
			st2.equal(module, getPolyfill(), 'module.exports === getPolyfill()');
			st2.end();
		});
		st.test('module is bound (do not pass `--bound` to skip this test)', { skip: !isBound }, (st2) => {
			st2.notEqual(module, getPolyfill(), 'module.exports !== getPolyfill()');
			st2.end();
		});

		st.end();
	});

	t.test(`${prefix}implementation`, (st) => {
		st.notOk(
			'implementation' in module,
			'module.exports lacks a `implementation` property',
			{ skip: isMulti },
		);

		if (isProperty) {
			st.comment('# SKIP implementation that is a data property need not be a function');
		} else if (isMulti) {
			st.notEqual(typeof implementation, 'undefined', 'implementation is not `undefined`');
		} else {
			st.equal(typeof implementation, 'function', 'implementation is a function (pass `--property` to skip this test)');
		}

		st.end();
	});

	t.test(`${prefix}polyfill`, (st) => {
		st.notOk(
			'getPolyfill' in module,
			'module.exports lacks a `getPolyfill` property',
			{ skip: isMulti },
		);

		st.equal(typeof getPolyfill, 'function', 'getPolyfill is a function');

		st.end();
	});

	t.test(`${prefix}shim`, (st) => {
		st.notOk(
			'shim' in module,
			'module.exports lacks a `shim` property',
			{ skip: isMulti },
		);

		st.equal(typeof shim, 'function', 'shim is a function');

		if (typeof shim === 'function') {
			const msg = 'shim returns polyfill (pass `--skip-shim-returns-polyfill` to skip this test)';
			if (skipShimPolyfill) {
				st.comment(`# SKIP ${msg}`);
			} else {
				const builtin = shim();
				st.equal(builtin, getPolyfill(), msg);

				st.test('builtin does not have own properties added', (s2t) => {
					s2t.notOk('implementation' in builtin, 'has no `implementation` property');
					s2t.notOk('getPolyfill' in builtin, 'has no `getPolyfill` property');
					s2t.notOk('shim' in builtin, 'has no `shim` property');

					s2t.end();
				});
			}
		}
		st.end();
	});

	testAuto(t, prefix, packageDir, false);

	return void undefined;
};

const validateModule = function validateAPIModule(t, nameOrFilePaths) {
	const [name, packageDir] = Array.isArray(nameOrFilePaths)
		? nameOrFilePaths
		: [nameOrFilePaths, nameOrFilePaths];

	t.test('`exports` field', { skip: !('exports' in pkg) }, (st) => {
		const expectedKeys = isMulti
			? ['.', './auto', './shim', './package.json']
			: ['.', './auto', './polyfill', './implementation', './shim', './package.json'];

		const exportsKeys = keys(pkg.exports);

		const keysToCheck = exportsKeys.filter((key) => includes(expectedKeys, key));
		st.deepEqual(keysToCheck, expectedKeys, 'expected entrypoints are present in the proper order');

		exportsKeys.forEach((key) => {
			const rhs = pkg.exports[key];
			const exists = [].concat(rhs).some(existsSync);
			st.ok(exists, `entrypoint \`${key}\` points to \`${inspect(rhs)}\` which exists (or is an array with one item that exists)`);
		});

		st.equal(pkg.exports['./package.json'], './package.json', 'package.json is exposed');

		st.end();
	});

	if (isMulti) {
		const subPackages = requireOrEvalError(name);
		if (subPackages instanceof EvalError) {
			return subPackages;
		}
		subPackages.sort();
		t.ok(Array.isArray(subPackages), 'main export is an array of sub packages');
		t.deepEqual(
			Object.keys(subPackages),
			subPackages.map((_, i) => String(i)),
			'main export has no additional properties',
		);
		t.ok(subPackages.length > 0, 'array is not empty');

		const dirs = readdirSync(packageDir).filter((d) => !d.startsWith('.') && !ignoreDirs.includes(d) && statSync(d).isDirectory());
		t.deepEqual(subPackages, dirs, 'main export subpackages matches dirs in the package root');

		const shim = requireOrEvalError(`${packageDir}/shim`);
		t.equal(typeof shim, 'function', 'root shim is a function');
		testAuto(t, 'root: ', packageDir, true);

		const implementation = requireOrEvalError('./implementation');
		t.ok(implementation instanceof EvalError, 'root lacks an `implementation` module');

		subPackages.forEach((subPackage) => {
			const subPackageDir = path.join(path.dirname(name), subPackage);
			doValidation(t, subPackageDir, subPackageDir);
		});

		t.test('subpackages, `exports` field', { skip: !('exports' in pkg) }, (st) => {
			subPackages.forEach((subPackage) => {
				const subPackageLHS = [
					`./${subPackage}`,
					`./${subPackage}/auto`,
					`./${subPackage}/polyfill`,
					`./${subPackage}/implementation`,
					`./${subPackage}/shim`,
				];

				subPackageLHS.forEach((lhs) => {
					st.ok(lhs in pkg.exports, `\`${lhs}\` is in \`exports\``);
					if (lhs in pkg.exports) {
						const rhs = pkg.exports[lhs];
						const resolved = path.resolve(path.join(packageDir, rhs));
						const lhsGuess = `./${path.relative(
							packageDir,
							path.join(
								path.dirname(resolved),
								path.basename(resolved, path.extname(resolved)),
							),
						).replace(/\/index$/, '')}`;
						st.equal(lhs, lhsGuess, `subpackage \`${subPackage}\` LHS + \`${lhs}\` resolves to \`${lhsGuess}\``);
					}
				});

				st.deepEqual(
					keys(pkg.exports).filter((lhs) => subPackageLHS.indexOf(lhs) > -1),
					subPackageLHS,
					`subpackage \`${subPackage}\` exports the expected entries in the proper order`,
				);
			});

			st.end();
		});
	} else {
		doValidation(t, packageDir, name);
	}

	return void undefined;
};

moduleNames.forEach(([name, filePath]) => {
	test(`es-shim API v${major}: testing module: ${name}`, (t) => {
		t.comment('* ----------------------------- * #');
		t.error(validateModule(t, filePath), 'expected no error');
		t.end();
	});
});
