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
exports.getAndInjectLicense = exports.earlyInjectionCheck = exports.getLicense = exports.getAndInjectLivePatch = exports.injectLivePatch = exports.getPatch = void 0;
var crypto = require("crypto");
var events_1 = require("./events");
var initializer_1 = require("./initializer");
var axios_1 = require("axios");
var fs_1 = require("fs");
var PQueue = require("p-queue")["default"];
var queue = new PQueue();
/**
 * @private
 */
function getPatch(config, spinner, sessionInfo) {
    return __awaiter(this, void 0, void 0, function () {
        var data, headers, ghUrl, hasSpin, patchFilePath, lastModifiedDate, patch, freshPatchFetchPromise;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = null;
                    headers = {};
                    ghUrl = "https://raw.githubusercontent.com/open-wa/wa-automate-nodejs/master/patches.json";
                    hasSpin = !!spinner;
                    patchFilePath = "".concat(process.cwd(), "/patches.ignore.data.json");
                    /**
                     * If cachedPatch is true then search for patch in current working directory.
                     */
                    if (config === null || config === void 0 ? void 0 : config.cachedPatch) {
                        spinner.info('Searching for cached patch');
                        // open file called patches.json and read as string
                        if ((0, fs_1.existsSync)(patchFilePath)) {
                            spinner.info('Found cached patch');
                            lastModifiedDate = (0, fs_1.statSync)(patchFilePath).mtimeMs;
                            /**
                             * Check if patchFilePath file is more than 1 day old
                             */
                            if ((lastModifiedDate + 86400000) < Date.now()) {
                                //this patch is stale.
                                spinner.fail('Cached patch is stale.');
                            }
                            else {
                                patch = (0, fs_1.readFileSync)(patchFilePath, 'utf8');
                                data = JSON.parse(patch);
                                spinner.info('Cached patch loaded');
                            }
                        }
                        else
                            spinner.fail('Cached patch not found');
                    }
                    freshPatchFetchPromise = function () { return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var patchesBaseUrl, patchesUrl, START, _a, data, headers, END;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    patchesBaseUrl = (config === null || config === void 0 ? void 0 : config.ghPatch) ? ghUrl : initializer_1.pkg.patches;
                                    patchesUrl = patchesBaseUrl + "?wv=".concat(sessionInfo.WA_VERSION, "&wav=").concat(sessionInfo.WA_AUTOMATE_VERSION);
                                    if (!spinner)
                                        spinner = new events_1.Spin(config.sessionId, "FETCH_PATCH", config.disableSpins, true);
                                    spinner === null || spinner === void 0 ? void 0 : spinner.start("Downloading ".concat((config === null || config === void 0 ? void 0 : config.cachedPatch) ? 'cached ' : '', "patches from ").concat(patchesBaseUrl), hasSpin ? undefined : 2);
                                    START = Date.now();
                                    return [4 /*yield*/, axios_1["default"].get(patchesUrl)["catch"](function () {
                                            spinner === null || spinner === void 0 ? void 0 : spinner.info('Downloading patches. Retrying.');
                                            return axios_1["default"].get("".concat(ghUrl, "?v=").concat(Date.now()));
                                        })];
                                case 1:
                                    _a = _b.sent(), data = _a.data, headers = _a.headers;
                                    END = Date.now();
                                    if (!headers['etag']) {
                                        spinner === null || spinner === void 0 ? void 0 : spinner.info('Generating patch hash');
                                        headers['etag'] = crypto.createHash('md5').update(typeof data === 'string' ? data : JSON.stringify(data)).digest("hex").slice(-5);
                                    }
                                    spinner === null || spinner === void 0 ? void 0 : spinner.succeed("Downloaded patches in ".concat((END - START) / 1000, "s"));
                                    if (config === null || config === void 0 ? void 0 : config.cachedPatch) {
                                        //save patches.json to current working directory
                                        spinner === null || spinner === void 0 ? void 0 : spinner.info('Saving patches to current working directory');
                                        (0, fs_1.writeFileSync)(patchFilePath, JSON.stringify(data, null, 2));
                                        spinner === null || spinner === void 0 ? void 0 : spinner.succeed('Saved patches to current working directory');
                                    }
                                    return [2 /*return*/, resolve({
                                            data: data,
                                            tag: "".concat((headers.etag || '').replace(/"/g, '').slice(-5))
                                        })];
                            }
                        });
                    }); }); };
                    if (!((config === null || config === void 0 ? void 0 : config.cachedPatch) && data)) return [3 /*break*/, 1];
                    queue.add(freshPatchFetchPromise);
                    return [2 /*return*/, { data: data, tag: "CACHED-".concat((crypto.createHash('md5').update(typeof data === 'string' ? data : JSON.stringify(data)).digest("hex").slice(-5)).replace(/"/g, '').slice(-5)) }];
                case 1: return [4 /*yield*/, freshPatchFetchPromise()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getPatch = getPatch;
/**
 * @private
 * @param page
 * @param spinner
 */
function injectLivePatch(page, patch, spinner) {
    return __awaiter(this, void 0, void 0, function () {
        var data, tag;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = patch.data, tag = patch.tag;
                    spinner === null || spinner === void 0 ? void 0 : spinner.info('Installing patches');
                    return [4 /*yield*/, Promise.all(data.map(function (patch) { return page.evaluate("".concat(patch)); }))];
                case 1:
                    _a.sent();
                    spinner === null || spinner === void 0 ? void 0 : spinner.succeed("Patches Installed: ".concat(tag));
                    return [2 /*return*/, tag];
            }
        });
    });
}
exports.injectLivePatch = injectLivePatch;
/**
 * @private
 */
function getAndInjectLivePatch(page, spinner, preloadedPatch, config, sessionInfo) {
    return __awaiter(this, void 0, void 0, function () {
        var patch, patch_hash;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    patch = preloadedPatch;
                    if (!!patch) return [3 /*break*/, 2];
                    return [4 /*yield*/, getPatch(config, spinner, sessionInfo)];
                case 1:
                    patch = _a.sent();
                    _a.label = 2;
                case 2: return [4 /*yield*/, injectLivePatch(page, patch, spinner)];
                case 3:
                    patch_hash = _a.sent();
                    sessionInfo.PATCH_HASH = patch_hash;
                    return [2 /*return*/];
            }
        });
    });
}
exports.getAndInjectLivePatch = getAndInjectLivePatch;
/**
 * @private
 */
function getLicense(config, me, debugInfo, spinner) {
    return __awaiter(this, void 0, void 0, function () {
        var hasSpin, _a, START, data, END, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(config === null || config === void 0 ? void 0 : config.licenseKey) || !(me === null || me === void 0 ? void 0 : me._serialized))
                        return [2 /*return*/, false];
                    hasSpin = !!spinner;
                    if (!spinner)
                        spinner = new events_1.Spin(config.sessionId || "session", "FETCH_LICENSE", config.disableSpins, true);
                    if (!(typeof config.licenseKey === "function")) return [3 /*break*/, 2];
                    //run the funciton to get the key
                    _a = config;
                    return [4 /*yield*/, config.licenseKey(config.sessionId, me._serialized)];
                case 1:
                    //run the funciton to get the key
                    _a.licenseKey = _b.sent();
                    _b.label = 2;
                case 2:
                    if (config.licenseKey && typeof config.licenseKey === "object") {
                        //attempt to get the key from the object
                        //@ts-ignore
                        config.licenseKey = config.licenseKey[me._serialized] || config.licenseKey[config.sessionId];
                    }
                    //asume by now the key is a string
                    spinner === null || spinner === void 0 ? void 0 : spinner.start("Fetching License: ".concat(Array.isArray(config.licenseKey) ? config.licenseKey : typeof config.licenseKey === "string" ? config.licenseKey.indexOf("-") == -1 ? config.licenseKey.slice(-4) : config.licenseKey.split("-").slice(-1)[0] : config.licenseKey), hasSpin ? undefined : 2);
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    START = Date.now();
                    return [4 /*yield*/, axios_1["default"].post(initializer_1.pkg.licenseCheckUrl, __assign({ key: config.licenseKey, number: me._serialized }, debugInfo))];
                case 4:
                    data = (_b.sent()).data;
                    END = Date.now();
                    spinner === null || spinner === void 0 ? void 0 : spinner.succeed("Downloaded License in ".concat((END - START) / 1000, "s"));
                    return [2 /*return*/, data];
                case 5:
                    error_1 = _b.sent();
                    spinner === null || spinner === void 0 ? void 0 : spinner.fail("License request failed: ".concat(error_1.statusCode || error_1.status || error_1.code, " ").concat(error_1.message));
                    return [2 /*return*/, false];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getLicense = getLicense;
function earlyInjectionCheck(page) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                //@ts-ignore
                return [4 /*yield*/, page.waitForFunction("require(\"__debug\").modulesMap[\"WAWebCollections\"] ? true : false", { timeout: 10, polling: 500 })["catch"](function () { })
                    //@ts-ignore
                    // return await page.evaluate(() => { if (window.webpackChunkwhatsapp_web_client) { window.webpackChunkbuild = window.webpackChunkwhatsapp_web_client; } else { (function () { const f = Object.entries(window).filter(([, o]) => o && o.push && (o.push != [].push)); if (f[0]) { window.webpackChunkbuild = window[f[0][0]]; } })(); } return (typeof window.webpackChunkbuild !== "undefined"); });
                ];
                case 1:
                    //@ts-ignore
                    _a.sent();
                    //@ts-ignore
                    // return await page.evaluate(() => { if (window.webpackChunkwhatsapp_web_client) { window.webpackChunkbuild = window.webpackChunkwhatsapp_web_client; } else { (function () { const f = Object.entries(window).filter(([, o]) => o && o.push && (o.push != [].push)); if (f[0]) { window.webpackChunkbuild = window[f[0][0]]; } })(); } return (typeof window.webpackChunkbuild !== "undefined"); });
                    return [2 /*return*/, true];
            }
        });
    });
}
exports.earlyInjectionCheck = earlyInjectionCheck;
function getAndInjectLicense(page, config, me, debugInfo, spinner, preloadedLicense) {
    return __awaiter(this, void 0, void 0, function () {
        var l_err, data, l_success, keyType, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(config === null || config === void 0 ? void 0 : config.licenseKey) || !(me === null || me === void 0 ? void 0 : me._serialized))
                        return [2 /*return*/, false];
                    data = preloadedLicense;
                    spinner === null || spinner === void 0 ? void 0 : spinner.info('Checking License');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 11, , 12]);
                    if (!!data) return [3 /*break*/, 3];
                    spinner === null || spinner === void 0 ? void 0 : spinner.info('Fethcing License...');
                    return [4 /*yield*/, getLicense(config, me, debugInfo, spinner)];
                case 2:
                    data = _a.sent();
                    _a.label = 3;
                case 3:
                    if (!data) return [3 /*break*/, 9];
                    spinner === null || spinner === void 0 ? void 0 : spinner.info('Injecting License...');
                    return [4 /*yield*/, page.evaluate(function (data) { return eval(data); }, data)];
                case 4:
                    l_success = _a.sent();
                    if (!!l_success) return [3 /*break*/, 6];
                    spinner === null || spinner === void 0 ? void 0 : spinner.info('License injection failed. Getting error..');
                    return [4 /*yield*/, page.evaluate('window.launchError')];
                case 5:
                    l_err = _a.sent();
                    return [3 /*break*/, 8];
                case 6:
                    spinner === null || spinner === void 0 ? void 0 : spinner.info('License injected successfully..');
                    return [4 /*yield*/, page.evaluate('window.KEYTYPE || false')];
                case 7:
                    keyType = _a.sent();
                    spinner === null || spinner === void 0 ? void 0 : spinner.succeed("License Valid".concat(keyType ? ": ".concat(keyType) : ''));
                    return [2 /*return*/, true];
                case 8: return [3 /*break*/, 10];
                case 9:
                    l_err = "The key is invalid";
                    _a.label = 10;
                case 10:
                    if (l_err) {
                        spinner === null || spinner === void 0 ? void 0 : spinner.fail("License issue".concat(l_err ? ": ".concat(l_err) : ""));
                    }
                    return [2 /*return*/, false];
                case 11:
                    error_2 = _a.sent();
                    spinner === null || spinner === void 0 ? void 0 : spinner.fail("License request failed: ".concat(error_2.statusCode || error_2.status || error_2.code, " ").concat(error_2.message));
                    return [2 /*return*/, false];
                case 12: return [2 /*return*/];
            }
        });
    });
}
exports.getAndInjectLicense = getAndInjectLicense;
// export * from './init_patch';
