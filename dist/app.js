'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _list = require('./lib/list.js');

var _list2 = _interopRequireDefault(_list);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _getCode = require('./wx/getCode.js');

var _getCode2 = _interopRequireDefault(_getCode);

var _getToken = require('./wx/getToken.js');

var _getToken2 = _interopRequireDefault(_getToken);

var _getUserInfo = require('./wx/getUserInfo.js');

var _getUserInfo2 = _interopRequireDefault(_getUserInfo);

var _cookie = require('./expand/cookie');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = 'http://5yi8r5.natappfree.cc/wx';
var handle = function handle() {
    _list2.default.get('/index', function (req, res) {
        var info = JSON.stringify((0, _cookie.get_cookie)(req)) == '{}';
        if (info) {
            if (!req.query.code) {
                (0, _getCode2.default)(res, url);
            } else {
                //let data =JSON.parse(getToken(req.query.code));
                //console.log(getToken(req.query.code));
                // let userInfo = JSON.parse(getUserInfo(data.access_token, data.openid));
                // set_cookie(res,'user_id = '+ userInfo);
            }
        } else {
            console.log((0, _cookie.get_cookie)(req));
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
    _list2.default.get('/wx', function (req, res) {
        console.log((0, _getToken2.default)(req.query.code));
    });
    _list2.default.post('/aaa', function (req, res) {
        console.log(req.body);
    });
    _list2.default.get('/abc', function (req, res) {
        console.log(req.query);
        res.write('abcdefg');
    });
};
exports.default = handle;