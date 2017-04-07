const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const BrowserSync = require('browser-sync');
const cssnano = require('cssnano');

const browserSync = BrowserSync.create();

const dirs = {
  root: '.',
  sass: './scss',
  style: './style',
  script: './script'
};

const sassPaths = {
  app: `${dirs.sass}/main.scss`,
  dest: `${dirs.style}`
};

gulp.task('styles', () => {
  return gulp.src(sassPaths.app)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([require('autoprefixer'), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(sassPaths.dest));
});


// Static Server + watching scss/html files
gulp.task('serve', ['styles'], () => {
  browserSync.init({
    server: dirs.root
  });

  gulp.watch(`${dirs.sass}/**/*.scss`, ['styles']);
  gulp.watch([
    `${dirs.root}/*.html`,
    `${dirs.style}/**/*.css`,
    `${dirs.script}/**/*.js`
  ]).on('change', browserSync.reload);
});

//Watch task
gulp.task('default', ['serve']);
