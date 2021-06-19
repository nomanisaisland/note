// 导出一个被冻结无法修改的空对象
export const emptyObject = Object.freeze({})

const _toString = Object.prototype.toString

// 判断参数是否是对象
export function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]'
}

// 判断是否是空对象
export function isNullPlainObject(obj) {
  return JSON.stringify(obj) === '{}' || JSON.stringify(obj) === undefined
}