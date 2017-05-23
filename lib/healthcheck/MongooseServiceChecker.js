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
            case 0: return "DOWN";
            case 1: return "UP";
            case 2: return "CONNECTING";
            case 3: return "DISCONNECTING";
            default: return "";
        }
    };
    return MongooseServiceChecker;
}());
exports.MongooseServiceChecker = MongooseServiceChecker;
//# sourceMappingURL=MongooseServiceChecker.js.map