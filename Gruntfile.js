module.exports = function(grunt) {
	//Configure main project setting
	grunt.initConfig({
		// Basic setting and info about our plugins
		pkg: grunt.file.readJSON('package.json'),
		//Name of plugin (plugin name without the "grunt-contrib-")
		sass:{
			dev:{
				options: {
			        style: 'expanded'
			     },
				files:[{
					expand: true,
					cwd: 'app/scss',
					src: ['*.scss'],
			        dest: 'app/css',
			        ext: '.css'
				}]
			}
		},
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass', 'cssmin:dev'],
				options: {
					livereload: true,
				},
			}
		},
		cssmin: {
			dev:{
				options: {
					shorthandCompacting: true,
				    roundingPrecision: -1
				},				
				files:{
					'app/css/main.css':['app/css/desktop.css','app/css/tablet.css','app/css/mobile.css']
				}
			},
			prod:{
				options: {
					shorthandCompacting: true,
				    roundingPrecision: -1
				},				
				files:{
					'dist/css/main.css':['app/css/main.css']
				}
			}						
		},	
		//uglify
		uglify:{
			options: {
		        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy, h:MM:ss TT") %> */\n'
		    },
			dist:{
				files: {
					'dist/js/main.js':['app/js/main.js']
				}
			}
		},
		//copy
		copy: {
			main: {
		    	files: [
		    		{expand: true, cwd: 'app/images/', src: ['**'], dest: 'dist/images/'}
		    	]
		    }
		}

	});

	//load the plugin
	grunt.loadNpmTasks('grunt-contrib-sass');	
	grunt.loadNpmTasks('grunt-contrib-cssmin');	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');


	//Do the task
	grunt.registerTask('dev',['sass:dev', 'watch']); //for developing dev folder
	grunt.registerTask('prod',['cssmin:prod', 'uglify', 'copy']); //for production dist folder
};