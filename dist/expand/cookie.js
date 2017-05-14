'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function get_cookie(req) {
    var cookies = {};
    if (typeof cookies != 'undefiend') {
        req.headers.cookie && req.headers.cookie.split(';').forEach(function (Cookie) {
            var parts = Cookie.split('=');
            cookies[parts[0].trim()] = (parts[1] || '').trim();
        });
    }
    return cookies;
};
//myCookie : 'abc=dadada;ccc=ddd'
function set_cookie(res, myCookie) {
    res.writeHead(200, {
        'Set-Cookie': myCookie,
        'Content-Type': 'text/plain'
    });
};
exports.get_cookie = get_cookie;
exports.set_cookie = set_cookie;