"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uuid = void 0;
const uuid_1 = require("uuid");
class Uuid {
    constructor(uuid) {
        this.uuid = uuid;
    }
    getUuid() {
        return this.uuid;
    }
    static fromString(uuid) {
        return new Uuid((0, uuid_1.parse)(uuid));
    }
    toString() {
        return (0, uuid_1.stringify)(this.uuid);
    }
    toHex() {
        return (0, uuid_1.stringify)(this.uuid).replace(/-/g, '').toUpperCase();
    }
    static fromBytes(uuid) {
        let result = '';
        for (let i = 0; i < uuid.length; i++) {
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
    }
    getBytes() {
        let bytes = '';
        for (let i = 0; i < this.uuid.length; i++) {
            bytes += String.fromCharCode(this.uuid[i]);
        }
        return bytes.replace(' ', '');
    }
    static uuid4() {
        return new Uuid((0, uuid_1.parse)((0, uuid_1.v4)()));
    }
}
exports.Uuid = Uuid;
