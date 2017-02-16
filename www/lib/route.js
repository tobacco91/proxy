'use strict';
function Route(list, pathname, method, req, res) {
    console.log('route'+ pathname);
    if (typeof list[method][pathname] === 'function') {
        return list[method][pathname](req, res);
    } else {
        console.log('no such response');
        return 404;  
    }
}

export default Route;