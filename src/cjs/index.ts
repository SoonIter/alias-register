/* eslint-disable prefer-rest-params */
import Module from 'node:module';
import { configLoader, initResolve, log, oxcResolve } from '@/utils';
import { isCoreModule } from '@/utils/isCoreModule';

/**
 * Installs a custom module load function that can adhere to paths in tsconfig.
 * Returns a function to undo paths registration.
 */
function register(): void {
  log('init cjs config');
  const config = configLoader();
  initResolve(config ?? {});
  // Patch node's module loading
  // @ts-expect-error
  const originalResolveFilename = Module._resolveFilename;

  // @ts-expect-error
  Module._resolveFilename = function (
    request: string,
    parent: { id: string; path: string },
  ): string {
    if (isCoreModule(request)) {
      return originalResolveFilename.apply(this, arguments);
    }
    if (parent?.path) {
      const resolveResult = oxcResolve(parent.path, request);
      if (resolveResult?.path) {
        const modifiedArguments = [
          resolveResult?.path,
          ...[].slice.call(arguments, 1),
        ]; // Passes all arguments. Even those that is not specified above.
        return originalResolveFilename.apply(this, modifiedArguments);
      }
    }
    return originalResolveFilename.apply(this, arguments);
  };
}

register();
