'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const php = require('gulp-connect-php');

const imagemin = require('gulp-imagemin');

gulp.task('optimise', () =>
    gulp.src('./images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);

const nunjucksRender = require('gulp-nunjucks-render');
const autoprefixer = require('gulp-autoprefixer');
const supportedBrowsers = ['last 2 versions', 'Firefox ESR', 'Safari >= 8', '>1%'];

gulp.task('serve', ['sass', 'nunjucks'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch(["./sass/*.scss","./sass/**/*.scss"], ['sass']);
    gulp.watch(["./templates/**/*.+(html|nunjucks)","./pages/**/*.+(html|nunjucks)"], ['nunjucks']);
});

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

gulp.task('php', function() {
    php.server({ base: './', port: 8010, keepalive: true});
});

gulp.task('nunjucks', function(){
    return gulp.src('./pages/**/*.+(html|nunjucks)')
        .pipe(nunjucksRender({
            path: ['templates']
        }))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
})

gulp.task('default', ['serve']);