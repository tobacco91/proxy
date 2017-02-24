'use strict';   
import app from './lib/list.js';
import querystring from 'querystring';
import getCode from './wx/getCode.js';
import getToken from './wx/getToken.js';
import getUserInfo from './wx/getUserInfo.js';
import {get_cookie,set_cookie} from './expand/cookie'; 
import wxPush from './wx/wxPush.js';
let url = 'http://5yi8r5.natappfree.cc/wx';
let handle = function() {
    app.get('/index',(req,res) => {
        let info = JSON.stringify(get_cookie(req)) == '{}';
        if(info) {
            if (!req.query.code) {
                getCode(res,url);
            } else {
                //let data =JSON.parse(getToken(req.query.code));
                //console.log(getToken(req.query.code));
                // let userInfo = JSON.parse(getUserInfo(data.access_token, data.openid));
                // set_cookie(res,'user_id = '+ userInfo);
            }
        } else {
            console.log(get_cookie(req));
        }

        // if (req.query.code) {
            // res.write(req.query.code);
            // console.log(getToken(req.query.code));
            // let data =JSON.parse(getToken(req.query.code));
            // let userInfo = JSON.parse(getUserInfo(data.access_token, data.openid));
            // res.write(userInfo);
        // } else {
        //     getCode(res,url);
        // }
    });
    app.get('/wx',(req,res) => {
        console.log(getToken(req.query.code))
    }); 
    app.post('/aaa',(req, res) => {
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
