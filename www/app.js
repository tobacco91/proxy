'use strict';   
import app from './list.js';
let handle = function() {
    app.get('/aaa',function(req, res) {
        console.log(req.params);
    });
}
export default handle;
