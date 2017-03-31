const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const BrowserSync = require('browser-sync');

const browserSync = BrowserSync.create();

const dirs = {
  root: '.',
  sass: './scss',
  style: './style'
};

const sassPaths = {
  app: `${dirs.sass}/main.scss`,
  dest: `${dirs.style}`
};

gulp.task('styles', () => {
  return gulp.src(sassPaths.app)
    .pipe(sourcemaps.init())
    .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(sassPaths.dest))
    .pipe(browserSync.stream());;
});


// Static Server + watching scss/html files
gulp.task('serve', ['styles'], () => {
  browserSync.init({
    server: dirs.root
  });

  gulp.watch(`${dirs.sass}/**/*.scss`, ['styles']);
  gulp.watch(`${dirs.root}/*.html`).on('change', browserSync.reload);
});

//Watch task
gulp.task('default', ['serve']);
