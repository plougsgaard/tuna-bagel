import fetch from 'isomorphic-fetch'

import { HOST, PORT } from '../config'

const _parseUrl = (url) => {
  if (!url) {
    return ''
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

export const _getRequest = (url, options) => {
  return new Promise((resolve, reject) => {
    fetch(_parseUrl(url), _parseOptions(options)).then(
      (cnt) => {
        const { status } = cnt
        if (status >= 400) {
          console.log(cnt)
          reject(new Error(`Server responded with ${status}.`))
        } else {
          resolve(cnt.json())
        }
      },
      (err) => {
        reject(err)
      }
    )
  })
}

export const getRequest = ({ url, success, fail }) => {
  if (!success || !fail) {
    return _getRequest(url)
  }
  return new Promise((resolve, reject) => {
    _getRequest(url).then(
      (cnt) => resolve(success(cnt)),
      (err) => reject(fail(err))
    )
  })
}
