var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    csscomb = require('gulp-csscomb'),
    path = require('path'),
    plumber = require('gulp-plumber'),
    debug = require('gulp-debug'),
    uglifycss = require('gulp-uglifycss'),
    uncss = require('gulp-uncss'),
    notify = require('gulp-notify');


gulp.task('sass', function () {
    var sassPaths = [
      //  'node_modules/bootstrap/scss/bootstrap'
       /* 'bower_components/foundation-sites/scss',
        'bower_components/motion-ui/src'*/
    ];
    return gulp.src('sass/app.scss')
        .pipe(debug({title: '!error:'}))
        .pipe(plumber())
        .pipe(sass({
            includePaths:  sassPaths
        }).on('error', notify.onError({
            message: "<%= error.message %>",
            title: "Slick Error! �� ����!"
        })))

        .pipe(autoprefixer(['last 25 versions', '> 1%', 'ie 8', 'ie 9', 'ie 10', 'ie 11'], {cascade: true}))
        .pipe(csscomb())
        .pipe(uglifycss({
            "uglyComments": true
        }))
        .pipe(gulp.dest('web/css'))
        .pipe(browserSync.reload({stream: true}))
        .pipe(notify('SASS - hyuyas!'));
});
gulp.task('browser-sync', function () {
    browserSync.init({
        proxy: "sass-lib.ru",
        //    browser: "chromium",
        notify: false
    });
});

gulp.task('clean', function () {
    return del.sync('*.+(html|php)');
});

gulp.task('clear', function () {
    return cache.clearAll();
});
gulp.task('watch', ['browser-sync', 'sass'], function () {
    gulp.watch('sass/*.scss', ['sass'], browserSync.reload);
    gulp.watch('node_modules/bootstrap/scss/*.scss', ['sass'], browserSync.reload);
    gulp.watch('**.php', browserSync.reload);
    gulp.watch('*/**.php', browserSync.reload);
    gulp.watch('*/*/**.php', browserSync.reload);
    gulp.watch('*/*/*/**.php', browserSync.reload);
});