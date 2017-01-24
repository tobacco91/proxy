'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var list = {};
var app = {
    get: function get(path, handle) {
        list.get[path] = handle;
    },
    post: function post(path, handle) {
        list.post[path] = handle;
    }

};
exports.default = app;
exports.list = list;