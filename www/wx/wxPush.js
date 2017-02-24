'use strict';
import xml2js from 'xml2js';
let wxPush = function(postString) {
    return new Promise((resolve, reject) => {
            xml2js.parseString(postString, {explicitArray : false}, (error, json) => {
            console.log(json);
            if(json.xml.ToUserName != 'undefined' && json.xml.FromUserName != 'undefined' && json.xml.CreateTime != 'undefined') {
                switch (json.xml.MsgType) {
                    case 'text' :
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
}
export default wxPush;