'use strict';

var _app = require('../app.js');

var _app2 = _interopRequireDefault(_app);

var _route = require('./route.js');

var _route2 = _interopRequireDefault(_route);

var _server = require('./server.js');

var _server2 = _interopRequireDefault(_server);

var _list = require('./list.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _app2.default)();
(0, _server2.default)(_route2.default, _list.list);