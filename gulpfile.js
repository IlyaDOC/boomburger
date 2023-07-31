'use strict'

const {watch, series, src, dest} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');

exports.sass = function () {
    return src('./src/styles/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('src/dist'));
}


exports.watch = function () {
    watch('./src/styles/*.scss', series('sass'));
};