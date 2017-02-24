'use strict';
import url from 'url';
import querystring from 'querystring';
let means = function(method,req,res,route,list,pathname) {
	switch (method) {
        case 'get':
            //获取get参数
            let query = url.parse(req.url).query;
            let string = querystring.parse(query);
            req.query = string;
            route(list, pathname, method, req, res);
            break;
        case 'post':
            //获取post
            let postString = '';
            req.on('data',(chunk) => {
                postString += chunk;
            })
            req.on('end',() => {
                try{
                    req.body = JSON.parse(postString);
                    req.msType = 'json';
                } catch (e) {
                    req.xml = postString;
                    req.msType = 'xml';
                }
                route(list, pathname, method, req, res); 
            })
            break;
    }
}
export default means;