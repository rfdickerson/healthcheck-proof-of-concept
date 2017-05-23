# Health Checker [![Build Status](https://travis-ci.org/rfdickerson/healthcheck-proof-of-concept.svg?branch=master)](https://travis-ci.org/rfdickerson/healthcheck-proof-of-concept)

A proof-of-concept library for ExpressJS-based applications to add a health checking endpoint and provide a payload with information about the running application and the connected services.

## Getting Started

Install with:

```
yarn add health-check
```

Add the following to your ExpressJS application:

```javascript
// import the library
var healthcheck =  require("healthcheck");
```

You can set up your health checker is a custom health check callback:

```javascript
// create a health checker
const healthChecker = new healthcheck.HealthChecker();
healthChecker.onCheck( () => {
  // do special checking
  return true;
});
// set up an endpoint at /health
this.app.use("/health", healthChecker.router);
```

## Add Health Checking Services

Import the service checker for the service you want to check such as MongoDB, Redis, PostgreSQL, etc.
Add the checker before the health check is invoked. You can create multiple service checkers of the same type but different identifiers.

The following example uses the Mongoose health checker against the MongoDB database connection:

```javascript
// create a new Mongoose connection to MongoDB
mongoose.connect("mongodb://localhost/healthcheck");
// register the service checker with the Mongoose connection
const mongoDBCheck = new healthchecker.MongooseServiceChecker(mongoose.connection);
// choose a name for the service checker as 'mongo-1'
healthChecker.register("mongo-1", mongoDBCheck);
```

## Health Checking Status

All applications will return the following basic payload at the registered health route, such as `/health`:

```json
{
  "status": "up",
  "uptime": 100567,
}
```

When other services are registered on the health checker, the following information can appear:

```json
{
  "status": "up",
  "uptime": 100567,
  "services": {
    "mongo":
      {
        "state": "connected",
      },
    "redis":
      {
        "state": "connecting"
      }
  }
}
```

When there is an error, accompanying a down or disconnected state, the payload will typically contain an error message:

```json
{
  "state": "down",
  "errorMessage": "Could not bind to port 3000"
}
```

```json
{
  "state": "disconnected",
  "errorMessage": "Could not connect to port 27017"
}
```

The application status can take the following values:

- **up**: The application is up and operating normally
- **down**: The application is down and not operating normally

The services status can take the following values:

- **connected**: The service is connected and operating normally
- **disconnected**: The service is not connected and perhaps not operating normally
- **connecting**: Currently trying to establish a connection before moving to the connected state
- **disconnecting**: Currently moving from the connected state to disconnected state.

The application uptime is reported in milliseconds from when the health check service was initialized. 

## LICENSE

IBM HealthCheck
Copyright 2017 IBM

This product includes software developed at
[IBM](http://www.ibm.com/).
