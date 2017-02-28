'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _session = require('./session.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var means = function means(method, req, res, route, list, pathname) {
    (function () {
        switch (method) {
            case 'get':
                //获取get参数
                var query = _url2.default.parse(req.url).query;
                var string = _querystring2.default.parse(query);
                req.query = string;
                req.number = Math.random();
                (0, _session.set_session)({
                    from: 'track',
                    type: 'redis',
                    key: req.number,
                    value: JSON.stringify({
                        method: 'get',
                        type: 'json',
                        pathname: pathname,
                        params: req.query
                    })
                });
                route(list, pathname, method, req, res);
                break;
            case 'post':
                //获取post
                var postString = '';
                req.on('data', function (chunk) {
                    postString += chunk;
                });
                req.on('end', function () {
                    req.number = Math.random();
                    try {
                        req.body = JSON.parse(postString);
                        req.msType = 'json';
                        (0, _session.set_session)({
                            from: 'track',
                            type: 'redis',
                            key: number,
                            value: JSON.stringify({
                                method: 'post',
                                type: 'json',
                                pathname: pathname,
                                params: req.body
                            })
                        });
                    } catch (e) {
                        req.xml = postString;
                        req.msType = 'xml';
                        (0, _session.set_session)({
                            from: 'track',
                            type: 'redis',
                            key: number,
                            value: JSON.stringify({
                                method: 'post',
                                type: 'xml',
                                pathname: pathname,
                                params: req.xml
                            })
                        });
                    }
                    route(list, pathname, method, req, res);
                });
                break;
        }
    })();
};
exports.default = means;