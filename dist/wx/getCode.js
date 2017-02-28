'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCode(res, redirect_uri) {
    var reqUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?';
    var params = {
        appid: _config2.default.appId,
        redirect_uri: redirect_uri,
        response_type: 'code',
        scope: _config2.default.scope,
        state: 1
    };
    res.writeHead(302, {
        'Location': reqUrl + _querystring2.default.stringify(params)
    });
}
exports.default = getCode;