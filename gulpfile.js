var gulp = require('gulp');
var babel = require('gulp-babel');
var gulpif = require('gulp-if');
var plumber = require('gulp-plumber');
var src = './www';
var dist = './dist';
var srcMatch = {
    script: src + '/**/*.js',
    app: src + '/*.js'
};
var distPath = {
    script: dist + '/',
    app: dist + '/'
};


var compile_script = function () {
    return gulp.src(srcMatch.script)
        .pipe(plumber())
        .pipe(gulpif('*.js', babel({presets: ['es2015']})))
        .pipe(gulp.dest(distPath.script));
}
var compile_app = function () {
    return gulp.src(srcMatch.app)
        .pipe(plumber())
        .pipe(gulpif('*.js', babel({presets: ['es2015']})))
        .pipe(gulp.dest(distPath.app));
}


var watch_script = watch_type('script', compile_script);
var watch_app = watch_type('app', compile_app);

function watch_type (type, fn) {
    fn();
    return function () {
        gulp.watch(srcMatch[type], fn);
    }
}
gulp.task('compile_script', watch_script);
gulp.task('compile_app', watch_app);
gulp.task('watch', ['compile_script', 'compile_app']);