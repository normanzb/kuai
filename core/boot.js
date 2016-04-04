(function(){
    'use strict';

    function getDir(pathname) {
        if (pathname.charAt(pathname.length - 1) != '/') {
            pathname = pathname.substring(0, pathname.lastIndexOf('/') + 1);
        }
        return pathname;
    }

    var bootScript = document.querySelectorAll('script#boot,script[data-main*="boot"]')[0];
    var uri = document.createElement('a');
    var pathname = window.location.pathname;
    pathname = getDir(pathname);
    uri.href = pathname + getDir(bootScript.getAttribute('data-main')) + '..';
    var baseUrl = uri.pathname;
    if (baseUrl === '') {
        baseUrl = '.';
    }

    require({
        baseUrl: baseUrl,
        paths: {
            'URL': 'bower_components/jsurl/url',
            'routie': 'bower_components/routie/dist/routie'
        },
        map: {
            '*': {
                'Vue': 'bower_components/vue/dist/vue',
                'VueRequirify': 'bower_components/vue-requirify/VueRequirify',
                'rsvp': 'bower_components/rsvp/rsvp',
                'boe': 'bower_components/boe/src/boe',
                'ctor': 'bower_components/ctor/ctor',
                'css': 'bower_components/require-css/css',
                'less': 'bower_components/require-less/less',
                'text': 'bower_components/requirejs-text/text',
                'json': 'bower_components/requirejs-plugins/src/json',
                'Emitter': 'bower_components/reemitter.js/emitter',
                'ResizeSensor': 'bower_components/resize-sensor/src/ResizeSensor'
            }
        },
        shim: {
            'URL': {
                exports: 'Url'
            },
            'routie': {
                exports: 'routie'
            }
        },
        context: '_kuai_'
    }, [
        'URL',
        'require'
    ], function (
        URL,
        require
    ) {
        var url = new URL();
        var levels = url.path.split('/');
        var file = levels[levels.length - 1];
        if (file.indexOf('editor') >= 0) {
            require(['core/editor/Editor'], function(Editor){
                var editor = new Editor();
                editor.start();
            });
        }
        else {
            require(['core/augmentation/Engine'], function(Engine){
                var engine = new Engine(document.documentElement);
                engine.start();
            });
        }
    });
})();