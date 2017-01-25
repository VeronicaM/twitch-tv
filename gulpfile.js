var gulp = require("gulp");
var less = require("gulp-less");

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
gulp.task("default", ["less", "watch"]);