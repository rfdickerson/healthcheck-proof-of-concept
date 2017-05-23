"use strict";
exports.__esModule = true;
var express = require("express");
var HealthChecker = (function () {
    function HealthChecker() {
        this.router = express.Router();
        this.startTime = Date.now();
        this.services = {};
        this.setupRoutes();
    }
    HealthChecker.prototype.register = function (name, checker) {
        this.services[name] = checker;
    };
    HealthChecker.prototype.setupRoutes = function () {
        var _this = this;
        this.router.get("/", function (req, res, next) {
            var uptime = Date.now() - _this.startTime;
            var x = {};
            Object.keys(_this.services).forEach(function (element) {
                x[element] = _this.services[element].handleCheck();
            });
            var status = {
                services: x,
                status: "up",
                uptime: uptime
            };
            res.status(200);
            res.json(status);
        });
    };
    return HealthChecker;
}());
exports.HealthChecker = HealthChecker;
//# sourceMappingURL=HealthChecker.js.map