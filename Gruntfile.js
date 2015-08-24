'use strict';


module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      coffee: {
        files: ['<%= config.app %>/scripts/{,*/}*.{coffee,litcoffee,coffee.md}'],
        tasks: ['coffee:dist']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      }
    },

    // Compiles CoffeeScript to JavaScript
    coffee: {
      dist: {
        files: [{
          expand: true,
          cwd: 'coffee',
          src: '{,*/}*.{coffee,litcoffee,coffee.md}',
          dest: 'scripts',
          ext: '.js'
        }]
      }
    }

  });


  grunt.registerTask('default', [
    'coffee:dist',
    'watch'
  ]);
};
