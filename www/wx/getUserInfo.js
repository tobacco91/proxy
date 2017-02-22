'use strict';
import request from 'request';
import querystring from 'querystring';
import config from './config.js';
function getUserInfo(accessToken, openId) {
  let reqUrl = 'https://api.weixin.qq.com/sns/userinfo?';
  let params = {
    access_token: accessToken,
    openid: openId,
    lang: 'zh_CN'
  };

  let options = {
    method: 'get',
    url: reqUrl+querystring.stringify(params)
  };
  
  return new Promise((resolve, reject) => {
    request(options, function (err, res, body) {
      if (res) {
        resolve(body);
      } else {
        reject(err);
      }
    });
  })
}

export default getUserInfo;
