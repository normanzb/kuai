define([
    'rsvp'
], 
function(rsvp){
    'use strict';

    function Ctor(){
        var me = this;

        me.status = 'stopped';
        me.startingPromise = null;
        me.stoppingPromise = rsvp.resolve();
    }

    Ctor.prototype.start = function() {
        var me = this;
        var ret;

        if (me.status === 'starting' || me.status === 'started') {
            return me.startingPromise;
        }

        me.status = 'starting';

        ret = me.stoppingPromise
            .then(function(){
                return me._start();
            });

        ret.then(function(){
            me.status = 'started';
        }, function () {
            me.stoppingPromise = me.startingPromise;
            me.status = 'stopped';
        });

        me.startingPromise = ret;

        return ret;
    };

    Ctor.prototype.stop = function() {
        var me = this;
        var ret;

        if (me.status === 'stopping' || me.status === 'stopped') {
            return me.stoppingPromise;
        }

        me.status = 'stopping';

        ret = me.startingPromise
            .then(function(){
                return me._stop();
            });

        ret.then(function(){
            me.status = 'stopped';
        }, function(){
            me.status = 'stopped';
        });

        me.stoppingPromise = ret;

        return ret;
    };

    return Ctor;
});