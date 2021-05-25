# 可以做什么？

1. base64转码   Base64Util
2. 位图   Bitmap
3. 文字   BitmapText
4. 设置位图填充方式  BitmapFillMode
5. 提供混合模式可视效果的常量值的类,通常用于 DisplayObject 的 blendMode 属性上。    BlendMode
6. 模糊效果    BlurFilter
7. 优化读取、写入以及处理二进制数据的方法和属性    ByteArray
8. 客户端部分信息    Capabilities
9. 绘制线条     CapsStyle
10. 定义egret.DisplayObjectContainer的子项目排序方式。     ChildrenSortMode
11. DisplayObject 类是可放在显示列表中的所有对象的基类。    DisplayObject
12. 基本显示列表构造块：一个可包含子项的显示列表节点。    DisplayObjectContainer
13. 添加投影。    DropShadowFilter
14. 创建事件实例的基类   Event
15. 事件派发器类     EventDispatcher
16. 可为 Event 类的 eventPhase 属性提供值。   EventPhase
17. 聚焦     FocusEvent
18. 对显示对象应用发光效果。   GlowFilter
19. GradientType 类为 egret.Graphics 类的 beginGradientFill() 方法中的 type 参数提供值。     GradientType
20. 包含一组可用来创建矢量形状的方法    Graphics
21. 为对象实例提供唯一的hashCode值      HashObject
22. 为水平对齐方式定义可能的值。    HorizontalAlign
23. 用于添加或删除事件侦听器的方法    IEventDispatcher
24. Egret顶级对象。框架内所有对象的基类，为对象实例提供唯一的hashCode值。     IHashObject
25. 用于建立多种样式混合文本的基本结构，主要用于设置 textFlow 属性      ITextElement
26. 文本样式     ITextStyle
27. ImageLoader 类可用于加载图像（JPG、PNG 或 GIF）文件。使用 load() 方法来启动加载。被加载的图像对象数据将存储在 ImageLoader.data 属性上 。   ImageLoader
28. JointStyle 类是指定要在绘制线条中使用的联接点样式的常量值枚举。提供的这些常量用作 egret.Graphics.lineStyle() 方法的 joints 参数中的值。 
29. Logger是引擎的日志处理模块入口
30. Matrix 类表示一个转换矩阵，它确定如何将点从一个坐标空间映射到另一个坐标空间。您可以对一个显示对象执行不同的图形转换，方法是设置 Matrix 对象的属性，将该 Matrix对象应用于显示对象的 matrix 属性。这些转换函数包括平移（x 和 y 重新定位）、旋转、缩放和倾斜。
31. 横竖屏    OrientationMode
32. Point 对象表示二维坐标系统中的某个位置，其中 x 表示水平轴，y 表示垂直轴。
33. 当加载操作已开始或套接字已接收到数据时，将调度 ProgressEvent 对象。有两种类型的进程事件：ProgressEvent.PROGRESS 和 ProgressEvent.SOCKET_DATA。
34. Rectangle 对象是按其位置（由它左上角的点 (x, y) 确定）以及宽度和高度定义的区域。   Rectangle
35. RenderTexture 是动态纹理类，他实现了将显示对象及其子对象绘制成为一个纹理的功能   
36. 此类用于使用绘图应用程序编程接口 (API) 创建简单形状。Shape 类含有 graphics 属性，通过该属性您可以访问各种矢量绘图方法。    Shape
37. 音频   Sound
38. 立体声道  SoundChannel
39. Sprite 类是基本显示列表构造块：一个可包含子项的显示列表节点。   Sprite
40. 纹理集合   SpriteSheet
41. 舞台  Stage
42. StageScaleMode 类为舞台缩放模式提供值。
43. TextField是egret的文本渲染类，采用浏览器/设备的API进行渲染，在不同的浏览器/设备中由于字体渲染方式不一，可能会有渲染差异如果开发者希望所有平台完全无差异，请使用BitmapText
44. TextFieldInputType 类是在设置 TextField 类的 inputType 属性时使用的常数值的枚举。
45. 纹理类是对不同平台不同的图片资源的封装在HTML5中，资源是一个HTMLElement对象在OpenGL / WebGL中，资源是一个提交GPU后获取的纹理idTexture类封装了这些底层实现的细节，开发者只需要关心接口即可     Texture
46. 计时器的接口   Timer
47. 每当 Timer 对象达到由 Timer.delay 属性指定的间隔时，Timer 对象即会调度 TimerEvent 对象。     TimerEvent
48. 接触的事件   TouchEvent
49. VerticalAlign 类为垂直对齐方式定义可能的值。
50. 使用视频     Video
51. 本地缓存    egret.localStorage.globalFunction
52. 心跳计时器   egret.sys.SystemTicker
53. 基础类型介绍   global.Types
54. assetsManager底层存储资源信息     RES.File
55. 版本控制加载的接口   RES.IVersionController
56. 资源组的加载进度提示    RES.PromiseTaskReporter
57. 公共方法 RES.globalFunction
58. 资源控制   RES.processor.Processor
59. 影片剪辑，可以通过影片剪辑播放序列帧动画    egret.MovieClip
60. 使用 MovieClipData 类，您可以创建 MovieClip 对象和处理 MovieClip 对象的数据。MovieClipData 一般由MovieClipDataFactory生成
61. 使用 MovieClipDataFactory 类，可以生成 MovieClipData 对象用于创建MovieClip
62. 当动画的当前帧有事件，将调度 MovieClipEvent 对象。帧事件类型 MovieClipEvent.FRAME_LABEL.
63. ScrollView 是用于滑动的辅助类，将一个显示对象传入构造函数即可。可以在指定的尺寸范围内显示超过该范围的显示对象。并可以在此范围内随意拖动。
64. 心跳    egret.Ticker
65. 延迟公共方法   globalFunction

  





# 精灵图集使用

```typescript
// default.res.json
{
	"groups": [
		{
			"keys": "home_json",
			"name": "home"
		}
	],
	"resources": [
		{
			"name": "home_json",
			"subkeys": "btn-store,btn-task,map,rule,btn-game,btn-rank",
			"type": "sheet",
			"url": "config/home.json"
		}
	]
}
// config/home.json
{
    "file": "../assets/home.png",
    "frames": {
        "btn-store": {
            "x": 752,
            "y": 249,
            "w": 231,
            "h": 81,
            "offX": 0,
            "offY": 0,
            "sourceW": 231,
            "sourceH": 81
        },
        "btn-task": {
            "x": 752,
            "y": 166,
            "w": 231,
            "h": 81,
            "offX": 0,
            "offY": 0,
            "sourceW": 231,
            "sourceH": 81
        },
        "map": {
            "x": 0,
            "y": 0,
            "w": 750,
            "h": 886,
            "offX": 0,
            "offY": 0,
            "sourceW": 750,
            "sourceH": 886
        },
        "rule": {
            "x": 752,
            "y": 332,
            "w": 144,
            "h": 37,
            "offX": 0,
            "offY": 0,
            "sourceW": 144,
            "sourceH": 37
        },
        "btn-game": {
            "x": 752,
            "y": 0,
            "w": 231,
            "h": 81,
            "offX": 0,
            "offY": 0,
            "sourceW": 231,
            "sourceH": 81
        },
        "btn-rank": {
            "x": 752,
            "y": 83,
            "w": 231,
            "h": 81,
            "offX": 0,
            "offY": 0,
            "sourceW": 231,
            "sourceH": 81
        }
    }
}


let saber1: egret.Bitmap = new egret.Bitmap()
saber1.texture = RES.getRes('home_json.map')
```



```typescript
///<reference path="./Model/BeginGame.ts" />  白鹭中没有CommonJS require    ES6模块import  可以用左边的方式来引入文件
```

