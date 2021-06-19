Component({
  mixins: [],
  data: {
    canvasId: "canvasId",
    canvasW: 500,
    canvasH: 700,
    canvasBg: "#ccc",
    radius: "0" // 图形形状
  },
  props: {},
  onInit() {
    this.load()
  },
  deriveDataFromProps() { },
  didMount() { },
  didUpdate() { },
  didUnmount() { },
  methods: {
    async load() {
      const { canvasId, canvasW, canvasH } = this.data

      const ctx = my.createCanvasContext(canvasId);

      let series = [
        {
          name: '错误报告',
          type: 'pie',
          radius: '55%',
          data: [
            { value: 235, name: '视频广告', bgColor: "#c50101" },
            { value: 274, name: '联盟广告', bgColor: "#9bfc03" },
            { value: 310, name: '邮件营销', bgColor: "#03fc90" },
            { value: 335, name: '直接访问', bgColor: "#0090ff" },
            { value: 400, name: '搜索引擎', bgColor: "#1200ff" }
          ]
        }
      ]

      series.forEach((item) => {
        const sum = item.data.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.value
        }, 0)
        let nextAre = 0
        item.data.forEach((item) => {
          nextAre += 20 / sum * item.value
          this.drawSector({ ctx, canvasW, angle: nextAre, startAngle: nextAre - 20 / sum * item.value, bgColor: item.bgColor })
          this.drawDesc({})
        })
        this.drawTitle({ ctx, canvasW, canvasH, txt: item.name })
      })
    },

    async drawTitle({ ctx, canvasW, canvasH, txt, margin = 20 }) {
      const coordWVal = await this.getRatio(canvasW)  // 坐标
      const coordHVal = await this.getRatio(canvasH)  // 坐标
      ctx.beginPath()
      ctx.setFontSize(30)
      ctx.setTextAlign('center')
      ctx.setTextBaseline('bottom')
      ctx.fillText(txt, coordWVal / 2, coordHVal)
      ctx.draw(true)
    },
    async drawSector({ ctx, canvasW, angle, startAngle, bgColor }) {
      const coordVal = await this.getRatio(canvasW)  // 坐标
      // 画扇形
      // 先做最简单的，假装容器都是正方形的
      ctx.beginPath()
      // 画圆的函数，四个参数分别为x, y（坐标）, radius（半径）, angle（环形半径）, direction（环形方向，顺时针或者逆时针）
      // angle是我定义的一个变量，控制角度用的。一个完整的圆是Math.PI*2，angle把2均分之后的对应值
      ctx.arc(coordVal / 2, coordVal / 2, coordVal / 2, Math.PI * startAngle * 0.1, Math.PI * angle * 0.1, false)
      // 移动笔触到圆心
      ctx.lineTo(coordVal / 2, coordVal / 2)
      // 闭合路径
      ctx.closePath()
      // 根据弧度选择填色色彩
      ctx.fillStyle = bgColor
      // 填色
      ctx.fill()
      ctx.draw(true)
    },
    drawDesc() {

    },
    async getRatio(val) {
      const { screenWidth } = await this.getSystemInfo()
      const ratio = screenWidth / 750
      return ratio * val
    },
    async getSystemInfo() {
      return await new Promise(resolve => {
        my.getSystemInfo({
          success: (res) => {
            resolve(res)
          }
        })
      })
    },

    // 原生事件
    canvasTouch(e) {
      // {
      //   name: "联盟广告"
      //   selected: { 联盟广告: true }
      //   seriesId: "访问来源0"
      //   type: "pieselectchanged"
      // }
      console.log(e)
    }
  },
});
