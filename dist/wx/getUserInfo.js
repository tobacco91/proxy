'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUserInfo(accessToken, openId) {
  var reqUrl = 'https://api.weixin.qq.com/sns/userinfo?';
  var params = {
    access_token: accessToken,
    openid: openId,
    lang: 'zh_CN'
  };

  var options = {
    method: 'get',
    url: reqUrl + _querystring2.default.stringify(params)
  };

  return new Promise(function (resolve, reject) {
    (0, _request2.default)(options, function (err, res, body) {
      if (res) {
        resolve(body);
      } else {
        reject(err);
      }
    });
  });
}

exports.default = getUserInfo;