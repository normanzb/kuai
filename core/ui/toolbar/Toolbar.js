define([
    'Vue',
    'css!./style.css',
    'text!./template.html'
], function (
    Vue,
    css,
    template
) {
    return Vue.extend({
        template: template
    });
});