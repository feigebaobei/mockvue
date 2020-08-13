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

export default {
  getSeparateData,
  isOnline,
  getUuid
}