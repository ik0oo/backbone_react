var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');

gulp.task('webpack', function () {
	return gulp.src('./app/js/app.js')
		.pipe($.webpack({
			entry: './app/js/app.js',
			output: {
				filename: 'app.js'
			},
			module: {
				loaders: [
					{
						test: /\.jsx?$/,
						exclude: /(node_modules|bower_components)/,
						loader: 'babel-loader',
						query: {
							presets: ['react', 'es2015', 'stage-0'],
							plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
						}
					}
				]
			}
		}))
		.pipe(gulp.dest('./js/'))
});

gulp.task('styles', function () {
	return gulp.src('./app/styles/app.styl')
		.pipe($.sourcemaps.init())
		.pipe($.stylus({
			'include css': true
		}))
		.pipe($.concat('style.css'))
		.pipe($.autoprefixer({
			browsers: ['last 10 versions'],
			cascade: false
		}))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest('./css/'));
});

gulp.task('browser-sync', function () {
	return browserSync.init({
		server: {
			baseDir: './'
		},
		open: false
	});
});

gulp.task('watch', function () {
	gulp.watch(['./app/js/**/*.js'], ['webpack']);
	gulp.watch(['./app/styles**/*.styl'], ['styles']);
});


gulp.task('default', ['browser-sync', 'styles', 'webpack', 'watch']);
