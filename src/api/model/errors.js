"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.AddParticipantError = exports.AddParticipantErrorStatusCode = exports.CustomError = exports.ERROR_NAME = exports.SessionExpiredError = exports.PageEvaluationTimeout = void 0;
var PageEvaluationTimeout = /** @class */ (function (_super) {
    __extends(PageEvaluationTimeout, _super);
    function PageEvaluationTimeout() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, PageEvaluationTimeout);
        }
        _this.name = 'PageEvaluationTimeout';
        _this.message =
            'The method call was timed out but it may have been successfull in the WA session. It is just no longer holding up the process';
        return _this;
    }
    return PageEvaluationTimeout;
}(Error));
exports.PageEvaluationTimeout = PageEvaluationTimeout;
var SessionExpiredError = /** @class */ (function (_super) {
    __extends(SessionExpiredError, _super);
    function SessionExpiredError() {
        var _this = _super.call(this, "This session has been deauthenticated!") || this;
        _this.name = "SessionExpiredError"; // (2)
        return _this;
    }
    return SessionExpiredError;
}(Error));
exports.SessionExpiredError = SessionExpiredError;
/**
 * Enum of error names specific to this library
 */
var ERROR_NAME;
(function (ERROR_NAME) {
    /**
     * The sticker file exceeds the maximum 1MB limit
     */
    ERROR_NAME["STICKER_TOO_LARGE"] = "STICKER_TOO_LARGE";
    /**
     * An expected URL is missing
     */
    ERROR_NAME["MISSING_URL"] = "MISSING_URL";
    /**
     * The puppeteer page has been closed or the client has lost the connection with the page. This can happen if your computer/server has gone to sleep and waken up. Please restart your session.
     */
    ERROR_NAME["PAGE_CLOSED"] = "PAGE_CLOSED";
    /**
     * The client state is preventing the command from completing.
     */
    ERROR_NAME["STATE_ERROR"] = "STATE_ERROR";
    /**
     * The message is not a media message.
     */
    ERROR_NAME["NOT_MEDIA"] = "NOT_MEDIA";
    /**
     * Expected media is missing.
     */
    ERROR_NAME["MEDIA_MISSING"] = "MEDIA_MISSING";
    /**
     * The attempt to decrypt a sticker message has failed.
     */
    ERROR_NAME["STICKER_NOT_DECRYPTED"] = "STICKER_NOT_DECRYPTED";
    /**
     * File was not found at given path.
     */
    ERROR_NAME["FILE_NOT_FOUND"] = "FILE_NOT_FOUND";
    /**
     * The sticker metadata parameter is wrong.
     */
    ERROR_NAME["BAD_STICKER_METADATA"] = "BAD_STICKER_METADATA";
    /**
     * Unable to send text
     */
    ERROR_NAME["SENDTEXT_FAILURE"] = "SENDTEXT_FAILURE";
    /**
     * Label does not exist
     */
    ERROR_NAME["INVALID_LABEL"] = "INVALID_LABEL";
})(ERROR_NAME = exports.ERROR_NAME || (exports.ERROR_NAME = {}));
/**
 * A simple custom error class that takes the first parameter as the name using the [[ERROR_NAME]] enum
 */
var CustomError = /** @class */ (function (_super) {
    __extends(CustomError, _super);
    function CustomError(name, message) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        var _this = _super.apply(this, __spreadArray([
            message
        ], params, true)) || this;
        _this.name = name;
        _this.message = message;
        return _this;
    }
    return CustomError;
}(Error));
exports.CustomError = CustomError;
/**
 * Add Participants Status Code Enum
 */
var AddParticipantErrorStatusCode;
(function (AddParticipantErrorStatusCode) {
    /**
     * Participant could not be added to group because they are already in the group
     */
    AddParticipantErrorStatusCode[AddParticipantErrorStatusCode["ALREADY_IN_GROUP"] = 409] = "ALREADY_IN_GROUP";
    /**
     * Participant could not be added to group because their privacy settings do not allow you to add them.
     */
    AddParticipantErrorStatusCode[AddParticipantErrorStatusCode["PRIVACY_SETTINGS"] = 403] = "PRIVACY_SETTINGS";
    /**
     * Participant could not be added to group because they recently left.
     */
    AddParticipantErrorStatusCode[AddParticipantErrorStatusCode["RECENTLY_LEFT"] = 408] = "RECENTLY_LEFT";
    /**
     * Participant could not be added to group because the group is full
     */
    AddParticipantErrorStatusCode[AddParticipantErrorStatusCode["GROUP_FULL"] = 500] = "GROUP_FULL";
})(AddParticipantErrorStatusCode = exports.AddParticipantErrorStatusCode || (exports.AddParticipantErrorStatusCode = {}));
var AddParticipantError = /** @class */ (function (_super) {
    __extends(AddParticipantError, _super);
    function AddParticipantError(message, data) {
        var _this = _super.call(this) || this;
        _this.name = "ADD_PARTICIPANTS_ERROR";
        _this.message = message;
        _this.data = data;
        return _this;
    }
    return AddParticipantError;
}(Error));
exports.AddParticipantError = AddParticipantError;
