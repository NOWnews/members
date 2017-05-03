const gulp = require('gulp');
const mocha = require('gulp-mocha');
const del = require('del');
const babel = require('gulp-babel');
const gutil = require('gulp-util');

gulp.task('clean', function() {
    return del(['./build']);
});

gulp.task('complieEC6', ['clean'], function() {
    gulp.src(['./**/*.js', '!./gulpfile.js', '!./build/**/*', '!./node_modules/**/*'], {base: './'})
        .pipe(babel({ presets: ['es2015'] }))
        .on('error', gutil.log)
        .pipe(gulp.dest('./build'))
});

gulp.task('mocha', function() {
    gulp.doneCallback = function (err) {
        process.exit(err ? 1: 0);
    }
    return gulp.src([
        './build/test/api/member.js'
    ])
    .pipe(mocha({ timeout:2000 }));
});

gulp.task('build', ['complieEC6']);
gulp.task('default', ['build']);
gulp.task('test', ['mocha']);
