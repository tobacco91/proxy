'use strict';
import request from 'request';
import querystring from 'querystring';
import config from './config.js';
function getToken(code) {
  let reqUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?';
  let params = {
    appid: config.appId,
    secret: config.appSecret,
    code: code,
    grant_type: 'authorization_code'
  };
  let options = {
    method: 'get',
    url: reqUrl + querystring.stringify(params)
  };
  console.log(options.url);
  return new Promise((resolve, reject) => {
    request(options, function (err, res, body) {
      if (res) {
        console.log(body)
        resolve(body);
      } else {
        reject(err);
      }
    })
  })
}

export default getToken;