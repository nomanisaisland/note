```shell
npm i -g ts-node   # 简化ts xxx.ts node xxx.js 的步骤  ts-node xxx.ts
```

https://www.tslang.cn/docs/handbook/interfaces.html

# 基础类型

| 数据类型   | 关键字   | 描述                                                         |
| ---------- | -------- | ------------------------------------------------------------ |
| 任意类型   | any      | 声明为 any 的变量可以赋予任意类型的值。                      |
| 数字类型   | number   | 双精度 64 位浮点值。它可以用来表示整数和分数。               |
| 字符串类型 | string   | 一个字符系列，使用单引号（**'**）或双引号（**"**）来表示字符串类型。反引号（**`**）来定义多行文本和内嵌表达式。 |
| 布尔类型   | boolean  | 表示逻辑值：true 和 false。                                  |
| 数组类型   | 无       | 声明变量为数组。在元素类型后面加上[] let arr: number[] = [1, 2];  或者使用数组泛型 let arr: Array<number> = [1, 2]; |
| 元组       | 无       | 元组类型用来表示已知元素数量和类型的数组，各元素的类型不必相同，对应位置的类型需要相同。let x: [string, number]; |
| 枚举       | enum     | 枚举类型用于定义数值集合。enum Color {Red, Green, Blue};  let c: Color = Color.Blue; |
| void       | void     | 用于标识方法返回值的类型，表示该方法没有返回值。             |
| null       | null     | 表示对象值缺失。                                             |
| undefined  | undefind | 用于初始化变量为一个未定义的值                               |
| never      | never    | never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。 |

**注意：**TypeScript 和 JavaScript 没有整数类型。

## Any 类型

任意值是 TypeScript 针对编程时类型不明确的变量使用的一种数据类型，它常用于以下三种情况。

1、变量的值会动态改变时，比如来自用户的输入，任意值类型可以让这些变量跳过编译阶段的类型检查，示例代码如下：

```
let x: any = 1;    // 数字类型
x = 'I am who I am';    // 字符串类型
x = false;    // 布尔类型
```

改写现有代码时，任意值允许在编译时可选择地包含或移除类型检查，示例代码如下：

```
let x: any = 4;
x.ifItExists();    // 正确，ifItExists方法在运行时可能存在，但这里并不会检查
x.toFixed();    // 正确
```

定义存储各种类型数据的数组时，示例代码如下：

```
let arrayList: any[] = [1, false, 'fine'];
arrayList[1] = 100;
```

------

## Null 和 Undefined

### null

在 JavaScript 中 null 表示 "什么都没有"。

null是一个只有一个值的特殊类型。表示一个空对象引用。

用 typeof 检测 null 返回是 object。

### undefined

在 JavaScript 中, undefined 是一个没有设置值的变量。

typeof 一个没有值的变量会返回 undefined。

Null 和 Undefined 是其他任何类型（包括 void）的子类型，可以赋值给其它类型，如数字类型，此时，赋值后的类型会变成 null 或 undefined。而在TypeScript中启用严格的空校验（--strictNullChecks）特性，就可以使得null 和 undefined 只能被赋值给 void 或本身对应的类型，示例代码如下：

```
// 启用 --strictNullChecks
let x: number;
x = 1; // 运行正确
x = undefined;    // 运行错误
x = null;    // 运行错误
```

上面的例子中变量 x 只能是数字类型。如果一个类型可能出现 null 或 undefined， 可以用 | 来支持多种类型，示例代码如下：

```
// 启用 --strictNullChecks
let x: number | null | undefined;
x = 1; // 运行正确
x = undefined;    // 运行正确
x = null;    // 运行正确
```

更多内容可以查看：[JavaScript typeof, null, 和 undefined](https://www.runoob.com/js/js-typeof.html)

------

## never 类型

never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。这意味着声明为 never 类型的变量只能被 never 类型所赋值，在函数中它通常表现为抛出异常或无法执行到终止点（例如无限循环），示例代码如下：

```
let x: never;
let y: number;

// 运行错误，数字类型不能转为 never 类型
x = 123;

// 运行正确，never 类型可以赋值给 never类型
x = (()=>{ throw new Error('exception')})();

// 运行正确，never 类型可以赋值给 数字类型
y = (()=>{ throw new Error('exception')})();

// 返回值为 never 的函数可以是抛出异常的情况
function error(message: string): never {
    throw new Error(message);
}

// 返回值为 never 的函数可以是无法被执行到的终止点的情况
function loop(): never {
    while (true) {}
}
```

# TypeScript 变量声明

变量是一种使用方便的占位符，用于引用计算机内存地址。

我们可以把变量看做存储数据的容器。

TypeScript 变量的命名规则：

- 变量名称可以包含数字和字母。
- 除了下划线 **_** 和美元 **$** 符号外，不能包含其他特殊字符，包括空格。
- 变量名不能以数字开头。

变量使用前必须先声明，我们可以使用 var 来声明变量。

我们可以使用以下四种方式来声明变量：

声明变量的类型及初始值：

```
var [变量名] : [类型] = 值;
```

例如：

```
var uname:string = "Runoob";
```

声明变量的类型，但没有初始值，变量值会设置为 undefined：

```
var [变量名] : [类型];
```

例如：

```
var uname:string;
```

声明变量并初始值，但不设置类型，该变量可以是任意类型：

```
var [变量名] = 值;
```

例如：

```
var uname = "Runoob";
```

声明变量没有设置类型和初始值，类型可以是任意类型，默认初始值为 undefined：

```
var [变量名];
```

例如：

```
var uname;
```

### 实例

**var** uname:string = "Runoob";
**var** score1:number = 50;
**var** score2:number = 42.50
**var** sum = score1 + score2
console.log("名字: "+uname)
console.log("第一个科目成绩: "+score1)
console.log("第二个科目成绩: "+score2)
console.log("总成绩: "+sum)

**注意：**变量不要使用 name 否则会与 DOM 中的全局 window 对象下的 name 属性出现了重名。

使用 tsc 命令编译以上代码，得到如下 JavaScript 代码：

var uname = "Runoob"; var score1 = 50; var score2 = 42.50; var sum = score1 + score2; console.log("名字: " + uname); console.log("第一个科目成绩: " + score1); console.log("第二个科目成绩: " + score2); console.log("总成绩: " + sum);

执行该 JavaScript 代码输出结果为：

```
名字: Runoob
第一个科目成绩: 50
第二个科目成绩: 42.5
总成绩: 92.5
```

TypeScript 遵循强类型，如果将不同的类型赋值给变量会编译错误，如下实例：

```
var num:number = "hello"     // 这个代码会编译错误
```

------

## 类型断言（Type Assertion）

类型断言可以用来手动指定一个值的类型，即允许变量从一种类型更改为另一种类型。

语法格式：

```
<类型>值
```

或:

```
值 as 类型
```

### 实例

var str = '1'  var str2:number = <number> <any> str   //str、str2 是 string 类型 console.log(str2)

### TypeScript 是怎么确定单个断言是否足够

当 S 类型是 T 类型的子集，或者 T 类型是 S 类型的子集时，S 能被成功断言成 S。这是为了在进行类型断言时提供额外的安全性，完全毫无根据的断言是危险的，如果你想这么做，你可以使用 any。

它之所以不被称为**类型转换**，是因为转换通常意味着某种运行时的支持。但是，类型断言纯粹是一个编译时语法，同时，它也是一种为编译器提供关于如何分析代码的方法。

编译后，以上代码会生成如下 JavaScript 代码：

var str = '1'; var str2 = str;  //str、str2 是 string 类型 console.log(str2);

执行输出结果为：

```
1
```

------

## 类型推断

当类型没有给出时，TypeScript 编译器利用类型推断来推断类型。

如果由于缺乏声明而不能推断出类型，那么它的类型被视作默认的动态 any 类型。

var num = 2;    // 类型推断为 number console.log("num 变量的值为 "+num);  num = "12";    // 编译错误 console.log(num);

- 第一行代码声明了变量 num 并=设置初始值为 2。 注意变量声明没有指定类型。因此，程序使用类型推断来确定变量的数据类型，第一次赋值为 2，**num** 设置为 number 类型。

- 第三行代码，当我们再次为变量设置字符串类型的值时，这时编译会错误。因为变量已经设置为了 number 类型。

  ```
  error TS2322: Type '"12"' is not assignable to type 'number'.
  ```

------

## 变量作用域

变量作用域指定了变量定义的位置。

程序中变量的可用性由变量作用域决定。

TypeScript 有以下几种作用域：

- **全局作用域** − 全局变量定义在程序结构的外部，它可以在你代码的任何位置使用。
- **类作用域** − 这个变量也可以称为 **字段**。类变量声明在一个类里头，但在类的方法外面。 该变量可以通过类的对象来访问。类变量也可以是静态的，静态的变量可以通过类名直接访问。
- **局部作用域** − 局部变量，局部变量只能在声明它的一个代码块（如：方法）中使用。

以下实例说明了三种作用域的使用：

var global_num = 12          // 全局变量 class Numbers {    num_val = 13;             // 实例变量   static sval = 10;         // 静态变量      storeNum():void {       var local_num = 14;    // 局部变量   }  }  console.log("全局变量为: "+global_num)   console.log(Numbers.sval)   // 静态变量 var obj = new Numbers();  console.log("实例变量: "+obj.num_val)

以上代码使用 tsc 命令编译为 JavaScript 代码为：

var global_num = 12; // 全局变量 var Numbers = /** @class */ (function () {    function Numbers() {        this.num_val = 13; // 实例变量    }    Numbers.prototype.storeNum = function () {        var local_num = 14; // 局部变量    };    Numbers.sval = 10; // 静态变量    return Numbers; }()); console.log("全局变量为: " + global_num); console.log(Numbers.sval); // 静态变量 var obj = new Numbers(); console.log("实例变量: " + obj.num_val);

执行以上 JavaScript 代码，输出结果为：

```
全局变量为: 12
10
实例变量: 13
```

如果我们在方法外部调用局部变量 local_num，会报错：

```
error TS2322: Could not find symbol 'local_num'.
```

# TypeScript 运算符

运算符用于执行程序代码运算，会针对一个以上操作数项目来进行运算。

考虑以下计算：

```
7 + 5 = 12
```

以上实例中 7、5 和 12 是操作数。

运算符 **+** 用于加值。

运算符 **=** 用于赋值。

TypeScript 主要包含以下几种运算：

- 算术运算符
- 逻辑运算符
- 关系运算符
- 按位运算符
- 赋值运算符
- 三元/条件运算符
- 字符串运算符
- 类型运算符

------

## 算术运算符

假定 **y=5**，下面的表格解释了这些算术运算符的操作：

| 运算符 | 描述         | 例子  | x 运算结果 | y 运算结果 |
| :----- | :----------- | :---- | :--------- | :--------- |
| +      | 加法         | x=y+2 | 7          | 5          |
| -      | 减法         | x=y-2 | 3          | 5          |
| *      | 乘法         | x=y*2 | 10         | 5          |
| /      | 除法         | x=y/2 | 2.5        | 5          |
| %      | 取模（余数） | x=y%2 | 1          | 5          |
| ++     | 自增         | x=++y | 6          | 6          |
| x=y++  | 5            | 6     |            |            |
| --     | 自减         | x=--y | 4          | 4          |
| x=y--  | 5            | 4     |            |            |

### 实例

**var** num1:number = 10
**var** num2:number = 2
**var** res:number = 0
  
res = num1 + num2
console.log("加:     "+res);

res = num1 - num2;
console.log("减: "+res)

res = num1*num2
console.log("乘:   "+res)

res = num1/num2
console.log("除:  "+res)
  
res = num1%num2
console.log("余数:  "+res)

num1++
console.log("num1 自增运算: "+num1)

num2--
console.log("num2 自减运算: "+num2)

使用 **tsc** 命令编译以上代码得到如下 JavaScript 代码：

var num1 = 10; var num2 = 2; var res = 0; res = num1 + num2; console.log("加:        " + res); res = num1 - num2; console.log("减: " + res); res = num1 * num2; console.log("乘:    " + res); res = num1 / num2; console.log("除:   " + res); res = num1 % num2; console.log("余数:   " + res); num1++; console.log("num1 自增运算: " + num1); num2--; console.log("num2 自减运算: " + num2);

执行以上 JavaScript 代码，输出结果为：

```
加:        12
减: 8
乘:    20
除:   5
余数:   0
num1 自增运算: 11
num2 自减运算: 1
```

------

## 关系运算符

关系运算符用于计算结果是否为 true 或者 false。

x=5，下面的表格解释了关系运算符的操作：

| 运算符 | 描述       | 比较 | 返回值  |
| :----- | :--------- | :--- | :------ |
| ==     | 等于       | x==8 | *false* |
| x==5   | *true*     |      |         |
| !=     | 不等于     | x!=8 | *true*  |
| >      | 大于       | x>8  | *false* |
| <      | 小于       | x<8  | *true*  |
| >=     | 大于或等于 | x>=8 | *false* |
| <=     | 小于或等于 | x<=8 | *true*  |

### 实例

var num1:number = 5; var num2:number = 9;  console.log("num1 的值为: "+num1);  console.log("num2 的值为:"+num2);  var res = num1>num2  console.log("num1 大于n num2: "+res)  res = num1<num2  console.log("num1 小于 num2: "+res)    res = num1>=num2  console.log("num1 大于或等于  num2: "+res)  res = num1<=num2 console.log("num1 小于或等于 num2: "+res)    res = num1==num2  console.log("num1 等于 num2: "+res)    res = num1!=num2   console.log("num1 不等于 num2: "+res)

使用 **tsc** 命令编译以上代码得到如下 JavaScript 代码：

var num1 = 5; var num2 = 9; console.log("num1 的值为: " + num1); console.log("num2 的值为:" + num2); var res = num1 > num2; console.log("num1 大于n num2: " + res); res = num1 < num2; console.log("num1 小于 num2: " + res); res = num1 >= num2; console.log("num1 大于或等于  num2: " + res); res = num1 <= num2; console.log("num1 小于或等于 num2: " + res); res = num1 == num2; console.log("num1 等于 num2: " + res); res = num1 != num2; console.log("num1 不等于 num2: " + res);

执行以上 JavaScript 代码，输出结果为：

```
num1 的值为: 5
num2 的值为:9
num1 大于n num2: false
num1 小于 num2: true
num1 大于或等于  num2: false
num1 小于或等于 num2: true
num1 等于 num2: false
num1 不等于 num2: true
```

------

------

## 逻辑运算符

逻辑运算符用于测定变量或值之间的逻辑。

给定 x=6 以及 y=3，下表解释了逻辑运算符：

| 运算符 | 描述 | 例子                      |
| :----- | :--- | :------------------------ |
| &&     | and  | (x < 10 && y > 1) 为 true |
| \|\|   | or   | (x==5 \|\| y==5) 为 false |
| !      | not  | !(x==y) 为 true           |

### 实例

var avg:number = 20;  var percentage:number = 90;   console.log("avg 值为: "+avg+" ,percentage 值为: "+percentage);     var res:boolean = ((avg>50)&&(percentage>80));  console.log("(avg>50)&&(percentage>80): ",res);  var res:boolean = ((avg>50)||(percentage>80));  console.log("(avg>50)||(percentage>80): ",res);  var res:boolean=!((avg>50)&&(percentage>80));  console.log("!((avg>50)&&(percentage>80)): ",res);

使用 **tsc** 命令编译以上代码得到如下 JavaScript 代码：

var avg = 20; var percentage = 90; console.log("avg 值为: " + avg + " ,percentage 值为: " + percentage); var res = ((avg > 50) && (percentage > 80)); console.log("(avg>50)&&(percentage>80): ", res); var res = ((avg > 50) || (percentage > 80)); console.log("(avg>50)||(percentage>80): ", res); var res = !((avg > 50) && (percentage > 80)); console.log("!((avg>50)&&(percentage>80)): ", res);

执行以上 JavaScript 代码，输出结果为：

```
avg 值为: 20 ,percentage 值为: 90
(avg>50)&&(percentage>80):  false
(avg>50)||(percentage>80):  true
!((avg>50)&&(percentage>80)):  true
```

### 短路运算符(&& 与 ||)

&& 与 || 运算符可用于组合表达式。 && 运算符只有在左右两个表达式都为 true 时才返回 true。

考虑以下实例：

```
var a = 10 
var result = ( a<10 && a>5)
```

以上实例中 a < 10 与 a > 5 是使用了 && 运算符的组合表达式，第一个表达式返回了 false，由于 && 运算需要两个表达式都为 true，所以如果第一个为 false，就不再执行后面的判断(a > 5 跳过计算)，直接返回 false。

|| 运算符只要其中一个表达式为 true ，则该组合表达式就会返回 true。

考虑以下实例：

```
var a = 10 
var result = ( a>5 || a<10)
```

以上实例中 a > 5 与 a < 10 是使用了 || 运算符的组合表达式，第一个表达式返回了 true，由于 || 组合运算只需要一个表达式为 true，所以如果第一个为 true，就不再执行后面的判断(a < 10 跳过计算)，直接返回 true。

------

## 位运算符

位操作是程序设计中对位模式按位或二进制数的一元和二元操作。



| 运算符 | 描述                                                         | 例子        | 类似于       | 结果 | 十进制 |
| :----- | :----------------------------------------------------------- | :---------- | :----------- | :--- | :----- |
| &      | AND，按位与处理两个长度相同的二进制数，两个相应的二进位都为 1，该位的结果值才为 1，否则为 0。 | x = 5 & 1   | 0101 & 0001  | 0001 | 1      |
| \|     | OR，按位或处理两个长度相同的二进制数，两个相应的二进位中只要有一个为 1，该位的结果值为 1。 | x = 5 \| 1  | 0101 \| 0001 | 0101 | 5      |
| ~      | 取反，取反是一元运算符，对一个二进制数的每一位执行逻辑反操作。使数字 1 成为 0，0 成为 1。 | x = ~ 5     | ~0101        | 1010 | -6     |
| ^      | 异或，按位异或运算，对等长二进制模式按位或二进制数的每一位执行逻辑异按位或操作。操作的结果是如果某位不同则该位为 1，否则该位为 0。 | x = 5 ^ 1   | 0101 ^ 0001  | 0100 | 4      |
| <<     | 左移，把 << 左边的运算数的各二进位全部左移若干位，由 << 右边的数指定移动的位数，高位丢弃，低位补 0。 | x = 5 << 1  | 0101 << 1    | 1010 | 10     |
| >>     | 右移，把 >> 左边的运算数的各二进位全部右移若干位，>> 右边的数指定移动的位数。 | x = 5 >> 1  | 0101 >> 1    | 0010 | 2      |
| >>>    | 无符号右移，与有符号右移位类似，除了左边一律使用0 补位。     | x = 2 >>> 1 | 0010 >>> 1   | 0001 | 1      |

### 实例

var a:number = 2;   // 二进制 10  var b:number = 3;   // 二进制 11     var result;          result = (a & b);      console.log("(a & b) => ",result)             result = (a | b);           console.log("(a | b) => ",result)           result = (a ^ b);   console.log("(a ^ b) => ",result);     result = (~b);  console.log("(~b) => ",result);  result = (a << b);  console.log("(a << b) => ",result);   result = (a >> b);  console.log("(a >> b) => ",result);  result = (a >>> 1);  console.log("(a >>> 1) => ",result);

使用 **tsc** 命令编译以上代码得到如下 JavaScript 代码：

var a = 2; // 二进制 10  var b = 3; // 二进制 11 var result; result = (a & b); console.log("(a & b) => ", result); result = (a | b); console.log("(a | b) => ", result); result = (a ^ b); console.log("(a ^ b) => ", result); result = (~b); console.log("(~b) => ", result); result = (a << b); console.log("(a << b) => ", result); result = (a >> b); console.log("(a >> b) => ", result); result = (a >>> 1); console.log("(a >>> 1) => ", result);

执行以上 JavaScript 代码，输出结果为：

```
(a & b) =>  2
(a | b) =>  3
(a ^ b) =>  1
(~b) =>  -4
(a << b) =>  16
(a >> b) =>  0
(a >>> 1) =>  1
```

------

## 赋值运算符

赋值运算符用于给变量赋值。

给定 **x=10** 和 **y=5**，下面的表格解释了赋值运算符：

| 运算符                  | 例子   | 实例      | x 值   |
| :---------------------- | :----- | :-------- | :----- |
| = (赋值)                | x = y  | x = y     | x = 5  |
| += (先进行加运算后赋值) | x += y | x = x + y | x = 15 |
| -= (先进行减运算后赋值) | x -= y | x = x - y | x = 5  |
| *= (先进行乘运算后赋值) | x *= y | x = x * y | x = 50 |
| /= (先进行除运算后赋值) | x /= y | x = x / y | x = 2  |



类似的逻辑运算符也可以与赋值运算符联合使用：<<=, >>=, >>=, &=, |= 与 ^=。



### 实例

var a: number = 12  var b:number = 10    a = b  console.log("a = b: "+a)  a += b console.log("a+=b: "+a)  a -= b  console.log("a-=b: "+a)  a *= b  console.log("a*=b: "+a)  a /= b  console.log("a/=b: "+a)      a %= b  console.log("a%=b: "+a)

使用 **tsc** 命令编译以上代码得到如下 JavaScript 代码：

var a = 12; var b = 10; a = b; console.log("a = b: " + a); a += b; console.log("a+=b: " + a); a -= b; console.log("a-=b: " + a); a *= b; console.log("a*=b: " + a); a /= b; console.log("a/=b: " + a); a %= b; console.log("a%=b: " + a);

执行以上 JavaScript 代码，输出结果为：

```
a = b: 10
a+=b: 20
a-=b: 10
a*=b: 100
a/=b: 10
a%=b: 0
```

------

## 三元运算符 (?)

三元运算有 3 个操作数，并且需要判断布尔表达式的值。该运算符的主要是决定哪个值应该赋值给变量。

```
Test ? expr1 : expr2
```

- Test − 指定的条件语句
- expr1 − 如果条件语句 Test 返回 true 则返回该值
- expr2 − 如果条件语句 Test 返回 false 则返回该值

让我们看下以下实例：

var num:number = -2  var result = num > 0 ? "大于 0" : "小于 0，或等于 0"  console.log(result)

实例中用于判断变量是否大于 0。

使用 tsc 命令编译以上代码得到如下 JavaScript 代码：

var num = -2; var result = num > 0 ? "大于 0" : "小于 0，或等于 0"; console.log(result);

以上实例输出结果如下：

```
小于 0，或等于 0
```

------

## 类型运算符

### typeof 运算符

typeof 是一元运算符，返回操作数的数据类型。

查看以下实例:

var num = 12  console.log(typeof num);   //输出结果: number

使用 tsc 命令编译以上代码得到如下 JavaScript 代码：

var num = 12; console.log(typeof num); //输出结果: number

以上实例输出结果如下：

```
number
```

### instanceof

instanceof 运算符用于判断对象是否为指定的类型，后面章节我们会具体介绍它。

------

## 其他运算符

### 负号运算符(-)

更改操作数的符号，查看以下实例：

var x:number = 4  var y = -x;  console.log("x 值为: ",x);   // 输出结果 4  console.log("y 值为: ",y);   // 输出结果 -4

使用 tsc 命令编译以上代码得到如下 JavaScript 代码：

var x = 4; var y = -x; console.log("x 值为: ", x); // 输出结果 4  console.log("y 值为: ", y); // 输出结果 -4

以上实例输出结果如下：

```
x 值为:  4
y 值为:  -4
```

### 字符串运算符: 连接运算符 (+)

\+ 运算符可以拼接两个字符串，查看以下实例：

var msg:string = "RUNOOB"+".COM"  console.log(msg)

使用 tsc 命令编译以上代码得到如下 JavaScript 代码：

var msg = "RUNOOB" + ".COM"; console.log(msg);

以上实例输出结果如下：

```
RUNOOB.COM
```

# TypeScript 条件语句

------

条件语句用于基于不同的条件来执行不同的动作。

TypeScript 条件语句是通过一条或多条语句的执行结果（True 或 False）来决定执行的代码块。

可以通过下图来简单了解条件语句的执行过程:



![img](https://www.runoob.com/wp-content/uploads/2016/06/decision_making.jpg)

------

## 条件语句

通常在写代码时，您总是需要为不同的决定来执行不同的动作。您可以在代码中使用条件语句来完成该任务。

在 TypeScript 中，我们可使用以下条件语句：

- **if 语句** - 只有当指定条件为 true 时，使用该语句来执行代码
- **if...else 语句** - 当条件为 true 时执行代码，当条件为 false 时执行其他代码
- **if...else if....else 语句**- 使用该语句来选择多个代码块之一来执行
- **switch 语句** - 使用该语句来选择多个代码块之一来执行

------

## if 语句

TypeScript if 语句由一个布尔表达式后跟一个或多个语句组成。

### 语法

语法格式如下所示：

```
if(boolean_expression){
    # 在布尔表达式 boolean_expression 为 true 执行
}
```

如果布尔表达式 boolean_expression为 true，则 if 语句内的代码块将被执行。如果布尔表达式为 false，则 if 语句结束后的第一组代码（闭括号后）将被执行。

### 流程图

![Perl 中的 if 语句](https://www.runoob.com/wp-content/uploads/2014/09/if_statement.jpg)

### 实例

var  num:number = 5 if (num > 0) {    console.log("数字是正数")  }

编译以上代码得到如下 JavaScript 代码：

var num = 5; if (num > 0) {    console.log("数字是正数"); }

执行以上 JavaScript 代码，输出结果为：

```
数字是正数
```

------

## if...else 语句

一个 if 语句后可跟一个可选的 else 语句，else 语句在布尔表达式为 false 时执行。

### 语法

语法格式如下所示：

```
if(boolean_expression){
   # 在布尔表达式 boolean_expression 为 true 执行
}else{
   # 在布尔表达式 boolean_expression 为 false 执行
}
```

如果布尔表达式 boolean_expression 为 true，则执行 if 块内的代码。如果布尔表达式为 false，则执行 else 块内的代码。

### 流程图

![img](https://www.runoob.com/wp-content/uploads/2014/09/if_else_statement.jpg)

### 实例

## TypeScript

var num:number = 12;  if (num % 2==0) {     console.log("偶数");  } else {    console.log("奇数");  }

编译以上代码得到如下 JavaScript 代码：

## JavaScript

var num = 12; if (num % 2 == 0) {    console.log("偶数"); } else {    console.log("奇数"); }

执行以上 JavaScript 代码，输出结果为：

```
偶数
```

------

## if...else if....else 语句

if...else if....else 语句在执行多个判断条件的时候很有用。

### 语法

语法格式如下所示：

```
if(boolean_expression 1){
    # 在布尔表达式 boolean_expression 1 为 true 执行
}
else if( boolean_expression 2){
    # 在布尔表达式 boolean_expression 2 为 true 执行
}
else if(( boolean_expression 3){
    # 在布尔表达式 boolean_expression 3 为 true 执行
}
else{
    # 布尔表达式的条件都为 false 时执行
}
```

需要注意以下几点：

- 一个 **if** 判断语句可以有 0 或 1 个 **else** 语句，她必需在 **else..if** 语句后面。
- 一个 **if** 判断语句可以有 0 或多个 **else..if**，这些语句必需在 **else** 之前。
- 一旦执行了 **else..if** 内的代码，后面的 **else..if** 或 **else** 将不再执行。



### 实例

## TypeScript

var num:number = 2  if(num > 0) {     console.log(num+" 是正数")  } else if(num < 0) {     console.log(num+" 是负数")  } else {     console.log(num+" 不是正数也不是负数")  }

编译以上代码得到如下 JavaScript 代码：

## JavaScript

var num = 2; if (num > 0) {    console.log(num + " 是正数"); } else if (num < 0) {    console.log(num + " 是负数"); } else {    console.log(num + " 不是正数也不是负数"); }

执行以上 JavaScript 代码，输出结果为：

```
2 是正数
```

------

## switch…case 语句

一个 **switch** 语句允许测试一个变量等于多个值时的情况。每个值称为一个 case，且被测试的变量会对每个 **switch case** 进行检查。

**switch** 语句的语法：

switch(expression){    case constant-expression  :       statement(s);       break; /* 可选的 */    case constant-expression  :       statement(s);       break; /* 可选的 */      /* 您可以有任意数量的 case 语句 */    default : /* 可选的 */       statement(s); }

**switch** 语句必须遵循下面的规则：

- **switch** 语句中的 **expression** 是一个常量表达式，必须是一个整型或枚举类型。
- 在一个 switch 中可以有任意数量的 case 语句。每个 case 后跟一个要比较的值和一个冒号。
- case 的 **constant-expression** 必须与 switch 中的变量具有相同的数据类型，且必须是一个常量或字面量。
- 当被测试的变量等于 case 中的常量时，case 后跟的语句将被执行，直到遇到 **break** 语句为止。
- 当遇到 **break** 语句时，switch 终止，控制流将跳转到 switch 语句后的下一行。
- 不是每一个 case 都需要包含 **break**。如果 case 语句不包含 **break**，控制流将会 *继续* 后续的 case，直到遇到 break 为止。
- 一个 **switch** 语句可以有一个可选的 **default** case，出现在 switch 的结尾。default case 可用于在上面所有 case 都不为真时执行一个任务。default case 中的 **break** 语句不是必需的。

## 流程图

![C 中的 switch 语句](https://www.runoob.com/wp-content/uploads/2014/09/switch_statement.jpg)

### 实例

## TypeScript

var grade:string = "A";  switch(grade) {     case "A": {         console.log("优");         break;     }     case "B": {         console.log("良");         break;     }     case "C": {        console.log("及格");         break;        }     case "D": {         console.log("不及格");         break;     }      default: {         console.log("非法输入");         break;                  }  }

编译以上代码得到如下 JavaScript 代码：

## JavaScript

var grade = "A"; switch (grade) {    case "A": {        console.log("优");        break;    }    case "B": {        console.log("良");        break;    }    case "C": {        console.log("及格");        break;    }    case "D": {        console.log("不及格");        break;    }    default: {        console.log("非法输入");        break;    } }

执行以上 JavaScript 代码，输出结果为：





# TypeScript 循环

有的时候，我们可能需要多次执行同一块代码。一般情况下，语句是按顺序执行的：函数中的第一个语句先执行，接着是第二个语句，依此类推。

编程语言提供了更为复杂执行路径的多种控制结构。

循环语句允许我们多次执行一个语句或语句组，下面是大多数编程语言中循环语句的流程图：

![循环结构](https://www.runoob.com/wp-content/uploads/2015/12/loop.png)

------

## for 循环

TypeScript for 循环用于多次执行一个语句序列，简化管理循环变量的代码。

### 语法

语法格式如下所示：

```
for ( init; condition; increment ){
    statement(s);
}
```

下面是 for 循环的控制流程解析：

1. **init** 会首先被执行，且只会执行一次。这一步允许您声明并初始化任何循环控制变量。您也可以不在这里写任何语句，只要有一个分号出现即可。
2. 接下来，会判断 **condition**。如果为 true，则执行循环主体。如果为 false，则不执行循环主体，且控制流会跳转到紧接着 for 循环的下一条语句。
3. 在执行完 for 循环主体后，控制流会跳回上面的 **increment** 语句。该语句允许您更新循环控制变量。该语句可以留空，只要在条件后有一个分号出现即可。
4. 条件再次被判断。如果为 true，则执行循环，这个过程会不断重复（循环主体，然后增加步值，再然后重新判断条件）。在条件变为 false 时，for 循环终止。

在这里，statement(s) 可以是一个单独的语句，也可以是几个语句组成的代码块。

condition 可以是任意的表达式，当条件为 true 时执行循环，当条件为 false 时，退出循环。

### 流程图

![Perl 中的 for 循环](https://www.runoob.com/wp-content/uploads/2014/09/cpp_for_loop.png)

### 实例

以下实例计算 5 的阶乘， for 循环生成从 5 到 1 的数字，并计算每次循环数字的乘积。

## TypeScript

var num:number = 5;  var i:number;  var factorial = 1;   for(i = num;i>=1;i--) {   factorial *= i; } console.log(factorial)

编译以上代码得到如下 JavaScript 代码：

## JavaScript

var num = 5; var i; var factorial = 1; for (i = num; i >= 1; i--) {    factorial *= i; } console.log(factorial);

执行以上 JavaScript 代码，输出结果为：

```
120
```

------

## for...in 循环

for...in 语句用于一组值的集合或列表进行迭代输出。

### 语法

语法格式如下所示：

```
for (var val in list) { 
    //语句 
}
```

val 需要为 string 或 any 类型。

### 实例

## TypeScript

var j:any;  var n:any = "a b c"   for(j in n) {    console.log(n[j])   }

编译以上代码得到如下 JavaScript 代码：

## JavaScript

var j; var n = "a b c"; for (j in n) {    console.log(n[j]); }

执行以上 JavaScript 代码，输出结果为：

```
a

b

c
```

------

## 

## for…of 、forEach、every 和 some 循环

此外，TypeScript 还支持 for…of 、forEach、every 和 some 循环。

for...of 语句创建一个循环来迭代可迭代的对象。在 ES6 中引入的 for...of 循环，以替代 for...in 和 forEach() ，并支持新的迭代协议。for...of 允许你遍历 Arrays（数组）, Strings（字符串）, Maps（映射）, Sets（集合）等可迭代的数据结构等。

## TypeScript for...of 循环

let someArray = [1, "string", false];  for (let entry of someArray) {    console.log(entry); // 1, "string", false }

forEach、every 和 some 是 JavaScript 的循环语法，TypeScript 作为 JavaScript 的语法超集，当然默认也是支持的。

因为 forEach 在 iteration 中是无法返回的，所以可以使用 every 和 some 来取代 forEach。

## TypeScript forEach 循环

let list = [4, 5, 6]; list.forEach((val, idx, array) => {    // val: 当前值    // idx：当前index    // array: Array });

## TypeScript every 循环

let list = [4, 5, 6]; list.every((val, idx, array) => {    // val: 当前值    // idx：当前index    // array: Array    return true; // Continues    // Return false will quit the iteration });

------

## while 循环

while 语句在给定条件为 true 时，重复执行语句或语句组。循环主体执行之前会先测试条件。

### 语法

语法格式如下所示：

```
while(condition)
{
   statement(s);
}
```

在这里，statement(s) 可以是一个单独的语句，也可以是几个语句组成的代码块。

condition 可以是任意的表达式，当条件为 true 时执行循环。 当条件为 false 时，程序流将退出循环。

### 流程图

![img](https://www.runoob.com/wp-content/uploads/2014/09/cpp_while_loop.png)

图表中，*while* 循环的关键点是循环可能一次都不会执行。当条件为 false 时，会跳过循环主体，直接执行紧接着 while 循环的下一条语句。

### 实例

## TypeScript

var num:number = 5;  var factorial:number = 1;   while(num >=1) {     factorial = factorial * num;     num--;  }  console.log("5 的阶乘为："+factorial);

编译以上代码得到如下 JavaScript 代码：

## JavaScript

var num = 5; var factorial = 1; while (num >= 1) {    factorial = factorial * num;    num--; } console.log("5 的阶乘为：" + factorial);

执行以上 JavaScript 代码，输出结果为：

```
5 的阶乘为：120
```

------

## do...while 循环

不像 **for** 和 **while** 循环，它们是在循环头部测试循环条件。**do...while** 循环是在循环的尾部检查它的条件。

### 语法

语法格式如下所示：

```
do
{
   statement(s);
}while( condition );
```

请注意，条件表达式出现在循环的尾部，所以循环中的 statement(s) 会在条件被测试之前至少执行一次。

如果条件为 true，控制流会跳转回上面的 do，然后重新执行循环中的 statement(s)。这个过程会不断重复，直到给定条件变为 false 为止。

### 流程图

![Perl 中的 do...while 循环](https://www.runoob.com/wp-content/uploads/2014/09/cpp_do_while_loop.jpg)

### 实例

## TypeScript

var n:number = 10; do {     console.log(n);     n--;  } while(n>=0);

编译以上代码得到如下 JavaScript 代码：

## JavaScript

var num = 5; var n = 10; do {    console.log(n);    n--; } while (n >= 0);

执行以上 JavaScript 代码，输出结果为：

```
10
9
8
7
6
5
4
3
2
1
0
```

------

## break 语句

**break** 语句有以下两种用法：

1. 当 **break** 语句出现在一个循环内时，循环会立即终止，且程序流将继续执行紧接着循环的下一条语句。
2. 它可用于终止 **switch** 语句中的一个 case。

如果您使用的是嵌套循环（即一个循环内嵌套另一个循环），break 语句会停止执行最内层的循环，然后开始执行该块之后的下一行代码。

### 语法

语法格式如下所示：

```
break;
```

### 流程图

![img](https://www.runoob.com/wp-content/uploads/2014/09/cpp_break_statement.jpg)

### 实例

## TypeScript

var i:number = 1  while(i<=10) {     if (i % 5 == 0) {           console.log ("在 1~10 之间第一个被 5 整除的数为 : "+i)         break     // 找到一个后退出循环    }     i++  }  // 输出 5 然后程序执行结束

编译以上代码得到如下 JavaScript 代码：

## JavaScript

var i = 1; while (i <= 10) {    if (i % 5 == 0) {        console.log("在 1~10 之间第一个被 5 整除的数为 : " + i);        break; // 找到一个后退出循环    }    i++; } // 输出 5 然后程序执行结束

执行以上 JavaScript 代码，输出结果为：

```
在 1~10 之间第一个被 5 整除的数为 : 5
```

------

## continue 语句

**continue** 语句有点像 **break** 语句。但它不是强制终止，continue 会跳过当前循环中的代码，强迫开始下一次循环。

对于 **for** 循环，**continue** 语句执行后自增语句仍然会执行。对于 **while** 和 **do...while** 循环，**continue** 语句重新执行条件判断语句。

### 语法

语法格式如下所示：

```
continue;
```

### 流程图

![C continue 语句](https://www.runoob.com/wp-content/uploads/2014/09/cpp_continue_statement.jpg)

### 实例

## TypeScript

var num:number = 0 var count:number = 0;  for(num=0;num<=20;num++) {    if (num % 2==0) {        continue    }    count++ } console.log ("0 ~20 之间的奇数个数为: "+count)    //输出10个偶数

编译以上代码得到如下 JavaScript 代码：

## JavaScript

var num = 0; var count = 0; for (num = 0; num <= 20; num++) {    if (num % 2 == 0) {        continue;    }    count++; } console.log("0 ~20 之间的奇数个数为: " + count); //输出 10

执行以上 JavaScript 代码，输出结果为：

```
0 ~20 之间的奇数个数为: 10
```

------

## 无限循环

无限循环就是一直在运行不会停止的循环。 for 和 while 循环都可以创建无限循环。

for 创建无限循环语法格式：

```
for(;;) { 
   // 语句
}
```

实例

```
for(;;) { 
   console.log("这段代码会不停的执行") 
}
```

while 创建无限循环语法格式：

```
while(true) { 
   // 语句
} 
```

实例

```
while(true) { 
   console.log("这段代码会不停的执行") 
}
```

# TypeScript 函数

函数是一组一起执行一个任务的语句。

您可以把代码划分到不同的函数中。如何划分代码到不同的函数中是由您来决定的，但在逻辑上，划分通常是根据每个函数执行一个特定的任务来进行的。

函数声明告诉编译器函数的名称、返回类型和参数。函数定义提供了函数的实际主体。

------

## 函数定义

函数就是包裹在花括号中的代码块，前面使用了关键词 function：

语法格式如下所示：

```
function function_name()
{
    // 执行代码
}
```

### 实例

## TypeScript

function () {       // 函数定义    console.log("调用函数")  }

------

## 调用函数

函数只有通过调用才可以执行函数内的代码。

语法格式如下所示：

```
function_name()
```

### 实例

## TypeScript

function test() {   // 函数定义    console.log("调用函数")  }  test()              // 调用函数

------

## 函数返回值

有时，我们会希望函数将执行的结果返回到调用它的地方。

通过使用 return 语句就可以实现。

在使用 return 语句时，函数会停止执行，并返回指定的值。

语法格式如下所示：

```
function function_name():return_type { 
    // 语句
    return value; 
}
```

- return_type 是返回值的类型。
- return 关键词后跟着要返回的结果。
- 一个函数只能有一个 return 语句。
- 返回值的类型需要与函数定义的返回类型(return_type)一致。

### 实例

## TypeScript

// 函数定义 function greet():string { // 返回一个字符串    return "Hello World"  }   function caller() {     var msg = greet() // 调用 greet() 函数     console.log(msg)  }   // 调用函数 caller()

- 实例中定义了函数 *greet()*，返回值的类型为 string。
- *greet()* 函数通过 return 语句返回给调用它的地方，即变量 msg，之后输出该返回值。。

编译以上代码，得到以下 JavaScript 代码：

## JavaScript

// 函数定义 function greet() {    return "Hello World"; } function caller() {    var msg = greet(); // 调用 greet() 函数     console.log(msg); } // 调用函数 caller();

------

## 带参数函数

在调用函数时，您可以向其传递值，这些值被称为参数。

这些参数可以在函数中使用。

您可以向函数发送多个参数，每个参数使用逗号 **,** 分隔：

语法格式如下所示：

```
function func_name( param1 [:datatype], param2 [:datatype]) {   
}
```

- param1、param2 为参数名。
- datatype 为参数类型。

### 实例

## TypeScript

function add(x: number, y: number): number {    return x + y; } console.log(add(1,2))

- 实例中定义了函数 *add()*，返回值的类型为 number。
- *add()* 函数中定义了两个 number 类型的参数，函数内将两个参数相加并返回。

编译以上代码，得到以下 JavaScript 代码：

## JavaScript

function add(x, y) {    return x + y; } console.log(add(1, 2));

输出结果为：

```
3
```

------

## 可选参数和默认参数

### 可选参数

在 TypeScript 函数里，如果我们定义了参数，则我们必须传入这些参数，除非将这些参数设置为可选，可选参数使用问号标识 ？。

**实例**

## TypeScript

function buildName(firstName: string, lastName: string) {    return firstName + " " + lastName; }  let result1 = buildName("Bob");                  // 错误，缺少参数 let result2 = buildName("Bob", "Adams", "Sr.");  // 错误，参数太多了 let result3 = buildName("Bob", "Adams");         // 正确

以下实例，我么将 lastName 设置为可选参数：

## TypeScript

function buildName(firstName: string, lastName?: string) {    if (lastName)        return firstName + " " + lastName;    else        return firstName; }  let result1 = buildName("Bob");  // 正确 let result2 = buildName("Bob", "Adams", "Sr.");  // 错误，参数太多了 let result3 = buildName("Bob", "Adams");  // 正确

可选参数必须跟在必需参数后面。 如果上例我们想让 firstName 是可选的，lastName 必选，那么就要调整它们的位置，把 firstName 放在后面。

如果都是可选参数就没关系。

### 默认参数

我们也可以设置参数的默认值，这样在调用函数的时候，如果不传入该参数的值，则使用默认参数，语法格式为：

```
function function_name(param1[:type],param2[:type] = default_value) { 
}
```

注意：参数不能同时设置为可选和默认。



**实例**

以下实例函数的参数 rate 设置了默认值为 0.50，调用该函数时如果未传入参数则使用该默认值：

## TypeScript

function calculate_discount(price:number,rate:number = 0.50) {     var discount = price * rate;     console.log("计算结果: ",discount);  }  calculate_discount(1000)  calculate_discount(1000,0.30)

编译以上代码，得到以下 JavaScript 代码：

## JavaScript

function calculate_discount(price, rate) {    if (rate === void 0) { rate = 0.50; }    var discount = price * rate;    console.log("计算结果: ", discount); } calculate_discount(1000); calculate_discount(1000, 0.30);

输出结果为：

```
计算结果:  500
计算结果:  300
```

------

## 剩余参数

有一种情况，我们不知道要向函数传入多少个参数，这时候我们就可以使用剩余参数来定义。

剩余参数语法允许我们将一个不确定数量的参数作为一个数组传入。

## TypeScript

function buildName(firstName: string, ...restOfName: string[]) {    return firstName + " " + restOfName.join(" "); }   let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");

函数的最后一个命名参数 restOfName 以 ... 为前缀，它将成为一个由剩余参数组成的数组，索引值从0（包括）到 restOfName.length（不包括）。

## TypeScript

function addNumbers(...nums:number[]) {      var i;       var sum:number = 0;         for(i = 0;i<nums.length;i++) {        sum = sum + nums[i];     }     console.log("和为：",sum)  }  addNumbers(1,2,3)  addNumbers(10,10,10,10,10)

编译以上代码，得到以下 JavaScript 代码：

## JavaScript

function addNumbers() {    var nums = [];    for (var _i = 0; _i < arguments.length; _i++) {        nums[_i] = arguments[_i];    }    var i;    var sum = 0;    for (i = 0; i < nums.length; i++) {        sum = sum + nums[i];    }    console.log("和为：", sum); } addNumbers(1, 2, 3); addNumbers(10, 10, 10, 10, 10);

输出结果为：

```
和为： 6
和为： 50
```

------

## 匿名函数

匿名函数是一个没有函数名的函数。

匿名函数在程序运行时动态声明，除了没有函数名外，其他的与标准函数一样。

我们可以将匿名函数赋值给一个变量，这种表达式就成为函数表达式。

语法格式如下：

```
var res = function( [arguments] ) { ... }
```

### 实例

不带参数匿名函数：

## TypeScript

var msg = function() {     return "hello world";   }  console.log(msg())

编译以上代码，得到以下 JavaScript 代码：

## JavaScript

var msg = function () {    return "hello world"; }; console.log(msg());

输出结果为：

```
hello world
```

带参数匿名函数：

## TypeScript

var res = function(a:number,b:number) {     return a*b;   };  console.log(res(12,2))

编译以上代码，得到以下 JavaScript 代码：

## JavaScript

var res = function (a, b) {    return a * b; }; console.log(res(12, 2));

输出结果为：

```
24
```

### 匿名函数自调用

匿名函数自调用在函数后使用 () 即可：

## TypeScript

(function () {     var x = "Hello!!";       console.log(x)      })()

编译以上代码，得到以下 JavaScript 代码：

## JavaScript

(function () {     var x = "Hello!!";       console.log(x)     })()

输出结果为：

```
Hello!!
```

------

## 构造函数

TypeScript 也支持使用 JavaScript 内置的构造函数 Function() 来定义函数：

语法格式如下：

```
var res = new Function ([arg1[, arg2[, ...argN]],] functionBody)
```

参数说明：

- **arg1, arg2, ... argN**：参数列表。
- **functionBody**：一个含有包括函数定义的 JavaScript 语句的字符串。

### 实例

## TypeScript

var myFunction = new Function("a", "b", "return a * b");  var x = myFunction(4, 3);  console.log(x);

编译以上代码，得到以下 JavaScript 代码：

## JavaScript

var myFunction = new Function("a", "b", "return a * b");  var x = myFunction(4, 3);  console.log(x);

输出结果为：

```
12
```

------

## 递归函数

递归函数即在函数内调用函数本身。

> 举个例子：
> 从前有座山，山里有座庙，庙里有个老和尚，正在给小和尚讲故事呢！故事是什么呢？"从前有座山，山里有座庙，庙里有个老和尚，正在给小和尚讲故事呢！故事是什么呢？'从前有座山，山里有座庙，庙里有个老和尚，正在给小和尚讲故事呢！故事是什么呢？……'"

### 实例

## TypeScript

function factorial(number) {    if (number <= 0) {         // 停止执行        return 1;     } else {             return (number * factorial(number - 1));     // 调用自身    }  };  console.log(factorial(6));      // 输出 720

编译以上代码，得到以下 JavaScript 代码：

## JavaScript

function factorial(number) {    if (number <= 0) { // 停止执行        return 1;    }    else {        return (number * factorial(number - 1)); // 调用自身    } } ; console.log(factorial(6)); // 输出 720

输出结果为：

```
720
```

------

## Lambda 函数

Lambda 函数也称之为箭头函数。

箭头函数表达式的语法比函数表达式更短。

函数只有一行语句：

```
( [param1, parma2,…param n] )=>statement;
```

### 实例

以下实例声明了 lambda 表达式函数，函数返回两个数的和：

## TypeScript

var foo = (x:number)=>10 + x  console.log(foo(100))      //输出结果为 110

编译以上代码，得到以下 JavaScript 代码：

## JavaScript

var foo = function (x) { return 10 + x; }; console.log(foo(100)); //输出结果为 110

输出结果为：

```
110
```

函数是一个语句块：

```
( [param1, parma2,…param n] )=> {
 
    // 代码块
}
```

### 实例

以下实例声明了 lambda 表达式函数，函数返回两个数的和：

## TypeScript

var foo = (x:number)=> {        x = 10 + x     console.log(x)   }  foo(100)

编译以上代码，得到以下 JavaScript 代码：

## JavaScript

var foo = function (x) {    x = 10 + x;    console.log(x); }; foo(100);

输出结果为：

```
110
```

我们可以不指定函数的参数类型，通过函数内来推断参数类型:

## TypeScript

var func = (x)=> {     if(typeof x=="number") {         console.log(x+" 是一个数字")     } else if(typeof x=="string") {         console.log(x+" 是一个字符串")     }   }  func(12)  func("Tom")

编译以上代码，得到以下 JavaScript 代码：

## JavaScript

var func = function (x) {    if (typeof x == "number") {        console.log(x + " 是一个数字");    }    else if (typeof x == "string") {        console.log(x + " 是一个字符串");    } }; func(12); func("Tom");

输出结果为：

```
12 是一个数字
Tom 是一个字符串
```

单个参数 **()** 是可选的：

## TypeScript

var display = x => {     console.log("输出为 "+x)  }  display(12)

编译以上代码，得到以下 JavaScript 代码：

## JavaScript

var display = function (x) {    console.log("输出为 " + x); }; display(12);

输出结果为：

```
输出为 12
```

无参数时可以设置空括号：

## TypeScript

var disp =()=> {     console.log("Function invoked");  }  disp();

编译以上代码，得到以下 JavaScript 代码：

## JavaScript

var disp = function () {    console.log("调用函数"); }; disp();

输出结果为：

```
调用函数
```

------

## 函数重载

重载是方法名字相同，而参数不同，返回类型可以相同也可以不同。

每个重载的方法（或者构造函数）都必须有一个独一无二的参数类型列表。

参数类型不同：

```
function disp(string):void; 
function disp(number):void;
```

参数数量不同：

```
function disp(n1:number):void; 
function disp(x:number,y:number):void;
```

参数类型顺序不同：

```
function disp(n1:number,s1:string):void; 
function disp(s:string,n:number):void;
```

如果参数类型不同，则参数类型应设置为 **any**。

参数数量不同你可以将不同的参数设置为可选。

### 实例

以下实例定义了参数类型与参数数量不同：

## TypeScript

function disp(s1:string):void;  function disp(n1:number,s1:string):void;   function disp(x:any,y?:any):void {     console.log(x);     console.log(y);  }  disp("abc")  disp(1,"xyz");

编译以上代码，得到以下 JavaScript 代码：

## JavaScript

function disp(x, y) {    console.log(x);    console.log(y); } disp("abc"); disp(1, "xyz");

输出结果为：

```
abc
undefined
1
xyz
```