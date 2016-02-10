var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
// Za parcionisanje gulpfile-a, posle cu to da uradim
// var requireDir = require('require-dir');
// var tasks = requireDir('./tasks');
var Q = require('q');
var _ = require('lodash');
var del = require('del');
var es = require('event-stream');
var bowerFiles = require('main-bower-files');


/* 
 *  Paths ----------------------------------------
 */

var allAppsPaths = {
  global: {
    scripts: ['src/*.js'],
    styles: [],
    images: [],
    index: ['src/*.html'],
    partials: [],
    distDev: './dist/',
    distProd: './dist/',
    distScriptsProd: './dist/scripts'
  },
  app: {
    scripts: ['src/app/**/*.js', '!src/bower_components/**/*.js'],
    styles: ['src/app/styles/**/*.*'],
    images: 'src/app/images/**/*',
    index: 'src/app/index.html',
    partials: ['src/app/**/*.html', '!src/app/index.html'],
    distDev: './dist/app/',
    distProd: './dist/app/',
    distScriptsProd: './dist/app/scripts'
  },
  admin: {
    scripts: ['src/admin/**/*.js'],
    styles: ['src/admin/styles/**/*.css'],
    images: ['./images/**/*', './src/admin/**/*.png'],
    index: './src/admin/index.html',
    partials: ['src/admin/**/*.html', '!src/admin/index.html'],
    distDev: './dist/admin/',
    distProd: './dist/admin/',
    distScriptsProd: './dist/admin/scripts'
  }
};

/*
 *  Utility functions ----------------------------------------
 */
var utils = {};

utils.orderedVendorScripts = function () {
  return plugins.order(['jquery.js', 'angular.js']);
};

utils.orderedAppScripts = function () {
  return plugins.angularFilesort();
};

utils.minifiedFileName = function () {
  return plugins.rename(function (path) {
    path.extname = '.min' + path.extname;
  });
};

/*
 *  Independent functions that will be used for tasks ----------------------------------------
 */
var functions = {};

functions.validatedAppScripts = function (paths) {
  return gulp.src(paths.scripts);
  //    .pipe(plugins.jshint())
  //    .pipe(plugins.jshint.reporter('jshint-stylish'));
};

functions.builtAppScriptsDev = function (paths) {
  return functions.validatedAppScripts(paths)
    .pipe(gulp.dest(paths.distDev));
};

functions.builtAppScriptsProd = function (paths) {
  var scriptedPartials = functions.scriptedPartials(paths);
  var validatedAppScripts = functions.validatedAppScripts(paths);

  return es.merge(scriptedPartials, validatedAppScripts)
    .pipe(utils.orderedAppScripts())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat('app.min.js'))
    //.pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(paths.distScriptsProd));
};

functions.builtVendorScriptsDev = function (paths) {
  return gulp.src(bowerFiles())
    .pipe(gulp.dest('dist/bower_components'));
};

functions.builtVendorScriptsProd = function (paths) {
  return gulp.src(bowerFiles('**/*.js'))
    .pipe(utils.orderedVendorScripts())
    .pipe(plugins.concat('vendor.min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(paths.distScriptsProd));
};

functions.validatedPartials = function (paths) {
  return gulp.src(paths.partials)
    .pipe(plugins.htmlhint({
      'doctype-first': false
    }))
    .pipe(plugins.htmlhint.reporter());
};

functions.builtPartialsDev = function (paths) {
  return functions.validatedPartials(paths)
    .pipe(gulp.dest(paths.distDev));
};

functions.scriptedPartials = function (paths) {
  return functions.validatedPartials(paths)
    .pipe(plugins.htmlhint.failReporter())
    .pipe(plugins.htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(plugins.ngHtml2js({
      moduleName: "student-info-frontend"
    }));
};

functions.builtStylesDev = function (paths) {
  return gulp.src(paths.styles)
    .pipe(plugins.sass())
    .pipe(gulp.dest(paths.distDev));
};

functions.builtStylesProd = function (paths) {
  return gulp.src(paths.styles)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass())
    .pipe(plugins.minifyCss())
    .pipe(plugins.sourcemaps.write())
    .pipe(utils.minifiedFileName())
    .pipe(gulp.dest(paths.distProd));
};

functions.processedImagesDev = function (paths) {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.distDev + '/images/'));
};

functions.processedImagesProd = function (paths) {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.distProd + '/images/'));
};

functions.validatedIndex = function (paths) {
  return gulp.src(paths.index)
    .pipe(plugins.htmlhint())
    .pipe(plugins.htmlhint.reporter());
};

functions.builtIndexDev = function (paths) {

  var orderedVendorScripts = functions.builtVendorScriptsDev(paths)
    .pipe(utils.orderedVendorScripts());

  var orderedAppScripts = functions.builtAppScriptsDev(paths)
    .pipe(utils.orderedAppScripts())
  var appStyles = functions.builtStylesDev(paths);

  return functions.validatedIndex(paths)
    .pipe(gulp.dest(paths.distDev)) // write first to get relative path for inject
    .pipe(plugins.inject(orderedVendorScripts, {
      relative: true,
      name: 'bower'
    }))
    .pipe(plugins.inject(orderedAppScripts, {
      relative: true
    }))
    .pipe(plugins.inject(appStyles, {
      relative: true
    }))
    .pipe(gulp.dest(paths.distDev));
};

functions.builtIndexProd = function (paths) {

  var vendorScripts = functions.builtVendorScriptsProd(paths);
  var appScripts = functions.builtAppScriptsProd(paths);
  var appStyles = functions.builtStylesProd(paths);

  return functions.validatedIndex(paths)
    .pipe(gulp.dest(paths.distProd)) // write first to get relative path for inject
    .pipe(plugins.inject(vendorScripts, {
      relative: true,
      name: 'bower'
    }))
    .pipe(plugins.inject(appScripts, {
      relative: true
    }))
    .pipe(plugins.inject(appStyles, {
      relative: true
    }))
    .pipe(plugins.htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest(paths.distProd));
};

functions.builtAppDev = function (paths) {
  return es.merge(functions.builtIndexDev(paths), functions.builtPartialsDev(paths), functions.processedImagesDev(paths));
};

functions.builtAppProd = function (paths) {
  return es.merge(functions.builtIndexProd(paths), functions.builtPartialsDev(paths), functions.processedImagesProd(paths));
};

/*
 * Pipes
 */

var allAppsPipes = {
  global: {
    orderedVendorScripts: function () {
      return utils.orderedVendorScripts();
    },
    orderedAppScripts: function () {
      return utils.orderedAppScripts();
    },
    minifiedFileName: function () {
      return utils.minifiedFileName();
    },
    validatedAppScripts: function () {
      return functions.validatedAppScripts(allAppsPaths.global);
    },
    builtAppScriptsDev: function () {
      return functions.builtAppScriptsDev(allAppsPaths.global);
    },
    builtAppScriptsProd: function () {
      return functions.builtAppScriptsProd(allAppsPaths.global);
    },
    builtVendorScriptsDev: function () {
      return functions.builtVendorScriptsDev(allAppsPaths.global);
    },
    builtVendorScriptsProd: function () {
      return functions.builtVendorScriptsProd(allAppsPaths.global);
    },
    validatedPartials: function () {
      return functions.validatedPartials(allAppsPaths.global);
    },
    builtPartialsDev: function () {
      return functions.builtPartialsDev(allAppsPaths.global);
    },
    scriptedPartials: function () {
      return functions.scriptedPartials(allAppsPaths.global);
    },
    builtStylesDev: function () {
      return functions.builtStylesDev(allAppsPaths.global);
    },
    builtStylesProd: function () {
      return functions.builtStylesProd(allAppsPaths.global);
    },
    processedImagesDev: function () {
      return functions.processedImagesDev(allAppsPaths.global);
    },
    builtAppDev: function () {
      return functions.builtAppDev(allAppsPaths.global);
    },
    builtAppProd: function () {
      return functions.builtAppProd(allAppsPaths.global);
    },
    builtIndexDev: function () {
      return functions.builtIndexDev(allAppsPaths.global);
    }
  },
  app: {
    orderedVendorScripts: function () {
      return utils.orderedVendorScripts();
    },
    orderedAppScripts: function () {
      return utils.orderedAppScripts();
    },
    minifiedFileName: function () {
      return utils.minifiedFileName();
    },
    validatedAppScripts: function () {
      return functions.validatedAppScripts(allAppsPaths.app);
    },
    builtAppScriptsDev: function () {
      return functions.builtAppScriptsDev(allAppsPaths.app);
    },
    builtAppScriptsProd: function () {
      return functions.builtAppScriptsProd(allAppsPaths.app);
    },
    builtVendorScriptsDev: function () {
      return functions.builtVendorScriptsDev(allAppsPaths.app);
    },
    builtVendorScriptsProd: function () {
      return functions.builtVendorScriptsProd(allAppsPaths.app);
    },
    validatedPartials: function () {
      return functions.validatedPartials(allAppsPaths.app);
    },
    builtPartialsDev: function () {
      return functions.builtPartialsDev(allAppsPaths.app);
    },
    scriptedPartials: function () {
      return functions.scriptedPartials(allAppsPaths.app);
    },
    builtStylesDev: function () {
      return functions.builtStylesDev(allAppsPaths.app);
    },
    builtStylesProd: function () {
      return functions.builtStylesProd(allAppsPaths.app);
    },
    processedImagesDev: function () {
      return functions.processedImagesDev(allAppsPaths.app);
    },
    builtAppDev: function () {
      return functions.builtAppDev(allAppsPaths.app);
    },
    builtAppProd: function () {
      return functions.builtAppProd(allAppsPaths.app);
    },
    builtIndexDev: function () {
      return functions.builtIndexDev(allAppsPaths.app);
    }
  },
  admin: {
    orderedVendorScripts: function () {
      return utils.orderedVendorScripts();
    },
    orderedAppScripts: function () {
      return utils.orderedAppScripts();
    },
    minifiedFileName: function () {
      return utils.minifiedFileName();
    },
    validatedAppScripts: function () {
      return functions.validatedAppScripts(allAppsPaths.admin);
    },
    builtAppScriptsDev: function () {
      return functions.builtAppScriptsDev(allAppsPaths.admin);
    },
    builtAppScriptsProd: function () {
      return functions.builtAppScriptsProd(allAppsPaths.admin);
    },
    builtVendorScriptsDev: function () {
      return functions.builtVendorScriptsDev(allAppsPaths.admin);
    },
    builtVendorScriptsProd: function () {
      return functions.builtVendorScriptsProd(allAppsPaths.admin);
    },
    validatedPartials: function () {
      return functions.validatedPartials(allAppsPaths.admin);
    },
    builtPartialsDev: function () {
      return functions.builtPartialsDev(allAppsPaths.admin);
    },
    scriptedPartials: function () {
      return functions.scriptedPartials(allAppsPaths.admin);
    },
    builtStylesDev: function () {
      return functions.builtStylesDev(allAppsPaths.admin);
    },
    builtStylesProd: function () {
      return functions.builtStylesProd(allAppsPaths.admin);
    },
    processedImagesDev: function () {
      return functions.processedImagesDev(allAppsPaths.admin);
    },
    builtAppDev: function () {
      return functions.builtAppDev(allAppsPaths.admin);
    },
    builtAppProd: function () {
      return functions.builtAppProd(allAppsPaths.admin);
    },
    builtIndexDev: function () {
      return functions.builtIndexDev(allAppsPaths.admin);
    }
  }
};

/*
 *  Tasks ----------------------------------------
 */

gulp.task('clean-dev', function () {
  var deferred = Q.defer();
  del(allAppsPaths.global.distDev, function () {
    deferred.resolve();
  });
  return deferred.promise;
});

gulp.task('clean-prod', function () {
  var deferred = Q.defer();
  del(allAppsPaths.global.distProd, function () {
    deferred.resolve();
  });
  return deferred.promise;
});

// checks html source files for syntax errors
gulp.task('validate-partials', function () {
  _.forEach(allAppsPipes, function (pipe) {
    pipe.validatedPartials();
  });
});

// checks index.html for syntax errors
gulp.task('validate-index', function () {
  _.forEach(allAppsPipes, function (pipe) {
    pipe.validatedIndex();
  });
});

// moves html source files into the dev environment
gulp.task('build-partials-dev', function () {
  _.forEach(allAppsPipes, function (pipe) {
    pipe.builtPartialsDev();
  });
});

// converts partials to javascript using html2js
gulp.task('convert-partials-to-js', function () {
  _.forEach(allAppsPipes, function (pipe) {
    pipe.scriptedPartials();
  });
});

// runs jshint on the app scripts
gulp.task('validate-app-scripts', function () {
  _.forEach(allAppsPipes, function (pipe) {
    pipe.validatedAppScripts();
  });
});

// moves app scripts into the dev environment
gulp.task('build-app-scripts-dev', function () {
  _.forEach(allAppsPipes, function (pipe) {
    pipe.builtAppScriptsDev();
  });
});

// concatenates, uglifies, and moves app scripts and partials into the prod environment
gulp.task('build-app-scripts-prod', function () {
  _.forEach(allAppsPipes, function (pipe) {
    pipe.builtAppScriptsProd();
  });
});

// compiles app sass and moves to the dev environment
gulp.task('build-styles-dev', function () {
  _.forEach(allAppsPipes, function (pipe) {
    pipe.builtStylesDev();
  });
});

// compiles and minifies app sass to css and moves to the prod environment
gulp.task('build-styles-prod', function () {
  _.forEach(allAppsPipes, function (pipe) {
    pipe.builtStylesDev();
  });
});

// moves vendor scripts into the dev environment
gulp.task('build-vendor-scripts-dev', function () {
  _.forEach(allAppsPipes, function (pipe) {
    pipe.builtVendorScriptsDev();
  });
});

// concatenates, uglifies, and moves vendor scripts into the prod environment
gulp.task('build-vendor-scripts-prod', function () {
  _.forEach(allAppsPipes, function (pipe) {
    pipe.builtVendorScriptsProd();
  });
});

// validates and injects sources into index.html and moves it to the dev environment
gulp.task('build-index-dev', function () {
  _.forEach(allAppsPipes, function (pipe) {
    pipe.builtIndexDev();
  });
});

// validates and injects sources into index.html, minifies and moves it to the dev environment
gulp.task('build-index-prod', function () {
  _.forEach(allAppsPipes, function (pipe) {
    pipe.builtIndexProd();
  });
});

// builds a complete dev environment
gulp.task('build-app-dev', function () {
  _.forEach(allAppsPipes, function (pipe) {
    pipe.builtAppDev();
  });
});

// builds a complete prod environment
gulp.task('build-app-prod', function () {
  _.forEach(allAppsPipes, function (pipe) {
    pipe.builtAppProd();
  });
});

// cleans and builds a complete dev environment
gulp.task('clean-build-app-dev', ['clean-dev'], function () {
  _.forEach(allAppsPipes, function (pipe) {
    pipe.builtAppDev();
  });
});

// cleans and builds a complete prod environment
gulp.task('clean-build-app-prod', ['clean-prod'], function () {
  _.forEach(allAppsPipes, function (pipe) {
    pipe.builtAppProd();
  });
});

gulp.task('watch-dev', ['clean-build-app-dev'], function () {

  gulp.src('.')
    .pipe(plugins.webserver({
      livereload: false,
      directoryListing: true
    }));

  // start live-reload server
  plugins.livereload.listen({
    start: true
  });

  // watch index
  gulp.watch(allAppsPaths.global.index, function () {
    return allAppsPipes.global.builtIndexDev()
      .pipe(plugins.livereload());
  });

  // watch index
  gulp.watch(allAppsPaths.app.index, function () {
    return allAppsPipes.app.builtIndexDev()
      .pipe(plugins.livereload());
  });

  // watch app scripts
  gulp.watch(allAppsPaths.app.scripts, function () {
    return allAppsPipes.app.builtAppScriptsDev()
      .pipe(plugins.livereload());
  });

  // watch html partials
  gulp.watch(allAppsPaths.app.partials, function () {
    return allAppsPipes.app.builtPartialsDev()
      .pipe(plugins.livereload());
  });

  // watch styles
  gulp.watch(allAppsPaths.app.styles, function () {
    return allAppsPipes.app.builtStylesDev()
      .pipe(plugins.livereload());
  });

  // watch index
  gulp.watch(allAppsPaths.admin.index, function () {
    return allAppsPipes.admin.builtIndexDev()
      .pipe(plugins.livereload());
  });

  // watch app scripts
  gulp.watch(allAppsPaths.admin.scripts, function () {
    return allAppsPipes.admin.builtAppScriptsDev()
      .pipe(plugins.livereload());
  });

  // watch html partials
  gulp.watch(allAppsPaths.admin.partials, function () {
    return allAppsPipes.admin.builtPartialsDev()
      .pipe(plugins.livereload());
  });

  // watch styles
  gulp.watch(allAppsPaths.admin.styles, function () {
    return allAppsPipes.admin.builtStylesDev()
      .pipe(plugins.livereload());
  });

});

gulp.task('watch-prod', ['clean-build-app-prod'], function () {

  gulp.src('.')
    .pipe(plugins.webserver({
      livereload: false,
      directoryListing: true
    }));

  // start live-reload server
  plugins.livereload.listen({start: true});

  // watch index
  gulp.watch(allAppsPaths.global.index, function () {
    return allAppsPipes.global.builtIndexProd()
      .pipe(plugins.livereload());
  });

  // watch index
  gulp.watch(allAppsPaths.app.index, function () {
    return allAppsPipes.app.builtIndexProd()
      .pipe(plugins.livereload());
  });

  // watch app scripts
  gulp.watch(allAppsPaths.app.scripts, function () {
    return allAppsPipes.app.builtAppScriptsProd()
      .pipe(plugins.livereload());
  });

  // watch html partials
  gulp.watch(allAppsPaths.app.partials, function () {
    return allAppsPipes.app.builtPartialsProd()
      .pipe(plugins.livereload());
  });

  // watch styles
  gulp.watch(allAppsPaths.app.styles, function () {
    return allAppsPipes.app.builtStylesProd()
      .pipe(plugins.livereload());
  });


  // watch index
  gulp.watch(allAppsPaths.admin.index, function () {
    return allAppsPipes.admin.builtIndexProd()
      .pipe(plugins.livereload());
  });

  // watch app scripts
  gulp.watch(allAppsPaths.admin.scripts, function () {
    return allAppsPipes.admin.builtAppScriptsProd()
      .pipe(plugins.livereload());
  });

  // watch html partials
  gulp.watch(allAppsPaths.admin.partials, function () {
    return allAppsPipes.admin.builtPartialsDev()
      .pipe(plugins.livereload());
  });

  // watch styles
  gulp.watch(allAppsPaths.admin.styles, function () {
    return allAppsPipes.admin.builtStylesProd()
      .pipe(plugins.livereload());
  });

});

// default task builds for prod
gulp.task('default', ['clean-build-app-prod']);