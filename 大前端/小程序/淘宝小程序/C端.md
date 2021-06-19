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





### iOS和安卓兼容问题

日期格式iOS不能识别‘-’，时间比较上最好用时间戳

有时候ios上用new Date('2020/10/10').getTime()也会返回NAN，可以使用Date.parse





## 下拉无限加载实现思路

通过limit 和 skip每次获取一定的数据，然后下来通过改变skip来跳过已经拿到的数据，将最新数据push到旧数组数据 





### my.navigateTo最多可以跳10层的限制

解决方案，使用```getCurrentPages``` api获取当前栈的深度，从而做出应对方案



**注意：** 不要尝试修改页面栈，会导致路由以及页面状态错误。





# 页面级别的滚动会影响到内部的组件滚动

原因：当页面滑到底部的时候，页面级别的时间还未停止，会触发阻尼事件。只要把这个事件干掉就可以避免了，allowsBounceVertical: NO 允许下拉干掉，就不会出现拖拽阻尼效果

