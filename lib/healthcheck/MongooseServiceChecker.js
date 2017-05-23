"use strict";
exports.__esModule = true;
var MongooseServiceChecker = (function () {
    function MongooseServiceChecker(connection) {
        this.connection = connection;
    }
    MongooseServiceChecker.prototype.handleCheck = function () {
        var state = this.connection.readyState;
        return {
            status: this.readyStateLabel(state)
        };
    };
    MongooseServiceChecker.prototype.readyStateLabel = function (x) {
        switch (x) {
            case 0: return "disconnected";
            case 1: return "connected";
            case 2: return "connecting";
            case 3: return "disconnecting";
            default: return "";
        }
    };
    return MongooseServiceChecker;
}());
exports.MongooseServiceChecker = MongooseServiceChecker;
//# sourceMappingURL=MongooseServiceChecker.js.map