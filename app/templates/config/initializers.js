'use strict';

const path = require('path'),
      reflekt = require('reflekt');

function initializer(name) {
    return require(path.resolve(__dirname, '..', 'initializers', name));
}

module.exports = [];
