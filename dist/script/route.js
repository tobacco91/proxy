'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function Route(list, pathname, method) {
    cosole.log('route' + pathname);
    if (typeof list[method][pathname] === 'function') {
        return list[method][pathname]();
    } else {
        console.log('no such response');
        return 404;
    }
}

exports.default = Route;