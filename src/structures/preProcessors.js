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
exports.PREPROCESSORS = exports.MessagePreprocessors = void 0;
var mime_1 = require("mime");
var fs_extra_1 = require("fs-extra");
var config_1 = require("../api/model/config");
var p_queue_1 = require("p-queue");
var pico_s3_1 = require("pico-s3");
var processedFiles = {};
var uploadQueue;
var SCRUB = function (message) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (message.deprecatedMms3Url && message.mimetype)
            return [2 /*return*/, __assign(__assign({}, message), { content: "", body: "" })];
        return [2 /*return*/, message];
    });
}); };
var BODY_ONLY = function (message) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (message.deprecatedMms3Url && message.mimetype)
            return [2 /*return*/, __assign(__assign({}, message), { content: "" })];
        return [2 /*return*/, message];
    });
}); };
var AUTO_DECRYPT = function (message, client) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!(message.deprecatedMms3Url && message.mimetype)) return [3 /*break*/, 2];
                _a = [__assign({}, message)];
                _b = {};
                return [4 /*yield*/, client.decryptMedia(message)];
            case 1: return [2 /*return*/, __assign.apply(void 0, _a.concat([(_b.body = _c.sent(), _b)]))];
            case 2: return [2 /*return*/, message];
        }
    });
}); };
var AUTO_DECRYPT_SAVE = function (message, client, alreadyBeingProcessed) { return __awaiter(void 0, void 0, void 0, function () {
    var filename, filePath, mediaData, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(message.deprecatedMms3Url && message.mimetype)) return [3 /*break*/, 5];
                filename = "".concat(message.mId, ".").concat(mime_1["default"].getExtension(message.mimetype));
                filePath = "media/".concat(filename);
                if (alreadyBeingProcessed) {
                    return [2 /*return*/, __assign(__assign({}, message), { body: filename, content: "", filePath: filePath })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, client.decryptMedia(message)];
            case 2:
                mediaData = _a.sent();
                (0, fs_extra_1.outputFileSync)(filePath, Buffer.from(mediaData.split(",")[1], "base64"));
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error(error_1);
                return [2 /*return*/, message];
            case 4: return [2 /*return*/, __assign(__assign({}, message), { body: filename, content: "", filePath: filePath })];
            case 5: return [2 /*return*/, message];
        }
    });
}); };
var UPLOAD_CLOUD = function (message, client, alreadyBeingProcessed) { return __awaiter(void 0, void 0, void 0, function () {
    var cloudUploadOptions, filename, mediaData, provider, opts_1, dirStrat, directory, url, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!((message === null || message === void 0 ? void 0 : message.deprecatedMms3Url) && message.mimetype)) return [3 /*break*/, 6];
                cloudUploadOptions = client.getConfig().cloudUploadOptions;
                if (message.fromMe && (cloudUploadOptions.ignoreHostAccount || process.env.OW_CLOUD_IGNORE_HOST))
                    return [2 /*return*/, message];
                if (!uploadQueue) {
                    uploadQueue = new p_queue_1["default"]({ concurrency: 2, interval: 1000, carryoverConcurrencyCount: true, intervalCap: 2 });
                }
                filename = "".concat(message.mId || "".concat(Date.now()), ".").concat(mime_1["default"].getExtension(message.mimetype));
                return [4 /*yield*/, client.decryptMedia(message)];
            case 1:
                mediaData = _a.sent();
                if (!cloudUploadOptions)
                    return [2 /*return*/, message];
                provider = (process.env.OW_CLOUD_PROVIDER || cloudUploadOptions.provider);
                opts_1 = {
                    file: mediaData,
                    filename: filename,
                    provider: provider,
                    accessKeyId: process.env.OW_CLOUD_ACCESS_KEY_ID || cloudUploadOptions.accessKeyId,
                    secretAccessKey: process.env.OW_CLOUD_SECRET_ACCESS_KEY || cloudUploadOptions.secretAccessKey,
                    bucket: process.env.OW_CLOUD_BUCKET || cloudUploadOptions.bucket,
                    region: process.env.OW_CLOUD_REGION || cloudUploadOptions.region,
                    public: process.env.OW_CLOUD_PUBLIC && true || cloudUploadOptions.public,
                    headers: cloudUploadOptions.headers
                };
                dirStrat = process.env.OW_DIRECTORY || cloudUploadOptions.directory;
                if (dirStrat) {
                    directory = '';
                    switch (dirStrat) {
                        case config_1.DIRECTORY_STRATEGY.DATE:
                            directory = "".concat(new Date().toISOString().slice(0, 10));
                            break;
                        case config_1.DIRECTORY_STRATEGY.CHAT:
                            directory = "".concat(message.from.replace("@c.us", "").replace("@g.us", ""));
                            break;
                        case config_1.DIRECTORY_STRATEGY.DATE_CHAT:
                            directory = "".concat(new Date().toISOString().slice(0, 10), "/").concat(message.from.replace("@c.us", "").replace("@g.us", ""));
                            break;
                        case config_1.DIRECTORY_STRATEGY.CHAT_DATE:
                            directory = "".concat(message.from.replace("@c.us", "").replace("@g.us", ""), "/").concat(new Date().toISOString().slice(0, 10));
                            break;
                        default:
                            directory = dirStrat;
                            break;
                    }
                    opts_1.directory = directory;
                }
                if (!opts_1.accessKeyId) {
                    console.error("UPLOAD ERROR: No accessKeyId provided. If you're using the CLI, set env var OW_CLOUD_ACCESS_KEY_ID");
                    return [2 /*return*/, message];
                }
                if (!opts_1.secretAccessKey) {
                    console.error("UPLOAD ERROR: No secretAccessKey provided. If you're using the CLI, set env var OW_CLOUD_SECRET_ACCESS_KEY");
                    return [2 /*return*/, message];
                }
                if (!opts_1.bucket) {
                    console.error("UPLOAD ERROR: No bucket provided. If you're using the CLI, set env var OW_CLOUD_BUCKET");
                    return [2 /*return*/, message];
                }
                if (!opts_1.provider) {
                    console.error("UPLOAD ERROR: No provider provided. If you're using the CLI, set env var OW_CLOUD_PROVIDER");
                    return [2 /*return*/, message];
                }
                url = (0, pico_s3_1.getCloudUrl)(opts_1);
                if (!(!processedFiles[filename] && !alreadyBeingProcessed)) return [3 /*break*/, 5];
                processedFiles[filename] = true;
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, uploadQueue.add(function () { return (0, pico_s3_1.upload)(opts_1)["catch"](function () { }); })];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.error(error_2);
                return [2 /*return*/, message];
            case 5: return [2 /*return*/, __assign(__assign({}, message), { cloudUrl: url })];
            case 6: return [2 /*return*/, message];
        }
    });
}); };
/**
 * An object that contains all available [[PREPROCESSORS]].
 *
 * [Check out the processor code here](https://github.com/open-wa/wa-automate-nodejs/blob/master/src/structures/preProcessors.ts)
 */
exports.MessagePreprocessors = {
    AUTO_DECRYPT_SAVE: AUTO_DECRYPT_SAVE,
    AUTO_DECRYPT: AUTO_DECRYPT,
    BODY_ONLY: BODY_ONLY,
    SCRUB: SCRUB,
    UPLOAD_CLOUD: UPLOAD_CLOUD
};
/**
 * A set of easy to use, built-in message processors.
 *
 * [Check out the processor code here](https://github.com/open-wa/wa-automate-nodejs/blob/master/src/structures/preProcessors.ts)
 *
 */
var PREPROCESSORS;
(function (PREPROCESSORS) {
    /**
     * This preprocessor scrubs `body` and `content` from media messages.
     * This would be useful if you want to reduce the message object size because neither of these values represent the actual file, only the thumbnail.
     */
    PREPROCESSORS["SCRUB"] = "SCRUB";
    /**
     * A preprocessor that limits the amount of base64 data is present in the message object by removing duplication of `body` in `content` by replacing `content` with `""`.
     */
    PREPROCESSORS["BODY_ONLY"] = "BODY_ONLY";
    /**
     * Replaces the media thumbnail base64 in `body` with the actual file's DataURL.
     */
    PREPROCESSORS["AUTO_DECRYPT"] = "AUTO_DECRYPT";
    /**
     * Automatically saves the file in a folder named `/media` relative to the process working directory.
     *
     * PLEASE NOTE, YOU WILL NEED TO MANUALLY CLEAR THIS FOLDER!!!
     */
    PREPROCESSORS["AUTO_DECRYPT_SAVE"] = "AUTO_DECRYPT_SAVE";
    /**
     *
     * Uploads file to a cloud storage provider (GCP/AWS for now).
     *
     * If this preprocessor is set then you have to also set [`cloudUploadOptions`](https://docs.openwa.dev/docs/reference/api/model/config/interfaces/ConfigObject#clouduploadoptions) in the config.
     *
     */
    PREPROCESSORS["UPLOAD_CLOUD"] = "UPLOAD_CLOUD";
})(PREPROCESSORS = exports.PREPROCESSORS || (exports.PREPROCESSORS = {}));
