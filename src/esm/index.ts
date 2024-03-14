import type {
  ResolveFnOutput,
  ResolveHookContext,
  InitializeHook,
  LoadHook,
} from 'module';
import {
  isCoreModule,
  log,
  oxcResolve,
  configLoader,
  initResolve,
} from '@/utils';

export type MaybePromise<T> = T | Promise<T>;

export type NodeError = Error & {
  code: string;
};

type NextResolve = (
  specifier: string,
  context?: ResolveHookContext,
) => MaybePromise<ResolveFnOutput>;

type Resolve = (
  specifier: string,
  context: ResolveHookContext,
  nextResolve: NextResolve,
  recursiveCall?: boolean,
) => MaybePromise<ResolveFnOutput>;

export const initialize: InitializeHook = async data => {
  if (!data) {
    throw new Error(
      'alias-register must be loaded with --import instead of --loader\nThe --loader flag was deprecated in Node v20.6.0 and v18.19.0',
    );
  }
};

export const resolve: Resolve = async (specifier, context, nextResolve) => {
  if (isCoreModule(specifier)) {
    return nextResolve(specifier, context);
  }

  if (context.parentURL) {
    const resolveResult = oxcResolve(context.parentURL, specifier);
    log('resolveResult', resolveResult);
    if (resolveResult?.path) {
      return nextResolve(resolveResult?.path, context);
    }
  }
  return nextResolve(specifier, context);
};

export const load: LoadHook = async (url, context, nextLoad) => {
  // Take a resolved URL and return the source code to be evaluated.
  return nextLoad(url, context);
};

export { configLoader, initResolve };
