const router = require('koa-router')()
const svgCaptcha = require('svg-captcha')
const gmPic = require('./gmDemo/index')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
  })
})

router.get('/svgCaptcha', async (ctx, next) => {
  const getString = () => {
    const cap = svgCaptcha.create({
      size: 4, // 验证码长度
      width: 160,
      height: 60,
      fontSize: 50,
      ignoreChars: '0oO1ilI', // 验证码字符中排除 0o1i
      noise: 2, // 干扰线条的数量
      color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      background: '#eee', // 验证码图片背景颜色
    })
    let img = cap.data // 验证码
    var text = cap.text.toLowerCase() // 验证码字符，忽略大小写
    return { svg: `${img}<span >${text}</span>` }
  }
  ctx.body = getString().svg
})

router.get('/json', async (ctx, next) => {
  gmPic()
  ctx.body = gmPic()
})

module.exports = router
