'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    constructor: function() {
        generators.Base.apply(this, arguments);
        this.opts = {};
    },

    prompting: {
        name: function() {
            var done = this.async();
            this.prompt({
                type: 'input',
                name: 'name',
                message: 'Your project name',
                default: this.appname, // Default to current folder name
            }, function(answers) {
                this.opts.name = answers.name;
                done();
            }.bind(this));
        },

        createDir: function () {
            var done = this.async();
            this.prompt({
                type: 'confirm',
                name: 'createDir',
                message: 'Would you like to create a new directory for your project?',
            }, function(answers) {
                this.opts.createDir = answers.createDir;
                done();
            }.bind(this));
        },
    },

    writing: {
        createDir: function() {
            if (this.opts.createDir) {
                this.destinationRoot(this.opts.name);
            }
        },

        writeFiles: function() {
            this.fs.copyTpl(
                this.templatePath('config/base.js'),
                this.destinationPath('config/base.js'));

            this.fs.copyTpl(
                this.templatePath('config/dev.js'),
                this.destinationPath('config/dev.js'));

            this.fs.copyTpl(
                this.templatePath('config/prod.js'),
                this.destinationPath('config/prod.js'));

            this.fs.copyTpl(
                this.templatePath('routes/main.js'),
                this.destinationPath('routes/main.js'));

            this.fs.copyTpl(
                this.templatePath('views/index.html'),
                this.destinationPath('views/index.html'));

            this.fs.copyTpl(
                this.templatePath('package.json'),
                this.destinationPath('package.json'), {
                    name: this.opts.name,
                });

            this.fs.copyTpl(
                this.templatePath('_gitignore'),
                this.destinationPath('.gitignore'));
        },
    },

    installDeps: function() {
        this.log('installing deps');
        this.npmInstall([
            'kj',
            'kj-cli',
            'kj-handler-view',
            'kj-logger-winston',
            'kj-renderer-static',
            'reflekt',
        ], {
            save: true,
        });
    },
});
