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
