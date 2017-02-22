'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var means = function means(method, req, res, route, list, pathname) {
    (function () {
        switch (method) {
            case 'get':
                //获取get参数
                var query = _url2.default.parse(req.url).query;
                var string = _querystring2.default.parse(query);
                req.query = string;
                route(list, pathname, method, req, res);
                break;
            case 'post':
                //获取post
                var postString = '';
                req.on('data', function (chunk) {
                    postString += chunk;
                });
                req.on('end', function () {
                    try {
                        req.body = JSON.parse(postString);
                        // console.log(req.body);
                        route(list, pathname, method, req, res);
                        return true;
                    } catch (e) {
                        return false;
                    }
                });
                break;
        }
    })();
};
exports.default = means;