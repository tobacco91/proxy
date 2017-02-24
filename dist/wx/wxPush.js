'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _xml2js = require('xml2js');

var _xml2js2 = _interopRequireDefault(_xml2js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wxPush = function wxPush(postString) {
    return new Promise(function (resolve, reject) {
        _xml2js2.default.parseString(postString, { explicitArray: false }, function (error, json) {
            console.log(json);
            if (json.xml.ToUserName != 'undefined' && json.xml.FromUserName != 'undefined' && json.xml.CreateTime != 'undefined') {
                switch (json.xml.MsgType) {
                    case 'text':
                        //text
                        resolve('text');
                        console.log('text');
                        console.log(json.xml);
                        break;
                    case 'video':
                        if (json.xml.ThumbMediaId === 'undefined') {
                            //audio音频
                            resolve('audio音频');
                            console.log('audio');
                            console.log(json.xml);
                        } else {
                            //video视频
                            //json.xml;
                        }
                        break;
                    case 'image':
                        //image
                        break;
                    case 'shortvideo':
                        //小视频
                        break;
                    case 'location':
                        //地理位置
                        break;
                    case 'link':
                        //链接
                        break;
                }
            } else {
                reject('字段不足');
            }
        });
    });
};
exports.default = wxPush;