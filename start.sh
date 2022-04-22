#!/bin/bash

# edit and uncomment if running using supervisor
# cd /your/path/to/microservices/sumsub_kyc_access_token

export PORT=3000
export SUMSUB_APP_TOKEN=your-token
export SUMSUB_APP_SECRET_KEY=your-secret-key
export CORS_ORIGIN=https://your.domain
export LOG=True

npm run serve
