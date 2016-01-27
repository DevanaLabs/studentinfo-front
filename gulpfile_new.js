var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
// var requireDir = require('require-dir');
// var tasks = requireDir('./tasks');
var Q = require('q');
var _ = require('lodash');


/* 
 *  Paths ----------------------------------------
 */

var allAppsPaths = {
  app: {
    scripts: ['src/app/**/*.js', '!src/bower_components/**/*.js'],
    styles: ['src/app/styles/**/*.*'],
    images: 'src/app/images/**/*',
    index: 'src/app/index.html',
    partials: ['src/app/**/*.html', '!src/app/index.html'],
    distDev: './dist/app',
    distProd: './dist/app'
  },
  admin: {
    scripts: ['src/admin/**/*.js'],
    styles: ['src/admin/styles/**/*.css'],
    images: ['./images/**/*', './src/admin/**/*.png'],
    index: './src/admin/index.html',
    partials: ['src/admin/**/*.html', '!src/admin/index.html'],
    distDev: './dist/admin',
    distProd: './dist/admin',
  }
};

/*
 *  Utility functions ----------------------------------------
 */
var utils = {};

utils.orderedVendorScripts = function() {
  return plugins.order(['jquery.js', 'angular.js']);
};

utils.orderedAppScripts = function() {
  return plugins.angularFilesort();
};

utils.minifiedFileName = function() {
  return plugins.rename(function(path) {
    path.extname = '.min' + path.extname;
  });
};

/*
 *  Independent functions that will be used for tasks ----------------------------------------
 */
var functions = {};

functions.validatedAppScripts = function(paths) {
  return gulp.src(paths.scripts)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
};

functions.builtAppScriptsDev = function(paths) {
  return functions.validatedAppScripts(paths)
    .pipe(gulp.dest(paths.distDev));
};

functions.builtAppScriptsProd = function(paths) {
  var scriptedPartials = functions.scriptedPartials(paths);
  var validatedAppScripts = functions.validatedAppScripts(paths);

  return es.merge(scriptedPartials, validatedAppScripts)
    .pipe(functions.orderedAppScripts(paths))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat('app.min.js'))
    .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(paths.distScriptsProd));
};

functions.builtVendorScriptsDev = function(paths) {
  return gulp.src(bowerFiles())
    .pipe(gulp.dest('dist/bower_components'));
};

functions.builtVendorScriptsProd = function(paths) {
  return gulp.src(bowerFiles('**/*.js'))
    .pipe(functions.orderedVendorScripts(paths))
    .pipe(plugins.concat('vendor.min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(paths.distScriptsProd));
};

// functions.validatedDevServerScripts = function(paths) {
//   return gulp.src(paths.scriptsDevServer)
//     .pipe(plugins.jshint())
//     .pipe(plugins.jshint.reporter('jshint-stylish'));
// };

functions.validatedPartials = function(paths) {
  return gulp.src(paths.partials)
    .pipe(plugins.htmlhint({
      'doctype-first': false
    }))
    .pipe(plugins.htmlhint.reporter());
};

functions.builtPartialsDev = function(paths) {
  return functions.validatedPartials(paths)
    .pipe(gulp.dest(paths.distDev));
};

functions.scriptedPartials = function(paths) {
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

functions.builtStylesDev = function(paths) {
  return gulp.src(paths.styles)
    .pipe(plugins.sass())
    .pipe(gulp.dest(paths.distDev));
};

functions.builtStylesProd = function(paths) {
  return gulp.src(paths.styles)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass())
    .pipe(plugins.minifyCss())
    .pipe(plugins.sourcemaps.write())
    .pipe(functions.minifiedFileName(paths))
    .pipe(gulp.dest(paths.distProd));
};

functions.processedImagesDev = function(paths) {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.distDev + '/images/'));
};

functions.processedImagesProd = function(paths) {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.distProd + '/images/'));
};

functions.validatedIndex = function(paths) {
  return gulp.src(paths.index)
    .pipe(plugins.htmlhint())
    .pipe(plugins.htmlhint.reporter());
};

functions.builtIndexDev = function(paths) {

  var orderedVendorScripts = functions.builtVendorScriptsDev(paths)
    .pipe(functions.orderedVendorScripts(paths));

  var orderedAppScripts = functions.builtAppScriptsDev(paths)
    .pipe(functions.orderedAppScripts(paths));

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

functions.builtIndexProd = function(paths) {

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

functions.builtAppDev = function(paths) {
  return es.merge(functions.builtIndexDev(paths), functions.builtPartialsDev(paths), functions.processedImagesDev(paths));
};

functions.builtAppProd = function(paths) {
  return es.merge(functions.builtIndexProd(paths), functions.builtPartialsDev(paths), functions.processedImagesProd(paths));
};

/*
 * function () {
  _.forEach(allAppsPipes, function (pipe) {
  
  pipe.})
 } */

var allAppsPipes = {
  app: {
    orderedVendorScripts: function() {
      util.orderedVendorScripts();
    },
    orderedAppScripts: function() {
      util.orderedAppScripts();
    },
    minifiedFileName: function() {
      util.minifiedFileName();
    },
    validatedAppScripts: function() {
      functions.validatedAppScripts(allAppsPaths.app);
    },
    builtAppScriptsDev: function() {
      functions.builtAppScriptsDev(allAppsPaths.app);
    },
    builtAppScriptsProd: function() {
      functions.builtAppScriptsProd(allAppsPaths.app);
    },
    builtVendorScriptsDev: function() {
      functions.builtVendorScriptsDev(allAppsPaths.app);
    },
    builtVendorScriptsProd: function() {
      functions.builtVendorScriptsProd(allAppsPaths.app);
    },
    validatedDevServerScripts: function() {
      functions.validatedDevServerScripts(allAppsPaths.app);
    },
    validatedPartials: function() {
      functions.validatedPartials(allAppsPaths.app);
    },
    builtPartialsDev: function() {
      functions.builtPartialsDev(allAppsPaths.app);
    },
    scriptedPartials: function() {
      functions.scriptedPartials(allAppsPaths.app);
    },
    builtStylesDev: function() {
      functions.builtStylesDev(allAppsPaths.app);
    },
    builtStylesProd: function() {
      functions.builtStylesProd(allAppsPaths.app);
    },
    processedImagesDev: function() {
      functions.processedImagesDev(allAppsPaths.app);
    },
  },
  admin: {
    orderedVendorScripts: function() {
      util.orderedVendorScripts();
    },
    orderedAppScripts: function() {
      util.orderedAppScripts();
    },
    minifiedFileName: function() {
      util.minifiedFileName();
    },
    validatedAppScripts: function() {
      functions.validatedAppScripts(allAppsPaths.admin);
    },
    builtAppScriptsDev: function() {
      functions.builtAppScriptsDev(allAppsPaths.admin);
    },
    builtAppScriptsProd: function() {
      functions.builtAppScriptsProd(allAppsPaths.admin);
    },
    builtVendorScriptsDev: function() {
      functions.builtVendorScriptsDev(allAppsPaths.admin);
    },
    builtVendorScriptsProd: function() {
      functions.builtVendorScriptsProd(allAppsPaths.admin);
    },
    validatedDevServerScripts: function() {
      functions.validatedDevServerScripts(allAppsPaths.admin);
    },
    validatedPartials: function() {
      functions.validatedPartials(allAppsPaths.admin);
    },
    builtPartialsDev: function() {
      functions.builtPartialsDev(allAppsPaths.admin);
    },
    scriptedPartials: function() {
      functions.scriptedPartials(allAppsPaths.admin);
    },
    builtStylesDev: function() {
      functions.builtStylesDev(allAppsPaths.admin);
    },
    builtStylesProd: function() {
      functions.builtStylesProd(allAppsPaths.admin);
    },
    processedImagesDev: function() {
      functions.processedImagesDev(allAppsPaths.admin);
    },
  }
};

/*
 *  Tasks ----------------------------------------
 */

gulp.task('clean-dev', function() {
  var deferred = Q.defer();
  del(paths.distDev, function() {
    deferred.resolve();
  });
  return deferred.promise;
});

gulp.task('clean-prod', function() {
  var deferred = Q.defer();
  del(paths.distProd, function() {
    deferred.resolve();
  });
  return deferred.promise;
});

// checks html source files for syntax errors
gulp.task('validate-partials', function() {
  _.forEach(allAppsPipes, function(pipe) {
    pipe.validatedPartials();
  });
});

// checks index.html for syntax errors
gulp.task('validate-index', function() {
  _.forEach(allAppsPipes, function(pipe) {
    pipe.validatedIndex();
  });
});

// moves html source files into the dev environment
gulp.task('build-partials-dev', function() {
  _.forEach(allAppsPipes, function(pipe) {
    pipe.builtPartialsDev();
  });
});

// converts partials to javascript using html2js
gulp.task('convert-partials-to-js', function() {
  _.forEach(allAppsPipes, function(pipe) {
    pipe.scriptedPartials();
  });
});

// runs jshint on the app scripts
gulp.task('validate-app-scripts', function() {
  _.forEach(allAppsPipes, function(pipe) {
    pipe.validatedAppScripts();
  });
});

// moves app scripts into the dev environment
gulp.task('build-app-scripts-dev', function() {
  _.forEach(allAppsPipes, function(pipe) {
    pipe.builtAppScriptsDev();
  });
});

// concatenates, uglifies, and moves app scripts and partials into the prod environment
gulp.task('build-app-scripts-prod', function() {
  _.forEach(allAppsPipes, function(pipe) {
    pipe.builtAppScriptsProd();
  });
});

// compiles app sass and moves to the dev environment
gulp.task('build-styles-dev', function() {
  _.forEach(allAppsPipes, function(pipe) {
    pipe.builtStylesDev();
  });
});

// compiles and minifies app sass to css and moves to the prod environment
gulp.task('build-styles-prod', function() {
  _.forEach(allAppsPipes, function(pipe) {
    pipe.builtStylesDev();
  });
});

// moves vendor scripts into the dev environment
gulp.task('build-vendor-scripts-dev', function() {
  _.forEach(allAppsPipes, function(pipe) {
    pipe.builtVendorScriptsDev();
  });
});

// concatenates, uglifies, and moves vendor scripts into the prod environment
gulp.task('build-vendor-scripts-prod', function() {
  _.forEach(allAppsPipes, function(pipe) {
    pipe.builtVendorScriptsProd();
  });
});

// validates and injects sources into index.html and moves it to the dev environment
gulp.task('build-index-dev', function() {
  _.forEach(allAppsPipes, function(pipe) {
    pipe.builtIndexDev();
  });
});

// validates and injects sources into index.html, minifies and moves it to the dev environment
gulp.task('build-index-prod', function() {
  _.forEach(allAppsPipes, function(pipe) {
    pipe.builtIndexProd();
  });
});

// builds a complete dev environment
gulp.task('build-app-dev', function() {
  _.forEach(allAppsPipes, function(pipe) {
    pipe.builtAppDev();
  });
});

// builds a complete prod environment
gulp.task('build-app-prod', function() {
  _.forEach(allAppsPipes, function(pipe) {
    pipe.builtAppProd();
  });
});

// cleans and builds a complete dev environment
gulp.task('clean-build-app-dev', ['clean-dev'], function() {
  _.forEach(allAppsPipes, function(pipe) {
    pipe.builtAppDev();
  });
});

// cleans and builds a complete prod environment
gulp.task('clean-build-app-prod', ['clean-prod'], function() {
  _.forEach(allAppsPipes, function(pipe) {
    pipe.builtAppProd();
  });
});

gulp.task('watch-dev', ['clean-build-app-dev', 'validate-devserver-scripts'], function() {

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
  gulp.watch(allAppsPaths.app.index, function() {
    return allAppsPipes.app.builtIndexDev()
      .pipe(plugins.livereload());
  });

  // watch app scripts
  gulp.watch(allAppsPaths.app.scripts, function() {
    return allAppsPipes.app.builtAppScriptsDev()
      .pipe(plugins.livereload());
  });

  // watch html partials
  gulp.watch(allAppsPaths.app.partials, function() {
    return allAppsPipes.app.builtPartialsDev()
      .pipe(plugins.livereload());
  });

  // watch styles
  gulp.watch(allAppsPaths.app.styles, function() {
    return allAppsPipes.app.builtStylesDev()
      .pipe(plugins.livereload());
  });


  // watch index
  gulp.watch(allAppsPaths.admin.index, function() {
    return allAppsPipes.admin.builtIndexDev()
      .pipe(plugins.livereload());
  });

  // watch app scripts
  gulp.watch(allAppsPaths.admin.scripts, function() {
    return allAppsPipes.admin.builtAppScriptsDev()
      .pipe(plugins.livereload());
  });

  // watch html partials
  gulp.watch(allAppsPaths.admin.partials, function() {
    return allAppsPipes.admin.builtPartialsDev()
      .pipe(plugins.livereload());
  });

  // watch styles
  gulp.watch(allAppsPaths.admin.styles, function() {
    return allAppsPipes.admin.builtStylesDev()
      .pipe(plugins.livereload());
  });

});

// default task builds for prod
gulp.task('default', ['clean-build-app-prod']);