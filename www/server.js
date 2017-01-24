'use strict';
import http from 'http';
import url from 'url';
function start(route,list) {
    function onRequst(req, res) {
        let pathname = url.parse(req.url).pathname;
        let method = req.method.toLowerCase();
        console.log("Request for " + pathname + " received.");
        //req res
        route(list,pathname,method);
        res.send(200);
    }
    http.createServer(onRequst).listen(8080);
    console.log('server has start');
}
export default start;
