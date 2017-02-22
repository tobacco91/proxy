'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _xml2js = require('xml2js');

var _xml2js2 = _interopRequireDefault(_xml2js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wxPush = function wxPush(postString) {
	_xml2js2.default.parseString(postString, { explicitArray: false }, function (error, json) {
		console.log(json);
	});
};
exports.default = wxPush;