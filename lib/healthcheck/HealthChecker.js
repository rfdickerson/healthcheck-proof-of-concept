"use strict";
exports.__esModule = true;
var express = require("express");
var HealthChecker = (function () {
    function HealthChecker() {
        this.router = express.Router();
        this.startTime = Date.now();
        this.services = {};
        this.isUp = true;
        this.setupRoutes();
    }
    HealthChecker.prototype.register = function (name, checker) {
        this.services[name] = checker;
    };
    HealthChecker.prototype.onCheck = function (f) {
        this.handleCheck = f;
    };
    HealthChecker.prototype.reset = function () {
        this.startTime = Date.now();
    };
    HealthChecker.prototype.setupRoutes = function () {
        var _this = this;
        this.router.get("/", function (req, res, next) {
            var currentState = _this.handleCheck ? _this.handleCheck() : true;
            if (currentState && !_this.isUp) {
                _this.startTime = Date.now();
            }
            _this.isUp = currentState;
            var uptime = Date.now() - _this.startTime;
            var servicesStatus = {};
            Object.keys(_this.services).forEach(function (service) {
                servicesStatus[service] = _this.services[service].handleCheck();
            });
            var status = {
                services: servicesStatus,
                status: _this.isUp ? "UP" : "DOWN",
                uptime: _this.isUp ? uptime : 0
            };
            if (_this.isUp) {
                res.status(200);
            }
            else {
                res.status(503);
            }
            res.json(status);
        });
    };
    return HealthChecker;
}());
exports.HealthChecker = HealthChecker;
//# sourceMappingURL=HealthChecker.js.map