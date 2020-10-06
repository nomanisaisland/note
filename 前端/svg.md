## 位图和矢量图
位图是由像素点组成
矢量图是由数学向量方式记录图像的

## 引入外部svg形式
1. 外部引用
 ```html
  <img src="xxx.svg" alt="">
  <div style="background: url(xxx.svg)">

  </div>
  <iframe src="xxx.svg" width="" height=""></iframe>
 ```
2. 根据html5的特性直接写
 ```html
 <svg width="120px" height="120px" viewBox="0 0 120 120" version="1.1">
   <circle cx="60" cy="60" r="50"></circle>
 </svg>
 ```
## 标签与属性
+ circle 圆
  - cx x轴坐标
  - cy y轴坐标
  - r 半径
  - fill 填充色
  - stroke 边框颜色
  - stroke-width 边框大小
  - style 图形样式（针对的是非本身属性，例如边框颜色stroke）
```svg
<circle cx="60" cy="60" r="50" style="stroke: black" stroke-width="20px"></circle>
```
+ rect 矩形
  - x x坐标
  - y y坐标
  - rx 弧度（如果没有ry，则ry=rx）
  - ry
  - width  长
  - height  宽
  - fill 填充色  可以设置值为none 不设置填充效果
  ```svg
  <rect x="60" y="60" rx="10" width="50" height="50" fill="red"></rect>
  ```
+ text 文本
  - x x轴坐标
  - y y轴坐标
  - font-size 字体大小
  - text-anchor 对齐方式
```
<text x="150" y="125" font-size="60" text-anchor="middle" fill="black">SVG</text>
```
+ line 线
  - x1 x轴起点
  - y1 y轴起点
  - x2 x轴终点
  - y2 y轴终点
  - storke 颜色
  - storke-width 宽度
  - storke-opacity  透明度  
+ ellipse 椭圆
+ polyine 折线
+ path 路径
+ g 容器标签，用来组合元素
  - 属性必须是所有图形都具有的属性
  - transform="translate(100,100)" 平移
```
<g transform="translate(100,100)" stroke="black" stroke-width="2">
  <circle r="20" fill="transparent" />
  <circle r="30" fill="transparent" />
  <circle r="40" fill="transparent" />
  <circle r="50" fill="transparent" />
</g>
```
+ image
  - x x轴
  - y y轴
  - width 高
  - height 宽
  - xlink:href  引入图片
## 动态创建可交互的svg图片
1. 通过createTag创建svg标签
弹性公式：
速度 +=（目标-当前）/
速度 *= 运动系数   
