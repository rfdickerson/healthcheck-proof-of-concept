
function makeServer() {

  var express = require("express");
  var healthcheck = require("../js/index");
  var mongoose = require("mongoose");

  const app = express();

  const healthChecker = new healthcheck.HealthChecker();
  const mongoDBCheck = new healthcheck.MongooseServiceChecker(mongoose.connection);

  mongoose.connect("mongodb://localhost/healthcheck");

  healthChecker.register("mongo", mongoDBCheck);

  app.use("/health", healthChecker.router);

  app.get("/", (req, res) => {
    res.status(200).send("ok");
  });

  const server = app.listen(3000, () => {
    const port = server.address().port;
    console.log("Example app listen at port %s", port);
  });

  return server;

}

module.exports = makeServer;

