'use strict';   
import app from './list.js';
let handle = function() {
    app.post('/aaa',(req, res) => {
        console.log(req.body);
    });
}
export default handle;
