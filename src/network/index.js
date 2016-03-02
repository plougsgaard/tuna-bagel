import fetch from 'isomorphic-fetch'

const _getRequest = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url).then(
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
