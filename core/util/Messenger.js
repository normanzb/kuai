define([
    'Emitter'
], function (emitter) {
    'use strict';

    var KEY_MESSAGE_NAME = 'kuai';
    var location = window.location;

    function handleMessage(event) {
        if (event == null || 
            event.origin != location.origin ||
            event.data == null ||
            event.data.purpose == null) {
            return null;
        }

        this.emit('message', event.data.purpose, event.data.data);
    }

    function Ctor(target) {
        var me = this;

        me.target = target;
        me._handleMessage = handleMessage.bind(me);

        emitter(me);
        window.addEventListener('message', me._handleMessage);
    }

    var p = Ctor.prototype;

    p.post = function(purpose, data) {
        var me = this;
        if (typeof me.target.postMessage != 'function') {
            throw 'postMessage API isn\'t supported';
        }
        me.target.postMessage({
            purpose: purpose || KEY_MESSAGE_NAME,
            data: data
        }, location.origin);
    };

    p.dispose = function(){
        var me = this;
        window.removeEventListener('message', me._handleMessage);
    };

    return Ctor;
});