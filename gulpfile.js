// npm init
// npm install gulp browser-sync gulp-sourcemaps gulp-sass gulp-uglifycss gulp-uglify gulp-imagemin

var gulp = require('gulp');
const files = {
    htmlPath: 'src/*.html',
    imgPath:'src/img/*.+(png|jpg|jpeg|gif|svg)',
    scssPath: 'src/scss/**/*.scss',
    jsPath: 'src/js/*.js',
    fontsPath: 'src/fonts/**/*',
    cssPath: 'src/css/*.css',
};

var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var imagemin = require('gulp-imagemin');


gulp.task('scss', function(){
    return gulp.src(files.scssPath)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('.'))
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(gulp.dest('dist/css'));
});
// css task
gulp.task('css', function(){
    return gulp.src(files.cssPath)
    .pipe(uglifycss())
    .pipe(gulp.dest('dist/css'))
})
// html task
gulp.task ('html', function(){
    return gulp.src(files.htmlPath)
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(gulp.dest('dist'));
});
// js task
gulp.task('js', function(){
    return gulp.src(files.jsPath)
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});
// images task
gulp.task('img', function(){
    return gulp.src(files.imgPath)
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('browserSync', function(){
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
    });
});

gulp.task('fonts', function(){
    return gulp.src(files.fontsPath)
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('watch', function(){
    gulp.watch(files.htmlPath, gulp.series(['html']));
    gulp.watch(files.imgPath, gulp.series(['img']));
    gulp.watch(files.scssPath, gulp.series(['scss']));
    gulp.watch(files.cssPath, gulp.series(['css']));
    gulp.watch(files.jsPath, gulp.series(['js']));
});

gulp.task('default', gulp.parallel(['browserSync', 'scss','css', 'html', 'fonts', 'img','js'], 'watch', function(callback){
    callback;
}));