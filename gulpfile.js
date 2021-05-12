const { src, dest, parallel, series, watch } = require('gulp');
// const pug = require('gulp-pug-3');
const sourcemaps = require('gulp-sourcemaps');
const broswerSync = require('browser-sync').create();
const del = require('del');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const cachebust = require('gulp-cache-bust');
const concat = require('gulp-concat');

const paths = {
  app: {
    html: './app/html/*',
    css: './app/css/*',
    js: './app/js/*',
    img: './app/img/*',
    fnt: './app/fnt/*'
  },
  dist: {
    public: './dist/',
    css: './dist/css/',
    js: './dist/js/',
    img: './dist/img/'
  }
};


function doHtml() {
  return src(paths.app.html)
    .pipe(plumber())
    // .pipe(concat('index.html'))
    .pipe(dest(paths.dist.public))
    .pipe(broswerSync.stream());
}

function doCss() {
  return src(paths.app.css)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.dist.css))
    .pipe(broswerSync.stream());
}

function doJs() {
  return src(paths.app.js)
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(uglify())
    .pipe(dest(paths.dist.js))
    .pipe(broswerSync.stream());
}

function doImg() {
  return src(paths.app.img)
    .pipe(imagemin())
    .pipe(dest(paths.dist.img));
}

function doCacheBust() {
  return src('./dist/**/*.html')
    .pipe(cachebust({ type: 'timestamp' }))
    .pipe(dest('./dist'));
}

function cleanProject() {
  return del(paths.dist.public);
}

const buildProject = series(
  cleanProject, doCacheBust, 
  parallel(doHtml, doCss, doJs, doImg));

function watchProject(done) {
  broswerSync.init({ 
    server: { baseDir: './dist' }, port: 3000 });

  watch('./app/html/**/*.html', doHtml);
  watch('./app/css/**/*css', doCss);
  watch('./app/js/**/*js', doJs);
  watch('./app/img/**/*', doImg);
    
  broswerSync.reload();
  done();
}

exports.cleanProject = cleanProject;
exports.devBuild = series(buildProject, watchProject);
