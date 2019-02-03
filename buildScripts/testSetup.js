// This file isn't transpiled, so must CommonJS and ES5

// Register babel to traspile before out tests run.
require('babel-register')();

// Disable webpack features that Mocha dowsn't understand.
require.extensions['.css'] = function() {};
