'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _means = require('../expand/means.js');

var _means2 = _interopRequireDefault(_means);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function start(route, list) {
    function onRequst(req, res) {
        var pathname = _url2.default.parse(req.url).pathname;
        var method = req.method.toLowerCase();
        (0, _means2.default)(method, req, res, route, list, pathname);
        console.log("Request for " + pathname + " received.");
        //回复
        res.write('200');
        res.end();
    }
    _http2.default.createServer(onRequst).listen(8080);
    console.log('server has start');
}
exports.default = start;