'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

const nunjucksRender = require('gulp-nunjucks-render');
const autoprefixer = require('gulp-autoprefixer');
const supportedBrowsers = ['last 2 versions', 'Firefox ESR', 'Safari >= 8', '>1%'];

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./sass/*.scss", ['sass']);
    gulp.watch("./*.html,./*.nunjucks").on('change', browserSync.reload);
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

gulp.task('nunjucks', function(){
    return gulp.src('pages/**/*.+(html|nunjucks)')
        .pipe(nunjucksRender({
            path: ['templates']
        }))
        .pipe(gulp.dest('./'))
})

gulp.task('default', ['serve', 'nunjucks']);