import { ResolverFactory } from 'oxc-resolver';
import { log } from './log';
import type { Config } from '@/types';

let resolver: null | ResolverFactory = null;

function format(obj: Record<string, string | string[]>) {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      obj[key] = [value];
    }
  }
}

export const initResolve = (config: Config) => {
  if (!resolver) {
    log('init oxc-resolver', config);

    if ((config as any)?.resolve !== undefined) {
      // @ts-expect-error
      format(config?.resolve?.alias);
      log('init oxc-resolver normalized config', config);
      resolver = new ResolverFactory((config as any).resolve);
    } else {
      // @ts-expect-error
      format(config.alias);
      log('init oxc-resolver normalized config', config);
      resolver = new ResolverFactory(config);
    }
  }
};

export const oxcResolve = (path: string, request: string) => {
  log('oxcResolve', resolver, 'path:', path, 'request:', request);
  return resolver?.sync(path, request) ?? { error: `resolver is ${resolver}` };
};
