const Koa = require('koa');
const app = new Koa();
const fs = require('fs');

/**
 * 用promise分装异步读取文件方法
 * @param {string} page html文件名
 * @return { promise }
 */
function render (page) {
    return new Promise((resolve, reject) => {
        let viewUrl = `./view/${page}`;
        fs.readFile(viewUrl, 'binary', (err, data) => {
            if (err) {
                reject(err);
            } else {
                console.log(data)
                resolve(data);
            }
        })
    })
}


async function route (url) {
    let view = '404.html';
    switch (url) {
        case '/':
            view = 'index.html';
            break;
        case '/index':
            view = 'index.html';
            break;
        case '/todo':
            view = 'todo.html';
            break;
        case '/404':
            view = '404.html';
            break;
        default:
            break
    }
    return render(view)
}

app.use(async (ctx) => {
    let url = ctx.request.url;
    ctx.body = await route(url);
})

app.listen(3000);