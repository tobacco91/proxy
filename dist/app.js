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

var _cookie = require('./expand/cookie.js');

var _wxPush = require('./wx/wxPush.js');

var _wxPush2 = _interopRequireDefault(_wxPush);

var _session = require('./expand/session.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = 'http://j5ntpe.natappfree.cc/index';
var handle = function handle() {
    _list2.default.get('/index', function (req, res) {
        var info = JSON.stringify((0, _cookie.get_cookie)(req)) == '{}';
        if (info) {
            if (!req.query.code) {
                (0, _getCode2.default)(res, url);
            } else {
                var token = (0, _getToken2.default)(req.query.code);
                token.then(function (body) {
                    var data = JSON.parse(body);
                    //console.log(data);
                    return (0, _getUserInfo2.default)(data.access_token, data.openid);
                }).then(function (body) {
                    var random = Math.random();
                    console.log(random);
                    (0, _cookie.set_cookie)(res, 'user_id = ' + random + ';');
                    (0, _session.set_session)({
                        from: 'user',
                        type: 'redis',
                        key: random,
                        value: body
                    });
                });
            }
        } else {
            var session = (0, _session.get_session)({
                from: 'user',
                type: 'redis',
                key: (0, _cookie.get_cookie)(req)
            });
            console.log(session);
        }
    });
    _list2.default.get('/get', function (req, res) {
        console.log(req.number);
        var info = JSON.stringify((0, _cookie.get_cookie)(req)) == '{}';
        if (info) {
            (0, _cookie.set_cookie)(res, 'id = ' + Math.random() + ';');
            (0, _session.set_session)({
                from: 'user',
                type: 'redis',
                key: 'random',
                value: 'body'
            });
        } else {
            (0, _session.set_session)({
                from: 'user',
                type: 'redis',
                key: 'random',
                value: 'body'
            });
            console.log((0, _cookie.get_cookie)(req));
        }
    });

    _list2.default.post('/post', function (req, res) {
        switch (req.msType) {
            case 'json':
                console.log(req.body);
                break;
            case 'xml':
                (0, _wxPush2.default)(req.xml);
                break;
        }
    });
    // app.get('/abc',(req,res) => {
    //     console.log(req.query);
    //     res.write('abcdefg');
    // });
};
exports.default = handle;