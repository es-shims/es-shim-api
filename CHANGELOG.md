# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
