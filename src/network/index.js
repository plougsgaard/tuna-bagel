import fetch from 'isomorphic-fetch'

import { HOST, PORT } from '../config'

const _parseUrl = (url) => {
  if (!url) {
    throw new Error(`Missing URL.`)
  }
  if (url.indexOf('http') === 0) {
    return url
  }
  if (!PORT) {
    return `http://${HOST}/${url}`
  }
  return `http://${HOST}:${PORT}/${url}`
}

const _parseOptions = (options) => {
  if (options.body) {
    options.body = JSON.stringify(options.body)
    options.headers = {
      ...options.headers,
      'Content-Type': 'application/json'
    }
  }
  return options
}

export const httpRequest = (url, options) => {
  return new Promise((resolve, reject) => {
    fetch(_parseUrl(url), _parseOptions(options)).then(
      async (response) => {
        if (response.status >= 400) {
          reject({ _error: await response.json() })
        } else {
          resolve(await response.json())
        }
      },
      async (response) => {
        reject({ _error: await response.json() })
      }
    )
  })
}
