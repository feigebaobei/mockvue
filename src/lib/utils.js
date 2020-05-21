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

export default {
  getSeparateData
}