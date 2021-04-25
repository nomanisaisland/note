const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

// const { Sequelize, DataTypes, Op } = require('sequelize')

// const sequelize = new Sequelize('test', 'root', '123456', {
//   host: 'localhost',
//   dialect: 'mysql',
//   // define: {
//   //   freezeTableName: true  // 强制表名等于模型名称，可以给表单独设置，也可以在这里全局设置，也可以用modelName直接告诉模型表名
//   // }
// })
// (async () => {
//   const User = sequelize.define(
//     'User',
//     {
//       identityId: {
//         type: DataTypes.STRING,
//         // unique: true, // 唯一约束  unique 属性可以是布尔值或字符串.   如果为多个列提供相同的字符串,则它们将形成一个复合唯一键.
//         allowNull: false, // 不允许为空
//         primaryKey: true, // 主键
//         comment: '每个用户的唯一身份标志符', // 注释
//       },
//       account: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         comment: '用户账户',
//       },
//       password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         comment: '用户密码',
//       },
//       nickName: {
//         type: DataTypes.STRING(50),
//         comment: '用户的昵称',
//       },
//       sex: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false, // 默认为false（男）
//         comment: '用户的性别，false为男，true为女',
//       },
//       sort: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true, // 自增
//         comment: '排序顺序',
//       },
//       level: {
//         type: DataTypes.INTEGER,
//         field: 'member_level', // 现在level拿到的数据字段名称叫做member_level
//         comment: '用户的权限等级',
//       },
//       blog_id: {
//         type: DataTypes.STRING,
//         references: {
//           model: blog, // 关联的表名
//           key: 'id', // 关联的字段名
//         },
//         comment: '博客外键',
//       },
//       age: {
//         type: DataTypes.INTEGER,
//       },
//     },
//     {
//       sequelize, // 我们需要传递连接实例
//       modelName: 'user', // 我们需要选择模型名称
//       // 在上面的属性中使用 `unique: true` 与在模型的参数中创建索引完全相同：
//       indexes: [{ unique: true, fields: ['identityId'] }],
//     }
//   )
//   const insertUser = await User.create(
//     {
//       // create 是build和save方法的简写形式
//       identityId: '123213213wqewqe',
//       nickName: '小周周',
//       sex: false,
//       sort: 1,
//       level: 0,
//       blog_id: '123456',
//       age: 26,
//     },
//     {
//       fields: ['nickName'], // 让用户仅可操作nickName字段，改不了其他字段
//     }
//   )

//   // const captains = await Captain.bulkCreate([
//   //   { name: 'Jack Sparrow' },
//   //   { name: 'Davy Jones' },
//   // ])
//   // console.log(captains.length) // 2
//   // console.log(captains[0] instanceof Captain) // true
//   // console.log(captains[0].name) // 'Jack Sparrow'
//   // console.log(captains[0].id) // 1 // (或另一个自动生成的值)
//   // await User.destroy(); // 现在该条目已从数据库中删除

//   User.nickName = '小卢卢'
//   await User.save({ fields: ['nickName'] })
//   // console.log(User.nickName) // "小卢卢"
//   // 上面显示为 "小卢卢",因为本地对象将其设置为 "小卢卢",
//   // 但是在数据库中它仍然是 "小周周"：
//   await User.reload()
//   // console.log(User.nickName) // "小周周"

//   // 为了递增/递减实例的值而不会遇到并发问题,Sequelize提供了 increment 和 decrement 实例方法.
//   // const incrementUser = await User.increment('age', { by: 2 }); 递增  by是指每次增多少
//   // const incrementUser = await User.increment({'age': 2}); 和上面的效果一样

//   // const findUserList = await User.findAll({
//   //   attributes: [
//   //     [
//   //       'identityId',
//   //       'id' /**现在我叫id，用嵌套数组来重命名属性 */,
//   //       'nickName',
//   //       'sex',
//   //       'sort',
//   //       'level',
//   //       'blog_id',
//   //       'age',
//   //       [
//   //         sequelize.fn(
//   //           'COUNT',
//   //           sequelize.col('age')
//   //         ) /**使用聚合查询来统计年龄总数 */,
//   //         'totalAge' /** 必须要提供别名*/,
//   //       ],
//   //     ],
//   //   ],
//   // })
//   // 等同于上面，查询所有并且聚合查询age的总和
//   const findUserList = await User.findAll({
//     attributes: {
//       include: [
//         [
//           sequelize.fn(
//             'COUNT',
//             sequelize.col('age')
//           ) /**使用聚合查询来统计年龄总数 */,
//           'totalAge' /** 必须要提供别名*/,
//         ],
//       ],
//       exclude: [
//         // 排除某些字段
//         'sort',
//       ],
//     },
//     where: {
//       // 运算符参readme.md
//       // 筛选条件
//       identityId: '123213213wqewqe',
//       age: {
//         [Op.eq]: 26, // 可以看到没有显式传递任何运算符(来自Op), Op.eq进行相等比较
//       },
//       // [Op.and]: [
//       //   {
//       //     level: 0,
//       //     sex: false,
//       //   },
//       // ],
//       // [Op.or]: [{ sex: true }, { sex: false }],
//       // sex: {  // 和上面一个效果相同
//       //   [Op.or]: [true, false],
//       // },
//     },
//     order: [['age']],
//     limit: 10,
//     offset: 8,
//   })
//   const coutUserList = await User.count({
//     where: {
//       age: {
//         [Op.gt]: 20,
//       },
//     },
//   })
//   await User.max('age') // 40
//   await User.max('age', { where: { age: { [Op.lt]: 20 } } }) // 10
//   await User.min('age') // 5
//   await User.min('age', { where: { age: { [Op.gt]: 5 } } }) // 10
//   await User.sum('age') // 55
//   await User.sum('age', { where: { age: { [Op.gt]: 5 } } }) // 50
//   const pkUser = await User.findByPk('123213213wqewqe'); // 通过主键查询记录

//   // 返回一条满足条件的记录
//   const findOneUser = await User.findOne({
//     where: {
//       age: 26
//     }
//   })

//   const findOrCreateUser = await User.findOrCreate({
//     where: {
//       age: 26
//     },
//     defaults: {
//       job: '程序员'
//     }
//   })
//   const findAndCountAllUser = await User.findAndCountAll({
//     where: {
//       age: 26
//     }
//   })
  
//   await User.update(
//     {
//       age: 18,
//     },
//     {
//       where: {
//         identityId: '123213213wqewqe',
//       },
//     }
//   )

//   // 截断表格 销毁表格
//   // await User.destroy({
//   //   truncate: true,
//   // })
// })()

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
)
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(
  views(__dirname + '/views', {
    extension: 'pug',
  })
)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
