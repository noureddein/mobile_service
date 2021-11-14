const browserSync = require('browser-sync').create()
const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))

// Compile SASS into CSS
function style() {
  // 1. Where is my SCSS file
  return gulp.src('./style/SCSS/**/*.scss')
    // 2. Pass that file through SASS compiler
    .pipe(sass())
    // 3. Where do i save my compiled CSS
    .pipe(gulp.dest('./style/CSS'))



}

function watch() {

  gulp.watch('./style/SCSS/**/*.scss', style)

}


exports.style = style;
exports.watch = watch