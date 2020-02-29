require("dotenv-flow").config({
    silent: true,
});
require("babel-register");

// const gulpif = require("gulp-if");
const gulp = require("gulp");

// Mocha, our test framework
const mocha = require("gulp-mocha");

// Isparta, our code instrument
const isparta = require("isparta");

// Istanbul, our code coverage tool
const istanbul = require("gulp-istanbul");

// Gulp requirements
const concat = require("gulp-concat");

// Less, our CSS pre-compiler
// const less = require('gulp-less');

// SASS, our CSS pre-compiler
// const sass = require('gulp-sass');

// CSS minify and cleaner
const cleanCSS = require("gulp-clean-css");

// Webpack, our module bundle
const webpackLess = require("gulp-webpack");
const webpack = require("webpack");

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// new BundleAnalyzerPlugin()

// Sourcemaps
// const sourcemaps = require("gulp-sourcemaps");

const {
    NODE_ENV,
    APP_NAME,
} = process.env;

console.log(`${APP_NAME} is now building the client in ${NODE_ENV}.`);
const preTest = {};
/**
 * Pre-Test task to hook requires translated by Babel
 */
preTest.dependencies = () => gulp.src([
    "!./server/components/**/index.js",
    "./server/components/**/*.js",
])
    .pipe(istanbul({
        instrumenter: isparta.Instrumenter,
        includeUntested: true,
    }))
    .pipe(istanbul.hookRequire());

preTest.test = () => gulp.src([
    "./server/tests/**/unitTests/*.js",
    "./server/tests/**/integrationTests/*.js",
], { read: false })
    .pipe(mocha({
        reporter: "spec",
        require: "esm",
    }));

preTest.coverage = () => gulp.src([
    "./server/tests/**/unitTests/*.js",
    "./server/tests/**/integrationTests/*.js",
], { read: false })
    .pipe(mocha({ reporter: "spec" }))
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 75 } }));

/**
 * SASS Compile Task
 */

/* gulp.task('sassCompile', function() {

 gulp.src([
 './client/common/components/!*.scss'
 ])
 .pipe(sourcemaps.init())
 .pipe(sass())
 .pipe(concat('style.css'))
 .pipe(gulpif(!env.DEBUG, cleanCSS({compatibility: 'ie8'})))
 .pipe(sourcemaps.write())
 .pipe(gulp.dest('./public/resources/css/'));

 });*/

/**
 * Less Compile Task
 */
/* gulp.task('lessCompile', function() {

 gulp.src([
 './client/common/components/!*!/!*.style.less',
 ])
 .pipe(sourcemaps.init())
 .pipe(less())
 .pipe(concat('style.css'))
 .pipe(gulpif(!env.DEBUG, cleanCSS({compatibility: 'ie8'})))
 .pipe(sourcemaps.write())
 .pipe(gulp.dest('./public/resources/css/'));

 });*/

/**
 * CSS Compile Task
 */
gulp.task("cssCompile", () => gulp.src([
    "./client/common/components/**/*.css",
    "./client/common/css/*.css",
])
    .pipe(concat("bundle.css"))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("./public/resources/css/")));

/**
 * WebPack Compile Task
 */
gulp.task("webpackCompile", () => {
    /**
     * Client JS files
     */

    const isProduction = NODE_ENV === "production";
    const isStaging = NODE_ENV === "staging";
    const debug = !isProduction && !isStaging;

    const plugins = [
        new webpack.DefinePlugin({
            "process.env": {
                DEBUG: !isProduction && !isStaging,
                NODE_ENV: isProduction ? JSON.stringify("production") : undefined,
            },
        }),
    ];

    if(isProduction || isStaging) {
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            minimize: isProduction,
            sourceMap: debug,
            output: {
                comments: debug,
            },
            compressor: {
                warnings: false,
            },
            debug: `${debug}`,
        }));
    }

    return gulp.src("./client/app/index.js")
        .pipe(webpackLess({
            plugins,
            module: {
                loaders: [
                    {
                        test: /\.jsx?$/,
                        exclude: /node_modules/,
                        loader: "babel-loader",
                        query: {
                            presets: ["env", "react"],
                        },
                    },
                    {
                        test: /\.json$/,
                        loader: "json-loader",
                    },
                ],
            },
            output: {
                filename: "bundle.js",
            },
            resolve: {
                extensions: ["", ".js", ".jsx", ".json"],
            },
        }))
        .pipe(gulp.dest("./public/resources/js/"));
});

// gulp.task('default', ['sassCompile', 'webpackCompile']);
// gulp.task('default', ['lessCompile', 'webpackCompile']);

// gulp.task("default", ["cssCompile", "webpackCompile"]);

module.exports.default = gulp.series(gulp.task("cssCompile"), gulp.task("webpackCompile"));
module.exports.test = gulp.series(preTest.dependencies, preTest.test, preTest.coverage);