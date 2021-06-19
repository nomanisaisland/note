```javascript
// md5.js

const md5 = require('md5')
const crypto = require('crypto');


const hash = (method, s, format) => {
    let sum = crypto.createHash(method);
    let isBuffer = Buffer.isBuffer(s);
    if(!isBuffer && typeof s === 'object') {
        s = JSON.stringify(s);
    }
    sum.update(s, isBuffer ? 'binary' : 'utf8');
    return sum.digest(format || 'hex');
}

exports.MD5 = function(s, format){
    return hash('md5', s, format)
}


// register
// 增  注
const register = async (options) => {
    let salt = RandomUtil.guidStringD() + String(Date.now())   // 盐
    let password = MD5(MD5(MD5(salt + String(options.account) + salt + String(options.password))))  //加密后的密码
    return await User.create({
        identity_id: RandomUtil.guidStringD(),
        account: options.account,
        salt,  // 保存盐，为后续用户登录密码比对用
        password,
    })
};

```

思路： 

随机产生一个盐，用盐加上账号密码加密得到加密后的密码，将盐和密码保存到数据库

用户登录时，取出盐，用相同的加密方式加密用户密码，比对加密后的和数据库中的密码是否相同，是的话登录成功，否的话登录失败