module.exports = function(grunt) {

  grunt.config.set('browserSync', {
    dev: {
      bsFiles: {
        src: [
          '/css/*.css',
        ]
      },
      options: {
        watchTask: true,
      }
    }
  });

  grunt.loadNpmTasks('grunt-browser-sync');
};

