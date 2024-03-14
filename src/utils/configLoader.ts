import { getConfigFilePath } from './getConfigFilePath';
import { log } from './log';
import { Config, RegisterParams } from '@/types';

let config: null | Config = null;

export function configLoader(
  params: Required<RegisterParams> = { cwd: process.cwd(), requireFn: require },
): Config {
  const { cwd, requireFn } = params;

  const existConfigFilePath = getConfigFilePath(cwd);

  log('load config from', existConfigFilePath);
  if (!config) {
    config = requireFn(existConfigFilePath) ?? {};
  }
  return config!;
}
