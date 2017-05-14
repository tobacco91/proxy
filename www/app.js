'use strict';   
import app from './lib/list.js';
import querystring from 'querystring';
import getCode from './wx/getCode.js';
import getToken from './wx/getToken.js';
import getUserInfo from './wx/getUserInfo.js';
import {get_cookie,set_cookie} from './expand/cookie.js'; 
import wxPush from './wx/wxPush.js';
import {set_session,get_session} from './expand/session.js';
let url = 'http://j5ntpe.natappfree.cc/index';
let handle = function() {
    app.get('/index',(req,res) => {
        let info = JSON.stringify(get_cookie(req)) == '{}';
        if(info) {
            if (!req.query.code) {
                getCode(res,url);
            } else {
                let token = getToken(req.query.code);
                token.then((body)=>{
                    let data = JSON.parse(body);
                    //console.log(data);
                    return getUserInfo(data.access_token,data.openid);
                }).then((body)=> {
                    let random = Math.random();
                    console.log('user'+random);
                    console.log('track'+req.number);
                    set_cookie(res,'user_id = '+ random + ';');
                    set_session({
                        from : 'user',
                        type : 'redis',
                        key  : random,
                        value : body
                    });
                });
            }
        } else {
            let session = get_session({
                from : 'user',
                type : 'redis',
                key  : get_cookie(req)
            });
            console.log(session);
        }
    });
    app.get('/get', (req, res) => {
        console.log(req.number)
        let info = JSON.stringify(get_cookie(req)) == '{}';
        if(info) {
            set_cookie(res,'id = '+ Math.random() + ';');
            set_session({
                        from : 'user',
                        type : 'redis',
                        key  : 'random',
                        value : 'body'
                    });
        } else {
            
            console.log(get_cookie(req));
 
        }
    });

    app.post('/post',(req, res) => {
        switch (req.msType) {
            case 'json' :
                console.log(req.body);
                break;
            case 'xml' :
                wxPush(req.xml);
                break;
        }
    });
    // app.get('/abc',(req,res) => {
    //     console.log(req.query);
    //     res.write('abcdefg');
    // });
}
export default handle;
