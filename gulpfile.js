const gulp = require('gulp');
const mocha = require('mocha');

gulp.task('mocha', () => {
    gulp.doneCallback = (err) => {
        process.exit(err ? 1: 0);
    }
    return gulp.src([
        'test/member.js'
    ])
    .pipe(mocha({ timeout: 2000 }));
});

gulp.task('test', ['mocha']);
