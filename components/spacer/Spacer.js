define([
    'text!./template.html',
    'css!./style.css',
    '../editable/Editable',
    '../dialog/Dialog',
    'module'
],
function (
    template,
    style,
    Base,
    Dialog, 
    module
) {
    'use strict';
    
    var Ctor = Base.extend({
        created: function() {

        },
        beforeCompile: function() {
            // var me = this;
            // console.log(me.el, me.$el);
            // debugger;
        },
        compiled: function() {
            // debugger;
        },
        ready: function() {
        },
        replace: true,
        template: template,
        data: function() {
            return {
                module: module
            };
        },
        components: {
            dialog: Dialog
        }
    });

    return Ctor;
});