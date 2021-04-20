// let target = {};
// let proxy = new Proxy(target, {});

// proxy.test = 5

// console.log(target)
// console.log(proxy)

// for(let key in proxy) {
//     console.log(key,proxy,proxy[key])
// }
// let target = {
//     age: 18,
//     name: "tom",
//     sex: "man"
// }

// let proxy = new Proxy(target, {   // 数据拦截转换
//     get(target, property, receiver) {
//         if(property in target) {
//             return target[property]
//         } else {
//             return 0
//         }
//     }
// })

// console.log(proxy)  // 源对象改了没有什么，代理后的对象改变了就会触发访问器
// console.log(target)


// let numbers = [];
// numbers = new Proxy(numbers, {
//     set(target, prop, val) {
//         if(typeof val == 'number') {
//             target[prop] = val;
//             return true
//         } else {
//             return false
//         }
//     }
// })

// numbers.push(1)
// numbers.push("12312")

// console.log(numbers)


// let user = {
//     name: "John",
//     age: 30,
//     _password: "***"
// };

// user = new Proxy(user, {
//     ownKeys(target) {
//         return Object.keys(target).filter(key=> !key.startsWith('_'));
//     }
// })

// for(let key in user) {
//     console.log(user[key])
// }
// console.log(Object.keys(user))
// console.log(Object.values(user))


// let user = {};
// user = new Proxy(user, {
//     ownKeys (target) {
//         return ['a', 'b', 'c'];
//     },
//     getOwnPropertyDescriptor (target, prop) {
//         return {
//             enumerable: true,
//             configurable: true
//         }
//     }
// })
// console.log(Object.keys(user))

// let user = {
//     name: "John",
//     _password: "secret"
// };

// console.log(user._password);// secret
// 我们需要以下钩子：
// get 读取此类属性时抛出错误，
// set 写入属性时抛出错误，
// deleteProperty 删除属性时抛出错误，
// ownKeys 在使用 for..in 和类似 Object.keys 的方法时排除以 _ 开头的属性。


// let user = {
//     name: "John",
//     _password: "***"
// };

// user = new Proxy(user, {
//     get (target, property) {
//         if (property.startsWith('_')) {
//             throw new Error("Access denied")
//         }
//         let value = target[property]
//         return (typeof value === 'function') ? value.bind(target) : value
//     },
//     set (target, property, value) {
//         if(property.startsWith('_')) {
//             throw new Error("Access denied")
//         } else {
//             target[property] = value;
//             return true
//         }
//     },
//     deleteProperty (target, property) {
//         if(property.startsWith('_')) {
//             throw new Error("Access denied")
//         } else {
//             delete target[property];
//             return true
//         }
//     },
//     ownKeys (target) {
//         return Object.keys(target).filter(key=> !key.startsWith('_'));
//     }
// })
// // console.log(user._password)
// // console.log(user._password = 123)
// console.log(delete user._password)


// let range = {
//     start: 1,
//     end: 100
// }

// range = new Proxy(range, {
//     has(target, property) {
//         return property > target.start && property < target.end;
//     }
// })

// console.log(20 in range)
// console.log(120 in range)

// function delay (f, ms) {
//     // 返回一个超时后调用 f 函数的包装器
//     return function () { // (*)
//         console.log(this)
//         setTimeout(() => f.apply(this, arguments), ms);
//     };
// }

// function sayHi (user) {
//     console.log(`Hello, ${user}!`);
// }

// // 这次包装后，sayHi 在3秒后被调用
// sayHi = delay(sayHi, 3000);

// sayHi("John"); // Hello, John! （3秒后）