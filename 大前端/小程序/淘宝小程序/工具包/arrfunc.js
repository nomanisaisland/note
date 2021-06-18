function distinct(a, b) {
    let arr = a.concat(b)
    let result = []
    let obj = {}
    for (let i of arr) {
        if (!obj[i]) {
            result.push(i)
            obj[i] = 1
        }
    }
    return result
}
/**
 * 数组去重
 * @param {array} array 
 * @return {array} array
 */
function unique(array) {
    var obj = {};
    return array.filter(function (item, index, array) {
        return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)
    })
}
/**
 * 数组分组
 * @param {Array} list 
 * @param {func} fn
 * @return {Array}  
 */
function groupBy(list, fn) {
    let groups = []
    
    list.forEach(o=> {
        // 只支持单个参数回传
        const group = JSON.stringify(fn(o))
        groups[group] = groups[group] || []
        groups[group].push(o)
    })
    return Object.keys(groups).map(function (group) {
        return groups[group]
    })
    // return groups;
}
/** 
 * 数组去重
 * 
 */
let key = 0
function duplicate(list) {
    key++
    if (Array.isArray(list)) {
        list.forEach(e => {
            // 如果是数组的话继续递归
            if (Array.isArray(e)) {
                duplicate(e)
            }
        })
    }
}
export { distinct, unique, groupBy }