define(function(){
    'use strict';

    return function (el) {
        var rect = el.getBoundingClientRect();

        return {
          top: rect.top + document.body.scrollTop,
          left: rect.left + document.body.scrollLeft
        };
    };
});