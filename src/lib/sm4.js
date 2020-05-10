// 使用js写一个与go代码相匹配的sm4。

// var utils = require('./utils');

function sm4() {
}
// 加密
sm4.prototype.encrypt = function (key, data) {
  // key/data都是0x开头的散列值。如：
  // key := "0x96e79218965eb72c92a549dd5a330112"
  // data := "0xd470329bd4d9377fa37444ffe1123db165fe05f088168468640aa17618930d46c2f00f227bae0208bb4872e826bd8c9cf917446d8feedacc8e7ad78bbc90877e8bb262ddfd1bc2ea482f14d89eb36a0523229aa5523b3ea5b8a3763ad65f541da3ff5798ed5a81d89c94da1d22ce4fabd87dbe795fb4037afec9eba4bc92c031"  

  // 整理sm4的加密过程
  // 生成一个16[]byte
  // 解码key => keyBytes 一个0x开头的16进制数
  // 生成一个密码块 block（这一步可能很关键）
  // 解码data => dataBytes
  // md5(dataBytes) = dataHash
  // dataBytes + dataHash => plainText
  // blockSize
}
// 解密
sm4.prototype.decrypt = function () {}
module.exports = sm4;


