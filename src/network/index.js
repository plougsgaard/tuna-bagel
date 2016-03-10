import fetch from 'isomorphic-fetch'

import { API } from '../config'

const _parseUrl = (url) => {
  if (!url) {
    throw new Error(`Missing URL.`)
  }
  if (url.indexOf('http') === 0) {
    return url
  }
  return `${API}/${url}`
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
          try {
            reject({ _error: await response.json() })
          }
          catch (err) {
            reject({ _error: response.statusText })
          }
        } else {
          try {
            resolve(await response.json())
          }
          catch (err) {
            resolve(response.statusText)
          }
        }
      },
      async (response) => {
        reject({ _error: await response.json() })
      }
    )
  })
}
