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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.Collector = exports.Collection = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * This code is a copy of the Discord Collector: https://github.com/discordjs/discord.js/blob/stable/src/structures/interfaces/Collector.js
 *
 * Please see: https://discord.js.org/#/docs/main/stable/class/Collector
 */
// import { EventEmitter2 } from 'eventemitter2';
var collection_1 = require("@discordjs/collection");
var events_1 = require("events");
var Collection = /** @class */ (function (_super) {
    __extends(Collection, _super);
    function Collection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Collection.prototype.toJSON = function () {
        return this.map(function (e) { return (typeof e.toJSON === 'function' ? e.toJSON() : e); });
    };
    return Collection;
}(collection_1.Collection));
exports.Collection = Collection;
/**
 * Abstract class for defining a new Collector.
 * @abstract
 */
var Collector = /** @class */ (function (_super) {
    __extends(Collector, _super);
    function Collector(filter, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        /**
         * Timeouts set by {@link BaseClient#setTimeout} that are still active
         * @type {Set<Timeout>}
         * @private
         */
        _this._timeouts = new Set();
        /**
         * Intervals set by {@link BaseClient#setInterval} that are still active
         * @type {Set<Timeout>}
         * @private
         */
        _this._intervals = new Set();
        /**
         * Intervals set by {@link BaseClient#setImmediate} that are still active
         * @type {Set<Immediate>}
         * @private
         */
        _this._immediates = new Set();
        /**
         * The filter applied to this collector
         * @type {CollectorFilter}
         */
        _this.filter = filter;
        /**
         * The options of this collector
         * @type {CollectorOptions}
         */
        _this.options = options;
        /**
         * The items collected by this collector
         * @type {Collection}
         */
        _this.collected = new Collection();
        /**
         * Whether this collector has finished collecting
         * @type {boolean}
         */
        _this.ended = false;
        /**
         * Timeout for cleanup
         * @type {?Timeout}
         * @private
         */
        _this._timeout = null;
        /**
         * Timeout for cleanup due to inactivity
         * @type {?Timeout}
         * @private
         */
        _this._idletimeout = null;
        _this.handleCollect = _this.handleCollect.bind(_this);
        _this.handleDispose = _this.handleDispose.bind(_this);
        if (options.time)
            _this._timeout = _this.setTimeout(function () { return _this.stop('time'); }, options.time);
        if (options.idle)
            _this._idletimeout = _this.setTimeout(function () { return _this.stop('idle'); }, options.idle);
        return _this;
    }
    /**
     * Call this to handle an event as a collectable element. Accepts any event data as parameters.
     * @param {...*} args The arguments emitted by the listener
     * @emits Collector#collect
     */
    Collector.prototype.handleCollect = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var collect, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        collect = this.collect.apply(this, args);
                        _a = collect;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.filter.apply(this, __spreadArray(__spreadArray([], args, false), [this.collected], false))];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        if (_a) {
                            this.collected.set(collect, args[0]);
                            /**
                             * Emitted whenever an element is collected.
                             * @event Collector#collect
                             * @param {...*} args The arguments emitted by the listener
                             */
                            this.emit.apply(this, __spreadArray(['collect'], args, false));
                            if (this._idletimeout) {
                                this.clearTimeout(this._idletimeout);
                                this._idletimeout = this.setTimeout(function () { return _this.stop('idle'); }, this.options.idle);
                            }
                        }
                        this.checkEnd();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Call this to remove an element from the collection. Accepts any event data as parameters.
     * @param {...*} args The arguments emitted by the listener
     * @emits Collector#dispose
     */
    Collector.prototype.handleDispose = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var dispose, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.options.dispose)
                            return [2 /*return*/];
                        dispose = this.dispose.apply(this, args);
                        _a = !dispose;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.filter.apply(this, args)];
                    case 1:
                        _a = !(_b.sent());
                        _b.label = 2;
                    case 2:
                        if (_a || !this.collected.has(dispose))
                            return [2 /*return*/];
                        this.collected["delete"](dispose);
                        /**
                         * Emitted whenever an element is disposed of.
                         * @event Collector#dispose
                         * @param {...*} args The arguments emitted by the listener
                         */
                        this.emit.apply(this, __spreadArray(['dispose'], args, false));
                        this.checkEnd();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(Collector.prototype, "next", {
        /**
         * Returns a promise that resolves with the next collected element;
         * rejects with collected elements if the collector finishes without receiving a next element
         * @type {Promise}
         * @readonly
         */
        get: function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (_this.ended) {
                    reject(_this.collected);
                    return;
                }
                var cleanup = function () {
                    _this.removeListener('collect', onCollect);
                    _this.removeListener('end', onEnd);
                };
                var onCollect = function (item) {
                    cleanup();
                    resolve(item);
                };
                var onEnd = function () {
                    cleanup();
                    reject(_this.collected); // eslint-disable-line prefer-promise-reject-errors
                };
                _this.on('collect', onCollect);
                _this.on('end', onEnd);
            });
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Stops this collector and emits the `end` event.
     * @param {string} [reason='user'] The reason this collector is ending
     * @emits Collector#end
     */
    Collector.prototype.stop = function (reason) {
        if (reason === void 0) { reason = 'user'; }
        if (this.ended)
            return;
        if (this._timeout) {
            this.clearTimeout(this._timeout);
            this._timeout = null;
        }
        if (this._idletimeout) {
            this.clearTimeout(this._idletimeout);
            this._idletimeout = null;
        }
        this.ended = true;
        /**
         * Emitted when the collector is finished collecting.
         * @event Collector#end
         * @param {Collection} collected The elements collected by the collector
         * @param {string} reason The reason the collector ended
         */
        this.emit('end', this.collected, reason);
    };
    /**
     * Resets the collectors timeout and idle timer.
     * @param {Object} [options] Options
     * @param {number} [options.time] How long to run the collector for in milliseconds
     * @param {number} [options.idle] How long to stop the collector after inactivity in milliseconds
     */
    Collector.prototype.resetTimer = function (_a) {
        var _this = this;
        var _b = _a === void 0 ? {
            time: null,
            idle: null
        } : _a, time = _b.time, idle = _b.idle;
        if (this._timeout) {
            this.clearTimeout(this._timeout);
            this._timeout = this.setTimeout(function () { return _this.stop('time'); }, time || this.options.time);
        }
        if (this._idletimeout) {
            this.clearTimeout(this._idletimeout);
            this._idletimeout = this.setTimeout(function () { return _this.stop('idle'); }, idle || this.options.idle);
        }
    };
    /**
     * Checks whether the collector should end, and if so, ends it.
     */
    Collector.prototype.checkEnd = function () {
        var reason = this.endReason();
        if (reason)
            this.stop(reason);
    };
    /**
     * Allows collectors to be consumed with for-await-of loops
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of}
     */
    Collector.prototype[Symbol.asyncIterator] = function () {
        return __asyncGenerator(this, arguments, function _a() {
            var queue, onCollect;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        queue = [];
                        onCollect = function (item) { return queue.push(item); };
                        this.on('collect', onCollect);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, , 9, 10]);
                        _b.label = 2;
                    case 2:
                        if (!(queue.length || !this.ended)) return [3 /*break*/, 8];
                        if (!queue.length) return [3 /*break*/, 5];
                        return [4 /*yield*/, __await(queue.shift())];
                    case 3: return [4 /*yield*/, _b.sent()];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 5: 
                    // eslint-disable-next-line no-await-in-loop
                    return [4 /*yield*/, __await(new Promise(function (resolve) {
                            var tick = function () {
                                _this.removeListener('collect', tick);
                                _this.removeListener('end', tick);
                                return resolve(true);
                            };
                            _this.on('collect', tick);
                            _this.on('end', tick);
                        }))];
                    case 6:
                        // eslint-disable-next-line no-await-in-loop
                        _b.sent();
                        _b.label = 7;
                    case 7: return [3 /*break*/, 2];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        this.removeListener('collect', onCollect);
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    /* eslint-disable no-empty-function, valid-jsdoc */
    /**
     * Handles incoming events from the `handleCollect` function. Returns null if the event should not
     * be collected, or returns an object describing the data that should be stored.
     * @see Collector#handleCollect
     * @param {...*} _args Any args the event listener emits
     * @returns the id if the object should be collected, if it shouldnt be collected then it will return null or false.
     * @abstract
     */
    Collector.prototype.collect = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        throw new Error("abstractMethod not implemented");
    };
    /**
     * Handles incoming events from the `handleDispose`. Returns null if the event should not
     * be disposed, or returns the key that should be removed.
     * @see Collector#handleDispose
     * @param {...*} args Any args the event listener emits
     * @returns {?*} Key to remove from the collection, if any
     * @abstract
     */
    Collector.prototype.dispose = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        throw new Error("abstractMethod not implemented");
    };
    /**
     * The reason this collector has ended or will end with.
     * @returns {?string} Reason to end the collector, if any
     * @abstract
     */
    Collector.prototype.endReason = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        throw new Error("abstractMethod not implemented");
    };
    /**
     * Clears a timeout.
     * @param {Timeout} timeout Timeout to cancel
     */
    Collector.prototype.clearTimeout = function (timeout) {
        clearTimeout(timeout);
        this._timeouts["delete"](timeout);
    };
    /**
     * Sets an interval that will be automatically cancelled if the client is destroyed.
     * @param {Function} fn Function to execute
     * @param {number} delay Time to wait between executions (in milliseconds)
     * @param {...*} args Arguments for the function
     * @returns {Timeout}
     */
    Collector.prototype.setInterval = function (fn, delay) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var interval = setInterval.apply(void 0, __spreadArray([fn, delay], args, false));
        this._intervals.add(interval);
        return interval;
    };
    /**
     * Clears an interval.
     * @param {Timeout} interval Interval to cancel
     */
    Collector.prototype.clearInterval = function (interval) {
        clearInterval(interval);
        this._intervals["delete"](interval);
    };
    /**
     * Sets an immediate that will be automatically cancelled if the client is destroyed.
     * @param {Function} fn Function to execute
     * @param {...*} args Arguments for the function
     * @returns {Immediate}
     */
    Collector.prototype.setImmediate = function (fn) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var immediate = setImmediate.apply(void 0, __spreadArray([fn], args, false));
        this._immediates.add(immediate);
        return immediate;
    };
    /**
     * Clears an immediate.
     * @param {Immediate} immediate Immediate to cancel
     */
    Collector.prototype.clearImmediate = function (immediate) {
        clearImmediate(immediate);
        this._immediates["delete"](immediate);
    };
    /**
     * Increments max listeners by one, if they are not zero.
     * @private
     */
    Collector.prototype.incrementMaxListeners = function () {
        var maxListeners = this.getMaxListeners();
        if (maxListeners !== 0) {
            this.setMaxListeners(maxListeners + 1);
        }
    };
    /**
     * Decrements max listeners by one, if they are not zero.
     * @private
     */
    Collector.prototype.decrementMaxListeners = function () {
        var maxListeners = this.getMaxListeners();
        if (maxListeners !== 0) {
            this.setMaxListeners(maxListeners - 1);
        }
    };
    /**
     * Sets a timeout that will be automatically cancelled if the client is destroyed.
     * @param {Function} fn Function to execute
     * @param {number} delay Time to wait before executing (in milliseconds)
     * @param {...*} args Arguments for the function
     * @returns {Timeout}
     */
    Collector.prototype.setTimeout = function (fn, delay) {
        var _this = this;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var timeout = setTimeout(function () {
            fn.apply(void 0, args);
            _this._timeouts["delete"](timeout);
        }, delay);
        this._timeouts.add(timeout);
        return timeout;
    };
    /**
     * Destroys all assets used by the base client.
     */
    Collector.prototype.destroy = function () {
        for (var _i = 0, _a = this._timeouts; _i < _a.length; _i++) {
            var t = _a[_i];
            this.clearTimeout(t);
        }
        for (var _b = 0, _c = this._intervals; _b < _c.length; _b++) {
            var i = _c[_b];
            this.clearInterval(i);
        }
        for (var _d = 0, _e = this._immediates; _d < _e.length; _d++) {
            var i = _e[_d];
            this.clearImmediate(i);
        }
        this._timeouts.clear();
        this._intervals.clear();
        this._immediates.clear();
    };
    return Collector;
}(events_1.EventEmitter));
exports.Collector = Collector;
