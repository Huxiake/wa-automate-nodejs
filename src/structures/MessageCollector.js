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
exports.__esModule = true;
exports.MessageCollector = void 0;
var events_1 = require("../api/model/events");
var Collector_1 = require("./Collector");
/**
 * @typedef {CollectorOptions} MessageCollectorOptions
 * @property {number} max The maximum amount of messages to collect
 * @property {number} maxProcessed The maximum amount of messages to process
 */
/**
 * Collects messages on a chat.
 * Will automatically stop if the chat (`'chatDelete'`) is deleted.
 * @extends {Collector}
 */
var MessageCollector = /** @class */ (function (_super) {
    __extends(MessageCollector, _super);
    /**
     * @param {string} sessionId The id of the session
     * @param {string} instanceId The id of the current instance of the session (see: client.getInstanceId)
     * @param {ChatId} chatId The chat
     * @param {CollectorFilter} filter The filter to be applied to this collector
     * @param {MessageCollectorOptions} options The options to be applied to this collector
     * @param {EventEmitter2} openWaEventEmitter The EventEmitter2 that fires all open-wa events. In local instances of the library, this is the global `ev` object.
     * @emits MessageCollector#Message
     */
    function MessageCollector(sessionId, instanceId, chat, filter, options, openWaEventEmitter) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, filter, options) || this;
        _this.ev = openWaEventEmitter;
        _this.sessionId = sessionId;
        _this.instanceId = instanceId;
        /**
         * The chat
         * @type {TextBasedChannel}
         */
        _this.chat = chat;
        /**
         * Total number of messages that were received in the chat during message collection
         * @type {number}
         */
        _this.received = 0;
        _this._handleChatDeletion = _this._handleChatDeletion.bind(_this);
        _this._handleGuildDeletion = _this._handleGuildDeletion.bind(_this);
        var collectHandler = _this.wrapHandler(_this.handleCollect);
        var disposeHandler = _this.wrapHandler(_this.handleDispose);
        var deleteHandler = _this.wrapHandler(_this._handleChatDeletion);
        var groupRemovalHandler = _this.wrapHandler(_this._handleGroupRemoval);
        _this.incrementMaxListeners();
        _this.ev.on(_this.eventSignature(events_1.SimpleListener.Message), collectHandler);
        _this.ev.on(_this.eventSignature(events_1.SimpleListener.MessageDeleted), disposeHandler);
        _this.ev.on(_this.eventSignature(events_1.SimpleListener.ChatDeleted), deleteHandler);
        _this.ev.on(_this.eventSignature(events_1.SimpleListener.RemovedFromGroup), groupRemovalHandler);
        // this.ev.on(Events.GUILD_DELETE, this._handleGuildDeletion);
        _this.once('end', function () {
            _this.ev.removeListener(_this.eventSignature(events_1.SimpleListener.Message), collectHandler);
            _this.ev.removeListener(_this.eventSignature(events_1.SimpleListener.MessageDeleted), disposeHandler);
            _this.ev.removeListener(_this.eventSignature(events_1.SimpleListener.ChatDeleted), deleteHandler);
            _this.ev.removeListener(_this.eventSignature(events_1.SimpleListener.RemovedFromGroup), groupRemovalHandler);
            // this.ev.removeListener(Events.GUILD_DELETE, this._handleGuildDeletion);
            _this.decrementMaxListeners();
        });
        return _this;
    }
    /**
     * Handles a message for possible collection.
     * @param {Message} message The message that could be collected
     * @returns {?Snowflake}
     * @private
     */
    MessageCollector.prototype.collect = function (message) {
        /**
         * Emitted whenever a message is collected.
         * @event MessageCollector#collect
         * @param {Message} message The message that was collected
         */
        if (message.chat.id !== this.chat)
            return null;
        this.received++;
        return message.id;
    };
    /**
     * Handles a message for possible disposal.
     * @param {Message} message The message that could be disposed of
     * @returns {?Snowflake}
     */
    MessageCollector.prototype.dispose = function (message) {
        /**
         * Emitted whenever a message is disposed of.
         * @event MessageCollector#dispose
         * @param {Message} message The message that was disposed of
         */
        return message.chat.id === this.chat ? message.id : null;
    };
    /**
     * Checks after un/collection to see if the collector is done.
     * @returns {?string}
     * @private
     */
    MessageCollector.prototype.endReason = function () {
        if (this.options.max && this.collected.size >= this.options.max)
            return 'limit';
        if (this.options.maxProcessed && this.received === this.options.maxProcessed)
            return 'processedLimit';
        return null;
    };
    /**
     * Handles checking if the chat has been deleted, and if so, stops the collector with the reason 'chatDelete'.
     * @private
     * @param {Chat} chat The chat that was deleted
     * @returns {void}
     */
    MessageCollector.prototype._handleChatDeletion = function (chat) {
        if (chat.id === this.chat) {
            this.stop('chatDelete');
        }
    };
    /**
     * Handles checking if the chat has been deleted, and if so, stops the collector with the reason 'chatDelete'.
     * @private
     * @param {Chat} chat The group chat that the host account was removed from
     * @returns {void}
     */
    MessageCollector.prototype._handleGroupRemoval = function (chat) {
        if (chat.id === this.chat) {
            this.stop('groupRemoval');
        }
    };
    /**
     *
     * NOT RELATED TO WA
     *
     * Handles checking if the guild has been deleted, and if so, stops the collector with the reason 'guildDelete'.
     * @private
     * @param {Guild} guild The guild that was deleted
     * @returns {void}
     */
    MessageCollector.prototype._handleGuildDeletion = function (guild) {
        console.error('This does not relate to WA', guild);
    };
    MessageCollector.prototype.eventSignature = function (event) {
        return "".concat(event, ".").concat(this.sessionId, ".").concat(this.instanceId);
    };
    MessageCollector.prototype.wrapHandler = function (handler) {
        return function (_a) {
            var data = _a.data;
            return handler(data);
        };
    };
    return MessageCollector;
}(Collector_1.Collector));
exports.MessageCollector = MessageCollector;
