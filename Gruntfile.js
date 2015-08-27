'use strict';


module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Watches files for changes and runs tasks based on the changed files
    watch: {
      coffee: {
        files: ['coffee/{,*/}*.{coffee,litcoffee,coffee.md}'],
        tasks: ['coffee:dist','uglify']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      }
    },
    uglify: {
      min:{
        options: {
          banner: '/*!\n * <%= pkg.name %> - compressed JS  - v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd HH:MM") %>)\n */\n',
          sourceMap: true
        },
        files: {
          'dest/dof.min.js': ['scripts/dof.js']
        }
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
    'uglify',
    'watch'
  ]);
};
