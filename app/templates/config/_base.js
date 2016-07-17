'use strict';

module.exports = {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3000,
    modules: [
        require('kj-renderer-static')({
            enabled: true,
            path: 'views',
        }),
        require('./handlers'),
        require('./resources'),
        require('./services'),
        require('kj-logger-winston')({
            loggers: {
                app: {
                    enabled: true,
                    inject: 'log',
                    options: {
                        console: {
                            level: 'debug',
                            colorize: true,
                            label: 'app'
                        }
                    }
                },
                http: {
                    enabled: true,
                    inject: 'log.http',
                    options: {
                        console: {
                            level: 'debug',
                            colorize: true,
                            label: 'http'
                        }
                    }
                }
            },
            app: {
                enabled: true,
                format: '{message}',
                logger: 'log'
            },
            request: {
                enabled: true,
                format: '{method} - {status} - {duration}ms - {url}',
                logger: 'log.http',
                slow: {
                    enabled: true,
                    format: '[pending] {method} - {duration}ms - {url}'
                }
            }
        }),
        require('./initializers'),
        require('./routes'),
    ],
};
