var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('js:clasic', function () {
    gulp.src('./src/*.js')
        .pipe(gulp.dest('./dist'));
});

gulp.task('js:min', function () {
    gulp.src('./src/*.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('less:classic', function () {
    gulp.src('./less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./dist'));
});

gulp.task('less:min', function () {
    gulp.src('./less/*.less')
        .pipe(less())
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('js', ['js:min', 'js:clasic']);
gulp.task('less', ['less:min', 'less:classic']);
gulp.task('default', ['less', 'js']);
