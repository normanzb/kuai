define([
    'Vue',
    'rsvp',
    'text!./template.html',
    'core/dom/position'
],
function(
    Vue,
    rsvp,
    template,
    getDOMPosition
){
    'use strict';

    var View = Vue.extend({
        template:template
    });

    function Ctor(options) {
        var me = this;

        if (options == null || options.el == null) {
            throw new Error('element must be specified');
        }

        var root = options.el.createShadowRoot();
        me.model = null;
        me.vue = null;
        me.vueReadyPromise = new rsvp.Promise(function(resolve){
            
            me.vue = new View({
                el: root,
                replace: false,
                data: function() {
                    return {
                        x: -999,
                        y: -999,
                        width: 0,
                        height: 0
                    };
                },
                compiled: function () {                    
                    me.model = this.$data;
                    resolve();
                }
            });
        });
        
    }

    Ctor.prototype.target = function (targetElement) {
        var me = this;
        var pos = getDOMPosition(targetElement);
        var outerWidth = targetElement.offsetWidth;
        var outerHeight = targetElement.offsetHeight;

        me.vueReadyPromise.then(function () {
            me.model.x = pos.left;
            me.model.y = pos.top; 
            me.model.width = outerWidth;
            me.model.height = outerHeight;
        });
    };

    return Ctor;
});