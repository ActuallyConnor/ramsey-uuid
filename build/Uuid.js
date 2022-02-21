"use strict";
exports.__esModule = true;
exports.Uuid = void 0;
var uuid_1 = require("uuid");
var Uuid = /** @class */ (function () {
    function Uuid(uuid) {
        this.uuid = uuid;
    }
    Uuid.prototype.getUuid = function () {
        return this.uuid;
    };
    Uuid.fromString = function (uuid) {
        return new Uuid((0, uuid_1.parse)(uuid));
    };
    Uuid.prototype.toString = function () {
        return (0, uuid_1.stringify)(this.uuid);
    };
    Uuid.fromBytes = function (uuid) {
        var result = '';
        for (var i = 0; i < uuid.length; i++) {
            result += uuid.charCodeAt(i).toString(16);
            switch (i) {
                case 3:
                case 5:
                case 7:
                case 9:
                    result += '-';
                    break;
            }
        }
        return new Uuid((0, uuid_1.parse)(result));
    };
    Uuid.prototype.getBytes = function () {
        var bytes = '';
        for (var i = 0; i < this.uuid.length; i++) {
            bytes += String.fromCharCode(this.uuid[i]);
        }
        return bytes.replace(' ', '');
    };
    Uuid.uuid4 = function () {
        return new Uuid((0, uuid_1.parse)((0, uuid_1.v4)()));
    };
    return Uuid;
}());
exports.Uuid = Uuid;
