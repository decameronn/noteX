const { src, dest } = require('gulp');
const gulp = require('gulp');
const pug = require('pug');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const paths = {
  app: {
    pug: './app/*',
    scss: './app/scss/*',
    js: './app/js/*',
    img: './app/img/*'
  },
  dist: {
    html: './dist/hmtl/',
    css: './dist/css/',
    js: './dist/js',
    img: './dist/img'
  }
};


function doHtml(done) {
  return src(paths.app.pug)
    .pipe(pug())
    .pipe(dest(paths.app.html))
    .pipe(browserSync.stream()),
    done();
}

function doCss(done) {
  // tbu
}

exports.doHtmlTask = doHtml;