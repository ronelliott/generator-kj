'use strict';

const path = require('path'),
      reflekt = require('reflekt');

function routes(base) {
    let paths = [ __dirname, '..', 'routes' ];

    for (let i = 1; i < arguments.length; i++) {
        paths.push(arguments[i]);
    }

    let mod = require(path.resolve.apply(null, paths));

    return function($$caller, callback) {
        $$caller(mod, null, {
            callback: callback,
            url: function(sub) {
                return base + sub;
            }
        });

        !reflekt.has(mod, 'callback') && callback();
    };
}

module.exports = [
    routes('/', 'main'),
];
