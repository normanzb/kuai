define([
    'Vue',
    'text!./template.html',
    'less!./style.less',
    '../viewer/Viewer'
], function (Vue, template, lessStyle, Viewer) {
    'use strict';
    
    return Vue.extend({
        template: template,
        components: {
            viewer: Viewer
        },
        data: function() {
            return {
                page: 'about:blank'
            }
        }
    });
});