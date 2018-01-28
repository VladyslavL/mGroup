'use strict';

var gulp = require('gulp'),
    autoprefixer = require('autoprefixer'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    fileInclude = require('gulp-file-include'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    image = require('gulp-image'),
    cssco = require('gulp-csso'),
    htmlmin = require('gulp-html-minifier'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean');


gulp.task('html', function() {
  gulp.src(["src/**/*.html", "!src/fonts/**", "!src/components/**"])
      .pipe(plumber())
      .pipe(fileInclude({
        prefix: '@@',
        basepath: '@root'
      }))
      .pipe(gulp.dest('dist/'))
      .pipe(browserSync.stream());
})

gulp.task('style', function () {
  gulp.src(['src/sass/*.scss'])
      .pipe(plumber())
      .pipe(fileInclude({
        prefix: '@@',
        basepath: '@root'
      }))
      .pipe(sourcemaps.init())
      .pipe(sass())  
      .pipe(sourcemaps.write(''))
      .pipe(gulp.dest('dist/css/'))
      .pipe(browserSync.stream());
});

gulp.task('script', function() {
  gulp.src(['src/js/*.js'])
      .pipe(plumber())
      .pipe(fileInclude({
        prefix: '@@',
        basepath: '@root'
      }))
      .pipe(gulp.dest('dist/js/'))
      .pipe(browserSync.stream());
})

gulp.task('images', function(){
  gulp.src(['src/images/**/*'])
      .pipe(plumber())
      .pipe(gulp.dest('dist/images/'))
})

gulp.task('move', function(){
  gulp.src(['src/fonts/**/*'])
      .pipe(plumber())      
      .pipe(fileInclude({
        prefix: '@@',
        basepath: '@root'
      }))
      .pipe(gulp.dest('dist/fonts/'))

    gulp.src(['src/php/**/*'])
    .pipe(plumber())      
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@root'
    }))
    .pipe(gulp.dest('dist/php/'))
    .pipe(browserSync.stream());    

    gulp.src(['src/.htaccess'])
    .pipe(gulp.dest('dist/'))
})

gulp.task('dev', ['html','style','script','images','move'], function() {

  browserSync.init({
      server: "dist"
  });

  gulp.watch("src/sass/**/*.scss", ['style']);
  gulp.watch("src/js/**/*.*", ['script']);
  gulp.watch("src/**/*.html", ['html']);
  gulp.watch("src/images/**/*.*", ['images']);
  gulp.watch("src/fonts/**/*.*", ['move']);
  gulp.watch("src/php/**/*.*", ['move']);
});


//TASKS FOR THE DEPLOY===========================================================
gulp.task('d-html', function() {
  gulp.src(["src/**/*.html", "!src/fonts/**", "!src/components/**"])
      .pipe(plumber())  
      .pipe(fileInclude({
        prefix: '@@',
        basepath: '@root'
      }))
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('deploy/'))
})

gulp.task('d-style', function () {
  gulp.src(['src/sass/*.scss'])
      .pipe(plumber())
      .pipe(fileInclude({
        prefix: '@@',
        basepath: '@root'
      }))
      .pipe(sass())
      .pipe(cssco())
      .pipe(gulp.dest('deploy/css/'))
});

gulp.task('d-script', function() {
  gulp.src(['src/js/*.js'])
      .pipe(plumber())
      .pipe(fileInclude({
        prefix: '@@',
        basepath: '@root'
      }))
      .pipe(uglify())
      .pipe(gulp.dest('deploy/js/'))
})

gulp.task('d-images', function(){
  gulp.src(['src/images/**/*'])
      .pipe(plumber())
      .pipe(image())
      .pipe(gulp.dest('deploy/images/'))
})

gulp.task('d-move', function(){
  gulp.src(['src/fonts/**/*'])
      .pipe(plumber())
      .pipe(fileInclude({
        prefix: '@@',
        basepath: '@root'
      }))
      .pipe(gulp.dest('deploy/fonts/'))

    gulp.src(['src/php/**/*'])
    .pipe(plumber())
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@root'
    }))
    .pipe(gulp.dest('deploy/php/'))

    gulp.src(['src/.htaccess'])
    .pipe(gulp.dest('deploy/'))
})

gulp.task('deploy', ['d-html','d-style','d-script', 'd-images', 'd-move'], function(){

})