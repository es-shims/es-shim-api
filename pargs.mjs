import { parseArgs } from 'util';
import { realpathSync } from 'fs';

import groupByPolyfill from 'object.groupby/polyfill';

const groupBy = groupByPolyfill();

/** @typedef {import('util').ParseArgsConfig} ParseArgsConfig */

/** @typedef {(Error | TypeError) & { code: 'ERR_PARSE_ARGS_UNKNOWN_OPTION' | 'ERR_PARSE_ARGS_INVALID_OPTION_VALUE' | 'ERR_INVALID_ARG_TYPE' | 'ERR_INVALID_ARG_VALUE' | 'ERR_PARSE_ARGS_UNEXPECTED_POSITIONAL'}} ParseArgsError */

/** @type {(e: unknown) => e is ParseArgsError} */
function isParseArgsError(e) {
	return !!e
		&& typeof e === 'object'
		&& 'code' in e
		&& (
			e.code === 'ERR_PARSE_ARGS_UNKNOWN_OPTION'
			|| e.code === 'ERR_PARSE_ARGS_INVALID_OPTION_VALUE'
			|| e.code === 'ERR_INVALID_ARG_TYPE'
			|| e.code === 'ERR_INVALID_ARG_VALUE'
			|| e.code === 'ERR_PARSE_ARGS_UNEXPECTED_POSITIONAL'
		);
}

/** @type {(helpText: string, entrypointPath: string, obj: Exclude<ParseArgsConfig, 'args'>) => ReturnType<typeof parseArgs>} */
export default function pargs(helpText, entrypointPath, obj) {
	const argv = process.argv.flatMap((arg) => {
		try {
			const realpathedArg = realpathSync(arg);
			if (
				realpathedArg === process.execPath
				|| realpathedArg === entrypointPath
			) {
				return [];
			}
		} catch (e) { /**/ }
		return arg;
	});

	if ('help' in obj) {
		throw new TypeError('The "help" option is reserved');
	}

	const bools = obj.options ? Object.entries(obj.options).filter(([key, { type }]) => type === 'boolean' && key !== 'help') : [];
	const inverseBools = Object.fromEntries(bools.map(([key, value]) => [
		`no-${key}`,
		{ default: !value.default, type: 'boolean' },
	]));
	/** @type {ParseArgsConfig & { tokens: true }} */
	const newObj = {
		args: argv,
		...obj,
		options: {
			...obj.options,
			...inverseBools,
			help: {
				default: false,
				type: 'boolean',
			},
		},
		tokens: true,
	};

	try {
		const { tokens, ...results } = parseArgs(newObj);

		if ('help' in results.values && results.values.help) {
			console.log(helpText);
			process.exit(0);
		}

		/** @typedef {Extract<typeof tokens[number], { kind: 'option' }>} OptionToken */
		const optionTokens = tokens.filter(/** @type {(token: typeof tokens[number]) => token is OptionToken} */ (token) => token.kind === 'option');
		const passedArgs = new Set(optionTokens.map(({ name }) => name));
		const groups = groupBy(passedArgs, (x) => x.replace(/^no-/, ''));
		bools.forEach(([key]) => {
			if ((groups[key]?.length ?? 0) > 1) {
				console.log(helpText);
				console.error(`Error: Arguments --${key} and --no-${key} are mutually exclusive`);
				process.exit(2);
			}
			if (passedArgs.has(`no-${key}`)) {
				// @ts-expect-error
				results.values[key] = !results.values[`no-${key}`];
			}
			// @ts-expect-error
			delete results.values[`no-${key}`];
		});

		return obj.tokens ? { ...results, tokens } : results;
	} catch (e) {
		if (isParseArgsError(e)) {
			console.log(helpText);
			console.error(`Error: ${e.message}`);
			process.exit(1);
		}
		throw e;
	}
}
