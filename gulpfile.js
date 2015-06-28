var gulp        = require('gulp');
var gutil       = require('gulp-util');
var source      = require('vinyl-source-stream');
var babelify    = require('babelify');
var reactify    = require('reactify');
var watchify    = require('watchify');
var browserify  = require('browserify');
var bs          = require('browser-sync').create();

// Input file.
var bundler     = watchify(browserify('./js/app.js', watchify.args));

// React JSX transform
bundler.transform(reactify);

// Babel transform
bundler.transform(babelify.configure({
    sourceMapRelative: 'js'
}));

// On updates recompile
bundler.on('update', bundle);

function bundle() {

    console.time('bundle');
    gutil.log('Compiling JS...');

    return bundler.bundle()
        .on('error', function (err) {
            gutil.log(err.message);
            bs.notify("Browserify Error!");
            this.emit("end");
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./js/dist'))
        .on('end', function () {
            console.timeEnd('bundle');
        })
        .pipe(bs.stream({once: true}))
}

/**
 * Gulp task alias
 */
gulp.task('bundle', function () {
    return bundle();
});

/**
 * First bundle, then serve from the ./app directory
 */
gulp.task('default', ['bundle'], function () {
    bs.init({
        server: true
    });
    bs.watch('*.html', bs.reload);
});