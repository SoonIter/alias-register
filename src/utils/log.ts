function getIsLog() {
  return Boolean(process.env.HACK_RESOLVE_ALIAS);
}
function getPrefix() {
  const prefix = process.stdin.isTTY
    ? '\x1b[1m\x1b[34m  debug:HACK_RESOLVE_ALIAS  \x1b[39m\x1b[22m'
    : 'debug:HACK_RESOLVE_ALIAS';
  return prefix;
}

const isLog = getIsLog();
const prefix = getPrefix();

function log(...args: any) {
  if (isLog) {
    console.debug(prefix, ...args);
  }
}

export { log };
