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
exports.__esModule = true;
exports.Spin = exports.EvEmitter = exports.ev = void 0;
var eventemitter2_1 = require("eventemitter2");
var spinnies_1 = require("spinnies");
var logging_1 = require("../logging/logging");
var spinner = {
    "interval": 80,
    "frames": [
        "🌑 ",
        "🌒 ",
        "🌓 ",
        "🌔 ",
        "🌕 ",
        "🌖 ",
        "🌗 ",
        "🌘 "
    ]
};
/**
 * This is the library's event emitter. Use this to listen to internal events of the library like so:
 * ```javascript
 * ev.on('event', callback)
 * ```
 *
 * The event you want to listen to is in the format of [namespace].[sessionId]
 *
 * The event can include wildcards.
 *
 * For example, to listen to all qr code events, the event will be `qr.**`. e.g:
 *
 * ```javascript
 * ev.on('qr.**',...
 * ```
 *
 * Listen to all sessionData events
 *
 * ```javascript
 * ev.on('sessionData.**',...
 * ```
 *
 * Listen to all events from session1
 *
 * ```javascript
 * ev.on('**.session1',...
 * ```
 *
 * Listen to all events
 *
 * ```javascript
 * ev.on('**.**',...
 * ```
 *
 * ev always emits data, sessionId and the namespace which is helpful to know if there are multiple sessions or you're listening to events from all namespaces
 *
 * ```javascript
 * ev.on('**.**', (data, sessionId, namespace) => {
 *
 *  console.log(`${namespace} event detected for session ${sessionId}`, data)
 *
 * });
 * ```
 *
 *
 *
 */
exports.ev = new eventemitter2_1.EventEmitter2({
    wildcard: true
});
/** @internal */
var globalSpinner;
var getGlobalSpinner = function (disableSpins) {
    if (disableSpins === void 0) { disableSpins = false; }
    if (!globalSpinner)
        globalSpinner = new spinnies_1["default"]({ color: 'blue', succeedColor: 'green', spinner: spinner, disableSpins: disableSpins });
    return globalSpinner;
};
/**
 * @internal
 */
var EvEmitter = /** @class */ (function () {
    function EvEmitter(sessionId, eventNamespace) {
        this.bannedTransports = [
            //DO NOT ALLOW THESE NAMESPACES ON TRANSPORTS!!
            "sessionData",
            "sessionDataBase64",
            "qr",
        ];
        this.sessionId = sessionId;
        this.eventNamespace = eventNamespace;
    }
    EvEmitter.prototype.emit = function (data, eventNamespaceOverride) {
        var eventName = "".concat(eventNamespaceOverride || this.eventNamespace, ".").concat(this.sessionId);
        var sessionId = this.sessionId;
        var eventNamespace = eventNamespaceOverride || this.eventNamespace;
        exports.ev.emit(eventName, data, sessionId, eventNamespace);
        if (!this.bannedTransports.find(function (x) { return eventNamespace == x; }))
            logging_1.log.info(typeof data === 'string' ? data : eventName, {
                eventName: eventName,
                data: data,
                sessionId: sessionId,
                eventNamespace: eventNamespace
            });
        // ev.emit(`${this.sessionId}.${this.eventNamespace}`,data,this.sessionId,this.eventNamespace);
    };
    EvEmitter.prototype.emitAsync = function (data, eventNamespaceOverride) {
        var eventName = "".concat(eventNamespaceOverride || this.eventNamespace, ".").concat(this.sessionId);
        var sessionId = this.sessionId;
        var eventNamespace = eventNamespaceOverride || this.eventNamespace;
        if (!this.bannedTransports.find(function (x) { return eventNamespace == x; }))
            logging_1.log.info(typeof data === 'string' ? data : eventName, {
                eventName: eventName,
                data: data,
                sessionId: sessionId,
                eventNamespace: eventNamespace
            });
        return exports.ev.emitAsync(eventName, data, sessionId, eventNamespace);
        // ev.emit(`${this.sessionId}.${this.eventNamespace}`,data,this.sessionId,this.eventNamespace);
    };
    return EvEmitter;
}());
exports.EvEmitter = EvEmitter;
/**
 * @internal
 */
var Spin = /** @class */ (function (_super) {
    __extends(Spin, _super);
    /**
     *
     * @param sessionId The session id of the session. @default `session`
     * @param eventNamespace The namespace of the event
     * @param disableSpins If the spinnies should be animated @default `false`
     * @param shouldEmit If the changes in the spinner should emit an event on the event emitter at `${eventNamesapce}.${sessionId}`
     */
    function Spin(sessionId, eventNamespace, disableSpins, shouldEmit) {
        if (sessionId === void 0) { sessionId = 'session'; }
        if (disableSpins === void 0) { disableSpins = false; }
        if (shouldEmit === void 0) { shouldEmit = true; }
        var _this = _super.call(this, sessionId, eventNamespace) || this;
        if (!sessionId)
            sessionId = 'session';
        _this._spinId = sessionId + "_" + eventNamespace;
        _this._spinner = getGlobalSpinner(disableSpins);
        _this._shouldEmit = shouldEmit;
        return _this;
    }
    Spin.prototype.start = function (eventMessage, indent) {
        this._spinner.add(this._spinId, { text: eventMessage, indent: indent });
        if (this._shouldEmit)
            this.emit(eventMessage);
    };
    Spin.prototype.info = function (eventMessage) {
        if (!this._spinner.pick(this._spinId))
            this.start('');
        this._spinner.update(this._spinId, { text: eventMessage });
        if (this._shouldEmit)
            this.emit(eventMessage);
    };
    Spin.prototype.fail = function (eventMessage) {
        if (!this._spinner.pick(this._spinId))
            this.start('');
        this._spinner.fail(this._spinId, { text: eventMessage });
        if (this._shouldEmit)
            this.emit(eventMessage);
    };
    Spin.prototype.succeed = function (eventMessage) {
        if (!this._spinner.pick(this._spinId))
            this.start('');
        this._spinner.succeed(this._spinId, { text: eventMessage });
        if (this._shouldEmit)
            this.emit(eventMessage || 'SUCCESS');
    };
    Spin.prototype.remove = function () {
        this._spinner.remove(this._spinId);
    };
    return Spin;
}(EvEmitter));
exports.Spin = Spin;
