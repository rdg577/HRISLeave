/// <vs />
const gulp = require('gulp');
const gutil = require('gulp-util');
var babel = require('gulp-babel');
var minify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
const fs = require('fs');
const path = require('path');
const browserify = require('browserify');
const watchify = require('watchify');
const fsPath = require('fs-path');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var es2015 = require('babel-preset-es2015');

function getFolders(dir) {
    return fs.readdirSync(dir)
    .filter(function (file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

const paths = [
    process.env.INIT_CWD + '\\ViewModels\\home',
    process.env.INIT_CWD + '\\ViewModels\\home\\components',
    process.env.INIT_CWD + '\\ViewModels\\common\\components'
];

function watchFolder(input, output) {
    var b = browserify({
        entries: [input],
        cache: {},
        packageCache: {},
        plugin: [watchify],
        basedir: process.env.INIT_CWD,
        paths: paths
    });

    function bundle() {
        b.bundle()
            .pipe(source('*.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(babel({ compact: false, presets: ['es2015'] }))
            // Add transformation tasks to the pipeline here.
            //.pipe(minify())
            //  .on('error', gutil.log)
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(output));

        gutil.log("Bundle rebuilt!");
    }
    b.on('update', bundle);
    bundle();
}

function compileJS(input, output) {
    // set up the browserify instance on a task basis
    var b = browserify({
        debug: true,
        entries: [input],
        basedir: process.env.INIT_CWD,
        paths: paths
    });

    return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(babel({ compact: false, presets: ['es2015'] }))
        // Add transformation tasks to the pipeline here.
        .pipe(minify())
        .on('error', gutil.log)
    //.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(output));
}

function compileJSVue(input, output) {
    // set up the browserify instance on a task basis
    var b = browserify({
        debug: true,
        entries: [input],
        basedir: process.env.INIT_CWD,
        paths: paths
    });

    return b.bundle()
    .pipe(source('vue-bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(babel({ compact: false, presets: ['es2015'] }))

    // Add transformation tasks to the pipeline here.
    .pipe(minify())
    .on('error', gutil.log)

    //.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(output));
}

function compileJSVue2(input, output, fn) {
    // set up the browserify instance on a task basis
    var b = browserify({
        debug: true,
        entries: [input],
        basedir: process.env.INIT_CWD,
        paths: paths
    });

    return b.bundle()
    .pipe(source(fn))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(babel({ compact: true, presets: ['es2015'] }))

    ////Add transformation tasks to the pipeline here.
    //.pipe(minify())
    //.on('error', gutil.log)

    //.pipe(sourcemaps.write('./'))

    .pipe(gulp.dest(output));
}

const scriptsPath = 'ViewModels';

gulp.task('build', function () {
    var folders = getFolders(scriptsPath);
    gutil.log(folders);
    folders.map(function (folder) {

        //// for my-leave and settings
        //if (fs.existsSync(scriptsPath + "//" + folder + "//main.js")) {
        //    compileJSVue2(scriptsPath + "//" + folder + "//main.js", "Scripts//app//" + folder, "main.js");
        //}
        //if (fs.existsSync(scriptsPath + "//" + folder + "//vue-main.js")) {
        //    compileJSVue2(scriptsPath + "//" + folder + "//vue-main.js", "Scripts//app//" + folder, "vue-main.js");
        //}

        ////// for create leave
        ////if (fs.existsSync(scriptsPath + "//" + folder + "//create.js")) {
        ////    compileJSVue2(scriptsPath + "//" + folder + "//create.js", "Scripts//app//" + folder, "create.js");
        ////}
        //if (fs.existsSync(scriptsPath + "//" + folder + "//vue-create.js")) {
        //    compileJSVue2(scriptsPath + "//" + folder + "//vue-create.js", "Scripts//app//" + folder, "vue-create.js");
        //}

        ////// for leave recommendation @ Office Levvel
        ////if (fs.existsSync(scriptsPath + "//" + folder + "//recommend.js")) {
        ////    compileJSVue2(scriptsPath + "//" + folder + "//recommend.js", "Scripts//app//" + folder, "recommend.js");
        ////}
        //if (fs.existsSync(scriptsPath + "//" + folder + "//vue-recommend.js")) {
        //    compileJSVue2(scriptsPath + "//" + folder + "//vue-recommend.js", "Scripts//app//" + folder, "vue-recommend.js");
        //}

        //// for leave recommendation @ HR Level
        //if (fs.existsSync(scriptsPath + "//" + folder + "//vue-recommend-hr.js")) {
        //    compileJSVue2(scriptsPath + "//" + folder + "//vue-recommend-hr.js", "Scripts//app//" + folder, "vue-recommend-hr.js");
        //}

        // for leave recommendation @ HR Level
        if (fs.existsSync(scriptsPath + "//" + folder + "//vue-reports.js")) {
            compileJSVue2(scriptsPath + "//" + folder + "//vue-reports.js", "Scripts//app//" + folder, "vue-reports.js");
        }

        // for leave approval
        //if (fs.existsSync(scriptsPath + "//" + folder + "//vue-approve.js")) {
        //    compileJSVue2(scriptsPath + "//" + folder + "//vue-approve.js", "Scripts//app//" + folder, "vue-approve.js");
        //}

        //// for leave-card
        //if (fs.existsSync(scriptsPath + "//" + folder + "//leave-card.js")) {
        //    compileJSVue2(scriptsPath + "//" + folder + "//leave-card.js", "Scripts//app//" + folder, "leave-card.js");
        //}
        //if (fs.existsSync(scriptsPath + "//" + folder + "//vue-leave-card.js")) {
        //    compileJSVue2(scriptsPath + "//" + folder + "//vue-leave-card.js", "Scripts//app//" + folder, "vue-leave-card.js");
        //}

        //// for utility
        //if (fs.existsSync(scriptsPath + "//" + folder + "//utility.js")) {
        //    compileJSVue2(scriptsPath + "//" + folder + "//utility.js", "Scripts//app//" + folder, "utility.js");
        //}

        ////  for edit
        //if (fs.existsSync(scriptsPath + "//" + folder + "//vue-edit.js")) {
        //    compileJSVue2(scriptsPath + "//" + folder + "//vue-edit.js", "Scripts//app//" + folder, "vue-edit.js");
        //}

        //// for restoration
        //if (fs.existsSync(scriptsPath + "//" + folder + "//vue-restoration.js")) {
        //    compileJSVue2(scriptsPath + "//" + folder + "//vue-restoration.js", "Scripts//app//" + folder, "vue-restoration.js");
        //}

        // for restoration
        if (fs.existsSync(scriptsPath + "//" + folder + "//vue-UtilityForwardedLeaveCreditsView.js")) {
            compileJSVue2(scriptsPath + "//" + folder + "//vue-UtilityForwardedLeaveCreditsView.js", "Scripts//app//" + folder, "vue-UtilityForwardedLeaveCreditsView.js");
        }
    });
});

gulp.task('default', function () {
    var folders = getFolders(scriptsPath);
    gutil.log(folders);
    folders.map(function (folder) {
        watchFolder(scriptsPath + "//" + folder + "//*.js", "Scripts//app//" + folder);
    });
});