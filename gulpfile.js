var gulp = require('gulp'),
  del = require('del'),
  es = require('event-stream'),
  bowerFiles = require('main-bower-files'),
  gulpif = require('gulp-if'),
  inject = require('gulp-inject'),
  sourcemaps = require('gulp-sourcemaps'),
  htmlmin = require('gulp-htmlmin'),
  order = require('gulp-order'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  htmlhint = require('gulp-htmlhint'),
  ngHtml2js = require('gulp-ng-html2js'),
  jshint = require('gulp-jshint'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  minifyCss = require('gulp-minify-css'),
  livereload = require('gulp-livereload'),
  webserver = require('gulp-webserver'),
  mergeStream = require('merge-stream'),
  replace = require('gulp-replace'),
  debug = require('gulp-debug'),
  imagemin = require('gulp-imagemin'),
  gulpNgConfig = require('gulp-ng-config');

/**
 *  Paths ----------------------------------------
 */

var paths = {
  scripts: ['src/app/**/*.js'],
  styles: ['src/app/**/*.scss'],
  assets: {
    img: ['src/assets/img/**/*.*'],
    svg: ['src/assets/svg/**/*.svg']
  },
  index: ['src/index.html'],
  partials: ['src/app/**/*.html'],
  bootstrapScss: 'bower_components/bootstrap-sass/assets/stylesheets',
  distDev: './dist/',
  distProd: './dist/',
  distAppScriptsDev: './dist/scripts',
  distAppScriptsProd: './dist/scripts',
  distVendorScriptsDev: './dist/vendor/scripts',
  distVendorScriptsProd: './dist/vendor/scripts',
  distVendorStylesDev: './dist/vendor/styles',
  distVendorStylesProd: './dist/vendor/styles',
  distAppStylesDev: './dist/styles',
  distAppStylesProd: './dist/styles',
  distAssetsImgDev: './dist/assets/img',
  distAssetsImgProd: './dist/assets/img',
  distAssetsSvgDev: './dist/assets/svg',
  distAssetsSvgProd: './dist/assets/svg',
  config: './config.json',
  distConfig: './dist/scripts'
};

/**
 * Utility functions -----------------------------
 */
var util = {
  argumentPassed: function (arg) {
    return process.argv.indexOf(arg) != -1;
  },
  isProduction: function () {
    return util.argumentPassed('--prod');
  },
  isDevelopment: function () {
    return util.argumentPassed('--dev') || !util.isProduction();
  }
};

/**
 * Functions to be used as tasks
 */
var functions = {};

functions.minifiedFileName = function () {
  return rename(function (path) {
    path.extname = '.min' + path.extname;
  });
};

functions.buildPartials = function () {
  return gulp.src(paths.partials)
    .pipe(htmlhint({
      'doctype-first': false
    }))
    .pipe(htmlhint.reporter())
    .pipe(gulp.dest(paths.distDev));
};

functions.validatedAppScripts = function () {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
};

functions.scriptedPartials = function () {
  return gulp.src(paths.partials)
    .pipe(htmlhint({
      'doctype-first': false
    }))
    .pipe(htmlhint.reporter())
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(ngHtml2js({
      moduleName: "student-info-frontend"
    }));
};

functions.buildVendorScripts = function () {
  return gulp.src(bowerFiles('**/*.js'))
    .pipe(debug())
    .pipe(order(['jquery.js', 'angular.js']))
    .pipe(gulpif(util.isProduction(), concat('vendor.min.js')))
    .pipe(gulpif(util.isProduction(), uglify()))
    .pipe(gulpif(util.isProduction(), gulp.dest(paths.distVendorScriptsProd), gulp.dest(paths.distVendorScriptsDev)));
};

functions.buildAppScripts = function () {
  var scriptedPartials = functions.scriptedPartials(paths);
  var validatedAppScripts = functions.validatedAppScripts(paths);
  var config = functions.buildConfig();

  return es.merge(scriptedPartials, validatedAppScripts, config)
    .pipe(order(['jquery.js', 'angular.js']))
    .pipe(gulpif(util.isProduction(), sourcemaps.init()))
    .pipe(gulpif(util.isProduction(), concat('app.min.js')))
    .pipe(gulpif(util.isProduction(), uglify()))
    .pipe(gulpif(util.isProduction(), sourcemaps.write()))
    .pipe(gulpif(util.isProduction(), gulp.dest(paths.distAppScriptsProd), gulp.dest(paths.distAppScriptsDev)));
};

functions.buildVendorStyles = function () {
  return gulp.src(bowerFiles(['**/*.css', '**/*.scss']))
    .pipe(gulpif(util.isProduction(), sourcemaps.init()))
    .pipe(sass())
    .pipe(gulpif(util.isProduction(), minifyCss()))
    .pipe(gulpif(util.isProduction(), sourcemaps.write()))
    .pipe(gulpif(util.isProduction(), functions.minifiedFileName()))
    .pipe(gulpif(util.isProduction(), gulp.dest(paths.distVendorStylesProd), gulp.dest(paths.distVendorStylesDev)));
};

functions.buildImages = function () {
  var imgs = gulp.src(paths.assets.img)
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulpif(util.isProduction(), gulp.dest(paths.distAssetsImgDev), gulp.dest(paths.distAssetsImgProd)));
  var svgs = gulp.src(paths.assets.svg)
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulpif(util.isProduction(), gulp.dest(paths.distAssetsSvgDev), gulp.dest(paths.distAssetsSvgProd)));
  return es.merge(imgs, svgs);
};

functions.buildAppStyles = function () {
  return gulp.src(paths.styles)
    .pipe(gulpif(util.isProduction(), sourcemaps.init()))
    .pipe(sass({
      includePaths: paths.bootstrapScss
    }))
    .pipe(gulpif(util.isProduction(), minifyCss()))
    .pipe(gulpif(util.isProduction(), sourcemaps.write()))
    .pipe(gulpif(util.isProduction(), functions.minifiedFileName()))
    .pipe(gulpif(util.isProduction(), gulp.dest(paths.distAppStylesProd), gulp.dest(paths.distAppStylesDev)));
};

functions.buildConfig = function () {
  var env = null;

  if (util.isDevelopment()) {
    env = 'dev';
  } else if (util.isProduction()){
    env = 'prod';
  }

  return gulp.src(paths.config)
    .pipe(gulpNgConfig('siApp.config', {
      environment: env
    }))
    .pipe(gulp.dest(paths.distConfig));
};

functions.buildIndex = function () {
  var vendorScripts = functions.buildVendorScripts();
  var appScripts = functions.buildAppScripts();
  var vendorStyles = functions.buildVendorStyles();
  var appStyles = functions.buildAppStyles();

  var vendor = mergeStream(vendorScripts, vendorStyles);
  var app = mergeStream(appScripts, appStyles);

  return gulp.src(paths.index)
    .pipe(gulpif(util.isProduction(), gulp.dest(paths.distProd), gulp.dest(paths.distDev)))
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
    .pipe(inject(vendor, {
      relative: true,
      name: 'bower'
    }))
    .pipe(inject(app, {
      relative: true,
      name: 'app'
    }))
    .pipe(gulpif(util.isProduction(), htmlmin({
      collapseWhitespace: true,
      removeComments: true
    })))
    .pipe(gulpif(util.isProduction(), gulp.dest(paths.distProd), gulp.dest(paths.distDev)));
};

functions.buildApp = function () {
  return es.merge(functions.buildIndex(), functions.buildPartials(), functions.buildImages());
};

/**
 * Tasks ----------------------------------------
 */

gulp.task('clean', function (cb) {
  if (!util.argumentPassed('--no-clean')) {
    return del(paths.distDev, cb);
  }
  return gulp.src('');
});

gulp.task('build-app', ['clean'], functions.buildApp);

gulp.task('build', ['build-app'], function () {

  if (util.isDevelopment()) {
    livereload.listen({
      port: 3314,
      start: true
    });
  }

  // watch index
  gulp.watch(paths.index, function () {
    return functions.buildIndex()
      .pipe(livereload());
  });

  // watch app scripts
  gulp.watch(paths.scripts, function () {
    return functions.buildAppScripts()
      .pipe(livereload());
  });

  // watch html partials
  gulp.watch(paths.partials, function () {
    return functions.buildPartials()
      .pipe(livereload());
  });

  // watch styles
  gulp.watch(paths.styles, function () {
    return functions.buildAppStyles()
      .pipe(livereload());
  });
});
