
var gulp = require('gulp'),
  autoprefixer = require('autoprefixer'),
  changed = require('gulp-changed'),
  cssmin = require('gulp-cssmin'),
  csso = require('csso'),
  del = require('del'),
  fs = require("fs"),
  htmlMinifier = require('html-minifier'),
  lessCompiler = require('gulp-less'),
  ngc = require('gulp-ngc'),
  path = require('path'),
  postcss = require('postcss'),
  replace = require('gulp-replace'),
  sourcemaps = require('gulp-sourcemaps'),
  stylus = require('stylus');

var appSrc = 'src';
var libraryBuild = 'build';
var libraryDist = 'dist';
var demoDist = 'dist-demo';
var watchDist = 'dist-watch';
var globalExcludes = [ '!./**/examples/**', '!./**/examples' ];

/**
 * FUNCTION LIBRARY
 */

function copyToBuild(srcArr) {
  return gulp.src(srcArr.concat(globalExcludes))
    .pipe(gulp.dest(function (file) {
      return libraryBuild + file.base.slice(__dirname.length); // save directly to build
    }));
}

function copyToDist(srcArr) {
  return gulp.src(srcArr.concat(globalExcludes))
    .pipe(gulp.dest(function (file) {
      return libraryDist + file.base.slice(__dirname.length); // save directly to dist
    }));
}

function copyToDemo(srcArr) {
  return gulp.src(srcArr)
    .pipe(gulp.dest(function (file) {
      return demoDist + file.base.slice(__dirname.length); // save directly to demo
    }));
}

function updateWatchDist() {
  return gulp
    .src([libraryDist + '/**'].concat(globalExcludes))
    .pipe(changed(watchDist))
    .pipe(gulp.dest(watchDist));
}

function transpileLESS(src) {
  return gulp.src(src)
    .pipe(sourcemaps.init())
    .pipe(lessCompiler({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }).on('error', function (err) {
      // this will prevent our future watch-task from crashing on sass-errors
      console.log(err);
    }))
    .pipe(cssmin().on('error', function(err) {
      console.log(err);
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(function (file) {
      return __dirname + file.base.slice(__dirname.length);
    }));
}

function minifyCSS(file) {
  try {
    var minifiedFile = stylus.render(file);
    minifiedFile = postcss([autoprefixer]).process(minifiedFile).css;
    minifiedFile = csso.minify(minifiedFile).css;
    return minifiedFile;
  } catch (err) {
    console.log(err);
  }
}

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

/**
 * TASKS
 */

//Less compilation and minifiction - adopted from sass compilation, needs work
gulp.task('transpile-less', function () {
  return transpileLESS(appSrc + '/**/*.less');
});

// Put the files back to normal
gulp.task('build',
  [
    'transpile',
    'copy-css',
    'copy-html',
    'copy-static-assets'
  ]);

gulp.task('transpile', ['copy-root', 'inline-template'], function () {
  return ngc('tsconfig-prod.json');
});

gulp.task('inline-template', ['transpile-less'], function () {
  return gulp.src(['./src/app/**/*.ts'].concat(globalExcludes), {base: './'})
    .pipe(replace(/templateUrl.*\'/g, function (matched) {
      var fileName = matched.match(/\/.*html/g).toString();
      var dirName = this.file.relative.substring(0, this.file.relative.lastIndexOf('/'));
      var fileContent = fs.readFileSync(dirName + fileName, "utf8");
      return 'template: \`' + minifyTemplate(fileContent) + '\`';
    }))
    .pipe(replace(/styleUrls.*\'/g, function (matched) {
      var fileName = matched.match(/\/.*less/g).toString().replace('.less', '.css');
      var dirName = this.file.relative.substring(0, this.file.relative.lastIndexOf('/'));
      var fileContent = fs.readFileSync(dirName + fileName, "utf8");
      return 'styles: [\`' + minifyCSS(fileContent) + '\`';
    }))
    .pipe(gulp.dest(libraryBuild));
});

gulp.task('copy-root', function () {
  return gulp.src([
    'index.ts',
    'patternfly-ng.module.ts'
  ])
    .pipe(gulp.dest(libraryBuild));
});

gulp.task('copy-html', function () {
  return copyToDist([
    'src/**/*.html'
  ]);
});

gulp.task('copy-css', function () {
  return copyToDist([
    'src/**/*.css'
  ]);
});

gulp.task('copy-examples', function () {
  return copyToDemo([
    'src/**/examples/*.*'
  ]);
});

gulp.task('copy-static-assets', function () {
  return gulp.src([
    'LICENSE',
    'README.md'
  ])
    .pipe(gulp.dest(libraryDist));
});

gulp.task('copy-watch', ['post-transpile'], function() {
  return updateWatchDist();
});

gulp.task('copy-watch-all', ['build'], function() {
  return updateWatchDist();
});

gulp.task('watch', ['build', 'copy-watch-all'], function () {
  gulp.watch([appSrc + '/app/**/*.ts', '!' + appSrc + '/app/**/*.spec.ts'], ['transpile', 'post-transpile', 'copy-watch']).on('change', function (e) {
    console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
  });
  gulp.watch([appSrc + '/app/**/*.css']).on('change', function (e) {
    console.log(e.path + ' has been changed. Updating.');
    transpileLESS(e.path);
    updateWatchDist();
  });
  gulp.watch([appSrc + '/app/**/*.html']).on('change', function (e) {
    console.log(e.path + ' has been changed. Updating.');
    copyToDist(e.path);
    updateWatchDist();
  });
});
