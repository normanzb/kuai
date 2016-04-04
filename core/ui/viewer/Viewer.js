define([
    'Vue',
    'text!./template.html',
    'less!./style.less'
], function (
    Vue, 
    template
) {
    'use strict';

    return Vue.extend({
        template: template,
        ready: function() {
            this.$watch('page', function(){
                this.$dispatch(
                    'viewer.page.changed', 
                    this.$el.querySelector('iframe')
                );
            });
        },
        props: ['page']
    });
});