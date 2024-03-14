# alias-register

<a href="https://www.npmjs.com/package/alias-register"><img src="https://img.shields.io/npm/v/alias-register.svg?sanitize=true" alt="Version"></a>

## Get Started

```js
// alias.config.cjs
const path = require('path');

const config = {
  resolve: {
    alias: {
      lib: path.join(__dirname, 'lib'),
    },
  },
};

module.exports = config;
```

```sh
node --loader alias-register ./main.js
# or Node.js v20.6.0 and above
node --import alias-register ./main.js
```

### Other Usages

#### ESM only loader

If you only need to add TypeScript support in a Module context, you can use the ESM loader:

##### Node.js v20.6.0 and above

```sh
node --import alias-register/esm ./main.js
```

##### Node.js v20.5.1 and below

```sh
node --loader alias-register/esm ./main.js
```

#### CommonJS only loader

If you only need to add TypeScript & ESM support in a CommonJS context, you can use the CJS loader:

```sh
node --require alias-register/cjs ./main.js
```
