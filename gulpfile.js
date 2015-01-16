var gulp = require('gulp');
var connect = require('gulp-connect');
var colors = require('colors');
var watch = require('gulp-watch');
var gutil = require("gulp-util");
var rename = require('gulp-rename');
var mainBowerFiles = require('main-bower-files');
var clean = require('gulp-clean');
var prettify = require('gulp-jsbeautifier');
var jshint = require('gulp-jshint');
var runSequence = require('run-sequence');
var factory = require("widget-tester").gulpTaskFactory;
var path = require("path");
var rimraf = require("gulp-rimraf");
var uglify = require("gulp-uglify");
var usemin = require("gulp-usemin");
var minifyCSS = require("gulp-minify-css");
var concat = require("gulp-concat");
var e2ePort = process.env.E2E_PORT || 8099;

/*---- tooling ---*/
gulp.task('pretty', function() {
  return gulp.src('./js/**/*.js')
    .pipe(prettify({config: '.jsbeautifyrc', mode: 'VERIFY_AND_WRITE'}))
    .pipe(gulp.dest('./js'))
    .on('error', function (error) {
      console.error(String(error));
    });
});

var appJSFiles = [
  "./js/**/*.js"
];

var cssFiles = [
  "support-app-styles.css"
];

var localeFiles = [
  "bower_components/rv-common-i18n/dist/locales/**/*"
];

gulp.task("clean-dist", function () {
  return gulp.src("dist", {read: false})
    .pipe(rimraf());
});

gulp.task("clean-tmp", function () {
  return gulp.src("tmp", {read: false})
    .pipe(rimraf());
});

gulp.task("clean", ["clean-dist", "clean-tmp"]);

gulp.task("config", function() {
  var env = process.env.NODE_ENV || "dev";
  gutil.log("Environment is", env);

  return gulp.src(["js/config/" + env + ".js"])
    .pipe(rename("config.js"))
    .pipe(gulp.dest("js/config"));
});

gulp.task("locales", function() {
  return gulp.src(localeFiles)
    .pipe(gulp.dest("dist/locales"));
});

gulp.task("lint", function() {
  return gulp.src(appJSFiles)
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"));
});

gulp.task("html", ["lint"], function () {
  return gulp.src(['./index.html'])
     .pipe(usemin({
      js: [uglify({
         mangle:true,
         outSourceMap: false // source map generation doesn't seem to function correctly
       })]
    }))
    //.pipe(usemin())
    .pipe(gulp.dest("dist/"))
    .on('error',function(e){
    console.error(String(e));

    })
});

gulp.task("partials", function () {
  return gulp.src(['./partials/*.html'])
    .pipe(gulp.dest("dist/partials"))
    .on('error',function(e){
    console.error(String(e));

    })
});

gulp.task("css", function () {
  return gulp.src(cssFiles)
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(concat("all.min.css"))
    .pipe(gulp.dest("dist/css"));
});

gulp.task("fonts", function() {
  return gulp.src("bower_components/rv-common-style/dist/fonts/**/*")
    .pipe(gulp.dest("dist/fonts"));
});

gulp.task('build', function (cb) {
  runSequence(["clean", "config"], ['pretty'],["html","css", "fonts", "locales", "partials"], cb);
});


/*---- testing ----*/

var unitTestFiles = [
  "bower_components/jQuery/dist/jquery.js",

  "bower_components/angular/angular.js",
  "bower_components/q/q.js",
   "bower_components/angular-mocks/angular-mocks.js",
  "bower_components/common-header/dist/js/dependencies.js",
  "bower_components/common-header/dist/js/common-header.js",
  "bower_components/moment/moment.js",
  "bower_components/moment-timezone/builds/moment-timezone-with-data-2010-2020.js",
  'bower_components/ng-core-api-client/src/js/svc-schedule.js',
  "bower_components/ng-core-api-client/src/js/svc-display.js",
  "js/app.js",
  "js/**/*.js",
  "test/unit/**/*.tests.js"
];


gulp.task("test:unit", factory.testUnitAngular({testFiles: unitTestFiles, configFile : 'test/unit/karma.conf.js'}));

gulp.task("server", factory.testServer({https: false}));
gulp.task("server-close", factory.testServerClose());
gulp.task("test:webdrive_update", factory.webdriveUpdate());
gulp.task("test:e2e:core", ["test:webdrive_update"], factory.testE2EAngular({
  browser: "chrome"
}));
gulp.task("test:e2e", function (cb) {
  runSequence("server", "test:e2e:core", "server-close", cb);
});


gulp.task("metrics", factory.metrics());
gulp.task("test",  function (cb) {
  runSequence("config", ["test:unit", "test:e2e"], cb);
});

gulp.task("test:ci",  function (cb) {
  runSequence("test:unit", "metrics", cb);
});

/*---- dev task ---*/
gulp.task('reload',function(){
  return connect.reload();
})
gulp.task('dev', function() {
  // Start a server
  connect.server({
    root: '',
    port: 8000,
    livereload: true
  });
  console.log('[CONNECT] Listening on port 3000'.yellow.inverse);
  // Watch HTML files for changes
  console.log('[CONNECT] Watching HTML files for live-reload'.blue);
  gulp.watch( ['./partials/**/*.html', './js/**/*.js', './index.html', './displays-app-styles.css']
  //,['pretty','hint','reload']) //restore once the site is not hosted on github pages
  ,['reload'])

  //re-run unit tests, TDD!!!!
  //todo: have phantomJS keep running, and just re-run the tests
  gulp.watch( unitTestFiles,['test:unit']);
});

gulp.task('default', [], function() {
  console.log('***********************'.yellow);
  console.log('  gulp dev: start a server in the  root folder and watch dev files'.yellow);
  console.log('  gulp test: run unit and e2e tests'.yellow);
  console.log('  gulp build: hint, lint, and minify files into ./dist '.yellow);
  console.log('  gulp json-combine:  i18n'.yellow);
  console.log('***********************'.yellow);
  return true;
});
