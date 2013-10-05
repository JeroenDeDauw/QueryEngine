'use strict';

module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['jshint', 'nodeunit']);

	grunt.initConfig({
		nodeunit: {
			quick: {
				src: ['test/quick/**/*Test.js']
			},
			slow: {
				src: ['test/slow/**/*Test.js']
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			projectBase: {
				src: ['*.js', '*.json']
			},
			all: {
				src: [
					'src/**/*.js',
					'test/**/*.js',
					'*.json'
				]
			}
		},

		watch: {
			all: {
				files: '<%= jshint.all.src %>',
				tasks: ['quick']
			},
			projectBase: {
				files: '<%= jshint.projectBase.src %>',
				tasks: ['jshint:projectBase']
			}
		}
	});

	grunt.task.registerTask(
		'test',
		['jshint', 'nodeunit']
	);

	grunt.task.registerTask(
		'quick',
		['jshint', 'nodeunit:quick']
	);

	grunt.task.registerTask(
		'build',
		'Create a new build',
		function() {
			var done = this.async();
			var exec = require('child_process').exec;

			var composerProcess = exec(
				'php bin/composer.phar install --ansi ; php bin/composer.phar update --ansi',
				function(error, stdout, stderr) {
					done(error===null);
				}
			);

			composerProcess.stdout.on(
				'data',
				grunt.log.write
			);
		}
	);

};
