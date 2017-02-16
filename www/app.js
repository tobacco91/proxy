'use strict';   
import app from './lib/list.js';
let handle = function() {
    app.post('/aaa',(req, res) => {
        console.log(req.body);
    });
    app.get('/abc',(req,res) => {
        console.log(req.params);
        res.write('abcdefg');
    });
}
export default handle;
