# `new URL()` with a `javascript/auto` rule

Rspack 2.3.2 and webpack 5.112.2 both read `webpack.config.cjs`. The entry
calls `new URL('./source.js', import.meta.url)` to get a URL for the original
JavaScript source file.

## Reproduce

Use Node.js 20.19+ (20.x) or 22.12+, pnpm 10.34.4, and a POSIX shell.
Each script builds and runs the bundle.

```sh
pnpm install --frozen-lockfile
pnpm run rspack
pnpm run webpack
```

These scripts set `JS_AUTO=1`, which enables the following rule.

```js
{ test: /\.js$/, type: 'javascript/auto' }
```

The expected result is a standalone `source.js` and a URL pointing to it.
Both builds succeed and emit only `bundle.cjs`. The URL printed by each bundle
ends in `/with-rule/[object%20Module]`.

## Compare without the rule

The baseline scripts set `JS_AUTO=0`.

```sh
pnpm run rspack:baseline
pnpm run webpack:baseline
cmp source.js dist/rspack/baseline/source.js
cmp source.js dist/webpack/baseline/source.js
```

Both bundles print a `file:` URL ending in `/baseline/source.js`. The emitted
`source.js` is byte-for-byte identical to the original in both builds.

The checked-in [dist directory](dist/) contains the output of all four builds.
