'use strict';

var gulp = require('gulp'),
    autoprefixer = require('autoprefixer'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    fileInclude = require('gulp-file-include'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');


gulp.task('html', function() {
  gulp.src("./src/**/*.html")
    .pipe(plumber())
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@root'
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
})

gulp.task('style', function () {
  gulp.src('./src/sass/**/*.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  // .pipe(autoprefixer({
  //   browsers: ['last 2 versions'],
  //   cascade: false
  // }))
  .pipe(sass())  
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./dist/css/'))
  .pipe(browserSync.stream());
});

gulp.task('script', function() {
  gulp.src(['./src/**/*.js'])
    .pipe(plumber())
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browserSync.stream());
})

gulp.task('serve', ['html','style','script'], function() {

  browserSync.init({
      server: "./dist"
  });

  gulp.watch("./src/sass/**/*.scss", ['style']);
  gulp.watch("./src/**/*.html", ['html']);
});

// gulp.task('default', function () {
//   gulp.watch('./src/*.html', ['html']);
//   gulp.watch('./src/sass/**/*.scss', ['style']);
//   gulp.watch('./src/**/*.js', ['scripts']);
// });