import { createRequire } from 'node:module';
// eslint-disable-next-line node/file-extension-in-import
import { configLoader, initResolve } from './dist/esm/index.mjs';

const require = createRequire(import.meta.url);

// Hook require() to CJS
require('./dist/cjs/index.js');

const config = configLoader({
  cwd: process.cwd(),
  requireFn: require,
});
initResolve(config);

/*
Hook import/import() to transform to ESM
Can be used in Node v12 to support dynamic `import()`
*/
// eslint-disable-next-line node/file-extension-in-import
export * from './dist/esm/index.mjs';
