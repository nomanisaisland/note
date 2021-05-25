## MongoDB原生CRUD（增删改查）命令总结

-C creat：

    db.集合名.insert(文档对象)
    db.集合名.insertOne(文档对象)
    db.集合名.insertMany([文档对象，文档对象])

-R read：

    db.集合名.find(查询条件[,投影])
        举例:db.students.find({age:18}),查找年龄为18的所有信息
        举例:db.students.find({age:18,name:'jack'}),查找年龄为18且名字为jack的学生
        
    常用操作符：
        1. < , <= , > , >= , !==   对应为： $lt $lte $gt $gte $ne
            举例：db.集合名.find({age:{$gte:20}}),年龄是大于等于20的
        2.逻辑或：使用$in 或 $or
            查找年龄为18或20的学生
            举例：db.students.find({age:{$in:[18,20]}})
            举例：db.students.find({$or:[{age:18},{age:20}]})
        3.逻辑非：$nin
        4.正则匹配：
            举例：db.students.find({name:/^T/})
        5.$where能写函数：
            db.students.find({$where:function(){
                return this.name === 'zhangsan' && this.age === 18
            }})
                
    投影：过滤掉不想要的数据，只保留想要展示的数据
        举例：db.students.find({},{_id:0,name:0}),过滤掉id和name
        举例：db.students.find({},{age:1}),只保留age
        
    补充：db.集合名.findOne(查询条件[,投影])，默认只要找到一个

-U update：

    db.集合名.update(查询条件,要更新的内容[,配置对象])
        
    //如下会将更新内容替换掉整个文档对象，但_id不受影响
        举例：db.students.update({name:'zhangsan'},{age:19})
        
    //使用$set修改指定内容，其他数据不变，不过只能匹配一个zhangsan
        举例：db.students.update({name:'zhangsan'},{$set:{age:19}})
        
    //修改多个文档对象，匹配多个zhangsan,把所有zhangsan的年龄都替换为19
        举例：db.students.update({name:'zhangsan'},{$set:{age:19}},{multi:true})
        
     补充：db.集合名.updateOne(查询条件,要更新的内容[,配置对象])
           db.集合名.updateMany(查询条件,要更新的内容[,配置对象])

-D delete

    db.集合名.remove(查询条件)
        //删除所有年龄小于等于19的学生
        举例：db.students.remove({age:{$lte:19}})





## 聚合查询

```javascript
db.students.aggregate([
    {
        $match: {
            id: "xxx"
        },
        $group: {
            _id: null,
            total: {
                $sum: {
                    $toDobule: "$sumValue"
                }
            },
            cout: {
                $sun: 1
            }
        }
    },
    {
        
    }
])

// 统计字段$sumValue的值，并且统计总数
// 返回值
return {
    "0": {
        _id: ,
        total: $sumValue,
        cout: sumNumber,
    }
}
```







## 淘宝小程序版本 

### 1. 增 insertOne insertMany

```javascript
cloud.db.collection("dataBaseName").insertOne({id: 1})

cloud.db.collection("dataBaseName").insertOne([{id: 1},{id: 2}])
```

### 2. 删 deleteMany

```javascript
cloud.db.collection("dataBaseName").deleteMany({id: 1})
```

### 3. 改 updateMany

```javascript
cloud.db.collection("dataBaseName").updateMany({id: 1},{
    $set: {
        name: "tom"
    },
    $inc: {   // 1为自增 -1为自减
        count: -1,
        age: 1
    }
})
```

### 4. 查 find   限制最大操作数为500条

```javascript
const shopId = 123
cloud.db.collection("dataBaseName").fnd({
    id: 1,
    $or: [{ shopId: shopId }, { shopId: "d65df1ec82668049b473c0d1e79e6488" }],   // 先匹配前面的，没有找到的话匹配后面的
    addTime: {
      $gt: Date.now(), // 大于当前时间   $lt  小于   $gte 大于等于   $lte  小于等于   $ne 不等于
    },
},{
    projection: {  // 筛选返回的字段
        age: 1
    }
})
// 如果使用limit和skip做分页，那么一定要使用sort，不然拿到的数据会无序且重复
```

### 5. 替换 replaceOne

```javascript
cloud.db.collection('users').replaceOne(
    {   // filter
      name: 'tom',  
      age: 18 
    },
    {  // data
      name: 'jerry' 
    }
)
```

###  6. 统计

```javascript
cloud.db.collection('users').count(
    {  
      age: {$gt: 18} 
    }
)
```

### 7. 聚合查询

```javascript
cloud.db.collection('users').aggregate([
    {  //$match 筛选
      $match: {
          name: 'tom',
          hidden: {
             $ne: true, // 不等于true
          },
      }   
    },
    { // join 分组，从表的信息
      $lookup: {
        from: "product",   // 表名
        localField: "productId",   // 主表匹配字段
        foreignField: "id",   // 从表匹配字段
        as: "product",  // 别名
      }
    },
    {
      $sort: {  // 排序
        'product.addTime': 1
      }
    },
    {  // 拆分子数组
      $unwind: {
        path: "$task",   // 拆分的字段为task
        preserveNullAndEmptyArrays: true  // 空数组也拆分
      }
    },
    {
      $addFields: { 子数组添加到主表的字段
           repeat: "$task.repeat",
      }
    },
    {
        $project:{  // 返回字段配置
    		
    	}
    }
])


//Exceeded memory limit for $group, but didn't allow external sort. Pass allowDiskUse:true to opt in.如果看到这个提示，那么被限制了
//报错原因：mongo内存限制。 aggregate函数 使用$group时，数据大小必须小于16945KB。
//解决方法：
//在mongo中修改，如下例：
db.stocks.aggregate( [
      { $project : { cusip: 1, date: 1, price: 1, _id: 0 } },
      { $sort : { cusip : 1, date: 1 } }
   ],
   { allowDiskUse: true }
)
```

