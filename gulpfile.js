const { src, dest, parallel, series } = require('gulp');
const gulp = require('gulp');
const pug = require('gulp-pug');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const del = require('del');
const sass = require('gulp-sass');

const paths = {
  app: {
    pug: './app/pug/*',
    sass: './app/sass/*',
    js: './app/js/*',
    img: './app/img/*',
    fonts: './app/fnt/*'
  },
  dist: {
    html: './dist/html/',
    css: './dist/css/',
    js: './dist/js/',
    img: './dist/img/'
  }
};


function doHtml() {
  return src(paths.app.pug)
    .pipe(pug())
    .pipe(dest(paths.dist.html));
}

function doCss() {
  return src(paths.app.sass)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.dist.css))
    .pipe(browserSync.stream());
}

function clean() {
  return del('dist');
}

// just testing out
const test = parallel(doHtml, doCss);
const build = series(test, clean);

exports.doHtml = doHtml;
exports.doCss = doCss;
exports.clean = clean;

exports.build = build;
