#!/bin/sh

## http://mywiki.wooledge.org/BashFAQ/006

## helpers
function variable_exists {
  if [[ -z ${!1} ]];
  then
    echo "  $1.. ERROR"
    exit 1
  else
    echo "  $1.. OK - ${!1}"
  fi
}

## variables
variables_config="variables.config"

## load secret config if it exists
if [[ -f $variables_config ]]
then
  echo "Loading environment from $variables_config"
  source $variables_config
fi

## assertions
echo "Checking environment variables.."
variable_exists SCP_HOST
variable_exists SCP_PATH

## sc(hhi)p it
echo "Deploying dist/*"
scp -r dist/* $SCP_HOST:$SCP_PATH
echo "Deploying css"
scp -r css $SCP_HOST:$SCP_PATH
