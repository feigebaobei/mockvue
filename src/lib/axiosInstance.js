import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:9876/',
  timeout: 5000
})

// axios.defaults.headers['Content-Type'] = 'application/json'
// instance.interceptors.request.use(config => {}, error => Promise.reject(error))
// instance.interceptors.response.use(response => {}, error => Promise.reject(error))

// export default {instance: instance.instance}
export default instance