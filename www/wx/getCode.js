'use strict';
import config from './config.js';
import querystring from 'querystring';
function getCode(res, redirect_uri) {
    let reqUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?';
    let params = {
        appid : config.appId,
        redirect_uri : redirect_uri,
        response_type : 'code',
        scope : config.scope,
        state : 1,
        connect_redirect : 1
    };
    res.writeHead(302, {
      'Location': reqUrl + querystring.stringify(params)
    });
}
export default getCode;