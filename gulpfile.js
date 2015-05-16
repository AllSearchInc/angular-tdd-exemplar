var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

/* build our app to the dist folder */
gulp.task('default',function(){
	console.log("King to B6.");
});

/* run all tests */
gulp.task('test',function(){
	console.log("Running tests.");
});

/* serve the app */
gulp.task('serve', function () {
  browserSync({
    notify: false,
    port: 8080,
    server: {
      baseDir: ['app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    'app/*.html',
    'app/scripts/**/*.js',
  ]).on('change', reload);
});

/* serve the output of the test runner (for debugging) */
gulp.task('serve-test',function(){

})