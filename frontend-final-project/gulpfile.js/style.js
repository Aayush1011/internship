import gulp from 'gulp';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';

// import autoprefixer from 'gulp-autoprefixer';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import bs from 'browser-sync';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';



const sass = gulpSass(dartSass);

const paths = {
    styles: {
        src: 'dev/scss/*.scss',
        dest: 'dist/css/',
    },
    moduleStyles: {
        src: 'dev/scss/styles/*.scss',
        dest: 'dist/css/styles/',
    },
};
var versionConfig = {
    value: '%MDS%',
    append: {
        key: 'v',
        to: ['css', 'js'],
    },
};

function modules() {
    return (
        gulp
            .src(paths.moduleStyles.src)
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
            .pipe(cleanCSS())
            .pipe(postcss([autoprefixer({ overrideBrowserslist: ['last 2 versions', 'iOS 8'] })]))
            // .pipe(
            //   autoprefixer({
            //       browsers: ["last 2 versions"],
            //       cascade: false,
            //   })
            // )
            .pipe(
                rename({
                    suffix: '.min',
                })
            )
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest(paths.moduleStyles.dest))
            .pipe(bs.stream())
    );
}
function styles() {
    return (
        gulp
            .src(paths.styles.src)
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
            .pipe(cleanCSS())
            .pipe(postcss([autoprefixer({ overrideBrowserslist: ['last 2 versions', 'iOS 8'] })]))
            // .pipe(
            //   autoprefixer({
            //       browsers: ["last 2 versions"],
            //       cascade: false,
            //   })
            // )
            .pipe(
                rename({
                    suffix: '.min',
                })
            )
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest(paths.styles.dest))
            .pipe(bs.stream())
    );
}
module.exports = { modules, styles };
