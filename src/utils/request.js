
const _handler = (url, method, params, resolve, reject) => {
  uni.request({
    url,
    method,
    data: params,
    success: function (response) {
      return resolve(response.data)
    },
    fail: function (reson) {
      return reject(reson)
    }
  });
}
const request = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      _handler(url, 'GET', params, resolve, reject)
    })
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      _handler(url, 'POST', params, resolve, reject)
    })
  },
}
export default request