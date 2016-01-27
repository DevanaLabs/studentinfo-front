var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var gulpIgnore = require('gulp-ignore');
var es = require('event-stream');
var bowerFiles = require('main-bower-files');
var print = require('gulp-print');
var Q = require('q');

// == PATH STRINGS ========

var appPaths = {
    scripts: ['src/**/*.js', '!src/bower_components/**/*.js'],
    styles: ['src/styles/**/*.*'],
    images: 'src/images/**/*',
    index: './src/index.html',
    partials: ['src/**/*.html', '!src/index.html'],
    distDev: './dist',
    distProd: './dist',
    distScriptsProd: './dist/scripts',
    scriptsDevServer: 'devServer/**/*.js'
};

var adminPaths = {
    scripts: ['src/admin/**/*.js'],
    styles: ['src/admin/styles/**/*.css'],
    images: ['./images/**/*', './src/admin/**/*.png'],
    index: './src/admin/index.html',
    partials: ['src/admin/**/*.html', '!src/admin/index.html'],
    distDev: './dist/admin',
    distProd: './dist/admin',
    distScriptsProd: './dist/scripts',
    scriptsDevServer: 'devServer/**/*.js'
}

// == PIPE SEGMENTS ========

var pipes = {};

pipes.orderedVendorScripts = function(paths) {
    return plugins.order(['jquery.js', 'angular.js']);
};

pipes.orderedAppScripts = function(paths) {
    return plugins.angularFilesort();
};

pipes.minifiedFileName = function(paths) {
    return plugins.rename(function (path) {
        path.extname = '.min' + path.extname;
    });
};

pipes.validatedAppScripts = function(paths) {
    return gulp.src(paths.scripts)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
};

pipes.builtAppScriptsDev = function(paths) {
    return pipes.validatedAppScripts()
        .pipe(gulp.dest(paths.distDev));
};

pipes.builtAppScriptsProd = function(paths) {
    var scriptedPartials = pipes.scriptedPartials(paths);
    var validatedAppScripts = pipes.validatedAppScripts(paths);

    return es.merge(scriptedPartials, validatedAppScripts)
        .pipe(pipes.orderedAppScripts(paths))
        .pipe(plugins.sourcemaps.init())
            .pipe(plugins.concat('app.min.js'))
            .pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(paths.distScriptsProd));
};

pipes.builtVendorScriptsDev = function(paths) {
    return gulp.src(bowerFiles())
        .pipe(gulp.dest('dist/bower_components'));
};

pipes.builtVendorScriptsProd = function(paths) {
    return gulp.src(bowerFiles('**/*.js'))
        .pipe(pipes.orderedVendorScripts(paths))
        .pipe(plugins.concat('vendor.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(paths.distScriptsProd));
};

pipes.validatedDevServerScripts = function(paths) {
    return gulp.src(paths.scriptsDevServer)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
};

pipes.validatedPartials = function(paths) {
    return gulp.src(paths.partials)
        .pipe(plugins.htmlhint({'doctype-first': false}))
        .pipe(plugins.htmlhint.reporter());
};

pipes.builtPartialsDev = function(paths) {
    return pipes.validatedPartials(paths)
        .pipe(gulp.dest(paths.distDev));
};

pipes.scriptedPartials = function(paths) {
    return pipes.validatedPartials(paths)
        .pipe(plugins.htmlhint.failReporter())
        .pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(plugins.ngHtml2js({
            moduleName: "student-info-frontend"
        }));
};

pipes.builtStylesDev = function(paths) {
    return gulp.src(paths.styles)
        .pipe(plugins.sass())
        .pipe(gulp.dest(paths.distDev));
};

pipes.builtStylesProd = function(paths) {
    return gulp.src(paths.styles)
        .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass())
            .pipe(plugins.minifyCss())
        .pipe(plugins.sourcemaps.write())
        .pipe(pipes.minifiedFileName(paths))
        .pipe(gulp.dest(paths.distProd));
};

pipes.processedImagesDev = function(paths) {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.distDev + '/images/'));
};

pipes.processedImagesProd = function(paths) {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.distProd + '/images/'));
};

pipes.validatedIndex = function(paths) {
    return gulp.src(paths.index)
        .pipe(plugins.htmlhint())
        .pipe(plugins.htmlhint.reporter());
};

pipes.builtIndexDev = function(paths) {

    var orderedVendorScripts = pipes.builtVendorScriptsDev(paths)
        .pipe(pipes.orderedVendorScripts(paths));

    var orderedAppScripts = pipes.builtAppScriptsDev(paths)
        .pipe(pipes.orderedAppScripts(paths));

    var appStyles = pipes.builtStylesDev(paths);

    return pipes.validatedIndex(paths)
        .pipe(gulp.dest(paths.distDev)) // write first to get relative path for inject
        .pipe(plugins.inject(orderedVendorScripts, {relative: true, name: 'bower'}))
        .pipe(plugins.inject(orderedAppScripts, {relative: true}))
        .pipe(plugins.inject(appStyles, {relative: true}))
        .pipe(gulp.dest(paths.distDev));
};

pipes.builtIndexProd = function(paths) {

    var vendorScripts = pipes.builtVendorScriptsProd(paths);
    var appScripts = pipes.builtAppScriptsProd(paths);
    var appStyles = pipes.builtStylesProd(paths);

    return pipes.validatedIndex(paths)
        .pipe(gulp.dest(paths.distProd)) // write first to get relative path for inject
        .pipe(plugins.inject(vendorScripts, {relative: true, name: 'bower'}))
        .pipe(plugins.inject(appScripts, {relative: true}))
        .pipe(plugins.inject(appStyles, {relative: true}))
        .pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(gulp.dest(paths.distProd));
};

pipes.builtAppDev = function(paths) {
    return es.merge(pipes.builtIndexDev(paths), pipes.builtPartialsDev(paths), pipes.processedImagesDev(paths));
};

pipes.builtAppProd = function(paths) {
    //return es.merge(pipes.builtIndexProd(), pipes.processedImagesProd());
    return es.merge(pipes.builtIndexProd(paths), pipes.builtPartialsDev(paths), pipes.processedImagesProd(paths));

};

// == TASKS ========

// removes all compiled dev files
gulp.task('clean-dev', function() {
    var deferred = Q.defer();
    del(paths.distDev, function() {
        deferred.resolve();
    });
    return deferred.promise;
});

// removes all compiled production files
gulp.task('clean-prod', function() {
    var deferred = Q.defer();
    del(paths.distProd, function() {
        deferred.resolve();
    });
    return deferred.promise;
});

// checks html source files for syntax errors
gulp.task('validate-partials', pipes.validatedPartials);

// checks index.html for syntax errors
gulp.task('validate-index', pipes.validatedIndex);

// moves html source files into the dev environment
gulp.task('build-partials-dev', pipes.builtPartialsDev);

// converts partials to javascript using html2js
gulp.task('convert-partials-to-js', pipes.scriptedPartials);

// runs jshint on the dev server scripts
gulp.task('validate-devserver-scripts', pipes.validatedDevServerScripts);

// runs jshint on the app scripts
gulp.task('validate-app-scripts', pipes.validatedAppScripts);

// moves app scripts into the dev environment
gulp.task('build-app-scripts-dev', pipes.builtAppScriptsDev);

// concatenates, uglifies, and moves app scripts and partials into the prod environment
gulp.task('build-app-scripts-prod', pipes.builtAppScriptsProd);

// compiles app sass and moves to the dev environment
gulp.task('build-styles-dev', pipes.builtStylesDev);

// compiles and minifies app sass to css and moves to the prod environment
gulp.task('build-styles-prod', pipes.builtStylesProd);

// moves vendor scripts into the dev environment
gulp.task('build-vendor-scripts-dev', pipes.builtVendorScriptsDev);

// concatenates, uglifies, and moves vendor scripts into the prod environment
gulp.task('build-vendor-scripts-prod', pipes.builtVendorScriptsProd);

// validates and injects sources into index.html and moves it to the dev environment
gulp.task('build-index-dev', pipes.builtIndexDev);

// validates and injects sources into index.html, minifies and moves it to the dev environment
gulp.task('build-index-prod', pipes.builtIndexProd);

// builds a complete dev environment
gulp.task('build-app-dev', pipes.builtAppDev);

// builds a complete prod environment
gulp.task('build-app-prod', pipes.builtAppProd);

// cleans and builds a complete dev environment
gulp.task('clean-build-app-dev', ['clean-dev'], pipes.builtAppDev);

// cleans and builds a complete prod environment
gulp.task('clean-build-app-prod', ['clean-prod'], pipes.builtAppProd);

// clean, build, and watch live changes to the dev environment
gulp.task('watch-dev', ['clean-build-app-dev', 'validate-devserver-scripts'], function() {

    gulp.src('.')
        .pipe(plugins.webserver({
            livereload: false,
            directoryListing: true
        }));

    // start live-reload server
    plugins.livereload.listen({ start: true });

    // watch index
    gulp.watch(paths.index, function() {
        return pipes.builtIndexDev()
            .pipe(plugins.livereload());
    });

    // watch app scripts
    gulp.watch(paths.scripts, function() {
        return pipes.builtAppScriptsDev()
            .pipe(plugins.livereload());
    });

    // watch html partials
    gulp.watch(paths.partials, function() {
        return pipes.builtPartialsDev()
            .pipe(plugins.livereload());
    });

    // watch styles
    gulp.watch(paths.styles, function() {
        return pipes.builtStylesDev()
            .pipe(plugins.livereload());
    });

});

// clean, build, and watch live changes to the prod environment
gulp.task('watch-prod', ['clean-build-app-prod', 'validate-devserver-scripts'], function() {

    // start nodemon to auto-reload the dev server
    //plugins.nodemon({ script: 'server.js', ext: 'js', watch: ['devServer/'], env: {NODE_ENV : 'production'} })
    //    .on('change', ['validate-devserver-scripts'])
    //    .on('restart', function () {
    //        console.log('[nodemon] restarted dev server');
    //    });


    gulp.src('.')
        .pipe(plugins.webserver({
            livereload: false,
            directoryListing: true
        }));

    // start live-reload server
    plugins.livereload.listen({start: true});

    // watch index
    gulp.watch(paths.index, function() {
        return pipes.builtIndexProd()
            .pipe(plugins.livereload());
    });

    // watch app scripts
    gulp.watch(paths.scripts, function() {
        return pipes.builtAppScriptsProd()
            .pipe(plugins.livereload());
    });

    // watch hhtml partials
    gulp.watch(paths.partials, function() {
        return pipes.builtAppScriptsProd()
            .pipe(plugins.livereload());
    });

    // watch styles
    gulp.watch(paths.styles, function() {
        return pipes.builtStylesProd()
            .pipe(plugins.livereload());
    });

});

// default task builds for prod
gulp.task('default', ['clean-build-app-prod']);