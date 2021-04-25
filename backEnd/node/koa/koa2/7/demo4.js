const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const app = new Koa();
const content = require('./utils/content');
const mimes = require('./utils/mimes');

app.use(async (ctx) => {
    console.log(ctx)
    ctx.body = 'hello'
    ctx.header = 'hello'
})

app.listen(3000, () => {
    console.log('[demo] route-use-middleware is starting at port 3000')
})