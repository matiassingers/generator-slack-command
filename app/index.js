'use strict';

var util = require('util');
var path = require('path');
var shell = require('shelljs');
var yeoman = require('yeoman-generator');

var SlackCommand = module.exports = function SlackCommand(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({
      skipInstall: options['skip-install'],
      bower: false
    });
  });

  this.pkg = require('../package.json');

  this.name = this.user.git.name();
  this.email = this.user.git.email();

  this.website = shell.exec('git config --get user.website', { silent: true }).output.trim();

  this.githubUsername = void 0;
  this.user.github.username(function(err, username){
    this.githubUsername = username;
  }.bind(this));
};

util.inherits(SlackCommand, yeoman.generators.Base);

SlackCommand.prototype.prompting = function prompting() {
  var done = this.async();

  var prompts = [{
    name: 'github',
    message: 'What is your GitHub username?',
    when: function(){
      return this.githubUsername;
    }
  }, {
    name: 'commandName',
    message: 'What is the name of your Slack command? (will prepend `slack-`)',
    default: path.basename(process.cwd())
  }, {
    name: 'description',
    message: 'Please provide a short description for the project'
  }, {
    name: 'username',
    message: 'Default username for the incoming WebHook bot:'
  }, {
    name: 'emoji',
    message: 'Default emoji for the incoming WebHook bot:'
  }];

  this.prompt(prompts, function(props) {
    this.githubUsername = props.github || this.githubUsername;

    if(props.commandName.indexOf('slack-')) {
      this.moduleName = props.commandName;
      this.commandName = props.commandName.replace('slack-', '');
    } else {
      this.commandName = props.commandName;
      this.moduleName = 'slack-' + props.commandName;
    }

    this.description = props.description;

    this.username = props.username;
    this.emoji = props.emoji;

    done();
  }.bind(this));
};

SlackCommand.prototype.info = function info() {
  if(!this.website) {
    this.website = this.githubUsername ? 'https://github.com/' + this.githubUsername : 'https://github.com/';
    this.log('\n\nCouldn\'t find your website in git config under \'user.website\'');
    this.log('Defaulting to Github url: ' + this.website);
  }
};

SlackCommand.prototype.project = function project(){
  this.template('readme.md', 'readme.md');

  this.template('license', 'license');

  this.template('_package.json', 'package.json');
  this.template('editorconfig', '.editorconfig');
  this.template('gitignore', '.gitignore');
  this.template('jshintrc', '.jshintrc');
};

SlackCommand.prototype.app = function app(){
  this.template('index.js', 'index.js');
};
