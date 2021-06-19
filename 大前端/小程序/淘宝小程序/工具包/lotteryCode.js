import cloud from '@tbmp/mp-cloud-sdk'

import { RandomUtil } from 'rjlx.base/value/RandomUtil'
// 产生随机数
/**
 * 
 * @param {number} min 生成字符串最小长度 
 * @param {number} max 生成字符串最大长度
 * @param {string} charStr 随机数产生区间
 * @returns {string}  生成的随机数
 * 
 *  randomRange(6, 6, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789')
 */
function randomRange(min, max, charStr) {
  var returnStr = '', //返回的字符串
    range //生成的字符串长度

  //随机生成字符
  var autoGetStr = function () {
    var charFun = function () {
      var n = Math.floor(Math.random() * 62)
      if (n < 10) {
        return n //1-10
      } else if (n < 36) {
        return String.fromCharCode(n + 55) //A-Z
      } else {
        return String.fromCharCode(n + 61) //a-z
      }
    }
    while (returnStr.length < range) {
      returnStr += charFun()
    }
  }

  //根据指定的字符串中生成组合
  var accordCharStrGet = function () {
    for (var i = 0; i < range; i++) {
      var index = Math.round(Math.random() * (charStr.length - 1))
      returnStr += charStr.substring(index, index + 1)
    }
  }
  if (typeof min == 'undefined') {
    min = 10
  }
  if (typeof max == 'string') {
    charStr = max
  }
  range =
    max && typeof max == 'number'
      ? Math.round(Math.random() * (max - min)) + min
      : min

  if (charStr) {
    accordCharStrGet()
  } else {
    autoGetStr()
  }
  return returnStr
}

