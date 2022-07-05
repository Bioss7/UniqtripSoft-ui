"use strict";

const { src, dest } = require("gulp");
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const cssbeautify = require("gulp-cssbeautify");
const removeComments = require('gulp-strip-css-comments');
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const cssnano = require("gulp-cssnano");
const uglify = require("gulp-uglify");
const plumber = require("gulp-plumber");
const panini = require("panini");
const imagemin = require("gulp-imagemin");
const del = require("del");
const notify = require("gulp-notify");
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const flatten = require('gulp-flatten');
const concat = require('gulp-concat-css');
const replace = require('gulp-replace');
const rev_append = require('gulp-rev-append');
const hash = require('gulp-hash');
const inject = require('gulp-inject');

const browserSync = require("browser-sync").create();


/* Paths */
const srcPath = 'src/';
const distPath = 'dist/';

const path = {
    build: {
        html: distPath + "public/", /* Если не хотим чтобы проект лежал в папке public - убираем */
        js: distPath + "assets/js/",
        vendor: distPath + "assets/js/vendor/",
        css: distPath + "assets/css/",
        images: distPath + "assets/images/",
        fonts: distPath + "assets/fonts/"
    },
    src: {
        html: srcPath + "public/**/*.html",
        js: srcPath + "assets/js/*.js",
        vendor: srcPath + "assets/js/vendor/*.js",
        css: srcPath + "assets/scss/*.scss",
        images: srcPath + "assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}",
        fonts: srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}"
    },
    watch: {
        html: srcPath + "public/**/*.html",
        js: srcPath + "assets/js/**/*.js",
        vendor: srcPath + "assets/js/vendor/*.js",
        css: srcPath + "assets/scss/**/*.scss",
        images: srcPath + "assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}",
        fonts: srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}"
    },
    clean: "./" + distPath
}



/* Tasks */

function serve() {
    browserSync.init({
        server: {
            baseDir: "./" + distPath
        }
    });
}

function html(cb) {
    panini.refresh();
    return src(path.src.html, { base: srcPath })
        .pipe(plumber())
        .pipe(panini({
            root: srcPath + 'public/',
            layouts: srcPath + 'layouts/',
            partials: srcPath + 'partials/',
            helpers: srcPath + 'helpers/',
            data: srcPath + 'data/'
        }))
        .pipe(flatten({ subPath: [1] }))
        .pipe(dest(path.build.html))
        .pipe(browserSync.reload({ stream: true }));

    cb();
}

function css(cb) {
    return src(path.src.css, { base: srcPath + "assets/scss/" })
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: "SCSS Error",
                    message: "Error: <%= error.message %>"
                })(err);
                this.emit('end');
            }
        }))
        .pipe(sass({
            includePaths: './node_modules/'
        }))
        .pipe(autoprefixer({
            cascade: true
        }))
        .pipe(cssbeautify())
        .pipe(dest(path.build.css))
        .pipe(cssnano({
            zindex: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(removeComments())
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browserSync.reload({ stream: true }));

    cb();
}

function cssWatch(cb) {
    return src(path.src.css, { base: srcPath + "assets/scss/" })
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: "SCSS Error",
                    message: "Error: <%= error.message %>"
                })(err);
                this.emit('end');
            }
        }))
        .pipe(sass({
            includePaths: './node_modules/'
        }))
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browserSync.reload({ stream: true }));

    cb();
}

function cssReplaceAbsolute(cb) {
    return src(['./dist/assets/css/**/*.css'])
        .pipe(replace("../", "/assets/"))
        .pipe(gulp.dest(path.build.css));
}

function js(cb) {
    return src(path.src.js, { base: srcPath + 'assets/js/' })
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: "JS Error",
                    message: "Error: <%= error.message %>"
                })(err);
                this.emit('end');
            }
        }))
        .pipe(webpackStream({
            mode: "production",
            output: {
                filename: 'app.js',
            },
            module: {
                rules: [
                    {
                        test: /\.(js)$/,
                        exclude: /(node_modules)/,
                        loader: 'babel-loader',
                        query: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            }
        }))
        .pipe(dest(path.build.js))
        .pipe(browserSync.reload({ stream: true }));

    cb();
}

function jsWatch(cb) {
    return src(path.src.js, { base: srcPath + 'assets/js/' })
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: "JS Error",
                    message: "Error: <%= error.message %>"
                })(err);
                this.emit('end');
            }
        }))
        .pipe(webpackStream({
            mode: "development",
            output: {
                filename: 'app.js',
            },
            module: {
                rules: [
                    {
                        test: /\.(js)$/,
                        exclude: /(node_modules)/,
                        loader: 'babel-loader',
                        query: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            }
        }))
        .pipe(dest(path.build.js))
        .pipe(browserSync.reload({ stream: true }));

    cb();
}

function jsVendor(){
    return src(path.src.vendor, { base: srcPath + 'assets/js/vendor'})
        .pipe(src('vendor/*.js'))
        .pipe(dest(path.build.vendor))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        // .pipe(rename({ extname: '.js' }))
        .pipe(dest(path.build.vendor));
}

function hashJS(cb) {
    return gulp.src(path.src.js, { base: srcPath + 'assets/js/' })
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: "JS Error",
                    message: "Error: <%= error.message %>"
                })(err);
                this.emit('end');
            }
        }))
        .pipe(webpackStream({
            mode: "development",
            output: {
                filename: 'app.js',
            },
            module: {
                rules: [
                    {
                        test: /\.(js)$/,
                        exclude: /(node_modules)/,
                        loader: 'babel-loader',
                        query: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            }
        }))
        .pipe(hash()) 
        .pipe(gulp.dest(path.build.js)) 
        .pipe(hash.manifest('public/assets.json', { 
            deleteOld: true,
            sourceDir: __dirname + '/public/js'
        }))
        .pipe(gulp.dest('.'))
        // .pipe(inject(jsStream, {ignorePath: 'dist/', addRootSlash: false, name: 'app'}))
        // .pipe(gulp.dest('./dist'));

    cb();
}

function hashCSS(cb) {
    return gulp.src(path.src.css, { base: srcPath + "assets/scss/" })
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: "SCSS Error",
                    message: "Error: <%= error.message %>"
                })(err);
                this.emit('end');
            }
        }))
        .pipe(sass({
            includePaths: './node_modules/'
        }))
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(dest(path.build.css))
        .pipe(hash()) 
        .pipe(gulp.dest(path.build.css)) 
        .pipe(hash.manifest('public/assets.json', { 
            deleteOld: false,
            sourceDir: __dirname + '/public/css'
        }))
        .pipe(gulp.dest('.'))

    cb();
}

function assetsJs(cb) {
    var assets = require('./public/assets.json');
    return gulp.src('./dist/**/*.html')
        .pipe(replace('app.js', assets['app.js']))
        .pipe(replace('style.min.css', assets['style.min.css']))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({ stream: true }));
    
    cb();
}

function images(cb) {
    return src(path.src.images)
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            // imagemin.mozjpeg({ quality: 95, progressive: true }),
            // imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(dest(path.build.images))
        .pipe(browserSync.reload({ stream: true }));

    cb();
}

function fonts(cb) {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
        .pipe(browserSync.reload({ stream: true }));

    cb();
}

function clean(cb) {
    return del(path.clean);

    cb();
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.html], assetsJs);
    gulp.watch([path.watch.css], hashCSS);
    gulp.watch([path.watch.js], hashJS);
    gulp.watch([path.watch.css, path.watch.js], assetsJs);
    gulp.watch([path.watch.vendor], jsVendor);
    gulp.watch([path.watch.images], images);
    gulp.watch([path.watch.fonts], fonts);
}

/* Собирает файлы для 1С Битрикс*/
const build = gulp.series(clean, gulp.parallel(html, hashCSS, hashJS, jsVendor, images, fonts), assetsJs);

/* Собирает файлы для Разработки и запускает watcher*/
const dev = gulp.series(clean, gulp.parallel(html, css, js, images, fonts), cssReplaceAbsolute);
const watch = gulp.parallel(build, watchFiles, serve);
const _hash = gulp.parallel(hashJS, hashCSS, assetsJs);

/* Exports Tasks */
exports.html = html;
exports.css = css;
exports.cssWatch = cssWatch;
exports.cssReplaceAbsolute = cssReplaceAbsolute;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;
exports.hashJS = hashJS;
exports._hash = _hash;
