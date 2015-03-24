'use strict';

var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  del = require('del'),
  runSequence = require('run-sequence'),
  connect = $.connectMulti,
  wiredep = require('wiredep').stream;
var livereload = require('gulp-livereload');

gulp.task('clean', function(cb) {
  del(['dist/'], cb);
});

gulp.task('robots', function() {
  gulp.src('src/robots.txt')
  .pipe(gulp.dest('dist/'));
});

gulp.task('static', function() {
  gulp.src('src/static/*')
  .pipe(gulp.dest('dist/static/'));
});

gulp.task('config', function() {
  gulp.src('src/config/*')
  .pipe(gulp.dest('dist/config/'));
});

gulp.task('fonts', function() {
  gulp.src(
    ['src/bower_components/bootstrap/dist/fonts/*',
      'src/bower_components/font-awesome/fonts/*'
    ])
    .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('images', function() {
  gulp.src('src/assets/images/*')
  .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('styles', function() {
  gulp.src('src/assets/styles/*.css')
  .pipe(gulp.dest('dist/assets/styles'));
});

gulp.task('base', ['robots', 'static', 'config', 'fonts', 'images', 'styles']);

gulp.task('scripts', function() {
  return gulp.src(['src/app/app.js'])
  .pipe($.browserify({
    transform: ['babelify', 'reactify'],
    extensions: ['.jsx']
  }))
  .on('prebundle', function(bundler) {
    bundler.require('react');
  })
  .pipe(gulp.dest('dist/scripts/'))
  .pipe($.size());
});

gulp.task('html', ['base', 'scripts'], function() {
  var assets = $.useref.assets();
  return gulp.src('src/*.html')
  .pipe(assets)
  .pipe(assets.restore())
  .pipe($.useref())
  .pipe(gulp.dest('dist'))
  .pipe($.size());
});

gulp.task('compress', ['html'], function() {
  gulp.src(['dist/scripts/app.js', 'dist/scripts/vendor.js'])
  .pipe($.uglify())
  .pipe(gulp.dest('dist/scripts/'));
});

gulp.task('wiredep', function() {
  gulp.src('src/*.html')
  .pipe(wiredep({
    directory: 'src/bower_components',
    ignorePath: 'src/'
  }))
  .pipe(gulp.dest('src'));
});

gulp.task('refresh', ['scripts'], function() {
  return gulp.src('dist/scripts/app.js')
  .pipe(livereload());
});

gulp.task('watch', ['html'], function() {
  livereload.listen();
  gulp.watch([
    'src/*.html',
    'src/assets/styles/*.css',
    'src/assets/images/*'
  ], function(event) {
    return gulp.src(event.path)
    .pipe(livereload());
  });

  gulp.watch(['src/app/*.js', 'src/app/**/*.js'], ['refresh']);
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('dist', function(cb) {
  runSequence('clean', 'compress', cb);
});
