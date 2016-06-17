var gulp = require('gulp');
var bump = require('gulp-bump');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var filter = require('gulp-filter');
var csso = require('gulp-csso');
var watch = require('gulp-watch');
var sass = require('gulp-ruby-sass');
var order = require("gulp-order");
var mainBowerFiles = require('main-bower-files');
var jasmine = require('gulp-jasmine');
var notify = require("gulp-notify");
var insert = require('gulp-insert');
var git = require('gulp-git');
var clean = require('gulp-clean');
var tag_version = require('gulp-tag-version');
var composer = require('gulp-composer');/*
 |--------------------------------------------------------------------------
 | Stylesheet Processing
 |--------------------------------------------------------------------------
 |
 | cleand, Build and concatenate all css scrips into one for global style useage
 |
 */
var filterByExtension = function (extension) {
    if (Array.isArray(extension)) {
        var extensions = extension.join('|');
        return filter(function (file) {
            return file.path.match(new RegExp('.(' + extensions + ')$'));
        });
    } else {
        return filter(function (file) {
            return file.path.match(new RegExp('.' + extension + '$'));
        });
    }
};
/*-------------------------------------*/
/*--------------CSS TASKS--------------*/
/*-------------------------------------*/
gulp.task('vendor-style-compile', ['Clean'], function () {
    var cssFilter = filter(['**/*.css']);
    return gulp.src(mainBowerFiles())
            .pipe(cssFilter)
            .pipe(concat('vendor.css'))
            .pipe(order([
                "fuelux.min.css"
            ]))
            .pipe(csso())
            .pipe(gulp.dest('Assets/public/css'));
});

gulp.task('admin-sass-compile', ['vendor-style-compile'], function () {
    return sass('assets/admin/dev/scss/*.scss', {
        loadPath: ['./']
    })
            .on('error', sass.logError)
            .pipe(csso())
            .pipe(gulp.dest('Assets/admin/css'));
});

gulp.task('public-sass-compile', ['vendor-style-compile'], function () {
    return sass('assets/public/dev/scss/*.scss', {
        loadPath: ['./']
    })
            .on('error', sass.logError)
            .pipe(csso())
            .pipe(gulp.dest('Assets/public/css'));
});

/*-------------------------------------*/
/*--------------JS TASKS--------------*/
/*-------------------------------------*/
gulp.task('vendor-js-compile', ['Clean'], function () {
    return gulp.src(mainBowerFiles())
            .pipe(filterByExtension('js'))
            .pipe(order([
                "jquery.js",
                "jquery.dataTables.min.js",
                "angular.js",
                "angular-cookies.js",
                "angular-resource.min.js",
                "valdr.js",
                "valdr-message.js",
                "bootstrap.js",
                "moment.js",
                "jquery-ui.js",
                "bootstrap-datepicker.js",
                "fuelux.min.js"
            ]))
            .pipe(concat('vendor.js'))
            .pipe(gulp.dest('Assets/public/js'));
});
gulp.task('js-compile', ['vendor-js-compile', 'views-compile', 'fonts-compile'], function () {
    return gulp.src(["Assets/**/dev/js/**/*.js"])
            .pipe(order([
                "app.js",
                "models/*.js"
            ]))
            .pipe(concat("app.js"))
            .pipe(gulp.dest("Assets/**/js"));
});
/*-------------------------------------*/
/*-------------VIEW TASKS--------------*/
/*-------------------------------------*/
gulp.task('views-compile', ['Clean'], function () {
    return gulp.src(["Assets/**/dev/js/**/*.html"])
            .pipe(gulp.dest("Assets/**/"));
});
/*-------------------------------------*/
/*-------------FONT TASKS--------------*/
/*-------------------------------------*/
gulp.task('fonts-compile', ['Clean'], function () {
    return gulp.src(mainBowerFiles())
            .pipe(filterByExtension([
                "eot",
                "svg",
                "ttf",
                "woff",
                "woff2"
            ]))
            .pipe(gulp.dest('Assets/public/fonts'));
});
//watch during dev
gulp.task('watch', ['Build'], function () {
    watch(['assets/**/dev/**/*.js', 'assets/**/dev/**/*.css', 'assets/**/dev/**/*.scss','assets/**/dev/**/*.html'], function () {
        gulp.start('Build');
    });
    watch('bower_components/**/*', function () {
        gulp.start('Build');
    });
    watch('bower.json', function () {
        gulp.start('Build');
    });
});

//build the app
gulp.task('Build', [
    'admin-sass-compile',
    'public-sass-compile',
    'js-compile'
], function () {
    return gulp.src('gulpfile.js').pipe(notify("Project Build Complete!"));
});

//clean the app
gulp.task('Clean', function () {
    return gulp.src([
        'Assets/public/fonts/*',
        'Assets/admin/fonts/*',
        'Assets/public/js/*',
        'Assets/admin/js/*',
        'Assets/public/css/*',
        'Assets/admin/css/*'
    ], {read: false})
            .pipe(clean());
});