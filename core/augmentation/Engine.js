define([
    'Vue',
    'VueRequirify',
    'require',
    'core/util/Messenger'
], 
function (
    Vue,
    VueRequirify,
    require,
    Messenger
) {
    'use strict';
    return function(rootElement){
        var msgr = new Messenger(window.top);
        msgr.on('message', function(purpose){
            if (purpose === 'PING') {
                this._msgrView.post('PONG', 'engine');
            }
        });
        return new VueRequirify({
            root: rootElement,
            vue: Vue,
            require: require
        });
    };
});
