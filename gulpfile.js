var gulp = require('gulp');
var babel = require('gulp-babel');
var gulpif = require('gulp-if');
var plumber = require('gulp-plumber');
var src = './www';
var dist = './dist';
var srcMatch = {
    script: src + '/*.js'
};
var distPath = {
    script: dist + '/script/'
};


var compile_script = function () {
    return gulp.src(srcMatch.script)
        .pipe(plumber())
        .pipe(gulpif('*.js', babel({presets: ['es2015']})))
        .pipe(gulp.dest(distPath.script));
}



var watch_script = watch_type('script', compile_script);


function watch_type (type, fn) {
    fn();
    return function () {
        gulp.watch(srcMatch[type], fn);
    }
}
gulp.task('compile_script', watch_script);

gulp.task('watch', ['compile_script']);