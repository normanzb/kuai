define([
    'Vue',
    'text!./template.html'
], function (
    Vue,
    template
) {
    'use strict';

    return Vue.extend({
        created: function() {
            console.log('dialog created');
        },
        template: template
    });
});