var gulp = require('gulp');
var sass =  require('gulp-sass');
var rename = require('gulp-rename');
var babel = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('assets', function () {
	gulp
		.src('assets/*') //glob
		.pipe(gulp.dest('public/img'));
})

gulp.task('styles', function(){
  gulp
    .src('./src/index.scss')
		.pipe(sass())
		.pipe(rename('app.css'))
		.pipe(gulp.dest('public'));

})

gulp.task('stylesLeaflet', function(){
  gulp
    .src('./src/leaflet/leaflet.css')
		.pipe(sass())
		.pipe(rename('leaflet.css'))
		.pipe(gulp.dest('public'));

})

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

gulp.task('leafletjs', function(){
    browserify('./src/leaflet/leaflet.js')
    .transform(babel, { compact: false })
    .bundle()
    .pipe(source('leaflet.js'))
    .pipe(rename('ng-leaflet.js'))
    .pipe(gulp.dest('public'))
})

gulp.task('leafletjs-directive', function(){
    browserify('./src/leaflet/angular-leaflet-directive.min.js')
    .transform(babel)
    .bundle()
    .pipe(source('angular-leaflet-directive.min.js'))
    .pipe(rename('ng-leaflet-directive.js'))
    .pipe(gulp.dest('public'))
})
gulp.task('default', ['assets', 'styles', 'stylesLeaflet', 'scripts', 'angularjs', 'leafletjs', 'leafletjs-directive']);