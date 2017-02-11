module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ngdocs: {
            all: ['src/ion-smooth-scroll.js'],
            options: { scripts: ['angular.js', 'src/ion-smooth-scroll.min.js'] }
        }, connect: {
            server: {
                options: {
                    open: true,
                    keepalive: true,
                    base: 'docs',
                    useAvailablePort: true,
                    hostname: '*'
                }
            }
        }, uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + ' by <%= pkg.author.name %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>. Visit  <%= pkg.repository.url %> */',
                mangle: true,
                sourceMap: true
            },
            my_target: {
                files: {
                    'src/ion-smooth-scroll.min.js': 'src/ion-smooth-scroll.js'
                }
                //or use below for multiple js files
                /*files: [{
                    expand: true,
                    src: ['src/ion-smooth-scroll.js', '!src/ion-smooth-scroll.min.js'],
                    ext: '.min.js'
                }]*/
            }
        }
    });

    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // Default task(s).
    grunt.registerTask('default', ['ngdocs', 'uglify']);

};