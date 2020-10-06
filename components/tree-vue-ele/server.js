let express = require('express');
let app = express();
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    if(req.method === 'OPTIONS') {
        return res.send()
    }
    next()
})

app.get('/getTreeList',(req,res)=>{
    res.json({
        code: 200,
        data: {
            parent: [
                {
                    name: '文件夹1',pid: 0,id: 1,
                },
                {
                    name: '文件夹2',pid: 0,id: 2,
                },
                {
                    name: '文件夹2',pid: 0,id: 3,
                },
                {
                    name: '文件夹1-1',pid: 1,id: 4,
                },
                {
                    name: '文件夹2-1',pid: 2,id: 5
                }
            ],
            child: [
                {
                    name: '文件夹1',pid: 1,id: 10001,
                },
                {
                    name: '文件夹2',pid: 1,id: 10002,
                },
                {
                    name: '文件夹3',pid: 2,id: 10003,
                },
                {
                    name: '文件夹1-1',pid: 2,id: 10004,
                },
                {
                    name: '文件夹2-1',pid: 2,id: 10005,
                }
            ],
        }
    })
});
app.listen(3000,()=>{
    console.log('服务器已启动')
})