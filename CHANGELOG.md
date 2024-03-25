# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v2.5.0](https://github.com/es-shims/es-shim-api/compare/v2.4.2...v2.5.0) - 2024-03-24

### Fixed

- [meta] fix badges and URLs [`#27`](https://github.com/es-shims/es-shim-api/issues/27)

### Commits

- [New] `--multi`: ensure all declared subpackages have proper `exports` [`8bf6ae2`](https://github.com/es-shims/es-shim-api/commit/8bf6ae28d6353c1db524394578b4b9990f144895)
- [New] automatically detect `--multi` mode [`4e7f6d7`](https://github.com/es-shims/es-shim-api/commit/4e7f6d7ed5730e04051583b7e08285e3af49a4d8)
- [Deps] update `array-includes`, `array.prototype.flatmap`, `object-inspect`, `tape` [`2b75c3e`](https://github.com/es-shims/es-shim-api/commit/2b75c3eddc239c3f74c12c7e460541df0d9a85e3)
- [Deps] update `array-includes`, `tape` [`906b618`](https://github.com/es-shims/es-shim-api/commit/906b6184f9cec05b887494946005e66a0fd0e518)
- [Dev Deps] update `aud`, `npmignore` [`1bfc395`](https://github.com/es-shims/es-shim-api/commit/1bfc395a35ef73b17ffd4fa4cc11f2bcebd799a5)
- [Dev Deps] update `@ljharb/eslint-config`, `aud` [`4f6fced`](https://github.com/es-shims/es-shim-api/commit/4f6fcedc032bc749375c9c03ce1c9916dab713c9)

## [v2.4.2](https://github.com/es-shims/es-shim-api/compare/v2.4.1...v2.4.2) - 2023-05-15

### Commits

- [Fix] handle `exports` with an array RHS [`32d8fa3`](https://github.com/es-shims/es-shim-api/commit/32d8fa35f96bd724c3866e7eb7bc237af8536213)

## [v2.4.1](https://github.com/es-shims/es-shim-api/compare/v2.4.0...v2.4.1) - 2023-05-03

### Commits

- [Fix] in `--multi`, `exports` should not have polyfill or impl entrypoints [`a6f4a41`](https://github.com/es-shims/es-shim-api/commit/a6f4a41d743d4d4dc238cf2e5cd9e7ea1787287b)

## [v2.4.0](https://github.com/es-shims/es-shim-api/compare/v2.3.1...v2.4.0) - 2023-05-02

### Commits

- [New] add check for `exports` field [`f6f7920`](https://github.com/es-shims/es-shim-api/commit/f6f79200d691b2902bcc62a8c331e5e336a0f4ca)

## [v2.3.1](https://github.com/es-shims/es-shim-api/compare/v2.3.0...v2.3.1) - 2023-02-17

### Commits

- [meta] add `auto-changelog` [`7ba8adb`](https://github.com/es-shims/es-shim-api/commit/7ba8adb08399c225cd069c094c0cf2d45170ce3d)
- [Fix] allow multi to be non-functions, as long as they are defined [`4cb4210`](https://github.com/es-shims/es-shim-api/commit/4cb421009ffb3b1adf3f7a544ca867662fa8f41c)

<!-- auto-changelog-above -->

2.3.0 / 2023-02-04
==================
  * [New] add `--ignore-dirs` option to be used with `--multi`
  * [Deps] update `tape`
  * [meta] use `npmignore` to autogenerate an npmignore file
  * [Dev Deps] update `eslint`, `@ljharb/eslint-config`, `aud`, `safe-publish-latest
  * [actions] update rebase action to use reusable workflow
  * [actions] reuse common workflows

2.2.3 / 2021-10-04
==================
  * [Fix] `multi`: sort package list before comparing

2.2.2 / 2021-10-03
==================
  * [Deps] remove unused deps

2.2.1 / 2021-09-02
==================
  * [Fix] `--multi`: test subpackages’ `auto` endpoint
  * [Fix] `--multi`: skip `coverage` directory

2.2.0 / 2021-09-02
==================
  * [New] add `--multi`, to support one package containing multiple shims
  * [readme] add github actions/codecov badges; update URLs
  * [readme] remove travis badge
  * [Docs] update shims list
  * [shims] Adds `Array.isTemplateObject` (#17)
  * [meta] remove unused Makefile and associated utilities
  * [meta] add `funding` field
  * [meta] do not publish github action workflow files
  * [meta] Quote keyword in npm search link, due to a bug in npmjs.com
  * [actions] update workflows
  * [actions] add "Allow Edits" workflow
  * [actions] switch Automatic Rebase workflow to `pull_request_target` event
  * [actions] add automatic rebasing / merge commit blocking
  * [Dev Deps] update `eslint`, `@ljharb/eslint-config`, `make-arrow-function`, `make-generator-function`; add `safe-publish-latest`
  * [Tests] migrate tests to Github Actions
  * [Tests] use `npx aud` instead of `nsp` or `npm audit` with hoops
  * [Tests] remove `jscs`

2.1.2 / 2017-12-30
==================
  * [Fix] ensure the "auto" test works prior to node 0.12

2.1.1 / 2017-12-21
==================
  * [Fix] fix new auto test

2.1.0 / 2017-12-21
==================
  * [New] improve `auto` test

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
