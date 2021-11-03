const gulp  =   require('gulp'),
    htmlmin =   require('gulp-htmlmin'),
    del     =   require('del'),
    server  =   require('gulp-webserver'),
    watch   =   require('gulp-watch'),
    uglify  =   require('gulp-uglifyes')
;

const path = {
    src: {
        html: [
            'src/templates/index.html',
        ],
        js: [
            'src/js/main.js'
        ],
        css: [
            'src/css/main.css'
        ]
    },
    dist: {

    },
    watch: {
        html: 'src/templates/index.html',
        js: 'src/js/main.js',
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
    return gulp.src(path.src.js)
        .pipe(uglify())
        .pipe(gulp.dest('bin'));
});

gulp.task('css', function() {
    return gulp.src(path.src.css)
        .pipe(uglify())
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


gulp.task('watch', function () {

});

watch(path.watch.html, gulp.series('html'));
watch(path.watch.js, gulp.series('js'));
watch(path.watch.css, gulp.series('css'));

gulp.task('build', gulp.series([
    'clean',
    'html',
    'js',
]));

gulp.task('default', gulp.series(['build','webserver','watch']));
