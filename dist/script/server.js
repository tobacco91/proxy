'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function start(route, list) {
    function onRequst(req, res) {
        var pathname = _url2.default.parse(req.url).pathname;
        var method = req.method.toLowerCase();

        (function () {
            switch (method) {
                case 'get':
                    //获取get参数
                    var query = _url2.default.parse(req.url).query;
                    var string = _querystring2.default.parse(query);
                    req.params = string;
                    route(list, pathname, method, req, res);
                    break;
                case 'post':
                    //获取post
                    var postString = void 0;
                    req.on('data', function (chunk) {
                        postString += chunk;
                    });
                    req.on('end', function () {
                        console.log(postString);
                        req.body = _querystring2.default.parse(postString);
                        route(list, pathname, method, req, res);
                    });
                    break;
            }
        })();

        console.log("Request for " + pathname + " received.");
        //回复
        res.write('200');
        res.end();
    }
    _http2.default.createServer(onRequst).listen(8080);
    console.log('server has start');
}
exports.default = start;