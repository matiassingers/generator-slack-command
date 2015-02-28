'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;

describe('slack command', function () {
  beforeEach(function (done) {
    helpers.run(path.join( __dirname, '../app'))
      .inDir(path.join( __dirname, './tmp'))
      .withOptions({ 'skip-install': true })
      .on('end', done);
  });

  it('creates expected default files', function () {
    var expected = [
      '.editorconfig',
      '.gitignore',
      '.jshintrc',

      'license',
      'readme.md',

      'package.json',

      'index.js'
    ];

    helpers.assertFiles(expected);
  });
});
