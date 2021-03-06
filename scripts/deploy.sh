#!/bin/sh

## helpers
function variable_exists {
  if [[ -z ${!1} ]];
  then
    echo "  $1.. ERROR"
    exit 1
  else
    echo "  $1.. OK - ${!1:0:4}[snip]"
  fi
}

## variables
target_filename=tuna-bagel-$(cat package.json | jq -r .version).js
variables_config="variables.config"

## load secret config if it exists
if [[ -f $variables_config ]]
then
  echo "Loading environment from $variables_config"
  source $variables_config
fi

## assertions
echo "Checking environment variables.."
variable_exists NODE_ENV
variable_exists API
variable_exists SCP_HOST
variable_exists SCP_PATH

## build index.html
echo "Building dist/index.html"
sed -e "s/\${js}/$target_filename/" index.production.html > dist/index.html || exit 1

## build js
echo "Building dist/$target_filename"
webpack --output-filename $target_filename || exit 1

## sc(hhi)p it
echo "Deploying dist/*"
scp -r dist/* $SCP_HOST:$SCP_PATH
echo "Deploying css"
scp -r css $SCP_HOST:$SCP_PATH
