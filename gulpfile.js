'use strict';

var gulp = require('gulp'),
  autoprefixer = require('autoprefixer'),
  browserSync = require('browser-sync').create(),
  concat = require('gulp-concat'),
  fileInclude = require('gulp-file-include'),
  plumber = require('gulp-plumber'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  imagemin = require('gulp-imagemin'),
  csso = require('gulp-csso'),
  htmlmin = require('gulp-html-minifier'),
  uglify = require('gulp-uglify'),
  clean = require('gulp-clean'),
  ftp = require( 'vinyl-ftp' );

gulp.task('html', function () {
  gulp.src(["src/**/*.html", "!src/fonts/**"])
    .pipe(plumber())
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@root'
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream());
})

gulp.task('style', function () {
  gulp.src(['src/sass/*.+(scss|sass)'])
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

gulp.task('script', function () {
  gulp.src(['src/js/*.js'])
    .pipe(plumber())
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@root'
    }))
    .pipe(gulp.dest('dist/js/'))
    .pipe(browserSync.stream());
})

gulp.task('images', function () {
  gulp.src(['src/images/**/*'])
    .pipe(plumber())
    .pipe(gulp.dest('dist/images/'))
})

gulp.task('move', function () {
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

  gulp.src(['src/favicons/**/*'])
    .pipe(gulp.dest('dist/favicons/'))
})

gulp.task('dev', ['html', 'style', 'script', 'images', 'move'], function () {

  browserSync.init({
    server: {
      baseDir: 'dist'
    },
    notify: true
  });

  gulp.watch("src/sass/**/*.+(scss|sass)", ['style']);
  gulp.watch("src/js/**/*.*", ['script']);
  gulp.watch("src/**/*.html", ['html']);
  gulp.watch("src/images/**/*.*", ['images']);
  gulp.watch("src/fonts/**/*.*", ['move']);
  gulp.watch("src/php/**/*.*", ['move']);
});


//TASKS FOR THE DEPLOY ===========================================================
gulp.task('b-html', function () {
  gulp.src(["src/**/*.html", "!src/fonts/**", "!src/components/**"])
    .pipe(plumber())
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@root'
    }))
    // .pipe(htmlmin({
    //   collapseWhitespace: true
    // }))
    .pipe(gulp.dest('app/'))
})

gulp.task('b-style', function () {
  gulp.src(['src/sass/*.+(scss|sass)'])
    .pipe(plumber())
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@root'
    }))
    .pipe(sass())
    // .pipe(csso())
    .pipe(gulp.dest('app/css/'))
});

gulp.task('b-script', function () {
  gulp.src(['src/js/*.js'])
    .pipe(plumber())
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@root'
    }))
    // .pipe(uglify())
    .pipe(gulp.dest('app/js/'))
});

gulp.task('b-images', function () {
  gulp.src(['src/images/**/*'])
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest('app/images/'))
});

gulp.task('b-move', function () {
  gulp.src(['src/fonts/**/*'])
    .pipe(plumber())
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@root'
    }))
    .pipe(gulp.dest('app/fonts/'))

  gulp.src(['src/php/**/*'])
    .pipe(plumber())
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@root'
    }))
    .pipe(gulp.dest('app/php/'))

  gulp.src(['src/.htaccess'])
    .pipe(gulp.dest('app/'))

  gulp.src(['src/favicons/**/*'])
    .pipe(gulp.dest('app/favicons/'))
});

gulp.task('build', ['b-html', 'b-style', 'b-script', 'b-images', 'b-move'], function () {

})