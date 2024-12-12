# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v3.0.2](https://github.com/es-shims/es-shim-api/compare/v3.0.1...v3.0.2) - 2024-12-11

### Commits

- [Fix] avoid a crash when the module is not an object [`51037e8`](https://github.com/es-shims/es-shim-api/commit/51037e8a0e67cb02821ab900f608a244f6f9b7aa)
- [Dev Deps] update `@arethetypeswrong/cli`, `@ljharb/tsconfig`, `@types/node`, `@types/tape` [`4b5810a`](https://github.com/es-shims/es-shim-api/commit/4b5810aae4d5d2f5f7818714f3060eaac4faa475)
- [Deps] update `object-inspect` [`28f8f60`](https://github.com/es-shims/es-shim-api/commit/28f8f60033dc2b56a621acd81fbd7e05dd71e04b)
- [readme] refer to extracted `call-bound` package [`59ffc02`](https://github.com/es-shims/es-shim-api/commit/59ffc02aec8fd4535f7ac6869e9dc83e94f0f797)

## [v3.0.1](https://github.com/es-shims/es-shim-api/compare/v3.0.0...v3.0.1) - 2024-09-20

### Commits

- [Dev Deps] update `@arethetypeswrong/cli`, `auto-changelog` [`5fcf97e`](https://github.com/es-shims/es-shim-api/commit/5fcf97e50c6293547b3de485c62480f1fa886799)
- [Fix] `multi`: do not assume bound vs unbound [`28bca87`](https://github.com/es-shims/es-shim-api/commit/28bca8781ec88bef59e2a677c4bd40f75fc126be)
- [Deps] update `tape` [`4a0c3cd`](https://github.com/es-shims/es-shim-api/commit/4a0c3cdbf5433790fa58181b0aabd4afc11c29b7)

## [v3.0.0](https://github.com/es-shims/es-shim-api/compare/v2.5.1...v3.0.0) - 2024-09-19

### Commits

- [Breaking] require node 20.17 [`84bb1ec`](https://github.com/es-shims/es-shim-api/commit/84bb1ec39e3231f6430a778b9155c67a362f1141)
- [Refactor] use `pargs` and ESM [`21e483c`](https://github.com/es-shims/es-shim-api/commit/21e483cf99f8da0f818f2953b496ecef8a9562c3)
- [New] add types [`3caf579`](https://github.com/es-shims/es-shim-api/commit/3caf579f4445723fd18c9b6f54f8f54c5910653e)
- [Docs] update shims list [`531e6f1`](https://github.com/es-shims/es-shim-api/commit/531e6f19b7778a6a240f0d8f1c70fcb44345eb13)
- [Breaking] condense some booleans into enum `type` arg [`d205d23`](https://github.com/es-shims/es-shim-api/commit/d205d23b982292d1de7a78d9cbcddd085289533d)
- [Breaking] remove expando properties from the index [`27975e1`](https://github.com/es-shims/es-shim-api/commit/27975e1be92e0f0ea70b05f255ce973899a2349c)
- [Deps] remove some unneeded packages [`64bb6cd`](https://github.com/es-shims/es-shim-api/commit/64bb6cdc05318155960a8fae698a85d49c2c957c)
- [Deps] update `semver` [`abd2974`](https://github.com/es-shims/es-shim-api/commit/abd2974ad15009e6265581a9fb67003a2fe42485)
- [Breaking] add `exports` [`f57bc0a`](https://github.com/es-shims/es-shim-api/commit/f57bc0a13ae8ff4ab34ef3a38f29e0ee5300c3eb)

## [v2.5.1](https://github.com/es-shims/es-shim-api/compare/v2.5.0...v2.5.1) - 2024-09-04

### Commits

- [Fix] ensure a bound index does not mutate the builtin [`568ddaf`](https://github.com/es-shims/es-shim-api/commit/568ddafdc41db47d6af45f612d062afd65ff6c96)
- [Fix] ensure bound shim is actually bound [`04ec735`](https://github.com/es-shims/es-shim-api/commit/04ec735db2d72fbf01fce9ebb00ac1de0c23f26f)
- [Deps] update `object-inspect`, `tape` [`eaf5581`](https://github.com/es-shims/es-shim-api/commit/eaf5581aed75be6bc7d400a08d4c5ad56f018555)
- [Tests] replace `aud` with `npm audit` [`bfc8156`](https://github.com/es-shims/es-shim-api/commit/bfc815654056cda075af18bb6ede688e96c38dbb)
- [Dev Deps] update `@ljharb/eslint-config` [`3ba4c80`](https://github.com/es-shims/es-shim-api/commit/3ba4c80ed850413af33a07870568597592617c03)

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
