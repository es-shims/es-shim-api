2.0.0 / 2017-12-20
==================
  * [Breaking] add `auto` requirement (#16)
  * [Deps] update `tape`
  * [Dev Deps] update `eslint`, `@ljharb/eslint-config`, `nsp`

1.3.0 / 2017-07-26
==================
  * [New] add `--skip-shim-returns-polyfill`
  * [Refactor] ensure `--property` test indicates how to skip it
  * [Refactor] skip all `--`-prefixed args.
  * [Refactor] consolidate `argEquals` implementations
  * [Dev Deps] update `eslint`, `@ljharb/eslint-config`, `nsp`, `semver`, `jscs`
  * [Tests] up to `node` `v8.2`, `v7.10`, `v6.11`, `v4.8`; improve matrix; newer npm breaks on older node
  * [Docs] Update shims list.

1.2.0 / 2016-03-29
==================
  * [New] Add `--property` to skip check that implementation is a function
  * [Deps] update `tape`
  * [Dev Deps] update `jscs`, `nsp`, `eslint`, `@ljharb/eslint-config`
  * [Tests] up to `node` `v5.9`, `v4.4`

1.1.0 / 2016-02-06
==================
  * [New] Require that the default export be `getPolyfill()` instead of `implementation`
  * [Fix] Handle the case where `package.json`'s "main" entry point is not `index.js`
  * [Fix] Make sure `existsSync` works in node 0.6 and below
  * [Deps] update `tape`
  * [Dev Deps] update `jscs`, `eslint`, `@ljharb/eslint-config`, `nsp`, `semver`
  * [Tests] up to `node` `v5.5`
  * [Tests] fix npm upgrades for older nodes

1.0.0 / 2015-08-15
==================
  * Initial release.
