var gulp = require('gulp');

var browserSync = require('browser-sync');

gulp.task('default', function() {
    browserSync.init({
        files: '*',
        server: {
                baseDir: '.'
            }
    });
});
