"use strict";
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
exports.__esModule = true;
exports.QRManager = exports.phoneIsOutOfReach = exports.sessionDataInvalid = exports.waitForRipeSession = exports.needsToScan = exports.isAuthenticated = void 0;
var qrcode = require("qrcode-terminal");
var rxjs_1 = require("rxjs");
var events_1 = require("./events");
var initializer_1 = require("./initializer");
var tools_1 = require("../utils/tools");
var browser_1 = require("./browser");
var axios_1 = require("axios");
var logging_1 = require("../logging/logging");
var boxen_1 = require("boxen");
/**
 * isAuthenticated
 * Validates if client is authenticated
 * @returns true if is authenticated, false otherwise
 * @param waPage
 */
var isAuthenticated = function (waPage) { return (0, rxjs_1.race)((0, exports.needsToScan)(waPage), isInsideChat(waPage), (0, exports.sessionDataInvalid)(waPage)).toPromise(); };
exports.isAuthenticated = isAuthenticated;
var needsToScan = function (waPage) {
    return (0, rxjs_1.from)(new Promise(function (resolve) { return __awaiter(void 0, void 0, void 0, function () {
        var elementResult, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Promise.race([
                            waPage.waitForSelector("canvas[aria-label='Scan this QR code to link a device!']", { timeout: 0 })["catch"](function () { }),
                            waPage.waitForSelector("canvas[aria-label]", { timeout: 0 })["catch"](function () { })
                        ])];
                case 1:
                    elementResult = _a.sent();
                    logging_1.log.info("🚀 ~ needsToScan ~ elementResult:", elementResult);
                    resolve(false);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log("needsToScan -> error", error_1);
                    logging_1.log.error("needsToScan -> error", error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }));
};
exports.needsToScan = needsToScan;
var isInsideChat = function (waPage) {
    return (0, rxjs_1.from)(waPage
        .waitForFunction("!!window.WA_AUTHENTICATED || (document.getElementsByClassName('app')[0] && document.getElementsByClassName('app')[0].attributes && !!document.getElementsByClassName('app')[0].attributes.tabindex) || (document.getElementsByClassName('two')[0] && document.getElementsByClassName('two')[0].attributes && !!document.getElementsByClassName('two')[0].attributes.tabindex)", { timeout: 0 })
        .then(function () { return true; }));
};
var isTosBlocked = function (waPage) {
    return (0, rxjs_1.from)(waPage
        .waitForFunction("document.getElementsByTagName(\"html\")[0].classList[0] === 'no-js'", { timeout: 0 })
        .then(function () { return false; }));
};
var waitForRipeSession = function (waPage, waitForRipeSessionTimeout) { return __awaiter(void 0, void 0, void 0, function () {
    var error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, waPage.waitForFunction("window.isRipeSession()", { timeout: (waitForRipeSessionTimeout !== null && waitForRipeSessionTimeout !== void 0 ? waitForRipeSessionTimeout : 5) * 1000, polling: 1000 })];
            case 1:
                _a.sent();
                return [2 /*return*/, true];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, false];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.waitForRipeSession = waitForRipeSession;
var sessionDataInvalid = function (waPage) { return __awaiter(void 0, void 0, void 0, function () {
    var check;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                check = "Object.keys(localStorage).includes(\"old-logout-cred\")";
                return [4 /*yield*/, waPage
                        .waitForFunction(check, { timeout: 0, polling: 'mutation' })
                    // await injectApi(waPage, null, true);
                    // await waPage
                    //   .waitForFunction(
                    //     '!window.getQrPng',
                    //     { timeout: 0, polling: 'mutation' }
                    //   )
                    // await timeout(1000000)
                    //NEED A DIFFERENT WAY TO DETERMINE IF THE SESSION WAS LOGGED OUT!!!!
                    //if the code reaches here it means the browser was refreshed. Nuke the session data and restart `create`
                ];
            case 1:
                _a.sent();
                // await injectApi(waPage, null, true);
                // await waPage
                //   .waitForFunction(
                //     '!window.getQrPng',
                //     { timeout: 0, polling: 'mutation' }
                //   )
                // await timeout(1000000)
                //NEED A DIFFERENT WAY TO DETERMINE IF THE SESSION WAS LOGGED OUT!!!!
                //if the code reaches here it means the browser was refreshed. Nuke the session data and restart `create`
                return [2 /*return*/, 'NUKE'];
        }
    });
}); };
exports.sessionDataInvalid = sessionDataInvalid;
var phoneIsOutOfReach = function (waPage) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, waPage
                    .waitForFunction('document.querySelector("body").innerText.includes("Trying to reach phone")', { timeout: 0, polling: 'mutation' })
                    .then(function () { return true; })["catch"](function () { return false; })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.phoneIsOutOfReach = phoneIsOutOfReach;
var QRManager = /** @class */ (function () {
    function QRManager(config) {
        if (config === void 0) { config = null; }
        this.qrEv = null;
        this.qrNum = 0;
        this.hash = 'START';
        this.config = null;
        this.firstEmitted = false;
        this._internalQrPngLoaded = false;
        this.qrCheck = "document.querySelector(\"canvas[aria-label]\")?document.querySelector(\"canvas[aria-label]\").parentElement.getAttribute(\"data-ref\"):false";
        this.config = config;
        this.setConfig(this.config);
    }
    QRManager.prototype.setConfig = function (config) {
        this.config = config;
        this.qrEvF(this.config);
    };
    QRManager.prototype.qrEvF = function (config) {
        if (config === void 0) { config = this.config; }
        // return new EvEmitter(config.sessionId || 'session', 'qr');
        if (!this.qrEv)
            this.qrEv = new events_1.EvEmitter(config.sessionId || 'session', 'qr');
        return this.qrEv;
    };
    QRManager.prototype.grabAndEmit = function (qrData, waPage, config, spinner) {
        return __awaiter(this, void 0, void 0, function () {
            var isLinkCode, qrEv, t, qrPng, _a, host_1, error_3, lr;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        isLinkCode = qrData.length === 9;
                        this.qrNum++;
                        if (!(config.qrMax && this.qrNum > config.qrMax)) return [3 /*break*/, 2];
                        spinner.info('QR Code limit reached, exiting...');
                        return [4 /*yield*/, (0, browser_1.kill)(waPage, null, true, null, "QR_LIMIT_REACHED")];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        qrEv = this.qrEvF(config);
                        if ((!this.qrNum || this.qrNum == 1) && browser_1.BROWSER_START_TS)
                            spinner.info("First QR: ".concat(Date.now() - browser_1.BROWSER_START_TS, " ms"));
                        if (qrData) {
                            qrEv.emit(qrData, "qrData");
                            if (!config.qrLogSkip) {
                                if (isLinkCode) {
                                    console.log((0, boxen_1["default"])(qrData, { title: "ENTER THIS CODE ON THE HOST ACCOUNT DEVICE: ".concat(config.sessionId), padding: 1, titleAlignment: 'center' }));
                                }
                                else {
                                    qrcode.generate(qrData, { small: true }, function (terminalQrCode) {
                                        console.log((0, boxen_1["default"])(terminalQrCode, { title: config.sessionId, padding: 1, titleAlignment: 'center' }));
                                    });
                                }
                            }
                            else {
                                console.log("New QR Code generated. Not printing in console because qrLogSkip is set to true");
                                logging_1.log.info("New QR Code generated. Not printing in console because qrLogSkip is set to true");
                            }
                        }
                        if (!!this._internalQrPngLoaded) return [3 /*break*/, 4];
                        logging_1.log.info("Waiting for internal QR renderer to load");
                        return [4 /*yield*/, (0, tools_1.timePromise)(function () { return waPage.waitForFunction("window.getQrPng || false", { timeout: 0, polling: 'mutation' }); })];
                    case 3:
                        t = _b.sent();
                        logging_1.log.info("Internal QR renderer loaded in ".concat(t, " ms"));
                        this._internalQrPngLoaded = true;
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 12, , 14]);
                        if (!isLinkCode) return [3 /*break*/, 5];
                        _a = qrData;
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, waPage.evaluate("window.getQrPng()")];
                    case 6:
                        _a = _b.sent();
                        _b.label = 7;
                    case 7:
                        qrPng = _a;
                        if (!qrPng) return [3 /*break*/, 10];
                        qrEv.emit(qrPng);
                        (0, tools_1.processSend)('ready');
                        if (!config.ezqr) return [3 /*break*/, 9];
                        host_1 = 'https://qr.openwa.cloud/';
                        return [4 /*yield*/, axios_1["default"].post(host_1, {
                                value: qrPng,
                                hash: this.hash
                            }).then(function (_a) {
                                var data = _a.data;
                                if (_this.hash === 'START') {
                                    var qrUrl = "".concat(host_1).concat(data);
                                    qrEv.emit(qrUrl, "qrUrl");
                                    console.log("Scan the qr code at ".concat(qrUrl));
                                    logging_1.log.info("Scan the qr code at ".concat(qrUrl));
                                }
                                _this.hash = data;
                            })["catch"](function (e) {
                                console.error(e);
                                _this.hash = 'START';
                            })];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        spinner.info("Something went wrong while retreiving new the QR code but it should not affect the session launch procedure.");
                        _b.label = 11;
                    case 11: return [3 /*break*/, 14];
                    case 12:
                        error_3 = _b.sent();
                        return [4 /*yield*/, waPage.evaluate("window.launchres")];
                    case 13:
                        lr = _b.sent();
                        console.log(lr);
                        logging_1.log.info('smartQr -> error', { lr: lr });
                        spinner.info("Something went wrong while retreiving new the QR code but it should not affect the session launch procedure: ".concat(error_3.message));
                        return [3 /*break*/, 14];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    QRManager.prototype.linkCode = function (waPage, config, spinner) {
        return __awaiter(this, void 0, void 0, function () {
            var evalResult, isAuthed, _hasDefaultStateYet, linkCode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waPage.evaluate("window.Store && window.Store.State")];
                    case 1:
                        evalResult = _a.sent();
                        if (evalResult === false) {
                            console.log('Seems as though you have been TOS_BLOCKed, unable to refresh QR Code. Please see https://github.com/open-wa/wa-automate-nodejs#best-practice for information on how to prevent this from happeing. You will most likely not get a QR Code');
                            logging_1.log.warn('Seems as though you have been TOS_BLOCKed, unable to refresh QR Code. Please see https://github.com/open-wa/wa-automate-nodejs#best-practice for information on how to prevent this from happeing. You will most likely not get a QR Code');
                            if (config.throwErrorOnTosBlock)
                                throw new Error('TOSBLOCK');
                        }
                        return [4 /*yield*/, (0, exports.isAuthenticated)(waPage)];
                    case 2:
                        isAuthed = _a.sent();
                        if (isAuthed)
                            return [2 /*return*/, true];
                        return [4 /*yield*/, waPage.evaluate("!!(window.Store &&  window.Store.State && window.Store.State.Socket)")];
                    case 3:
                        _hasDefaultStateYet = _a.sent();
                        if (!!_hasDefaultStateYet) return [3 /*break*/, 5];
                        //expecting issue, take a screenshot then wait a few seconds before continuing
                        return [4 /*yield*/, (0, tools_1.timeout)(2000)];
                    case 4:
                        //expecting issue, take a screenshot then wait a few seconds before continuing
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        spinner.info('Link Code requested, please use the link code to login from your host account device');
                        return [4 /*yield*/, waPage.evaluate(function (number) { return window['linkCode'](number); }, config === null || config === void 0 ? void 0 : config.linkCode)];
                    case 6:
                        linkCode = _a.sent();
                        spinner === null || spinner === void 0 ? void 0 : spinner.succeed("Link Code please use this to login from your host account device: ".concat(linkCode));
                        return [4 /*yield*/, this.grabAndEmit(linkCode, waPage, config, spinner)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, isInsideChat(waPage).toPromise()];
                    case 8: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    QRManager.prototype.smartQr = function (waPage, config, spinner) {
        return __awaiter(this, void 0, void 0, function () {
            var evalResult, isAuthed, _hasDefaultStateYet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waPage.evaluate("window.Store && window.Store.State")];
                    case 1:
                        evalResult = _a.sent();
                        if (evalResult === false) {
                            console.log('Seems as though you have been TOS_BLOCKed, unable to refresh QR Code. Please see https://github.com/open-wa/wa-automate-nodejs#best-practice for information on how to prevent this from happeing. You will most likely not get a QR Code');
                            logging_1.log.warn('Seems as though you have been TOS_BLOCKed, unable to refresh QR Code. Please see https://github.com/open-wa/wa-automate-nodejs#best-practice for information on how to prevent this from happeing. You will most likely not get a QR Code');
                            if (config.throwErrorOnTosBlock)
                                throw new Error('TOSBLOCK');
                        }
                        return [4 /*yield*/, (0, exports.isAuthenticated)(waPage)];
                    case 2:
                        isAuthed = _a.sent();
                        if (isAuthed)
                            return [2 /*return*/, true];
                        return [4 /*yield*/, waPage.evaluate("!!(window.Store &&  window.Store.State && window.Store.State.Socket)")];
                    case 3:
                        _hasDefaultStateYet = _a.sent();
                        if (!!_hasDefaultStateYet) return [3 /*break*/, 5];
                        //expecting issue, take a screenshot then wait a few seconds before continuing
                        return [4 /*yield*/, (0, tools_1.timeout)(2000)];
                    case 4:
                        //expecting issue, take a screenshot then wait a few seconds before continuing
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                            var funcName, md, gotResult, fn, set;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        funcName = '_smartQr';
                                        md = "MULTI_DEVICE_DETECTED";
                                        gotResult = false;
                                        fn = function (qrData) { return __awaiter(_this, void 0, void 0, function () {
                                            var _a;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0:
                                                        if (qrData.length > 200 && !(config === null || config === void 0 ? void 0 : config.multiDevice)) {
                                                            spinner.fail("Multi-Device detected, please set multiDevice to true in your config or add the --multi-device flag");
                                                            spinner.emit(true, "MD_DETECT");
                                                            return [2 /*return*/, resolve(md)];
                                                        }
                                                        if (!(!gotResult && (qrData === 'QR_CODE_SUCCESS' || qrData === md))) return [3 /*break*/, 2];
                                                        gotResult = true;
                                                        spinner === null || spinner === void 0 ? void 0 : spinner.succeed("QR code scanned. Loading session...");
                                                        _a = resolve;
                                                        return [4 /*yield*/, isInsideChat(waPage).toPromise()];
                                                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                                                    case 2:
                                                        if (!gotResult)
                                                            this.grabAndEmit(qrData, waPage, config, spinner);
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); };
                                        set = function () { return waPage.evaluate(function (_a) {
                                            var funcName = _a.funcName;
                                            //@ts-ignore
                                            return window['smartQr'] ? window["smartQr"](function (obj) { return window[funcName](obj); }) : false;
                                        }, { funcName: funcName }); };
                                        return [4 /*yield*/, waPage.exposeFunction(funcName, function (obj) { return fn(obj); }).then(set)["catch"](function (e) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: 
                                                        //if an error occurs during the qr launcher then take a screenshot.
                                                        return [4 /*yield*/, (0, initializer_1.screenshot)(waPage)];
                                                        case 1:
                                                            //if an error occurs during the qr launcher then take a screenshot.
                                                            _a.sent();
                                                            console.log("qr -> e", e);
                                                            logging_1.log.error("qr -> e", e);
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); })];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, this.emitFirst(waPage, config, spinner)];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                }
            });
        });
    };
    QRManager.prototype.emitFirst = function (waPage, config, spinner) {
        return __awaiter(this, void 0, void 0, function () {
            var firstQr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.firstEmitted)
                            return [2 /*return*/];
                        this.firstEmitted = true;
                        return [4 /*yield*/, waPage.evaluate(this.qrCheck)];
                    case 1:
                        firstQr = _a.sent();
                        return [4 /*yield*/, this.grabAndEmit(firstQr, waPage, config, spinner)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Wait 10 seconds for the qr element to show.
     * If it doesn't show up within 10 seconds then assume the session is authed already or blocked therefore ignore and return promise
     */
    QRManager.prototype.waitFirstQr = function (waPage, config, spinner) {
        return __awaiter(this, void 0, void 0, function () {
            var fqr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waPage.waitForFunction("!!(".concat(this.qrCheck, ")"), {
                            polling: 500,
                            timeout: 10000
                        })["catch"](function () { return false; })];
                    case 1:
                        fqr = _a.sent();
                        if (!fqr) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.emitFirst(waPage, config, spinner)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return QRManager;
}());
exports.QRManager = QRManager;
