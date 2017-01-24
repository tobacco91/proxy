'use strict';
let list = {};
let app = {
    get : function(path, handle) {
        list.get[path] = handle;
    },
    post : function(path, handle) {
        list.post[path] = handle;
    }
    
};
export default app;
export {list};