"use strict";
exports.__esModule = true;
var express = require("express");
var HealthChecker = (function () {
    function HealthChecker() {
        this.router = express.Router();
        this.startTime = Date.now();
        this.services = [];
        this.setupRoutes();
    }
    HealthChecker.prototype.register = function (name, checker) {
        this.services[name] = checker;
    };
    HealthChecker.prototype.setupRoutes = function () {
        var _this = this;
        this.router.get("/", function (req, res, next) {
            var upTime = Date.now() - _this.startTime;
            var servicesStatus = Object.keys(_this.services).map(function (s) {
                return [];
            });
            var status = {
                state: "UP",
                upTime: upTime
            };
            res.status(200);
            res.json(status);
        });
    };
    return HealthChecker;
}());
exports.HealthChecker = HealthChecker;
//# sourceMappingURL=HealthChecker.js.map