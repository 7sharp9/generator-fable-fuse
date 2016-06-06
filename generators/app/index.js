'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var uuid = require('uuid');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('fable-fuse') + ' generator!'
    ));

    var prompts = [{
      type: 'string',
      name: 'projectName',
      message: 'What is the project name?'
    }, {
      type: 'string',
      name: 'githubUser',
      message: 'What\'s your Github username?',
      default: this.user.git.name(),
      store: true
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
        this.templatePath('src/ApplicationName.fs'),
        this.destinationPath('src/' + this.props.projectName + '.fs'),
        {projectName: this.props.projectName}
      );
    this.fs.copyTpl(
        this.templatePath('src/ApplicationName.fsproj'),
        this.destinationPath('src/' + this.props.projectName + '.fsproj'),
        {projectName: this.props.projectName,
          guid: uuid.v4()}
      );
    this.fs.copy(
        this.templatePath('src/fableconfig.json'),
        this.destinationPath('src/fableconfig.json')
      );

    this.fs.copyTpl(
        this.templatePath('build.sh'),
        this.destinationPath('build.sh'),
        {projectName: this.props.projectName}
      );

    this.fs.copyTpl(
        this.templatePath('build.bat'),
        this.destinationPath('build.bat'),
        {projectName: this.props.projectName}
      );

    this.fs.copy(
        this.templatePath('.gitignore'),
        this.destinationPath('.gitignore')
      );

    this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'),
        {projectName: this.props.projectName,
         githubUser: this.props.githubUser}
      );
    this.fs.copy(
        this.templatePath('App/ApplicationName.unoproj'),
        this.destinationPath('App/' + this.props.projectName + '.unoproj')
      );
    this.fs.copyTpl(
        this.templatePath('App/MainView.ux'),
        this.destinationPath('App/MainView.ux'),
        {projectName: this.props.projectName}
      );
  },

  install: function () {
    this.installDependencies();
  }
});
