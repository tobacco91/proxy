'use strict';
import http from 'http';
import url from 'url';
import means from '../expand/means.js';
function start(route,list) {
    function onRequst(req, res) {
        let pathname = url.parse(req.url).pathname;
        let method = req.method.toLowerCase();
        means(method,req,res,route,list,pathname);
        console.log("Request for " + pathname + " received.");
        //回复
        res.write('200');
        res.end();
    }
    http.createServer(onRequst).listen(8080);
    console.log('server has start');
}
export default start;
