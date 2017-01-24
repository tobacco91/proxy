'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getList = {};
var postList = {};
var app = {
    get: function get(path, handle) {
        getList[path] = handle;
    },
    post: function post(path, handle) {
        postList[path] = handle;
    }

};
exports.default = app;