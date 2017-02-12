module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        "dgeni-alive": {
            options: {
                // optional basePath for correct path calculation
                basePath: '',
                // optional serve section for running local http server with live docs
                serve: {
                    // the server port
                    // can also be written as a function, e.g.
                    port: 10000,
                    // open the browser
                    openBrowser: true // or command to run favorite browser
                }
            },
            api: {
                // product title
                title: '<%= pkg.preetyName %>',
                // product version
                version: '<%= pkg.version %>',
                // do not expand paths
                expand: false,
                // where to put docs
                dest: 'docs',
                // where to look for sources
                // grunt globbing is supported
                src: ['src/ion-smooth-scroll.js'
                    ],
            }
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
    grunt.loadNpmTasks('dgeni-alive');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // Default task(s).
    grunt.registerTask('default', ['uglify', 'dgeni-alive']);

};