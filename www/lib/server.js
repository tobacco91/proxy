'use strict';
import http from 'http';
import url from 'url';
import querystring from 'querystring';
function start(route,list) {
    function onRequst(req, res) {
        let pathname = url.parse(req.url).pathname;
        let method = req.method.toLowerCase();
        switch (method) {
            case 'get':
                //获取get参数
                let query = url.parse(req.url).query;
                let string = querystring.parse(query);
                req.params = string;
                route(list, pathname, method, req, res);
                break;
            case 'post':
                //获取post
                let postString = '';
                req.on('data',(chunk) => {
                    postString += chunk;
                })
                req.on('end',() => {
                    req.body = querystring.parse(postString);
                    route(list, pathname, method, req, res);
                })
                break;
        }
        console.log("Request for " + pathname + " received.");
        //回复
        res.write('200');
        res.end();
    }
    http.createServer(onRequst).listen(8080);
    console.log('server has start');
}
export default start;
