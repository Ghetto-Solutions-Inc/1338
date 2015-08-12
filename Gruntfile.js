module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		swig: {
			dist: {
				init: {
					root: "pages/",
					allowErrors: false,
					autoescape: true
				},
				banners: grunt.file.readJSON('pages/banners.json'),
				dest: "dist/",
				cwd: "pages/",
				generateSitemap: false,
				generateRobotstxt: false,
				src: [
					'index.swig',
					'faq.swig',
					'tools.swig',
					'nav.swig',
					'404.swig'
				],
				siteUrl: 'http://test.1339.cf/',
				production: false,
			}
		},
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
					conservativeCollapse: true,
					removeEmptyAttributes: true
				},
				files: [{
					expand: true,
					cwd: 'dist/',
					src: '**/*.html',
					dest: 'dist/'
				}]
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> (<%= pkg.repository.url %>) @ <%= grunt.template.today("yyyy-mm-dd") %> */\n\n'
			},
			dist: {
				files: {
					'dist/pomf.min.js': [
						'js/zepto.js',
						'js/cheesesteak.js',
						'js/cabinet.js',
						'js/pomf.js',
						'js/ZeroClipboard.js'
					]
				}
			}
		},
		cssmin: {
			options: {
				banner: '/*! <%= pkg.name %> (<%= pkg.repository.url %>) @ <%= grunt.template.today("yyyy-mm-dd") %> */\n\n'
			},
			dist: {
				files: {
					'dist/pomf.min.css': [
						'css/pomf.css',
						'css/font-awesome.css'
					]
				}
			}
		},
		mkdir: {
			options: {
				mode: 0700,
				create: ['dist/img']
			}
		},
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'img/',
					src: '**/*.{png,jpg,gif}',
					dest: 'dist/img/'
				}]
			}
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					cwd: 'static/',
					src: '**',
					dest: 'dist/'
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-swig');
	grunt.loadNpmTasks('grunt-mkdir');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['mkdir', 'swig', 'htmlmin', 'cssmin', 'uglify', 'imagemin', 'copy']);
};
