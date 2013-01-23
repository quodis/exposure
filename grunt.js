/*global module:false*/
module.exports = function(grunt) {

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
      dist: {
        src: ['<banner:meta.banner>', '<file_strip_banner:assets/js/vendor/jquery.min.js>', 'assets/js/helper.js', 'assets/js/plugins.js', 'assets/js/config.js', 'assets/js/app.js'],
        dest: 'assets/js/dist/app.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'assets/js/dist/app.min.js'
      }
    },
    globals: {
        jQuery: true,
        APP: true
    }
  });

  // Default task.
  grunt.registerTask('default', 'concat min');

};