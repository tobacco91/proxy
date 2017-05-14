'use strict';
function get_cookie(req) {
    let cookies = {};
    if(typeof(cookies) != 'undefiend') {
        req.headers.cookie && req.headers.cookie.split(';').forEach(function( Cookie ) {
            let parts = Cookie.split('=');
            cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
        });
    }
    return cookies;
};
//myCookie : 'abc=dadada;ccc=ddd'
function set_cookie(res, myCookie){
    res.writeHead(200, {
        'Set-Cookie': myCookie,
        'Content-Type': 'text/plain'
    });
};
export {get_cookie,set_cookie};