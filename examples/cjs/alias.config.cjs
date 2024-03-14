const path = require('path');

const config = {
  resolve: {
    alias: {
      lib: path.join(__dirname, 'lib'),
    },
  },
};

module.exports = config;
