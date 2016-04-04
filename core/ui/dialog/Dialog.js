define([
    'Vue',
    'text!./template.html',
    'css!./style.css'
], function (Vue, template, style) {
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