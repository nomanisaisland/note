const callbacks = new Set()
const observe = (fn) => callbacks.add(fn)

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver)
  callbacks.forEach((observe) => observe())
  return result
}

export const observable = (obj) => new Proxy(obj, { set })
