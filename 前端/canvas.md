# canvas学习

## 基础语法：

```js
//创建canvas标签

var canvas = document.createElement( 'canvas' );
设置宽高
    canvas.width = 500;
    canvas.height = 400;
设置边框
    canvas.style.border = '1px dashed red';
添加到页面中
    document.body.appendChild( canvas );

// 获得 CanvasRenderingContext2D 对象
    var context = canvas.getContext( '2d' );

 context.moveTo( 0, 0 );
    // 绘制直线
    context.lineTo( 500, 400 );
    // 设置 起点
    context.moveTo( 0, 400 );
    // 绘制直线
    context.lineTo( 500, 0 );
    // 描边显示效果
    context.stroke();
    //填充效果
    context.fill();

//闭合路劲与新路径
closePath()

beginPath() 

// 画虚线
ctx.setLineDash( 数组 )
ctx.getLineDash()
ctx.lineDashOffset = 值
--------------------------------
   ctx.moveTo( 100, 90 );
    ctx.lineTo( 100, 110 );
    ctx.moveTo( 300, 90 );
    ctx.lineTo( 300, 110 );

    ctx.moveTo( 100, 140 );
    ctx.lineTo( 100, 160 );
    ctx.moveTo( 300, 140 );
    ctx.lineTo( 300, 160 );

    ctx.moveTo( 100, 190 );
    ctx.lineTo( 100, 210 );
    ctx.moveTo( 300, 190 );
    ctx.lineTo( 300, 210 );
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo( 100, 100 );
    ctx.lineTo( 300, 100 );
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineDash( [ 5, 5 ] );
    ctx.moveTo( 100, 150 );
    ctx.lineTo( 300, 150 );
    ctx.stroke();

    ctx.beginPath();
    ctx.lineDashOffset = -2;
    ctx.moveTo( 100, 200 );
    ctx.lineTo( 300, 200 );
    ctx.stroke();


```

