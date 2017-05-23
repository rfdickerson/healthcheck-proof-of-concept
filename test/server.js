
function makeServer() {

  var express = require("express");
  var healthcheck = require("../lib/index");
  var mongoose = require("mongoose");

  const app = express();

  mongoose.connect("mongodb://localhost/healthcheck");

  const healthChecker = new healthcheck.HealthChecker();
  const mongoDBCheck = new healthcheck.MongooseServiceChecker(mongoose.connection);

  healthChecker.register("mongoDatabase", mongoDBCheck);

  healthChecker.onCheck( () => {
    return true;
  })

  app.use("/health", healthChecker.router);

  const server = app.listen(3000, () => {
    const port = server.address().port;
    // console.log("Example app listen at port %s", port);
  });

  return server;

}

module.exports = makeServer;

