/*global module:false*/
module.exports = function(grunt) {

  var CSS_SRC_DIR   = 'assets/css/src/',
      CSS_BUILD_DIR = 'assets/css/dist/',
      JS_SRC_DIR    = 'assets/js/src/',
      JS_BUILD_DIR  = 'assets/js/dist/';

  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '1.1.0',
      banner: '/*! Quodis Layers - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* http://layers.quodis.com/\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'Quodis; Licensed MIT */'
    },
    concat: {
      css: {
        src: CSS_SRC_DIR + '*.css',
        dest: CSS_BUILD_DIR + 'app.css'
      },
      js: {
        src: ['<banner:meta.banner>', '<file_strip_banner:' + JS_SRC_DIR + 'vendor/jquery.min.js>', JS_SRC_DIR + 'helper.js', JS_SRC_DIR + 'plugins.js', JS_SRC_DIR + 'config.js', JS_SRC_DIR + 'app.js'],
        dest: JS_BUILD_DIR + 'app.js'
      }
    },
    min: {
      js: {
        src: ['<banner:meta.banner>', '<config:concat.js.dest>'],
        dest: JS_SRC_DIR + 'app.min.js'
      }
    },
    cssmin: {
      css: {
        src: CSS_BUILD_DIR + 'app.css',
        dest: CSS_BUILD_DIR + 'app.min.css'
      }
    },
    globals: {
        jQuery: true,
        APP: true
    }
  });

  // Default task.
  grunt.registerTask('default', 'concat min cssmin');

  grunt.loadNpmTasks('grunt-css');

};