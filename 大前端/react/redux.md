# redux 是什么：

> Redux 是 JavaScript 状态容器，提供可预测化的状态管理。可以让你构建一致化的应用，运行于不同的环境（客户端、服务器、原生应用），并且易于测试。不仅于此，它还提供 超爽的开发体验，比如有一个时间旅行调试器可以编辑后实时预览。 	

``` shell
npm install --save redux 
```

## 1.1  redux的工作流程 ![Alt text](./bg2016091802.jpg) 

## 1.2  什么情况下需使用redux 

1.  总体原则：能用就不用，如果不用比较吃力才考虑使用 
2. 某个组件的状态需要共享
3. 某个状态需要在任何地方都可以拿到 
4. 一个组件需要改变全局状态 
5. 一个组件需要改变另一个组件的状态  

## 1.3  state对象 

1. 作用：  redux库最核心的管理对象 

2. 它内部的维护着： 	state   	reducer 

3. 核心方法： 		getState()      //获取状态值 	dispatch(action)       	subcribe(listener) 

4.  编码 	 	

   store.getState() 	store.dispatch({type: 'INCREMENT',number}) 	store.subscribe(render)   

 ## 1.4 redux的三个核心概念

### 1.4.1  action 

> 标志要执行行为的对象 
>
> 包含两个方面的属性： 
>
> type：标志属性，值为字符串，唯一，必要属性 
>
> xxx：数据属性，值类型任意，可选属性 

例子：

```react
const action = { 	type: 'INCREMENT', 	data: 2 }
// Action Creater(创建Action的工厂函数) 
const increment = (number) =>({type: 'INCREMENT',number})
```

### 1.4.2 reducer 

根据老的state和action，产生新的state的纯函数 

例子:

```react
export default function counter(state = 0,action){ 	
    switch (action.type){ 		
        case 'INCREMENT': 			
            return state + action.data; 		
        case 'DECREMENT': 			
            return state + action.data; 		
        default: 			
            return state; 	
    } }
}
// 注意： 返回一个新的状态 不要修改原来的状态
```

### 1.4.2 store 

1. 将state,action与reducer联系在一起的对象 

2. 如何得到此对象? 	 	

   ```react
   import {createStore} from 'redux' 	
   import reducer from './reducers' 	
   const store = createStore(reducer) 
   // reducer是个函数
   ```

   

3. 此对象的功能? 		

> getState():   得到state
>
> dispatch(action):  分发action, 触发reducer调用，产生新的state
>
> subscribe(listener):注册监听，当产生了新的state时,自动调用 
>
>  以下四个文件最好放在一起，借鉴vuex的思路：
>
> action-type.js   //  包含所有action的type名称常量 
>
> action.js    // 包含了所有的action creater(action的工厂函数)，有同步异步，同步返回对象，异步返回函数（thunk中间件） 	
>
> reducers.js    //  包含n个reducer函数（根据老的state和action返回一个新的state） 
>
> store.js    // redux最核心的管理对象 

		 # react-redux

## 1.1 理解 

1. 一个react的插件库 
2. 专门用来简化react应用中使用redux 

## 1.2 react-redux将所有的组件分为两大类

1. UI组件 
2. 容器组件containers

## 1.3 下载

 ```shell
npm i react-redux --save 
 ```

# redux异步编程 ####

## 1.1下载 中间件 		

```shell
npm install --save redux-thunk 
```

作用： 同步的action返回一个对象，异步的action返回一个函数    

## 1.2 react调试： 

下载react-dev-tool 

下载一个依赖包：  

```shell
npm install --save-dev redux-devtools-extension 
```

在store.js引入以下代码: 

```react
import { composeWithDevTools } from 'redux-devtools-extension' 
const store = createStore(counter,composeWithDevTools(applyMiddleware(thunk))) 
```

react、redux、react-redux、react-redux-thunk使用教程 	

```
文件结构： 
app 	
	node_moudles 	
	public 		
		index.html 	
	src 		
		commponents 			
			comment-add 				
				comment-add.jsx 			
			comment-list 				
				comment-list.jsx 			
			comment-item 				
				comment-item.jsx 		 
			(-)app 			    
				app.jsx			   		
			containers  
            
            (+)app 		
            redux 			
            	action-type.js 			
            	action.js 			
            	reducers 			
            	store.js 		
            	index.js  
```

首先在index.js里引入： 	 	

```react
import { Provider } from 'react-redux'; 	
import store from './redux/store'; 	
import App from './containers/app/app'   		

ReactDOM.render(( 		
    <Provider store={store}> 			
   	 	<app /> 		
    </Provider>  	
).document.getElementById("root"))
```

