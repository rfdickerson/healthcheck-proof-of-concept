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

var express = require("express");
var request = require("supertest");
var healthcheck = require("../lib/index.js");
var assert = require("chai").assert;

const healthEndpoint = "/health";

describe("Basic", () => {

  var server;

  beforeEach( () => {
    server = require("./server")();
  });

  afterEach( (done) => {
    server.close();
    setTimeout(done, 1000);
  });

  it("Returns a 200 on health check", () => {
    request(server)
      .get(healthEndpoint)
      .expect(200);
  });

  it("Has state and upTime payload", () => {
    request(server)
      .get(healthEndpoint)
      .expect(200, (err, res) => {
        // console.log(res.body);
        assert.equal(res.body.status, "UP");
        assert.isAtLeast(res.body.uptime, 0);

      });
  });

  it("Has services", () => {
    request(server)
      .get(healthEndpoint)
      .expect(200, (err, res) => {
        assert.isDefined(res.body.services);
      });
  });


});
