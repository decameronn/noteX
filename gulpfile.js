const { src, dest, parallel, series } = require('gulp');
const pug = require('gulp-pug');
const sourcemaps = require('gulp-sourcemaps');
const broswerSync = require('browser-sync').create();
const del = require('del');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');

const paths = {
  app: {
    pug: './app/*.pug',
    sass: './app/sass/*',
    js: './app/js/main.js',
    img: './app/img/',
    fonts: './app/fnt/'
  },
  dist: {
    public: './dist/',
  
    css: './dist/css/',
    js: './dist/js/',
    img: './dist/img/'
  }
};

// TODO Test and update as needed
function doBrowserSync(done) {
  broswerSync.init({ 
    server: { baseDir: './dist'}, port:3000 });
  done();
}
function doBrowserSyncReload(done) {
  broswerSync.reload();
  done();
}

function doHtml() {
  return src(paths.app.pug)
    .pipe(plumber())
    .pipe(pug())
    .pipe(dest(paths.dist.public))
    .pipe(broswerSync.stream());    
}

function doCss() {
  return src(paths.app.sass)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.dist.css))
    .pipe(broswerSync.stream());
}

function doJs() {
  return src(paths.app.js)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(dest(paths.dist.js))
    .pipe(broswerSync.stream());    
}

function clean() {
  return del('dist');
}

const build = series(clean, parallel(doHtml, doCss, doJs));


exports.doBrowserSync = doBrowserSync;
exports.doBrowserSyncReload = doBrowserSyncReload;

exports.doHtml = doHtml;
exports.doCss = doCss;
exports.clean = clean;
exports.doJs = doJs;

exports.build = build;
