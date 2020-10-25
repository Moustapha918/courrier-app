#!/bin/sh
echo "NODE_ENV=" $NODE_ENV
if [ "$NODE_ENV" == "production" ]; then
    echo "Starting production env"
    ng build --aot --prod
else
    echo "Starting  dev env"
    ng build --aot --configuration=dev
fi