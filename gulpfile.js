var gulp = require("gulp");
var less = require("gulp-less");

var minify = require('gulp-minifier');
 
gulp.task('minifyT', function() {
  gulp.src('./src').pipe(minify({
    minify: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    minifyJS: true,
    minifyCSS: true,
    getKeptComment: function (content, filePath) {
        var m = content.match(/\/\*![\s\S]*?\*\//img);
        return m && m.join('\n') + '\n' || '';
    }
  })).pipe(gulp.dest('./public/dest'));
});

// Task to compile all less files in the project
gulp.task("less", function() {
    gulp.src("./public/less/*.less")
        .pipe(less())
        .on("error", console.error.bind(console))
        .pipe(gulp.dest("./public/css"));
});

// Task to watch less files for changes
gulp.task("watch", function() {
    gulp.watch("./public/less/*.less", ["less"]);
});

// Compile everything once and then watch for changes.
gulp.task("default", ["less", "watch","minifyT"]);