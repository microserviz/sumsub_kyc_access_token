# MicroServiz :: SumSub KYC access token generation

A *Koa*-based microservice for integrating SubSub KYC.
Part of gbezyuk's `microserviz` project.


## Use Case

SubSub KYC is a service that validates user's identity.
Each validation session requires an access token, which is received basing on app credentials user type and id.
The proccess may be a bit tricky, so here is a microservice dedicated to solving all the technicalities.


## Production Run

Modify `./start.sh`, exporting proper env variables, and run it (or better setup a supervisor).
Alternatively, run `npm run serve` manually.


## Dev Run

`npm run dev` will start a nodemon which will watch source code changes.


## URLs
* `/api/kyc/access_token/:levelName/:userId` - gives you the access token


## Environment Variables

Set these env vars when running the script:
* `PORT` - port to run this service on
* `SUMSUB_APP_TOKEN` - app token from SumSub
* `SUMSUB_APP_SECRET_KEY` - corresponding secret key from SumSub
* `SUMSUB_API_ROOT` - not required, defaults to `https://api.sumsub.com`
* `CORS_ORIGIN` - see protection/cors below
* `LOG` - see logging below


## Protection

### CORS

**IT IS STRONGLY SUGGESTED** that you set `CORS_ORIGIN` environment variable
in order to restrict access to this microservice.


## Logging

Set `LOG` environment variable in case you want some logging.
