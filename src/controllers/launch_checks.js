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
exports.integrityCheck = exports.checkWAPIHash = void 0;
var path = require("path");
var hasha_1 = require("hasha");
var lodash_uniq_1 = require("lodash.uniq");
var fs_extra_1 = require("fs-extra");
var fs = require("fs");
var pkg = (0, fs_extra_1.readJsonSync)(path.join(__dirname, '../../package.json'));
var currentHash = '8d3a09fe3156605ac2cf55ce920bbbab';
function checkWAPIHash() {
    return __awaiter(this, void 0, void 0, function () {
        var h;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hasha_1["default"].fromFile(path.join(__dirname, '../lib', 'wapi.js'), { algorithm: 'md5' })];
                case 1:
                    h = _a.sent();
                    return [2 /*return*/, h == currentHash];
            }
        });
    });
}
exports.checkWAPIHash = checkWAPIHash;
function integrityCheck(waPage, notifier, spinner, debugInfo) {
    return __awaiter(this, void 0, void 0, function () {
        var waitForIdle, wapi, methods, check, BROKEN_METHODS, unconditionalInject, axios, report;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    waitForIdle = catchRequests(waPage);
                    spinner.start('Checking client integrity');
                    return [4 /*yield*/, waitForIdle()];
                case 1:
                    _a.sent();
                    wapi = fs.readFileSync(path.join(__dirname, '../lib', 'wapi.js'), 'utf8');
                    methods = (0, lodash_uniq_1["default"])(wapi.match(/(Store[.\w]*)\(/g).map(function (x) { return x.replace("(", ""); }));
                    check = function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, waPage.evaluate(function (checkList) {
                                        return checkList.filter(function (check) {
                                            try {
                                                return eval(check) ? false : true;
                                            }
                                            catch (error) {
                                                return true;
                                            }
                                        });
                                    }, methods)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); };
                    return [4 /*yield*/, check()];
                case 2:
                    BROKEN_METHODS = _a.sent();
                    if (!(BROKEN_METHODS.length > 0)) return [3 /*break*/, 13];
                    spinner.info('Broken methods detected. Attempting repair.');
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 2500); })];
                case 3:
                    _a.sent();
                    unconditionalInject = wapi.replace('!window.Store||!window.Store.Msg', 'true');
                    return [4 /*yield*/, waPage.evaluate(function (s) { return eval(s); }, unconditionalInject)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, waitForIdle()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, check()];
                case 6:
                    //check again
                    BROKEN_METHODS = _a.sent();
                    if (!(BROKEN_METHODS.length > 0)) return [3 /*break*/, 11];
                    spinner.info('Unable to repair. Reporting broken methods.');
                    if (!(notifier === null || notifier === void 0 ? void 0 : notifier.update)) return [3 /*break*/, 7];
                    //needs an updated
                    spinner.fail("!!!BROKEN METHODS DETECTED!!!\n\n Please update to the latest version: " + notifier.update.latest);
                    return [3 /*break*/, 10];
                case 7: return [4 /*yield*/, Promise.resolve().then(function () { return require('axios'); })];
                case 8:
                    axios = (_a.sent())["default"];
                    return [4 /*yield*/, axios.post(pkg.brokenMethodReportUrl, __assign(__assign({}, debugInfo), { BROKEN_METHODS: BROKEN_METHODS }))["catch"](function () { return false; })];
                case 9:
                    report = _a.sent();
                    if (report === null || report === void 0 ? void 0 : report.data) {
                        spinner.fail("Unable to repair broken methods. Sometimes this happens the first time after a new WA version, please try again. An issue has been created, add more detail if required: ".concat(report === null || report === void 0 ? void 0 : report.data));
                    }
                    else
                        spinner.fail("Unable to repair broken methods. Sometimes this happens the first time after a new WA version, please try again. Please check the issues in the repo for updates: https://github.com/open-wa/wa-automate-nodejs/issues");
                    _a.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    spinner.info('Session repaired.');
                    _a.label = 12;
                case 12: return [3 /*break*/, 14];
                case 13:
                    spinner.info('Passed Integrity Test');
                    _a.label = 14;
                case 14: return [2 /*return*/, true];
            }
        });
    });
}
exports.integrityCheck = integrityCheck;
function catchRequests(page, reqs) {
    var _this = this;
    if (reqs === void 0) { reqs = 0; }
    var started = function () { return (reqs = reqs + 1); };
    var ended = function () { return (reqs = reqs - 1); };
    page.on('request', started);
    page.on('requestfailed', ended);
    page.on('requestfinished', ended);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return function (timeout, success) {
        if (timeout === void 0) { timeout = 5000; }
        if (success === void 0) { success = false; }
        return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!true) return [3 /*break*/, 2];
                        if (reqs < 1)
                            return [3 /*break*/, 2];
                        return [4 /*yield*/, new Promise(function (yay) { return setTimeout(yay, 100); })];
                    case 1:
                        _a.sent();
                        if ((timeout = timeout - 100) < 0) {
                            throw new Error('Timeout');
                        }
                        return [3 /*break*/, 0];
                    case 2:
                        page.off('request', started);
                        page.off('requestfailed', ended);
                        page.off('requestfinished', ended);
                        return [2 /*return*/];
                }
            });
        });
    };
}
