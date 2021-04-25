## 1. 数据库的好处

	+ 实现数据持久化
	+ 使用完整的完整的管理系统统一管理、易于查询方便管理

## 2. 数据库的概念

+ DB
  - 数据库（database）：存储数据的‘仓库’。他保存了一系列有组织的数据。
+ DBMS
  + 数据管理系统（Database Management System）。数据库是通过DBMS创建和操作的容器。我们安装的其实是数据库管理系统
+ SQL
  + 结构化查询语言（Structure Query Language）：专门用来与数据库通信的语言

### 2.1 DBMS分为两大类

+ 基于共享文件系统的DBMS（Access）
+ 基于客户机--服务器的DBMS（MySQL、Oracle、SqlServer）

## 3. SQL的优点

1. 不是某个特定数据库供应商专有的语言，几乎所有的DBMS都支持SQL
2. 简单易学
3. 是一种强有力的语言，灵活使用其语言元素，可以进行非常复杂和高级的数据库操作

## 4. 数据库的特点

1. 将数据放到表中，表再放到库中
2. 一个数据库中可以有多个表，每个表都有一个名字，用来标识自己。表名具有唯一性。
3. 表具有一些特性，这些特性定义了数据在表中如何存储，类似java中类的设计
4. 表由列组成，我们也称字段。所有表都是由一个或多个列组成的，每一列类似java中的属性
5. 表中的s数据是按行存储的，每一行类似于java中的对象

## 5. MySQL服务端的登录和退出

方式一：通过mysql自带的客户端，安装后就有

方式二：通过windows自带的命令行（需要配置环境变量）

```shell
# 连接数据库
mysql -u root -p
# h是主机host   P是端口号   直接在命令行输入端口号和密码
mysql -h localhost -P 3306 -u root -proot


# 退出数据库
exit  
Ctrl + c



```

## 6. 常见命令

```shell
#语法需要以; 或者\g 结尾
# 查询数据库列表
show databases;

# 选择数据库
use 库名;
# 查询数据库内表的列表
show tables;
# 查询数据库内表的列表(上面的方法不完全集合体，仅仅用来查询表，当前的位置不会改变)
show tables from 库名;

# 查询目前在哪个数据库
select database();

# 创建一个表以及表的设计
create table 表名(
id int,
name varchar(20));

# 查看表的结构
desc 表名;

# 查看表的数据
select * from 表名;

# 插入数据
insert into 表名 (id,name) values(1,'john');
insert into 表名 (id,name) values(2,'tom');

# 修改数据 
update 表名 set name='lilei' where id=1;
# 修改数据（其他表的信息正确）
update 
inform,users
set 
inform.STATUS = 1
where 
users.tid = inform.tea_id

# 删除数据
delete from 表名 where id=1;


# 查看数据库版本
select version();
# 或者退出sql输入
mysql --version   
mysql -V
```

# [多表关联的update语句](https://www.cnblogs.com/shiningrise/archive/2007/05/25/759555.html)

**MSSql的多表关联的update语句**
**例如A表 存在一下字段:
AID A1 A2 A3 A4

B表中存在字段：
BID B1 B2 B3 B4

如果实现用B表的所有字段更新A表中相应的字段，在MS SQL Server里面可以写成：
update A
set A1=B.B1,A2=B.B2,A3=B.B3,A4=B.B4
from A,B
where A.AID=B.BID**

ORACLE UPDATE **多表关联的update语句**

 -- update 超过2个值
  update customers a  -- 使用别名
  set  (city_name,customer_type)=(select b.city_name,b.customer_type 
                   from  tmp_cust_city b 
                   where b.customer_id=a.customer_id)
  where exists (select 1 
         from  tmp_cust_city b
         where b.customer_id=a.customer_id
         )

## 7. MySQl的语法规范

1. 不区分大小写，但建议关键字大写、表名、列名小写
2. 每天命令最好用分号结尾
3. 每条命令根据需要，可以j进行缩进或者换行
4. 注释
   + 单行注释：#   和   --   ，注--后面要有空格
   + 多行注释：/* 注释文字 */

## 8. SQL语言细分

表的讲解

![1569167006582](C:\Users\93478\AppData\Roaming\Typora\typora-user-images\1569167006582.png)

9+31 v-+0

### 8.1. DQL*（Data Query Language）语言学习

#### 8.1.1 基础查询

##### 语法：

```mysql
select 查询列表 from 表名;
```

特点：

1. 查询列表可以是什么：表中的字段、常量值、表达式、函数
2. 查询的结果是虚拟的表格

```mysql
# 打开数据库(建议用sql命令主动打开库名)
use 库名;
# 查询表中的单个字段
select 字段名 from 表名;
# 查寻表格的多个字段
select 字段1,字段2 from 表名;
# 查询表中的所有字段（顺序和表名相同）
select * from 表名;
# 查询常量值
select 100;
select 'john';
# 查询表达式
select 90*9;
# 查询函数
select version();
```

##### 取别名(字段)：

好处：

+ 便于理解
+ 如果要查询的字段有重名的字段，使用别名可以区分开来

```mysql
# 方式一  使用as
select 90*8 as 结果;
select last_name as 姓,first_name as 名;
# 方式二  使用空格
select last_name 姓,first_name 名;
# 如果别名中有保留字，建议加上双引号(out为保留字)
select hhh as "out put" form 表名;
```

##### 去重

查询某表中涉及到的所有的字段值

```mysql
select distinct 字段 from 表名
```

##### + 的作用

mysql中的+只有一个功能，就是运算符



##### 拼接字段

```mysql
select concat('a','b'','c') as 结果;
select concat('a','b'','c') as 结果 from 表名;
```



#### 8.1.2 条件查询

语法：

`select 查询列表 from 表名 where 筛选条件`

##### 分类：

###### 按条件表达式筛选

+ 简单的条件运算符：>    <    =   <>（不等于）    >=  <=      

+ ```mysql
  select * from 表名 where 字段>1230;
  
  select 字段 from 表名 where 字段>1230;
  
  select 字段 from 表名 where 字段<>1230;
  ```

###### 按逻辑表达式筛选

+ 逻辑运算符：&&    ||    !     and    or    not

  ```mysql
  select 字段 from 表名 where 字段1>=100 and 字段1<=1000;
  
  select 字段 from 表名 where 字段1>=100 or 字段2<=1000;
  ```

###### 模糊查询（复杂的条件运算符）(模糊匹配，不精确匹配)

+ like  between   and     in     is  null

+ like特点：

  + 一般和通配符搭配使用： %% 任意多个字符，包含0个字符     _ 任意单个字符（就一个）

+ ```mysql
  # %代表通配符，代表任意字符，以下的意思是在字段中查询含a的字段
  select * from 表名 where 字段 like '%a%';
  
  # 查询第三个字符为a，第5个字符为b的字段列
  select * from 表名 where 字段 like '__a_b'; 
  # 特殊案例(查询第二个为_,第三个为a,第四个为b)
  select * from 表名 where 字段 like '_\_a_b'; 
  # escape 转义关键词
  select * from 表名 where 字段 like '_$_%' escape '$'; 
  ```

+ between and

  + 使用between and可以提高语句的简洁度

  + 包含临界值

  + 两个临界值不可以颠倒（前小后大）

  + ```mysql
    # 100和1000之间
    select 字段 from 表名 where 字段1>=100 and 字段1<=1000;
    # 等价于
    select 字段 from 表名 where 字段1 between 100 and 1000;
    ```

+ in

  + 用于判断某字段的值是否属于in列表中的某一项

  + 特点：

    + 使用in提高了语句简洁度
    + in列表的值必须一致或者兼容
    + 不可以使用通配符

  + ```mysql
    select 字段 from 表名 where 字段='字段值1' or 字段='字段值2';
    # 等价于
    select 字段 from 表名 where 字段 in ('字段值1','字段值2');
    ```

+   is  null 只可以搭配使用，不可以拆开

  + =或<>不可以判断null值

  + is null 或者is not null 可以判断null值

  + ```mysql
    # 查询所有为空的字段值
    select 字段 from 表名 where 字段 is null;
    ```

+ 安全等于

  + ```mysql
    # 查询所有为空的字段值
    select 字段 from 表名 where 字段 <=> null;
    # 查询所有为1200的字段值
    select 字段 from 表名 where 字段 <=> 1200;
    ```

+ is null pk  <=>

  + is null：仅仅可以判断null值
  + <=>：既可以判断null值，也可以判段普通数值，但是可读性低，推荐用上面那种

```mysql
# 判断员工年薪
select last_name,department_id,salary*12*(1+IFNULL(commission_pct,0)) as 年薪 from employees;
```



#### 8.1.3 排序查询

##### 语法：

```mysql
select 查询列表
from 表名
where 筛选条件
order by 排序列表 [asc|desc];	
```

特点：

+ desc是降序，asc是升序，没有值默认是升序
+ order by 支持对多个字段、单个字段、表达式、函数、别名
+ order by一般是放在查询语句的最后面（limit子句除外）

```mysql
# 字段从高到底排序
select * from 表名 order by 字段 desc;
# 字段从低到高排序
select * from 表名 order by 字段 asc;

# 按表达式排序
select *,1+1 别名 from 表名 order by 1+1 asc;
# 按别名排序
select *,1+1 别名 from 表名 order by 别名 asc;
# 按函数排序
select length(字段) 字节长度 from 表名 order by length(字段) asc;
# 按多个字段排序
select * from 表名 order by 字段1 asc,字段2 desc;
```



#### 8.1.4 常见函数

##### 概念：

类似于java方法，将一组逻辑语句封装在方法体中，对外暴露方法名

##### 好处：

1、 隐藏了实现细节 2、提高了代码的重用性

##### 调用：

 select 函数名(实参列表) from 表名 

##### 特点

+ 叫什么（函数名）
+ 干什么（函数功能）

##### 分类

###### 单行函数：如concat、length、ifnull 等

+ 字符函数

  + ```mysql
    # length获取参数值的字节个数
    select length('jhon');
    
    # concat 拼接字符串
    select concat(字段1,'_',字段2) from 表名;
    
    # upper lower 变大小写
    select upper('jhon');
    select lower(字段);
    select concat(upper('jhon'),'_',lower(字段)) from 表名;
    
    # substr  substring  截取字符，从1开始   第三个参数是字符长度
    select substr('李莫愁爱上陆湛远',6) 别名;
    select substr('李莫愁爱上陆湛远',6,3) 别名;
    
    # instr  返回子串的起始索引，如果找不到返回0
    select instr('杨不悔爱上应留下','应留下') as out_put from 表名;
    
    # trim  去前后空格
    select trim('    hhh   ') as 表名;
    # trim 去前后字符  去掉a
    select trim('a' from 'aaaaaaa发大水aaaaaa计划经济aaaaaaaaaa') as 表名;
    
    # lpad  用指定的字符实现左填充长度
    select lpad('殷素素',10,'*') as 表名;
    # rpad  用指定的字符实现右填充长度
    select rpad('殷素素',10,'*') as 表名;
    
    # replace	替换
    select replace('周芷若爱上张无忌','周芷若','赵敏') as 表名
    ```

+ 数学函数

  + ```mysql
    # round 四舍五入  第二个参数表示小数点后面保存的位数
    select round(-1.65);
    select round(-1.6523,2);
    
    # ceil 向上取整,返回>=该参数的最小整数
    select ceil(1.0);
    
    # floor 向下取整，返回<=该参数的最大整数
    select floor(-0.33);
    
    # truncate 截断   第二个参数表示小数点后面保留几位
    select truncate(1.65,1);
    
    # mod 取余  10%3
    select mod(10,3);
    ```

    

+ 日期函数

  + ```mysql
    # 返回当前系统日期+时间
    select now();
    
    # curdate 返回当前系统日期
    select curdate();
    
    # curtime 返回当前时间
    select curtime();
    
    # 可以获取指定的部分、年(year)、月(month、monthname)、日(day)、小时(hour)、分钟(miunte)、秒(second)
    select year(new());
    
    # str_to_date 将日期格式的字符通过指定的格式转换成日期
    select str_to_date('1996-05-24','%Y-%m-%d');
    
    # date_format 将日期转换成字符
    select date_format(new(),'%y年%m月%d日');
    ```

  + ![1569230171339](C:\Users\93478\AppData\Roaming\Typora\typora-user-images\1569230171339.png)

+ 其他函数

  + ```mysql
    select version();
    select database();
    select user();
    ```

    

+ 流程控制函数

  + ```mysql
    # if 函数：  实现if else 效果
    select if(10>5,'大','小');
    
    # case 函数（控制结构）
    # 使用1：switch case 的效果   语句后面要加;,值不用
    case 要判断的字段或表达式
    when 常量1 then 要显示的值1或语句1
    when 常量2 then 要显示的值2或语句2
    ...
    else 要显示的值n或语句n
    end as 别名
    from 表名
    # 使用2：类似于多重if    语句后面要加;,值不用
    case
    when 条件1 then 要显示的值1或语句1
    when 条件2 then 要显示的值2或语句2
    ...
    else 要显示的值n或语句n
    end
    
    ```

#### 8.1.5 分组函数

###### 功能：

做统计使用，又称为统计函数、聚合函数、组函数

###### 参数支持哪些类型：

+ sum  avg： 数值型
+ max min count：任何类型

+ 以上分组函数都忽略null
+ 可以和distinct搭配实现去重运算
+ count函数的单独介绍
  + 效率：
    + MYISAM 存储引擎下   count(*) 效率最高
    + INNODB 存储引擎下   count(*) 和count(1)效率差不多，但是比count(字段)要高一些
+ 和分组函数一同查询的字段要求是group by 后的字段

+ 分类：

  + sum 求和

    + ```mysql
      # 字段的所有值之和
      select sum(字段);
      ```

  + avg 平均值

    + ```mysql
      # 字段的所有值的平均值
      select avg(字段);
      ```

  + max 最大值

    + ```mysql
      # 字段的所有值的最大值
      select max(字段);
      ```

  + min 最小值

    + ```mysql
      # 字段的所有值的最小值
      select min(字段);
      ```

  + count 计算个数（一般用于统计行数）

    + ```mysql
      # 字段的所有值的个数
      select count(字段);
      # 所有字段的个数
      select count(*);
      # 多加一列，统计一列的个数，就是说统计所有行的个数
      select count(1);
      ```

#### 8.1.6 分组查询

###### 分组数据：group by 子句语法

```mysql
select 分组函数,字段列（要求放在group by 后面）
from 表名 
where 条件 	
group by 字段列
order by子句
```



###### 作用：

可以将表中的数据分成诺干组

###### 注意： 

查询列表必须特殊，要求是分组函数和group by后出现的字段

###### 特点：

+ 分组查询中的筛选条件分为两类
  + ​							数据源                         位置                              关键字
  + 分组前筛选          原始表                          group by子句前面        where
  + 分组后筛选          分组后的结果集            group by子句后面        having
  + 分组后筛选分组函数做条件肯定是放在having子句中
  + 能用分组前筛选的优先使用分组前筛选
+ group by 子句可以按单个字段分组也可以按多个字段分组（多个字段按逗号隔开，没有先后顺序）、表达式函数等
+ 也可以添加排序（排序放在整个分组查询的最后）

注：where 一定 放在from后面

#### 8.1.7 连接查询（多表查询）

##### 场景：

当查询的字段来自于多个表时，就会用到连接查询

##### 语法：

```mysql
select 字段1,字段2 from 表1,表2;
```

以上语法会出现一个问题：笛卡尔乘积现象，造成原因：没有有效的连接条件

字段1的每个值都会匹配到字段2的所有值，行数为字段1的行数乘于字段2的行数

修改后的语法：

```mysql
select 字段1,字段2 from 表1,表2
where 表1.字段1 = 表2.字段2;
```



##### 分类：

按年代分类：

+ sql92 标准  （仅仅支持内连接）

  + 等值连接	

    + 特点：

      + 多表的等值连接等于多表的交集部分
      + n表连接，至少需要n-1个连接条件
      + 多表的顺序没有要求
      + 一般需要为表取别名
      + 可以搭配前面介绍的所有子句l来使用，比如排序，筛选

    + ```mysql
      select 字段1,字段2,字段3 
      from 表1 as 别名,表2 别名
      where 表1.字段3 = 表2.字段4
      and 字段3 like '';
      
      # 当字段名相同时，可以使用表的别名.相同字段的一个;
      select 字段1,别名.字段2,字段3 
      from 表1 as 别名,表2 别名
      where 表1.字段3 = 表2.字段4
      and 字段3 like '';
      
      # 三表连接
      select 字段1,字段2,字段3
      from 表1 别名1,表2 别名2, 表3 别名3
      where 别名1.'字段4' = 别名2.'字段5'
      and 别名2.'字段6' = 别名3.'字段7'
      and 字段3 like '';
      order by 字段2 desc;
      ```

  + 非等值连接

    + 一张表当两张表使用

    + ```mysql
      # 查询员工的工资和工资的级别
      select salary,grade_level
      from employees e,job_grades g
      where salary between g.'lowest_sal' and g.'highest_sal';
      ```

  + 内连接

    + ```mysql
      # 查询员工名和上级的名称
      select e.employee_id,e.last_name,m.employee_id,m.last_name
      from employees e,employees m 
      where e.'manager_id' = m.'employee_id';
      ```

    + 

+ sql99标准（推荐）支持内连接，外连接（左外和右外）、交叉连接

按功能分类：

+ 内连接：
  + 等值连接
  + 非等值连接
  + 自连接
  
+ 外连接
  
  + 应用场景：
  
    + 用于查询一个表中有，另一个表中没有的记录
  
  + 特点：
  
    + 外连接的查询结果为主表中的所有记录
      + 如果从表中有和他匹配的，则显示匹配的值
      + 如果从表中没有和他匹配的，则显示null
      + 外连接查询结果=内连接查询结果+主表中有而从表中没有的记录
  
  + 左外连接
  
    + ```mysql
      select b.*,bo.*
      from boys bo
      left outer join beauty b
      on b.'boyfriend_id' = bo.'id'
      where bo.'id' is null
      ```
  
    + 
  
    + left outer join左边的是主表
  
  + 右外连接
  
    + ```mysql
      select b.*,bo.*
      from boys bo
      left outer join beauty b
      on b.'boyfriend_id' = bo.'id'
      where bo.'id' is null
      ```
  
    + 
  
    + right outer  join 右边的是主表
  
    左外右外交换两个表的顺序可以达到彼此的效果
  
  + 全外连接 = 内连接的结果+表1中有但表2中没有的+表2中有但表1中没有的
  
    + ```mysql
      use girls;
      select b.*,bo.*
      from beauty b
      full outer join boys bo
      on b.'boyfriend_id' = bo.id
      ```
  
    + 
  
+ 交叉连接

  + ```mysql
    # 使用九九语法的标准
    select b.*,bo.*
    from beauty b
    cross join boys bo;
    ```

![1569314274999](C:\Users\93478\AppData\Roaming\Typora\typora-user-images\1569314274999.png)

![1569314337239](C:\Users\93478\AppData\Roaming\Typora\typora-user-images\1569314337239.png)

##### 为表取别名：

+ 提高语句的简洁度
+ 区分多个重名的字段
+ 如果为表取了别名，则查询的字段就不能使用原来的表名去限定



#### 8.1.8 子查询

##### 含义：

出现在其他语句中的select语句，称为子查询或者内查询

##### 分类：

###### 按子查询的位置分类：

+ select后面

+ from后面

+ where having后面

  + 标量子查询（结果集只有一行一列）
  + 列子查询（结果集有一列多行）
  + 行子查询（结果集有一行多列）

  1. 特点：
     + 子查询放在小括号内
     + 一般放在条件的右侧
     + 标量子查询，一般搭配着单行操作符使用 > < >= <= = <>
     + 列子查询，一般搭配着多行操作符使用 in any/some all
     + 子查询的执行优先于主查询执行，主查询的条件用到了子查询的结果



+ exists后面（相关子查询）

###### 按结果集的行列数不同分类：

+ 标量子查询（结果集只有一行一列）

+ 列子查询（结果集有一列多行）

+ 行子查询（结果集有一行多列）

+ 表子查询（结果集一般多行多列）





#### 8.1.9 分页查询

#### 8.1.10 union联合查询



### 8.2. DML（Data Manipulation Language）语言学习

#### 8.2.1. 插入语句

#### 8.2.2. 修改语句

#### 8.2.3. 删除语句



### 8.3. DDL（Data Define Language）语言学习

#### 8.3.1. 库和表的管理

#### 8.3.2. 常见数据类型介绍

#### 8.3.3. 常见约束





### 8.4. TCL语言的学习

#### 8.4.1 事务和事务处理



### 8.5. 视图的讲解



### 8.6. 存储过程和函数



### 8.7. 流程控制结构



