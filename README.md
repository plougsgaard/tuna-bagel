# tuna-bagel

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

### Build

```
npm run build
```

### Deploy

```
npm run deploy
```

#### Config

Deployment is configured with the `variables.config` file.

Example layout:

```
#!/bin/sh
export NODE_ENV="production"
export API="http://api.example.com:9999"
export SCP_HOST="example.com"
export SCP_PATH="~/path/to/wwwroot/"
```
