define([
    '../editable/Editable',
    'text!./template.html'
], function (Base, template) {
    'use strict';
    return Base.extend({
        template: template,
        props: ['src']
    });
});