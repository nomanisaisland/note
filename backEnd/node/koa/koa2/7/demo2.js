const Koa = require('koa');
const fs = require('fs');
const app = new Koa();
const Router = require('koa-router');
const KoaBody = require('koa-body');

app.use(KoaBody()).use(async (ctx, next) => {
    // ctx.set('Access-Control-Allow-Origin', '*');
    // ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    // ctx.set('Access-Control-Expose-Headers', 'data');


    ctx.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
    })
    await next();
});;


function render (url) {
    return new Promise((resolve, reject) => {
        fs.readFile(url, 'binary', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })

}


// 路由1
let home = new Router();
home.get('/', async (ctx) => {
    let url = './view/index.html'
    ctx.body = await render(url)
})

// 路由2
let page = new Router();
page.get('/404', async (ctx) => {
    let url = './view/404.html'
    ctx.body = await render(url);
}).get('/todo', async (ctx) => {
    let url = './view/todo.html'
    ctx.body = await render(url);
}).post('/todo', async (ctx) => {
    let data = {
        code: 200,
        message: '请求成功'
    }
    ctx.body = data
    // ctx.append('data',);
    // console.log(ctx)
    // ctx.body = JSON.stringify({
    //     code: 200,
    //     message: '请求成功'
    // });
})

// 装载所有路由
let router = new Router();
router.use('/', home.routes(), home.allowedMethods());
router.use('/page', page.routes(), page.allowedMethods());

app.use(router.routes()).use(router.allowedMethods())


app.listen(3000, () => {
    console.log('[demo] route-use-middleware is starting at port 3000')
})