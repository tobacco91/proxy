'use strict';   
import app from './list.js';
let handle = function() {
    app.get('./aaa',function() {
        console.log('./aaa');
    });
}
export default handle;
