let getSeparateData = (date) => {
  return {
    y: date.getFullYear(),
    m: date.getMonth(),
    d: date.getDate(),
    h: date.getHours(),
    mm: date.getMinutes(),
    s: date.getSeconds()
  }
}

let isOnline = () => {
  let href = location.href
  // let reg = new RegExp('[.org|.com|.cn]', 'g')
  // return reg.test(href)
  return href.indexOf('.org') > -1 || href.indexOf('.com') > -1 || href.indexOf('.cn') > -1
}

// 生成uuid
let getUuid = () => {
  let s = []
  let hexDigits = '1234567890abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = '-'
  return s.join('')
}

let schemeToObj = (scheme, origin) => {
  let obj = Object.entries(scheme).reduce((res, [key, value]) => {
    if (value instanceof Object) {
      if (!value.type && !value.default) {
        res[key] = schemeToObj(value, origin[key] || {})
      } else {
        res[key] = origin[key] ? origin[key] : value.default
      }
    } else {
      throw new Error(`${key} is invalid`)
    }
    return res
  }, {})
  return obj
}

// 合并真值
let mergeTrueField = (a, obj = {}) => {
  // if (a)
  // return Object.assign({}, a, b)
  // let obj = a
  if (!(obj instanceof Object)) {
    throw new Error('obj is invalid')
  }
  for (let [key, value] of Object.entries(a)) {
    if (value instanceof Object) {
      obj[key] = mergeTrueField(a)
    } else {
      if (obj.hasOwnProperty(key)) {
        if (value) {
          obj[key] = value
        }
      } else {
        obj[key] = value
      }
    }
  }
  return obj
}

export default {
  getSeparateData,
  isOnline,
  getUuid,
  schemeToObj,
  mergeTrueField
}