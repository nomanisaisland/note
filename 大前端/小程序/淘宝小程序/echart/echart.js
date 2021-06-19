// import xbossdebug from "../units/xbossdebug/index"
Page({
  data: {},
  onLoad() {
    this.load()
  },
  load() {
    let aaa = JSON.stringify({ aaa: 1 })
    console.log(JSON.parse(JSON.stringify(aaa)))
    console.log(JSON.parse(JSON.stringify(aaa)))
  },
});
