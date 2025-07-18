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
exports.kill = exports.injectApi = exports.injectWapi = exports.injectPreApiScripts = exports.addScript = exports.getSessionDataFilePath = exports.invalidateSesssionData = exports.deleteSessionData = exports.initPage = exports.BROWSER_START_TS = void 0;
var path = require("path");
var fs = require("fs/promises");
var readline = require("readline");
var death_1 = require("death");
// import puppeteer from 'puppeteer-extra';
var puppeteer_config_1 = require("../config/puppeteer.config");
var puppeteer_1 = require("puppeteer");
var events_1 = require("./events");
var pico_s3_1 = require("pico-s3");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var puppeteer = require('puppeteer-extra');
var promise_1 = require("terminate/promise");
var logging_1 = require("../logging/logging");
var tools_1 = require("../utils/tools");
var script_preloader_1 = require("./script_preloader");
var patch_manager_1 = require("./patch_manager");
var init_patch_1 = require("./init_patch");
var browser, wapiInjected = false, pageCache = undefined, wapiAttempts = 1;
exports.BROWSER_START_TS = 0;
function initPage(sessionId, config, qrManager, customUserAgent, spinner, _page, skipAuth) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var setupPromises, stealth, waPage, startBrowser, postBrowserLaunchTs, cacheEnabled, blockCrashLogs, blockAssets, block, interceptAuthentication, proxyAddr, quickAuthed, proxy, localPageCacheExists, authCompleteEv_1, sessionjson, _e, _f, _g, _h, error_1, WEB_START_TS, webRes, WEB_END_TS, error_2;
        var _this = this;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    setupPromises = [];
                    return [4 /*yield*/, script_preloader_1.scriptLoader.loadScripts()];
                case 1:
                    _j.sent();
                    if ((config === null || config === void 0 ? void 0 : config.resizable) === undefined || !(config === null || config === void 0 ? void 0 : config.resizable) == false)
                        config.defaultViewport = null;
                    if (!(config === null || config === void 0 ? void 0 : config.useStealth)) return [3 /*break*/, 3];
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('puppeteer-extra-plugin-stealth'); })];
                case 2:
                    stealth = (_j.sent())["default"];
                    puppeteer.use(stealth());
                    _j.label = 3;
                case 3:
                    waPage = _page;
                    if (!!waPage) return [3 /*break*/, 6];
                    spinner === null || spinner === void 0 ? void 0 : spinner.info('Launching Browser');
                    startBrowser = (0, tools_1.now)();
                    return [4 /*yield*/, initBrowser(sessionId, config, spinner)];
                case 4:
                    browser = _j.sent();
                    spinner === null || spinner === void 0 ? void 0 : spinner.info("Browser launched: ".concat(((0, tools_1.now)() - startBrowser).toFixed(0), "ms"));
                    return [4 /*yield*/, getWAPage(browser)];
                case 5:
                    waPage = _j.sent();
                    if (process.stdin.setRawMode && typeof process.stdin.setRawMode == "function") {
                        readline.emitKeypressEvents(process.stdin);
                        process.stdin.setRawMode(true);
                        console.log('Press "s" to take a screenshot. Press "Ctrl+C" to quit.');
                        process.stdin.on('keypress', function (str, key) { return __awaiter(_this, void 0, void 0, function () {
                            var path_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(key.name === 's')) return [3 /*break*/, 2];
                                        path_1 = "./screenshot_".concat(config.sessionId || "session", "_").concat(Date.now(), ".png");
                                        console.log("Taking screenshot: ".concat(path_1, " ..."));
                                        return [4 /*yield*/, waPage.screenshot({ path: path_1 })];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2:
                                        if (key.ctrl && key.name === 'c') {
                                            process.exit();
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    else
                        console.log("Unable to set raw mode on stdin. Keypress events will not be emitted. You cannot take a screenshot by pressing 's' during launch.");
                    _j.label = 6;
                case 6: 
                //@ts-ignore
                return [4 /*yield*/, (typeof waPage._client === 'function' && waPage._client() || waPage._client).send('Network.setBypassServiceWorker', { bypass: true })];
                case 7:
                    //@ts-ignore
                    _j.sent();
                    postBrowserLaunchTs = (0, tools_1.now)();
                    waPage.on("framenavigated", function (frame) { return __awaiter(_this, void 0, void 0, function () {
                        var frameNavPromises, hasWapi, error_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 3, , 4]);
                                    frameNavPromises = [];
                                    // const content = await frame.content() //not using content right now so save some ms by commenting out
                                    logging_1.log.info("FRAME NAV DETECTED, ".concat(frame.url(), ", Reinjecting APIs..."));
                                    return [4 /*yield*/, waPage.evaluate("window.WAPI ? true : false")];
                                case 1:
                                    hasWapi = _a.sent();
                                    if (!hasWapi) {
                                        logging_1.log.info("FN: WAPI missing. Reinjecting APIs...");
                                        frameNavPromises.push(injectApi(waPage, spinner, true));
                                        frameNavPromises.push(qrManager.waitFirstQr(waPage, config, spinner));
                                    }
                                    else
                                        logging_1.log.info("FN: WAPI intact. Skipping reinjection...");
                                    if (frame.url().includes('post_logout=1')) {
                                        console.log("Session most likely logged out");
                                    }
                                    return [4 /*yield*/, Promise.all(frameNavPromises)];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    error_3 = _a.sent();
                                    logging_1.log.error('framenaverr', error_3);
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                    spinner === null || spinner === void 0 ? void 0 : spinner.info('Setting Up Page');
                    if (!(config === null || config === void 0 ? void 0 : config.proxyServerCredentials)) return [3 /*break*/, 9];
                    return [4 /*yield*/, waPage.authenticate(config.proxyServerCredentials)];
                case 8:
                    _j.sent();
                    _j.label = 9;
                case 9:
                    setupPromises.push(waPage.setUserAgent(customUserAgent || puppeteer_config_1.useragent));
                    if ((config === null || config === void 0 ? void 0 : config.defaultViewport) !== null)
                        setupPromises.push(waPage.setViewport({
                            width: ((_a = config === null || config === void 0 ? void 0 : config.viewport) === null || _a === void 0 ? void 0 : _a.width) || puppeteer_config_1.width,
                            height: ((_b = config === null || config === void 0 ? void 0 : config.viewport) === null || _b === void 0 ? void 0 : _b.height) || puppeteer_config_1.height,
                            deviceScaleFactor: 1
                        }));
                    cacheEnabled = (config === null || config === void 0 ? void 0 : config.cacheEnabled) === false ? false : true;
                    blockCrashLogs = (config === null || config === void 0 ? void 0 : config.blockCrashLogs) === false ? false : true;
                    setupPromises.push(waPage.setBypassCSP((config === null || config === void 0 ? void 0 : config.bypassCSP) || false));
                    setupPromises.push(waPage.setCacheEnabled(cacheEnabled));
                    blockAssets = !(config === null || config === void 0 ? void 0 : config.headless) ? false : (config === null || config === void 0 ? void 0 : config.blockAssets) || false;
                    if (!blockAssets) return [3 /*break*/, 11];
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('puppeteer-extra-plugin-block-resources'); })];
                case 10:
                    block = (_j.sent())["default"];
                    puppeteer.use(block({
                        blockedTypes: new Set(['image', 'stylesheet', 'font'])
                    }));
                    _j.label = 11;
                case 11:
                    interceptAuthentication = !(config === null || config === void 0 ? void 0 : config.safeMode);
                    proxyAddr = (config === null || config === void 0 ? void 0 : config.proxyServerCredentials) ? "".concat(((_c = config.proxyServerCredentials) === null || _c === void 0 ? void 0 : _c.protocol) ||
                        config.proxyServerCredentials.address.includes('https') ? 'https' :
                        config.proxyServerCredentials.address.includes('http') ? 'http' :
                            config.proxyServerCredentials.address.includes('socks5h') ? 'socks5h' :
                                config.proxyServerCredentials.address.includes('socks5') ? 'socks5' :
                                    config.proxyServerCredentials.address.includes('socks4') ? 'socks4' : 'http', "://").concat(config.proxyServerCredentials.username, ":").concat(config.proxyServerCredentials.password, "@").concat(config.proxyServerCredentials.address
                        .replace('https', '')
                        .replace('http', '')
                        .replace('socks5h', '')
                        .replace('socks5', '')
                        .replace('socks4', '')
                        .replace('://', '')) : false;
                    quickAuthed = false;
                    if (!proxyAddr) return [3 /*break*/, 13];
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('smashah-puppeteer-page-proxy'); })];
                case 12:
                    proxy = (_j.sent())["default"];
                    _j.label = 13;
                case 13:
                    if (!process.env.WA_LOCAL_PAGE_CACHE) return [3 /*break*/, 16];
                    return [4 /*yield*/, (0, tools_1.pathExists)(process.env.WA_LOCAL_PAGE_CACHE, true)];
                case 14:
                    localPageCacheExists = _j.sent();
                    logging_1.log.info("Local page cache env var set: ".concat(process.env.WA_LOCAL_PAGE_CACHE, " ").concat(localPageCacheExists));
                    if (!localPageCacheExists) return [3 /*break*/, 16];
                    logging_1.log.info("Local page cache file exists. Loading...");
                    return [4 /*yield*/, fs.readFile(process.env.WA_LOCAL_PAGE_CACHE, "utf8")];
                case 15:
                    pageCache = _j.sent();
                    _j.label = 16;
                case 16:
                    if (!(interceptAuthentication || proxyAddr || blockCrashLogs || true)) return [3 /*break*/, 18];
                    return [4 /*yield*/, waPage.setRequestInterception(true)];
                case 17:
                    _j.sent();
                    waPage.on('response', function (response) { return __awaiter(_this, void 0, void 0, function () {
                        var t, error_4;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 4, , 5]);
                                    if (!(response.request().url() == "https://web.whatsapp.com/")) return [3 /*break*/, 3];
                                    return [4 /*yield*/, response.text()];
                                case 1:
                                    t = _a.sent();
                                    if (!(t.includes("class=\"no-js\"") && t.includes("self.") && !pageCache)) return [3 /*break*/, 3];
                                    //this is a valid response, save it for later
                                    pageCache = t;
                                    logging_1.log.info("saving valid page to dumb cache");
                                    if (!process.env.WA_LOCAL_PAGE_CACHE) return [3 /*break*/, 3];
                                    logging_1.log.info("Writing page cache to local file: ".concat(process.env.WA_LOCAL_PAGE_CACHE));
                                    return [4 /*yield*/, fs.writeFile(process.env.WA_LOCAL_PAGE_CACHE, pageCache)];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3: return [3 /*break*/, 5];
                                case 4:
                                    error_4 = _a.sent();
                                    logging_1.log.error("page cache error", error_4);
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); });
                    authCompleteEv_1 = new events_1.EvEmitter(sessionId, 'AUTH');
                    waPage.on('request', function (request) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(request.url() === "https://web.whatsapp.com/" && pageCache && !proxyAddr)) return [3 /*break*/, 2];
                                    //if the pageCache isn't set and this response includes 
                                    logging_1.log.info("reviving page from page cache");
                                    return [4 /*yield*/, request.respond({
                                            status: 200,
                                            body: pageCache
                                        })];
                                case 1: return [2 /*return*/, _a.sent()];
                                case 2:
                                    if (!(interceptAuthentication &&
                                        request.url().includes('_priority_components') &&
                                        !quickAuthed)) return [3 /*break*/, 4];
                                    authCompleteEv_1.emit(true);
                                    return [4 /*yield*/, waPage.evaluate('window.WA_AUTHENTICATED=true;')];
                                case 3:
                                    _a.sent();
                                    quickAuthed = true;
                                    _a.label = 4;
                                case 4:
                                    if (["https://dit.whatsapp.net/deidentified_telemetry", "https://crashlogs.whatsapp.net/"].find(function (u) { return request.url().includes(u); }) && blockCrashLogs) {
                                        request.abort();
                                    }
                                    else if (proxyAddr && !(config === null || config === void 0 ? void 0 : config.useNativeProxy)) {
                                        proxy(request, proxyAddr);
                                    }
                                    else
                                        request["continue"]();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    _j.label = 18;
                case 18:
                    if (!skipAuth) return [3 /*break*/, 19];
                    spinner.info("Skipping Authentication");
                    return [3 /*break*/, 29];
                case 19:
                    /**
                     * AUTH
                     */
                    spinner === null || spinner === void 0 ? void 0 : spinner.info('Loading session data');
                    return [4 /*yield*/, getSessionDataFromFile(sessionId, config, spinner)];
                case 20:
                    sessionjson = _j.sent();
                    if (!(!sessionjson && sessionjson !== "" && config.sessionDataBucketAuth)) return [3 /*break*/, 24];
                    _j.label = 21;
                case 21:
                    _j.trys.push([21, 23, , 24]);
                    spinner === null || spinner === void 0 ? void 0 : spinner.info('Unable to find session data file locally, attempting to find session data in cloud storage..');
                    _f = (_e = JSON).parse;
                    _h = (_g = Buffer).from;
                    return [4 /*yield*/, (0, pico_s3_1.getTextFile)(__assign(__assign({ directory: '_sessionData' }, JSON.parse(Buffer.from(config.sessionDataBucketAuth, 'base64').toString('ascii'))), { filename: "".concat(config.sessionId || 'session', ".data.json") }))];
                case 22:
                    sessionjson = _f.apply(_e, [_h.apply(_g, [_j.sent(), 'base64']).toString('ascii')]);
                    spinner === null || spinner === void 0 ? void 0 : spinner.succeed('Successfully downloaded session data file from cloud storage!');
                    return [3 /*break*/, 24];
                case 23:
                    error_1 = _j.sent();
                    spinner === null || spinner === void 0 ? void 0 : spinner.fail("".concat(error_1 instanceof pico_s3_1.FileNotFoundError ? 'The session data file was not found in the cloud storage bucket' : 'Something went wrong while fetching session data from cloud storage bucket', ". Continuing..."));
                    return [3 /*break*/, 24];
                case 24:
                    if (!(sessionjson && Object.keys(sessionjson).length)) return [3 /*break*/, 27];
                    spinner === null || spinner === void 0 ? void 0 : spinner.info(config.multiDevice ? "multi-device enabled. Session data skipped..." : 'Existing session data detected. Injecting...');
                    if (!!(config === null || config === void 0 ? void 0 : config.multiDevice)) return [3 /*break*/, 26];
                    return [4 /*yield*/, waPage.evaluateOnNewDocument(function (session) {
                            localStorage.clear();
                            Object.keys(session).forEach(function (key) { return localStorage.setItem(key, session[key]); });
                        }, sessionjson)];
                case 25:
                    _j.sent();
                    _j.label = 26;
                case 26:
                    spinner === null || spinner === void 0 ? void 0 : spinner.succeed('Existing session data injected');
                    return [3 /*break*/, 29];
                case 27:
                    if (!(config === null || config === void 0 ? void 0 : config.multiDevice)) return [3 /*break*/, 29];
                    spinner === null || spinner === void 0 ? void 0 : spinner.info("No session data detected. Opting in for MD.");
                    spinner === null || spinner === void 0 ? void 0 : spinner.info("Make sure to keep the session alive for at least 5 minutes after scanning the QR code before trying to restart a session!!");
                    if (!(config === null || config === void 0 ? void 0 : config.legacy)) return [3 /*break*/, 29];
                    return [4 /*yield*/, waPage.evaluateOnNewDocument(function (session) {
                            localStorage.clear();
                            Object.keys(session).forEach(function (key) { return localStorage.setItem(key, session[key]); });
                        }, {
                            "md-opted-in": "true",
                            "MdUpgradeWamFlag": "true",
                            "remember-me": "true"
                        })];
                case 28:
                    _j.sent();
                    _j.label = 29;
                case 29:
                    if (!((config === null || config === void 0 ? void 0 : config.proxyServerCredentials) && !(config === null || config === void 0 ? void 0 : config.useNativeProxy))) return [3 /*break*/, 31];
                    return [4 /*yield*/, proxy(waPage, proxyAddr)];
                case 30:
                    _j.sent();
                    _j.label = 31;
                case 31:
                    if ((_d = config === null || config === void 0 ? void 0 : config.proxyServerCredentials) === null || _d === void 0 ? void 0 : _d.address)
                        spinner.succeed("Active proxy: ".concat(config.proxyServerCredentials.address));
                    return [4 /*yield*/, Promise.all(setupPromises)];
                case 32:
                    _j.sent();
                    spinner === null || spinner === void 0 ? void 0 : spinner.info("Pre page launch setup complete: ".concat(((0, tools_1.now)() - postBrowserLaunchTs).toFixed(0), "ms"));
                    spinner === null || spinner === void 0 ? void 0 : spinner.info('Navigating to WA');
                    _j.label = 33;
                case 33:
                    _j.trys.push([33, 38, , 39]);
                    WEB_START_TS = new Date().getTime();
                    return [4 /*yield*/, waPage.goto(puppeteer_config_1.puppeteerConfig.WAUrl)];
                case 34:
                    webRes = _j.sent();
                    WEB_END_TS = new Date().getTime();
                    return [4 /*yield*/, waPage.exposeFunction("ProgressBarEvent", function (_a) {
                            var value = _a.value, text = _a.text;
                            spinner === null || spinner === void 0 ? void 0 : spinner.info("".concat((value || value === 0) && "".concat(value, "%:\t"), " ").concat(text));
                            spinner === null || spinner === void 0 ? void 0 : spinner.emit({ value: value, text: text }, "internal_launch_progress");
                        })];
                case 35:
                    _j.sent();
                    return [4 /*yield*/, waPage.exposeFunction("CriticalInternalMessage", function (_a) {
                            var value = _a.value, text = _a.text;
                            return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            spinner === null || spinner === void 0 ? void 0 : spinner.info("".concat(text));
                                            spinner === null || spinner === void 0 ? void 0 : spinner.emit({ value: value, text: text }, "critical_internal_message");
                                            if (!(value === "TEMP_BAN" && !(config.killProcessOnBan === false))) return [3 /*break*/, 2];
                                            return [4 /*yield*/, (0, exports.kill)(waPage, undefined, true, undefined, "TEMP_BAN")];
                                        case 1:
                                            _b.sent();
                                            _b.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            });
                        })];
                case 36:
                    _j.sent();
                    return [4 /*yield*/, (0, init_patch_1.injectProgObserver)(waPage)];
                case 37:
                    _j.sent();
                    if (webRes == null) {
                        spinner === null || spinner === void 0 ? void 0 : spinner.info("Page loaded but something may have gone wrong: ".concat(WEB_END_TS - WEB_START_TS, "ms"));
                    }
                    else {
                        spinner === null || spinner === void 0 ? void 0 : spinner.info("Page loaded in ".concat(WEB_END_TS - WEB_START_TS, "ms: ").concat(webRes.status()).concat(webRes.ok() ? '' : ', ' + webRes.statusText()));
                        if (!webRes.ok())
                            spinner === null || spinner === void 0 ? void 0 : spinner.info("Headers Info: ".concat(JSON.stringify(webRes.headers(), null, 2)));
                    }
                    return [3 /*break*/, 39];
                case 38:
                    error_2 = _j.sent();
                    spinner === null || spinner === void 0 ? void 0 : spinner.fail(error_2);
                    throw error_2;
                case 39: return [2 /*return*/, waPage];
            }
        });
    });
}
exports.initPage = initPage;
var getSessionDataFromFile = function (sessionId, config, spinner) { return __awaiter(void 0, void 0, void 0, function () {
    var sessionjsonpath, sessionjson, sd, _a, s, msg;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if ((config === null || config === void 0 ? void 0 : config.sessionData) == "NUKE")
                    return [2 /*return*/, ''
                        //check if [session].json exists in __dirname
                    ];
                return [4 /*yield*/, (0, exports.getSessionDataFilePath)(sessionId, config)];
            case 1:
                sessionjsonpath = _b.sent();
                sessionjson = '';
                sd = process.env["".concat(sessionId.toUpperCase(), "_DATA_JSON")] ? JSON.parse(process.env["".concat(sessionId.toUpperCase(), "_DATA_JSON")]) : config === null || config === void 0 ? void 0 : config.sessionData;
                sessionjson = (typeof sd === 'string' && sd !== "") ? JSON.parse(Buffer.from(sd, 'base64').toString('ascii')) : sd;
                _a = sessionjsonpath && typeof sessionjsonpath == 'string';
                if (!_a) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, tools_1.pathExists)(sessionjsonpath)];
            case 2:
                _a = (_b.sent());
                _b.label = 3;
            case 3:
                if (!_a) return [3 /*break*/, 5];
                spinner.succeed("Found session data file: ".concat(sessionjsonpath));
                return [4 /*yield*/, fs.readFile(sessionjsonpath, "utf8")];
            case 4:
                s = _b.sent();
                try {
                    sessionjson = JSON.parse(s);
                }
                catch (error) {
                    try {
                        sessionjson = JSON.parse(Buffer.from(s, 'base64').toString('ascii'));
                    }
                    catch (error) {
                        msg = "".concat(s == "LOGGED OUT" ? "The session was logged out" : "Session data json file is corrupted", ". Please re-scan the QR code.");
                        if (spinner) {
                            spinner.fail(msg);
                        }
                        else
                            console.error(msg);
                        return [2 /*return*/, false];
                    }
                }
                return [3 /*break*/, 6];
            case 5:
                spinner.succeed("No session data file found for session : ".concat(sessionId));
                _b.label = 6;
            case 6: return [2 /*return*/, sessionjson];
        }
    });
}); };
var deleteSessionData = function (config) { return __awaiter(void 0, void 0, void 0, function () {
    var sessionjsonpath, _a, l, mdDir, _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0: return [4 /*yield*/, (0, exports.getSessionDataFilePath)((config === null || config === void 0 ? void 0 : config.sessionId) || 'session', config)];
            case 1:
                sessionjsonpath = _f.sent();
                _a = typeof sessionjsonpath == 'string';
                if (!_a) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, tools_1.pathExists)(sessionjsonpath)];
            case 2:
                _a = (_f.sent());
                _f.label = 3;
            case 3:
                if (!_a) return [3 /*break*/, 5];
                l = "logout detected, deleting session data file: ".concat(sessionjsonpath);
                console.log(l);
                logging_1.log.info(l);
                return [4 /*yield*/, fs.unlink(sessionjsonpath)];
            case 4:
                _f.sent();
                _f.label = 5;
            case 5: return [4 /*yield*/, (0, tools_1.pathExists)(config['userDataDir'])];
            case 6:
                mdDir = _f.sent();
                if (!(config['userDataDir'] && mdDir)) return [3 /*break*/, 9];
                logging_1.log.info("Deleting MD session directory: ".concat(mdDir));
                return [4 /*yield*/, fs.rm(mdDir, { force: true, recursive: true })];
            case 7:
                _f.sent();
                _c = (_b = logging_1.log).info;
                _e = (_d = "MD directory ".concat(mdDir, " deleted: ")).concat;
                return [4 /*yield*/, (0, tools_1.pathExists)(mdDir, true)];
            case 8:
                _c.apply(_b, [_e.apply(_d, [!(_f.sent())])]);
                _f.label = 9;
            case 9: return [2 /*return*/, true];
        }
    });
}); };
exports.deleteSessionData = deleteSessionData;
var invalidateSesssionData = function (config) { return __awaiter(void 0, void 0, void 0, function () {
    var sessionjsonpath, _a, l;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, exports.getSessionDataFilePath)((config === null || config === void 0 ? void 0 : config.sessionId) || 'session', config)];
            case 1:
                sessionjsonpath = _b.sent();
                _a = typeof sessionjsonpath == 'string';
                if (!_a) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, tools_1.pathExists)(sessionjsonpath)];
            case 2:
                _a = (_b.sent());
                _b.label = 3;
            case 3:
                if (_a) {
                    l = "logout detected, invalidating session data file: ".concat(sessionjsonpath);
                    console.log(l);
                    logging_1.log.info(l);
                    fs.writeFile(sessionjsonpath, "LOGGED OUT");
                }
                return [2 /*return*/, true];
        }
    });
}); };
exports.invalidateSesssionData = invalidateSesssionData;
var getSessionDataFilePath = function (sessionId, config) { return __awaiter(void 0, void 0, void 0, function () {
    var p, sessionjsonpath, altSessionJsonPath, _a;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                p = ((_b = require === null || require === void 0 ? void 0 : require.main) === null || _b === void 0 ? void 0 : _b.path) || ((_c = process === null || process === void 0 ? void 0 : process.mainModule) === null || _c === void 0 ? void 0 : _c.path);
                sessionjsonpath = ((config === null || config === void 0 ? void 0 : config.sessionDataPath) && (config === null || config === void 0 ? void 0 : config.sessionDataPath.includes('.data.json'))) ? path.join(path.resolve(process.cwd(), (config === null || config === void 0 ? void 0 : config.sessionDataPath) || '')) : path.join(path.resolve(process.cwd(), (config === null || config === void 0 ? void 0 : config.sessionDataPath) || ''), "".concat(sessionId || 'session', ".data.json"));
                altSessionJsonPath = p ? ((config === null || config === void 0 ? void 0 : config.sessionDataPath) && (config === null || config === void 0 ? void 0 : config.sessionDataPath.includes('.data.json'))) ? path.join(path.resolve(p, (config === null || config === void 0 ? void 0 : config.sessionDataPath) || '')) : path.join(path.resolve(p, (config === null || config === void 0 ? void 0 : config.sessionDataPath) || ''), "".concat(sessionId || 'session', ".data.json")) : false;
                if (!(0, tools_1.pathExists)(sessionjsonpath)) return [3 /*break*/, 1];
                return [2 /*return*/, sessionjsonpath];
            case 1:
                _a = p && altSessionJsonPath;
                if (!_a) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, tools_1.pathExists)(altSessionJsonPath)];
            case 2:
                _a = (_d.sent());
                _d.label = 3;
            case 3:
                if (_a) {
                    return [2 /*return*/, altSessionJsonPath];
                }
                _d.label = 4;
            case 4: return [2 /*return*/, false];
        }
    });
}); };
exports.getSessionDataFilePath = getSessionDataFilePath;
var addScript = function (page, js, asScriptTag) { return __awaiter(void 0, void 0, void 0, function () {
    var content, injectResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, script_preloader_1.scriptLoader.getScript(js)];
            case 1:
                content = _a.sent();
                return [4 /*yield*/, (asScriptTag ? page.addScriptTag({ content: content, type: 'text/javascript' }) : page.evaluate(content)["catch"](function (e) { return logging_1.log.error("Injection error: ".concat(js), e); }))];
            case 2:
                injectResult = _a.sent();
                logging_1.log.info("Injection Result of ".concat(js, ": ").concat(injectResult));
                return [2 /*return*/, injectResult];
        }
    });
}); };
exports.addScript = addScript;
// (page: Page, js : string) : Promise<unknown> => page.addScriptTag({
//   path: require.resolve(path.join(__dirname, '../lib', js))
// })
function injectPreApiScripts(page, spinner) {
    return __awaiter(this, void 0, void 0, function () {
        var t1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.evaluate("!['jsSHA','axios', 'QRCode', 'Base64', 'objectHash'].find(x=>!window[x])")];
                case 1:
                    if (_a.sent())
                        return [2 /*return*/];
                    return [4 /*yield*/, (0, tools_1.timePromise)(function () { return Promise.all([
                            //  'jsSha.min.js', //only needed in getFileHash which is not used anymore
                            'qr.min.js',
                            //  'base64.js', //only needed in base64ImageToFile and atob is a fallback
                            'hash.js'
                        ].map(function (js) { return (0, exports.addScript)(page, js); })); })];
                case 2:
                    t1 = _a.sent();
                    spinner === null || spinner === void 0 ? void 0 : spinner.info("Base inject: ".concat(t1, "ms"));
                    return [2 /*return*/, page];
            }
        });
    });
}
exports.injectPreApiScripts = injectPreApiScripts;
function injectWapi(page, spinner, force) {
    if (force === void 0) { force = false; }
    return __awaiter(this, void 0, void 0, function () {
        var tR, bruteInjectionAttempts, check, initCheck, multiScriptInjectPromiseArr, wapi, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Waiting for require...");
                    return [4 /*yield*/, (0, tools_1.timePromise)(function () { return page.waitForFunction('window.require || false', { timeout: 5000, polling: 50 })["catch"](function () { console.log("No require found in frame"); }); })];
                case 1:
                    tR = _a.sent();
                    console.log("Found require: ".concat(tR, "ms"));
                    bruteInjectionAttempts = 1;
                    return [4 /*yield*/, (0, patch_manager_1.earlyInjectionCheck)(page)];
                case 2:
                    _a.sent();
                    check = "window.WAPI && window.Store ? true : false";
                    return [4 /*yield*/, page.evaluate(check)];
                case 3:
                    initCheck = _a.sent();
                    if (initCheck)
                        return [2 /*return*/];
                    logging_1.log.info("WAPI CHECK: ".concat(initCheck));
                    if (!initCheck)
                        force = true;
                    if (wapiInjected && !force)
                        return [2 /*return*/, page];
                    multiScriptInjectPromiseArr = Array(bruteInjectionAttempts).fill("wapi.js").map(function (_s) { return (0, exports.addScript)(page, _s); });
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 8]);
                    return [4 /*yield*/, (0, tools_1.timePromise)(function () { return Promise.all(multiScriptInjectPromiseArr); })];
                case 5:
                    wapi = _a.sent();
                    spinner === null || spinner === void 0 ? void 0 : spinner.info("WAPI inject: ".concat(wapi, "ms"));
                    return [3 /*break*/, 8];
                case 6:
                    error_5 = _a.sent();
                    logging_1.log.error("injectWapi ~ error", error_5.message);
                    return [4 /*yield*/, injectWapi(page, spinner, force)];
                case 7: 
                //one of the injection attempts failed.
                return [2 /*return*/, _a.sent()];
                case 8:
                    spinner === null || spinner === void 0 ? void 0 : spinner.info("Checking session integrity");
                    wapiAttempts++;
                    return [4 /*yield*/, page.waitForFunction(check, { timeout: 3000, polling: 50 })["catch"](function (e) { return false; })];
                case 9:
                    wapiInjected = !!(_a.sent());
                    if (!!wapiInjected) return [3 /*break*/, 11];
                    spinner === null || spinner === void 0 ? void 0 : spinner.info("Session integrity check failed, trying again... ".concat(wapiAttempts));
                    return [4 /*yield*/, injectWapi(page, spinner, true)];
                case 10: return [2 /*return*/, _a.sent()];
                case 11:
                    spinner === null || spinner === void 0 ? void 0 : spinner.info("Session integrity check passed");
                    return [2 /*return*/, page];
            }
        });
    });
}
exports.injectWapi = injectWapi;
function injectApi(page, spinner, force) {
    if (force === void 0) { force = false; }
    return __awaiter(this, void 0, void 0, function () {
        var launch;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spinner === null || spinner === void 0 ? void 0 : spinner.info("Injecting scripts");
                    return [4 /*yield*/, injectPreApiScripts(page, spinner)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, injectWapi(page, spinner, force)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, tools_1.timePromise)(function () { return (0, exports.addScript)(page, 'launch.js'); })];
                case 3:
                    launch = _a.sent();
                    spinner === null || spinner === void 0 ? void 0 : spinner.succeed("Launch inject: ".concat(launch, "ms"));
                    return [2 /*return*/, page];
            }
        });
    });
}
exports.injectApi = injectApi;
function initBrowser(sessionId, config, spinner) {
    var _a, _b, _c;
    if (config === void 0) { config = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var storage, _savedPath, chromeLauncher, browserFetcher, browserDownloadSpinner_1, revisionInfo, error_6, args, proxy, _d, browser, _e, _dt, devtools, uuid, tunnel, _f, l, error_7;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    if (config === null || config === void 0 ? void 0 : config.raspi) {
                        config.executablePath = "/usr/bin/chromium-browser";
                    }
                    if (!((config === null || config === void 0 ? void 0 : config.useChrome) && !(config === null || config === void 0 ? void 0 : config.executablePath))) return [3 /*break*/, 7];
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('node-persist'); })];
                case 1:
                    storage = (_g.sent())["default"];
                    return [4 /*yield*/, storage.init()];
                case 2:
                    _g.sent();
                    return [4 /*yield*/, storage.getItem('executablePath')];
                case 3:
                    _savedPath = _g.sent();
                    if (!!_savedPath) return [3 /*break*/, 6];
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('chrome-launcher'); })];
                case 4:
                    chromeLauncher = _g.sent();
                    config.executablePath = chromeLauncher.Launcher.getInstallations()[0];
                    if (!config.executablePath)
                        delete config.executablePath;
                    return [4 /*yield*/, storage.setItem('executablePath', config.executablePath)];
                case 5:
                    _g.sent();
                    return [3 /*break*/, 7];
                case 6:
                    config.executablePath = _savedPath;
                    _g.label = 7;
                case 7:
                    if (!(config === null || config === void 0 ? void 0 : config.browserRevision)) return [3 /*break*/, 11];
                    browserFetcher = puppeteer.createBrowserFetcher();
                    browserDownloadSpinner_1 = new events_1.Spin(sessionId + '_browser', 'Browser', false, false);
                    _g.label = 8;
                case 8:
                    _g.trys.push([8, 10, , 11]);
                    browserDownloadSpinner_1.start('Downloading browser revision: ' + config.browserRevision);
                    return [4 /*yield*/, browserFetcher.download(config.browserRevision, function (downloadedBytes, totalBytes) {
                            browserDownloadSpinner_1.info("Downloading Browser: ".concat(Math.round(downloadedBytes / 1000000), "/").concat(Math.round(totalBytes / 1000000)));
                        })];
                case 9:
                    revisionInfo = _g.sent();
                    if (revisionInfo.executablePath) {
                        config.executablePath = revisionInfo.executablePath;
                        // config.pipe = true;
                    }
                    browserDownloadSpinner_1.succeed('Browser downloaded successfully');
                    return [3 /*break*/, 11];
                case 10:
                    error_6 = _g.sent();
                    browserDownloadSpinner_1.succeed('Something went wrong while downloading the browser');
                    return [3 /*break*/, 11];
                case 11:
                    /**
                     * Explicit fallback due to pptr 19
                     */
                    if (!config.executablePath)
                        config.executablePath = (0, puppeteer_1.executablePath)();
                    args = __spreadArray(__spreadArray([], puppeteer_config_1.puppeteerConfig.chromiumArgs, true), ((config === null || config === void 0 ? void 0 : config.chromiumArgs) || []), true);
                    if ((_a = config === null || config === void 0 ? void 0 : config.proxyServerCredentials) === null || _a === void 0 ? void 0 : _a.address) {
                        proxy = "".concat(config.proxyServerCredentials.protocol || 'socks5h', "://").concat(config.proxyServerCredentials.address);
                        args.push("--proxy-server=".concat(proxy));
                        spinner === null || spinner === void 0 ? void 0 : spinner.succeed("Applying native browser-level proxy: ".concat(proxy));
                    }
                    // ############ END: NATIVE PROXY IMPLEMENTATION ############
                    if (config === null || config === void 0 ? void 0 : config.browserWsEndpoint)
                        config.browserWSEndpoint = config.browserWsEndpoint;
                    if (config === null || config === void 0 ? void 0 : config.multiDevice) {
                        args = args.filter(function (x) { return x != '--incognito'; });
                        config["userDataDir"] = config["userDataDir"] || "".concat((config === null || config === void 0 ? void 0 : config.sessionDataPath) || ((config === null || config === void 0 ? void 0 : config.inDocker) ? '/sessions' : (config === null || config === void 0 ? void 0 : config.sessionDataPath) || '.'), "/_IGNORE_").concat((config === null || config === void 0 ? void 0 : config.sessionId) || 'session');
                        spinner === null || spinner === void 0 ? void 0 : spinner.info('MD Enabled, turning off incognito mode.');
                        spinner === null || spinner === void 0 ? void 0 : spinner.info("Data dir: ".concat(config["userDataDir"]));
                    }
                    if (config === null || config === void 0 ? void 0 : config.corsFix)
                        args.push('--disable-web-security');
                    _d = config["userDataDir"];
                    if (!_d) return [3 /*break*/, 13];
                    return [4 /*yield*/, (0, tools_1.pathExists)(config["userDataDir"])];
                case 12:
                    _d = !(_g.sent());
                    _g.label = 13;
                case 13:
                    if (_d) {
                        spinner === null || spinner === void 0 ? void 0 : spinner.info("Data dir doesnt exist, creating...: ".concat(config["userDataDir"]));
                        fs.mkdir(config["userDataDir"], { recursive: true });
                    }
                    if (!(config === null || config === void 0 ? void 0 : config.browserWSEndpoint)) return [3 /*break*/, 15];
                    return [4 /*yield*/, puppeteer.connect(__assign({}, config))];
                case 14:
                    _e = _g.sent();
                    return [3 /*break*/, 17];
                case 15: return [4 /*yield*/, puppeteer.launch(__assign(__assign({ headless: "new", args: args }, config), { devtools: false }))["catch"](function (e) {
                        spinner === null || spinner === void 0 ? void 0 : spinner.fail('Error launching browser');
                        console.error(e);
                        if (e.message.includes("ENOENT")) {
                            config.executablePath = (0, puppeteer_1.executablePath)();
                            console.log("Falling back to chromium:", config.executablePath);
                            return puppeteer.launch(__assign(__assign({ headless: "new", args: args }, config), { devtools: false }));
                        }
                        spinner === null || spinner === void 0 ? void 0 : spinner.fail(e.message);
                        throw e;
                    })];
                case 16:
                    _e = _g.sent();
                    _g.label = 17;
                case 17:
                    browser = _e;
                    exports.BROWSER_START_TS = Date.now();
                    if (!(config === null || config === void 0 ? void 0 : config.devtools)) return [3 /*break*/, 26];
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('puppeteer-extra-plugin-devtools'); })];
                case 18:
                    _dt = _g.sent();
                    devtools = _dt["default"]();
                    if (!(config.devtools !== 'local' && !((_b = config === null || config === void 0 ? void 0 : config.devtools) === null || _b === void 0 ? void 0 : _b.user) && !((_c = config === null || config === void 0 ? void 0 : config.devtools) === null || _c === void 0 ? void 0 : _c.pass))) return [3 /*break*/, 20];
                    config.devtools = {};
                    config.devtools.user = 'dev';
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('uuid-apikey'); })];
                case 19:
                    uuid = (_g.sent())["default"];
                    config.devtools.pass = uuid.create().apiKey;
                    _g.label = 20;
                case 20:
                    if (config.devtools.user && config.devtools.pass) {
                        devtools.setAuthCredentials(config.devtools.user, config.devtools.pass);
                    }
                    puppeteer.use(devtools);
                    _g.label = 21;
                case 21:
                    _g.trys.push([21, 25, , 26]);
                    if (!(config.devtools == 'local')) return [3 /*break*/, 22];
                    _f = devtools.getLocalDevToolsUrl(browser);
                    return [3 /*break*/, 24];
                case 22: return [4 /*yield*/, devtools.createTunnel(browser)];
                case 23:
                    _f = (_g.sent()).url;
                    _g.label = 24;
                case 24:
                    tunnel = _f;
                    l = "\ndevtools URL: ".concat(typeof config.devtools == 'object' ? JSON.stringify(__assign(__assign({}, config.devtools), { tunnel: tunnel }), null, 2) : tunnel);
                    spinner.info(l);
                    return [3 /*break*/, 26];
                case 25:
                    error_7 = _g.sent();
                    spinner.fail(error_7);
                    logging_1.log.error("initBrowser -> error", error_7);
                    return [3 /*break*/, 26];
                case 26: return [2 /*return*/, browser];
            }
        });
    });
}
function getWAPage(browser) {
    return __awaiter(this, void 0, void 0, function () {
        var pages;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, browser.pages()];
                case 1:
                    pages = _a.sent();
                    console.assert(pages.length > 0);
                    return [2 /*return*/, pages[0]];
            }
        });
    });
}
(0, death_1["default"])(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!browser) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, exports.kill)(browser)];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); });
/**
 * @internal
 */
var kill = function (p, b, exit, pid, reason) {
    if (reason === void 0) { reason = "LAUNCH_KILL"; }
    return __awaiter(void 0, void 0, void 0, function () {
        var killBrowser, browser_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, tools_1.processSendData)({
                        reason: reason
                    });
                    (0, tools_1.timeout)(3000);
                    killBrowser = function (browser) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!browser)
                                        return [2 /*return*/];
                                    pid = (browser === null || browser === void 0 ? void 0 : browser.process()) ? browser === null || browser === void 0 ? void 0 : browser.process().pid : null;
                                    if (!pid)
                                        return [2 /*return*/];
                                    if (!!(p === null || p === void 0 ? void 0 : p.isClosed())) return [3 /*break*/, 2];
                                    return [4 /*yield*/, (p === null || p === void 0 ? void 0 : p.close())];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    if (!browser) return [3 /*break*/, 4];
                                    return [4 /*yield*/, (browser === null || browser === void 0 ? void 0 : browser.close()["catch"](function () { }))];
                                case 3:
                                    _a.sent();
                                    _a.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); };
                    if (!p) return [3 /*break*/, 2];
                    browser_1 = (p === null || p === void 0 ? void 0 : p.browser) && typeof (p === null || p === void 0 ? void 0 : p.browser) === 'function' && (p === null || p === void 0 ? void 0 : p.browser());
                    return [4 /*yield*/, killBrowser(browser_1)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    if (!b) return [3 /*break*/, 4];
                    return [4 /*yield*/, killBrowser(b)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    if (!pid) return [3 /*break*/, 6];
                    return [4 /*yield*/, (0, promise_1["default"])(pid, 'SIGKILL')["catch"](function (e) { return console.error('Error while terminating browser PID. You can just ignore this, as the process has most likely been terminated successfully already:', e.message); })];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    if (exit)
                        process.exit();
                    return [2 /*return*/];
            }
        });
    });
};
exports.kill = kill;
