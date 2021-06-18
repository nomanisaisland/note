
/**
 * 目前只有缓存失效才能更改缓存
 */
export class MyStorage {
  constructor(model) {
    this.strategyModel = model || 'LFU'
  }
  /**
   * 清除所有缓存数据 
   * */
  clearAll() {
    my.clearStorage()
  }
  /**
   * 获取所有缓存信息
   * */
  async getInfor() {
    return await new Promise((resolve, reject) => {
      my.getStorageInfo({
        success: function (res) {
          resolve(res)
        }
      })
    })
  }
  async originGetStorage(key) {
    return await new Promise((resolve, reject) => {
      my.getStorage({
        key: key,
        success: function (res) {
          resolve(res);
        },
        fail: function (res) {
          reject(res);
        }
      });
    });
  }
  /** 获取缓存数据
   *  @param {string} 
   * 
   * 
   * message: 查无此key  或者是success
   * */
  async getVal(key) {
    const getLocalData = await this.originGetStorage(key)
    const getLFUData = (await this.getLFU()).originData
    const currentData = (getLFUData.filter(item => item.key == key))[0]
    if (!(currentData || {}).stay) {
      await this.updataLFU(key)
      const getExprTimeData = this.getExprTimeData(getLocalData);
      if (getExprTimeData.code !== -1) {
        // console.log(getExprTimeData.data.data)
        return {
          code: 1,
          message: "获取缓存成功",
          data: getExprTimeData.data.data
        }
      } else {
        return {
          code: -1,
          message: getExprTimeData.message,
          data: getExprTimeData.data
        }
      }
    } else {
      return {
        code: -1,
        message: "该数据已被剔除缓存"
      }
    }
  }
  /**
   * 封装原生的setStorage
   * @param {string} key 
   * @param {*} val 
   */
  async originSetStorage(key, val) {
    return await new Promise((resolve, reject) => {
      my.setStorage({
        key: key,
        data: val,
        success: function (res) {
          resolve(res);
        }
      });
    });
  }
  /**
   * 设置缓存数据
   * @param {string} key 
   * @param {*} val 
   * @param {number} expTime 
   */
  async setVal(key, val, overlay = false, expTime) {
    const LFU_STATE = await this.setLFU(key)
    // 删除策略
    const data = {
      data: val,
    }

    const setExprTimeData = await this.setExprTime(key, data, expTime)
    if (setExprTimeData.code === -1) {
      await this.originSetStorage(key, setExprTimeData.data)
      return {
        code: 1,
        message: "缓存设置成功",
        lfuState: LFU_STATE.message
      }
    }
    if (overlay) {
      const overLayExprData = await this.setExprTime(key, data, expTime, overlay)
      await this.originSetStorage(key, overLayExprData.data)
      return {
        code: 1,
        message: "强制覆盖成功",
        data: overLayExprData.data.data,
        lfuState: LFU_STATE.message
      }
    }

    return {
      code: -1,
      message: "该数据已有缓存，设置失败",
      lfuState: LFU_STATE.message
    }
  }
  /**
   * 清除对应缓存数据
   * @param {string} key 
   */

  removeVal(key) {
    my.removeStorage({
      key: key,
    });
  }

  /**
   * 处理过期时间的所有业务逻辑
   * @param {object} getLocalData 
   */
  getExprTimeData(getLocalData) {
    // 如果没有缓存的话
    if (!(getLocalData || {}).data) {
      return {
        code: -1,
        message: "没有缓存，请设置缓存数据",
        data: (getLocalData || {}).data
      }
    }
    // 如果有缓存的话
    const expTime = Number(getLocalData.data.expTime);
    if (expTime <= Date.now()) {
      // 如果缓存过期的话 删除缓存，并且返回删除的数据
      this.removeVal(Object.keys(getLocalData.data).filter(item => item !== "expTime")[0])
      return {
        code: -1,
        message: "缓存过期，请重新设置",
        data: getLocalData.data.data
      }
    }
    return {
      code: 1,
      data: getLocalData.data
    }
  }
  /**
   * 处理设置过期时间的所有业务逻辑   先做一个简单的，直接覆盖，不考虑更新局部数据
   * @param {string} key 
   * @param {object} data 
   * @param {number} expTime 
   */
  async setExprTime(key, data, expTime, overlay = false) {
    // 如果有设置的话，判断有没有过期，过期的话清掉缓存
    const getCacheData = await this.originGetStorage(key);
    if (getCacheData.message == '查无此key') {
      const exprTime = {
        expTime: (Number(expTime) + Date.now()) || (604800000 + Date.now()),  // 如果有设置的话，按设置的，没有的话默认一周过期
      }
      return {
        code: -1,
        message: "缓存已过期",
        data: Object.assign(data, exprTime)
      }
    }
    if (overlay) {
      const exprTime = {
        expTime: (Number(expTime) + Date.now()) || (604800000 + Date.now()),  // 如果有设置的话，按设置的，没有的话默认一周过期
      }
      return {
        code: 1,
        message: "强制覆盖模式开启",
        data: Object.assign(data, exprTime)
      }
    }
    return {
      code: 1,
      message: "该数据已有缓存",
      data: getCacheData.data
    }
  }
  // 最少使用策略 LFU  更新设置调用次数
  /**
   * {
        key: key,
        count: 1,
        stay: false
      }
   */
  async getLFU() {
    const LFU_KEY = "LFU"

    const getValData = await this.originGetStorage(LFU_KEY)
    let lfuVal = []
    if (!!getValData.success) {
      // 存入的都是字符串形式
      lfuVal = getValData.data
    }
    const LFU_VAL_STAY = lfuVal.filter(item => {
      return item.stay == false   // stay为true的时候，代表这个数据可以被缓存，否则代表这个数据是非常用数据，不被第二次缓存
    })
    return {
      code: 1,
      message: "统计数据",
      data: [...LFU_VAL_STAY],
      originData: [...lfuVal],
      key: LFU_KEY
    }
  }
  /**
   * 每次获取缓存都会调用这个方法，用来更新调用次数
   * @param {string} key 
   */
  async updataLFU(key) {
    const LFU_KEY = "LFU"
    const getValData = await this.originGetStorage(LFU_KEY)
    if (!!getValData.success) {
      // 存入的都是字符串形式
      let lfuVal = [...getValData.data]
      const LFU_VAL_STAY = lfuVal.filter(item => {
        return item.stay == false   // stay为false的时候，代表这个数据可以被缓存，否则代表这个数据是非常用数据，不被第二次缓存
      })
      LFU_VAL_STAY.forEach(item => {
        if (item.key == key) {
          item.count++
        }
      })
      lfuVal.forEach(item => {
        if (item.key == key) {
          item.count++
        }
      })
      await this.originSetStorage(LFU_KEY, lfuVal)
      return {
        code: 1,
        message: "统计数据",
        data: LFU_VAL_STAY,
        originData: lfuVal,
        key: LFU_KEY
      }
    } else {
      return {
        code: -1,
        message: "未找到该数据统计列表",
        data: getValData.data,
        originData: getValData.data,
        key: LFU_KEY
      }
    }

  }
  async setLFU(key) {
    // 查看本地存储空间大小
    const localStorageInf = await this.getInfor()
    const maximumStorage = localStorageInf.limitSize - 240  // 预留240kb，防止它数据满了给我乱删
    const getLFUData = await this.getLFU()

    const originData = getLFUData.originData
    // 删除策略模式还没有测试
    // maximumStorage
    if (localStorageInf.currentSize >= maximumStorage) {
      // 1. 先进先出策略 FIFO

      // 如果当前存储数据接近存储最大值，需要清空部分数据，有以下清空策略可以解决
      // 做的太简单了，很多没有判断，后续加上如果被删了就不可以再设置了
      // if (this.strategyModel == "FIFO") {
      //       this.removeVal(localStorageInf.keys[0])
      //     }

      // 2. 最少使用策略 LFU
      if (this.strategyModel == "LFU") {
        // 给LFU数组排序
        // 不定时清理访问次数  如果要定时清理访问次数的话，还需要考虑一个问题：清完之后突然需要缓存，怎么删？？？

        const LFU_COUNT_KEY = getLFUData.data.sort((a, b) => {
          return Number(a.count) - Number(b.count)
        })

        // 找到当前key
        const CUR_KEY = originData.findIndex(item => item.key == key)
        // 如果有找到key
        if (CUR_KEY !== -1) {
          if (originData[CUR_KEY].stay) {
            return {
              code: -1,
              message: "该数据使用量少，没有必要缓存!"
            }
          } else {
            return {
              code: -1,
              message: "该数据已有缓存统计，无需重新再设"
            }
          }
        } else {

          // 将使用最少的缓存去掉   去掉之后，后续该键值对都不应该出现在缓存中
          this.removeVal(LFU_COUNT_KEY[0].key)

          LFU_COUNT_KEY[0].stay = true
          originData.forEach(item => {
            if (item.key == LFU_COUNT_KEY[0].key) {
              item.stay = true
            }
          })
          // 如果没有的话，就往里面加数据记录
          originData.push({
            key: key,
            count: 1,
            stay: false
          })
          await this.originSetStorage(getLFUData.key, originData)
          return {
            code: 1,
            message: "缓存统计添加成功",
            data: originData
          }
        }
        // 将删除的数据永远剔除缓存队列
        // 3. 最近最少使用策略 LRU
      }
    }
    const statisticalData = originData.findIndex(item => item.key == key)
    if (statisticalData == -1) {
      originData.push({
        key: key,
        count: 1,
        stay: false
      })
      await this.originSetStorage(getLFUData.key, originData)
      return {
        code: 1,
        message: "数据统计设置成功",
        data: originData
      }
    }
    return {
      code: -1,
      message: "数据统计设置失败，已有统计，后续直接更新",
      data: originData
    }
  }
  // 最少使用策略 LFU   根据调用次数删除最少次数的缓存，并且不再将其当作缓存
  clearLFU(key) {

  }
}
