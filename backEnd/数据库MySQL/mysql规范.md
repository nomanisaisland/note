一、数据库命名规范
1.1 数据库命名规范
采用26个英文字母(区分大小写)和0-9的自然数(经常不需要)加上下划线'_'组成，命名简洁明确，多个单词用下划线'_'分隔,一个项目一个数据库，多个项目慎用同一个数据库
全部小写命名，禁止出现大写
禁止使用数据库关键字，如：name，time ，datetime，password等
表名称不应该取得太长（一般不超过三个英文单词）
表的名称一般使用名词或者动宾短语
用单数形式表示名称，例如，使用 employee，而不是 employees
表必须填写描述信息（使用SQL语句建表时）
数据库创建  字符集：utf8mb4、排序规则：utf8mb4_general_ci
示例：档案管理 数据库 就是 bip_archives 表名 就 archives_xxx

1.2 命名规范
模块_+功能点  示例：alllive_log   alllive_category
功能点  示例：live   message
通用表  示例：all_user
1.3 待优化命名示例
冗余
错误示例：yy_alllive_video_recomment    yy_alllive_open_close_log

说明：去除项目名，简化表名长度，去”yy_”

相同类别表命名存在差异，管理性差
错误示例：yy_all_live_category    yy_alllive_comment_user

说明：去除项目名，统一命名规则，均为”yy_alllive_”开头即可

命名格式存在差异
错误示例：yy_showfriend    yy_user_getpoints    yy_live_program_get

说明：去除项目名，统一命名规则，动宾短语分离且动宾逻辑顺序统一

二、数据库字段命名规范
2.1 字段命名规范
采用26个英文字母(区分大小写)和0-9的自然数(经常不需要)加上下划线'_'组成，命名简洁明确，多个单词用下划线'_'分隔
全部小写命名，禁止出现大写
字段必须填写描述信息
禁止使用数据库关键字，如：name，time ，datetime password 等
字段名称一般采用名词或动宾短语
采用字段的名称必须是易于理解，一般不超过三个英文单词
在命名表的列时，不要重复表的名称。例如，在名employe的表中避免使用名为employee_lastname的字段
不要在列的名称中包含数据类型
字段命名使用完整名称，禁止缩写
表中字段是另外一张表的主键，则为表名+id ，体现关联关系 示例：user_id
2.2 命名规范
名词  示例：user_id    user_name    sex
动宾短语  示例：is_friend   is_good
2.3 待优化命名示例
大小写规则不统一
错误示例：user_id    houseID

说明：使用统一规则，修改为”user_id”，”house_id”

加下划线规则不统一
错误示例：username    userid    isfriend    isgood

说明：使用下划线进行分类，提升可性，方便管理，修改为”user_name”，”user_id”，”is_friend”，”is_good”

字段表示不明确
错误示例：uid    pid

说明：使用完整名称，提高可读性，修改为”user_id”，”person_id”

 

2.4 字段类型规范
所有字段在设计时，除以下数据类型timestamp、image、datetime、smalldatetime、uniqueidentifier、binary、sql_variant、binary 、varbinary外，必须有默认值，字符型的默认值为一个空字符值串’’，数值型的默认值为数值0，逻辑型的默认值为数值0
系统中所有逻辑型中数值0表示为“假”，数值1表示为“真”，datetime、smalldatetime类型的字段没有默认值，必须为NULL
用尽量少的存储空间来存储一个字段的数据
使用int就不要使用varchar、char，

用varchar(16)就不要使varchar(256)

IP地址使用int类型

固定长度的类型最好使用char，例如：邮编(postcode)

能使用tinyint就不要使用smallint，int

最好给每个字段一个默认值，最好不能为null

用合适的字段类型节约空间
字符转化为数字(能转化的最好转化，同样节约空间、提高查询性能)

避免使用NULL字段(NULL字段很难查询优化、NULL字段的索引需要额外空间、NULL字段的复合索引无效)

少用text类型(尽量使用varchar代替text字段)

2.5 数据库中每个字段的规范描述
尽量遵守第三范式的标准（3NF） 
     表内的每一个值只能被表达一次 

     表内的每一行都应当被唯一的标示 
    
     表内不应该存储依赖于其他键的非键信息

如果字段事实上是与其它表的关键字相关联而未设计为外键引用，需建索引
如果字段与其它表的字段相关联，需建索引
如果字段需做模糊查询之外的条件查询，需建索引
除了主关键字允许建立簇索引外，其它字段所建索引必须为非簇索引
三、表设计
表必须定义主键，默认为ID，整型自增，如果不采用默认设计必须咨询DBA进行设计评估。
ID字段作为自增主键。一般所有表都要有id, id必为主键，类型为bigint unsigned，单表时自增、步长为1。一般情况下主键id和业务没关系的。
强烈建议不使用外键, 数据的完整性靠程序来保证。
多表中的相同列，必须保证列定义一致。
使用InnoDB，字符集：utf8mb4、排序规则：utf8mb4_general_ci。
一般情况下每张表都有着五个字段，追踪数据的来源和修改，并且只能逻辑删除，不能物理删除，重要！！！
/**

* 是否刪除(0否、1是)

*/

@Column(name = "is_delete")

public Integer isDelete;

/**

* 创建时间

*/

@Column(name = "gmt_create")

public Date gmtCreate;

/**

* 修改时间

*/

@Column(name = "gmt_modified")

public Date gmtModified;

/**

* 创建用户id

*/

@Column(name = "create_user_id")

public String createUserId;

/**

* 修改用户id

*/

@Column(name = "modify_user_id")

public String modifyUserId;

单表一到两年内数据量超过500w或数据容量超过10G考虑分表，且需要提前考虑历史数据迁移或应用自行删除历史数据。
单条记录大小禁止超过8k， 一方面字段不要太多，有的都能上百，甚至几百个，另一方面字段的内容不易过大，像文章内容等这种超长内容的需要单独存到另一张表。
日志类数据不建议存储在MySQL上，优先考虑Hbase或OB，如需要存储请找DBA评估使用压缩表存储。
为了提高查询效率，可以适当的数据冗余，注意是适当。
表被索引列必须定义为not null，并设置default值。
禁止使用float、double类型，建议使用decimal或者int替代。
禁止使用blob、text类型保留大文本、文件、图片，建议使用其他方式存储，MySQL只保存指针信息。
禁止使用varchar类型作为主键。
