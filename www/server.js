'use strict';
import http from 'http';
import url from 'url';
import querystring from 'querystring';
function start(route,list) {
    function onRequst(req, res) {
        let pathname = url.parse(req.url).pathname;
        //获取get参数
        let query = url.parse(req.url).query;
        let string = querystring.parse(query);
        req.params = string;
        let postString;
        //获取post
        req.on('data',(chunk) => {
            postString += chunk;
        })
        req.end('end',() => {
            req.body = querystring.parse(postString);
        })
        let method = req.method.toLowerCase();
        console.log("Request for " + pathname + " received.");
        //req res
        route(list, pathname, method, req, res);
        res.write('200');
        res.end();
    }
    http.createServer(onRequst).listen(8080);
    console.log('server has start');
}
export default start;
