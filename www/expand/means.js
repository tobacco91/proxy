'use strict';
import url from 'url';
import querystring from 'querystring';
import {set_session} from './session.js';
let means = function(method,req,res,route,list,pathname) {
	switch (method) {
        case 'get':
            //获取get参数
            let query = url.parse(req.url).query;
            let string = querystring.parse(query);
            req.query = string;
            req.number = Math.random();
            set_session({
                        from : 'track',
                        type : 'redis',
                        key  : req.number,
                        value : JSON.stringify({
                            method   : 'get',
                            type     : 'json',
                            pathname : pathname,
                            params   : req.query
                        })
                    });
            route(list, pathname, method, req, res);
            break;
        case 'post':
            //获取post
            let postString = '';
            req.on('data',(chunk) => {
                postString += chunk;
            })
            req.on('end',() => {
                req.number = Math.random();
                try{
                    req.body = JSON.parse(postString);
                    req.msType = 'json';
                    set_session({
                        from : 'track',
                        type : 'redis',
                        key  : req.number,
                        value : JSON.stringify({
                            method   : 'post',
                            type     : 'json',
                            pathname : pathname,
                            params   : req.body
                        })
                    });
                } catch (e) {
                    req.xml = postString;
                    req.msType = 'xml';
                    set_session({
                        from : 'track',
                        type : 'redis',
                        key  : number,
                        value : JSON.stringify({
                            method : 'post',
                            type : 'xml',
                            pathname : pathname,
                            params : req.xml
                        })
                    });
                }
                route(list, pathname, method, req, res); 
            })
            break;
    }
}
export default means;