"use strict";
/*
  Licensed to the Apache Software Foundation (ASF) under one
  or more contributor license agreements.  See the NOTICE file
  distributed with this work for additional information
  regarding copyright ownership.  The ASF licenses this file
  to you under the Apache License, Version 2.0 (the
  "License"); you may not use this file except in compliance
  with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing,
  software distributed under the License is distributed on an
  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, either express or implied.  See the License for the
  specific language governing permissions and limitations
  under the License.
 */
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