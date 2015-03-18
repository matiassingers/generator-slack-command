# generator-slack-command [![Build Status](http://img.shields.io/travis/matiassingers/generator-slack-command.svg?style=flat-square)](https://travis-ci.org/matiassingers/generator-slack-command) [![Dependency Status](http://img.shields.io/gemnasium/matiassingers/generator-slack-command.svg?style=flat-square)](https://gemnasium.com/matiassingers/generator-slack-command)
> start a simple Slack slash command server

Includes support for [Heroku Button](https://blog.heroku.com/archives/2014/8/7/heroku-button);

## Install

```sh
$ npm install --global generator-slack-command
```


## Usage

```sh
$ yo slack-command
? What is the name of your Slack command? (will prepend `slack-`) time
? Please provide a short description for the project: slack command for getting time
? Default username for the incoming WebHook bot: time
? Default emoji for the incoming WebHook bot: :clock:
   create readme.md
   create license
   create package.json
   create .editorconfig
   create .gitignore
   create .jshintrc
   create index.js


I'm all done. Running npm install for you to install the required dependencies. If this fails, try running the command yourself.
```


## Projects
- [`slack-movie`](https://github.com/matiassingers/slack-movie)
- [`slack-currency`](https://github.com/matiassingers/slack-currency)


## License

MIT © [Matias Singers](http://mts.io)
