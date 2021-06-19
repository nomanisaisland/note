// 获取倒计时
function timeDownUp(time, nowTime) {
  let leftTime = (time - nowTime) / 1000 / 60 / 60 / 24;
  if (leftTime < 0) {
    leftTime = 0;
  } else {
    leftTime = parseInt(leftTime);
  }
  return leftTime;
}
// 时间转换
function timeConversion(time) {
  const date = new Date(time);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = handleSingular(month);
  day = handleSingular(day);
  return year + "-" + month + "-" + day;
}
// 处理大于零小于十的数
function handleSingular(param) {
  if (param < 10) {
    return "0" + param.toString();
  } else {
    return param;
  }
}


function timeConversionOnly(time, addTime) {
  const timeStamp = new Date(time).getTime() + addTime;
  const timeLocal = new Date(timeStamp)
  const year = timeLocal.getFullYear();
  const month = handleSingular(timeLocal.getMonth() + 1);
  const day = handleSingular(timeLocal.getDate());
  const hour = handleSingular(timeLocal.getHours());
  const minute = handleSingular(timeLocal.getMinutes());
  const second = handleSingular(timeLocal.getSeconds())
  return year + "-" + month + "-" + day + ' ' + hour + ':' + minute + ':' + second;
}

// function timeDownUp(time, nowTime) {
//   let leftTime = (time - nowTime) / 1000 / 60 / 60 / 24
//   if (leftTime < 0) {
//     leftTime = 0
//   } else {
//     leftTime = parseInt(leftTime)
//   }
//   return leftTime
// }
// // 时间转换
// function timeConversion(time) {
//   const date = new Date(time)
//   const year = date.getFullYear()
//   let month = date.getMonth() + 1
//   let day = date.getDate()
//   month = handleSingular(month)
//   day = handleSingular(day)
//   return year + '-' + month + '-' + day
// }
// 处理大于零小于十的数
function handleSingular(param) {
  if (param < 10) {
    return '0' + param.toString()
  } else {
    return param
  }
}

/*
 * @Number
 * @Number
 */
function addZero(i) {
  if (Number(i) < 10) {
    i = '0' + Number(i)
  }
  return i
}
async function showtime(nowTime,endTime) {
  let leftTime = parseInt((endTime - nowTime) / 1000)
  if (leftTime <= 0) leftTime = 0
  let d = parseInt(leftTime / (24 * 60 * 60))
  let h = parseInt((leftTime / (60 * 60)) % 24)
  let m = parseInt((leftTime / 60) % 60)
  let s = parseInt(leftTime % 60)
  let arr = []
  d = addZero(d)
  h = addZero(h)
  m = addZero(m)
  s = addZero(s)
  arr.push(d, ':', h, ':', m, ':', s)
  return arr
}


export { timeDownUp, timeConversion, handleSingular, timeConversionOnly,showtime }