const { src, dest, parallel, series, watch } = require('gulp');
const pug = require('gulp-pug');
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

const paths = {
  app: {
    pug: './app/pug/index.pug',
    sass: './app/sass/*',
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

const buildProject = series(cleanProject, doCacheBust, parallel(doHtml, doCss, doJs, doImg));

function watchProject(done) {
  broswerSync.init({ 
    server: { baseDir: './dist' }, port: 3000 });

  watch('./app/pug/**/*.pug', doHtml);
  watch('./app/sass/**/*sass', doCss);
  watch('./app/js/**/*js', doJs);
  watch('./app/img/**/*', doImg);
    
  broswerSync.reload();
  done();
}

// debug
exports.doHtml = doHtml;
exports.doCss = doCss;
exports.doJs = doJs;
exports.doImg = doImg;
exports.doCacheBust = doCacheBust;
exports.cleanProject = cleanProject;
exports.buildProject = buildProject;
exports.watchProject = watchProject;

exports.default = series(buildProject, watchProject);
