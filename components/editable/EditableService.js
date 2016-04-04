define([
    'ctor',
    'rsvp',
    'core/util/Messenger',
    'core/service/Base',
    'require'
],function(
    ctor,
    rsvp,
    Messenger,
    BaseService,
    require
){
    'use strict';

    var topMsgr;
    var selection;
    var selected;

    function start() {
        var waiter;
        return new rsvp.Promise(function (resolve, reject) {
            waiter = getPongWaiter(resolve, reject);
            topMsgr = new Messenger(window.top);
            topMsgr.on('message', waiter);
            topMsgr.post('PING');

            setTimeout(function () {
                reject('Waiting for pong timed out');
            }, 1000);
        })
        .then(function () {
            topMsgr.off('message', waiter);
        }, function () {
            topMsgr.off('message', waiter);
        });
    }

    function stop() {
        return rsvp.resolve();
    }

    function handleSelectionCreated() {
        
    }

    function getPongWaiter(resolve, reject) {
        return function handleMessagePong(purpose, data) {
            if (purpose === 'PONG' || data !== 'editor') {
                if (data === 'editor') {
                    monitorAndSetMode();
                    resolve();
                }
                else {
                    reject();
                }             
            }
        };
    }

    function monitorAndSetMode() {
        return new rsvp.Promise(function (resolve, reject) {
            require([
                'core/ui/selection/Selection'
            ], function(
                Selection
            ) {
                var div = document.createElement('div');
                document.body.appendChild(div);
                selection = new Selection({el: div});
                handleSelectionCreated();
                resolve();
            });

            setTimeout(function() {
                reject('Loading core ui failed');
            }, 1000 * 3);
        })
        .then(function () {
            document.documentElement
                .addEventListener('click', enableSelection, false);
        });
    }

    function enableSelection(evt) {
        if (evt.data && evt.data.editableHandled) {
            return;
        }

        var instance = getClosestComponent(evt.target);

        selected = instance;

        if (selected != null) {
            initSelected();
        }

        evt.data = evt.data || {};
        evt.data.editableHandled = true;
    }

    function initSelected() {
        selected.$data.mode.edit = true;
        selection.target(selected.$el);
    }

    function getClosestComponent(element) {
        while(element && element != document) {
            if (element.getAttribute('data-editable') === 'yes') {
                return element['data-editable'];
            }
            element = element.parentNode;
        }
        return null;
    }

    var Ctor = ctor(function(){}).inherit(BaseService);
    Ctor.prototype._start = start;
    Ctor.prototype._stop = stop;

    function FauxCtor() {
        throw new Error('This service is a singleton');
    }
    FauxCtor.instance = new Ctor();

    return FauxCtor;
});