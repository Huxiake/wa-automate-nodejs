"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
exports.useragent = exports.Client = exports.namespace = void 0;
var mime_types_1 = require("mime-types");
var axios_1 = require("axios");
var puppeteer_config_1 = require("../config/puppeteer.config");
var model_1 = require("./model");
var errors_1 = require("./model/errors");
var p_queue_1 = require("p-queue");
var events_1 = require("../controllers/events");
var uuid_1 = require("uuid");
var parse_function_1 = require("parse-function");
var fs = require("fs");
var datauri_1 = require("datauri");
var is_url_superb_1 = require("is-url-superb");
var fs_extra_1 = require("fs-extra");
var browser_1 = require("../controllers/browser");
var auth_1 = require("../controllers/auth");
var wa_decrypt_1 = require("@open-wa/wa-decrypt");
var path = require("path");
var media_1 = require("./model/media");
var patch_manager_1 = require("../controllers/patch_manager");
var events_2 = require("./model/events");
var MessageCollector_1 = require("../structures/MessageCollector");
var init_patch_1 = require("../controllers/init_patch");
var preProcessors_1 = require("../structures/preProcessors");
var tools_1 = require("../utils/tools");
var logging_1 = require("../logging/logging");
var pid_utils_1 = require("../utils/pid_utils");
/** @ignore */
var pkg = (0, fs_extra_1.readJsonSync)(path.join(__dirname, '../../package.json'));
var namespace;
(function (namespace) {
    namespace["Chat"] = "Chat";
    namespace["Msg"] = "Msg";
    namespace["Contact"] = "Contact";
    namespace["GroupMetadata"] = "GroupMetadata";
})(namespace = exports.namespace || (exports.namespace = {}));
/* eslint-enable */
var Client = /** @class */ (function () {
    /**
     * @ignore
     * @param page [Page] [Puppeteer Page]{@link https://pptr.dev/#?product=Puppeteer&version=v2.1.1&show=api-class-page} running WA Web
     */
    function Client(page, createConfig, sessionInfo) {
        var _this = this;
        this._currentlyBeingKilled = false;
        this._refreshing = false;
        this._loaded = false;
        this._prio = Number.MAX_SAFE_INTEGER;
        this._pageListeners = [];
        this._registeredPageListeners = [];
        this._onLogoutCallbacks = [];
        this._queues = {};
        this._autoEmojiSet = false;
        this._autoEmojiQ = new p_queue_1["default"]({
            concurrency: 1,
            intervalCap: 1,
            carryoverConcurrencyCount: true
        });
        this._onLogoutSet = false;
        this._preprocIdempotencyCheck = {};
        /**
         * This is used to track if a listener is already used via webhook. Before, webhooks used to be set once per listener. Now a listener can be set via multiple webhooks, or revoked from a specific webhook.
         * For this reason, listeners assigned to a webhook are only set once and map through all possible webhooks to and fire only if the specific listener is assigned.
         *
         * Note: This would be much simpler if eventMode was the default (and only) listener strategy.
         */
        this._registeredWebhookListeners = {};
        /**
         * This exposes a simple express middlware that will allow users to quickly boot up an api based off this client. Checkout demo/index.ts for an example
         * How to use the middleware:
         *
         * ```javascript
         *
         * import { create } from '@open-wa/wa-automate';
         * const express = require('express')
         * const app = express()
         * app.use(express.json())
         * const PORT = 8082;
         *
         * function start(client){
         *   app.use(client.middleware()); //or client.middleware(true) if you require the session id to be part of the path (so localhost:8082/sendText beccomes localhost:8082/sessionId/sendText)
         *   app.listen(PORT, function () {
         *     console.log(`\n• Listening on port ${PORT}!`);
         *   });
         *   ...
         * }
         *
         *
         * create({
         *   sessionId:'session1'
         * }).then(start)
         *
         * ```
         *
         * All requests need to be `POST` requests. You use the API the same way you would with `client`. The method can be the path or the method param in the post body. The arguments for the method should be properly ordered in the args array in the JSON post body.
         *
         * Example:
         *
         * ```javascript
         *   await client.sendText('4477777777777@c.us','test')
         *   //returns "true_4477777777777@c.us_3EB0645E623D91006252"
         * ```
         * as a request with a path:
         *
         * ```javascript
         * const axios = require('axios').default;
         * axios.post('localhost:8082/sendText', {
         *     args: [
         *        "4477777777777@c.us",
         *        "test"
         *         ]
         *   })
         * ```
         *
         * or as a request without a path:
         *
         * ```javascript
         * const axios = require('axios').default;
         * axios.post('localhost:8082', {
         *     method:'sendText',
         *     args: [
         *        "4477777777777@c.us",
         *        "test"
         *         ]
         * })
         * ```
         *
         * As of 1.9.69, you can also send the argyments as an object with the keys mirroring the paramater names of the relative client functions
         *
         * Example:
         *
         * ```javascript
         * const axios = require('axios').default;
         * axios.post('localhost:8082', {
         *     method:'sendText',
         *     args: {
         *        "to":"4477777777777@c.us",
         *        "content":"test"
         *         }
         * })
         * ```
         * @param useSessionIdInPath boolean Set this to true if you want to keep each session in it's own path.
         *
         * For example, if you have a session with id  `host` if you set useSessionIdInPath to true, then all requests will need to be prefixed with the path `host`. E.g `localhost:8082/sendText` becomes `localhost:8082/host/sendText`
         */
        this.middleware = function (useSessionIdInPath, PORT) {
            if (useSessionIdInPath === void 0) { useSessionIdInPath = false; }
            return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                var methodFromPath, checkProp, checkValue, sessionId, hostAccountNumber, checkPassed, rb, args_1, m, methodRequiresArgs, methodArgs, response, success, error_1, snapshot, snapshotBuffer;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (useSessionIdInPath && !req.path.includes(this._createConfig.sessionId) && this._createConfig.sessionId !== 'session')
                                return [2 /*return*/, next()];
                            methodFromPath = this._createConfig.sessionId && this._createConfig.sessionId !== 'session' && req.path.includes(this._createConfig.sessionId) ? req.path.replace("/".concat(this._createConfig.sessionId, "/"), '') : req.path.replace('/', '');
                            if (!(req.get('owa-check-property') && req.get('owa-check-value'))) return [3 /*break*/, 2];
                            checkProp = req.get('owa-check-property');
                            checkValue = req.get('owa-check-value');
                            sessionId = this._createConfig.sessionId;
                            return [4 /*yield*/, this.getHostNumber()];
                        case 1:
                            hostAccountNumber = _a.sent();
                            checkPassed = false;
                            switch (checkProp) {
                                case 'session':
                                    checkPassed = sessionId === checkValue;
                                    break;
                                case 'number':
                                    checkPassed = hostAccountNumber.includes(checkValue);
                                    break;
                            }
                            if (!checkPassed) {
                                if (PORT)
                                    (0, tools_1.processSendData)({ port: PORT });
                                return [2 /*return*/, res.status(412).send({
                                        success: false,
                                        error: {
                                            name: 'CHECK_FAILED',
                                            message: "Check FAILED - Are you sure you meant to send the request to this session?",
                                            data: {
                                                incomingCheckProperty: checkProp,
                                                incomingCheckValue: checkValue,
                                                sessionId: sessionId,
                                                hostAccountNumber: "".concat(hostAccountNumber.substr(-4))
                                            }
                                        }
                                    })];
                            }
                            _a.label = 2;
                        case 2:
                            if (!(req.method === 'POST')) return [3 /*break*/, 7];
                            rb = (req === null || req === void 0 ? void 0 : req.body) || {};
                            args_1 = rb.args;
                            m = (rb === null || rb === void 0 ? void 0 : rb.method) || methodFromPath;
                            logging_1.log.info("MDLWR - ".concat(m, " : ").concat(JSON.stringify(rb || {})));
                            methodRequiresArgs = false;
                            if (args_1 && !Array.isArray(args_1)) {
                                methodArgs = (0, parse_function_1["default"])().parse(this[m]).args;
                                logging_1.log.info("methodArgs: ".concat(methodArgs));
                                if ((methodArgs === null || methodArgs === void 0 ? void 0 : methodArgs.length) > 0)
                                    methodRequiresArgs = true;
                                args_1 = methodArgs.map(function (argName) { return args_1[argName]; });
                            }
                            else if (!args_1)
                                args_1 = [];
                            if (!this[m]) return [3 /*break*/, 6];
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this[m].apply(this, args_1)];
                        case 4:
                            response = _a.sent();
                            success = true;
                            if (typeof response == 'string' && (response.startsWith("Error") || response.startsWith("ERROR")))
                                success = false;
                            return [2 /*return*/, res.send({
                                    success: success,
                                    response: response
                                })];
                        case 5:
                            error_1 = _a.sent();
                            console.error("middleware -> error", error_1);
                            if (methodRequiresArgs && Array.isArray(args_1))
                                error_1.message = "".concat((req === null || req === void 0 ? void 0 : req.params) ? "Please set arguments in request json body, not in params." : "Args expected, none found.", " ").concat(error_1.message);
                            return [2 /*return*/, res.send({
                                    success: false,
                                    error: {
                                        name: error_1.name,
                                        message: error_1.message,
                                        data: error_1.data
                                    }
                                })];
                        case 6: return [2 /*return*/, res.status(404).send("Cannot find method: ".concat(m))];
                        case 7:
                            if (!(req.method === "GET")) return [3 /*break*/, 9];
                            if (!["snapshot", "getSnapshot"].includes(methodFromPath)) return [3 /*break*/, 9];
                            return [4 /*yield*/, this.getSnapshot()];
                        case 8:
                            snapshot = _a.sent();
                            snapshotBuffer = Buffer.from(snapshot.split(',')[1], 'base64');
                            res.writeHead(200, {
                                'Content-Type': 'image/png',
                                'Content-Length': snapshotBuffer.length
                            });
                            return [2 /*return*/, res.end(snapshotBuffer)];
                        case 9: return [2 /*return*/, next()];
                    }
                });
            }); };
        };
        this._page = page;
        this._createConfig = createConfig || {};
        this._loadedModules = [];
        this._sessionInfo = sessionInfo;
        this._sessionInfo.INSTANCE_ID = (0, uuid_1.v4)();
        this._listeners = {};
        this._setOnClose();
    }
    /**
     * @private
     *
     * DO NOT USE THIS.
     *
     * Run all tasks to set up client AFTER init is fully completed
     */
    Client.prototype.loaded = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __awaiter(this, void 0, void 0, function () {
            var syncT, _k, ident_1;
            var _this = this;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        /**
                         * Wait for internal session to load earlier messages
                         */
                        logging_1.log.info('Waiting for internal session to finish syncing');
                        return [4 /*yield*/, (0, tools_1.timePromise)(function () { return _this._page.waitForFunction(function () { return WAPI.isSessionLoaded(); }, { timeout: 20000, polling: 50 }); })["catch"](function () { return 20001; })];
                    case 1:
                        syncT = _l.sent();
                        logging_1.log.info("Internal session finished syncing in ".concat(syncT, "ms"));
                        if (!((_a = this._createConfig) === null || _a === void 0 ? void 0 : _a.eventMode)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.registerAllSimpleListenersOnEv()];
                    case 2:
                        _l.sent();
                        _l.label = 3;
                    case 3:
                        _k = this._sessionInfo;
                        return [4 /*yield*/, this.getMe()];
                    case 4:
                        _k.PHONE_VERSION = (_c = (_b = (_l.sent())) === null || _b === void 0 ? void 0 : _b.phone) === null || _c === void 0 ? void 0 : _c.wa_version;
                        logging_1.log.info('LOADED', {
                            PHONE_VERSION: this._sessionInfo.PHONE_VERSION
                        });
                        if ((((_d = this._createConfig) === null || _d === void 0 ? void 0 : _d.autoEmoji) === undefined || ((_e = this._createConfig) === null || _e === void 0 ? void 0 : _e.autoEmoji)) && !this._autoEmojiSet) {
                            ident_1 = typeof ((_f = this._createConfig) === null || _f === void 0 ? void 0 : _f.autoEmoji) === "string" ? (_g = this._createConfig) === null || _g === void 0 ? void 0 : _g.autoEmoji : ":";
                            this.onMessage(function (message) { return __awaiter(_this, void 0, void 0, function () {
                                var emojiId_1;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!((message === null || message === void 0 ? void 0 : message.body) && message.body.startsWith(ident_1) && message.body.endsWith(ident_1))) return [3 /*break*/, 2];
                                            emojiId_1 = message.body.replace(new RegExp(ident_1, 'g'), "");
                                            if (!emojiId_1)
                                                return [2 /*return*/];
                                            return [4 /*yield*/, this._autoEmojiQ.add(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                                    return [2 /*return*/, this.sendEmoji(message.from, emojiId_1, message.id)["catch"](function () { })];
                                                }); }); })];
                                        case 1:
                                            _a.sent();
                                            _a.label = 2;
                                        case 2: return [2 /*return*/, message];
                                    }
                                });
                            }); });
                            this._autoEmojiSet = true;
                        }
                        if ((((_h = this._createConfig) === null || _h === void 0 ? void 0 : _h.deleteSessionDataOnLogout) || ((_j = this._createConfig) === null || _j === void 0 ? void 0 : _j.killClientOnLogout)) && !this._onLogoutSet) {
                            this.onLogout(function () { return __awaiter(_this, void 0, void 0, function () {
                                var _a, _b, _c, _d, _e, _f;
                                return __generator(this, function (_g) {
                                    switch (_g.label) {
                                        case 0: return [4 /*yield*/, this.waitAllQEmpty()];
                                        case 1:
                                            _g.sent();
                                            return [4 /*yield*/, ((_b = (_a = this._queues) === null || _a === void 0 ? void 0 : _a.onLogout) === null || _b === void 0 ? void 0 : _b.onEmpty())];
                                        case 2:
                                            _g.sent();
                                            return [4 /*yield*/, ((_d = (_c = this._queues) === null || _c === void 0 ? void 0 : _c.onLogout) === null || _d === void 0 ? void 0 : _d.onIdle())];
                                        case 3:
                                            _g.sent();
                                            return [4 /*yield*/, (0, browser_1.invalidateSesssionData)(this._createConfig)];
                                        case 4:
                                            _g.sent();
                                            if (!((_e = this._createConfig) === null || _e === void 0 ? void 0 : _e.deleteSessionDataOnLogout)) return [3 /*break*/, 6];
                                            return [4 /*yield*/, (0, browser_1.deleteSessionData)(this._createConfig)];
                                        case 5:
                                            _g.sent();
                                            _g.label = 6;
                                        case 6:
                                            if ((_f = this._createConfig) === null || _f === void 0 ? void 0 : _f.killClientOnLogout) {
                                                console.log("Session logged out. Killing client");
                                                logging_1.log.warn("Session logged out. Killing client");
                                                this.kill("LOGGED_OUT");
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, -1);
                            this._onLogoutSet = true;
                        }
                        this._loaded = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    Client.prototype.registerAllSimpleListenersOnEv = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(Object.keys(events_2.SimpleListener).map(function (eventKey) { return _this.registerEv(events_2.SimpleListener[eventKey]); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Client.prototype.getSessionId = function () {
        return this._createConfig.sessionId || 'session';
    };
    Client.prototype.getPage = function () {
        return this._page;
    };
    Client.prototype._setOnClose = function () {
        var _this = this;
        this._page.on('close', function () {
            var _a;
            if (!_this._refreshing) {
                console.log("Browser page has closed. Killing client");
                logging_1.log.warn("Browser page has closed. Killing client");
                _this.kill("PAGE_CLOSED");
                if ((_a = _this._createConfig) === null || _a === void 0 ? void 0 : _a.killProcessOnBrowserClose)
                    process.exit();
            }
        });
    };
    Client.prototype._reInjectWapi = function (newTab) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, browser_1.injectApi)(newTab || this._page, null, true)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Client.prototype._reRegisterListeners = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, Object.keys(this._listeners).forEach(function (listenerName) { return _this[listenerName](_this._listeners[listenerName]); })];
            });
        });
    };
    /**
     * A convinience method to download the [[DataURL]] of a file
     * @param url The url
     * @param optionsOverride You can use this to override the [axios request config](https://github.com/axios/axios#request-config)
     * @returns `Promise<DataURL>`
     */
    Client.prototype.download = function (url, optionsOverride) {
        if (optionsOverride === void 0) { optionsOverride = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, tools_1.getDUrl)(url, optionsOverride)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Grab the logger for this session/process
     */
    Client.prototype.logger = function () {
        return logging_1.log;
    };
    /**
     * Refreshes the page and reinjects all necessary files. This may be useful for when trying to save memory
     * This will attempt to re register all listeners EXCEPT onLiveLocation and onParticipantChanged
     */
    Client.prototype.refresh = function () {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var spinner, me, preloadlicense, _e, START_TIME, newTab, qrManager, closePageOnConflict, setupNewPage;
            var _this = this;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        this._refreshing = true;
                        spinner = new events_1.Spin(((_a = this._createConfig) === null || _a === void 0 ? void 0 : _a.sessionId) || 'session', 'REFRESH', (_b = this._createConfig) === null || _b === void 0 ? void 0 : _b.disableSpins);
                        return [4 /*yield*/, this.getMe()];
                    case 1:
                        me = (_f.sent()).me;
                        if (!((_c = this._createConfig) === null || _c === void 0 ? void 0 : _c.licenseKey)) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, patch_manager_1.getLicense)(this._createConfig, me, this._sessionInfo, spinner)];
                    case 2:
                        _e = _f.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _e = false;
                        _f.label = 4;
                    case 4:
                        preloadlicense = _e;
                        spinner.info('Refreshing session');
                        START_TIME = Date.now();
                        spinner.info("Opening session in new tab");
                        return [4 /*yield*/, this._page.browser().newPage()];
                    case 5:
                        newTab = _f.sent();
                        qrManager = new auth_1.QRManager(this._createConfig);
                        return [4 /*yield*/, (0, browser_1.initPage)(this.getSessionId(), this._createConfig, qrManager, this._createConfig.customUserAgent, spinner, newTab, true)
                            //  await newTab.goto(puppeteerConfig.WAUrl);
                            //Two promises. One that closes the previous page, one that sets up the new page
                        ];
                    case 6:
                        _f.sent();
                        closePageOnConflict = function () { return __awaiter(_this, void 0, void 0, function () {
                            var useHere;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this._page.evaluate(function () { return WAPI.getUseHereString(); })];
                                    case 1:
                                        useHere = _a.sent();
                                        spinner.info("Waiting for conflict to close stale tab...");
                                        return [4 /*yield*/, this._page.waitForFunction("[...document.querySelectorAll(\"div[role=button\")].find(e=>{return e.innerHTML.toLowerCase().includes(\"".concat(useHere.toLowerCase(), "\")})"), { timeout: 0, polling: 500 })];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, this._page.goto('about:blank')];
                                    case 3:
                                        _a.sent();
                                        spinner.info("Closing stale tab");
                                        return [4 /*yield*/, this._page.close()];
                                    case 4:
                                        _a.sent();
                                        spinner.info("Stale tab closed. Switching contexts...");
                                        this._page = newTab;
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        setupNewPage = function () { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        /**
                                         * Wait for the new page to be loaded up before closing existing page
                                         */
                                        spinner.info("Checking if fresh session is authenticated...");
                                        return [4 /*yield*/, (0, auth_1.isAuthenticated)(newTab)];
                                    case 1:
                                        if (!_c.sent()) return [3 /*break*/, 10];
                                        /**
                                         * Reset all listeners
                                         */
                                        this._registeredEvListeners = {};
                                        if (!((_a = this._createConfig) === null || _a === void 0 ? void 0 : _a.waitForRipeSession)) return [3 /*break*/, 4];
                                        return [4 /*yield*/, this._reInjectWapi(newTab)];
                                    case 2:
                                        _c.sent();
                                        spinner.start("Waiting for ripe session...");
                                        return [4 /*yield*/, (0, auth_1.waitForRipeSession)(newTab)];
                                    case 3:
                                        if (_c.sent())
                                            spinner.succeed("Session ready for injection");
                                        else
                                            spinner.fail("You may experience issues in headless mode. Continuing...");
                                        _c.label = 4;
                                    case 4:
                                        spinner.info("Injected new session...");
                                        return [4 /*yield*/, this._reInjectWapi(newTab)];
                                    case 5:
                                        _c.sent();
                                        /**
                                         * patch
                                         */
                                        return [4 /*yield*/, (0, patch_manager_1.getAndInjectLivePatch)(newTab, spinner, null, this._createConfig, this._sessionInfo)];
                                    case 6:
                                        /**
                                         * patch
                                         */
                                        _c.sent();
                                        if (!((_b = this._createConfig) === null || _b === void 0 ? void 0 : _b.licenseKey)) return [3 /*break*/, 8];
                                        return [4 /*yield*/, (0, patch_manager_1.getAndInjectLicense)(newTab, this._createConfig, me, this._sessionInfo, spinner, preloadlicense)];
                                    case 7:
                                        _c.sent();
                                        _c.label = 8;
                                    case 8: 
                                    /**
                                     * init patch
                                     */
                                    return [4 /*yield*/, (0, init_patch_1.injectInitPatch)(newTab)];
                                    case 9:
                                        /**
                                         * init patch
                                         */
                                        _c.sent();
                                        return [3 /*break*/, 11];
                                    case 10: throw new Error("Session Logged Out. Cannot refresh. Please restart the process and scan the qr code.");
                                    case 11: return [2 /*return*/];
                                }
                            });
                        }); };
                        return [4 /*yield*/, Promise.all([
                                closePageOnConflict(),
                                setupNewPage()
                            ])];
                    case 7:
                        _f.sent();
                        spinner.info("New session live. Setting up...");
                        spinner.info("Reregistering listeners");
                        return [4 /*yield*/, this.loaded()];
                    case 8:
                        _f.sent();
                        if (!!((_d = this._createConfig) === null || _d === void 0 ? void 0 : _d.eventMode)) return [3 /*break*/, 10];
                        return [4 /*yield*/, this._reRegisterListeners()];
                    case 9:
                        _f.sent();
                        _f.label = 10;
                    case 10:
                        spinner.succeed("Session refreshed in ".concat((Date.now() - START_TIME) / 1000, "s"));
                        this._refreshing = false;
                        spinner.remove();
                        this._setOnClose();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * Get the session info
     *
     * @returns SessionInfo
     */
    Client.prototype.getSessionInfo = function () {
        return this._sessionInfo;
    };
    /**
     * Easily resize page on the fly. Useful if you're showing screenshots in a web-app.
     */
    Client.prototype.resizePage = function (width, height) {
        if (width === void 0) { width = 1920; }
        if (height === void 0) { height = 1080; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._page.setViewport({
                            width: width,
                            height: height
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * Get the config which was used to set up the client. Sensitive details (like devTools username and password, and browserWSEndpoint) are scrubbed
     *
     * @returns SessionInfo
     */
    Client.prototype.getConfig = function () {
        /* eslint-disable */
        var _a = this._createConfig, devtools = _a.devtools, browserWSEndpoint = _a.browserWSEndpoint, sessionData = _a.sessionData, proxyServerCredentials = _a.proxyServerCredentials, restartOnCrash = _a.restartOnCrash, rest = __rest(_a, ["devtools", "browserWSEndpoint", "sessionData", "proxyServerCredentials", "restartOnCrash"]);
        /* eslint-enable */
        return rest;
    };
    Client.prototype.pup = function (pageFunction) {
        var _a, _b, _c, _d, _e, _f;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var invocation_id, _g, safeMode, callTimeout, idCorrection, logging, _t, state, fixId_1, p, wapis, _args, gc_1, mainPromise, res;
            var _h;
            var _this = this;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        invocation_id = (0, uuid_1.v4)().slice(-5);
                        _g = this._createConfig, safeMode = _g.safeMode, callTimeout = _g.callTimeout, idCorrection = _g.idCorrection, logging = _g.logging;
                        if (!safeMode) return [3 /*break*/, 2];
                        if (!this._page || this._page.isClosed())
                            throw new errors_1.CustomError(errors_1.ERROR_NAME.PAGE_CLOSED, 'page closed');
                        return [4 /*yield*/, this.forceUpdateConnectionState()];
                    case 1:
                        state = _j.sent();
                        if (state !== model_1.STATE.CONNECTED)
                            throw new errors_1.CustomError(errors_1.ERROR_NAME.STATE_ERROR, "state: ".concat(state));
                        _j.label = 2;
                    case 2:
                        if (idCorrection && args[0]) {
                            fixId_1 = function (id) {
                                var _a;
                                var isGroup = false;
                                var scrubbedId = (_a = id === null || id === void 0 ? void 0 : id.match(/\d|-/g)) === null || _a === void 0 ? void 0 : _a.join('');
                                scrubbedId = scrubbedId.match(/-/g) && scrubbedId.match(/-/g).length == 1 && scrubbedId.split('-')[1].length === 10 ? scrubbedId : scrubbedId.replace(/-/g, '');
                                if (scrubbedId.includes('-') || scrubbedId.length === 18)
                                    isGroup = true;
                                var fixed = isGroup ?
                                    "".concat(scrubbedId === null || scrubbedId === void 0 ? void 0 : scrubbedId.replace(/@(c|g).us/g, ''), "@g.us") :
                                    "".concat(scrubbedId === null || scrubbedId === void 0 ? void 0 : scrubbedId.replace(/@(c|g).us/g, ''), "@c.us");
                                logging_1.log.info('Fixed ID', { id: id, fixed: fixed });
                                return fixed;
                            };
                            if (typeof args[0] === 'string' && args[0] && !(args[0].includes("@g.us") || args[0].includes("@c.us")) && ((_c = (_b = (((_a = pageFunction === null || pageFunction === void 0 ? void 0 : pageFunction.toString()) === null || _a === void 0 ? void 0 : _a.match(/[^(]*\(([^)]*)\)/)[1]) || "")) === null || _b === void 0 ? void 0 : _b.replace(/\s/g, '')) === null || _c === void 0 ? void 0 : _c.split(','))) {
                                p = ((pageFunction === null || pageFunction === void 0 ? void 0 : pageFunction.toString().match(/[^(]*\(([^)]*)\)/)[1]) || "").replace(/\s/g, '').split(',');
                                if (["to", "chatId", "groupChatId", "groupId", "contactId"].includes(p[0]))
                                    args[0] = fixId_1(args[0]);
                            }
                            else if (typeof args[0] === 'object')
                                Object.entries(args[0]).map(function (_a) {
                                    var k = _a[0], v = _a[1];
                                    if (["to", "chatId", "groupChatId", "groupId", "contactId"].includes(k) && typeof v == "string" && v && !(v.includes("@g.us") || v.includes("@c.us"))) {
                                        args[0][k] = fixId_1(v);
                                    }
                                });
                        }
                        if (logging) {
                            wapis = (_e = (((_d = pageFunction === null || pageFunction === void 0 ? void 0 : pageFunction.toString()) === null || _d === void 0 ? void 0 : _d.match(/WAPI\.(\w*)\(/g)) || [])) === null || _e === void 0 ? void 0 : _e.map(function (s) { return s.replace(/WAPI|\.|\(/g, ''); });
                            _t = Date.now();
                            _args = ["string", "number", "boolean"].includes(typeof args[0]) ? args[0] : __assign({}, args[0]);
                            logging_1.log.info("IN ".concat(invocation_id), {
                                _method: (wapis === null || wapis === void 0 ? void 0 : wapis.length) === 1 ? wapis[0] : wapis,
                                _args: _args
                            });
                        }
                        if (!((_f = this._createConfig) === null || _f === void 0 ? void 0 : _f.aggressiveGarbageCollection)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._page.evaluate(function () { return gc_1(); })];
                    case 3:
                        gc_1 = _j.sent();
                        _j.label = 4;
                    case 4:
                        mainPromise = (_h = this._page).evaluate.apply(_h, __spreadArray([pageFunction], args, false));
                        if (!callTimeout) return [3 /*break*/, 6];
                        return [4 /*yield*/, Promise.race([mainPromise, new Promise(function (resolve, reject) { var _a; return setTimeout(reject, (_a = _this._createConfig) === null || _a === void 0 ? void 0 : _a.callTimeout, new errors_1.PageEvaluationTimeout()); })])];
                    case 5: return [2 /*return*/, _j.sent()];
                    case 6: return [4 /*yield*/, mainPromise];
                    case 7:
                        res = _j.sent();
                        if (_t && logging) {
                            logging_1.log.info("OUT ".concat(invocation_id, ": ").concat(Date.now() - _t, "ms"), { res: res });
                        }
                        return [2 /*return*/, this.responseWrap(res)];
                }
            });
        });
    };
    Client.prototype.responseWrap = function (res) {
        if (this._loaded && typeof res === "string" && res.includes("requires") && res.includes("license")) {
            console.info('\x1b[36m', "🔶", res, "🔶", '\x1b[0m');
        }
        if (this._createConfig.onError && typeof res == "string" && (res.startsWith("Error") || res.startsWith("ERROR"))) {
            var e = this._createConfig.onError;
            /**
             * Log error
             */
            if (e == model_1.OnError.LOG_AND_FALSE ||
                e == model_1.OnError.LOG_AND_STRING ||
                res.includes("get.openwa.dev"))
                console.error(res);
            /**
             * Return res
             */
            if (e == model_1.OnError.AS_STRING ||
                e == model_1.OnError.NOTHING ||
                e == model_1.OnError.LOG_AND_STRING)
                return res;
            /**
             * Return false
             */
            if (e == model_1.OnError.LOG_AND_FALSE ||
                e == model_1.OnError.RETURN_FALSE)
                return false;
            if (e == model_1.OnError.RETURN_ERROR)
                return new Error(res);
            if (e == model_1.OnError.THROW)
                throw new Error(res);
        }
        return res;
    };
    /**
     * ////////////////////////  LISTENERS
     */
    Client.prototype.removeListener = function (listener) {
        events_1.ev.removeAllListeners(this.getEventSignature(listener));
        return true;
    };
    Client.prototype.removeAllListeners = function () {
        var _this = this;
        Object.keys(this._registeredEvListeners).map(function (listener) { return events_1.ev.removeAllListeners(_this.getEventSignature(listener)); });
        return true;
    };
    /**
     *
     */
    Client.prototype.registerListener = function (funcName, _fn, queueOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var fn, set, exists, res;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (queueOptions) {
                            if (!this._queues[funcName]) {
                                this._queues[funcName] = new p_queue_1["default"](queueOptions);
                            }
                            fn = function (data) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, this._queues[funcName].add(function () { return _fn(data); }, {
                                            priority: this.tickPriority()
                                        })];
                                });
                            }); };
                        }
                        else {
                            fn = _fn;
                        }
                        if (this._registeredEvListeners && this._registeredEvListeners[funcName]) {
                            return [2 /*return*/, events_1.ev.on(this.getEventSignature(funcName), function (_a) {
                                    var data = _a.data;
                                    return fn(data);
                                }, { objectify: true })];
                        }
                        set = function () { return _this.pup(function (_a) {
                            var funcName = _a.funcName;
                            //@ts-ignore
                            return window[funcName] ? WAPI["".concat(funcName)](function (obj) { return window[funcName](obj); }) : false;
                        }, { funcName: funcName }); };
                        if (this._listeners[funcName] && !this._refreshing) {
                            return [2 /*return*/, true];
                        }
                        this._listeners[funcName] = fn;
                        return [4 /*yield*/, this.pup(function (_a) {
                                var checkFuncName = _a.checkFuncName;
                                return window[checkFuncName] ? true : false;
                            }, { checkFuncName: funcName })];
                    case 1:
                        exists = _a.sent();
                        if (!exists) return [3 /*break*/, 3];
                        return [4 /*yield*/, set()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, this._page.exposeFunction(funcName, function (obj) { return fn(obj); }).then(set)["catch"](function () { return set; })];
                    case 4:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    // NON-STANDARD LISTENERS
    Client.prototype.registerPageEventListener = function (_event, callback, priority) {
        var _this = this;
        var event = _event;
        this._pageListeners.push({
            event: event,
            callback: callback,
            priority: priority
        });
        if (this._registeredPageListeners.includes(event))
            return true;
        this._registeredPageListeners.push(event);
        logging_1.log.info("setting page listener: ".concat(String(event)), this._registeredPageListeners);
        this._page.on(event, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Promise.all(this._pageListeners.filter(function (l) { return l.event === event; }).filter(function (_a) {
                                var priority = _a.priority;
                                return priority !== -1;
                            }).sort(function (a, b) { return (b.priority || 0) - (a.priority || 0); }).map(function (l) { return l.callback.apply(l, args); }))];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, Promise.all(this._pageListeners.filter(function (l) { return l.event === event; }).filter(function (_a) {
                                    var priority = _a.priority;
                                    return priority == -1;
                                }).sort(function (a, b) { return (b.priority || 0) - (a.priority || 0); }).map(function (l) { return l.callback.apply(l, args); }))];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
    };
    /**
     * It calls the JavaScript garbage collector
     * @returns Nothing.
     */
    Client.prototype.gc = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._page.evaluate(function () { return gc(); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Listens to a log out event
     *
     * @event
     * @param fn callback
     * @param priority A priority of -1 will mean the callback will be triggered after all the non -1 callbacks
     * @fires `true`
     */
    Client.prototype.onLogout = function (fn, priority) {
        return __awaiter(this, void 0, void 0, function () {
            var event;
            var _this = this;
            return __generator(this, function (_a) {
                event = 'framenavigated';
                this._onLogoutCallbacks.push({
                    callback: fn,
                    priority: priority
                });
                if (!this._queues[event])
                    this._queues[event] = new p_queue_1["default"]({
                        concurrency: 1,
                        intervalCap: 1,
                        carryoverConcurrencyCount: true
                    });
                if (this._registeredPageListeners.includes(event))
                    return [2 /*return*/, true];
                this.registerPageEventListener(event, function (frame) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!frame.url().includes('post_logout=1')) return [3 /*break*/, 5];
                                console.log("LOGGED OUT");
                                logging_1.log.warn("LOGGED OUT");
                                return [4 /*yield*/, Promise.all(this._onLogoutCallbacks.filter(function (c) { return c.priority !== -1; }).map(function (_a) {
                                        var callback = _a.callback;
                                        return _this._queues[event].add(function () { return callback(true); });
                                    }))];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, this._queues[event].onEmpty()];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, Promise.all(this._onLogoutCallbacks.filter(function (c) { return c.priority == -1; }).map(function (_a) {
                                        var callback = _a.callback;
                                        return _this._queues[event].add(function () { return callback(true); });
                                    }))];
                            case 3:
                                _a.sent();
                                return [4 /*yield*/, this._queues[event].onEmpty()];
                            case 4:
                                _a.sent();
                                _a.label = 5;
                            case 5: return [2 /*return*/];
                        }
                    });
                }); }, priority || 1);
                return [2 /*return*/, true];
            });
        });
    };
    /**
     * Wait for the webhook queue to become idle. This is useful for ensuring webhooks are cleared before ending a process.
     */
    Client.prototype.waitWhQIdle = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._webhookQueue) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._webhookQueue.onIdle()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * Wait for all queues to be empty
     */
    Client.prototype.waitAllQEmpty = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(__spreadArray([
                            this._webhookQueue
                        ], Object.values(this._queues), true).filter(function (q) { return q; }).map(function (q) { return q === null || q === void 0 ? void 0 : q.onEmpty(); }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * If you have set `onAnyMessage` or `onMessage` with the second parameter (PQueue options) then you may want to inspect their respective PQueue's.
     */
    Client.prototype.getListenerQueues = function () {
        return this._queues;
    };
    // STANDARD SIMPLE LISTENERS
    Client.prototype.preprocessMessage = function (message, source) {
        return __awaiter(this, void 0, void 0, function () {
            var alreadyProcessed, fil, m, _m_1, preprocres;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        alreadyProcessed = false;
                        if (this._preprocIdempotencyCheck[message.id]) {
                            logging_1.log.info("preprocessMessage: ".concat(message.id, " already being processed"));
                            // return message;
                            alreadyProcessed = true;
                        }
                        this._preprocIdempotencyCheck[message.id] = true;
                        fil = "";
                        try {
                            fil = typeof this._createConfig.preprocFilter == "function" ? this._createConfig.preprocFilter : typeof this._createConfig.preprocFilter == "string" ? eval(this._createConfig.preprocFilter || "undefined") : undefined;
                        }
                        catch (error) {
                            //do nothing
                        }
                        m = fil ? [message].filter(typeof fil == "function" ? fil : function (x) { return x; })[0] : message;
                        if (!(m && this._createConfig.messagePreprocessor)) return [3 /*break*/, 2];
                        if (!Array.isArray(this._createConfig.messagePreprocessor))
                            this._createConfig.messagePreprocessor = [this._createConfig.messagePreprocessor];
                        _m_1 = m;
                        return [4 /*yield*/, Promise.all(this._createConfig.messagePreprocessor.map(function (preproc, index) { return __awaiter(_this, void 0, void 0, function () {
                                var custom, start;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            custom = false;
                                            start = Date.now();
                                            if (!(typeof preproc === "function")) return [3 /*break*/, 2];
                                            custom = true;
                                            return [4 /*yield*/, preproc(_m_1, this, alreadyProcessed, source)];
                                        case 1:
                                            _m_1 = _a.sent();
                                            return [3 /*break*/, 4];
                                        case 2:
                                            if (!(typeof preproc === "string" && preProcessors_1.MessagePreprocessors[preproc])) return [3 /*break*/, 4];
                                            return [4 /*yield*/, preProcessors_1.MessagePreprocessors[preproc](_m_1, this, alreadyProcessed, source)];
                                        case 3:
                                            _m_1 = _a.sent();
                                            _a.label = 4;
                                        case 4:
                                            logging_1.log.info("Preproc ".concat(custom ? 'CUSTOM' : preproc, " ").concat(index, " ").concat(fil, " ").concat(message.id, " ").concat(m.id, " ").concat(Date.now() - start, "ms"));
                                            return [2 /*return*/, _m_1];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.sent();
                        preprocres = _m_1 || message;
                        delete this._preprocIdempotencyCheck[message.id];
                        return [2 /*return*/, preprocres];
                    case 2:
                        delete this._preprocIdempotencyCheck[message.id];
                        return [2 /*return*/, message];
                }
            });
        });
    };
    /**
     * Listens to incoming messages
     *
     * @event
     * @param fn callback
     * @param queueOptions PQueue options. Set to `{}` for default PQueue.
     * @fires [[Message]]
     */
    Client.prototype.onMessage = function (fn, queueOptions) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _fn;
            var _this = this;
            return __generator(this, function (_b) {
                _fn = function (message) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = fn;
                            return [4 /*yield*/, this.preprocessMessage(message, 'onMessage')];
                        case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                    }
                }); }); };
                return [2 /*return*/, this.registerListener(events_2.SimpleListener.Message, _fn, ((_a = this === null || this === void 0 ? void 0 : this._createConfig) === null || _a === void 0 ? void 0 : _a.pQueueDefault) || queueOptions)];
            });
        });
    };
    /**
    * Listens to all new messages
    *
    * @event
    * @param fn callback
    * @param queueOptions PQueue options. Set to `{}` for default PQueue.
    * @fires [[Message]]
    */
    Client.prototype.onAnyMessage = function (fn, queueOptions) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _fn;
            var _this = this;
            return __generator(this, function (_b) {
                _fn = function (message) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = fn;
                            return [4 /*yield*/, this.preprocessMessage(message, 'onAnyMessage')];
                        case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                    }
                }); }); };
                return [2 /*return*/, this.registerListener(events_2.SimpleListener.AnyMessage, _fn, ((_a = this === null || this === void 0 ? void 0 : this._createConfig) === null || _a === void 0 ? void 0 : _a.pQueueDefault) || queueOptions)];
            });
        });
    };
    /**
     *
     * Listens to when a message is deleted by a recipient or the host account
     * @event
     * @param fn callback
     * @fires [[Message]]
     */
    Client.prototype.onMessageDeleted = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.registerListener(events_2.SimpleListener.MessageDeleted, fn)];
            });
        });
    };
    /**
     * Listens to when a chat is deleted by the host account
     * @event
     * @param fn callback
     * @fires [[Chat]]
     */
    Client.prototype.onChatDeleted = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.registerListener(events_2.SimpleListener.ChatDeleted, fn)];
            });
        });
    };
    /**
     * Listens to button message responses
     * @event
     * @param fn callback
     * @fires [[Message]]
     */
    Client.prototype.onButton = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.registerListener(events_2.SimpleListener.Button, fn)];
            });
        });
    };
    /**
     * Listens to poll vote events
     * @event
     * @param fn callback
     * @fires [[PollData]]
     */
    Client.prototype.onPollVote = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.registerListener(events_2.SimpleListener.PollVote, fn)];
            });
        });
    };
    /**
     * Listens to broadcast messages
     * @event
     * @param fn callback
     * @fires [[Message]]
     */
    Client.prototype.onBroadcast = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.registerListener(events_2.SimpleListener.Broadcast, fn)];
            });
        });
    };
    /**
     * @deprecated
     *
     * Listens to battery changes
     *
     * :::caution
     *
     *  This will most likely not work with multi-device mode (the only remaining mode) since the session is no longer connected to the phone but directly to WA servers.
     *
     * :::
     *
     * @event
     * @param fn callback
     * @fires number
     */
    Client.prototype.onBattery = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.registerListener(events_2.SimpleListener.Battery, fn)];
            });
        });
    };
    /**
     * Listens to when host device is plugged/unplugged
     * @event
     *
     * @param fn callback
     * @fires boolean true if plugged, false if unplugged
     */
    Client.prototype.onPlugged = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.registerListener(events_2.SimpleListener.Plugged, fn)];
            });
        });
    };
    /**
     * {@license:restricted@}
     *
     * Listens to when a contact posts a new story.
     * @event
     *
     * @param fn callback
     * @fires e.g
     *
     * ```javascript
     * {
     * from: '123456789@c.us'
     * id: 'false_132234234234234@status.broadcast'
     * }
     * ```
     */
    Client.prototype.onStory = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.registerListener(events_2.SimpleListener.Story, fn)];
            });
        });
    };
    /**
     * Listens to changes in state
     *
     * @event
     * @fires STATE observable sream of states
     */
    Client.prototype.onStateChanged = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.registerListener(events_2.SimpleListener.StateChanged, fn)];
            });
        });
    };
    /**
     * Listens to new incoming calls
     * @event
     * @returns Observable stream of call request objects
     */
    Client.prototype.onIncomingCall = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.registerListener(events_2.SimpleListener.IncomingCall, fn)];
            });
        });
    };
    /**
     * Listens to changes on call state
     * @event
     * @returns Observable stream of call objects
     */
    Client.prototype.onCallState = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.registerListener(events_2.SimpleListener.CallState, fn)];
            });
        });
    };
    /**
     * Listens to label change events
     *
     * @event
     * @param fn callback
     * @fires [[Label]]
     */
    Client.prototype.onLabel = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.registerListener(events_2.SimpleListener.Label, fn)];
            });
        });
    };
    /**
     *{@license:insiders@}
     *
     * Listens to new orders. Only works on business accounts
     */
    Client.prototype.onOrder = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.registerListener(events_2.SimpleListener.Order, fn)];
            });
        });
    };
    /**
     *{@license:insiders@}
     *
     * Listens to new orders. Only works on business accounts
     */
    Client.prototype.onNewProduct = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.registerListener(events_2.SimpleListener.NewProduct, fn)];
            });
        });
    };
    /**
     * {@license:insiders@}
     *
     * Listens to reaction add and change events
     *
     * @event
     * @param fn callback
     * @fires [[ReactionEvent]]
     */
    Client.prototype.onReaction = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.registerListener(events_2.SimpleListener.Reaction, fn)];
            });
        });
    };
    /**
     * {@license:insiders@}
     *
     * Listens to chat state, including when a specific user is recording and typing within a group chat.
     *
     * @event
     *
     * Here is an example of the fired object:
     *
     * @fires
     * ```javascript
     * {
     * "chat": "00000000000-1111111111@g.us", //the chat in which this state is occuring
     * "user": "22222222222@c.us", //the user that is causing this state
     * "state": "composing, //can also be 'available', 'unavailable', 'recording' or 'composing'
     * }
     * ```
     */
    Client.prototype.onChatState = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.registerListener(events_2.SimpleListener.ChatState, fn)];
            });
        });
    };
    /**
     * Listens to messages acknowledgement Changes
     *
     * @param fn callback function that handles a [[Message]] as the first and only parameter.
     * @event
     * @returns `true` if the callback was registered
     */
    Client.prototype.onAck = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            var _fn;
            var _this = this;
            return __generator(this, function (_a) {
                _fn = function (message) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, fn(message)];
                }); }); };
                return [2 /*return*/, this.registerListener(events_2.SimpleListener.Ack, _fn)];
            });
        });
    };
    /**
     * Listens to add and remove events on Groups on a global level. It is memory efficient and doesn't require a specific group id to listen to.
     *
     * @event
     * @param fn callback function that handles a [[ParticipantChangedEventModel]] as the first and only parameter.
     * @returns `true` if the callback was registered
     */
    Client.prototype.onGlobalParticipantsChanged = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.registerListener(events_2.SimpleListener.GlobalParticipantsChanged, fn)];
            });
        });
    };
    /**
     * Listents to group approval requests. Emits a message object. Use it with `message.isGroupApprovalRequest()` to check if it is a group approval request.
     *
     * @event
     * @param fn callback function that handles a [[Message]] as the first and only parameter.
     * @returns `true` if the callback was registered
     */
    Client.prototype.onGroupApprovalRequest = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.registerListener(events_2.SimpleListener.GroupApprovalRequest, fn)];
            });
        });
    };
    /**
     * Listens to all group (gp2) events. This can be useful if you want to catch when a group title, subject or picture is changed.
     *
     * @event
     * @param fn callback function that handles a [[ParticipantChangedEventModel]] as the first and only parameter.
     * @returns `true` if the callback was registered
     */
    Client.prototype.onGroupChange = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.registerListener(events_2.SimpleListener.GroupChange, fn)];
            });
        });
    };
    /**
     * Fires callback with Chat object every time the host phone is added to a group.
     *
     * @event
     * @param fn callback function that handles a [[Chat]] (group chat) as the first and only parameter.
     * @returns `true` if the callback was registered
     */
    Client.prototype.onAddedToGroup = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.registerListener(events_2.SimpleListener.AddedToGroup, fn)];
            });
        });
    };
    /**
     * {@license:insiders@}
     *
     * Fires callback with Chat object every time the host phone is removed to a group.
     *
     * @event
     * @param fn callback function that handles a [[Chat]] (group chat) as the first and only parameter.
     * @returns `true` if the callback was registered
     */
    Client.prototype.onRemovedFromGroup = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.registerListener(events_2.SimpleListener.RemovedFromGroup, fn)];
            });
        });
    };
    /**
     * {@license:insiders@}
     *
     * Fires callback with the relevant chat id every time the user clicks on a chat. This will only work in headful mode.
     *
     * @event
     * @param fn callback function that handles a [[ChatId]] as the first and only parameter.
     * @returns `true` if the callback was registered
     */
    Client.prototype.onChatOpened = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.registerListener(events_2.SimpleListener.ChatOpened, fn)];
            });
        });
    };
    /**
     * {@license:insiders@}
     *
     * Fires callback with contact id when a new contact is added on the host phone.
     *
     * @event
     * @param fn callback function that handles a [[Chat]] as the first and only parameter.
     * @returns `true` if the callback was registered
     */
    Client.prototype.onContactAdded = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.registerListener(events_2.SimpleListener.ChatOpened, fn)];
            });
        });
    };
    // COMPLEX LISTENERS
    /**
     * @event
     * Listens to add and remove events on Groups. This can no longer determine who commited the action and only reports the following events add, remove, promote, demote
     * @param groupId group id: xxxxx-yyyy@c.us
     * @param fn callback
     * @returns Observable stream of participantChangedEvent
     */
    Client.prototype.onParticipantsChanged = function (groupId, fn, legacy) {
        if (legacy === void 0) { legacy = false; }
        return __awaiter(this, void 0, void 0, function () {
            var funcName;
            var _this = this;
            return __generator(this, function (_a) {
                funcName = "onParticipantsChanged_" + groupId.replace('_', "").replace('_', "");
                return [2 /*return*/, this._page.exposeFunction(funcName, function (participantChangedEvent) {
                        return fn(participantChangedEvent);
                    })
                        .then(function () { return _this.pup(function (_a) {
                        var groupId = _a.groupId, funcName = _a.funcName, legacy = _a.legacy;
                        //@ts-ignore
                        if (legacy)
                            return WAPI._onParticipantsChanged(groupId, window[funcName]);
                        else
                            return WAPI.onParticipantsChanged(groupId, window[funcName]);
                    }, { groupId: groupId, funcName: funcName, legacy: legacy }); })];
            });
        });
    };
    /**
     * @event Listens to live locations from a chat that already has valid live locations
     * @param chatId the chat from which you want to subscribes to live location updates
     * @param fn callback that takes in a LiveLocationChangedEvent
     * @returns boolean, if returns false then there were no valid live locations in the chat of chatId
     * @emits `<LiveLocationChangedEvent>` LiveLocationChangedEvent
     */
    Client.prototype.onLiveLocation = function (chatId, fn) {
        return __awaiter(this, void 0, void 0, function () {
            var funcName;
            var _this = this;
            return __generator(this, function (_a) {
                funcName = "onLiveLocation_" + chatId.replace('_', "").replace('_', "");
                return [2 /*return*/, this._page.exposeFunction(funcName, function (liveLocationChangedEvent) {
                        return fn(liveLocationChangedEvent);
                    })
                        .then(function () { return _this.pup(function (_a) {
                        var chatId = _a.chatId, funcName = _a.funcName;
                        //@ts-ignore
                        return WAPI.onLiveLocation(chatId, window[funcName]);
                    }, { chatId: chatId, funcName: funcName }); })];
            });
        });
    };
    /**
     * Use this simple command to test firing callback events.
     *
     * @param callbackToTest
     * @param testData
     * @returns `false` if the callback was not registered/does not exist
     */
    Client.prototype.testCallback = function (callbackToTest, testData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.pup(function (_a) {
                        var callbackToTest = _a.callbackToTest, testData = _a.testData;
                        return WAPI.testCallback(callbackToTest, testData);
                    }, { callbackToTest: callbackToTest, testData: testData })];
            });
        });
    };
    /**
     * Set presence to available or unavailable.
     * @param available if true it will set your presence to 'online', false will set to unavailable (i.e no 'online' on recipients' phone);
     */
    Client.prototype.setPresence = function (available) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (available) { return WAPI.setPresence(available); }, available)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * set your about me
     * @param newStatus String new profile status
     */
    Client.prototype.setMyStatus = function (newStatus) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var newStatus = _a.newStatus;
                            return WAPI.setMyStatus(newStatus);
                        }, { newStatus: newStatus })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * {@license:insiders@}
     *
     * Adds label from chat, message or contact. Only for business accounts.
     * @param label: The desired text of the new label. id will be something simple like anhy nnumber from 1-10, name is the label of the label if that makes sense.
     * @returns `false` if something went wrong, or the id (usually a number as a string) of the new label (for example `"58"`)
     */
    Client.prototype.createLabel = function (label) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var label = _a.label;
                            return WAPI.createLabel(label);
                        }, { label: label })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Adds label from chat, message or contact. Only for business accounts.
     * @param label: either the id or the name of the label. id will be something simple like anhy nnumber from 1-10, name is the label of the label if that makes sense.
     * @param id The Chat, message or contact id to which you want to add a label
     */
    Client.prototype.addLabel = function (label, chatId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var label = _a.label, chatId = _a.chatId;
                            return WAPI.addOrRemoveLabels(label, chatId, 'add');
                        }, { label: label, chatId: chatId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Returns all labels and the corresponding tagged items.
     */
    Client.prototype.getAllLabels = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function () { return WAPI.getAllLabels(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Removes label from chat, message or contact. Only for business accounts.
     * @param label: either the id or the name of the label. id will be something simple like anhy nnumber from 1-10, name is the label of the label if that makes sense.
     * @param id The Chat, message or contact id to which you want to add a label
     */
    Client.prototype.removeLabel = function (label, chatId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var label = _a.label, chatId = _a.chatId;
                            return WAPI.addOrRemoveLabels(label, chatId, 'remove');
                        }, { label: label, chatId: chatId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get an array of chats that match the label parameter. For example, if you want to get an array of chat objects that have the label "New customer".
     *
     * This method is case insenstive and only works on business host accounts.
     *
     * @label The label name
     */
    Client.prototype.getChatsByLabel = function (label) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var label = _a.label;
                            return WAPI.getChatsByLabel(label);
                        }, { label: label })];
                    case 1:
                        res = _a.sent();
                        if (typeof res == 'string')
                            new errors_1.CustomError(errors_1.ERROR_NAME.INVALID_LABEL, res);
                        return [2 /*return*/, res];
                }
            });
        });
    };
    /**
     * Send VCARD
     *
     * @param {string} chatId '000000000000@c.us'
     * @param {string} vcard vcard as a string, you can send multiple contacts vcard also.
     * @param {string} contactName The display name for the contact. Ignored on multiple vcards
     * @param {string} contactNumber If supplied, this will be injected into the vcard (VERSION 3 ONLY FROM VCARDJS) with the WA id to make it show up with the correct buttons on WA. The format of this param should be including country code, without any other formating. e.g:
     * `4477777777777`
     *  Ignored on multiple vcards
     */
    Client.prototype.sendVCard = function (chatId, vcard, contactName, contactNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var chatId = _a.chatId, vcard = _a.vcard, contactName = _a.contactName, contactNumber = _a.contactNumber;
                            return WAPI.sendVCard(chatId, vcard, contactName, contactNumber);
                        }, { chatId: chatId, vcard: vcard, contactName: contactName, contactNumber: contactNumber })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Set your profile name
     *
     * Please note, this does not work on business accounts!
     *
     * @param newName String new name to set for your profile
     */
    Client.prototype.setMyName = function (newName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var newName = _a.newName;
                            return WAPI.setMyName(newName);
                        }, { newName: newName })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Sets the chat state
     * @param {ChatState|0|1|2} chatState The state you want to set for the chat. Can be TYPING (0), RECRDING (1) or PAUSED (2).
     * @param {String} chatId
     */
    Client.prototype.setChatState = function (chatState, chatId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var chatState = _a.chatState, chatId = _a.chatId;
                            return WAPI.setChatState(chatState, chatId);
                        }, 
                        //@ts-ignore
                        { chatState: chatState, chatId: chatId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Returns the connection state
     */
    Client.prototype.getConnectionState = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._page.evaluate(function () { return WAPI.getState(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retreive an array of messages that are not yet sent to the recipient via the host account device (i.e no ticks)
     */
    Client.prototype.getUnsentMessages = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._page.evaluate(function () { return WAPI.getUnsentMessages(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Forces the session to update the connection state.
     * @param killBeforeAttemptingToReconnect Setting this to true will force the session to drop the current socket connection before attempting to reconnect. This is useful if you want to force the session to reconnect immediately.
     * @returns updated connection state
     */
    Client.prototype.forceUpdateConnectionState = function (killBeforeReconnect) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._page.evaluate(function (killBeforeReconnect) { return WAPI.forceUpdateConnectionState(killBeforeReconnect); }, killBeforeReconnect)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Returns a list of contact with whom the host number has an existing chat who are also not contacts.
     */
    Client.prototype.getChatWithNonContacts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._page.evaluate(function () { return WAPI.getChatWithNonContacts(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Shuts down the page and browser
     * @returns true
     */
    Client.prototype.kill = function (reason) {
        var _a, _b;
        if (reason === void 0) { reason = "MANUALLY_KILLED"; }
        return __awaiter(this, void 0, void 0, function () {
            var browser, pid, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this._currentlyBeingKilled)
                            return [2 /*return*/];
                        this._currentlyBeingKilled = true;
                        console.log("Killing client. Shutting Down: ".concat(reason));
                        logging_1.log.info("Killing client. Shutting Down: ".concat(reason));
                        return [4 /*yield*/, ((_a = this === null || this === void 0 ? void 0 : this._page) === null || _a === void 0 ? void 0 : _a.browser())];
                    case 1:
                        browser = _c.sent();
                        pid = (browser === null || browser === void 0 ? void 0 : browser.process()) ? (_b = browser === null || browser === void 0 ? void 0 : browser.process()) === null || _b === void 0 ? void 0 : _b.pid : null;
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, (0, browser_1.kill)(this._page, browser, false, pid, reason)];
                    case 3:
                        _c.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _c.sent();
                        return [3 /*break*/, 5];
                    case 5:
                        this._currentlyBeingKilled = false;
                        return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * This is a convinient method to click the `Use Here` button in the WA web session.
     *
     * Use this when [[STATE]] is `CONFLICT`. You can read more about managing state here:
     *
     * [[Detecting Logouts]]
     */
    Client.prototype.forceRefocus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var useHere;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._page.evaluate(function () { return WAPI.getUseHereString(); })];
                    case 1:
                        useHere = _a.sent();
                        return [4 /*yield*/, this._page.waitForFunction("[...document.querySelectorAll(\"div[role=button\")].find(e=>{return e.innerHTML.toLowerCase().includes(\"".concat(useHere.toLowerCase(), "\")})"), { timeout: 0 })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this._page.evaluate("[...document.querySelectorAll(\"div[role=button\")].find(e=>{return e.innerHTML.toLowerCase().includes(\"".concat(useHere.toLowerCase(), "\")}).click()"))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * Check if the "Phone not Cconnected" message is showing in the browser. If it is showing, then this will return `true`.
     *
     * @returns `boolean`
     */
    Client.prototype.isPhoneDisconnected = function () {
        return __awaiter(this, void 0, void 0, function () {
            var phoneNotConnected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._page.evaluate(function () { return WAPI.getLocaledString('active Internet connection'); })];
                    case 1:
                        phoneNotConnected = _a.sent();
                        return [4 /*yield*/, this.pup("!![...document.querySelectorAll(\"div\")].find(e=>{return e.innerHTML.toLowerCase().includes(\"".concat(phoneNotConnected.toLowerCase(), "\")})"))];
                    case 2: 
                    //@ts-ignore
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Runs a health check to help you determine if/when is an appropiate time to restart/refresh the session.
     */
    Client.prototype.healthCheck = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._page.evaluate(function () { return WAPI.healthCheck(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get the stats of the current process and the corresponding browser process.
     */
    Client.prototype.getProcessStats = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, pid_utils_1.pidTreeUsage)([process.pid, this._page.browser().process().pid])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.getIp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._page.evaluate(function () { return __awaiter(_this, void 0, void 0, function () {
                            var response, data, error_3;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 3, , 4]);
                                        return [4 /*yield*/, fetch('https://api.ipify.org?format=json')];
                                    case 1:
                                        response = _a.sent();
                                        return [4 /*yield*/, response.json()];
                                    case 2:
                                        data = _a.sent();
                                        return [2 /*return*/, data.ip];
                                    case 3:
                                        error_3 = _a.sent();
                                        return [2 /*return*/, error_3.message];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * A list of participants in the chat who have their live location on. If the chat does not exist, or the chat does not have any contacts actively sharing their live locations, it will return false. If it's a chat with a single contact, there will be only 1 value in the array if the contact has their livelocation on.
     * Please note. This should only be called once every 30 or so seconds. This forces the phone to grab the latest live location data for the number. This can be used in conjunction with onLiveLocation (this will trigger onLiveLocation).
     * @param chatId string Id of the chat you want to force the phone to get the livelocation data for.
     * @returns `Promise<LiveLocationChangedEvent []>` | boolean
     */
    Client.prototype.forceUpdateLiveLocation = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var chatId = _a.chatId;
                            return WAPI.forceUpdateLiveLocation(chatId);
                        }, { chatId: chatId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     *
     * @deprecated
     *
     * :::danger
     *
     * Buttons are broken for the foreseeable future. Please DO NOT get a license solely for access to buttons. They are no longer reliable due to recent changes at WA.
     *
     * :::
     *
     * Test the button commands on MD accounts with an insiders key. This is a temporary feature to help fix issue #2658
     */
    Client.prototype.testButtons = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var chatId = _a.chatId;
                            return WAPI.testButtons(chatId);
                        }, { chatId: chatId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.link = function (params) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _p, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _p = [(_a = this._createConfig) === null || _a === void 0 ? void 0 : _a.linkParams, params].filter(function (x) { return x; }).join('&');
                        _b = "https://get.openwa.dev/l/".concat;
                        return [4 /*yield*/, this.getHostNumber()];
                    case 1: return [2 /*return*/, _b.apply("https://get.openwa.dev/l/", [_c.sent()]).concat(_p ? "?".concat(_p) : '')];
                }
            });
        });
    };
    /**
     * Generate a license link
     */
    Client.prototype.getLicenseLink = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.link(params)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     *
     * {@license:restricted@}
     *
     * Sends a text message to given chat
     *
     * A license is **NOT** required to send messages with existing chats/contacts. A license is only required for starting conversations with new numbers.
     *
     * @param to chat id: `xxxxx@c.us`
     * @param content text message
     */
    Client.prototype.sendText = function (to, content) {
        return __awaiter(this, void 0, void 0, function () {
            var err, res, msg, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!content)
                            content = '';
                        if (typeof content !== 'string')
                            content = String(content);
                        err = [
                            'Not able to send message to broadcast',
                            'Not a contact',
                            'Error: Number not linked to WhatsApp Account',
                            'ERROR: Please make sure you have at least one chat'
                        ];
                        content = (content === null || content === void 0 ? void 0 : content.trim()) || content;
                        return [4 /*yield*/, this.pup(function (_a) {
                                var to = _a.to, content = _a.content;
                                WAPI.sendSeen(to);
                                return WAPI.sendMessage(to, content);
                            }, { to: to, content: content })];
                    case 1:
                        res = _c.sent();
                        if (!err.includes(res)) return [3 /*break*/, 4];
                        msg = res;
                        if (!(res == err[1])) return [3 /*break*/, 3];
                        _b = (_a = "ERROR: ".concat(res, ". Unlock this feature and support open-wa by getting a license: ")).concat;
                        return [4 /*yield*/, this.link()];
                    case 2:
                        msg = _b.apply(_a, [_c.sent()]);
                        _c.label = 3;
                    case 3:
                        console.error("\n".concat(msg, "\n"));
                        return [2 /*return*/, this.responseWrap(msg)];
                    case 4: return [2 /*return*/, (err.includes(res) ? false : res)];
                }
            });
        });
    };
    /**
     * Sends a text message to given chat that includes mentions.
     * In order to use this method correctly you will need to send the text like this:
     * "@4474747474747 how are you?"
     * Basically, add a @ symbol before the number of the contact you want to mention.
     *
     * @param to chat id: `xxxxx@c.us`
     * @param content text message
     * @param hideTags Removes all tags within the message
     * @param mentions You can optionally add an array of contact IDs to tag only specific people
     */
    Client.prototype.sendTextWithMentions = function (to, content, hideTags, mentions) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //remove all @c.us from the content
                        content = content.replace(/@c.us/, "");
                        return [4 /*yield*/, this.pup(function (_a) {
                                var to = _a.to, content = _a.content, hideTags = _a.hideTags, mentions = _a.mentions;
                                WAPI.sendSeen(to);
                                return WAPI.sendMessageWithMentions(to, content, hideTags, mentions);
                            }, { to: to, content: content, hideTags: hideTags, mentions: mentions })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * NOTE: This is experimental, most accounts do not have access to this feature in their apps.
     *
     * Edit an existing message
     *
     * @param messageId The message ID to edit
     * @param text The new text content
     * @returns
     */
    Client.prototype.editMessage = function (messageId, text) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var messageId = _a.messageId, text = _a.text;
                            return WAPI.editMessage(messageId, text);
                        }, { messageId: messageId, text: text })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * [UNTESTED - REQUIRES FEEDBACK]
     * Sends a payment request message to given chat
     *
     * @param to chat id: `xxxxx@c.us`
     * @param amount number the amount to request in 1000 format (e.g £10 => 10000)
     * @param currency string The 3 letter currency code
     * @param message string optional message to send with the payment request
     */
    Client.prototype.sendPaymentRequest = function (to, amount, currency, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var to = _a.to, amount = _a.amount, currency = _a.currency, message = _a.message;
                            return WAPI.sendPaymentRequest(to, amount, currency, message);
                        }, { to: to, amount: amount, currency: currency, message: message })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     *
     * @deprecated
     *
     * :::danger
     *
     * WA BIZ accounts CANNOT send buttons. This is a WA limitation. DO NOT get a license solely for access to buttons on wa business accounts.
     * THIS IS NOT WORKING FOR GROUPS YET.
     *
     * BUTTONS ARE DEPRECATED FOR NOW. DO NOT GET A LICENSE TO USE BUTTONS.
     *
     * :::
     *
     * Send generic quick reply buttons. This is an insiders feature for MD accounts.
     *
     * @param  {ChatId} to chat id
     * @param  {string | LocationButtonBody} body The body of the buttons message
     * @param  {Button[]} buttons Array of buttons - limit is 3!
     * @param  {string} title The title/header of the buttons message
     * @param  {string} footer The footer of the buttons message
     */
    Client.prototype.sendButtons = function (to, body, buttons, title, footer) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var to = _a.to, body = _a.body, buttons = _a.buttons, title = _a.title, footer = _a.footer;
                            return WAPI.sendButtons(to, body, buttons, title, footer);
                        }, { to: to, body: body, buttons: buttons, title: title, footer: footer })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @deprecated
     *
     * :::danger
     *
     * Template messages (URL & CALL buttons) are broken for the foreseeable future. Please DO NOT get a license solely for access to URL or CALL buttons. They are no longer reliable due to recent changes at WA.
     * WA BIZ accounts CANNOT send buttons. This is a WA limitation. DO NOT get a license solely for access to buttons on wa business accounts.
     *
     * THIS IS NOT WORKING FOR GROUPS YET.
     *
     * ADVANCED ARE DEPRECATED FOR NOW. DO NOT GET A LICENSE TO USE BUTTONS.
     *
     * :::
     *
     *
     * Send advanced buttons with media body. This is an insiders feature for MD accounts.
     *
     * Body can be location, image, video or document. Buttons can be quick reply, url or call buttons.
     *
     * @param  {ChatId} to chat id
     * @param  {string | LocationButtonBody} body The body of the buttons message
     * @param  {AdvancedButton[]} buttons Array of buttons - limit is 3!
     * @param  {string} title The title/header of the buttons message
     * @param  {string} footer The footer of the buttons message
     * @param  {string} filename Required if body is a file!!
     */
    Client.prototype.sendAdvancedButtons = function (to, body, buttons, text, footer, filename) {
        return __awaiter(this, void 0, void 0, function () {
            var relativePath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof body !== "string" && body.lat)) return [3 /*break*/, 1];
                        //this is a location body
                        // eslint-disable-next-line no-self-assign
                        body = body;
                        return [3 /*break*/, 8];
                    case 1:
                        if (!(typeof body == "string" && !(0, tools_1.isDataURL)(body) && !(0, tools_1.isBase64)(body) && !body.includes("data:"))) return [3 /*break*/, 7];
                        relativePath = path.join(path.resolve(process.cwd(), body || ''));
                        if (!(typeof body == "string" && fs.existsSync(body) || fs.existsSync(relativePath))) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, datauri_1["default"])(fs.existsSync(body) ? body : relativePath)];
                    case 2:
                        body = _a.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        if (!(typeof body == "string" && (0, is_url_superb_1["default"])(body))) return [3 /*break*/, 5];
                        return [4 /*yield*/, (0, tools_1.getDUrl)(body)];
                    case 4:
                        body = _a.sent();
                        return [3 /*break*/, 6];
                    case 5: throw new errors_1.CustomError(errors_1.ERROR_NAME.FILE_NOT_FOUND, "Cannot find file. Make sure the file reference is relative, a valid URL or a valid DataURL: ".concat(body.slice(0, 25)));
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        if (typeof body == "string" && (body.includes("data:") && body.includes("undefined") || body.includes("application/octet-stream") && filename && mime_types_1["default"].lookup(filename))) {
                            body = "data:".concat(mime_types_1["default"].lookup(filename), ";base64,").concat(body.split(',')[1]);
                        }
                        _a.label = 8;
                    case 8: return [4 /*yield*/, this.pup(function (_a) {
                            var to = _a.to, body = _a.body, buttons = _a.buttons, text = _a.text, footer = _a.footer, filename = _a.filename;
                            return WAPI.sendAdvancedButtons(to, body, buttons, text, footer, filename);
                        }, { to: to, body: body, buttons: buttons, text: text, footer: footer, filename: filename })];
                    case 9: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Send a banner image
     *
     * Note this is a bit of hack on top of a location message. During testing it is shown to not work on iPhones.
     *
     * @param  {ChatId} to
     * @param  {Base64} base64 base64 encoded jpeg
     */
    Client.prototype.sendBanner = function (to, base64) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var to = _a.to, base64 = _a.base64;
                            return WAPI.sendBanner(to, base64);
                        }, { to: to, base64: base64 })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     *
     * @deprecated
     *
     * :::danger
     *
     * It is not currently possible to send a listmessage to a group chat. This is a WA limitation.
     * Please DO NOT get a license solely for access to list messages in group chats.
     *
     * LIST MESSAGES ARE DEPRECATED TILL FURTHER NOTICE
     *
     * :::
     *
     * Send a list message. This will not work when being sent from business accounts!
     *
     * @param  {ChatId} to
     * @param  {Section[]} sections The Sections of rows for the list message
     * @param  {string} title The title of the list message
     * @param  {string} description The description of the list message
     * @param  {string} actionText The action text of the list message
     */
    Client.prototype.sendListMessage = function (to, sections, title, description, actionText) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var to = _a.to, sections = _a.sections, title = _a.title, description = _a.description, actionText = _a.actionText;
                            return WAPI.sendListMessage(to, sections, title, description, actionText);
                        }, { to: to, sections: sections, title: title, description: description, actionText: actionText })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Sends a reply to given chat that includes mentions, replying to the provided replyMessageId.
     * In order to use this method correctly you will need to send the text like this:
     * "@4474747474747 how are you?"
     * Basically, add a @ symbol before the number of the contact you want to mention.
     * @param to chat id: `xxxxx@c.us`
     * @param content text message
     * @param replyMessageId id of message to reply to
     * @param hideTags Removes all tags within the message
     * @param mentions You can optionally add an array of contact IDs to tag only specific people
     */
    Client.prototype.sendReplyWithMentions = function (to, content, replyMessageId, hideTags, mentions) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //remove all @c.us from the content
                        content = content.replace(/@c.us/, "");
                        return [4 /*yield*/, this.pup(function (_a) {
                                var to = _a.to, content = _a.content, replyMessageId = _a.replyMessageId, hideTags = _a.hideTags, mentions = _a.mentions;
                                WAPI.sendSeen(to);
                                return WAPI.sendReplyWithMentions(to, content, replyMessageId, hideTags, mentions);
                            }, { to: to, content: content, replyMessageId: replyMessageId, hideTags: hideTags, mentions: mentions })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * {@license:insiders@}
     *
     * Tags everyone in the group with a message
     *
     * @param groupId group chat id: `xxxxx@g.us`
     * @param content text message to add under all of the tags
     * @param hideTags Removes all tags within the message
     * @param formatting The formatting of the tags. Use @mention to indicate the actual tag. @default `@mention `
     * @param messageBeforeTags set to `true` to show the message before all of the tags
     * @returns `Promise<MessageId>`
     */
    Client.prototype.tagEveryone = function (groupId, content, hideTags, formatting, messageBeforeTags) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var groupId = _a.groupId, content = _a.content, hideTags = _a.hideTags, formatting = _a.formatting, messageBeforeTags = _a.messageBeforeTags;
                            return WAPI.tagEveryone(groupId, content, hideTags, formatting, messageBeforeTags);
                        }, { groupId: groupId, content: content, hideTags: hideTags, formatting: formatting, messageBeforeTags: messageBeforeTags })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Sends a link to a chat that includes a link preview.
     * @param thumb The base 64 data of the image you want to use as the thunbnail. This should be no more than 200x200px. Note: Dont need data url on this param
     * @param url The link you want to send
     * @param title The title of the link
     * @param description The long description of the link preview
     * @param text The text you want to inslude in the message section. THIS HAS TO INCLUDE THE URL otherwise the url will be prepended to the text automatically.
     * @param chatId The chat you want to send this message to.
     * @param quotedMsgId [INSIDERS] Send this link preview message in response to a given quoted message
     * @param customSize [INSIDERS] Anchor the size of the thumbnail
     */
    Client.prototype.sendMessageWithThumb = function (thumb, url, title, description, text, chatId, quotedMsgId, customSize) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var thumb = _a.thumb, url = _a.url, title = _a.title, description = _a.description, text = _a.text, chatId = _a.chatId, quotedMsgId = _a.quotedMsgId, customSize = _a.customSize;
                            WAPI.sendMessageWithThumb(thumb, url, title, description, text, chatId, quotedMsgId, customSize);
                        }, {
                            thumb: thumb,
                            url: url,
                            title: title,
                            description: description,
                            text: text,
                            chatId: chatId,
                            quotedMsgId: quotedMsgId,
                            customSize: customSize
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Note: `address` and `url` are parameters available to insiders only.
     *
     * Sends a location message to given chat
     * @param to chat id: `xxxxx@c.us`
     * @param lat latitude: '51.5074'
     * @param lng longitude: '0.1278'
     * @param loc location text: 'LONDON!'
     * @param address address text: '1 Regents Park!'
     * @param url address text link: 'https://example.com'
     */
    Client.prototype.sendLocation = function (to, lat, lng, loc, address, url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var to = _a.to, lat = _a.lat, lng = _a.lng, loc = _a.loc, address = _a.address, url = _a.url;
                            return WAPI.sendLocation(to, lat, lng, loc, address, url);
                        }, { to: to, lat: lat, lng: lng, loc: loc, address: address, url: url })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get the generated user agent, this is so you can send it to the decryption module.
     * @returns String useragent of wa-web session
     */
    Client.prototype.getGeneratedUserAgent = function (userA) {
        return __awaiter(this, void 0, void 0, function () {
            var ua;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ua = userA || puppeteer_config_1.useragent;
                        return [4 /*yield*/, this.pup(function (_a) {
                                var ua = _a.ua;
                                return WAPI.getGeneratedUserAgent(ua);
                            }, { ua: ua })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Decrypts a media message.
     * @param message This can be the serialized [[MessageId]] or the whole [[Message]] object. It is advised to just use the serialized message ID.
     * @returns `Promise<[[DataURL]]>`
     */
    Client.prototype.decryptMedia = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var m, _a, _b, _c, mediaData;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!(typeof message === "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getMessageById(message)];
                    case 1:
                        m = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        m = message;
                        _d.label = 3;
                    case 3:
                        if (!m.mimetype)
                            throw new errors_1.CustomError(errors_1.ERROR_NAME.NOT_MEDIA, "Not a media message");
                        if (!(m.type == "sticker")) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getStickerDecryptable(m.id)];
                    case 4:
                        m = _d.sent();
                        _d.label = 5;
                    case 5:
                        if (!(m === false)) return [3 /*break*/, 7];
                        _b = (_a = console).error;
                        _c = "\nUnable to decrypt sticker. Unlock this feature and support open-wa by getting a license: ".concat;
                        return [4 /*yield*/, this.link("v=i")];
                    case 6:
                        _b.apply(_a, [_c.apply("\nUnable to decrypt sticker. Unlock this feature and support open-wa by getting a license: ", [_d.sent(), "\n"])]);
                        throw new errors_1.CustomError(errors_1.ERROR_NAME.STICKER_NOT_DECRYPTED, 'Sticker not decrypted');
                    case 7: return [4 /*yield*/, (0, wa_decrypt_1.decryptMedia)(m)];
                    case 8:
                        mediaData = _d.sent();
                        return [2 /*return*/, "data:".concat(m.mimetype, ";base64,").concat(mediaData.toString('base64'))];
                }
            });
        });
    };
    /**
     * Sends a image to given chat, with caption or not, using base64
     * @param to chat id `xxxxx@c.us`
     * @param file DataURL data:image/xxx;base64,xxx or the RELATIVE (should start with `./` or `../`) path of the file you want to send. With the latest version, you can now set this to a normal URL (for example [GET] `https://file-examples-com.github.io/uploads/2017/10/file_example_JPG_2500kB.jpg`).
     * @param filename string xxxxx
     * @param caption string xxxxx
     * @param waitForKey boolean default: false set this to true if you want to wait for the id of the message. By default this is set to false as it will take a few seconds to retrieve to the key of the message and this waiting may not be desirable for the majority of users.
     * @param hideTags boolean default: false [INSIDERS] set this to try silent tag someone in the caption
     * @returns `Promise <boolean | string>` This will either return true or the id of the message. It will return true after 10 seconds even if waitForId is true
     */
    Client.prototype.sendImage = function (to, file, filename, caption, quotedMsgId, waitForId, ptt, withoutPreview, hideTags, viewOnce, requestConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var err, _a, _b, inputElementId, inputElement, fileAsLocalTemp, res;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        err = [
                            'Not able to send message to broadcast',
                            'Not a contact',
                            'Error: Number not linked to WhatsApp Account',
                            'ERROR: Please make sure you have at least one chat'
                        ];
                        return [4 /*yield*/, Promise.all([
                                (function () { return __awaiter(_this, void 0, void 0, function () {
                                    var inputElementId, inputElement;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this._page.evaluate(function () { return WAPI.createTemporaryFileInput(); })];
                                            case 1:
                                                inputElementId = _a.sent();
                                                return [4 /*yield*/, this._page.$("#".concat(inputElementId))];
                                            case 2:
                                                inputElement = _a.sent();
                                                return [2 /*return*/, [inputElementId, inputElement]];
                                        }
                                    });
                                }); })(),
                                (0, tools_1.assertFile)(file, filename, tools_1.FileOutputTypes.TEMP_FILE_PATH, requestConfig || {})
                            ])
                            //@ts-ignore
                        ];
                    case 1:
                        _a = _c.sent(), _b = _a[0], inputElementId = _b[0], inputElement = _b[1], fileAsLocalTemp = _a[1];
                        //@ts-ignore
                        return [4 /*yield*/, inputElement.uploadFile(fileAsLocalTemp)];
                    case 2:
                        //@ts-ignore
                        _c.sent();
                        file = inputElementId;
                        return [4 /*yield*/, this.pup(function (_a) {
                                var to = _a.to, file = _a.file, filename = _a.filename, caption = _a.caption, quotedMsgId = _a.quotedMsgId, waitForId = _a.waitForId, ptt = _a.ptt, withoutPreview = _a.withoutPreview, hideTags = _a.hideTags, viewOnce = _a.viewOnce;
                                return WAPI.sendImage(file, to, filename, caption, quotedMsgId, waitForId, ptt, withoutPreview, hideTags, viewOnce);
                            }, { to: to, file: file, filename: filename, caption: caption, quotedMsgId: quotedMsgId, waitForId: waitForId, ptt: ptt, withoutPreview: withoutPreview, hideTags: hideTags, viewOnce: viewOnce })];
                    case 3:
                        res = _c.sent();
                        if (!fileAsLocalTemp) return [3 /*break*/, 5];
                        return [4 /*yield*/, (0, tools_1.rmFileAsync)(fileAsLocalTemp)];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5:
                        if (err.includes(res))
                            console.error(res);
                        return [2 /*return*/, (err.includes(res) ? false : res)];
                }
            });
        });
    };
    /**
     * Automatically sends a youtube link with the auto generated link preview. You can also add a custom message.
     * @param chatId
     * @param url string A youtube link.
     * @param text string Custom text as body of the message, this needs to include the link or it will be appended after the link.
     * @param thumbnail string Base64 of the jpeg/png which will be used to override the automatically generated thumbnail.
     * @param quotedMsgId [INSIDERS] Send this link preview message in response to a given quoted message
     * @param customSize [INSIDERS] Anchor the size of the thumbnail
     */
    Client.prototype.sendYoutubeLink = function (to, url, text, thumbnail, quotedMsgId, customSize) {
        if (text === void 0) { text = ''; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.sendLinkWithAutoPreview(to, url, text, thumbnail, quotedMsgId, customSize)];
            });
        });
    };
    /**
     * Automatically sends a link with the auto generated link preview. You can also add a custom message.
     * @param chatId
     * @param url string A link.
     * @param text string Custom text as body of the message, this needs to include the link or it will be appended after the link.
     * @param thumbnail Base64 of the jpeg/png which will be used to override the automatically generated thumbnail.
     * @param quotedMsgId [INSIDERS] Send this link preview message in response to a given quoted message
     * @param customSize [INSIDERS] Anchor the size of the thumbnail
     */
    Client.prototype.sendLinkWithAutoPreview = function (to, url, text, thumbnail, quotedMsgId, customSize) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var linkData, thumb, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, axios_1["default"].get("".concat(((_a = this._createConfig) === null || _a === void 0 ? void 0 : _a.linkParser) || "https://link.openwa.cloud/api", "?url=").concat(url))];
                    case 1:
                        linkData = (_b.sent()).data;
                        logging_1.log.info("Got link data");
                        if (!!thumbnail) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, tools_1.getDUrl)(linkData.image)];
                    case 2:
                        thumb = _b.sent();
                        _b.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_4 = _b.sent();
                        console.error(error_4);
                        return [3 /*break*/, 5];
                    case 5:
                        if (!(linkData && (thumbnail || thumb))) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.sendMessageWithThumb(thumbnail || thumb, url, linkData.title, linkData.description, text, to, quotedMsgId, customSize)];
                    case 6: return [2 /*return*/, _b.sent()];
                    case 7: return [4 /*yield*/, this.pup(function (_a) {
                            var to = _a.to, url = _a.url, text = _a.text, thumbnail = _a.thumbnail;
                            return WAPI.sendLinkWithAutoPreview(to, url, text, thumbnail);
                        }, { to: to, url: url, text: text, thumbnail: thumbnail })];
                    case 8: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    /**
     *
     * Sends a reply to a given message. Please note, you need to have at least sent one normal message to a contact in order for this to work properly.
     *
     * @param to string chatid
     * @param content string reply text
     * @param quotedMsgId string the msg id to reply to.
     * @param sendSeen boolean If set to true, the chat will 'blue tick' all messages before sending the reply
     * @returns `Promise<MessageId | false>` false if didn't work, otherwise returns message id.
     */
    Client.prototype.reply = function (to, content, quotedMsgId, sendSeen) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!sendSeen) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.sendSeen(to)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.pup(function (_a) {
                            var to = _a.to, content = _a.content, quotedMsgId = _a.quotedMsgId;
                            return WAPI.reply(to, content, quotedMsgId);
                        }, { to: to, content: content, quotedMsgId: quotedMsgId })];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * {@license:insiders@}
     *
     * Check if a recipient has read receipts on.
     *
     * This will only work if you have chats sent back and forth between you and the contact 1-1.
     *
     * @param contactId The Id of the contact with which you have an existing conversation with messages already.
     * @returns `Promise<string | boolean>` true or false or a string with an explaintaion of why it wasn't able to determine the read receipts.
     *
     */
    Client.prototype.checkReadReceipts = function (contactId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var contactId = _a.contactId;
                            return WAPI.checkReadReceipts(contactId);
                        }, { contactId: contactId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Sends a file to given chat, with caption or not, using base64. This is exactly the same as sendImage
     *
     * Please note that any file that resolves to mime-type `octet-stream` will, by default, resolve to an MP4 file.
     *
     * If you want a specific filetype, then explcitly select the correct mime-type from https://www.iana.org/assignments/media-types/media-types.xhtml
     *
     *
     * @param to chat id `xxxxx@c.us`
     * @param file DataURL data:image/xxx;base64,xxx or the RELATIVE (should start with `./` or `../`) path of the file you want to send. With the latest version, you can now set this to a normal URL (for example [GET] `https://file-examples-com.github.io/uploads/2017/10/file_example_JPG_2500kB.jpg`).
     * @param filename string xxxxx
     * @param caption string xxxxx With an [INSIDERS LICENSE-KEY](https://gum.co/open-wa?tier=Insiders%20Program) you can also tag people in groups with `@[number]`. For example if you want to mention the user with the number `44771234567`, just add `@44771234567` in the caption.
     * @param quotedMsgId string true_0000000000@c.us_JHB2HB23HJ4B234HJB to send as a reply to a message
     * @param waitForId boolean default: false set this to true if you want to wait for the id of the message. By default this is set to false as it will take a few seconds to retrieve to the key of the message and this waiting may not be desirable for the majority of users.
     * @param ptt boolean default: false set this to true if you want to send the file as a push to talk file.
     * @param withoutPreview boolean default: false set this to true if you want to send the file without a preview (i.e as a file). This is useful for preventing auto downloads on recipient devices.
     * @param hideTags boolean default: false [INSIDERS] set this to try silent tag someone in the caption
     * @returns `Promise <boolean | MessageId>` This will either return true or the id of the message. It will return true after 10 seconds even if waitForId is true
     */
    Client.prototype.sendFile = function (to, file, filename, caption, quotedMsgId, waitForId, ptt, withoutPreview, hideTags, viewOnce, requestConfig) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.sendImage(to, file, filename, caption, quotedMsgId, waitForId, ptt, withoutPreview, hideTags, viewOnce, requestConfig)];
            });
        });
    };
    /**
     * {@license:insiders@}
     *
     * Checks whether or not the group id provided is known to be unsafe by the contributors of the library.
     * @param groupChatId The group chat you want to deteremine is unsafe
     * @returns `Promise <boolean | string>` This will either return a boolean indiciating whether this group chat id is considered unsafe or an error message as a string
     */
    Client.prototype.isGroupIdUnsafe = function (groupChatId) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].post('https://openwa.dev/groupId-check', {
                            groupChatId: groupChatId,
                            sessionInfo: this.getSessionInfo(),
                            config: this.getConfig()
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        if (data.unsafe)
                            console.warn("".concat(groupChatId, " is marked as unsafe"));
                        return [2 /*return*/, data.err || data.unsafe];
                }
            });
        });
    };
    /**
     * Attempts to send a file as a voice note. Useful if you want to send an mp3 file.
     * @param to chat id `xxxxx@c.us`
     * @param file base64 data:image/xxx;base64,xxx or the path of the file you want to send.
     * @param quotedMsgId string true_0000000000@c.us_JHB2HB23HJ4B234HJB to send as a reply to a message
     * @returns `Promise <boolean | string>` This will either return true or the id of the message. It will return true after 10 seconds even if waitForId is true
     */
    Client.prototype.sendPtt = function (to, file, quotedMsgId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.sendImage(to, file, 'ptt.ogg', '', quotedMsgId ? quotedMsgId : null, true, true)];
            });
        });
    };
    /**
     * Send an audio file with the default audio player (not PTT/voice message)
     * @param to chat id `xxxxx@c.us`
     * @param base64 base64 data:image/xxx;base64,xxx or the path of the file you want to send.
     * @param quotedMsgId string true_0000000000@c.us_JHB2HB23HJ4B234HJB to send as a reply to a message
     */
    Client.prototype.sendAudio = function (to, file, quotedMsgId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.sendFile(to, file, 'file.mp3', '', quotedMsgId, true, false, false, false)];
            });
        });
    };
    /**
     * Send a poll to a group chat
     * @param to chat id - a group chat is required
     * @param name the name of the poll
     * @param options an array of poll options
     * @param quotedMsgId A message to quote when sending the poll
     * @param allowMultiSelect Whether or not to allow multiple selections. default false
     */
    Client.prototype.sendPoll = function (to, name, options, quotedMsgId, allowMultiSelect) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var to = _a.to, name = _a.name, options = _a.options, quotedMsgId = _a.quotedMsgId, allowMultiSelect = _a.allowMultiSelect;
                            return WAPI.sendPoll(to, name, options, quotedMsgId, allowMultiSelect);
                        }, { to: to, name: name, options: options, quotedMsgId: quotedMsgId, allowMultiSelect: allowMultiSelect })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Sends a video to given chat as a gif, with caption or not, using base64
     * @param to chat id `xxxxx@c.us`
     * @param file DataURL data:image/xxx;base64,xxx or the RELATIVE (should start with `./` or `../`) path of the file you want to send. With the latest version, you can now set this to a normal URL (for example [GET] `https://file-examples-com.github.io/uploads/2017/10/file_example_JPG_2500kB.jpg`).
     * @param filename string xxxxx
     * @param caption string xxxxx
     * @param quotedMsgId string true_0000000000@c.us_JHB2HB23HJ4B234HJB to send as a reply to a message
     * @param requestConfig {} By default the request is a get request, however you can override that and many other options by sending this parameter. You can read more about this parameter here: https://github.com/axios/axios#request-config
     */
    Client.prototype.sendVideoAsGif = function (to, file, filename, caption, quotedMsgId, requestConfig) {
        if (requestConfig === void 0) { requestConfig = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var relativePath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!(0, tools_1.isDataURL)(file)) return [3 /*break*/, 5];
                        relativePath = path.join(path.resolve(process.cwd(), file || ''));
                        if (!(fs.existsSync(file) || fs.existsSync(relativePath))) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, datauri_1["default"])(fs.existsSync(file) ? file : relativePath)];
                    case 1:
                        file = _a.sent();
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(0, is_url_superb_1["default"])(file)) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0, tools_1.getDUrl)(file, requestConfig)];
                    case 3:
                        file = _a.sent();
                        return [3 /*break*/, 5];
                    case 4: throw new errors_1.CustomError(errors_1.ERROR_NAME.FILE_NOT_FOUND, 'Cannot find file. Make sure the file reference is relative, a valid URL or a valid DataURL');
                    case 5: return [4 /*yield*/, this.pup(function (_a) {
                            var to = _a.to, file = _a.file, filename = _a.filename, caption = _a.caption, quotedMsgId = _a.quotedMsgId;
                            return WAPI.sendVideoAsGif(file, to, filename, caption, quotedMsgId);
                        }, { to: to, file: file, filename: filename, caption: caption, quotedMsgId: quotedMsgId })];
                    case 6: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Sends a video to given chat as a gif by using a giphy link, with caption or not, using base64
     * @param to chat id `xxxxx@c.us`
     * @param giphyMediaUrl string https://media.giphy.com/media/oYtVHSxngR3lC/giphy.gif => https://i.giphy.com/media/oYtVHSxngR3lC/200w.mp4
     * @param caption string xxxxx
     */
    Client.prototype.sendGiphy = function (to, giphyMediaUrl, caption) {
        return __awaiter(this, void 0, void 0, function () {
            var ue, n, r, filename, dUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ue = /^https?:\/\/media\.giphy\.com\/media\/([a-zA-Z0-9]+)/;
                        n = ue.exec(giphyMediaUrl);
                        if (!n) return [3 /*break*/, 3];
                        r = "https://i.giphy.com/".concat(n[1], ".mp4");
                        filename = "".concat(n[1], ".mp4");
                        return [4 /*yield*/, (0, tools_1.getDUrl)(r)];
                    case 1:
                        dUrl = _a.sent();
                        return [4 /*yield*/, this.pup(function (_a) {
                                var to = _a.to, dUrl = _a.dUrl, filename = _a.filename, caption = _a.caption;
                                WAPI.sendVideoAsGif(dUrl, to, filename, caption);
                            }, { to: to, dUrl: dUrl, filename: filename, caption: caption })];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        console.log('something is wrong with this giphy link');
                        logging_1.log.error('something is wrong with this giphy link', giphyMediaUrl);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Sends a file by Url or custom options
     * @param to chat id `xxxxx@c.us`
     * @param url string https://i.giphy.com/media/oYtVHSxngR3lC/200w.mp4
     * @param filename string 'video.mp4'
     * @param caption string xxxxx
     * @param quotedMsgId string true_0000000000@c.us_JHB2HB23HJ4B234HJB to send as a reply to a message
     * @param requestConfig {} By default the request is a get request, however you can override that and many other options by sending this parameter. You can read more about this parameter here: https://github.com/axios/axios#request-config
     * @param waitForId boolean default: false set this to true if you want to wait for the id of the message. By default this is set to false as it will take a few seconds to retrieve to the key of the message and this waiting may not be desirable for the majority of users.
     * @param ptt boolean default: false set this to true if you want to send the file as a push to talk file.
     * @param withoutPreview boolean default: false set this to true if you want to send the file without a preview (i.e as a file). This is useful for preventing auto downloads on recipient devices.
     */
    Client.prototype.sendFileFromUrl = function (to, url, filename, caption, quotedMsgId, requestConfig, waitForId, ptt, withoutPreview, hideTags, viewOnce) {
        if (requestConfig === void 0) { requestConfig = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendFile(to, url, filename, caption, quotedMsgId, waitForId, ptt, withoutPreview, hideTags, viewOnce, requestConfig)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Returns an object with all of your host device details
     */
    Client.prototype.getMe = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._page.evaluate(function () { return WAPI.getMe(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Returns an object with properties of internal features and boolean values that represent if the respective feature is enabled or not.
     */
    Client.prototype.getFeatures = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._page.evaluate(function () { return WAPI.getFeatures(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Returns a PNG DataURL screenshot of the session
     * @param chatId Chat ID to open before taking a snapshot
     * @param width Width of the viewport for the snapshot. Height also required if you want to resize.
     * @param height Height of the viewport for the snapshot. Width also required if you want to resize.
     * @returns `Promise<DataURL>`
     */
    Client.prototype.getSnapshot = function (chatId, width, height) {
        return __awaiter(this, void 0, void 0, function () {
            var snapshotElement, _a, screenshot;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(width && height)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.resizePage(width, height)];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!chatId) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._page.evaluateHandle(function (_a) {
                                var chatId = _a.chatId;
                                return WAPI.getSnapshotElement(chatId);
                            }, { chatId: chatId })];
                    case 3:
                        _a = _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        _a = this.getPage();
                        _b.label = 5;
                    case 5:
                        snapshotElement = _a;
                        return [4 /*yield*/, snapshotElement.screenshot({
                                type: "png",
                                encoding: "base64"
                            })];
                    case 6:
                        screenshot = _b.sent();
                        return [2 /*return*/, "data:image/png;base64,".concat(screenshot)];
                }
            });
        });
    };
    /**
     * Returns some metrics of the session/page.
     * @returns `Promise<any>`
     */
    Client.prototype.metrics = function () {
        return __awaiter(this, void 0, void 0, function () {
            var metrics, sessionMetrics, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._page.metrics()];
                    case 1:
                        metrics = _a.sent();
                        return [4 /*yield*/, this.pup(function () { return WAPI.launchMetrics(); })];
                    case 2:
                        sessionMetrics = _a.sent();
                        res = __assign(__assign({}, (metrics || {})), (sessionMetrics || {}));
                        logging_1.log.info("Metrics:", res);
                        return [2 /*return*/, res];
                }
            });
        });
    };
    /**
     * Returns an array of group ids where the host account is admin
     */
    Client.prototype.iAmAdmin = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function () { return WAPI.iAmAdmin(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Returns an array of group ids where the host account has been kicked
     */
    Client.prototype.getKickedGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function () { return WAPI.getKickedGroups(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Syncs contacts with phone. This promise does not resolve so it will instantly return true.
     */
    Client.prototype.syncContacts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function () { return WAPI.syncContacts(); })];
                    case 1: 
                    //@ts-ignore
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Easily get the amount of messages loaded up in the session. This will allow you to determine when to clear chats/cache.
     */
    Client.prototype.getAmountOfLoadedMessages = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function () { return WAPI.getAmountOfLoadedMessages(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Find any product listings of the given number. Use this to query a catalog
     *
     * @param id id of business profile (i.e the number with @c.us)
     * @returns None
     */
    Client.prototype.getBusinessProfilesProducts = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var id = _a.id;
                            return WAPI.getBusinessProfilesProducts(id);
                        }, { id: id })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get the business info of a given contact id
     *
     * @param id id of business profile (i.e the number with @c.us)
     * @returns None
     */
    Client.prototype.getBusinessProfile = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var id = _a.id;
                            return WAPI.getBusinessProfile(id);
                        }, { id: id })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Sends product with image to chat
     * @param imgBase64 Base64 image data
     * @param chatid string the id of the chat that you want to send this product to
     * @param caption string the caption you want to add to this message
     * @param bizNumber string the @c.us number of the business account from which you want to grab the product
     * @param productId string the id of the product within the main catalog of the aforementioned business
     * @returns
     */
    Client.prototype.sendImageWithProduct = function (to, image, caption, bizNumber, productId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var to = _a.to, image = _a.image, bizNumber = _a.bizNumber, caption = _a.caption, productId = _a.productId;
                            WAPI.sendImageWithProduct(image, to, caption, bizNumber, productId);
                        }, { to: to, image: image, bizNumber: bizNumber, caption: caption, productId: productId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @deprecated
     * Feature Currently only available with Premium License accounts.
     *
     * Send a custom product to a chat. Please see [[CustomProduct]] for details.
     *
     * Caveats:
     * - URL will not work (unable to click), you will have to send another message with the URL.
     * - Recipient will see a thin banner under picture that says "Something went wrong"
     * - This will only work if you have at least 1 product already in your catalog
     * - Only works on Business accounts
     */
    Client.prototype.sendCustomProduct = function (to, image, productData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var to = _a.to, image = _a.image, productData = _a.productData;
                            return WAPI.sendCustomProduct(to, image, productData);
                        }, { to: to, image: image, productData: productData })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Sends contact card to given chat id. You can use this to send multiple contacts but they will show up as multiple single-contact messages.
     * @param {string} to 'xxxx@c.us'
     * @param {string|array} contact 'xxxx@c.us' | ['xxxx@c.us', 'yyyy@c.us', ...]
     */
    Client.prototype.sendContact = function (to, contactId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var to = _a.to, contactId = _a.contactId;
                            return WAPI.sendContact(to, contactId);
                        }, { to: to, contactId: contactId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     *
     * {@license:insiders@}
     *
     * Sends multiple contacts as a single message
     *
     * @param  to 'xxxx@c.us'
     * @param contact ['xxxx@c.us', 'yyyy@c.us', ...]
     */
    Client.prototype.sendMultipleContacts = function (to, contactIds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var to = _a.to, contactIds = _a.contactIds;
                            return WAPI.sendMultipleContacts(to, contactIds);
                        }, { to: to, contactIds: contactIds })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Simulate '...typing' in chat
     * @param {string} to 'xxxx@c.us'
     * @param {boolean} on turn on similated typing, false to turn it off you need to manually turn this off.
     */
    Client.prototype.simulateTyping = function (to, on) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var to = _a.to, on = _a.on;
                            return WAPI.simulateTyping(to, on);
                        }, { to: to, on: on })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Simulate '...recording' in chat
     * @param {string} to 'xxxx@c.us'
     * @param {boolean} on turn on similated recording, false to turn it off you need to manually turn this off.
     */
    Client.prototype.simulateRecording = function (to, on) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var to = _a.to, on = _a.on;
                            return WAPI.simulateRecording(to, on);
                        }, { to: to, on: on })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @param id The id of the conversation
     * @param archive boolean true => archive, false => unarchive
     * @return boolean true: worked, false: didnt work (probably already in desired state)
     */
    Client.prototype.archiveChat = function (id, archive) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var id = _a.id, archive = _a.archive;
                            return WAPI.archiveChat(id, archive);
                        }, { id: id, archive: archive })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Pin/Unpin chats
     *
     * @param id The id of the conversation
     * @param pin boolean true => pin, false => unpin
     * @return boolean true: worked
     */
    Client.prototype.pinChat = function (id, pin) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var id = _a.id, pin = _a.pin;
                            return WAPI.pinChat(id, pin);
                        }, { id: id, pin: pin })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Pin/Unpin message
     *
     * @param id The id of the message
     * @param pin boolean true => pin, false => unpin
     * @param pinDuration The length of time to pin the message. Default `ThirtyDays`
     * @return boolean true: worked
     */
    Client.prototype.pinMessage = function (id, pin, pinDuration) {
        if (pinDuration === void 0) { pinDuration = "ThirtyDays"; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var id = _a.id, pin = _a.pin, pinDuration = _a.pinDuration;
                            return WAPI.pinMessage(id, pin, pinDuration);
                        }, { id: id, pin: pin, pinDuration: pinDuration })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Keep a message inside an ephemeral chat
     *
     * @param id The id of the message
     * @return boolean true: worked
     */
    Client.prototype.keepMessage = function (id, keep) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var id = _a.id, keep = _a.keep;
                            return WAPI.keepMessage(id, keep);
                        }, { id: id, keep: keep })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     *
     * {@license:insiders@}
     *
     * Mutes a conversation for a given duration. If already muted, this will update the muted duration. Mute durations are relative from when the method is called.
     * @param chatId The id of the conversation you want to mute
     * @param muteDuration ChatMuteDuration enum of the time you want this chat to be muted for.
     * @return boolean true: worked or error code or message
     */
    Client.prototype.muteChat = function (chatId, muteDuration) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var chatId = _a.chatId, muteDuration = _a.muteDuration;
                            return WAPI.muteChat(chatId, muteDuration);
                        }, { chatId: chatId, muteDuration: muteDuration })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Checks if a chat is muted
     * @param chatId The id of the chat you want to check
     * @returns boolean. `false` if the chat does not exist.
     */
    Client.prototype.isChatMuted = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var chatId = _a.chatId;
                            return WAPI.isChatMuted(chatId);
                        }, { chatId: chatId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     *
     * {@license:insiders@}
     *
     * Unmutes a conversation.
     * @param id The id of the conversation you want to mute
     * @return boolean true: worked or error code or message
     */
    Client.prototype.unmuteChat = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var chatId = _a.chatId;
                            return WAPI.unmuteChat(chatId);
                        }, { chatId: chatId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Forward an array of messages to a specific chat using the message ids or Objects
     *
     * @param to '000000000000@c.us'
     * @param messages this can be any mixture of message ids or message objects
     * @param skipMyMessages This indicates whether or not to skip your own messages from the array
     */
    Client.prototype.forwardMessages = function (to, messages, skipMyMessages) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var to = _a.to, messages = _a.messages, skipMyMessages = _a.skipMyMessages;
                            return WAPI.forwardMessages(to, messages, skipMyMessages);
                        }, { to: to, messages: messages, skipMyMessages: skipMyMessages })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Ghost forwarding is like a normal forward but as if it were sent from the host phone [i.e it doesn't show up as forwarded.]
     * Any potential abuse of this method will see it become paywalled.
     * @param to: Chat id to forward the message to
     * @param messageId: message id of the message to forward. Please note that if it is not loaded, this will return false - even if it exists.
     * @returns `Promise<MessageId | boolean>`
     */
    Client.prototype.ghostForward = function (to, messageId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var to = _a.to, messageId = _a.messageId;
                            return WAPI.ghostForward(to, messageId);
                        }, { to: to, messageId: messageId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieves all contacts
     * @returns array of [Contact]
     */
    Client.prototype.getAllContacts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function () { return WAPI.getAllContacts(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.getWAVersion = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function () { return WAPI.getWAVersion(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Generate a pre-filled github issue link to easily report a bug
     */
    Client.prototype.getIssueLink = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, tools_1.generateGHIssueLink)(this.getConfig(), this.getSessionInfo())];
            });
        });
    };
    /**
     * Retrieves if the phone is online. Please note that this may not be real time.
     * @returns Boolean
     */
    Client.prototype.isConnected = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function () { return WAPI.isConnected(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Logs out from the session.
     * @param preserveSessionData skip session.data.json file invalidation
     * Please be careful when using this as it can exit the whole process depending on your config
     */
    Client.prototype.logout = function (preserveSessionData) {
        if (preserveSessionData === void 0) { preserveSessionData = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!preserveSessionData) return [3 /*break*/, 2];
                        logging_1.log.info("LOGOUT CALLED. INVALIDATING SESSION DATA");
                        return [4 /*yield*/, (0, browser_1.invalidateSesssionData)(this._createConfig)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.pup(function () { return WAPI.logout(); })];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @deprecated No longer works due to multi-device changes
     * Retrieves Battery Level
     * @returns Number
     */
    Client.prototype.getBatteryLevel = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function () { return WAPI.getBatteryLevel(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieves whether or not phone is plugged in (i.e on charge)
     * @returns Number
     */
    Client.prototype.getIsPlugged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function () { return WAPI.getIsPlugged(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieves the host device number. Use this number when registering for a license key
     * @returns Number
     */
    Client.prototype.getHostNumber = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this._hostAccountNumber) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.pup(function () { return WAPI.getHostNumber(); })];
                    case 1:
                        _a._hostAccountNumber = (_b.sent());
                        _b.label = 2;
                    case 2: return [2 /*return*/, this._hostAccountNumber];
                }
            });
        });
    };
    /**
     * Returns the the type of license key used by the session.
     * @returns
     */
    Client.prototype.getLicenseType = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function () { return WAPI.getLicenseType(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * The EASY API uses this string to secure a subdomain on the openwa public tunnel service.
     * @returns
     */
    Client.prototype.getTunnelCode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sessionId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sessionId = this.getSessionId();
                        return [4 /*yield*/, this.pup(function (sessionId) { return WAPI.getTunnelCode(sessionId); }, sessionId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get an array of chatIds with their respective last message's timestamp.
     *
     * This is useful for determining what chats are old/stale and need to be deleted.
     */
    Client.prototype.getLastMsgTimestamps = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function () { return WAPI.getLastMsgTimestamps(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieves all chats
     * @returns array of [Chat]
     */
    Client.prototype.getAllChats = function (withNewMessageOnly) {
        if (withNewMessageOnly === void 0) { withNewMessageOnly = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!withNewMessageOnly) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.pup(function () {
                                return WAPI.getAllChatsWithNewMsg();
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, this.pup(function () { return WAPI.getAllChats(); })];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * retrieves all Chat Ids
     * @returns array of [ChatId]
     */
    Client.prototype.getAllChatIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function () { return WAPI.getAllChatIds(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * retrieves an array of IDs of accounts blocked by the host account.
     * @returns `Promise<ChatId[]>`
     */
    Client.prototype.getBlockedIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function () { return WAPI.getBlockedIds(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @deprecated
     *
     * Retrieves all chats with messages
     *
     * Please use `getAllUnreadMessages` instead of this to see all messages indicated by the green dots in the chat.
     *
     * @returns array of [Chat]
     */
    Client.prototype.getAllChatsWithMessages = function (withNewMessageOnly) {
        if (withNewMessageOnly === void 0) { withNewMessageOnly = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, this.pup(function (withNewMessageOnly) { return WAPI.getAllChatsWithMessages(withNewMessageOnly); }, withNewMessageOnly)];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    /**
     * Returns a properly formatted array of messages from to send to the openai api
     *
     * @param last The amount of previous messages to retrieve. Defaults to 10
     * @returns
     */
    Client.prototype.getGptArray = function (chatId, last) {
        if (last === void 0) { last = 10; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var chatId = _a.chatId, last = _a.last;
                            return WAPI.getGptArray(chatId, last);
                        }, { chatId: chatId, last: last })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieve all groups
     * @returns array of groups
     */
    Client.prototype.getAllGroups = function (withNewMessagesOnly) {
        if (withNewMessagesOnly === void 0) { withNewMessagesOnly = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (withNewMessagesOnly) { return WAPI.getAllGroups(withNewMessagesOnly); }, withNewMessagesOnly)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieve all commmunity Ids
     * @returns array of group ids
     */
    Client.prototype.getAllCommunities = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function () { return WAPI.getCommunities(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieves group members as [Id] objects
     * @param groupId group id
     */
    Client.prototype.getGroupMembersId = function (groupId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (groupId) { return WAPI.getGroupParticipantIDs(groupId); }, groupId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Returns the title and description of a given group id.
     * @param groupId group id
     */
    Client.prototype.getGroupInfo = function (groupId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (groupId) { return WAPI.getGroupInfo(groupId); }, groupId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Returns the community metadata. Like group metadata but with a `subGroups` property which is the group metadata of the community subgroups.
     * @param communityId community id
     */
    Client.prototype.getCommunityInfo = function (communityId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (communityId) { return WAPI.getCommunityInfo(communityId); }, communityId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     *
     * Accepts a request from a recipient to join a group. Takes the message ID of the request message.
     *
     * @param {string} messageId
     */
    Client.prototype.acceptGroupJoinRequest = function (messageId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (messageId) { return WAPI.acceptGroupJoinRequest(messageId); }, messageId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieves community members Ids
     * @param communityId community id
     */
    Client.prototype.getCommunityParticipantIds = function (communityId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (communityId) { return WAPI.getCommunityParticipantIds(communityId); }, communityId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieves community admin Ids
     * @param communityId community id
     */
    Client.prototype.getCommunityAdminIds = function (communityId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (communityId) { return WAPI.getCommunityAdminIds(communityId); }, communityId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieves community members as Contact objects
     * @param communityId community id
     */
    Client.prototype.getCommunityParticipants = function (communityId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (communityId) { return WAPI.getCommunityParticipants(communityId); }, communityId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieves community admins as Contact objects
     * @param communityId community id
     */
    Client.prototype.getCommunityAdmins = function (communityId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (communityId) { return WAPI.getCommunityAdmins(communityId); }, communityId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Joins a group via the invite link, code, or message
     * @param link This param is the string which includes the invite link or code. The following work:
     * - Follow this link to join my WA group: https://chat.whatsapp.com/DHTGJUfFJAV9MxOpZO1fBZ
     * - https://chat.whatsapp.com/DHTGJUfFJAV9MxOpZO1fBZ
     * - DHTGJUfFJAV9MxOpZO1fBZ
     *
     *  If you have been removed from the group previously, it will return `401`
     *
     * @param returnChatObj boolean When this is set to true and if the group was joined successfully, it will return a serialzed Chat object which includes group information and metadata. This is useful when you want to immediately do something with group metadata.
     *
     *
     * @returns `Promise<string | boolean | number>` Either false if it didn't work, or the group id.
     */
    Client.prototype.joinGroupViaLink = function (link, returnChatObj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var link = _a.link, returnChatObj = _a.returnChatObj;
                            return WAPI.joinGroupViaLink(link, returnChatObj);
                        }, { link: link, returnChatObj: returnChatObj })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Block contact
     * @param {string} id '000000000000@c.us'
     */
    Client.prototype.contactBlock = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (id) { return WAPI.contactBlock(id); }, id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * {@license:restricted@}
     *
     * Report a contact for spam, block them and attempt to clear chat.
     *
     * @param {string} id '000000000000@c.us'
     */
    Client.prototype.reportSpam = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (id) { return WAPI.REPORTSPAM(id); }, id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Unblock contact
     * @param {string} id '000000000000@c.us'
     */
    Client.prototype.contactUnblock = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (id) { return WAPI.contactUnblock(id); }, id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Removes the host device from the group
     * @param groupId group id
     */
    Client.prototype.leaveGroup = function (groupId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (groupId) { return WAPI.leaveGroup(groupId); }, groupId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Extracts vcards from a message.This works on messages of typ `vcard` or `multi_vcard`
     * @param msgId string id of the message to extract the vcards from
     * @returns [vcard]
     * ```
     * [
     * {
     * displayName:"Contact name",
     * vcard: "loong vcard string"
     * }
     * ]
     * ```
     * or false if no valid vcards found.
     *
     * Please use [vcf](https://www.npmjs.com/package/vcf) to convert a vcard string into a json object
     */
    Client.prototype.getVCards = function (msgId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (msgId) { return WAPI.getVCards(msgId); }, msgId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Returns group members [Contact] objects
     * @param groupId
     */
    Client.prototype.getGroupMembers = function (groupId) {
        return __awaiter(this, void 0, void 0, function () {
            var membersIds, actions;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getGroupMembersId(groupId)];
                    case 1:
                        membersIds = _a.sent();
                        logging_1.log.info("group members ids", membersIds);
                        if (!Array.isArray(membersIds)) {
                            console.error("group members ids is not an array", membersIds);
                            return [2 /*return*/, []];
                        }
                        actions = membersIds.map(function (memberId) {
                            return _this.getContact(memberId);
                        });
                        return [4 /*yield*/, Promise.all(actions)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieves contact detail object of given contact id
     * @param contactId
     * @returns contact detial as promise
     */
    //@ts-ignore
    Client.prototype.getContact = function (contactId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (contactId) { return WAPI.getContact(contactId); }, contactId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieves chat object of given contact id
     * @param contactId
     * @returns contact detial as promise
     */
    Client.prototype.getChatById = function (contactId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (contactId) { return WAPI.getChatById(contactId); }, contactId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieves message object of given message id
     * @param messageId
     * @returns message object
     */
    Client.prototype.getMessageById = function (messageId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (messageId) { return WAPI.getMessageById(messageId); }, messageId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * {@license:insiders@}
     *
     * Get the detailed message info for a group message sent out by the host account.
     * @param messageId The message Id
     */
    Client.prototype.getMessageInfo = function (messageId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (messageId) { return WAPI.getMessageInfo(messageId); }, messageId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * {@license:insiders@}
     *
     * Retrieves an order object
     * @param messageId or OrderId
     * @returns order object
     */
    Client.prototype.getOrder = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (id) { return WAPI.getOrder(id); }, id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * {@license:insiders@}
     *
     * Add a product to your catalog
     *
     * @param {string} name The name of the product
     * @param {number} price The price of the product
     * @param {string} currency The 3-letter currenct code for the product
     * @param {string[]} images An array of dataurl or base64 strings of product images, the first image will be used as the main image. At least one image is required.
     * @param {string} description optional, the description of the product
     * @param {string} url The url of the product for more information
     * @param {string} internalId The internal/backoffice id of the product
     * @param {boolean} isHidden Whether or not the product is shown publicly in your catalog
     * @returns product object
     */
    Client.prototype.createNewProduct = function (name, price, currency, images, description, url, internalId, isHidden) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!Array.isArray(images))
                            images = [images];
                        return [4 /*yield*/, Promise.all(images.map(function (image) { return (0, tools_1.ensureDUrl)(image); }))];
                    case 1:
                        images = _a.sent();
                        return [4 /*yield*/, this.pup(function (_a) {
                                var name = _a.name, price = _a.price, currency = _a.currency, images = _a.images, description = _a.description, url = _a.url, internalId = _a.internalId, isHidden = _a.isHidden;
                                return WAPI.createNewProduct(name, price, currency, images, description, url, internalId, isHidden);
                            }, { name: name, price: price, currency: currency, images: images, description: description, url: url, internalId: internalId, isHidden: isHidden })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * {@license:insiders@}
     *
     * Edit a product in your catalog
     *
     * @param {string} productId The catalog ID of the product
     * @param {string} name The name of the product
     * @param {number} price The price of the product
     * @param {string} currency The 3-letter currenct code for the product
     * @param {string[]} images An array of dataurl or base64 strings of product images, the first image will be used as the main image. At least one image is required.
     * @param {string} description optional, the description of the product
     * @param {string} url The url of the product for more information
     * @param {string} internalId The internal/backoffice id of the product
     * @param {boolean} isHidden Whether or not the product is shown publicly in your catalog
     * @returns product object
     */
    Client.prototype.editProduct = function (productId, name, price, currency, images, description, url, internalId, isHidden) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var productId = _a.productId, name = _a.name, price = _a.price, currency = _a.currency, images = _a.images, description = _a.description, url = _a.url, internalId = _a.internalId, isHidden = _a.isHidden;
                            return WAPI.editProduct(productId, name, price, currency, images, description, url, internalId, isHidden);
                        }, { productId: productId, name: name, price: price, currency: currency, images: images, description: description, url: url, internalId: internalId, isHidden: isHidden })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * {@license:insiders@}
     *
     * Send a product to a chat
     *
     * @param {string} chatId The chatId
     * @param {string} productId The id of the product
     * @returns MessageID
     */
    Client.prototype.sendProduct = function (chatId, productId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var chatId = _a.chatId, productId = _a.productId;
                            return WAPI.sendProduct(chatId, productId);
                        }, { chatId: chatId, productId: productId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     *
     * Remove a product from the host account's catalog
     *
     * @param {string} productId The id of the product
     * @returns boolean
     */
    Client.prototype.removeProduct = function (productId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var productId = _a.productId;
                            return WAPI.removeProduct(productId);
                        }, { productId: productId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieves the last message sent by the host account in any given chat or globally.
     * @param chatId This is optional. If no chat Id is set then the last message sent by the host account will be returned.
     * @returns message object or `undefined` if the host account's last message could not be found.
     */
    Client.prototype.getMyLastMessage = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (chatId) { return WAPI.getMyLastMessage(chatId); }, chatId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieves the starred messages in a given chat
     * @param chatId Chat ID to filter starred messages by
     * @returns message object
     */
    Client.prototype.getStarredMessages = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (chatId) { return WAPI.getStarredMessages(chatId); }, chatId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Star a message
     * @param messageId Message ID of the message you want to star
     * @returns `true`
     */
    Client.prototype.starMessage = function (messageId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (messageId) { return WAPI.starMessage(messageId); }, messageId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Unstar a message
     * @param messageId Message ID of the message you want to unstar
     * @returns `true`
     */
    Client.prototype.unstarMessage = function (messageId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (messageId) { return WAPI.unstarMessage(messageId); }, messageId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * React to a message
     * @param messageId Message ID of the message you want to react to
     * @param emoji 1 single emoji to add to the message as a reacion
     * @returns boolean
     */
    Client.prototype.react = function (messageId, emoji) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var messageId = _a.messageId, emoji = _a.emoji;
                            return WAPI.react(messageId, emoji);
                        }, { messageId: messageId, emoji: emoji })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @deprecated
     *
     * Retrieves a message object which results in a valid sticker instead of a blank one. This also works with animated stickers.
     *
     * If you run this without a valid insiders key, it will return false and cause an error upon decryption.
     *
     * @param messageId The message ID `message.id`
     * @returns message object OR `false`
     */
    Client.prototype.getStickerDecryptable = function (messageId) {
        return __awaiter(this, void 0, void 0, function () {
            var m;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (messageId) { return WAPI.getStickerDecryptable(messageId); }, messageId)];
                    case 1:
                        m = _a.sent();
                        if (!m)
                            return [2 /*return*/, false];
                        return [2 /*return*/, __assign({ t: m.t, id: m.id }, (0, wa_decrypt_1.bleachMessage)(m))];
                }
            });
        });
    };
    /**
     *
     * {@license:insiders@}
     *
     * If a file is old enough, it will 404 if you try to decrypt it. This will allow you to force the host account to re upload the file and return a decryptable message.
     *
     * if you run this without a valid insiders key, it will return false and cause an error upon decryption.
     *
     * @param messageId
     * @returns [[Message]] OR `false`
     */
    Client.prototype.forceStaleMediaUpdate = function (messageId) {
        return __awaiter(this, void 0, void 0, function () {
            var m;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (messageId) { return WAPI.forceStaleMediaUpdate(messageId); }, messageId)];
                    case 1:
                        m = _a.sent();
                        if (!m)
                            return [2 /*return*/, false];
                        return [2 /*return*/, __assign({}, (0, wa_decrypt_1.bleachMessage)(m))];
                }
            });
        });
    };
    /**
     * Retrieves chat object of given contact id
     * @param contactId
     * @returns contact detial as promise
     */
    Client.prototype.getChat = function (contactId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (contactId) { return WAPI.getChat(contactId); }, contactId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * {@license:insiders@}
     *
     * Retrieves the groups that you have in common with a contact
     * @param contactId
     */
    Client.prototype.getCommonGroups = function (contactId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (contactId) { return WAPI.getCommonGroups(contactId); }, contactId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieves the epoch timestamp of the time the contact was last seen. This will not work if:
     * 1. They have set it so you cannot see their last seen via privacy settings.
     * 2. You do not have an existing chat with the contact.
     * 3. The chatId is for a group
     * In both of those instances this method will return undefined.
     * @param chatId The id of the chat.
     * @returns number timestamp when chat was last online or undefined.
     */
    Client.prototype.getLastSeen = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (chatId) { return WAPI.getLastSeen(chatId); }, chatId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieves chat picture
     * @param chatId
     * @returns Url of the chat picture or undefined if there is no picture for the chat.
     */
    Client.prototype.getProfilePicFromServer = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (chatId) { return WAPI.getProfilePicFromServer(chatId); }, chatId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Sets a chat status to seen. Marks all messages as ack: 3
     * @param chatId chat id: `xxxxx@c.us`
     */
    Client.prototype.sendSeen = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (chatId) { return WAPI.sendSeen(chatId); }, chatId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Runs sendSeen on all chats
     */
    Client.prototype.markAllRead = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function () { return WAPI.markAllRead(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Sets a chat status to unread. May be useful to get host's attention
     * @param chatId chat id: `xxxxx@c.us`
     */
    Client.prototype.markAsUnread = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (chatId) { return WAPI.markAsUnread(chatId); }, chatId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Checks if a chat contact is online. Not entirely sure if this works with groups.
     *
     * It will return `true` if the chat is `online`, `false` if the chat is `offline`, `PRIVATE` if the privacy settings of the contact do not allow you to see their status and `NO_CHAT` if you do not currently have a chat with that contact.
     *
     * @param chatId chat id: `xxxxx@c.us`
     */
    Client.prototype.isChatOnline = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (chatId) { return WAPI.isChatOnline(chatId); }, chatId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
      * Load more messages in chat object from server. Use this in a while loop. This should return up to 50 messages at a time
     * @param contactId
     * @returns Message []
     */
    Client.prototype.loadEarlierMessages = function (contactId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (contactId) { return WAPI.loadEarlierMessages(contactId); }, contactId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get the status of a contact
     * @param contactId to '000000000000@c.us'
     */
    Client.prototype.getStatus = function (contactId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (contactId) { return WAPI.getStatus(contactId); }, contactId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     *
     * {@license:insiders@}
     *
     * :::danger
     *
     * Buttons are broken for the foreseeable future. Please DO NOT get a license solely for access to buttons. They are no longer reliable due to recent changes at WA.
     *
     * :::
     *
     * Use a raw payload within your open-wa session
     *
     * @example
     * If there is a code block, then both TypeDoc and VSCode will treat
     * text outside of the code block as regular text.
     *
     * ```ts
     * await B('44123456789@c.us', {
     *  test: 1
     * })
     * ```
     * {@link loadAllEarlierMessages}
     * @param chatId
     * @param payload
     * returns: MessageId
     */
    Client.prototype.B = function (chatId, payload) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var chatId = _a.chatId, payload = _a.payload;
                            return WAPI.B(chatId, payload);
                        }, { chatId: chatId, payload: payload })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
      * Load all messages in chat object from server.
     * @param contactId
     * @returns Message[]
     */
    Client.prototype.loadAllEarlierMessages = function (contactId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (contactId) { return WAPI.loadAllEarlierMessages(contactId); }, contactId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
      * Load all messages until a given timestamp in chat object from server.
     * @param contactId
     * @param timestamp in seconds
     * @returns Message[]
     */
    Client.prototype.loadEarlierMessagesTillDate = function (contactId, timestamp) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var contactId = _a.contactId, timestamp = _a.timestamp;
                            return WAPI.loadEarlierMessagesTillDate(contactId, timestamp);
                        }, { contactId: contactId, timestamp: timestamp })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
      * Delete the conversation from your WA
     * @param chatId
     * @returns boolean
     */
    Client.prototype.deleteChat = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (chatId) { return WAPI.deleteConversation(chatId); }, chatId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
      * Delete all messages from the chat.
     * @param chatId
     * @returns boolean
     */
    Client.prototype.clearChat = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (chatId) { return WAPI.clearChat(chatId); }, chatId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
      * Retrieves an invite link for a group chat. returns false if chat is not a group.
     * @param chatId
     * @returns `Promise<string>`
     */
    Client.prototype.getGroupInviteLink = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (chatId) { return WAPI.getGroupInviteLink(chatId); }, chatId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
      * Get the details of a group through the invite link
     * @param link This can be an invite link or invite code
     * @returns
     */
    Client.prototype.inviteInfo = function (link) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (link) { return WAPI.inviteInfo(link); }, link)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Set/Unset a sticker as a fav.
     * @param msgId The message Id related to the sticker you want to fav
     * @param fav set this to true to fav a sticker, set it to false to remove the sticker from favorites. default true
     * @returns favId The ID (filehash) of the fav sticker
     */
    Client.prototype.favSticker = function (msgId, fav) {
        if (fav === void 0) { fav = true; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var msgId = _a.msgId, fav = _a.fav;
                            return WAPI.favSticker(msgId, fav);
                        }, { msgId: msgId, fav: fav })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Set/Unset a sticker as a fav.
     * @param chatId The chat in which you want to send the sticker
     * @param favId set this to true to favourite a sticker, set it to false to remove the sticker from favorites
     * @returns MessageId of the sent sticker message
     */
    Client.prototype.sendFavSticker = function (chatId, favId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var chatId = _a.chatId, favId = _a.favId;
                            return WAPI.sendFavSticker(chatId, favId);
                        }, { chatId: chatId, favId: favId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get an array of fav'ed stickers
     */
    Client.prototype.getFavStickers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function () { return WAPI.getFavStickers(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
      * Revokes the current invite link for a group chat. Any previous links will stop working
     * @param chatId
     * @returns `Promise<boolean>`
     */
    Client.prototype.revokeGroupInviteLink = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (chatId) { return WAPI.revokeGroupInviteLink(chatId); }, chatId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Gets the contact IDs of members requesting approval to join the group
     * @param groupChatId
     * @returns `Promise<ContactId[]>`
     */
    Client.prototype.getGroupApprovalRequests = function (groupChatId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (groupChatId) { return WAPI.getGroupApprovalRequests(groupChatId); }, groupChatId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
      * Approves a group join request
     * @param groupChatId The group chat id
     * @param contactId The contact id of the person who is requesting to join the group
     * @returns `Promise<boolean>`
     */
    Client.prototype.approveGroupJoinRequest = function (groupChatId, contactId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var groupChatId = _a.groupChatId, contactId = _a.contactId;
                            return WAPI.approveGroupJoinRequest(groupChatId, contactId);
                        }, { groupChatId: groupChatId, contactId: contactId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
    * Rejects a group join request
     * @param groupChatId The group chat id
     * @param contactId The contact id of the person who is requesting to join the group
     * @returns `Promise<boolean>`
     */
    Client.prototype.rejectGroupJoinRequest = function (groupChatId, contactId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var groupChatId = _a.groupChatId, contactId = _a.contactId;
                            return WAPI.rejectGroupJoinRequest(groupChatId, contactId);
                        }, { groupChatId: groupChatId, contactId: contactId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Deletes message of given message id
     * @param chatId The chat id from which to delete the message.
     * @param messageId The specific message id of the message to be deleted
     * @param onlyLocal If it should only delete locally (message remains on the other recipienct's phone). Defaults to false.
     * @returns nothing
     */
    Client.prototype.deleteMessage = function (chatId, messageId, onlyLocal) {
        if (onlyLocal === void 0) { onlyLocal = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var chatId = _a.chatId, messageId = _a.messageId, onlyLocal = _a.onlyLocal;
                            return WAPI.smartDeleteMessages(chatId, messageId, onlyLocal);
                        }, { chatId: chatId, messageId: messageId, onlyLocal: onlyLocal })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Checks if a number is a valid WA number
     * @param contactId, you need to include the @c.us at the end.
     */
    Client.prototype.checkNumberStatus = function (contactId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (contactId) { return WAPI.checkNumberStatus(contactId); }, contactId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieves all unread Messages
     * @param includeMe
     * @param includeNotifications
     * @param use_unread_count
     * @returns any
     */
    Client.prototype.getUnreadMessages = function (includeMe, includeNotifications, use_unread_count) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var includeMe = _a.includeMe, includeNotifications = _a.includeNotifications, use_unread_count = _a.use_unread_count;
                            return WAPI.getUnreadMessages(includeMe, includeNotifications, use_unread_count);
                        }, { includeMe: includeMe, includeNotifications: includeNotifications, use_unread_count: use_unread_count })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieves all new Messages. where isNewMsg==true
     * @returns list of messages
     */
    Client.prototype.getAllNewMessages = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function () { return WAPI.getAllNewMessages(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieves all unread Messages. where ack==-1
     * @returns list of messages
     */
    Client.prototype.getAllUnreadMessages = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function () { return WAPI.getAllUnreadMessages(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieves all unread Messages as indicated by the red dots in WA web. This returns an array of objects and are structured like so:
     * ```javascript
     * [{
     * "id": "000000000000@g.us", //the id of the chat
     * "indicatedNewMessages": [] //array of messages, not including any messages by the host phone
     * }]
     * ```
     * @returns list of messages
     */
    Client.prototype.getIndicatedNewMessages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, this.pup(function () { return WAPI.getIndicatedNewMessages(); })];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    /**
     * Fires all unread messages to the onMessage listener.
     * Make sure to call this AFTER setting your listeners.
     * @returns array of message IDs
     */
    Client.prototype.emitUnreadMessages = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function () { return WAPI.emitUnreadMessages(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieves all Messages in a chat that have been loaded within the WA web instance.
     *
     * This does not load every single message in the chat history.
     *
     * @param chatId, the chat to get the messages from
     * @param includeMe, include my own messages? boolean
     * @param includeNotifications
     * @returns Message[]
     */
    Client.prototype.getAllMessagesInChat = function (chatId, includeMe, includeNotifications) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var chatId = _a.chatId, includeMe = _a.includeMe, includeNotifications = _a.includeNotifications;
                            return WAPI.getAllMessagesInChat(chatId, includeMe, includeNotifications);
                        }, { chatId: chatId, includeMe: includeMe, includeNotifications: includeNotifications })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * loads and Retrieves all Messages in a chat
     * @param chatId, the chat to get the messages from
     * @param includeMe, include my own messages? boolean
     * @param includeNotifications
     * @returns any
     */
    Client.prototype.loadAndGetAllMessagesInChat = function (chatId, includeMe, includeNotifications) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var chatId = _a.chatId, includeMe = _a.includeMe, includeNotifications = _a.includeNotifications;
                            return WAPI.loadAndGetAllMessagesInChat(chatId, includeMe, includeNotifications);
                        }, { chatId: chatId, includeMe: includeMe, includeNotifications: includeNotifications })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Create a group and add contacts to it
     *
     * @param groupName group name: 'New group'
     * @param contacts: A single contact id or an array of contact ids.
     */
    Client.prototype.createGroup = function (groupName, contacts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var groupName = _a.groupName, contacts = _a.contacts;
                            return WAPI.createGroup(groupName, contacts);
                        }, { groupName: groupName, contacts: contacts })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * {@license:insiders@}
     *
     * Create a new community
     *
     * @param communityName The community name
     * @param communitySubject: The community subject line
     * @param icon DataURL of a 1:1 ratio jpeg for the community icon
     * @param existingGroups An array of existing group IDs, that are not already part of a community, to add to this new community.
     * @param newGroups An array of new group objects that
     */
    Client.prototype.createCommunity = function (communityName, communitySubject, icon, existingGroups, newGroups) {
        if (existingGroups === void 0) { existingGroups = []; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var communityName = _a.communityName, communitySubject = _a.communitySubject, icon = _a.icon, existingGroups = _a.existingGroups, newGroups = _a.newGroups;
                            return WAPI.createCommunity(communityName, communitySubject, icon, existingGroups, newGroups);
                        }, { communityName: communityName, communitySubject: communitySubject, icon: icon, existingGroups: existingGroups, newGroups: newGroups })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Remove participant of Group
     *
     * If not a group chat, returns `NOT_A_GROUP_CHAT`.
     *
     * If the chat does not exist, returns `GROUP_DOES_NOT_EXIST`
     *
     * If the participantId does not exist in the group chat, returns `NOT_A_PARTICIPANT`
     *
     * If the host account is not an administrator, returns `INSUFFICIENT_PERMISSIONS`
     *
     * @param {*} groupId `0000000000-00000000@g.us`
     * @param {*} participantId `000000000000@c.us`
     */
    Client.prototype.removeParticipant = function (groupId, participantId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var groupId = _a.groupId, participantId = _a.participantId;
                            return WAPI.removeParticipant(groupId, participantId);
                        }, { groupId: groupId, participantId: participantId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Change the icon for the group chat
     * @param groupId 123123123123_1312313123@g.us The id of the group
     * @param imgData 'data:image/jpeg;base64,...` The base 64 data url. Make sure this is a small img (128x128), otherwise it will fail.
     * @returns boolean true if it was set, false if it didn't work. It usually doesn't work if the image file is too big.
     */
    Client.prototype.setGroupIcon = function (groupId, image) {
        return __awaiter(this, void 0, void 0, function () {
            var mimeInfo, imgData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mimeInfo = (0, tools_1.base64MimeType)(image);
                        if (!(!mimeInfo || mimeInfo.includes("image"))) return [3 /*break*/, 3];
                        imgData = void 0;
                        return [4 /*yield*/, this.stickerServerRequest('convertGroupIcon', {
                                image: image
                            })];
                    case 1:
                        imgData = _a.sent();
                        return [4 /*yield*/, this.pup(function (_a) {
                                var groupId = _a.groupId, imgData = _a.imgData;
                                return WAPI.setGroupIcon(groupId, imgData);
                            }, { groupId: groupId, imgData: imgData })];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /** Change the icon for the group chat
     * @param groupId 123123123123_1312313123@g.us The id of the group
     * @param url'https://upload.wikimedia.org/wikipedia/commons/3/38/JPEG_example_JPG_RIP_001.jpg' The url of the image. Make sure this is a small img (128x128), otherwise it will fail.
     * @param requestConfig {} By default the request is a get request, however you can override that and many other options by sending this parameter. You can read more about this parameter here: https://github.com/axios/axios#request-config
     * @returns boolean true if it was set, false if it didn't work. It usually doesn't work if the image file is too big.
     */
    Client.prototype.setGroupIconByUrl = function (groupId, url, requestConfig) {
        if (requestConfig === void 0) { requestConfig = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var base64, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, (0, tools_1.getDUrl)(url, requestConfig)];
                    case 1:
                        base64 = _a.sent();
                        return [4 /*yield*/, this.setGroupIcon(groupId, base64)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_5 = _a.sent();
                        throw error_5;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Add participant to Group
    *
    * If not a group chat, returns `NOT_A_GROUP_CHAT`.
    *
    * If the chat does not exist, returns `GROUP_DOES_NOT_EXIST`
    *
    * If the participantId does not exist in the contacts, returns `NOT_A_CONTACT`
    *
    * If the host account is not an administrator, returns `INSUFFICIENT_PERMISSIONS`
    *
    * @param {*} groupId '0000000000-00000000@g.us'
    * @param {*} participantId '000000000000@c.us'
    *
    */
    Client.prototype.addParticipant = function (groupId, participantId) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var groupId = _a.groupId, participantId = _a.participantId;
                            return WAPI.addParticipant(groupId, participantId);
                        }, { groupId: groupId, participantId: participantId })];
                    case 1:
                        res = _a.sent();
                        if (typeof res === "object")
                            throw new errors_1.AddParticipantError('Unable to add some participants', res);
                        if (typeof res === "string")
                            throw new errors_1.AddParticipantError(res);
                        return [2 /*return*/, res];
                }
            });
        });
    };
    /**
    * Promote Participant to Admin in Group
    *
    *
    * If not a group chat, returns `NOT_A_GROUP_CHAT`.
    *
    * If the chat does not exist, returns `GROUP_DOES_NOT_EXIST`
    *
    * If the participantId does not exist in the group chat, returns `NOT_A_PARTICIPANT`
    *
    * If the host account is not an administrator, returns `INSUFFICIENT_PERMISSIONS`
    *
    * @param {*} groupId '0000000000-00000000@g.us'
    * @param {*} participantId '000000000000@c.us'
    */
    Client.prototype.promoteParticipant = function (groupId, participantId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var groupId = _a.groupId, participantId = _a.participantId;
                            return WAPI.promoteParticipant(groupId, participantId);
                        }, { groupId: groupId, participantId: participantId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
    * Demote Admin of Group
    *
    * If not a group chat, returns `NOT_A_GROUP_CHAT`.
    *
    * If the chat does not exist, returns `GROUP_DOES_NOT_EXIST`
    *
    * If the participantId does not exist in the group chat, returns `NOT_A_PARTICIPANT`
    *
    * If the host account is not an administrator, returns `INSUFFICIENT_PERMISSIONS`
    *
    * @param {*} groupId '0000000000-00000000@g.us'
    * @param {*} participantId '000000000000@c.us'
    */
    Client.prototype.demoteParticipant = function (groupId, participantId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var groupId = _a.groupId, participantId = _a.participantId;
                            return WAPI.demoteParticipant(groupId, participantId);
                        }, { groupId: groupId, participantId: participantId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
    *
    * Change who can and cannot speak in a group
    * @param groupId '0000000000-00000000@g.us' the group id.
    * @param onlyAdmins boolean set to true if you want only admins to be able to speak in this group. false if you want to allow everyone to speak in the group
    * @returns boolean true if action completed successfully.
    */
    Client.prototype.setGroupToAdminsOnly = function (groupId, onlyAdmins) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var groupId = _a.groupId, onlyAdmins = _a.onlyAdmins;
                            return WAPI.setGroupToAdminsOnly(groupId, onlyAdmins);
                        }, { groupId: groupId, onlyAdmins: onlyAdmins })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     *
    * Change who can and cannot edit a groups details
    * @param groupId '0000000000-00000000@g.us' the group id.
    * @param onlyAdmins boolean set to true if you want only admins to be able to speak in this group. false if you want to allow everyone to speak in the group
    * @returns boolean true if action completed successfully.
    */
    Client.prototype.setGroupEditToAdminsOnly = function (groupId, onlyAdmins) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var groupId = _a.groupId, onlyAdmins = _a.onlyAdmins;
                            return WAPI.setGroupEditToAdminsOnly(groupId, onlyAdmins);
                        }, { groupId: groupId, onlyAdmins: onlyAdmins })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     *
    * Turn on or off the approval requirement for new members to join a group
    * @param groupId '0000000000-00000000@g.us' the group id.
    * @param requireApproval set to true to turn on the approval requirement, false to turn off
    * @returns boolean true if action completed successfully.
    */
    Client.prototype.setGroupApprovalMode = function (groupId, requireApproval) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var groupId = _a.groupId, requireApproval = _a.requireApproval;
                            return WAPI.setGroupApprovalMode(groupId, requireApproval);
                        }, { groupId: groupId, requireApproval: requireApproval })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
    * Change the group chant description
    * @param groupId '0000000000-00000000@g.us' the group id.
    * @param description string The new group description
    * @returns boolean true if action completed successfully.
    */
    Client.prototype.setGroupDescription = function (groupId, description) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var groupId = _a.groupId, description = _a.description;
                            return WAPI.setGroupDescription(groupId, description);
                        }, { groupId: groupId, description: description })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * {@license:insiders@}
     *
    * Change the group chat title
    * @param groupId '0000000000-00000000@g.us' the group id.
    * @param title string The new group title
    * @returns boolean true if action completed successfully.
    */
    Client.prototype.setGroupTitle = function (groupId, title) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var groupId = _a.groupId, title = _a.title;
                            return WAPI.setGroupTitle(groupId, title);
                        }, { groupId: groupId, title: title })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
    * Get Admins of a Group
    * @param {*} groupId '0000000000-00000000@g.us'
    */
    Client.prototype.getGroupAdmins = function (groupId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (groupId) { return WAPI.getGroupAdmins(groupId); }, groupId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * {@license:insiders@}
     *
     * Set the wallpaper background colour
     * @param {string} hex '#FFF123'
    */
    Client.prototype.setChatBackgroundColourHex = function (hex) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (hex) { return WAPI.setChatBackgroundColourHex(hex); }, hex)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Join or leave the wa web beta program. Will return true of operation was successful.
     *
     * @param {boolean} join true to join the beta, false to leave
    */
    Client.prototype.joinWebBeta = function (join) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (join) { return WAPI.joinWebBeta(join); }, join)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     *
     * Start dark mode [NOW GENERALLY AVAILABLE]
     * @param {boolean} activate true to activate dark mode, false to deactivate
    */
    Client.prototype.darkMode = function (activate) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (activate) { return WAPI.darkMode(activate); }, activate)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     *
     * Automatically reject calls on the host account device. Please note that the device that is calling you will continue to ring.
     *
     * Update: Due to the nature of MD, the host account will continue ringing.
     *
     * @param message optional message to send to the calling account when their call is detected and rejected
     */
    Client.prototype.autoReject = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (message) { return WAPI.autoReject(message); }, message)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Returns an array of contacts that have read the message. If the message does not exist, it will return an empty array. If the host account has disabled read receipts this may not work!
     * Each of these contact objects have a property `t` which represents the time at which that contact read the message.
     * @param messageId The message id
     */
    Client.prototype.getMessageReaders = function (messageId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (messageId) { return WAPI.getMessageReaders(messageId); }, messageId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Returns poll data including results and votes.
     *
     * @param messageId The message id of the Poll
     */
    Client.prototype.getPollData = function (messageId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (messageId) { return WAPI.getPollData(messageId); }, messageId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Sends a sticker (including GIF) from a given URL
     * @param to: The recipient id.
     * @param url: The url of the image
     * @param requestConfig {} By default the request is a get request, however you can override that and many other options by sending this parameter. You can read more about this parameter here: https://github.com/axios/axios#request-config
     *
     * @returns `Promise<MessageId | boolean>`
     */
    Client.prototype.sendStickerfromUrl = function (to, url, requestConfig, stickerMetadata) {
        if (requestConfig === void 0) { requestConfig = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var base64;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, tools_1.getDUrl)(url, requestConfig)];
                    case 1:
                        base64 = _a.sent();
                        return [4 /*yield*/, this.sendImageAsSticker(to, base64, stickerMetadata)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * {@license:insiders@}
     *
     * Sends a sticker from a given URL
     * @param to The recipient id.
     * @param url The url of the image
     * @param messageId The id of the message to reply to
     * @param requestConfig {} By default the request is a get request, however you can override that and many other options by sending this parameter. You can read more about this parameter here: https://github.com/axios/axios#request-config
     *
     * @returns `Promise<MessageId | boolean>`
     */
    Client.prototype.sendStickerfromUrlAsReply = function (to, url, messageId, requestConfig, stickerMetadata) {
        if (requestConfig === void 0) { requestConfig = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var dUrl, processingResponse, webpBase64, metadata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, tools_1.getDUrl)(url, requestConfig)];
                    case 1:
                        dUrl = _a.sent();
                        return [4 /*yield*/, this.prepareWebp(dUrl, stickerMetadata)];
                    case 2:
                        processingResponse = _a.sent();
                        if (!processingResponse)
                            return [2 /*return*/, false];
                        webpBase64 = processingResponse.webpBase64, metadata = processingResponse.metadata;
                        return [4 /*yield*/, this.pup(function (_a) {
                                var webpBase64 = _a.webpBase64, to = _a.to, metadata = _a.metadata, messageId = _a.messageId;
                                return WAPI.sendStickerAsReply(webpBase64, to, metadata, messageId);
                            }, { webpBase64: webpBase64, to: to, metadata: metadata, messageId: messageId })];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * {@license:insiders@}
     *
     * This function takes an image and sends it as a sticker to the recipient as a reply to another message.
     *
     *
     * @param to  The recipient id.
     * @param image: [[DataURL]], [[Base64]], URL (string GET), Relative filepath (string), or Buffer of the image
     * @param messageId  The id of the message to reply to
     * @param stickerMetadata  Sticker metadata
     */
    Client.prototype.sendImageAsStickerAsReply = function (to, image, messageId, stickerMetadata) {
        return __awaiter(this, void 0, void 0, function () {
            var relativePath, processingResponse, webpBase64, metadata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!((Buffer.isBuffer(image) || typeof image === 'object' || (image === null || image === void 0 ? void 0 : image.type) === 'Buffer') && image.toString)) return [3 /*break*/, 1];
                        image = image.toString('base64');
                        return [3 /*break*/, 6];
                    case 1:
                        if (!(typeof image === 'string')) return [3 /*break*/, 6];
                        if (!(!(0, tools_1.isDataURL)(image) && !(0, tools_1.isBase64)(image))) return [3 /*break*/, 6];
                        if (!(0, is_url_superb_1["default"])(image)) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, tools_1.getDUrl)(image)];
                    case 2:
                        image = _a.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        relativePath = path.join(path.resolve(process.cwd(), image || ''));
                        if (!(fs.existsSync(image) || fs.existsSync(relativePath))) return [3 /*break*/, 5];
                        return [4 /*yield*/, (0, datauri_1["default"])(fs.existsSync(image) ? image : relativePath)];
                    case 4:
                        image = _a.sent();
                        return [3 /*break*/, 6];
                    case 5: return [2 /*return*/, 'FILE_NOT_FOUND'];
                    case 6: return [4 /*yield*/, this.prepareWebp(image, stickerMetadata)];
                    case 7:
                        processingResponse = _a.sent();
                        if (!processingResponse)
                            return [2 /*return*/, false];
                        webpBase64 = processingResponse.webpBase64, metadata = processingResponse.metadata;
                        return [4 /*yield*/, this.pup(function (_a) {
                                var webpBase64 = _a.webpBase64, to = _a.to, metadata = _a.metadata, messageId = _a.messageId;
                                return WAPI.sendStickerAsReply(webpBase64, to, metadata, messageId);
                            }, { webpBase64: webpBase64, to: to, metadata: metadata, messageId: messageId })];
                    case 8: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * This allows you to get a single property of a single object from the session. This limints the amouunt of data you need to sift through, reduces congestion between your process and the session and the flexibility to build your own specific getters.
     *
     * Example - get message read state (ack):
     *
     * ```javascript
     * const ack  = await client.getSingleProperty('Msg',"true_12345678912@c.us_9C4D0965EA5C09D591334AB6BDB07FEB",'ack')
     * ```
     * @param namespace
     * @param id id of the object to get from the specific namespace
     * @param property the single property key to get from the object.
     * @returns any If the property or the id cannot be found, it will return a 404
     */
    Client.prototype.getSingleProperty = function (namespace, id, property) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var namespace = _a.namespace, id = _a.id, property = _a.property;
                            return WAPI.getSingleProperty(namespace, id, property);
                        }, { namespace: namespace, id: id, property: property })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.stickerServerRequest = function (func, a, fallback) {
        var _a, _b, _c, _d;
        if (a === void 0) { a = {}; }
        if (fallback === void 0) { fallback = false; }
        return __awaiter(this, void 0, void 0, function () {
            var stickerUrl, sessionInfo, key, relativePath, _e, _f, url, data, err_1;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        stickerUrl = this._createConfig.stickerServerEndpoint || (fallback ? pkg.stickerUrl : "https://sticker-api.openwa.dev") || "https://sticker-api.openwa.dev";
                        if (func === 'convertMp4BufferToWebpDataUrl')
                            fallback = true;
                        sessionInfo = this.getSessionInfo();
                        sessionInfo.WA_AUTOMATE_VERSION = sessionInfo.WA_AUTOMATE_VERSION.split(' ')[0];
                        if (!(a.file || a.image || a.emojiId)) return [3 /*break*/, 12];
                        if (!!a.emojiId) return [3 /*break*/, 4];
                        key = a.file ? 'file' : 'image';
                        if (!(!(0, tools_1.isDataURL)(a[key]) && !(0, is_url_superb_1["default"])(a[key]) && !(0, tools_1.isBase64)(a[key]))) return [3 /*break*/, 3];
                        relativePath = path.join(path.resolve(process.cwd(), a[key] || ''));
                        if (!(fs.existsSync(a[key]) || fs.existsSync(relativePath))) return [3 /*break*/, 2];
                        _e = a;
                        _f = key;
                        return [4 /*yield*/, (0, datauri_1["default"])(fs.existsSync(a[key]) ? a[key] : relativePath)];
                    case 1:
                        _e[_f] = _g.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        console.error('FILE_NOT_FOUND');
                        throw new errors_1.CustomError(errors_1.ERROR_NAME.FILE_NOT_FOUND, 'FILE NOT FOUND');
                    case 3:
                        if ((a === null || a === void 0 ? void 0 : a.stickerMetadata) && typeof (a === null || a === void 0 ? void 0 : a.stickerMetadata) !== "object")
                            throw new errors_1.CustomError(errors_1.ERROR_NAME.BAD_STICKER_METADATA, "Received ".concat(typeof (a === null || a === void 0 ? void 0 : a.stickerMetadata), ": ").concat(a === null || a === void 0 ? void 0 : a.stickerMetadata));
                        _g.label = 4;
                    case 4:
                        if ((_a = this._createConfig) === null || _a === void 0 ? void 0 : _a.discord) {
                            a.stickerMetadata = __assign(__assign({}, (a.stickerMetadata || {})), { discord: "".concat(((_b = a.stickerMetadata) === null || _b === void 0 ? void 0 : _b.discord) || this._createConfig.discord) });
                        }
                        _g.label = 5;
                    case 5:
                        _g.trys.push([5, 7, , 11]);
                        url = "".concat(stickerUrl.replace(/\/$/, ''), "/").concat(func);
                        logging_1.log.info("Requesting sticker from ".concat(url));
                        return [4 /*yield*/, axios_1["default"].post(url, __assign(__assign({}, a), { sessionInfo: sessionInfo, config: this.getConfig() }), {
                                maxBodyLength: 20000000,
                                maxContentLength: 1500000 // 1.5mb response body limit
                            })];
                    case 6:
                        data = (_g.sent()).data;
                        return [2 /*return*/, data];
                    case 7:
                        err_1 = _g.sent();
                        if (!(err_1 === null || err_1 === void 0 ? void 0 : err_1.message.includes("maxContentLength size"))) return [3 /*break*/, 8];
                        throw new errors_1.CustomError(errors_1.ERROR_NAME.STICKER_TOO_LARGE, err_1 === null || err_1 === void 0 ? void 0 : err_1.message);
                    case 8:
                        if (!!fallback) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.stickerServerRequest(func, a, true)];
                    case 9: return [2 /*return*/, _g.sent()];
                    case 10:
                        console.error((_c = err_1 === null || err_1 === void 0 ? void 0 : err_1.response) === null || _c === void 0 ? void 0 : _c.status, (_d = err_1 === null || err_1 === void 0 ? void 0 : err_1.response) === null || _d === void 0 ? void 0 : _d.data);
                        throw err_1;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        console.error("Media is missing from this request");
                        throw new errors_1.CustomError(errors_1.ERROR_NAME.MEDIA_MISSING, "Media is missing from this request");
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    Client.prototype.prepareWebp = function (image, stickerMetadata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ((0, tools_1.isDataURL)(image) && !image.includes("image")) {
                            console.error("Not an image. Please use convertMp4BufferToWebpDataUrl to process video stickers");
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.stickerServerRequest('prepareWebp', {
                                image: image,
                                stickerMetadata: stickerMetadata
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * This function takes an image (including animated GIF) and sends it as a sticker to the recipient. This is helpful for sending semi-ephemeral things like QR codes.
     * The advantage is that it will not show up in the recipients gallery. This function automatiicaly converts images to the required webp format.
     * @param to: The recipient id.
     * @param image: [[DataURL]], [[Base64]], URL (string GET), Relative filepath (string), or Buffer of the image
     */
    Client.prototype.sendImageAsSticker = function (to, image, stickerMetadata) {
        return __awaiter(this, void 0, void 0, function () {
            var relativePath, processingResponse, webpBase64, metadata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!((Buffer.isBuffer(image) || typeof image === 'object' || (image === null || image === void 0 ? void 0 : image.type) === 'Buffer') && image.toString)) return [3 /*break*/, 1];
                        image = image.toString('base64');
                        return [3 /*break*/, 6];
                    case 1:
                        if (!(typeof image === 'string')) return [3 /*break*/, 6];
                        if (!(!(0, tools_1.isDataURL)(image) && !(0, tools_1.isBase64)(image))) return [3 /*break*/, 6];
                        if (!(0, is_url_superb_1["default"])(image)) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, tools_1.getDUrl)(image)];
                    case 2:
                        image = _a.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        relativePath = path.join(path.resolve(process.cwd(), image || ''));
                        if (!(fs.existsSync(image) || fs.existsSync(relativePath))) return [3 /*break*/, 5];
                        return [4 /*yield*/, (0, datauri_1["default"])(fs.existsSync(image) ? image : relativePath)];
                    case 4:
                        image = _a.sent();
                        return [3 /*break*/, 6];
                    case 5: return [2 /*return*/, 'FILE_NOT_FOUND'];
                    case 6: return [4 /*yield*/, this.prepareWebp(image, stickerMetadata)];
                    case 7:
                        processingResponse = _a.sent();
                        if (!processingResponse)
                            return [2 /*return*/, false];
                        webpBase64 = processingResponse.webpBase64, metadata = processingResponse.metadata;
                        return [4 /*yield*/, this.pup(function (_a) {
                                var webpBase64 = _a.webpBase64, to = _a.to, metadata = _a.metadata;
                                return WAPI.sendImageAsSticker(webpBase64, to, metadata);
                            }, { webpBase64: webpBase64, to: to, metadata: metadata })];
                    case 8: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Use this to send an mp4 file as a sticker. This can also be used to convert GIFs from the chat because GIFs in WA are actually tiny mp4 files.
     *
     * @param to ChatId The chat id you want to send the webp sticker to
     * @param file [[DataURL]], [[Base64]], URL (string GET), Relative filepath (string), or Buffer of the mp4 file
     * @param messageId message id of the message you want this sticker to reply to. @license:insiders@
     */
    Client.prototype.sendMp4AsSticker = function (to, file, processOptions, stickerMetadata, messageId) {
        if (processOptions === void 0) { processOptions = media_1.defaultProcessOptions; }
        return __awaiter(this, void 0, void 0, function () {
            var relativePath, convertedStickerDataUrl, error_6, msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //@ts-ignore
                        if ((Buffer.isBuffer(file) || typeof file === 'object' || (file === null || file === void 0 ? void 0 : file.type) === 'Buffer') && file.toString) {
                            file = file.toString('base64');
                        }
                        if (!(typeof file === 'string')) return [3 /*break*/, 5];
                        if (!(!(0, tools_1.isDataURL)(file) && !(0, tools_1.isBase64)(file))) return [3 /*break*/, 5];
                        if (!(0, is_url_superb_1["default"])(file)) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, tools_1.getDUrl)(file)];
                    case 1:
                        file = _a.sent();
                        return [3 /*break*/, 5];
                    case 2:
                        relativePath = path.join(path.resolve(process.cwd(), file || ''));
                        if (!(fs.existsSync(file) || fs.existsSync(relativePath))) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0, datauri_1["default"])(fs.existsSync(file) ? file : relativePath)];
                    case 3:
                        file = _a.sent();
                        return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, 'FILE_NOT_FOUND'];
                    case 5: return [4 /*yield*/, this.stickerServerRequest('convertMp4BufferToWebpDataUrl', {
                            file: file,
                            processOptions: processOptions,
                            stickerMetadata: stickerMetadata
                        })];
                    case 6:
                        convertedStickerDataUrl = _a.sent();
                        _a.label = 7;
                    case 7:
                        _a.trys.push([7, 9, , 10]);
                        if (!convertedStickerDataUrl)
                            return [2 /*return*/, false];
                        return [4 /*yield*/, (messageId && this._createConfig.licenseKey)];
                    case 8: return [2 /*return*/, (_a.sent()) ? this.sendRawWebpAsStickerAsReply(to, messageId, convertedStickerDataUrl, true) : this.sendRawWebpAsSticker(to, convertedStickerDataUrl, true)];
                    case 9:
                        error_6 = _a.sent();
                        msg = 'Stickers have to be less than 1MB. Please lower the fps or shorten the duration using the processOptions parameter: https://open-wa.github.io/wa-automate-nodejs/classes/client.html#sendmp4assticker';
                        console.log(msg);
                        logging_1.log.warn(msg);
                        throw new errors_1.CustomError(errors_1.ERROR_NAME.STICKER_TOO_LARGE, msg);
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Send a discord emoji to a chat as a sticker
     *
     * @param to ChatId The chat id you want to send the webp sticker to
     * @param emojiId The discord emoji id without indentifying chars. In discord you would write `:who:`, here use `who`
     * @param messageId message id of the message you want this sticker to reply to. @license:insiders@
     */
    Client.prototype.sendEmoji = function (to, emojiId, messageId) {
        return __awaiter(this, void 0, void 0, function () {
            var webp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.stickerServerRequest('emoji', {
                            emojiId: emojiId
                        })];
                    case 1:
                        webp = _a.sent();
                        if (!webp) return [3 /*break*/, 5];
                        if (!messageId) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.sendRawWebpAsStickerAsReply(to, messageId, webp, true)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, this.sendRawWebpAsSticker(to, webp, true)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * You can use this to send a raw webp file.
     * @param to ChatId The chat id you want to send the webp sticker to
     * @param webpBase64 Base64 The base64 string of the webp file. Not DataURl
     * @param animated Boolean Set to true if the webp is animated. Default `false`
     */
    Client.prototype.sendRawWebpAsSticker = function (to, webpBase64, animated) {
        if (animated === void 0) { animated = false; }
        return __awaiter(this, void 0, void 0, function () {
            var metadata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        metadata = {
                            format: 'webp',
                            width: 512,
                            height: 512,
                            animated: animated
                        };
                        webpBase64 = webpBase64.replace(/^data:image\/(png|gif|jpeg|webp|octet-stream);base64,/, '');
                        return [4 /*yield*/, this.pup(function (_a) {
                                var webpBase64 = _a.webpBase64, to = _a.to, metadata = _a.metadata;
                                return WAPI.sendImageAsSticker(webpBase64, to, metadata);
                            }, { webpBase64: webpBase64, to: to, metadata: metadata })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * {@license:insiders@}
     *
     * You can use this to send a raw webp file.
     * @param to ChatId The chat id you want to send the webp sticker to
     * @param messageId MessageId Message ID of the message to reply to
     * @param webpBase64 Base64 The base64 string of the webp file. Not DataURl
     * @param animated Boolean Set to true if the webp is animated. Default `false`
     */
    Client.prototype.sendRawWebpAsStickerAsReply = function (to, messageId, webpBase64, animated) {
        if (animated === void 0) { animated = false; }
        return __awaiter(this, void 0, void 0, function () {
            var metadata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        metadata = {
                            format: 'webp',
                            width: 512,
                            height: 512,
                            animated: animated
                        };
                        webpBase64 = webpBase64.replace(/^data:image\/(png|gif|jpeg|webp);base64,/, '');
                        return [4 /*yield*/, this.pup(function (_a) {
                                var webpBase64 = _a.webpBase64, to = _a.to, metadata = _a.metadata, messageId = _a.messageId;
                                return WAPI.sendStickerAsReply(webpBase64, to, metadata, messageId);
                            }, { webpBase64: webpBase64, to: to, metadata: metadata, messageId: messageId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * {@license:insiders@}
     *
     * Turn the ephemeral setting in a chat to on or off
     * @param chatId The ID of the chat
     * @param ephemeral `true` to turn on the ephemeral setting to 1 day, `false` to turn off the ephemeral setting. Other options: `604800 | 7776000`
     * @returns `Promise<boolean>` true if the setting was set, `false` if the chat does not exist
     */
    Client.prototype.setChatEphemeral = function (chatId, ephemeral) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var chatId = _a.chatId, ephemeral = _a.ephemeral;
                            return WAPI.setChatEphemeral(chatId, ephemeral);
                        }, { chatId: chatId, ephemeral: ephemeral })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Send a giphy GIF as an animated sticker.
     * @param to ChatId
     * @param giphyMediaUrl URL | string This is the giphy media url and has to be in the format `https://media.giphy.com/media/RJKHjCAdsAfQPn03qQ/source.gif` or it can be just the id `RJKHjCAdsAfQPn03qQ`
     */
    Client.prototype.sendGiphyAsSticker = function (to, giphyMediaUrl) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var to = _a.to, giphyMediaUrl = _a.giphyMediaUrl;
                            return WAPI.sendGiphyAsSticker(to, giphyMediaUrl);
                        }, { to: to, giphyMediaUrl: giphyMediaUrl })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * {@license:restricted@}
     *
     * Sends a formatted text story.
     * @param text The text to be displayed in the story
     * @param textRgba The colour of the text in the story in hex format, make sure to add the alpha value also. E.g "#FF00F4F2"
     * @param backgroundRgba  The colour of the background in the story in hex format, make sure to add the alpha value also. E.g "#4FF31FF2"
     * @param font The font of the text to be used in the story. This has to be a number. Each number refers to a specific predetermined font. Here are the fonts you can choose from:
     * 0: Sans Serif
     * 1: Serif
     * 2: [Norican Regular](https://fonts.google.com/specimen/Norican)
     * 3: [Bryndan Write](https://www.dafontfree.net/freefonts-bryndan-write-f160189.htm)
     * 4: [Bebasneue Regular](https://www.dafont.com/bebas-neue.font)
     * 5: [Oswald Heavy](https://www.fontsquirrel.com/fonts/oswald)
     * @returns `Promise<string | boolean>` returns status id if it worked, false if it didn't
     */
    Client.prototype.postTextStatus = function (text, textRgba, backgroundRgba, font) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var text = _a.text, textRgba = _a.textRgba, backgroundRgba = _a.backgroundRgba, font = _a.font;
                            return WAPI.postTextStatus(text, textRgba, backgroundRgba, font);
                        }, { text: text, textRgba: textRgba, backgroundRgba: backgroundRgba, font: font })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * {@license:restricted@}
     *
     * Sends a formatted text story with a thumbnail.
     * @param url The URL to share in the story
     * @param text The text to be displayed in the story
     * @param textRgba The colour of the text in the story in hex format, make sure to add the alpha value also. E.g "#FF00F4F2"
     * @param backgroundRgba  The colour of the background in the story in hex format, make sure to add the alpha value also. E.g "#4FF31FF2"
     * @param font The font of the text to be used in the story. This has to be a number. Each number refers to a specific predetermined font. Here are the fonts you can choose from:
     * @param thumbnail base64 thumbnail override, if not provided the link server will try to figure it out.
     * 0: Sans Serif
     * 1: Serif
     * 2: [Norican Regular](https://fonts.google.com/specimen/Norican)
     * 3: [Bryndan Write](https://www.dafontfree.net/freefonts-bryndan-write-f160189.htm)
     * @returns `Promise<MessageId>` returns status id if it worked, false if it didn't
     */
    Client.prototype.postThumbnailStatus = function (url, text, textRgba, backgroundRgba, font, thumbnail) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var linkData, thumb, error_7, title, description;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        thumb = thumbnail;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, axios_1["default"].get("".concat(((_a = this._createConfig) === null || _a === void 0 ? void 0 : _a.linkParser) || "https://link.openwa.cloud/api", "?url=").concat(url))];
                    case 2:
                        linkData = (_b.sent()).data;
                        logging_1.log.info("Got link data");
                        if (!!thumbnail) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0, tools_1.getDUrl)(linkData.image)];
                    case 3:
                        thumb = _b.sent();
                        _b.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_7 = _b.sent();
                        console.error(error_7);
                        return [3 /*break*/, 6];
                    case 6:
                        title = linkData.title, description = linkData.description;
                        return [4 /*yield*/, this.pup(function (_a) {
                                var thumb = _a.thumb, url = _a.url, title = _a.title, description = _a.description, text = _a.text, textRgba = _a.textRgba, backgroundRgba = _a.backgroundRgba, font = _a.font;
                                return WAPI.sendStoryWithThumb(thumb, url, title, description, text, textRgba, backgroundRgba, font);
                            }, { thumb: thumb, url: url, title: title, description: description, text: text, textRgba: textRgba, backgroundRgba: backgroundRgba, font: font })];
                    case 7: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    /**
     * {@license:restricted@}
     *
     * Posts an image story.
     * @param data data url string `data:[<MIME-type>][;charset=<encoding>][;base64],<data>`
     * @param caption The caption for the story
     * @returns `Promise<string | boolean>` returns status id if it worked, false if it didn't
     */
    Client.prototype.postImageStatus = function (data, caption) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var data = _a.data, caption = _a.caption;
                            return WAPI.postImageStatus(data, caption);
                        }, { data: data, caption: caption })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * {@license:restricted@}
     *
     * Posts a video story.
     * @param data data url string `data:[<MIME-type>][;charset=<encoding>][;base64],<data>`
     * @param caption The caption for the story
     * @returns `Promise<string | boolean>` returns status id if it worked, false if it didn't
     */
    Client.prototype.postVideoStatus = function (data, caption) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var data = _a.data, caption = _a.caption;
                            return WAPI.postVideoStatus(data, caption);
                        }, { data: data, caption: caption })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * {@license:restricted@}
     *
     * Consumes a list of id strings of stories to delete.
     *
     * @param statusesToDelete string [] | string an array of ids of stories to delete.
     * @returns boolean. True if it worked.
     */
    Client.prototype.deleteStory = function (statusesToDelete) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var statusesToDelete = _a.statusesToDelete;
                            return WAPI.deleteStatus(statusesToDelete);
                        }, { statusesToDelete: statusesToDelete })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Alias for deleteStory
     */
    Client.prototype.deleteStatus = function (statusesToDelete) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.deleteStory(statusesToDelete)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * {@license:restricted@}
     *
     * Deletes all your existing stories.
     * @returns boolean. True if it worked.
     */
    Client.prototype.deleteAllStories = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function () { return WAPI.deleteAllStatus(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Alias for deleteStory
     */
    Client.prototype.deleteAllStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.deleteAllStories()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * {@license:restricted@}
     *
     * Retrieves all existing stories.
     *
     * Only works with a Story License Key
     */
    Client.prototype.getMyStoryArray = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function () { return WAPI.getMyStatusArray(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Alias for deleteStory
     */
    Client.prototype.getMyStatusArray = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getMyStoryArray()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * {@license:restricted@}
     *
     * Retrieves an array of user ids that have 'read' your story.
     *
     * @param id string The id of the story
     *
     */
    Client.prototype.getStoryViewers = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var id = _a.id;
                            return WAPI.getStoryViewers(id);
                        }, { id: id })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Clears all chats of all messages. This does not delete chats. Please be careful with this as it will remove all messages from whatsapp web and the host device. This feature is great for privacy focussed bots.
     *
     * @param ts number A chat that has had a message after ts (epoch timestamp) will not be cleared.
     *
     */
    Client.prototype.clearAllChats = function (ts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var ts = _a.ts;
                            return WAPI.clearAllChats(ts);
                        }, { ts: ts })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * This simple function halves the amount of messages in your session message cache. This does not delete messages off your phone. If over a day you've processed 4000 messages this will possibly result in 4000 messages being present in your session.
     * Calling this method will cut the message cache to 2000 messages, therefore reducing the memory usage of your process.
     * You should use this in conjunction with `getAmountOfLoadedMessages` to intelligently control the session message cache.
     */
    Client.prototype.cutMsgCache = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function () { return WAPI.cutMsgCache(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * This simple function halves the amount of chats in your session message cache. This does not delete messages off your phone. If over a day you've processed 4000 messages this will possibly result in 4000 messages being present in your session.
     * Calling this method will cut the message cache as much as possible, reducing the memory usage of your process.
     * You should use this in conjunction with `getAmountOfLoadedMessages` to intelligently control the session message cache.
     */
    Client.prototype.cutChatCache = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function () { return WAPI.cutChatCache(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Deletes chats from a certain index (default 1000). E.g if this startingFrom param is `100` then all chats from index `100` onwards will be deleted.
     *
     * @param startingFrom the chat index to start from. Please do not set this to anything less than 10 @default: `1000`
     */
    Client.prototype.deleteStaleChats = function (startingFrom) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var startingFrom = _a.startingFrom;
                            return WAPI.deleteStaleChats(startingFrom);
                        }, { startingFrom: startingFrom })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Download profile pics from the message object.
     * ```javascript
     *  const filename = `profilepic_${message.from}.jpeg`;
     *  const data = await client.downloadProfilePicFromMessage(message);
     *  const dataUri = `data:image/jpeg;base64,${data}`;
     *  fs.writeFile(filename, mData, 'base64', function(err) {
     *    if (err) {
     *      return console.log(err);
     *    }
     *    console.log('The file was saved!');
     *  });
     * ```
     */
    Client.prototype.downloadProfilePicFromMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.downloadFileWithCredentials(message.sender.profilePicThumbObj.imgFull)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Download via the browsers authenticated session via URL.
     * @returns base64 string (non-data url)
     */
    Client.prototype.downloadFileWithCredentials = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!url)
                            throw new errors_1.CustomError(errors_1.ERROR_NAME.MISSING_URL, 'Missing URL');
                        return [4 /*yield*/, this.pup(function (_a) {
                                var url = _a.url;
                                return WAPI.downloadFileWithCredentials(url);
                            }, { url: url })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     *
     * Sets the profile pic of the host number.
     * @param data string data url image string.
     * @returns `Promise<boolean>` success if true
     */
    Client.prototype.setProfilePic = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pup(function (_a) {
                            var data = _a.data;
                            return WAPI.setProfilePic(data);
                        }, { data: data })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retreives an array of webhook objects
     */
    Client.prototype.listWebhooks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this._registeredWebhooks ? Object.keys(this._registeredWebhooks).map(function (id) { return _this._registeredWebhooks[id]; }).map(function (_a) {
                        var 
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        requestConfig = _a.requestConfig, rest = __rest(_a, ["requestConfig"]);
                        return rest;
                    }) : []];
            });
        });
    };
    /**
     * Removes a webhook.
     *
     * Returns `true` if the webhook was found and removed. `false` if the webhook was not found and therefore could not be removed. This does not unregister any listeners off of other webhooks.
     *
     *
     * @param webhookId The ID of the webhook
     * @retruns boolean
     */
    Client.prototype.removeWebhook = function (webhookId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this._registeredWebhooks[webhookId]) {
                    delete this._registeredWebhooks[webhookId];
                    return [2 /*return*/, true]; //`Webhook for ${simpleListener} removed`
                }
                return [2 /*return*/, false]; //`Webhook for ${simpleListener} not found`
            });
        });
    };
    /**
     * Update registered events for a specific webhook. This will override all existing events. If you'd like to remove all listeners from a webhook, consider using [[removeWebhook]].
     *
     * In order to update authentication details for a webhook, remove it completely and then reregister it with the correct credentials.
     */
    Client.prototype.updateWebhook = function (webhookId, events) {
        return __awaiter(this, void 0, void 0, function () {
            var validListeners, _a, 
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            requestConfig, rest;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (events === "all")
                            events = Object.keys(events_2.SimpleListener).map(function (eventKey) { return events_2.SimpleListener[eventKey]; });
                        if (!Array.isArray(events))
                            events = [events];
                        return [4 /*yield*/, this._setupWebhooksOnListeners(events)];
                    case 1:
                        validListeners = _b.sent();
                        if (this._registeredWebhooks[webhookId]) {
                            this._registeredWebhooks[webhookId].events = validListeners;
                            _a = this._registeredWebhooks[webhookId], requestConfig = _a.requestConfig, rest = __rest(_a, ["requestConfig"]);
                            return [2 /*return*/, rest];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * The client can now automatically handle webhooks. Use this method to register webhooks.
     *
     * @param event use [[SimpleListener]] enum
     * @param url The webhook url
     * @param requestConfig {} By default the request is a post request, however you can override that and many other options by sending this parameter. You can read more about this parameter here: https://github.com/axios/axios#request-config
     * @param concurrency the amount of concurrent requests to be handled by the built in queue. Default is 5.
     */
    // public async registerWebhook(event: SimpleListener, url: string, requestConfig: AxiosRequestConfig = {}, concurrency: number = 5) {
    //   if(!this._webhookQueue) this._webhookQueue = new PQueue({ concurrency });
    //   if(this[event]){
    //     if(!this._registeredWebhooks) this._registeredWebhooks={};
    //     if(this._registeredWebhooks[event]) {
    //       console.log('webhook already registered');
    //       return false;
    //     }
    //     this._registeredWebhooks[event] = this[event](async _data=>await this._webhookQueue.add(async () => await axios({
    //       method: 'post',
    //       url,
    //       data: {
    //       ts: Date.now(),
    //       event,
    //       data:_data
    //       },
    //       ...requestConfig
    //     })));
    //     return this._registeredWebhooks[event];
    //   }
    //   console.log('Invalid lisetner', event);
    //   return false;
    // }
    Client.prototype._setupWebhooksOnListeners = function (events) {
        return __awaiter(this, void 0, void 0, function () {
            var validListeners;
            var _this = this;
            return __generator(this, function (_a) {
                if (events === "all")
                    events = Object.keys(events_2.SimpleListener).map(function (eventKey) { return events_2.SimpleListener[eventKey]; });
                if (!Array.isArray(events))
                    events = [events];
                if (!this._registeredWebhookListeners)
                    this._registeredWebhookListeners = {};
                if (!this._registeredWebhooks)
                    this._registeredWebhooks = {};
                validListeners = [];
                events.map(function (event) {
                    if (!event.startsWith("on"))
                        event = "on".concat(event);
                    if (_this[event]) {
                        validListeners.push(event);
                        if (_this._registeredWebhookListeners[event] === undefined) {
                            //set it up
                            _this._registeredWebhookListeners[event] = _this[event](function (_data) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this._webhookQueue.add(function () { return __awaiter(_this, void 0, void 0, function () {
                                                var _this = this;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, Promise.all(__spreadArray([], Object.keys(this._registeredWebhooks).map(function (webhookId) { return _this._registeredWebhooks[webhookId]; }).filter(function (webhookEntry) { return webhookEntry.events.includes(event); }), true).map(function (_a) {
                                                                var id = _a.id, url = _a.url, requestConfig = _a.requestConfig;
                                                                var whStart = (0, tools_1.now)();
                                                                return (0, axios_1["default"])(__assign({ method: 'post', url: url, data: _this.prepEventData(_data, event, { webhook_id: id }) }, requestConfig))
                                                                    .then(function (_a) {
                                                                    var status = _a.status;
                                                                    var t = ((0, tools_1.now)() - whStart).toFixed(0);
                                                                    logging_1.log.info("Client Webhook", event, status, t);
                                                                })["catch"](function (err) { return logging_1.log.error("CLIENT WEBHOOK ERROR: ", url, err.message); });
                                                            }))];
                                                        case 1: return [2 /*return*/, _a.sent()];
                                                    }
                                                });
                                            }); })];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); }, 10000);
                        }
                    }
                });
                return [2 /*return*/, validListeners];
            });
        });
    };
    /**
     * The client can now automatically handle webhooks. Use this method to register webhooks.
     *
     * @param url The webhook url
     * @param events An array of [[SimpleListener]] enums or `all` (to register all possible listeners)
     * @param requestConfig {} By default the request is a post request, however you can override that and many other options by sending this parameter. You can read more about this parameter here: https://github.com/axios/axios#request-config
     * @param concurrency the amount of concurrent requests to be handled by the built in queue. Default is 5.
     * @returns A webhook object. This will include a webhook ID and an array of all successfully registered Listeners.
     */
    Client.prototype.registerWebhook = function (url, events, requestConfig, concurrency) {
        if (requestConfig === void 0) { requestConfig = {}; }
        if (concurrency === void 0) { concurrency = 5; }
        return __awaiter(this, void 0, void 0, function () {
            var validListeners, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._webhookQueue)
                            this._webhookQueue = new p_queue_1["default"]({ concurrency: concurrency });
                        return [4 /*yield*/, this._setupWebhooksOnListeners(events)];
                    case 1:
                        validListeners = _a.sent();
                        id = (0, uuid_1.v4)();
                        if (validListeners.length) {
                            this._registeredWebhooks[id] = {
                                id: id,
                                ts: Date.now(),
                                url: url,
                                events: validListeners,
                                requestConfig: requestConfig
                            };
                            return [2 /*return*/, this._registeredWebhooks[id]];
                        }
                        console.log('Invalid listener(s)', events);
                        logging_1.log.warn('Invalid listener(s)', events);
                        return [2 /*return*/, false];
                }
            });
        });
    };
    Client.prototype.prepEventData = function (data, event, extras) {
        var sessionId = this.getSessionId();
        return __assign({ ts: Date.now(), sessionId: sessionId, id: (0, uuid_1.v4)(), event: event, data: data }, extras);
    };
    Client.prototype.getEventSignature = function (simpleListener) {
        return "".concat(simpleListener || '**', ".").concat(this._createConfig.sessionId || 'session', ".").concat(this._sessionInfo.INSTANCE_ID);
    };
    Client.prototype.registerEv = function (simpleListener) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this[simpleListener]) return [3 /*break*/, 2];
                        if (!this._registeredEvListeners)
                            this._registeredEvListeners = {};
                        if (this._registeredEvListeners[simpleListener]) {
                            console.log('Listener already registered');
                            logging_1.log.warn('Listener already registered');
                            return [2 /*return*/, false];
                        }
                        _a = this._registeredEvListeners;
                        _b = simpleListener;
                        return [4 /*yield*/, this[simpleListener](function (data) { return events_1.ev.emit(_this.getEventSignature(simpleListener), _this.prepEventData(data, simpleListener)); })];
                    case 1:
                        _a[_b] = _c.sent();
                        return [2 /*return*/, true];
                    case 2:
                        console.log('Invalid lisetner', simpleListener);
                        logging_1.log.warn('Invalid lisetner', simpleListener);
                        return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * Every time this is called, it returns one less number. This is used to sort out queue priority.
     */
    Client.prototype.tickPriority = function () {
        this._prio = this._prio - 1;
        return this._prio;
    };
    /**
     * Get the INSTANCE_ID of the current session
     */
    Client.prototype.getInstanceId = function () {
        return this._sessionInfo.INSTANCE_ID;
    };
    /**
     * Returns a new message collector for the chat which is related to the first parameter c
     * @param c The Mesasge/Chat or Chat Id to base this message colletor on
     * @param filter A function that consumes a [Message] and returns a boolean which determines whether or not the message shall be collected.
     * @param options The options for the collector. For example, how long the collector shall run for, how many messages it should collect, how long between messages before timing out, etc.
     */
    Client.prototype.createMessageCollector = function (c, filter, options) {
        var _a;
        var chatId = (((_a = c === null || c === void 0 ? void 0 : c.chat) === null || _a === void 0 ? void 0 : _a.id) || (c === null || c === void 0 ? void 0 : c.id) || c);
        return new MessageCollector_1.MessageCollector(this.getSessionId(), this.getInstanceId(), chatId, filter, options, events_1.ev);
    };
    /**
     * [FROM DISCORDJS]
     * Similar to createMessageCollector but in promise form.
     * Resolves with a collection of messages that pass the specified filter.
     * @param c The Mesasge/Chat or Chat Id to base this message colletor on
     * @param {CollectorFilter} filter The filter function to use
     * @param {AwaitMessagesOptions} [options={}] Optional options to pass to the internal collector
     * @returns {Promise<Collection<string, Message>>}
     * @example
     * ```javascript
     * // Await !vote messages
     * const filter = m => m.body.startsWith('!vote');
     * // Errors: ['time'] treats ending because of the time limit as an error
     * channel.awaitMessages(filter, { max: 4, time: 60000, errors: ['time'] })
     *   .then(collected => console.log(collected.size))
     *   .catch(collected => console.log(`After a minute, only ${collected.size} out of 4 voted.`));
     * ```
     */
    Client.prototype.awaitMessages = function (c, filter, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return new Promise(function (resolve, reject) {
            var collector = _this.createMessageCollector(c, filter, options);
            collector.once('end', function (collection, reason) {
                if (options.errors && options.errors.includes(reason)) {
                    reject(collection);
                }
                else {
                    resolve(collection);
                }
            });
        });
    };
    /**
     * 处理来自Chatwoot的webhook
     * @param webhookData The webhook payload from Chatwoot
     */
    Client.prototype.handleChatwootWebhook = function (webhookData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // 在这里实现完整的处理逻辑
                        // 例如，可以触发一个内部事件
                        logging_1.log.info("Received chatwoot webhook inside client", webhookData);
                        // @ts-ignore
                        return [4 /*yield*/, this.pup(PUPPETEER_METHODS.handleChatwootWebhook, webhookData)];
                    case 1:
                        // @ts-ignore
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Client;
}());
exports.Client = Client;
var puppeteer_config_2 = require("../config/puppeteer.config");
__createBinding(exports, puppeteer_config_2, "useragent");
