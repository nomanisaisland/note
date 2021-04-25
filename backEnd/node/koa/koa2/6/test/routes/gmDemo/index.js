var fs = require('fs')
const gm = require('gm').subClass({ imageMagick: true })
const path = require('path')

var arrBuffer = []
const getSlide = async () => {
  arrBuffer = []
  const width = 420
  const height = 250
  const fragmentSize = 50
  // try {
  // 生成图片
  const filePath = getRandomPath().replace(/\\/g, '/')

  console.log(filePath)
  const x =
    (Math.floor(Math.random() * 1000) % (width - 2 * fragmentSize)) +
    fragmentSize
  const y = Math.floor(Math.random() * 1000) % (height - fragmentSize)
  const { image, fragment } = await createImage(
    filePath,
    width,
    height,
    fragmentSize,
    x,
    y
  )
  // 缓存记录
  arrBuffer.push({ x })
  console.log(arrBuffer)
  return { msg: 'ok', data: { image, fragment, y } }
  // } catch (err) {
  //   console.log(err)
  //   return { msg: '服务器错误:' + err, data: null }
  // }
}
function getRandomPath() {
  const fileLength = 4
  const index = Math.floor(Math.random() * 1000) % fileLength
  return path.resolve(__dirname, `../static/images/2.jpg`)
}
function createImage(filePath, w, h, s, x, y) {
  return new Promise((resolve, reject) => {
    let res = { image: '', fragment: '' }
    gm(filePath)
      .resize(w, h, '!')
      .fill('rgba(0,0,0,.5)')
      //绘制由坐标对、宽度和高度指定的矩形。
      .drawRectangle(x, y, x + s - 1, y + s - 1)
      .noProfile()
      .setFormat('jpeg')
      .toBuffer((err, buffer) => {
        if (err) {
          reject(err)
        }
        console.log(buffer)
        res.image = 'data:image/jpg;base64,' + buffer.toString('base64')
        gm(filePath)
          .resize(w, h, '!')
          .crop(s, s, x, y)
          .noProfile()
          .setFormat('jpeg')
          .toBuffer((err, buffer) => {
            if (err) {
              reject(err)
            }
            res.fragment = 'data:image/jpg;base64,' + buffer.toString('base64')
            resolve(res)
          })
      })
  })
}

module.exports = getSlide
