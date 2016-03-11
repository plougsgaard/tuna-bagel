# Tuna Bagel

Choose one or more:

- tuna fish eating a bagel
- tuna fish jumping hoops through a bagel
- bagel eating a tuna fish

## Install

```
npm i
npm i -g webpack webpack-dev-server
```

## Development

```
npm start
```

## Production

#### Config

Deployment depends on variables set in the `variables.config` file. If the file doesn't exist it just reads the environment as normal.

Example layout:

```
#!/bin/sh
export NODE_ENV="production"
export API="http://api.example.com:9999"
export SCP_HOST="example.com"
export SCP_PATH="~/path/to/wwwroot/"
```

#### Deploy

```
npm run deploy
```
