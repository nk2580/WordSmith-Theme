'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var minify = require('gulp-minify');
var concat = require('gulp-concat');


//Define paths relative to theme root
var assets = {
    admin: {
        dev: "./assets/admin/dev",
        dist: "./assets/admin"
    },
    public: {
        dev: "./assets/public/dev",
        dist: "./assets/public"
    }
};

//css concatenation and minifying
gulp.task('admin:css:compile', function () {
    return gulp.src(assets.admin.dev + '/css/**/*.css')
            .pipe(minifyCss({compatibility: 'ie8'}))
            .pipe(concat('app.min.css'))
            .pipe(gulp.dest(assets.admin.dist + '/css'));
});

gulp.task('public:css:compile', function () {
    return gulp.src(assets.public.dev + '/css/**/*.css')
            .pipe(minifyCss({compatibility: 'ie8'}))
            .pipe(concat('app.min.css'))
            .pipe(gulp.dest(assets.public.dist + '/css'));
});

//css concatenation and minifying
gulp.task('admin:js:compile', function () {
    return gulp.src(assets.admin.dev + '/js/**/*.js')
            .pipe(concat('app.js'))
            .pipe(minify())
            .pipe(gulp.dest(assets.admin.dist + '/js'))
});

gulp.task('public:js:compile', function () {
    return gulp.src(assets.public.dev + '/js/**/*.js')
            .pipe(concat('app.js'))
            .pipe(minify())
            .pipe(gulp.dest(assets.public.dist + '/js'))
});


gulp.task('watch',
        [
            'admin:css:compile',
            'public:css:compile',
            'admin:js:compile',
            'public:js:compile'
        ],
        function () {
            console.log("Gulp has been started and the watch for files has begun!");
            //watch and compile css files
            gulp.watch(assets.public.dev + '/css/**/*.css', ['public:css:compile']);
            gulp.watch(assets.admin.dev + '/css/**/*.css', ['admin:css:compile']);
            //watch and compile css files
            gulp.watch(assets.public.dev + '/js/**/*.js', ['public:js:compile']);
            gulp.watch(assets.admin.dev + '/js/**/*.js', ['admin:js:compile']);
        });
