const gulp  =   require('gulp'),
    htmlmin =   require('gulp-htmlmin'),
    del     =   require('del'),
    server  =   require('gulp-webserver'),
    watch   =   require('gulp-watch'),
    uglify  =   require('gulp-uglifyes'),
    ts      =   require('gulp-typescript'),
    concat  =   require('gulp-concat'),
    browserify  =   require("browserify"),
    tsify   =   require("tsify"),
    source  =   require("vinyl-source-stream")
;

const path = {
    src: {
        html: [
            'src/templates/index.html',
        ],
        js: [
            'src/js/main.ts',
        ],
        css: [
            'src/css/main.css'
        ]
    },
    dist: {

    },
    watch: {
        html: 'src/templates/index.html',
        js: ['src/js/main.ts','src/js/classes/*.ts'],
        css: 'src/css/main.css',
    }
};

gulp.task('html', function() {
    return gulp.src(path.src.html) // указываем пути к файлам .html
        .pipe(htmlmin({
            collapseWhitespace: true, // удаляем все переносы
            removeComments: true // удаляем все комментарии
        }))
        .pipe(gulp.dest('bin')); // оптимизированные файлы .html переносим на продакшен
});


gulp.task('js', function() {
    return browserify({
        basedir: ".",
        debug: true,
        entries: path.src.js,
        cache: {},
        packageCache: {},
    })
        .plugin(tsify)
        .bundle()
        .pipe(source("main.js"))
        .pipe(gulp.dest("bin"));
});

gulp.task('css', function() {
    return gulp.src(path.src.css)
        .pipe(gulp.dest('bin'));
});

gulp.task('clean', function () {
    return del('bin/**',{force: true});
});

gulp.task('webserver', function() {
    gulp.src('bin')
        .pipe(server({
            livereload: true,
            open: true,
            fallback: 'index.html'
        }));
});

gulp.task('build', gulp.series([
    'clean',
    'html',
    'css',
    'js',
]));

watch(path.watch.html, gulp.series('html'));
watch(path.watch.js, gulp.series('js'));
watch(path.watch.css, gulp.series('css'));

gulp.task('default', gulp.series(['build','webserver']),function () {

});
