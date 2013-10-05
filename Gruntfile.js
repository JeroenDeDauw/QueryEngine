'use strict';

function sh(command, log, done) {
	var exec = require('child_process').exec;

	var process = exec(
		command,
		function(error, stdout, stderr) {
			done(error);
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
		'install',
		'Install the project',
		function() {
			var taskDone = this.async();
			var async = require('async');

			async.parallel(
				[
					function(done) {
						grunt.log.writeln( 'Downloading http://getcomposer.org/composer.phar' );

						sh(
							'wget http://getcomposer.org/composer.phar -P bin',
							function() {},
							function(error) {
								grunt.log.writeln('Downloaded http://getcomposer.org/composer.phar');
								done(error);
							}
						);
					},
					function(done) {
						grunt.log.writeln( 'Downloading https://phar.phpunit.de/phpunit.phar' );

						sh(
							'wget https://phar.phpunit.de/phpunit.phar -P bin',
							function() {},
							function(error) {
								grunt.log.writeln('Downloaded https://phar.phpunit.de/phpunit.phar');
								done(error);
							}
						);
					}
				],
				function() {
					sh(
						'php bin/composer.phar install --ansi ; php bin/composer.phar update --ansi',
						grunt.log.write,
						function(error) {
							taskDone(error===null);
						}
					);
				}
			);
		}
	);

};
