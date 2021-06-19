import { MyStorage } from "../units/storage"
Page({
  data: {},
  onLoad() {
    this.load()
  },
  async load() {
    const localStorage = new MyStorage()
    await localStorage.getVal('213')
    console.log(await localStorage.setVal('213', {
      name: 121321321,
      test: 123213
    }, true))
    // console.log()
    // console.log()
    // console.log()
    // console.log()
  }
});
