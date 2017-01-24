'use strict';
function Route(list, pathname, method) {
    cosole.log('route'+ pathname);
    if (typeof list[method][pathname] === 'function') {
        return list[method][pathname]();
    } else {
        console.log('no such response');
        return 404;
    }
}

export default Route;