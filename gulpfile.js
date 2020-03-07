const {src, dest, watch, parallel, series} = require('gulp'),
      autoprefixer = require('gulp-autoprefixer'),
      connect =   require('gulp-connect'),
      sass =      require('gulp-sass'),
      rename =    require('gulp-rename'),
      sourceMaps = require('gulp-sourcemaps'),
      stripComments = require('gulp-strip-comments'),
      concatCss = require('gulp-concat-css');

function connectTask(done) {
    connect.server({
        root: 'build',
        port: 8090,
        livereload: true
    }, function () {
        this.server.on('close', done);
    });
}

function reloadTask(done) {
    src('src/views/index.html')
        .pipe(stripComments.html())
        .pipe(dest('build'))
        .pipe(connect.reload());
    done();
}

function jsTask(done) {
    src('src/js/*.js')
        .pipe(dest('build/js'))
        .pipe(connect.reload());
    done();
}

function cssTask() {
    return src('src/style/main.scss')
        .pipe(sourceMaps.init())
        .pipe(sass().on('error', sass.logError))
        /*.pipe(autoprefixer({
           browsers: ['last 15 versions'],
           cascade: false
        }))*/
        .pipe(sourceMaps.write())
        .pipe(rename('main.css'))
        .pipe(dest('build'))
        // .pipe(dest('style-source/css'));
        .pipe(connect.reload());
}

function concatCssTask() {
    return src(['style-source/css/orig.css', 'style-source/css/main.css'])
        .pipe(concatCss("style.css"))
        .pipe(dest('build'))
        .pipe(connect.reload());
}

function watchTask() {
    watch(['src/style/*.scss'], cssTask);
    watch('src/js/*.js', jsTask);
    // gulp.watch('build/img/!*.*', ['reload']);
    // gulp.watch('build/fonts/!*.*', ['reload']);
    watch(['src/views/index.html'], reloadTask);
    // watch('scripts-source/scripts.js', jsTask);
}

exports.style = cssTask;
exports.default = parallel(connectTask, reloadTask, cssTask, jsTask, watchTask);
