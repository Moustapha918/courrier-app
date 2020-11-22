#!/bin/sh
echo "NODE_ENV=" $NODE_ENV
if [ "$NODE_ENV" == "production" ]; then
    echo "Starting production env"
    ng build --aot --configuration=production
else
    if [ "$NODE_ENV" == "dev" ]; then
    echo "Starting dev env"
    ng build --configuration=dev
    else
    echo "Starting  hmr env"
    ng build --aot --configuration=hmr
    fi
fi