import Module from 'node:module';

function getCoreModules(
  builtinModules: string[] | undefined,
): Record<string, boolean> {
  // eslint-disable-next-line no-param-reassign
  builtinModules = builtinModules || [
    'assert',
    'buffer',
    'child_process',
    'cluster',
    'crypto',
    'dgram',
    'dns',
    'domain',
    'events',
    'fs',
    'http',
    'https',
    'net',
    'os',
    'path',
    'punycode',
    'querystring',
    'readline',
    'stream',
    'string_decoder',
    'tls',
    'tty',
    'url',
    'util',
    'v8',
    'vm',
    'zlib',
  ];

  const coreModules: { [key: string]: boolean } = {};
  for (const module of builtinModules) {
    coreModules[module] = true;
  }

  return coreModules;
}

let coreModules: null | Record<string, boolean> = null;

const isCoreModule = (moduleName: string) => {
  if (moduleName.startsWith('node:')) {
    return true;
  }
  if (!coreModules) {
    coreModules = getCoreModules(Module.builtinModules);
  }
  return coreModules.hasOwnProperty(moduleName);
};

export { isCoreModule };
