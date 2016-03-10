'use strict';

module.exports = function($$app, url) {
    $$app.get(url('/'), {
        handler: '$view',
        template: 'index',
    });
};
