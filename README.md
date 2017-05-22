# Health Checker

A proof-of-concept library for ExpressJS-based applications to add a health checking endpoint and provide a payload with the application's health check status.

## Getting Started

Install with:

```
yarn add health-check
```

Add the following to your ExpressJS application:

```typescript
import { HealthChecker } from "./healthcheck/HealthChecker";
```

The following example uses the Mongoose health checker against the MongoDB database connection.

```typescript
const healthChecker = new HealthChecker();

this.app.use("/health", healthChecker.router);
```

## Health Checking Services

Import the service checker for the service you want to check such as MongoDB, Redis, PostgreSQL, etc.:

```typescript
import { MongooseServiceChecker } from "./healthcheck/MongooseServiceChecker";
```

Add the checker before the health check is invoked:

```typescript
const mongoDBCheck = new MongooseServiceChecker(mongoose.connection);
healthChecker.register("mongo", mongoDBCheck);
```

## Health Checking Status

All applications must return the following basic payload at the registered health route:

```json
{
  "state": "UP"
}
```

For more advanced cases, such as when other services are registered on the health checker, the following information can appear:

```json
{
  "state": "UP",
  "uptime": 100,
  "services": {
    "mongodb":
      {
        "state": "UP",
        "host": "mongo",
        "username": "XXX",
        "password": "XXX"
      },
    "redis":
      {
        "state: "UP"
      }
  }
}
```

When there is an error, or a DOWN state, the payload will typically contain an error message:

```json
{
  "state": "DOWN",
  "message": "Could not allocate port 27017"
}
```

The state can take the following values:

- **UP**: The application or service is up and operating normally
- **DOWN**: The applicaiton or service is down and not operating normally such as it could not connect to a database or get a port properly.
- **CONNECTING**: Currently trying to establish a connection before moving to the UP state
- **DISCONNECTING**: Currently moving from the UP state to DOWN state by disconnecting the network.

Uptime is in milliseconds. 
