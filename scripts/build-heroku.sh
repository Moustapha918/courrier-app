#!/bin/sh
echo "NODE_ENV=" $NODE_ENV
if [ "$NODE_ENV" == "production" ]; then
    echo "Starting production env"
    ng build --aot --configuration=prod
else
    echo "Starting  hmr env"
    ng build --aot --configuration=hmr
fi