define([
    'Vue',
    './EditableService'    
], 
function (
    Vue,
    EditableService
) {
    'use strict';

    EditableService.instance.start();

    function initEl() {
        this.$el.setAttribute('data-editable', 'yes');
        this.$el['data-editable'] = this;
    }

    function disposeEl() {
        this.$el.removeAttribute('data-editable');
        delete this.$el['data-editable'];
    }

    return Vue.extend({
        created: function(){
            
        },
        compiled: function(){
            
        },
        ready: function() {
            initEl.call(this);
        },
        destroy: function() {
            disposeEl.call(this);
        },
        data: function() {
            return {
                mode: {
                    edit: false
                }
            };
        }
    });
});