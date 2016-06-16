'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
    prompting: function () {
        // Have Yeoman greet the user.
        this.log(yosay(
                'Welcome to the ' + chalk.red('Wordsmith theme') + ' generator!'
                ));

        var prompts = [
            {
                type: 'input',
                name: 'theme',
                message: 'Theme Name',
                default: "Sample theme" // Default to current folder name
            },
            {
                type: 'input',
                name: 'author',
                message: 'Author',
                default: "Sample Person <sample@sampe.com>" // Default to current folder name
            },
            {
                type: 'input',
                name: 'package',
                message: 'Package Name ' + chalk.red('(Letters only)') + ' ',
                default: "SamplePackage" // Default to current folder name
            },
            {
                type: 'input',
                name: 'vendor',
                message: 'Vendor Name ' + chalk.red('(Letters only)') + ' ',
                default: "SampleVendor" // Default to current folder name
            },
            {
                type: 'confirm',
                name: 'cool',
                message: 'Ready to install?'
            }];

        return this.prompt(prompts).then(function (props) {
            // To access props later use this.props.someAnswer;
            this.props = props;
        }.bind(this));
    },
    writing: function () {
        this.fs.copy(
                this.templatePath('Structure'),
                this.destinationPath()
                );
        this.fs.copyTpl(
                this.templatePath('Instance.php'),
                this.destinationPath('Instance.php'),
                {
                    vendor: this.props.vendor,
                    package: this.props.package
                }
        );
        this.fs.copyTpl(
                this.templatePath('functions.php'),
                this.destinationPath('functions.php'),
                {
                    vendor: this.props.vendor,
                    package: this.props.package
                }
        );
        this.fs.copyTpl(
                this.templatePath('bower.json'),
                this.destinationPath('bower.json'),
                {
                    vendor: this.props.vendor,
                    package: this.props.package
                }
        );
        this.fs.copy(
                this.templatePath('_cache'),
                this.destinationPath('_cache')
                );
        this.fs.copyTpl(
                this.templatePath('composer.json'),
                this.destinationPath('composer.json'),
                {
                    vendor: this.props.vendor,
                    package: this.props.package
                }
        );
        this.fs.copyTpl(
                this.templatePath('style.css'),
                this.destinationPath('style.css'),
                {
                    theme: this.props.theme,
                    author: this.props.author
                }
        );
        this.fs.copyTpl(
                this.templatePath('package.json'),
                this.destinationPath('package.json'),
                {
                    package: this.props.package
                }
        );
        this.fs.copyTpl(
                this.templatePath('Environment/Views/View.php'),
                this.destinationPath('Environment/Views/View.php'),
                {
                    vendor: this.props.vendor,
                    package: this.props.package
                }
        );
    },
    install: function () {
        this.installDependencies();
        this.spawnCommand('composer', ['install']);
    }
});
