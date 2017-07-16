var gulp = require('gulp');
var del = require('del');
var gulpLoadPlugins = require('gulp-load-plugins');
var bs = require('browser-sync')
var minifyCSS = require('gulp-minify-css');
var browserSync = bs.create()
var reload = browserSync.reload
var runSequence = require('run-sequence')
var $ = gulpLoadPlugins();
// css前缀处理配置
var AutoRreFixerParams = {
  browsers: [
    'last 2 versions',
    'iOS >= 7',
    'Android >= 4'],
  cascade: false
}

gulp.task('clean',del.bind(null,['dist']))

gulp.task('style',function(){
  return gulp.src('src/scss/*.scss')
  .pipe($.plumber())
  .pipe($.sass().on('error', $.sass.logError))
  .pipe($.autoprefixer(AutoRreFixerParams))
  .pipe(gulp.dest('./dist/css'));
})
gulp.task('styles', function() {
  return gulp.src('src/scss/*.scss')
    .pipe($.plumber())
    // .pipe($.concat('styles.css'))
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer(AutoRreFixerParams))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/css'));
})

gulp.task('script', function () {
  return gulp.src('src/js/**/*.js')
  .pipe($.plumber())
  .pipe($.babel())
  .pipe(gulp.dest('./dist/js'))
})

gulp.task('scripts', function() {
  return gulp.src('src/js/**/*.js')
    .pipe($.plumber())
    .pipe($.concat('main.js'))
    .pipe($.babel())
    .pipe($.uglify())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('img', function () {
    return gulp.src('src/asset/*.{png,jpg,gif,ico}')
    .pipe($.imagemin({
        optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
        progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
        interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
        multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    }))
    .pipe(gulp.dest('./dist/img'));
})

gulp.task('html', function() {
   gulp.src('src/*.html')
    .pipe(gulp.dest('./dist'))
    .pipe(reload({stream: true}));
})

gulp.task('serve', function () {
  runSequence(['clean'], ['style', 'script', 'img','html'], function () {
    browserSync.init({
      notify: false,
      port: 9000,
      server: {
        baseDir: ['dist']
      }
    })

    gulp.watch('src/scss/**/*.*', function () {
      runSequence('style', function () {
        reload()
      })
    })

    gulp.watch('src/js/**/*.*', function () {
      runSequence('script', function () {
        reload()
      })
    })

    gulp.watch('src/asset/**/*.*', function () {
      runSequence('img', function () {
        reload()
      })
    })

    gulp.watch('src/*.html', function () {
      runSequence('html', function () {
        reload()
      })
    })
  })
})
gulp.task('build', function () {
  runSequence(['clean'], ['styles','scripts', 'img','html'])
})
