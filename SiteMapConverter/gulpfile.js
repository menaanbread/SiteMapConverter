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
        sourcemaps.init(),
        concat("sitemap.js"),
        sourcemaps.write("./"),
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