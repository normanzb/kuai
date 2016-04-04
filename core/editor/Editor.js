define([
    'core/ui/editor/Editor',
    'core/util/Messenger',
    'routie'
], function (
    Editor, 
    Messenger,
    routie
) {
    'use strict';
    
    function setupRouter() {
        routie({
            '*': handlePageRequest.bind(this)
        });
    }

    function handlePageRequest(pagePath) {
        this.view.$data.page = pagePath;
    }

    function renewViewerMessenger(iframe) {
        if (this._msgrView == null) {
            this._msgrView = new Messenger(iframe.contentWindow);
            this._msgrView.on('message', handleMessagePing.bind(this));
        }

        this._msgrView.target = iframe.contentWindow;
    }

    function handleMessagePing(purpose) {
        if (purpose === 'PING') {
            this._msgrView.post('PONG', 'editor');
        }
    }

    function Ctor() {
        this.view = null;
        this._msgrView = null;
    }

    var p = Ctor.prototype;

    p.start = function(){
        var me = this;

        me.view = new Editor({
            el: document.getElementById('editor'), 
            created: function() {
                this.$on('viewer.page.changed', function(iframe) {
                    renewViewerMessenger.call(me, iframe);
                });
            },
            data: function() {
                return {
                    page: 'about:blank'
                };
            }
        });
        setupRouter.call(this);
    };

    return Ctor;
});