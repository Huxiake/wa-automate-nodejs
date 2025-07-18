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
exports.__esModule = true;
exports.create = exports.screenshot = exports.timeout = exports.configWithCases = exports.pkg = void 0;
var fs = require("fs");
var boxen_1 = require("boxen");
var os_name_1 = require("os-name");
var update_notifier_1 = require("update-notifier");
var Client_1 = require("../api/Client");
var index_1 = require("../api/model/index");
var path = require("path");
var os = require("os");
var auth_1 = require("./auth");
var browser_1 = require("./browser");
var events_1 = require("./events");
var launch_checks_1 = require("./launch_checks");
var cfonts_1 = require("cfonts");
var tools_1 = require("../utils/tools");
var crypto_1 = require("crypto");
var fs_extra_1 = require("fs-extra");
var pico_s3_1 = require("pico-s3");
var init_patch_1 = require("./init_patch");
var patch_manager_1 = require("./patch_manager");
var logging_1 = require("../logging/logging");
var timeout = function (ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms, 'timeout'); });
};
exports.pkg = (0, fs_extra_1.readJsonSync)(path.join(__dirname, '../../package.json')), exports.configWithCases = (0, fs_extra_1.readJsonSync)(path.join(__dirname, '../../bin/config-schema.json')), exports.timeout = timeout;
/**
 * Used to initialize the client session.
 *
 * *Note* It is required to set all config variables as [ConfigObject](https://open-wa.github.io/wa-automate-nodejs/interfaces/configobject.html) that includes both [sessionId](https://open-wa.github.io/wa-automate-nodejs/interfaces/configobject.html#sessionId). Setting the session id as the first variable is no longer valid
 *
 * e.g
 *
 * ```javascript
 * create({
 * sessionId: 'main',
 * customUserAgent: ' 'WhatsApp/2.16.352 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Safari/605.1.15',
 * blockCrashLogs true,
 * ...
 * })....
 * ```
 * @param config AdvancedConfig The extended custom configuration
 */
//@ts-ignore
function create(config) {
    var _a, _b, _c, _d;
    if (config === void 0) { config = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var START_TIME, waPage, notifier, sessionId, customUserAgent, crossSpawn_1, result, prettyFont, popup, popupaddr, spinner, qrManager, RAM_INFO, PPTR_VERSION, mdDir, browserLaunchedTs, throwOnError, PAGE_UA, BROWSER_VERSION, OS, START_TS, screenshotPath_1, WA_AUTOMATE_VERSION, WA_VERSION, canInjectEarly, attemptingReauth, debugInfo, invariantAviodanceTs, authRace, authenticated, earlyWid, licensePromise, oorProms, outOfReach, race, to, result, tI, pre, VALID_SESSION, patchPromise, localStorage_1, _e, _f, stdSessionJsonPath, altMainModulePath, altSessionJsonPath, sessionjsonpath, sessionData, sdB64, error_1, pureWAPI, _g, _h, _j, NUM, LAUNCH_TIME_MS, metrics, purgedMessage, client, me, licIndex, _k, _l, _m, issueLink, _o, _p, _q, storeKeys, error_2;
        var _this = this;
        return __generator(this, function (_r) {
            switch (_r.label) {
                case 0:
                    START_TIME = Date.now();
                    if (config.logging) {
                        if (Array.isArray(config === null || config === void 0 ? void 0 : config.logging))
                            config.logging = (0, logging_1.setupLogging)(config === null || config === void 0 ? void 0 : config.logging, "owa-".concat((config === null || config === void 0 ? void 0 : config.sessionId) || 'session'));
                    }
                    waPage = undefined;
                    sessionId = '';
                    if (!config || (config === null || config === void 0 ? void 0 : config.eventMode) !== false) {
                        config.eventMode = true;
                    }
                    if ((config === null || config === void 0 ? void 0 : config.waitForRipeSession) !== false)
                        config.waitForRipeSession = true;
                    if ((config === null || config === void 0 ? void 0 : config.multiDevice) !== false)
                        config.multiDevice = true;
                    if ((config === null || config === void 0 ? void 0 : config.deleteSessionDataOnLogout) !== false)
                        config.deleteSessionDataOnLogout = true;
                    if (!(!(config === null || config === void 0 ? void 0 : config.skipUpdateCheck) || (config === null || config === void 0 ? void 0 : config.keepUpdated))) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, update_notifier_1["default"])({
                            pkg: exports.pkg,
                            updateCheckInterval: 0
                        })];
                case 1:
                    notifier = _r.sent();
                    notifier.notify();
                    if (!((notifier === null || notifier === void 0 ? void 0 : notifier.update) && (config === null || config === void 0 ? void 0 : config.keepUpdated) && (notifier === null || notifier === void 0 ? void 0 : notifier.update.latest) !== exports.pkg.version)) return [3 /*break*/, 3];
                    console.log('UPDATING @OPEN-WA');
                    logging_1.log.info('UPDATING @OPEN-WA');
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('cross-spawn'); })];
                case 2:
                    crossSpawn_1 = _r.sent();
                    result = crossSpawn_1.sync('npm', ['i', '@open-wa/wa-automate'], { stdio: 'inherit' });
                    if (!result.stderr) {
                        console.log('UPDATED SUCCESSFULLY');
                        logging_1.log.info('UPDATED SUCCESSFULLY');
                    }
                    console.log('RESTARTING PROCESS');
                    logging_1.log.info('RESTARTING PROCESS');
                    process.on("exit", function () {
                        crossSpawn_1.spawn(process.argv.shift(), process.argv, {
                            cwd: process.cwd(),
                            detached: true,
                            stdio: "inherit"
                        });
                    });
                    process.exit();
                    _r.label = 3;
                case 3:
                    if (config === null || config === void 0 ? void 0 : config.inDocker) {
                        //try to infer config variables from process.env
                        config = __assign(__assign({}, config), (0, tools_1.getConfigFromProcessEnv)(exports.configWithCases));
                        config.chromiumArgs = (config === null || config === void 0 ? void 0 : config.chromiumArgs) || [];
                        customUserAgent = config.customUserAgent;
                    }
                    if (sessionId === '' || (config === null || config === void 0 ? void 0 : config.sessionId))
                        sessionId = (config === null || config === void 0 ? void 0 : config.sessionId) || 'session';
                    prettyFont = cfonts_1["default"].render(('@OPEN-WA|WHATSAPP|AUTOMATOR'), {
                        font: '3d',
                        color: 'candy',
                        align: 'center',
                        gradient: ["red", "#f80"],
                        lineHeight: 3
                    });
                    console.log((config === null || config === void 0 ? void 0 : config.disableSpins) ? (0, boxen_1["default"])([
                        "@open-wa/wa-automate   ",
                        "".concat(exports.pkg.description),
                        "Version: ".concat(exports.pkg.version, "   "),
                        "Check out the latest changes: https://github.com/open-wa/wa-automate-nodejs#latest-changes   ",
                    ].join('\n'), { padding: 1, borderColor: 'yellow', borderStyle: 'bold' }) : prettyFont.string);
                    if (!(config === null || config === void 0 ? void 0 : config.popup)) return [3 /*break*/, 6];
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('./popup'); })];
                case 4:
                    popup = (_r.sent()).popup;
                    return [4 /*yield*/, popup(config)];
                case 5:
                    popupaddr = _r.sent();
                    console.log("You can also authenticate the session at: ".concat(popupaddr));
                    logging_1.log.info("You can also authenticate the session at: ".concat(popupaddr));
                    _r.label = 6;
                case 6:
                    if (!sessionId)
                        sessionId = 'session';
                    spinner = new events_1.Spin(sessionId, 'STARTUP', config === null || config === void 0 ? void 0 : config.disableSpins);
                    qrManager = new auth_1.QRManager(__assign(__assign({}, config), { qrLogSkip: true }));
                    RAM_INFO = "Total: ".concat(parseFloat("".concat(os.totalmem() / 1000000000)).toFixed(2), " GB | Free: ").concat(parseFloat("".concat(os.freemem() / 1000000000)).toFixed(2), " GB");
                    logging_1.log.info("RAM INFO", RAM_INFO);
                    PPTR_VERSION = ((_a = (0, fs_extra_1.readJsonSync)(require.resolve("puppeteer/package.json"), { throws: false })) === null || _a === void 0 ? void 0 : _a.version) || "UNKNOWN";
                    logging_1.log.info("PPTR VERSION INFO", PPTR_VERSION);
                    _r.label = 7;
                case 7:
                    _r.trys.push([7, 83, , 85]);
                    if (typeof config === 'string')
                        console.error("AS OF VERSION 3+ YOU CAN NO LONGER SET THE SESSION ID AS THE FIRST PARAMETER OF CREATE. CREATE CAN ONLY TAKE A CONFIG OBJECT. IF YOU STILL HAVE CONFIGS AS A SECOND PARAMETER, THEY WILL HAVE NO EFFECT! PLEASE SEE DOCS.");
                    spinner.start('Starting');
                    spinner.succeed("Version: ".concat(exports.pkg.version));
                    spinner.info("Initializing WA");
                    mdDir = config["userDataDir"] || "".concat((config === null || config === void 0 ? void 0 : config.sessionDataPath) || ((config === null || config === void 0 ? void 0 : config.inDocker) ? '/sessions' : (config === null || config === void 0 ? void 0 : config.sessionDataPath) || '.'), "/_IGNORE_").concat((config === null || config === void 0 ? void 0 : config.sessionId) || 'session');
                    if (process.env.AUTO_MD && fs.existsSync(mdDir) && !(config === null || config === void 0 ? void 0 : config.multiDevice)) {
                        spinner.info("Multi-Device directory detected. multiDevice set to true.");
                        config.multiDevice = true;
                    }
                    if ((config === null || config === void 0 ? void 0 : config.multiDevice) && (config === null || config === void 0 ? void 0 : config.chromiumArgs))
                        spinner.info("Using custom chromium args with multi device will cause issues! Please remove them: ".concat(config === null || config === void 0 ? void 0 : config.chromiumArgs));
                    if ((config === null || config === void 0 ? void 0 : config.multiDevice) && !(config === null || config === void 0 ? void 0 : config.useChrome))
                        spinner.info("It is recommended to set useChrome: true or use the --use-chrome flag if you are experiencing issues with Multi device support");
                    return [4 /*yield*/, (0, browser_1.initPage)(sessionId, config, qrManager, customUserAgent, spinner)];
                case 8:
                    waPage = _r.sent();
                    spinner.succeed('Page loaded');
                    browserLaunchedTs = (0, tools_1.now)();
                    throwOnError = config && config.throwErrorOnTosBlock == true;
                    return [4 /*yield*/, waPage.evaluate('navigator.userAgent')];
                case 9:
                    PAGE_UA = _r.sent();
                    return [4 /*yield*/, waPage.browser().version()];
                case 10:
                    BROWSER_VERSION = _r.sent();
                    OS = (0, os_name_1["default"])();
                    START_TS = Date.now();
                    screenshotPath_1 = "./logs/".concat(config.sessionId || 'session', "/").concat(START_TS);
                    exports.screenshot = function (page) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, page.screenshot({
                                        path: "".concat(screenshotPath_1, "/").concat(Date.now(), ".jpg")
                                    })["catch"](function () {
                                        fs.mkdirSync(screenshotPath_1, { recursive: true });
                                        return (0, exports.screenshot)(page);
                                    })];
                                case 1:
                                    _a.sent();
                                    console.log('Screenshot taken. path:', "".concat(screenshotPath_1));
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    if (config === null || config === void 0 ? void 0 : config.screenshotOnInitializationBrowserError)
                        waPage.on('console', function (msg) { return __awaiter(_this, void 0, void 0, function () {
                            var i;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        for (i = 0; i < msg.args().length; ++i)
                                            console.log("".concat(i, ": ").concat(msg.args()[i]));
                                        if (!(msg.type() === 'error' && !msg.text().includes('apify') && !msg.text().includes('crashlogs'))) return [3 /*break*/, 2];
                                        return [4 /*yield*/, (0, exports.screenshot)(waPage)];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); });
                    WA_AUTOMATE_VERSION = "".concat(exports.pkg.version).concat((notifier === null || notifier === void 0 ? void 0 : notifier.update) && ((notifier === null || notifier === void 0 ? void 0 : notifier.update.latest) !== exports.pkg.version) ? " UPDATE AVAILABLE: ".concat(notifier === null || notifier === void 0 ? void 0 : notifier.update.latest) : '');
                    return [4 /*yield*/, waPage.waitForFunction('window.Debug!=undefined && window.Debug.VERSION!=undefined && require')];
                case 11:
                    _r.sent();
                    return [4 /*yield*/, waPage.evaluate(function () { return window.Debug ? window.Debug.VERSION : 'I think you have been TOS_BLOCKed'; })];
                case 12:
                    WA_VERSION = _r.sent();
                    return [4 /*yield*/, (0, patch_manager_1.earlyInjectionCheck)(waPage)];
                case 13:
                    canInjectEarly = _r.sent();
                    return [4 /*yield*/, waPage.evaluate("!!(localStorage['WAToken2'] || localStorage['last-wid-md'])")];
                case 14:
                    attemptingReauth = _r.sent();
                    debugInfo = {
                        WA_VERSION: WA_VERSION,
                        PAGE_UA: PAGE_UA,
                        WA_AUTOMATE_VERSION: WA_AUTOMATE_VERSION,
                        BROWSER_VERSION: BROWSER_VERSION,
                        OS: OS,
                        START_TS: START_TS,
                        RAM_INFO: RAM_INFO,
                        PPTR_VERSION: PPTR_VERSION
                    };
                    if ((config === null || config === void 0 ? void 0 : config.logDebugInfoAsObject) || (config === null || config === void 0 ? void 0 : config.disableSpins))
                        spinner.succeed("Debug info: ".concat(JSON.stringify(debugInfo, null, 2)));
                    else {
                        console.table(debugInfo);
                        logging_1.log.info('Debug info:', debugInfo);
                    }
                    debugInfo.LATEST_VERSION = !((notifier === null || notifier === void 0 ? void 0 : notifier.update) && ((notifier === null || notifier === void 0 ? void 0 : notifier.update.latest) !== exports.pkg.version));
                    debugInfo.CLI = process.env.OWA_CLI && true || false;
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    spinner.succeed('Use this easy pre-filled link to report an issue: ' + (0, tools_1.generateGHIssueLink)(config, debugInfo));
                    spinner.info("Time to injection: ".concat(((0, tools_1.now)() - browserLaunchedTs).toFixed(0), "ms"));
                    invariantAviodanceTs = (0, tools_1.now)();
                    return [4 /*yield*/, Promise.race([
                            waPage.waitForFunction("(()=>{return require && require(\"__debug\").modulesMap[\"WAWebCollections\"] ? true : false})()", { timeout: 10000 })["catch"](function () { }),
                            waPage.waitForFunction("[...document.getElementsByTagName('div')].filter(x=>x.dataset && x.dataset.testid)[0]?.dataset?.testid === 'qrcode'", { timeout: 10000 })["catch"](function () { }),
                            waPage.waitForFunction("document.getElementsByTagName('circle').length===1", { timeout: 10000 })["catch"](function () { }) //qr spinner is present
                        ])];
                case 15:
                    _r.sent();
                    spinner.info("Invariant Violation Avoidance: ".concat(((0, tools_1.now)() - invariantAviodanceTs).toFixed(0), "ms"));
                    if (!canInjectEarly) return [3 /*break*/, 19];
                    if (!attemptingReauth) return [3 /*break*/, 17];
                    return [4 /*yield*/, waPage.evaluate("window.Store = {\"Msg\": true}")];
                case 16:
                    _r.sent();
                    _r.label = 17;
                case 17:
                    spinner.start('Injecting api');
                    return [4 /*yield*/, (0, browser_1.injectApi)(waPage, spinner)];
                case 18:
                    waPage = _r.sent();
                    spinner.start('WAPI injected');
                    return [3 /*break*/, 20];
                case 19:
                    spinner.remove();
                    if (throwOnError)
                        throw Error('TOSBLOCK');
                    _r.label = 20;
                case 20:
                    spinner.start('Authenticating');
                    authRace = [];
                    authRace.push((0, auth_1.isAuthenticated)(waPage)["catch"](function () { }));
                    if ((config === null || config === void 0 ? void 0 : config.authTimeout) !== 0) {
                        authRace.push((0, exports.timeout)((config.authTimeout || config.multiDevice ? 120 : 60) * 1000));
                    }
                    return [4 /*yield*/, Promise.race(authRace)];
                case 21:
                    authenticated = _r.sent();
                    if (!(authenticated === 'NUKE' && !(config === null || config === void 0 ? void 0 : config.ignoreNuke))) return [3 /*break*/, 25];
                    //kill the browser
                    spinner.fail("Session data most likely expired due to manual host account logout. Please re-authenticate this session.");
                    return [4 /*yield*/, (0, browser_1.kill)(waPage)];
                case 22:
                    _r.sent();
                    if (!(config === null || config === void 0 ? void 0 : config.deleteSessionDataOnLogout)) return [3 /*break*/, 24];
                    return [4 /*yield*/, (0, browser_1.deleteSessionData)(config)];
                case 23:
                    _r.sent();
                    _r.label = 24;
                case 24:
                    if (config === null || config === void 0 ? void 0 : config.throwOnExpiredSessionData) {
                        throw new index_1.SessionExpiredError();
                    }
                    else
                        //restart the process with no session data
                        return [2 /*return*/, create(__assign(__assign({}, config), { sessionData: authenticated }))];
                    _r.label = 25;
                case 25: return [4 /*yield*/, waPage.evaluate("(localStorage[\"last-wid\"] || '').replace(/\"/g,\"\")")];
                case 26:
                    earlyWid = _r.sent();
                    licensePromise = (0, patch_manager_1.getLicense)(config, {
                        _serialized: earlyWid
                    }, debugInfo, spinner);
                    if (!(authenticated == 'timeout')) return [3 /*break*/, 29];
                    oorProms = [(0, auth_1.phoneIsOutOfReach)(waPage)];
                    if ((config === null || config === void 0 ? void 0 : config.oorTimeout) !== 0)
                        oorProms.push((0, exports.timeout)(((config === null || config === void 0 ? void 0 : config.oorTimeout) || 60) * 1000));
                    return [4 /*yield*/, Promise.race(oorProms)];
                case 27:
                    outOfReach = _r.sent();
                    spinner.emit(outOfReach && outOfReach !== 'timeout' ? 'appOffline' : 'authTimeout');
                    spinner.fail(outOfReach && outOfReach !== 'timeout' ? 'Authentication timed out. Please open the app on the phone. Shutting down' : 'Authentication timed out. Shutting down. Consider increasing authTimeout config variable: https://open-wa.github.io/wa-automate-nodejs/interfaces/configobject.html#authtimeout');
                    return [4 /*yield*/, (0, browser_1.kill)(waPage)];
                case 28:
                    _r.sent();
                    if (config === null || config === void 0 ? void 0 : config.killProcessOnTimeout)
                        process.exit();
                    throw new Error(outOfReach ? 'App Offline' : 'Auth Timeout. Consider increasing authTimeout config variable: https://open-wa.github.io/wa-automate-nodejs/interfaces/configobject.html#authtimeout');
                case 29:
                    if (!authenticated) return [3 /*break*/, 30];
                    spinner.succeed('Authenticated');
                    return [3 /*break*/, 36];
                case 30:
                    spinner.info('Authenticate to continue');
                    race = [];
                    if (config === null || config === void 0 ? void 0 : config.linkCode) {
                        race.push(qrManager.linkCode(waPage, config, spinner));
                    }
                    else
                        race.push(qrManager.smartQr(waPage, config, spinner));
                    if ((config === null || config === void 0 ? void 0 : config.qrTimeout) !== 0) {
                        to = ((config === null || config === void 0 ? void 0 : config.qrTimeout) || 60) * 1000;
                        if (config === null || config === void 0 ? void 0 : config.multiDevice)
                            to = to * 2;
                        race.push((0, exports.timeout)(to));
                    }
                    return [4 /*yield*/, Promise.race(race)];
                case 31:
                    result = _r.sent();
                    if (!(result === "MULTI_DEVICE_DETECTED" && !(config === null || config === void 0 ? void 0 : config.multiDevice))) return [3 /*break*/, 33];
                    return [4 /*yield*/, (0, browser_1.kill)(waPage)];
                case 32:
                    _r.sent();
                    return [2 /*return*/, create(__assign(__assign({}, config), { multiDevice: true }))];
                case 33:
                    if (!(result == 'timeout')) return [3 /*break*/, 35];
                    spinner.emit('qrTimeout');
                    spinner.fail('QR scan took too long. Session Timed Out. Shutting down. Consider increasing qrTimeout config variable: https://open-wa.github.io/wa-automate-nodejs/interfaces/configobject.html#qrtimeout');
                    return [4 /*yield*/, (0, browser_1.kill)(waPage)];
                case 34:
                    _r.sent();
                    if (config === null || config === void 0 ? void 0 : config.killProcessOnTimeout)
                        process.exit();
                    throw new Error('QR Timeout');
                case 35:
                    spinner.emit('successfulScan');
                    spinner.succeed();
                    _r.label = 36;
                case 36:
                    if (!config.logInternalEvents) return [3 /*break*/, 38];
                    return [4 /*yield*/, waPage.evaluate("debugEvents=true")];
                case 37:
                    _r.sent();
                    _r.label = 38;
                case 38: return [4 /*yield*/, waPage.evaluate("window.critlis=true")];
                case 39:
                    _r.sent();
                    return [4 /*yield*/, (0, tools_1.timePromise)(function () { return (0, init_patch_1.injectInternalEventHandler)(waPage); })];
                case 40:
                    tI = _r.sent();
                    logging_1.log.info("Injected internal event handler: ".concat(tI, " ms"));
                    if (!attemptingReauth) return [3 /*break*/, 43];
                    return [4 /*yield*/, waPage.evaluate("window.Store = undefined")];
                case 41:
                    _r.sent();
                    if (!(config === null || config === void 0 ? void 0 : config.waitForRipeSession)) return [3 /*break*/, 43];
                    spinner.start("Waiting for ripe session....");
                    return [4 /*yield*/, (0, auth_1.waitForRipeSession)(waPage, config === null || config === void 0 ? void 0 : config.waitForRipeSessionTimeout)];
                case 42:
                    if (_r.sent())
                        spinner.succeed("Session ready for injection");
                    else
                        spinner.fail("You may experience issues in headless mode. Continuing...");
                    _r.label = 43;
                case 43:
                    pre = canInjectEarly ? 'Rei' : 'I';
                    spinner.start("".concat(pre, "njecting api"));
                    return [4 /*yield*/, (0, browser_1.injectApi)(waPage, spinner, true)];
                case 44:
                    waPage = _r.sent();
                    spinner.succeed("WAPI ".concat(pre, "njected"));
                    if (!canInjectEarly) return [3 /*break*/, 47];
                    //check if page is valid after 5 seconds
                    spinner.start('Checking if session is valid');
                    if (!(config === null || config === void 0 ? void 0 : config.safeMode)) return [3 /*break*/, 47];
                    return [4 /*yield*/, (0, exports.timeout)(5000)];
                case 45:
                    _r.sent();
                    return [4 /*yield*/, (0, browser_1.injectApi)(waPage, spinner, true)];
                case 46:
                    _r.sent();
                    _r.label = 47;
                case 47: return [4 /*yield*/, waPage.waitForFunction("window.Store && window.Store.Msg ? true : false", { timeout: 9000, polling: 200 })["catch"](function (e) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            logging_1.log.error("Valid session check failed", e);
                            return [2 /*return*/, false];
                        });
                    }); })];
                case 48:
                    VALID_SESSION = _r.sent();
                    if (!VALID_SESSION) return [3 /*break*/, 78];
                    patchPromise = (0, patch_manager_1.getPatch)(config, spinner, debugInfo);
                    spinner.succeed('Client is ready');
                    _f = (_e = JSON).parse;
                    return [4 /*yield*/, waPage.evaluate(function () {
                            return JSON.stringify(window.localStorage);
                        })];
                case 49:
                    localStorage_1 = _f.apply(_e, [_r.sent()]);
                    stdSessionJsonPath = ((config === null || config === void 0 ? void 0 : config.sessionDataPath) && (config === null || config === void 0 ? void 0 : config.sessionDataPath.includes('.data.json'))) ? path.join(path.resolve(process.cwd(), (config === null || config === void 0 ? void 0 : config.sessionDataPath) || '')) : path.join(path.resolve(process.cwd(), (config === null || config === void 0 ? void 0 : config.sessionDataPath) || ''), "".concat(sessionId || 'session', ".data.json"));
                    altMainModulePath = ((_b = require === null || require === void 0 ? void 0 : require.main) === null || _b === void 0 ? void 0 : _b.path) || ((_c = process === null || process === void 0 ? void 0 : process.mainModule) === null || _c === void 0 ? void 0 : _c.path);
                    altSessionJsonPath = !altMainModulePath ? null : ((config === null || config === void 0 ? void 0 : config.sessionDataPath) && (config === null || config === void 0 ? void 0 : config.sessionDataPath.includes('.data.json'))) ? path.join(path.resolve(altMainModulePath, (config === null || config === void 0 ? void 0 : config.sessionDataPath) || '')) : path.join(path.resolve(altMainModulePath, (config === null || config === void 0 ? void 0 : config.sessionDataPath) || ''), "".concat(sessionId || 'session', ".data.json"));
                    sessionjsonpath = altSessionJsonPath && fs.existsSync(altSessionJsonPath) ? altSessionJsonPath : stdSessionJsonPath;
                    sessionData = {
                        WABrowserId: localStorage_1.WABrowserId,
                        WASecretBundle: localStorage_1.WASecretBundle,
                        WAToken1: localStorage_1.WAToken1,
                        WAToken2: localStorage_1.WAToken2
                    };
                    if (config.multiDevice) {
                        delete sessionData.WABrowserId;
                        logging_1.log.info("Multi-device detected. Removing Browser ID from session data to prevent session reauth corruption");
                    }
                    sdB64 = Buffer.from(JSON.stringify(sessionData)).toString('base64');
                    spinner.emit(sessionData, "sessionData");
                    spinner.emit(sdB64, "sessionDataBase64");
                    if (!(config === null || config === void 0 ? void 0 : config.skipSessionSave))
                        fs.writeFile(sessionjsonpath, sdB64, function (err) {
                            if (err) {
                                console.error(err);
                                return;
                            }
                        });
                    if (!(config === null || config === void 0 ? void 0 : config.sessionDataBucketAuth)) return [3 /*break*/, 53];
                    _r.label = 50;
                case 50:
                    _r.trys.push([50, 52, , 53]);
                    spinner === null || spinner === void 0 ? void 0 : spinner.info('Uploading new session data to cloud storage..');
                    return [4 /*yield*/, (0, pico_s3_1.upload)(__assign(__assign({ directory: '_sessionData' }, JSON.parse(Buffer.from(config.sessionDataBucketAuth, 'base64').toString('ascii'))), { filename: "".concat(config.sessionId || 'session', ".data.json"), file: "data:text/plain;base64,".concat(Buffer.from(sdB64).toString('base64')) }))];
                case 51:
                    _r.sent();
                    spinner === null || spinner === void 0 ? void 0 : spinner.succeed('Successfully uploaded session data file to cloud storage!');
                    return [3 /*break*/, 53];
                case 52:
                    error_1 = _r.sent();
                    spinner === null || spinner === void 0 ? void 0 : spinner.fail("Something went wrong while uploading new session data to cloud storage bucket. Continuing...");
                    return [3 /*break*/, 53];
                case 53:
                    /**
                     * Set page-level logging
                     */
                    waPage.on('console', function (msg) {
                        if (config === null || config === void 0 ? void 0 : config.logConsole)
                            console.log(msg);
                        logging_1.log.info('Page Console:', msg.text());
                    });
                    waPage.on('error', function (error) {
                        if (config === null || config === void 0 ? void 0 : config.logConsoleErrors)
                            console.error(error);
                        logging_1.log.error('Page Console Error:', error.message || (error === null || error === void 0 ? void 0 : error.text()));
                    });
                    if (config === null || config === void 0 ? void 0 : config.restartOnCrash)
                        waPage.on('error', function (error) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        console.error('Page Crashed! Restarting...', error);
                                        return [4 /*yield*/, (0, browser_1.kill)(waPage)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, create(config).then(config.restartOnCrash)];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    return [4 /*yield*/, (0, launch_checks_1.checkWAPIHash)()];
                case 54:
                    pureWAPI = _r.sent();
                    if (!pureWAPI) {
                        config.skipBrokenMethodsCheck = true;
                        // config.skipPatches = true;
                    }
                    if (!(config === null || config === void 0 ? void 0 : config.hostNotificationLang)) return [3 /*break*/, 56];
                    return [4 /*yield*/, waPage.evaluate("window.hostlang=\"".concat(config.hostNotificationLang, "\""))];
                case 55:
                    _r.sent();
                    _r.label = 56;
                case 56:
                    if (!!(config === null || config === void 0 ? void 0 : config.skipPatches)) return [3 /*break*/, 60];
                    _g = patch_manager_1.getAndInjectLivePatch;
                    _h = [waPage, spinner];
                    return [4 /*yield*/, patchPromise];
                case 57: return [4 /*yield*/, _g.apply(void 0, _h.concat([_r.sent(), config, debugInfo]))];
                case 58:
                    _r.sent();
                    _j = debugInfo;
                    return [4 /*yield*/, waPage.evaluate("window.o()")];
                case 59:
                    _j.OW_KEY = _r.sent();
                    _r.label = 60;
                case 60: return [4 /*yield*/, waPage.evaluate("(window.moi() || \"\").replace('@c.us','').replace(/\"/g,\"\")")];
                case 61:
                    NUM = ((_r.sent()) || "");
                    debugInfo.NUM = NUM.slice(-4);
                    debugInfo.NUM_HASH = (0, crypto_1.createHash)('md5').update(NUM, 'utf8').digest('hex');
                    if (!((config === null || config === void 0 ? void 0 : config.skipBrokenMethodsCheck) !== true)) return [3 /*break*/, 63];
                    return [4 /*yield*/, (0, launch_checks_1.integrityCheck)(waPage, notifier, spinner, debugInfo)];
                case 62:
                    _r.sent();
                    _r.label = 63;
                case 63:
                    LAUNCH_TIME_MS = Date.now() - START_TIME;
                    debugInfo = __assign(__assign({}, debugInfo), { LAUNCH_TIME_MS: LAUNCH_TIME_MS });
                    spinner.emit(debugInfo, "DebugInfo");
                    return [4 /*yield*/, waPage.evaluate(function (_a) {
                            var config = _a.config;
                            return WAPI.launchMetrics(config);
                        }, { config: config })];
                case 64:
                    metrics = _r.sent();
                    purgedMessage = (metrics === null || metrics === void 0 ? void 0 : metrics.purged) ? Object.entries(metrics.purged).filter(function (_a) {
                        var e = _a[1];
                        return Number(e) > 0;
                    }).map(function (_a) {
                        var k = _a[0], e = _a[1];
                        return "".concat(e, " ").concat(k);
                    }).join(" and ") : "";
                    if (metrics.isMd && !(config === null || config === void 0 ? void 0 : config.multiDevice))
                        spinner.info("!!!Please set multiDevice: true in the config or use the --mutli-Device flag!!!");
                    spinner.succeed("Client loaded for ".concat(metrics.isBiz ? "business" : "normal", " account ").concat(metrics.isMd && "[MD] " || '', "with ").concat(metrics.contacts, " contacts, ").concat(metrics.chats, " chats & ").concat(metrics.messages, " messages ").concat(purgedMessage ? "+ purged ".concat(purgedMessage, " ") : "", "in ").concat(LAUNCH_TIME_MS / 1000, "s"));
                    debugInfo.ACC_TYPE = metrics.isBiz ? "BUSINESS" : "PERSONAL";
                    if ((config === null || config === void 0 ? void 0 : config.deleteSessionDataOnLogout) || (config === null || config === void 0 ? void 0 : config.killClientOnLogout))
                        config.eventMode = true;
                    client = new Client_1.Client(waPage, config, __assign(__assign({}, debugInfo), metrics));
                    return [4 /*yield*/, client.getMe()];
                case 65:
                    me = (_r.sent()).me;
                    licIndex = process.argv.findIndex(function (arg) { return arg === "--license-key" || arg === "-l"; });
                    config.licenseKey = config.licenseKey || licIndex !== -1 && process.argv[licIndex + 1];
                    if (!((config === null || config === void 0 ? void 0 : config.licenseKey) || me._serialized !== earlyWid)) return [3 /*break*/, 70];
                    _k = patch_manager_1.getAndInjectLicense;
                    _l = [waPage, config, me, debugInfo, spinner];
                    if (!(me._serialized !== earlyWid)) return [3 /*break*/, 66];
                    _m = false;
                    return [3 /*break*/, 68];
                case 66: return [4 /*yield*/, licensePromise];
                case 67:
                    _m = _r.sent();
                    _r.label = 68;
                case 68: return [4 /*yield*/, _k.apply(void 0, _l.concat([_m]))];
                case 69:
                    _r.sent();
                    _r.label = 70;
                case 70:
                    spinner.info("Finalizing web session...");
                    return [4 /*yield*/, (0, init_patch_1.injectInitPatch)(waPage)];
                case 71:
                    _r.sent();
                    spinner.info("Finalizing client...");
                    return [4 /*yield*/, client.loaded()];
                case 72:
                    _r.sent();
                    if (!(config.ensureHeadfulIntegrity && !attemptingReauth)) return [3 /*break*/, 74];
                    spinner.info("QR scanned for the first time. Refreshing...");
                    return [4 /*yield*/, client.refresh()];
                case 73:
                    _r.sent();
                    spinner.info("Session refreshed.");
                    _r.label = 74;
                case 74: return [4 /*yield*/, client.getIssueLink()];
                case 75:
                    issueLink = _r.sent();
                    console.log((0, boxen_1["default"])("Use the link below to easily report issues:👇👇👇", { padding: 1, borderColor: 'red' }));
                    spinner.succeed(issueLink);
                    spinner.succeed("\uD83D\uDE80 @OPEN-WA ready for account: ".concat(me.user.slice(-4)));
                    if (!(!debugInfo.CLI && !config.licenseKey)) return [3 /*break*/, 77];
                    _p = (_o = spinner).succeed;
                    _q = "Use this link to get a license: ".concat;
                    return [4 /*yield*/, client.getLicenseLink()];
                case 76:
                    _p.apply(_o, [_q.apply("Use this link to get a license: ", [_r.sent()])]);
                    _r.label = 77;
                case 77:
                    spinner.emit('SUCCESS');
                    spinner.remove();
                    return [2 /*return*/, client];
                case 78: return [4 /*yield*/, waPage.evaluate("Object.keys(window.Store || {})")];
                case 79:
                    storeKeys = _r.sent();
                    logging_1.log.info("Store keys", storeKeys);
                    spinner.fail('The session is invalid. Retrying');
                    return [4 /*yield*/, (0, browser_1.kill)(waPage)];
                case 80:
                    _r.sent();
                    return [4 /*yield*/, create(config)];
                case 81: return [2 /*return*/, _r.sent()];
                case 82: return [3 /*break*/, 85];
                case 83:
                    error_2 = _r.sent();
                    spinner.emit(error_2.message);
                    logging_1.log.error(error_2.message);
                    if (error_2.stack) {
                        logging_1.log.error(error_2.stack);
                        console.error(error_2.stack);
                    }
                    return [4 /*yield*/, (0, browser_1.kill)(waPage)];
                case 84:
                    _r.sent();
                    if (error_2.name === "ProtocolError" && ((_d = error_2.message) === null || _d === void 0 ? void 0 : _d.includes("Target closed"))) {
                        spinner.fail(error_2.message);
                        process.exit();
                    }
                    if (error_2.name === "TimeoutError" && (config === null || config === void 0 ? void 0 : config.multiDevice)) {
                        spinner.fail("Please delete the ".concat(config === null || config === void 0 ? void 0 : config.userDataDir, " folder and any related data.json files and try again. It is highly suggested to set useChrome: true also."));
                    }
                    if (error_2.name === "TimeoutError" && (config === null || config === void 0 ? void 0 : config.killProcessOnTimeout)) {
                        process.exit();
                    }
                    else {
                        spinner.remove();
                        throw error_2;
                    }
                    return [3 /*break*/, 85];
                case 85: return [2 /*return*/];
            }
        });
    });
}
exports.create = create;
