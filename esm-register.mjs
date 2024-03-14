import { createRequire } from 'node:module';
// eslint-disable-next-line node/file-extension-in-import
import { configLoader, initResolve } from './dist/esm/index.mjs';

const require = createRequire(import.meta.url);

const config = configLoader({
  cwd: process.cwd(),
  requireFn: require,
});
initResolve(config);

// eslint-disable-next-line node/file-extension-in-import
export * from './dist/esm/index.mjs';
