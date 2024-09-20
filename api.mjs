#!/usr/bin/env node

import test from 'tape';
import path, { join } from 'path';
import {
	existsSync,
	readdirSync,
	readFileSync,
	statSync,
} from 'fs';
import { spawn } from 'child_process';

import inspect from 'object-inspect';
import major from 'semver/functions/major.js';
import { createRequire } from 'module';

import pargs from './pargs.mjs';

const require = createRequire(import.meta.url);

const { version } = require('./package.json');
const majorV = major(version);

const help = readFileSync(join(import.meta.dirname, './help.txt'), 'utf8');

const {
	positionals,
	values: {
		type,
		'skip-shim-returns-polyfill': skipShimPolyfill,
		'skip-auto-shim': skipAutoShim,
		'ignore-dirs': rawIgnoreDirs,
	},
	// eslint-disable-next-line no-extra-parens, max-len
} = /** @type {{ positionals: string[], values: { type: 'method' | 'function' | 'property' | 'constructor' | 'multi', 'skip-shim-returns-polyfill': boolean, 'skip-auto-shim': boolean, 'ignore-dirs': string[], multi: boolean } }} */ (
	pargs(help, import.meta.filename, {
		allowPositionals: true,
		options: {
			type: {
				type: 'string',
				default: 'method',
			},
			'skip-shim-returns-polyfill': { type: 'boolean' },
			'skip-auto-shim': { type: 'boolean' },
			'ignore-dirs': {
				type: 'string',
				multiple: true,
				default: [],
			},
		},
	})
);

let isMulti = type === 'multi';

const ignoreDirs = ['node_modules', 'coverage', 'helpers', 'test', 'aos'].concat(rawIgnoreDirs.flatMap((x) => x.split(',')));

/** @type {<T extends string>(name: T) => [T, T]} */
function makeEntries(name) {
	return [name, name];
}
/** @type {[string, string | [string, string]][]} */
const moduleNames = positionals.map(makeEntries);

/** @type {{ name?: string, main?: string | false, exports?: Record<string, unknown | unknown[]> }} */
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
		console.error('Error: --type=multi requires package.json main to be a JSON file');
		process.exit(3);
	}
	if (!isMulti && mainIsJSON) {
		isMulti = true;
		console.error('# automatic `--type=multi` mode enabled');
	}

	if (
		type !== 'property'
		&& type !== 'method'
		&& type !== 'constructor'
		&& type !== 'function'
		&& type !== 'multi'
	) {
		console.error('`type` must be one of `method`, `function`, `property`, `constructor`, or `multi`');
		process.exit(4);
	}
}

/** @type {(name: string) => {}} */
function requireOrEvalError(name) {
	try {
		return require(name);
	} catch (e) {
		// @ts-expect-error it's fine if this throws on a nullish exception from the module
		return new EvalError(e.message);
	}
}

/** @type {(t: test.Test, prefix: string, packageDir: string, asMulti: boolean) => void} */
const testAuto = function testAutoModule(t, prefix, packageDir, asMulti) {
	t.test(`${prefix}auto`, (st) => {
		const msg = 'auto is present';
		if (skipAutoShim) {
			st.comment(`# SKIP ${msg}`);
			st.end();
		} else {
			require(path.join(packageDir, '/auto'));
			st.comment(`${msg} (pass \`--skip-auto-shim\` to skip this test)`);
			const proc = spawn(path.join(import.meta.dirname, asMulti ? 'multiAutoTest.js' : 'autoTest.js'), [], { cwd: packageDir, stdio: 'inherit' });
			st.plan(1);
			proc.on('close', (code) => {
				st.equal(code, 0, 'auto invokes shim');
			});
		}
	});
};

/** @type {(t: test.Test, packageDir: string, name: string) => undefined | EvalError} */
const doValidation = function doActualValidation(t, packageDir, name) {
	const module = requireOrEvalError(name);
	if (module instanceof EvalError) {
		return module;
	}
	const implementation = requireOrEvalError(`${packageDir}/implementation`);
	const shim = requireOrEvalError(`${packageDir}/shim`);
	// eslint-disable-next-line no-extra-parens
	const getPolyfill = /** @type {Function} */ (requireOrEvalError(`${packageDir}/polyfill`));

	const prefix = isMulti ? `${path.basename(packageDir)}: ` : '';

	t.test(`${prefix}export`, (st) => {
		if (type === 'property') {
			st.comment('# SKIP module that is a data property need not be a function');
		} else if (isMulti) {
			st.notEqual(typeof module, 'undefined', 'module is not `undefined`');
		} else {
			st.equal(typeof module, 'function', 'module is a function (pass `--type=property` to skip this test)');
		}

		st.test('module is NOT bound (pass `--type=method` to skip this test)', { skip: type !== 'function' && type !== 'constructor' }, (st2) => {
			st2.equal(module, getPolyfill(), 'module.exports === getPolyfill()');
			st2.end();
		});
		st.test('module is bound (pass a `--type=` other than `method` to skip this test)', { skip: type !== 'method' }, (st2) => {
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

		if (type === 'property') {
			st.comment('# SKIP implementation that is a data property need not be a function');
		} else if (isMulti) {
			st.notEqual(typeof implementation, 'undefined', 'implementation is not `undefined`');
		} else {
			st.equal(typeof implementation, 'function', 'implementation is a function (pass `--type=property` to skip this test)');
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

/** @type {(t: test.Test, nameOrFilePaths: string | [string, string]) => EvalError | undefined} */
const validateModule = function validateAPIModule(t, nameOrFilePaths) {
	const [name, packageDir] = Array.isArray(nameOrFilePaths)
		? nameOrFilePaths
		: [nameOrFilePaths, nameOrFilePaths];

	t.test('`exports` field', { skip: !('exports' in pkg) }, (st) => {
		// eslint-disable-next-line no-extra-parens
		const exps = /** @type {NonNullable<typeof pkg.exports>} */ (pkg.exports);
		const expectedKeys = isMulti
			? ['.', './auto', './shim', './package.json']
			: ['.', './auto', './polyfill', './implementation', './shim', './package.json'];

		const exportsKeys = Object.keys(exps);

		const keysToCheck = exportsKeys.filter((key) => expectedKeys.includes(key));
		st.deepEqual(keysToCheck, expectedKeys, 'expected entrypoints are present in the proper order');

		exportsKeys.forEach((key) => {
			const rhs = exps[key];
			// @ts-expect-error TS sucks with concat
			const exists = [].concat(rhs).some(existsSync);
			st.ok(exists, `entrypoint \`${key}\` points to \`${inspect(rhs)}\` which exists (or is an array with one item that exists)`);
		});

		st.equal(exps['./package.json'], './package.json', 'package.json is exposed');

		st.end();
	});

	if (isMulti) {
		// eslint-disable-next-line no-extra-parens
		const subPackages = /** @type {string[]} */ (requireOrEvalError(name));
		if (subPackages instanceof EvalError) {
			return subPackages;
		}
		t.ok(Array.isArray(subPackages), 'main export is an array of sub packages');
		subPackages.sort();
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
			// eslint-disable-next-line no-extra-parens
			const exps = /** @type {NonNullable<typeof pkg.exports>} */ (pkg.exports);
			subPackages.forEach((subPackage) => {
				const subPackageLHS = [
					`./${subPackage}`,
					`./${subPackage}/auto`,
					`./${subPackage}/polyfill`,
					`./${subPackage}/implementation`,
					`./${subPackage}/shim`,
				];

				subPackageLHS.forEach((lhs) => {
					st.ok(lhs in exps, `\`${lhs}\` is in \`exports\``);
					if (lhs in exps) {
						// eslint-disable-next-line no-extra-parens
						const rhs = /** @type {string} */ (exps[lhs]);
						st.equal(typeof rhs, 'string', 'right-hand side of `exports` is a string');
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
					Object.keys(exps).filter((lhs) => subPackageLHS.indexOf(lhs) > -1),
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
	test(`es-shim API v${majorV}: testing module: ${name}`, (t) => {
		t.comment('* ----------------------------- * #');
		t.error(validateModule(t, filePath), 'expected no error');
		t.end();
	});
});
