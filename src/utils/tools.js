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
exports.__esModule = true;
exports.sanitizeAccentedChars = exports.fixPath = exports.pathExists = exports.assertFile = exports.rmFileAsync = exports.FileOutputTypes = exports.FileInputTypes = exports.ensureDUrl = exports.generateGHIssueLink = exports.processSendData = exports.timePromise = exports.now = exports.perf = exports.processSend = exports.base64MimeType = exports.getDUrl = exports.getBufferFromUrl = exports.isDataURL = exports.isBase64 = exports.camelize = exports.without = exports.getConfigFromProcessEnv = exports.smartUserAgent = exports.timeout = void 0;
var crypto_1 = require("crypto");
var fs = require("fs");
var fsp = require("fs/promises");
var path = require("path");
var datauri_1 = require("datauri");
var is_url_superb_1 = require("is-url-superb");
var model_1 = require("../api/model");
var axios_1 = require("axios");
var child_process_1 = require("child_process");
var os_1 = require("os");
var perf_hooks_1 = require("perf_hooks");
var mime_1 = require("mime");
var os_2 = require("os");
var stream_1 = require("stream");
var logging_1 = require("../logging/logging");
var import_1 = require("@brillout/import");
var fsconstants = fsp.constants || {
    F_OK: 0,
    R_OK: 4,
    W_OK: 2,
    X_OK: 1
};
var IGNORE_FILE_EXTS = [
    'mpga'
];
var _ft = null;
var ft = function () { return __awaiter(void 0, void 0, void 0, function () {
    var x;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!_ft) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, import_1.import_)('file-type')];
            case 1:
                x = _a.sent();
                _ft = x;
                _a.label = 2;
            case 2: return [2 /*return*/, _ft];
        }
    });
}); };
//@ts-ignore
process.send = process.send || function () { };
var timeout = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms, 'timeout'); }); };
exports.timeout = timeout;
/**
 *  Use this to generate a more likely valid user agent. It makes sure it has the WA part and replaces any windows or linux os info with mac.
 * @param useragent Your custom user agent
 * @param v The WA version from the debug info. This is optional. default is 2.2117.5
 */
var smartUserAgent = function (useragent, v) {
    if (v === void 0) { v = '2.2117.5'; }
    useragent = useragent.replace(useragent
        .match(/\(([^()]*)\)/g)
        .find(function (x) {
        return x.toLowerCase().includes('linux') ||
            x.toLowerCase().includes('windows');
    }), '(Macintosh; Intel Mac OS X 10_15_2)');
    if (!useragent.includes('WhatsApp'))
        return "WhatsApp/".concat(v, " ").concat(useragent);
    return useragent.replace(useragent
        .match(/WhatsApp\/([.\d])*/g)[0]
        .match(/[.\d]*/g)
        .find(function (x) { return x; }), v);
};
exports.smartUserAgent = smartUserAgent;
var getConfigFromProcessEnv = function (json) {
    var output = {};
    json.forEach(function (_a) {
        var env = _a.env, key = _a.key;
        if (process.env[env])
            output[key] = process.env[env];
        if (process.env[env] === 'true' || process.env[env] === 'false')
            output[key] = Boolean(process.env[env]);
    });
    return output;
};
exports.getConfigFromProcessEnv = getConfigFromProcessEnv;
/**
 * Remove the key from the object and return the rest of the object.
 * @param {JsonObject} obj - The object to be filtered.
 * @param {string} key - The key to discard.
 * @returns The object without the key.
 */
var without = function (obj, key) {
    var _a = obj, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _b = key, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    discard = _a[_b], rest = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
    return rest;
};
exports.without = without;
var camelize = function (str) {
    var arr = str.split('-');
    var capital = arr.map(function (item, index) {
        return index
            ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
            : item.toLowerCase();
    });
    // ^-- change here.
    var capitalString = capital.join('');
    return capitalString;
};
exports.camelize = camelize;
/**
 * Check if a string is Base64
 * @param str string
 * @returns
 */
var isBase64 = function (str) {
    var len = str.length;
    if (!len || len % 4 !== 0 || /[^A-Z0-9+/=]/i.test(str)) {
        return false;
    }
    var firstPaddingChar = str.indexOf('=');
    return (firstPaddingChar === -1 ||
        firstPaddingChar === len - 1 ||
        (firstPaddingChar === len - 2 && str[len - 1] === '='));
};
exports.isBase64 = isBase64;
/**
 * Check if a string is a DataURL
 * @param s string
 * @returns
 */
var isDataURL = function (s) {
    return !!s.match(/^data:((?:\w+\/(?:(?!;).)+)?)((?:;[\w\W]*?[^;])*),(.+)$/g);
};
exports.isDataURL = isDataURL;
/**
 * @internal
 * A convinience method to download the buffer of a downloaded file
 * @param url The url
 * @param optionsOverride You can use this to override the [axios request config](https://github.com/axios/axios#request-config)
 */
var getBufferFromUrl = function (url, optionsOverride) {
    if (optionsOverride === void 0) { optionsOverride = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var res, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, axios_1["default"])(__assign(__assign({ method: 'get', url: url, headers: {
                                DNT: 1,
                                'Upgrade-Insecure-Requests': 1
                            } }, optionsOverride), { responseType: 'arraybuffer' }))];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, [Buffer.from(res.data, 'binary'), res.headers]];
                case 2:
                    error_1 = _a.sent();
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getBufferFromUrl = getBufferFromUrl;
/**
 * @internal
 * A convinience method to download the [[DataURL]] of a file
 * @param url The url
 * @param optionsOverride You can use this to override the [axios request config](https://github.com/axios/axios#request-config)
 */
var getDUrl = function (url, optionsOverride) {
    if (optionsOverride === void 0) { optionsOverride = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, buff, headers, dUrl, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, exports.getBufferFromUrl)(url, optionsOverride)];
                case 1:
                    _a = _b.sent(), buff = _a[0], headers = _a[1];
                    dUrl = "data:".concat(headers['content-type'], ";base64,").concat(buff.toString('base64'));
                    return [2 /*return*/, dUrl];
                case 2:
                    error_2 = _b.sent();
                    throw error_2;
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getDUrl = getDUrl;
/**
 * @internal
 * Use this to extract the mime type from a [[DataURL]]
 */
var base64MimeType = function (dUrl) {
    var result = null;
    if (typeof dUrl !== 'string') {
        return result;
    }
    var mime = dUrl.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    if (mime && mime.length) {
        result = mime[1];
    }
    return result;
};
exports.base64MimeType = base64MimeType;
/**
 * If process.send is defined, send the message three times
 * @param {string} message - The message to send to the parent process.
 * @returns Nothing.
 */
var processSend = function (message) {
    if (process.send) {
        process.send(message);
        process.send(message);
        process.send(message);
    }
    return;
};
exports.processSend = processSend;
/**
 * Return the performance object if it is available, otherwise return the Date object
 */
var perf = function () { return perf_hooks_1.performance || Date; };
exports.perf = perf;
/**
 * Return the current time in milliseconds
 */
var now = function () { return (0, exports.perf)().now(); };
exports.now = now;
/**
 * `timePromise` returns a promise that resolves to the time it took to run the function passed to it
 * @param fn - the function to be timed.
 * @returns A string.
 */
function timePromise(fn) {
    return __awaiter(this, void 0, void 0, function () {
        var start;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    start = (0, exports.now)();
                    return [4 /*yield*/, fn()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, ((0, exports.now)() - start).toFixed(0)];
            }
        });
    });
}
exports.timePromise = timePromise;
/**
 * It sends a message to the parent process.
 * @param {any} data - The data to be sent to the parent process.
 * @returns Nothing.
 */
var processSendData = function (data) {
    if (data === void 0) { data = {}; }
    var sd = function () { return process.send({
        type: 'process:msg',
        data: data
    }, function (error) {
        if (error) {
            console.error(error);
        }
    }); };
    return sd();
    //  return await new Promise((resolve, reject)=>{
    //   sd(resolve,reject)
    //  })
};
exports.processSendData = processSendData;
/**
 * It generates a link to the GitHub issue template for the current session
 * @param {ConfigObject} config - the config object
 * @param {SessionInfo} sessionInfo - The sessionInfo object from the CLI
 * @param {any} extras - any
 * @returns A link to the issue tracker for the current session.
 */
var generateGHIssueLink = function (config, sessionInfo, extras) {
    if (extras === void 0) { extras = {}; }
    var npm_ver = (0, child_process_1.execSync)('npm -v');
    var labels = [];
    if (sessionInfo.CLI)
        labels.push('CLI');
    if (!sessionInfo.LATEST_VERSION)
        labels.push('NCV');
    labels.push(config.multiDevice ? 'MD' : 'Legacy');
    if (sessionInfo.ACC_TYPE === 'BUSINESS')
        labels.push('BHA');
    if (sessionInfo.ACC_TYPE === 'PERSONAL')
        labels.push('PHA');
    var qp = __assign({ "template": "bug_report.yaml", 
        //@ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        "d_info": "".concat(encodeURI(JSON.stringify((function (_a) {
            var OS = _a.OS, purged = _a.purged, PAGE_UA = _a.PAGE_UA, OW_KEY = _a.OW_KEY, NUM = _a.NUM, NUM_HASH = _a.NUM_HASH, o = __rest(_a, ["OS", "purged", "PAGE_UA", "OW_KEY", "NUM", "NUM_HASH"]);
            return o;
        })(sessionInfo), null, 2))), "enviro": "".concat("-%20OS:%20".concat(encodeURI(sessionInfo.OS), "%0A-%20Node:%20").concat(encodeURI(process.versions.node), "%0A-%20npm:%20").concat((String(npm_ver)).replace(/\s/g, ''))), "labels": labels.join(',') }, extras);
    return "https://github.com/open-wa/wa-automate-nodejs/issues/new?".concat(Object.keys(qp).map(function (k) { return "".concat(k, "=").concat(qp[k]); }).join('&'));
};
exports.generateGHIssueLink = generateGHIssueLink;
/**
 * If the file is a DataURL, return it. If it's a file, convert it to a DataURL. If it's a URL,
 * download it and convert it to a DataURL. If Base64, returns it.
 * @param {string} file - The file to be converted to a DataURL.
 * @param {AxiosRequestConfig} requestConfig - AxiosRequestConfig = {}
 * @param {string} filename - Filename with an extension so a datauri mimetype can be inferred.
 * @returns A DataURL
 */
var ensureDUrl = function (file, requestConfig, filename) {
    if (requestConfig === void 0) { requestConfig = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var ext, relativePath, ext;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!Buffer.isBuffer(file)) return [3 /*break*/, 4];
                    if (!!filename) return [3 /*break*/, 3];
                    return [4 /*yield*/, ft()];
                case 1: return [4 /*yield*/, (_a.sent()).fileTypeFromBuffer(file)];
                case 2:
                    ext = (_a.sent()).ext;
                    filename = "file.".concat(ext);
                    _a.label = 3;
                case 3: return [2 /*return*/, "data:".concat(mime_1["default"].getType(filename), ";base64,").concat(file.toString('base64').split(',')[1])];
                case 4:
                    if (!(!(0, exports.isDataURL)(file) && !(0, exports.isBase64)(file))) return [3 /*break*/, 9];
                    relativePath = path.join(path.resolve(process.cwd(), file || ''));
                    if (!(fs.existsSync(file) || fs.existsSync(relativePath))) return [3 /*break*/, 6];
                    return [4 /*yield*/, (0, datauri_1["default"])(fs.existsSync(file) ? file : relativePath)];
                case 5:
                    file = _a.sent();
                    return [3 /*break*/, 9];
                case 6:
                    if (!(0, is_url_superb_1["default"])(file)) return [3 /*break*/, 8];
                    return [4 /*yield*/, (0, exports.getDUrl)(file, requestConfig)];
                case 7:
                    file = _a.sent();
                    return [3 /*break*/, 9];
                case 8: throw new model_1.CustomError(model_1.ERROR_NAME.FILE_NOT_FOUND, 'Cannot find file. Make sure the file reference is relative, a valid URL or a valid DataURL');
                case 9:
                    if (!!filename) return [3 /*break*/, 12];
                    return [4 /*yield*/, ft()];
                case 10: return [4 /*yield*/, (_a.sent()).fileTypeFromBuffer(Buffer.from(file.split(',')[1], 'base64'))];
                case 11:
                    ext = (_a.sent()).ext;
                    filename = "file.".concat(ext);
                    _a.label = 12;
                case 12:
                    if (file.includes("data:") && file.includes("undefined") || file.includes("application/octet-stream") && filename && mime_1["default"].getType(filename)) {
                        file = "data:".concat(mime_1["default"].getType(filename), ";base64,").concat(file.split(',')[1]);
                    }
                    return [2 /*return*/, file];
            }
        });
    });
};
exports.ensureDUrl = ensureDUrl;
exports.FileInputTypes = {
    "VALIDATED_FILE_PATH": "VALIDATED_FILE_PATH",
    "URL": "URL",
    "DATA_URL": "DATA_URL",
    "BASE_64": "BASE_64",
    "BUFFER": "BUFFER",
    "READ_STREAM": "READ_STREAM"
};
exports.FileOutputTypes = __assign(__assign({}, exports.FileInputTypes), { "TEMP_FILE_PATH": "TEMP_FILE_PATH" });
/**
 * Remove file asynchronously
 * @param file Filepath
 * @returns
 */
function rmFileAsync(file) {
    return new Promise(function (resolve, reject) {
        fs.unlink(file, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve(true);
            }
        });
    });
}
exports.rmFileAsync = rmFileAsync;
/**
 * Takes a file parameter and consistently returns the desired type of file.
 * @param file The file path, URL, base64 or DataURL string of the file
 * @param outfileName The ouput filename of the file
 * @param desiredOutputType The type of file output required from this function
 * @param requestConfig optional axios config if file parameter is a url
 */
var assertFile = function (file, outfileName, desiredOutputType, requestConfig) { return __awaiter(void 0, void 0, void 0, function () {
    var inputType, relativePath, _a, tfn, ext, tempFilePath, _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                outfileName = (0, exports.sanitizeAccentedChars)(outfileName);
                if (typeof file == 'string') {
                    if ((0, exports.isDataURL)(file))
                        inputType = exports.FileInputTypes.DATA_URL;
                    else if ((0, exports.isBase64)(file))
                        inputType = exports.FileInputTypes.BASE_64;
                    /**
                     * Check if it is a path
                     */
                    else {
                        relativePath = path.join(path.resolve(process.cwd(), file || ''));
                        if (fs.existsSync(file) || fs.existsSync(relativePath)) {
                            // file = await datauri(fs.existsSync(file)  ? file : relativePath);
                            inputType = exports.FileInputTypes.VALIDATED_FILE_PATH;
                        }
                        else if ((0, is_url_superb_1["default"])(file))
                            inputType = exports.FileInputTypes.URL;
                        /**
                         * If not file type is determined by now then it is some sort of unidentifiable string. Throw an error.
                         */
                        if (!inputType)
                            throw new model_1.CustomError(model_1.ERROR_NAME.FILE_NOT_FOUND, "Cannot find file. Make sure the file reference is relative, a valid URL or a valid DataURL: ".concat(file.slice(0, 25)));
                    }
                }
                else {
                    if (Buffer.isBuffer(file))
                        inputType = exports.FileInputTypes.BUFFER;
                    /**
                     * Leave space to determine if incoming file parameter is any other type of object (maybe one day people will submit a path object as a param?)
                     */
                }
                if (inputType === desiredOutputType)
                    return [2 /*return*/, file];
                _a = desiredOutputType;
                switch (_a) {
                    case exports.FileOutputTypes.DATA_URL: return [3 /*break*/, 1];
                    case exports.FileOutputTypes.BASE_64: return [3 /*break*/, 1];
                    case exports.FileOutputTypes.TEMP_FILE_PATH: return [3 /*break*/, 3];
                    case exports.FileOutputTypes.BUFFER: return [3 /*break*/, 7];
                    case exports.FileOutputTypes.READ_STREAM: return [3 /*break*/, 9];
                }
                return [3 /*break*/, 13];
            case 1: return [4 /*yield*/, (0, exports.ensureDUrl)(file, requestConfig, outfileName)];
            case 2: return [2 /*return*/, _f.sent()];
            case 3:
                tfn = "".concat(crypto_1["default"].randomBytes(6).readUIntLE(0, 6).toString(36), ".").concat(outfileName);
                if (!(inputType != exports.FileInputTypes.BUFFER)) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, exports.ensureDUrl)(file, requestConfig, outfileName)];
            case 4:
                file = _f.sent();
                ext = mime_1["default"].getExtension(file.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0]);
                if (ext && !IGNORE_FILE_EXTS.includes(ext) && !tfn.endsWith(ext))
                    tfn = "".concat(tfn, ".").concat(ext);
                file = Buffer.from(file.split(',')[1], 'base64');
                _f.label = 5;
            case 5:
                tempFilePath = path.join((0, os_2.tmpdir)(), tfn);
                return [4 /*yield*/, fs.writeFileSync(tempFilePath, file)];
            case 6:
                _f.sent();
                logging_1.log.info("Saved temporary file to ".concat(tempFilePath));
                return [2 /*return*/, tempFilePath];
            case 7:
                _c = (_b = Buffer).from;
                return [4 /*yield*/, (0, exports.ensureDUrl)(file, requestConfig, outfileName)];
            case 8: return [2 /*return*/, _c.apply(_b, [(_f.sent()).split(',')[1], 'base64'])];
            case 9:
                if (!(inputType === exports.FileInputTypes.VALIDATED_FILE_PATH)) return [3 /*break*/, 10];
                return [2 /*return*/, fs.createReadStream(file)];
            case 10:
                if (!(inputType != exports.FileInputTypes.BUFFER)) return [3 /*break*/, 12];
                _e = (_d = Buffer).from;
                return [4 /*yield*/, (0, exports.ensureDUrl)(file, requestConfig, outfileName)];
            case 11:
                file = _e.apply(_d, [(_f.sent()).split(',')[1], 'base64']);
                _f.label = 12;
            case 12: return [2 /*return*/, stream_1.Readable.from(file)];
            case 13: return [2 /*return*/, file];
        }
    });
}); };
exports.assertFile = assertFile;
/**
 * Checks if a given path exists.
 *
 * If exists, returns the resolved absolute path. Otherwise returns false.
 *
 * @param _path a relative, absolute or homedir path to a folder or a file
 * @param failSilent If you're expecting for the file to not exist and just want the `false` response then set this to true to prevent false-positive error messages in the logs.
 * @returns string | false
 */
var pathExists = function (_path, failSilent) { return __awaiter(void 0, void 0, void 0, function () {
    var error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _path = (0, exports.fixPath)(_path);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fsp.access(_path, fsconstants.R_OK | fsconstants.W_OK)];
            case 2:
                _a.sent();
                return [2 /*return*/, _path];
            case 3:
                error_3 = _a.sent();
                if (!failSilent)
                    logging_1.log.error('Given check path threw an error', error_3);
                return [2 /*return*/, false];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.pathExists = pathExists;
/**
 * Returns an absolute file path reference
 * @param _path a relative, absolute or homedir path to a folder or a file
 * @returns string
 */
var fixPath = function (_path) {
    _path = _path.replace("~", (0, os_1.homedir)());
    _path = _path.includes('./') ? path.join(process.cwd(), _path) : _path;
    return _path;
};
exports.fixPath = fixPath;
/**
 *
 * Accented filenames break file sending in docker containers. This is used to replace accented chars in strings to prevent file sending failures.
 *
 * @param input The raw string
 * @returns A sanitized string with all accented chars removed
 */
var sanitizeAccentedChars = function (input) {
    return input
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
};
exports.sanitizeAccentedChars = sanitizeAccentedChars;
