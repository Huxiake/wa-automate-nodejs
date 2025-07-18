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
exports.__esModule = true;
exports.setupLogging = exports.addSysLogTransport = exports.addRotateFileLogTransport = exports.log = void 0;
var os_1 = require("os");
var winston = require("winston");
var winston_daily_rotate_file_1 = require("winston-daily-rotate-file");
var winston_syslog_1 = require("winston-syslog");
var custom_transport_1 = require("./custom_transport");
var _a = winston.format, combine = _a.combine, timestamp = _a.timestamp;
var traverse_1 = require("traverse");
var full_1 = require("klona/full");
var truncateLength = 200;
var _evSet = false, _consoleSet = false, d = Date.now();
var sensitiveKeys = [
    /cookie/i,
    /sessionData/i,
    /passw(or)?d/i,
    /^pw$/,
    /^pass$/i,
    /secret/i,
    /token/i,
    /api[-._]?key/i,
];
var getCircularReplacer = function () {
    var seen = new WeakSet();
    return function (_key, value) {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return "[Circular]";
            }
            seen.add(value);
        }
        return value;
    };
};
var k = function (obj) {
    try {
        return (0, full_1.klona)(obj);
    }
    catch (error) {
        return (0, full_1.klona)(JSON.parse(JSON.stringify(obj, getCircularReplacer())));
    }
};
function isSensitiveKey(keyStr) {
    if (keyStr && typeof keyStr == "string") {
        return sensitiveKeys.some(function (regex) { return regex.test(keyStr); });
    }
}
function redactObject(obj) {
    (0, traverse_1["default"])(obj).forEach(function redactor() {
        if (isSensitiveKey(this.key)) {
            this.update("[REDACTED]");
        }
        else if (typeof this.node === 'string' && this.node.length > truncateLength) {
            this.update(truncate(this.node, truncateLength));
        }
    });
}
function redact(obj) {
    var copy = k(obj); // Making a deep copy to prevent side effects
    redactObject(copy);
    var splat = copy[Symbol["for"]("splat")];
    redactObject(splat); // Specifically redact splat Symbol
    return copy;
}
function truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) + '...[TRUNCATED]...' : str;
}
var formatRedact = winston.format(redact);
var stringSaver = winston.format(function (info) {
    var copy = k(info);
    var splat = copy[Symbol["for"]("splat")];
    if (splat) {
        copy.message = "".concat(copy.message, " ").concat(splat.filter(function (x) { return typeof x !== 'object'; }).join(' '));
        copy[Symbol["for"]("splat")] = splat.filter(function (x) { return typeof x == 'object'; });
        return copy;
    }
    return info;
});
/**
 * To prevent "Attempt to write logs with no transports" error
 */
var placeholderTransport = new custom_transport_1.NoOpTransport();
var makeLogger = function () {
    return winston.createLogger({
        format: combine(stringSaver(), timestamp(), winston.format.json(), formatRedact(), winston.format.splat(), winston.format.simple()),
        levels: winston.config.syslog.levels,
        transports: [placeholderTransport]
    });
};
/**
 * You can access the log in your code and add your own custom transports
 * https://github.com/winstonjs/winston#transports
 * see [Logger](https://github.com/winstonjs/winston#transports) for more details.
 *
 * Here is an example of adding the GCP stackdriver transport:
 *
 * ```
 * import { log } from '@open-wa/wa-automate'
 * import { LoggingWinston } from '@google-cloud/logging-winston';
 *
 * const gcpTransport = new LoggingWinston({
 *     projectId: 'your-project-id',
 *     keyFilename: '/path/to/keyfile.json'
 *   });
 *
 * ...
 * log.add(
 *  gcpTransport
 * )
 *
 * //Congrats! Now all of your session logs will also go to GCP Stackdriver
 * ```
 */
exports.log = makeLogger();
if (exports.log.warning && !exports.log.warn)
    exports.log.warn = exports.log.warning;
if (exports.log.alert && !exports.log.help)
    exports.log.help = exports.log.alert;
var addRotateFileLogTransport = function (options) {
    if (options === void 0) { options = {}; }
    exports.log.add(new winston_daily_rotate_file_1["default"](__assign({ filename: 'application-%DATE%.log', datePattern: 'YYYY-MM-DD-HH', zippedArchive: true, maxSize: '2m', maxFiles: '14d' }, options)));
};
exports.addRotateFileLogTransport = addRotateFileLogTransport;
/**
 * @private
 */
var addSysLogTransport = function (options) {
    if (options === void 0) { options = {}; }
    exports.log.add(new winston_syslog_1.Syslog(__assign({ localhost: os_1["default"].hostname() }, options)));
};
exports.addSysLogTransport = addSysLogTransport;
var enableConsoleLogger = function (options) {
    if (options === void 0) { options = {}; }
    if (_consoleSet)
        return;
    exports.log.add(new winston.transports.Console(__assign({ level: 'debug', timestamp: timestamp() }, options)));
    _consoleSet = true;
};
function enableLogToEv(options) {
    if (options === void 0) { options = {}; }
    if (_evSet)
        return;
    exports.log.add(new custom_transport_1.LogToEvTransport(__assign({ format: winston.format.json() }, options)));
    _evSet = true;
}
/**
 * @private
 */
var setupLogging = function (logging, sessionId) {
    if (sessionId === void 0) { sessionId = "session"; }
    var currentlySetup = [];
    var _logging = logging.map(function (l) {
        if (l.done)
            return l;
        if (l.type === 'console') {
            enableConsoleLogger(__assign({}, (l.options || {})));
        }
        else if (l.type === 'ev') {
            enableLogToEv(__assign({}, (l.options || {})));
        }
        else if (l.type === 'file') {
            (0, exports.addRotateFileLogTransport)(__assign({}, (l.options || {})));
        }
        else if (l.type === 'syslog') {
            (0, exports.addSysLogTransport)(__assign(__assign({}, (l.options || {})), { appName: "owa-".concat(sessionId, "-").concat(d) }));
        }
        currentlySetup.push(l);
        return __assign(__assign({}, l), { done: true });
    });
    currentlySetup.map(function (l) {
        exports.log.info("Set up logging for ".concat(l.type), l.options);
        return l;
    });
    return _logging;
};
exports.setupLogging = setupLogging;
