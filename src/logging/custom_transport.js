"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.NoOpTransport = exports.LogToEvTransport = void 0;
var winston_transport_1 = require("winston-transport");
var events_1 = require("../controllers/events");
var LogToEvTransport = /** @class */ (function (_super) {
    __extends(LogToEvTransport, _super);
    function LogToEvTransport(opts) {
        return _super.call(this, opts) || this;
    }
    LogToEvTransport.prototype.log = function (info, callback) {
        var _this = this;
        setImmediate(function () {
            _this.emit('logged', info);
        });
        events_1.ev.emit("DEBUG.".concat(info.level), Object.keys(info).reduce(function (p, c) {
            var _a;
            return (p = __assign(__assign({}, p), (_a = {}, _a[c] = info[c], _a)));
        }, {}));
        if (callback)
            return callback(null, true);
    };
    return LogToEvTransport;
}(winston_transport_1["default"]));
exports.LogToEvTransport = LogToEvTransport;
var NoOpTransport = /** @class */ (function (_super) {
    __extends(NoOpTransport, _super);
    function NoOpTransport(opts) {
        return _super.call(this, opts) || this;
    }
    NoOpTransport.prototype.log = function (info, callback) {
        var _this = this;
        setImmediate(function () {
            _this.emit('logged', info);
        });
        if (callback)
            return callback(null, true);
    };
    return NoOpTransport;
}(winston_transport_1["default"]));
exports.NoOpTransport = NoOpTransport;
