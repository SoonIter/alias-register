import { join } from 'node:path';
import { existsSync } from 'node:fs';

const CONFIG_FILE_NAME = 'alias.config';
const CONFIG_FILE_EXTENSIONS = ['.js', '.cjs'];

let configFilePath: string | null = null;

function getConfigFilePath(cwd: string) {
  let existConfigFilePath: null | string = null;
  for (const extension of CONFIG_FILE_EXTENSIONS) {
    const filename = CONFIG_FILE_NAME + extension;
    const filepath = join(cwd, filename);
    if (existsSync(filepath)) {
      existConfigFilePath = filepath;
      break;
    }
  }

  if (existConfigFilePath === null) {
    throw new Error(`${CONFIG_FILE_NAME}.js not found`);
  }
  if (!configFilePath) {
    configFilePath = existConfigFilePath;
  }
  return configFilePath;
}

export { getConfigFilePath };
