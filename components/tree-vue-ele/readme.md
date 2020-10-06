# 文件树操作组件

# 数据准备：

```
parent: [
    {
        name: '文件夹1',pid: 0,id: 1,
        name: '文件夹2',pid: 0,id: 2,
        name: '文件夹3',pid: 0,id: 3,
        name: '文件夹1-1',pid: 1,id: 4,
        name: '文件夹2-1',pid: 2,id: 5,
    }
],
child: [
    {
        name: '文件夹1',pid: 1,id: 10001,
        name: '文件夹2',pid: 1,id: 10002,
        name: '文件夹3',pid: 2,id: 10003,
        name: '文件夹1-1',pid: 2,id: 10004,
        name: '文件夹2-1',pid: 2,id: 10005,
    }
],
// parent 为文件夹
// pid 为父目录 0为根目录  
// id 为当前目录的层级


// child 为文件
// pid 为所属文件夹
```

