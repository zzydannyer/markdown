# JS

### 数据类型

#### 基本数据类型

`Number`、`String`、`Boolean`、`Null`、`Undefined`、`Symbol`、`BigInt`

#### 引用数据类型

`Object`、`Array`、`Date`、`Math`、`Function`、`RegExp`

### 堆 和 栈

* ==堆==：存储引用类型值的空间
* ==栈==：存储基本类型值和执行代码的环境

### 对象

* 对象的key数字和字符串等效（对象和数组的区别）

  ```js
  a[0] === a['0']
  ```

* key会转化成字符串`[object Object] `（`Object.prototype.toString` / `valueOf`）

  ```js
  a = {}
  b[a] === b['object Object']
  ```

  



### 隐式转换

* `Boolean()`或`!!`检测虚值

* `''`、`0`、`null`、`undefined`、`NaN`转换为false

### typeof

* number、string、boolean
* function、object、undefined

```js
let c = [1,2,3]
typeof c    //object

'' == false     //true
' ' == false     //true
Boolean('')     //false
Boolean(' ')	//true
```

### 作用域链

通过作用域链来访问父级声明的变量或函数

### 原型、原型链、继承

* 所有函数有``prototype`属性

* 所有对象有`__proto__`属性

  1. * 构造函数prototype的constructor指向构造函数自身

     * 构造函数的constructor指向Function()

  2. 对象的__ proto __ 指向构造函数的 prototype
     * `Object.__proto__ === null`
     * `Function.__proto__ === Function.prototype`

  ```js
  function Person(){}
  let person = new Person()
  person.__proto__ === Person.prototype //true
  Person.prototype.constructor === Person //true
  
  person {
      __proto__: Person.prototype {
          __proto__: Object.prototype {
              __proto__: null
          }
      }
  }
  
  Function {
      __proto__: Function.prototype {
          __proto__: Object.prototype {
              __proto__: null
          }
      }
  }
  ```

  

![image-20220319003041501](C:\Users\14046\AppData\Roaming\Typora\typora-user-images\image-20220319003041501.png)

### 变量提升

* `变量`和`函数声明`会提升到最顶部执行

  ```js
  var a => undefined
  ```

* 函数声明提升高于变量提升
* 函数内部用`var`声明后不会再往上寻找
* 匿名函数不会提升

### 避免全局污染

* 立即执行函数
* 块级作用域

### `== `和` === `

前者`值相等`，后者会比较数据类型和值，`值和引用地址`相等

### `&& ` 和 `||`

* 逻辑与

```js
if(e){
    e.do()
}
//
e && e.do()
```

* 逻辑或

```js
let n = this.n || n
```

### 冒泡 和 捕获

* 捕获 `window -> 目标元素`
* 冒泡 `目标元素 -> window`

### 事件

|                           |                              |
| ------------------------- | ---------------------------- |
| `event.preventDefault()`  | 阻止事件默认行为             |
| `event.stopPropagation()` | 阻止事件捕获 / 冒泡          |
| `event.target`            | 触发事件的元素（事件发出者） |
| `event.currentTarget`     | 事件绑定的元素（事件监听者） |



### window.length

* `iframe`的个数

### 闭包

一个`函数里返回一个函数`，里面的函数能够读取外部函数的内部变量

* 将变量始终存在内存中，可以封装私有属性和方法
* 耗费内存、会造成内存溢出

### localStorage与sessionStorage

- 生命周期不同：

  `localStorage`一直存在浏览器，除非用户手动清除

  `sessionStorage`生命周期结束于浏览器或者tab页的关闭

### 内存泄漏

程序中已动态分配的堆内存未释放或无法释放，造成变慢、崩溃、延迟等

* 闭包
* DOM清空时还在引用全局变量
* 定时器未清除

### 垃圾回收机制

为了防止内存泄漏，不停寻找不再使用的变量

1. 变量生命周期

   ==局部变量== 在函数结束之后被释放

   ==全局变量== 在页面关闭后被释放

2. 回收方式
   ==标记清除==：大部分浏览器使用这种方式，当变量进入执行环境，垃圾回收器标记变量==进入幻境==，离开环境时再进行标记==离开环境==，随之进行清除

   ==引用计数==：存在于低版本浏览器，跟踪一个==值的引用次数==，声明一个变量并将一个引用类型赋值给变量时，这个值的引用次数是`1`，当它赋给另一个变量时引用次数`+1`，包含这个引用值的变量指向另一个引用时`-1`，变为`0`时进行回收

### this

`this`总是指向函数的直接调用者

* 指向构造函数实例化`new`出来的对象
* 指向事件触发的对象

### 箭头函数和普通函数的区别

箭头函数的this来自上下文环境中的this

* 不可当作构造函数，不可`new`
* 不可使用`yield`，不能用作Generator函数
* 不可使用arguments，可用`rest`参数代替

```js
let func = (head, ...rest) => {
    console.log([head, ...rest])
}
func(1,2,3,4) //[1,2,3,4]
```



### null和undefined

* `null`定义引用类型，`undefined`定义基本类型
* `null`明确定义给变量的值，`undefined`未指定变量的默认值
* `null`不代表任何值的值，`undefined`没有显式返回的函数

```js
console.log(typeof a) //undefined
```


### undeclared和undefined

- undefined：声明了变量，但是没有赋值
- undeclared：没有声明变量就直接使用

```js
var a; //undefined
b;    // b is not defined
```

### undefined

既是原始数据类型，也是原始值
定义在全局对象window上,window.undefined

```javascript
/* 	不可写   
	不可配置  configurable:false
	不可枚举  enumerable:false
	不可重新定义
*/ 
Object.defineProperty(window,'undefined',{
    writable:true
    configurable:true
    enumerable:true
}
```

undefined自动赋值给未赋值的变量
函数没有显式return,默认return undefined

```javascript
/* undefined不是js的保留字或关键字 */

function test(){
    let undefined = 1

    console.log(undefined)
    console.log(void(0))
    console.log(void(0)===undefined)
    void(0) //返回undefined

}
test() //1,undefined,false
```


```js
null == undefined //true
null === undeifned //false

typeof b //undefined 不报错
console.log(b) //b is not defined 报错

<a href="javascript:void(0)">
```

### 单线程

单线程：只有一个线程，js是单线程，执行会阻碍DOM渲染

webworker：多线程，但不能访问DOM

### 面向对象编程

使用==对象==、==类==、==继承==、==封装==等基本概念进行程序设计

* 易维护、易扩展，提高复用和继承性，提高开发效率

### 严格模式

作用于当前作用域及其子作用域

```js
"use strict"
//禁用关键词变量
```
* 变量必须声明后使用
* 函数参数不能有同名属性
* 不能使用`with`
* 禁止this指向全局对象

### attribute和property的区别

* `attribute`是HTML文档中DOM元素`标签的属性`
* `property`是js中DOM元素`对象的属性`

### Web worker的作用和场景

开启一个子线程，且子线程的操作不受线程的影响

* 大数据处理

* 耗费时间较长的操作



# ES6+

* 模板字符串
* 箭头函数
* `for of`遍历可枚举项
* 提供原生的`Promise`对象
* 引入`module`模块

### let、const

都不存在变量提升

* 会形成封闭作用域，`const`定义常量，但可以修改定义的对象内部的值

  ### 暂时性死区

  ```js
  let i = "name";
  function func(){
      console.log(i)    //TDZ
      let i = "sum"
  }
  
  function run(a=b, b=1){}    //TDZ
  run();
  ```

### ``??``代替 `||`

* `??`用于判断左侧为`null`或`undefined`时，返回右边的值
* `||`判断左边为空字符串或`0`等`false`值时才返回右边的值

### findindex、splice、unshift、pop

往列表里添加项目

```javascript
add(item){
    this.addToArr(this.list,item,(arrItem) => arrItem === item, 5)
    //array.findIndex(function(currentValue, index, arr), thisValue)
},
addToArr(arr,item,Fn,maxLength){
    const index = arr.findIndex(Fn) //回调函数找到点击项在数组中的索引
    if(index == 0){    
        return                      //索引在头部时结束
    }
    if(index > 0){
        arr.splice(index,1)         //有相同索引直接删除之前添加的项目
    }
    arr.unshift(item)               //从头部添加项目
    if(maxLength && arr.length > maxLength){
        arr.pop()                   //设置数组长度，超出长度从最后删除
    }
}
```

### 数组Array方法

| 方法                                           | 用处                                                         |
| ---------------------------------------------- | ------------------------------------------------------------ |
| forEach                                        | 封装内部循环的高级函数，无法break，可以用try、catch中throw new Error来停止 |
| map                                            | 更多用于数组重构，回调返回值返回新数组                       |
| filter                                         | 用于数组按条件过滤，返回过滤后的新数组                       |
| some                                           | 有一个符合条件就返回true                                     |
| every                                          | 所有都符合返回true                                           |
| find                                           | 查找第一个符合条件的数组元素并返回该元素，没有则返回undefined |
| join                                           | 指定连接符生成字符串                                         |
| push / pop                                     | 末尾推入和弹出，改变原数组，返回操作项                       |
| unshift / shift                                | 头部推入和弹出，改变原数组，返回操作项                       |
| sort(fn) / reverse                             | 排序和反转，改变原数组                                       |
| concat                                         | 连接数组，不影响原数组，浅拷贝                               |
| slice(start, end)                              | 不改变原数组，返回截断后的新数组                             |
| splice(start,number,value)                     | 返回删除的元素组成的数组，value为添加的元素，改变原数组      |
| indexOf / lastIndexOf(value,fromIndex)         | 查找数组项，返回对应下标                                     |
| reduce / reduceRight(fn(prev,cur),defaultPrev) | 两两执行，prev为上一次执行return的值，cur为当前值            |

### 数组合并

* concat

```javascript
const  arr1 = [ 1, 2, 3 ]
const  arr2 = [ 4, 5, 6 ]
const  result = arr1.concat(arr2)
/* result = [ 1, 2, 3, 4, 5, 6  ] */
```

* apply

```js
Array.prototype.push.apply(arr1, arr2)
/* arr1 = [ 1, 2, 3, 4, 5, 6  ] */
```

### Filter

* 数组去空

```javascript
let arr = ['1',' ',undefined,'',20,0,undefined,'end']

let result = arr.filter((item)=>{
   return item || typeof item === "number"
})

//['1',' ',20,0,'end']
```



###  Some

* 判断数组中是否有元素符合条件

```js
let arr = [3,4,5,6,7];

let result = arr.some((item,index,arr)=>{
     return item > 5;
})
//true
```

### 数组和对象的遍历方法

* `for`
* `for in`
* `for of`
* `forEach`

### map和forEach的区别

* forEach遍历循环原数组`forEach((item, index, Array)=>{})`

* map返回新数组，callback里需要return值，否则返回undefined

### 深浅拷贝

* 浅克隆 - 循环

  ```js
  let clone = {}
  for(let key in obj){
      if(obj.hasOwnProperty(key)){ //查找对象自身属性，不查找原型链
          clone[key] = obj[key]
      }
  }
  ```

* 浅克隆 - 扩展运算符

  ```js
  let clone = {...obj}
  ```

* 浅克隆 - 对象合并

  ```js
  let clone = Object.assign({}, obj)
  ```

* 深克隆 - JSON（日期、函数、正则不可用）

  ```js
  let clone = JSSON.parse(JSON.stringify(obj))
  ```

* 深克隆 - 循环递归

  ```js
  
  ```

  



### 异步编程的实现方式

* `Promise`对象
* `async`函数
* `Generator`函数
* 发布订阅（观察者模式）
* 回调函数：不利于维护，耦合性高
* 事件监听：事件驱动

### **Promise**

- 解决回调地狱

```js
fulfilled => 解决
rejected  => 拒绝
pending   => 等待

new Promise(
    //excutor 执行器    接收resolve ,reject 两个函数
    (resolve,reject) => {
        resolve()    //执行.then - func1
        reject()     //执行.then - func2 || 执行catch
    }
)
.then(res=>{func1},(err)=>{func2}) //func1执行成功回调,func2执行失败回调
.catch(e => console.log(e))      //无func2情况由catch捕获错误

promise()
    .then(res => {
        return Promise.resolve('成功')
        //return new Promise((resolve,reject)=>{resolve('成功')})
    })
    .then(res => {
        console.log(res) //成功
    }).catch(e=>console.log(e))  //Promise.reject()同理
```

#### **Promise.all**

- interable可迭代对象  =>  Array Set Map

```js
Promise.all([    //传入一个promise集合,如果不是promise直接resolve ,Promise.resolve([])
    promise1,
    promise2,
    promise3
]}
.then(res=>{func})
.catch(e=>{})
//有一个失败,全部失败,返回第一个失败的promise结果
```

#### **Promise.race**

```js
Promise.race([    //传入空数组,promise永远为padding状态
    promise1,
    promise2,
    promise3
]}
.then(res=>{})
.catch(e=>{})
//先完成,先返回,不论fulfilled还是rejected  
```



#### async await

-    async指当前异步函数与同作用域的程序是异步关系
-    await是一个操作符,等待Promise结果

没有`await`，接收到一个`Promise<padding>`的结果

```js
async function func(){
    let p1 = await promise0()
    let p2 = await promise1()
    let p3 = await promise2()
    let p4 = await promise3()
    let p5 = await promise4()
}
```



### **Object.create**

* 将传入的对象作为目标对象的原型

```js
Sub.prototype = Object.create(super.prototype)
VueComponent.prototype.__proto__=== Vue.prototype
```

### **解构赋值**

```js
/* 对象的解构赋值 */

const obj = {
    aa:'aa',
    bb:'bb'
}

const newObj = { ...obj }
```

### 表单去空白

```js
.trim();
```

### 重复输出

```js
function star(num){
    return"*".repeat(num || 8)
}
star(3) //***
```

### 锁定变量

```
Object.freeze(变量)
```



### 原型和原型链

原型：每个构造函数都有原型对象，prototype

prototype有两个属性：

1. constructor：指向构造函数本身
2. __proto__：指向上一级原型 

### 宏任务&微任务

![宏任务微任务](C:\Users\14046\Desktop\DOC\images\宏任务微任务.png)

### 元素视图的各个尺寸

| 属性         | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| offsetLeft   | 获取当前元素到定位父节点的left方向的距离                     |
| offsetTop    | 获取当前元素到定位父节点的top方向的距离                      |
| offsetWidth  | 获取当前元素 width + 左右padding + 左右border-width          |
| offsetHeight | 获取当前元素 height + 上下padding + 上下border-width         |
| clientWidth  | 获取当前元素 width + 左右padding                             |
| clientHeight | 获取当前元素 height + 上下padding                            |
| scrollWidth  | 当前元素内容真实的宽度，内容不超出盒子宽度时为盒子的clientWidth |
| scrollHeight | 当前元素内容真实的高度，内容不超出盒子高度时为盒子的clientHeight |

### 宽高获取方法

| 属性                       | 说明                                                         |
| :------------------------- | :----------------------------------------------------------- |
| window.innerWidth          | 除去菜单栏的窗口宽度                                         |
| window.innerHeight         | 除去菜单栏的窗口高度                                         |
| window.outerWidth          | 包括菜单栏的窗口宽度                                         |
| window.outerHeight         | 包括菜单栏的窗口高度                                         |
| window.screen.width        | 电脑屏幕的宽度                                               |
| window.screen.height       | 电脑屏幕的高度                                               |
| window.screen.availWidth   | 电脑屏幕的可利用宽度                                         |
| window.screen.availHeight  | 电脑屏幕的可利用高度                                         |
| window.screenLeft          | 浏览器距离屏幕的宽度                                         |
| window.screenTop           | 浏览器距离屏幕的高度                                         |
| document.body.clientWidth  | 指元素的自身的宽度（包括padding）                            |
| document.body.clientHeight | 指元素的自身的高度（包括padding）                            |
| document.body.clientLeft   | 子级div内容位置到父级内容区域的宽度距离（即border值）        |
| document.body.clientTop    | 子级div内容位置到父级内容区域的高度距离（即border值）        |
| document.body.offsetWidth  | 指定元素的宽度（包括padding，border和内容）                  |
| document.body.offsetHeight | 指定元素的高度（包括padding，border和内容）                  |
| document.body.offsetLeft   | 距离父级元素的宽度                                           |
| document.body.offsetTop    | 距离父级元素的高度                                           |
| document.body.scrollWidth  | 获取的是文档的宽度（当指定的宽度小于浏览器窗口的时候，为浏览器的宽度） |
| document.body.scrollHeight | 获取的是文档的高度（当指定的高度小于浏览器窗口的时候，为浏览器的高度） |
| document.body.scrollLeft   | 文档被滚动右去的时候（即滚动条往右滚动的距离）               |
| document.body.scrollTop    | 文档被滚动上去的时候（即滚动条往上滚动的距离）               |








﻿










﻿




﻿
﻿
﻿
﻿


﻿
﻿





