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
        //获取get参数
        var query = _url2.default.parse(req.url).query;
        var string = _querystring2.default.parse(query);
        req.params = string;
        var postString = void 0;
        //获取post
        req.on('data', function (chunk) {
            postString += chunk;
        });
        req.end('end', function () {
            req.body = _querystring2.default.parse(postString);
        });
        var method = req.method.toLowerCase();
        console.log("Request for " + pathname + " received.");
        //req res
        route(list, pathname, method, req, res);
        res.write('200');
        res.end();
    }
    _http2.default.createServer(onRequst).listen(8080);
    console.log('server has start');
}
exports.default = start;