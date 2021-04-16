1. 扩展map子元素的时候新增字段放在item后面,否则新增字段会失效

```javascript
let arr = [
    {
        name: 1,
        age: 2
    }
]
arr.map(item=> {
    return {
        ...item,
        state: false
    }
})
```



1. flat(),flatmap()等方法需要垫片器才能使用





## 苹果6sp手机image显示不了图片



有可能是图片问题，换一张图片就可以了