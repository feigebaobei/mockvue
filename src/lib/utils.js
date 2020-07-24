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
// (dateStr) => {
//   let 
// }

let isOnline = () => {
  let href = location.href
  // let reg = new RegExp('[.org|.com|.cn]', 'g')
  // return reg.test(href)
  return href.indexOf('.org') > -1 || href.indexOf('.com') > -1 || href.indexOf('.cn') > -1
}

export default {
  getSeparateData,
  isOnline
}