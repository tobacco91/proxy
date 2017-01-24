'use strict';   
import app from './list.js';
let handle = function() {
    app.post('/aaa',function(req, res) {
        console.log(req.body);
    });
}
export default handle;
