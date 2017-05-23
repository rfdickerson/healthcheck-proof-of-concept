"use strict";
exports.__esModule = true;
var MongooseServiceChecker = (function () {
    function MongooseServiceChecker(connection) {
        this.connection = connection;
    }
    MongooseServiceChecker.prototype.handleCheck = function () {
        var state = this.connection.readyState;
        return {
            state: "connected"
        };
    };
    return MongooseServiceChecker;
}());
exports.MongooseServiceChecker = MongooseServiceChecker;
//# sourceMappingURL=MongooseServiceChecker.js.map