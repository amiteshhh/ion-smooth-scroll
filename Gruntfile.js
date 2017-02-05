module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ngdocs: {
            all: ['ion-smooth-scroll.js'],
            // options: {
            //     dest: 'docs',
            //     scripts: ['angular.js'],
            //     html5Mode: false,
            //     startPage: '/api',
            //     title: "My Awesome Docs",
            //     bestMatch: true,

            // },
            // api: {
            //     src: ['ion-smooth-scroll.js'],
            //     title: 'API Documentation'
            // }
        }, connect: {
            server: {
                options: {
                    open: true,
                    keepalive: true,
                    base: 'docs',
                    // livereload: true,
                    useAvailablePort: true,
                    hostname: '*'
                }
            }
        }, uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + ' by <%= pkg.author.name %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>. Visit  <%= pkg.repository.url %> */',
                mangle: true
            },
            my_target: {
                files: {
                    'ion-smooth-scroll.min.js': ['ion-smooth-scroll.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // Default task(s).
    grunt.registerTask('default', ['ngdocs', 'connect']);

};