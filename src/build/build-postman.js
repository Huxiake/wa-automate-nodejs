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
exports.generatePostmanJson = void 0;
var fs = require("fs");
var path = require("path");
var parse_url_1 = require("parse-url");
var noCase;
var format = function (s) { return s === null || s === void 0 ? void 0 : s.replace(/[[/g,'').replace(/]]/g, '').replace(/@param/g, 'Parameter:'); };
var ignoredMethods = [
    'pup',
    'loaded',
    'createMessageCollector',
    'awaitMessages',
    "logger"
];
var aliasExamples = {
    "ChatId": "00000000000@c.us or 00000000000-111111111@g.us",
    "GroupChatId": "00000000000-111111111@g.us",
    "Content": 'Hello World!',
    "DataURL": 'data:[<mediatype>][;base64],<data>',
    "Base64": "Learn more here: https://developer.mozilla.org/en-US/docs/Glossary/Base64",
    "MessageId": "false_447123456789@c.us_9C4D0965EA5C09D591334AB6BDB07FEB",
    "ContactId": "00000000000@c.us"
};
var paramNameExamples = {
    "ChatId": "00000000000@c.us  or 00000000000-111111111@g.us"
};
var primatives = [
    'number',
    'string',
    'boolean'
];
function getMethodsWithDocs() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var Project, project, res, fp, sourceFile, _i, _b, method;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require("ts-morph"); })];
                case 1:
                    Project = (_c.sent()).Project;
                    project = new Project({
                        compilerOptions: {
                            target: 99
                        }
                    });
                    res = [];
                    fp = fs.existsSync(path.resolve(__dirname, '../api/Client.d.ts')) ? '../api/Client.d.ts' : '../api/Client.ts';
                    sourceFile = project.addSourceFileAtPath(path.resolve(__dirname, fp));
                    for (_i = 0, _b = sourceFile.getClass('Client').getMethods(); _i < _b.length; _i++) {
                        method = _b[_i];
                        if (!method.hasModifier(120)) {
                            res.push({
                                name: method.getName(),
                                parameters: method.getParameters().map(function (param) {
                                    var _a, _b, _c, _d;
                                    return {
                                        name: param.getName(),
                                        type: ((_a = param.getTypeNode()) === null || _a === void 0 ? void 0 : _a.getText()) || ((_d = (((_b = param.getType()) === null || _b === void 0 ? void 0 : _b.getAliasSymbol()) || ((_c = param.getType()) === null || _c === void 0 ? void 0 : _c.getSymbol()))) === null || _d === void 0 ? void 0 : _d.getEscapedName()),
                                        isOptional: param.isOptional()
                                    };
                                }),
                                text: format((_a = method.getJsDocs()[0]) === null || _a === void 0 ? void 0 : _a.getInnerText())
                            });
                        }
                    }
                    return [2 /*return*/, res];
            }
        });
    });
}
var generatePostmanJson = function (setup) {
    if (setup === void 0) { setup = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var parsed, s, x, postmanGen, pm, postmanWrap, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!noCase) return [3 /*break*/, 2];
                    return [4 /*yield*/, Promise.resolve().then(function () { return require("change-case"); })];
                case 1:
                    noCase = (_a.sent()).noCase;
                    _a.label = 2;
                case 2:
                    if (setup === null || setup === void 0 ? void 0 : setup.apiHost) {
                        if (setup.apiHost.includes(setup.sessionId)) {
                            parsed = (0, parse_url_1["default"])(setup.apiHost);
                            setup.host = parsed.resource;
                            setup.port = parsed.port;
                        }
                    }
                    return [4 /*yield*/, getMethodsWithDocs()];
                case 3:
                    s = _a.sent();
                    x = s.filter(function (_a) {
                        var visibility = _a.visibility;
                        return visibility == 2 || visibility == undefined;
                    }).filter(function (_a) {
                        var name = _a.name;
                        return !name.startsWith('on');
                    }).filter(function (_a) {
                        var name = _a.name;
                        return !ignoredMethods.includes(name);
                    }).map(function (method) { return (__assign({ text: s[method.name] || '' }, method)); });
                    postmanGen = postmanRequestGeneratorGenerator(setup);
                    pm = x.map(postmanGen);
                    postmanWrap = postmanWrapGen(setup);
                    res = postmanWrap(pm);
                    if (!(setup === null || setup === void 0 ? void 0 : setup.skipSavePostmanCollection))
                        fs.writeFileSync("./open-wa-".concat(setup.sessionId, ".postman_collection.json"), JSON.stringify(res));
                    return [2 /*return*/, res];
            }
        });
    });
};
exports.generatePostmanJson = generatePostmanJson;
function escape(key, val) {
    if (typeof (val) != "string")
        return val;
    return val
        .replace(/["]/g, '\\"')
        .replace(/[\\]/g, '\\\\')
        .replace(/[/]/g, '\\/')
        .replace(/[\b]/g, '\\b')
        .replace(/[\f]/g, '\\f')
        .replace(/[\n]/g, '\\n')
        .replace(/[\r]/g, '\\r')
        .replace(/[\t]/g, '\\t');
}
var postmanRequestGeneratorGenerator = function (setup) { return function (method) {
    // if(!noCase) noCase = await import("change-case");
    var args = {};
    method.parameters.forEach(function (param) {
        args[param.name] = aliasExamples[param.type] ? aliasExamples[param.type] : paramNameExamples[param.name] ? paramNameExamples[param.name] : primatives.includes(param.type) ? param.type : 'Check documentation in description';
    });
    var hostpath = setup.apiHost ? (0, parse_url_1["default"])(setup.apiHost).pathname.substring(1) : false;
    var url = {
        "raw": setup.apiHost ? "{{address}}:{{port}}".concat(hostpath ? "/".concat(hostpath) : '', "/").concat(method.name) : (setup === null || setup === void 0 ? void 0 : setup.useSessionIdInPath) ? "{{address}}:{{port}}/{{sessionId}}/" + method.name : "{{address}}:{{port}}/" + method.name,
        "host": [
            "{{address}}"
        ],
        "port": "{{port}}",
        "path": (setup === null || setup === void 0 ? void 0 : setup.apiHost) ? [
            (0, parse_url_1["default"])(setup.apiHost).pathname.substring(1),
            "" + method.name
        ].filter(function (x) { return x; }) : (setup === null || setup === void 0 ? void 0 : setup.useSessionIdInPath) ? [
            "{{sessionId}}",
            "" + method.name
        ] : ["" + method.name]
    };
    var name = noCase(method.name).replace(/\b[a-z]|['_][a-z]|\B[A-Z]/g, function (x) { return x[0] === "'" || x[0] === "_" ? x : String.fromCharCode(x.charCodeAt(0) ^ 32); });
    var request = {
        "auth": {
            "type": "apikey",
            "apikey": [
                {
                    "key": "value",
                    "value": setup === null || setup === void 0 ? void 0 : setup.preAuthDocs && setup.key,
                    "type": "string"
                },
                {
                    "key": "key",
                    "value": "key",
                    "type": "string"
                }
            ]
        },
        "method": "POST",
        "header": [
            {
                "key": "Content-Type",
                "name": "Content-Type",
                "type": "text",
                "value": "application/json"
            }
        ],
        "body": {
            "mode": "raw",
            "raw": JSON.stringify({ args: args }, escape, 4),
            "options": {
                "raw": {
                    "language": "json"
                }
            }
        },
        url: url,
        "documentationUrl": "https://docs.openwa.dev/docs/reference/api/Client/classes/Client#".concat((method.name || "").toLowerCase()),
        "description": "".concat(method.text, "\n[External Documentation](https://docs.openwa.dev/docs/reference/api/Client/classes/Client#").concat((method.name || "").toLowerCase(), ")")
    };
    if (!(setup === null || setup === void 0 ? void 0 : setup.key))
        delete request.auth;
    if (method.parameters.length === 0) {
        request.body.raw = "{}";
        // delete request.body;
    }
    var resp = {
        name: name,
        "originalRequest": request,
        "code": 200,
        "_postman_previewlanguage": "json",
        "header": request.header,
        "cookie": [],
        "body": "{\n    \"success\": true\n}"
    };
    return {
        name: name,
        request: request,
        "response": [resp]
    };
}; };
var postmanWrapGen = function (setup) { return function (item) { return ({
    "info": {
        "_postman_id": "0df31aa3-b3ce-4f20-b042-0882db0fd3a2",
        "name": "@open-wa - ".concat(setup.sessionId),
        "description": "Requests for use with open-wa",
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    item: item,
    "event": [
        {
            "listen": "prerequest",
            "script": {
                "id": "d1f29ae1-7df9-46d0-8f67-4f53f562ad7e",
                "type": "text/javascript",
                "exec": [
                    ""
                ]
            }
        },
        {
            "listen": "test",
            "script": {
                "id": "370a2b6c-41d3-418f-ad9b-0404865429ce",
                "type": "text/javascript",
                "exec": [
                    ""
                ]
            }
        }
    ],
    "variable": [
        {
            "id": "43c133cc-7b9f-4dbe-a513-8832b664adb4",
            "key": "address",
            "value": (setup === null || setup === void 0 ? void 0 : setup.host) || "localhost"
        },
        {
            "id": "fda078e5-712a-41bf-9da0-468fe3586d18",
            "key": "port",
            "value": (setup === null || setup === void 0 ? void 0 : setup.port) || "8008"
        },
        {
            "id": "c1573a97-c016-4cf4-8b29-938c45146d04",
            "key": "sessionId",
            "value": (setup === null || setup === void 0 ? void 0 : setup.sessionId) || "session"
        }
    ],
    "protocolProfileBehavior": {}
}); }; };
