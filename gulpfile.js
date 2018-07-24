
var gulp = require('gulp'),
  autoprefixer = require('autoprefixer'),
  changed = require('gulp-changed'),
  cssmin = require('gulp-cssmin'),
  del = require('del'),
  exec = require('child_process').exec,
  gulpngc = require('gulp-ngc'),
  fs = require("fs"),
  htmlMinifier = require('html-minifier'),
  lessCompiler = require('gulp-less'),
  // ngc = require('@angular/compiler-cli/src/main').main,
  path = require('path'),
  postcss = require('postcss'),
  replace = require('gulp-replace'),
  rename = require('gulp-rename');
  sourcemaps = require('gulp-sourcemaps'),
  stylelint = require('gulp-stylelint'),
  stylus = require('stylus');

var appSrc = 'src';
var libraryBuild = 'build';
var libraryDist = 'dist';
var demoDist = 'dist-demo';
var watchDist = 'dist-watch';
var globalExcludes = [
  '!./**/demo.*',
  '!./**/demo/**',
  '!./**/example',
  '!./**/example/**',
  '!./**/tree-list/**'
];

/**
 * Utils
 */

// Copy example files to dist-demo (e.g., HTML and Typscript for docs)
function copyExamples() {
  return copyToDemo([
    'src/**/example/*.*'
  ]);
}

// Copy package files to dist
function copyPkgFiles() {
  return copyToDist([
    './README.md',
    './package.json'
  ]);
}

// Copy given files to demo directory
function copyToDemo(srcArr) {
  return gulp.src(srcArr)
    .pipe(gulp.dest(function (file) {
      return demoDist + file.base.slice(__dirname.length); // save directly to demo
    }));
}

// Copy given files to dist directory
function copyToDist(srcArr) {
  return gulp.src(srcArr.concat(globalExcludes))
    .pipe(gulp.dest(function (file) {
      return libraryDist + file.base.slice(__dirname.length); // save directly to dist
    }));
}

// Minify HTML templates
function minifyTemplate(file) {
  try {
    var minifiedFile = htmlMinifier.minify(file, {
      collapseWhitespace: true,
      caseSensitive: true,
      removeComments: true
    });
    return minifiedFile;
  } catch (err) {
    console.log(err);
  }
}

// Build LESS
function transpileLESS(src) {
  return gulp.src(src)
    .pipe(sourcemaps.init())
    .pipe(lessCompiler({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(function (file) {
      return __dirname + file.base.slice(__dirname.length);
    }));
}

// Build and minify LESS separately
function transpileMinifyLESS(src) {
  return gulp.src(src)
    .pipe(sourcemaps.init())
    .pipe(lessCompiler({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(cssmin().on('error', function(err) {
      console.log(err);
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(function (file) {
      return __dirname + file.base.slice(__dirname.length);
    }));
}

/**
 * LESS
 */

// Copy asset LESS to dist/less and replace relative paths for flattened directory
function copyAssetsLess() {
  return gulp.src(['./src/assets/stylesheets/*.less'])
    .pipe(replace(/\.\.\/.\.\/.\.\//g, function () {
      return '../../../../';
    }))
    .pipe(replace(/@import '\.\.\/\.\.\/.*\//g, function () {
      return '@import \'';
    }))
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest(libraryDist + '/less'));
}

// Copy component LESS to dist/less in a flattened directory
function copyLess() {
  return gulp.src(['./src/app/**/*.less'].concat(globalExcludes))
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest(libraryDist + '/less'));
}

/**
 * CSS
 */

// Copy CSS to dist/css
function copyCss() {
  return gulp.src(['./src/assets/stylesheets/*.css'], {base: './src/assets/stylesheets'})
    .pipe(gulp.dest(function (file) {
      return libraryDist + '/css' + file.base.slice(__dirname.length); // save directly to dist
    }));
}

// Stylelint
function lintCss() {
  return gulp
    .src(['./src/assets/stylesheets/*.less', './src/app/**/*.less'])
    .pipe(stylelint({
      failAfterError: true,
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
}

// Less compilation and minifiction
function minCss() {
  return transpileMinifyLESS(appSrc + '/assets/stylesheets/*.less');
}

// Less compilation
function transpileLess() {
  return transpileLESS(appSrc + '/assets/stylesheets/*.less');
}

/**
 * Typescript
 */

// Inline HTML templates in component classes
function inlineTemplate() {
  return gulp.src(['./src/app/**/*.ts'].concat(globalExcludes), {base: './'})
    .pipe(replace(/templateUrl.*\'/g, function (matched) {
      var fileName = matched.match(/\/.*html/g).toString();
      var dirName = this.file.relative.substring(0, this.file.relative.lastIndexOf('/'));
      var fileContent = fs.readFileSync(dirName + fileName, "utf8");
      return 'template: \`' + minifyTemplate(fileContent) + '\`';
    }))
    .pipe(gulp.dest(libraryBuild));
}

// Build the components
function transpile() {
  /**
   * Stick with gulp-ngc v0.2.1 due to "function calls are not supported in decorators" issue
   *
   * See: https://github.com/angular/angular/issues/23609
   * Related: https://github.com/dherges/ng-packagr/issues/727
   *
   * gulp-ngc v0.3.0 uses different args
   * See: https://github.com/jolly-roger/gulp-ngc/issues/9
   */
  return gulpngc('tsconfig-prod.json');
}

// Build with AOT enabled
function transpileAot() {
  // https://stackoverflow.com/questions/36897877/gulp-error-the-following-tasks-did-not-complete-did-you-forget-to-signal-async
  return new Promise(function(resolve, reject) {
    // Need to capture the exit code
    exec('node_modules/.bin/ngc -p tsconfig-aot.json', function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      if (err !== null) {
        process.exit(1);
      }
    });
    resolve();
  });
}

/**
 * Watch
 */

// Watch source
function watch() {
  gulp.watch([appSrc + '/app/**/*.ts', '!' + appSrc + '/app/**/*.spec.ts']).on('change', function (e) {
    console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
  });
  gulp.watch([appSrc + '/app/**/*.less']).on('change', function (e) {
    console.log(e.path + ' has been changed. Updating.');
    transpileLESS(e.path);
    updateWatchDist();
  });
  gulp.watch([appSrc + '/app/**/*.html']).on('change', function (e) {
    console.log(e.path + ' has been changed. Updating.');
    copyToDist(e.path);
    updateWatchDist();
  });
}

// Update watch dist directory
function updateWatchDist() {
  return gulp
    .src([libraryDist + '/**'].concat(globalExcludes))
    .pipe(changed(watchDist))
    .pipe(gulp.dest(watchDist));
}

/**
 * Tasks
 */

const buildLessSeries = gulp.series(copyAssetsLess, copyLess);
const buildCssSeries = gulp.series(lintCss, transpileLess, minCss, copyCss);
const buildAotSeries = gulp.series(inlineTemplate, transpileAot);
const copyExamplesSeries = gulp.series(copyExamples);
const copyPkgFilesSeries = gulp.series(copyPkgFiles);

const buildSeries = gulp.series(inlineTemplate, transpile, buildCssSeries, buildLessSeries, copyPkgFilesSeries);
const updateWatchDistSeries = gulp.series(buildSeries, updateWatchDist);
const watchSeries = gulp.series(updateWatchDistSeries, watch);

gulp.task('build', buildSeries);
gulp.task('build-aot', buildAotSeries);
gulp.task('build-css', buildCssSeries);
gulp.task('build-less', buildLessSeries);
gulp.task('copy-examples', copyExamplesSeries);
gulp.task('copy-pkg-files', copyPkgFilesSeries);
gulp.task('watch', watchSeries);
gulp.task('update-watch-dist', updateWatchDistSeries);
