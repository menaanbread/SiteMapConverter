"use strict";

var gulp = require("gulp"),
  sourcemaps = require('gulp-sourcemaps'),
  rimraf = require("rimraf"),
  concat = require("gulp-concat"),
  cssmin = require("gulp-cssmin"),
  uglify = require("gulp-uglify"),
  ts = require("gulp-typescript"),
  tslint = require("gulp-tslint"),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  precss = require('precss'),
  mqpacker = require('css-mqpacker'),
  nested = require('postcss-nested'),
  rename = require("gulp-rename"),
  stylelint = require("gulp-stylelint").default,
  consolereporter = require("gulp-stylelint-console-reporter").default,
  pump = require('pump');

var webroot = "./Scripts/";

var paths = {
    js: "./dist/**/*.js",
    minJs: webroot + "js/**/*.min.js",
    ts: "*.ts",
    tsOut: "./dist",
    precss: webroot + "css/pre/**/*.post",
    postcss: webroot + "css/post/",
    css: webroot + "css/**/*.css",
    minCss: webroot + "css/**/*.min.css",
    concatJsDest: webroot + "js/site.min.js",
    concatCssDest: webroot + "css/site.min.css"
};

// Typescript

gulp.task("ts:compile", function () {
    return gulp.src(paths.ts)
        .pipe(sourcemaps.init())
        .pipe(ts({
            allowJs: true,
            noImplicitAny: true,
            target: "ES6",
            sourceMap: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.tsOut));
});

gulp.task("ts:lint", function () {
    return gulp.src(paths.ts)
        .pipe(tslint())
        .pipe(tslint.report("verbose"))
});

gulp.task("ts", ["ts:lint", "ts:compile"])

// Post CSS

gulp.task('postcss', function () {
    var processors = [
        precss,
        autoprefixer({ browsers: ['last 2 versions'] }),
        mqpacker,
        nested
    ];
    return gulp.src(paths.precss)
        .pipe(postcss(processors))
        .pipe(rename({
            extname: ".css"
        }))
        .pipe(gulp.dest(paths.postcss));
});

gulp.task('lint-css', function () {
    return gulp.src(paths.precss)
      .pipe(stylelint({
          reporters: [
            consolereporter()
          ]
      }));
});

gulp.task("watch:ts", ["ts:lint", "ts:compile"], function () {
    gulp.watch(paths.ts, ["ts:lint", "ts:compile"]);
});

gulp.task("watch:css", ["lint-css", "postcss"], function () {
    gulp.watch(paths.precss, ["lint-css", "postcss"]);
});

gulp.task("watch", ["watch:ts", "watch:css"]);

// Release

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function (cb) {
    pump([
          gulp.src(paths.js),
          uglify(),
          gulp.dest("dist")
    ],
      cb
    );
});

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
      .pipe(concat(paths.concatCssDest))
      .pipe(cssmin())
      .pipe(gulp.dest("."));
});

// Build jobs

gulp.task("build:dev", ["ts:lint", "ts:compile", "lint-css", "postcss"]);

gulp.task("build:release", ["min:js", "min:css"]);

gulp.task("build", ["build:dev", "build:release"]);
