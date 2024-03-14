import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

// Hook require() to CJS
require('./cjs-register');

/*
Hook import/import() to transform to ESM
Can be used in Node v12 to support dynamic `import()`
*/
// eslint-disable-next-line node/file-extension-in-import
export * from './esm-register.mjs';
