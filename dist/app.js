'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _list = require('./lib/list.js');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handle = function handle() {
    _list2.default.post('/aaa', function (req, res) {
        console.log(req.body);
    });
    _list2.default.get('/abc', function (req, res) {
        console.log(req.params);
        res.write('abcdefg');
    });
};
exports.default = handle;