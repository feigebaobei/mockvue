import axios from 'axios'

let isProduction = function () {
  let host = window.location.host
  if (host.indexOf('net') > -1) {
    return '' // 公司服务的地址
  } else if (host.indexOf('org') > -1) {
    return 'http://lixiaodan.org:9876/' // 李晓聃的测试环境
  } else {
    return 'http://127.0.0.1:9876/'
  }
}

axios.defaults.withCredentials = true

const instance = axios.create({
  // baseURL: 'http://127.0.0.1:9876/', // 相应服务端
  baseURL: isProduction(),
  // baseURL: 'http://127.0.0.1:9765/', // 模拟链节点的服务器
  // baseURL: 'https://34cd046f.ngrok.io',
  timeout: 5000
})

// axios.defaults.withCredentials = true
// axios.defaults.withCredentials = true
// axios.defaults.headers['Content-Type'] = 'application/json'
// instance.interceptors.request.use(config => {}, error => Promise.reject(error))
// instance.interceptors.response.use(response => {}, error => Promise.reject(error))

// export default {instance: instance.instance}
export default instance
