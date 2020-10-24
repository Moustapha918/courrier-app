#!/bin/sh
echo "NODE_ENV=" $NODE_ENV
if [ "$NODE_ENV" == "production" ]; then
    echo "Starting the server with node app"
    ng build --aot --prod
else
    echo "Starting the server using grunt"
    ng build --aot --dev
fi