var gulp = require('gulp');
var rename = require('gulp-rename');
var babel = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('scripts', function(){
    browserify('./src/index.js')
    .transform(babel)
    .bundle()
    .pipe(source('index.js'))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('public'))
}),

gulp.task('angularjs', function(){
    browserify('./src/angular.js')
    .transform(babel)
    .bundle()
    .pipe(source('angular.js'))
    .pipe(rename('ng-app.js'))
    .pipe(gulp.dest('public'))
})

gulp.task('default', ['scripts', 'angularjs']);