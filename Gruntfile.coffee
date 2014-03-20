module.exports = (grunt) ->

    port = 9128
  
    # Project configuration.
    grunt.initConfig
        watch:
            coffee_app:
                files: ['app/coffee/**/**.coffee']
                tasks: ["coffee-compile-app"]
            js:
                files: ['app/js/**/**.js']
                options:
                    livereload: true

        coffee:
            app:
                options: {
                    bare: true
                }
                files: [
                    expand: true,
                    cwd: 'app/coffee',
                    src: ['**/*.coffee'],
                    dest: 'app/js',
                    ext: '.js'
                ]

        js2coffee:
            each:
                options:
                    indent: "    "
                files:[
                    {
                        expand: true
                        cwd: 'app'
                        src: ['**/*.js']
                        dest: 'tests-coffee'
                        ext: '.coffee'
                    }
                ]

        copy:
            app:
                files: [
                    expand: true
                    cwd: "app/"
                    src: ["**"]
                    dest: "prebuild/"
                    filter: "isFile"
                ]
            bower_comps:
                files: [
                    expand: true
                    cwd: "bower_components/"
                    src: ["**"]
                    dest: "app/js/vendor"
                    filter: "isFile"
                ]

        clean:
            prebuild: "prebuild"

        connect:
            server:
                options:
                    port: port
                    base: '.'

        requirejs:
            compile:
                options:
                    appDir: "app"
                    baseUrl: "js"
                    mainConfigFile: "app/js/main.js"
                    dir: "public"

                    optimize: "none"
                    removeCombined: true

                    paths:
                        "wire/builder/rjs": "lib/builder"

                    modules: [
                        name: "main"
                        include: ["main", "wire", 'wire/lib/context']
                    ]



    grunt.loadNpmTasks "grunt-contrib-watch"
    grunt.loadNpmTasks "grunt-contrib-coffee"
    grunt.loadNpmTasks "grunt-js2coffee"
    grunt.loadNpmTasks "grunt-contrib-copy"
    grunt.loadNpmTasks "grunt-contrib-clean"
    grunt.loadNpmTasks "grunt-contrib-connect"
    grunt.loadNpmTasks "grunt-contrib-requirejs"
    grunt.loadNpmTasks "grunt-newer"

    # grunt.loadNpmTasks "grunt-insert"

    grunt.registerTask "default", ["connect:server", "watch"]

    # compilation
    grunt.registerTask "coffee-compile-app", ["newer:coffee:app"]

    grunt.registerTask "server", ["connect"]
    grunt.registerTask "inc", ["insert", "coffee-compile-tests", "default"]
    
    grunt.registerTask 'build', ["prebuild", "requirejs", "afterbuild"]
    grunt.registerTask 'prebuild', ["copy:app"]
    grunt.registerTask 'afterbuild', ["clean:prebuild"]

    grunt.registerTask 'vendor', ["copy:bower_comps"]