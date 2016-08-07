/// <binding ProjectOpened='watch' />
var gulp = require("gulp"),
    concat = require("gulp-concat"),
    pump = require("pump"),
    rename = require("gulp-rename"),
    runsequence = require("run-sequence"),
    sourcemaps = require("gulp-sourcemaps"),
    ts = require("gulp-typescript"),
    uglify = require("gulp-uglify");

// Javascript tasks

gulp.task("ts", function (cb) {
    pump([
        gulp.src("SiteMap/**/*.ts"),
        sourcemaps.init(),
        ts({
            noImplicitAny: true,
            out: "sitemapts.js",
            target: "es5"
        }),
        sourcemaps.write("./"),
        gulp.dest("dist")
    ],
    cb);
});

gulp.task("js:debug", function (cb) {
    pump([
        gulp.src(["dist/sitemapts.js", "dist/xml2json.js"]),
        concat("sitemap.js"),
        gulp.dest("dist")
    ],
    cb);
});

gulp.task("js:release", function (cb) {
    pump([
        gulp.src(["dist/sitemap.js"]),
        rename("sitemap.min.js"),
        uglify({
            preserveComments: 'license'
        }),
        gulp.dest("dist/min")
    ],
    cb);
});

gulp.task("ts:build", function (cb) {
    runsequence(
        "ts",
        "js:debug",
        "js:release",
        cb);
});

// CSS Tasks

var postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    atImport = require("postcss-import")
    nested = require("postcss-nested"),
    uglifycss = require("gulp-uglifycss");

gulp.task("css:debug", function (cb) {
    var processors = [
        atImport(),
        autoprefixer({ browsers: ['last 1 version'] }),
        nested()
    ];

    pump([
        gulp.src("Styles/SiteMapConverter.css"),
        rename("sitemap.css"),
        postcss(processors),
        gulp.dest("dist")
    ],
    cb);
});

gulp.task("css:release", function (cb) {
    pump([
        gulp.src(["dist/sitemap.css"]),
        rename("sitemap.min.css"),
        uglifycss(),
        gulp.dest("dist/min")
    ],
    cb);
});

gulp.task("css:build", function (cb) {
    runsequence(
        "css:debug",
        "css:release",
        cb);
});

// Full build and watchers

gulp.task("build", ["ts:build", "css:build"]);

gulp.task("watch:ts", function () {
    gulp.watch("SiteMap/**/*.ts", ["ts", "js:debug"]);
});

gulp.task("watch:css", function () {
    gulp.watch("Styles/**/*.css", ["css:debug"]);
});

gulp.task("watch", ["watch:ts", "watch:css"]);