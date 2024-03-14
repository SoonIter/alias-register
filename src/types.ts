import type { NapiResolveOptions } from 'oxc-resolver';

export type Config = NapiResolveOptions;

export interface RegisterParams {
  /**
   * Defaults to `--project` CLI flag or `process.cwd()`
   */
  cwd: string;
  /**
   * to load config file
   * require('alias.config.cjs')
   */
  requireFn: (path: string) => any;
}
