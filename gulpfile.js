var gulp        = require('gulp');
const { src,dest }= require('gulp');
const sass= require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

// Save a reference to the `reload` method

// Watch scss AND html files, doing different things with each.
function css(){   
    return src('src/assets/scss/main.scss')
    .pipe(sass({
        outputStyle:'compressed'
    }))
    .pipe(dest('./build/css'))
    .pipe(browserSync.stream());
}
exports.css=css;
gulp.task('default', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("*.html").on("change", reload);
    gulp.watch('src/assets/scss/**/*',css);
    gulp.watch('src/assets/js/**/*.js').on("change", reload);
});