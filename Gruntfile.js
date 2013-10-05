'use strict';

function sh(command, log, done) {
	var exec = require('child_process').exec;

	var process = exec(
		command,
		function(error, stdout, stderr) {
			done(error===null);
		}
	);

	process.stdout.on(
		'data',
		log
	);

	process.stderr.on(
		'data',
		log
	);
}

module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({
		nodeunit: {
			quick: {
				src: ['test/js/quick/**/*Test.js']
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
					'lib/**/*.js',
					'test/js/**/*.js',
					'*.json'
				]
			}
		},

		watch: {
			all: {
				files: [
					'lib/**/*.js',
					'test/js/**/*.js',
					'src/**/*.php',
					'test/php/**/*.php',
					'*.json'
				],
				tasks: ['quick']
			},
			projectBase: {
				files: '<%= jshint.projectBase.src %>',
				tasks: ['jshint:projectBase']
			}
		}
	});

	grunt.registerTask('default', ['test', 'phpunit']);

	grunt.task.registerTask(
		'test',
		['jshint', 'nodeunit']
	);

	grunt.task.registerTask(
		'quick',
		['jshint', 'nodeunit:quick', 'phpunit:QueryEngineQuick']
	);

	grunt.task.registerTask(
		'phpunit',
		'Run the PHPUnit tests',
		function(testSuite) {
			var command = 'php bin/phpunit.phar';

			if (testSuite) {
				command += ' --testsuite=' + testSuite;
			}

			sh(
				command,
				grunt.log.write,
				this.async()
			);
		}
	);

	grunt.task.registerTask(
		'build',
		'Create a new build',
		function() {
			sh(
				'php bin/composer.phar install --ansi ; php bin/composer.phar update --ansi',
				grunt.log.write,
				this.async()
			);
		}
	);

};
