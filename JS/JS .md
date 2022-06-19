# JS

### 数据类型

#### 基本类型（原始类型）

* `Number`
* `String`
* `Boolean`
* `Null`
* `Undefined`
* `Symbol`
* `BigInt`

#### 引用类型

* `Object`

#### 构造函数class

* `Array`
* `Date`
* `Math`
* `Function`
* `RegExp`

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

{}+[] //0
```

### instanceof

* `instanceof` 用于检测构造函数的 `prototype` 是否出现在某个实例对象的原型链上

### 预编译

1. 创建AO对象
2. 找到==形参==和==变量声明==，作为AO对象的属性名，值为==undefined==
3. 实参和形参相统一
4. 找到==函数声明==，名称一致则会覆盖变量声明

### 作用域链

JS在执行过程中会创造可执行上下文，其中包含外部环境的引用

通过这个引用来==访问外部声明的变量或函数==，这些引用串联成作用域链

### 参数传递

* **基本类型**按值传递，引用类型传引用地址

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

### 本地存储

#### cookie


| 名称         | 含义                                                         |
| ------------ | ------------------------------------------------------------ |
| `name`       | 名称                                                         |
| `value`      | 值                                                           |
| `comment`    | 描述信息                                                     |
| `domain`     | 可访问该`cookie`的域名                                       |
| `expires`    | 过期的具体某一时间                                           |
| `maxAge`     | 多少秒后过期                                                 |
| `path`       | 使用路径                                                     |
| `secure`     | 是否使用安全协议传输                                         |
| `version`    | 使用的版本号                                                 |
| `isHttpOnly` | 让`cookie`无法通过`JS`拿到，包括`Document.cookie`、`XMLHttpRequest`和`RequestAPI`，只有发出请求时才会携带`cookie` |

* ==Cookie登录==：

  1. 客户端发送登录请求
  2. 服务端响应请求并设置响应头`set-cookie`
  3. 客户端发送请求且请求头自动携带`cookie`
  4. `cookie`验证通过正常响应请求

  > * `Cookie`的特点
  >   1. 字符编码为`unicode`，不支持存储中文
  >   2. 不可跨域，如果设置了`domain`则可在一级和二级域名共享
  > * 优点
  >   1. 兼容性好
  >   2. 浏览器发送请求自动携带，容易实现
  > * 缺点
  >   1. 增加请求体积，浪费性能
  >   2. 容易受到`CSRF`攻击（跨站域请求伪造）
  >   3. 存在客户端不够安全

* ==Session登录==：

  1. 客户端发送登录请求

  2. 服务端响应请求并设置响应头`set-cookie`，包含了一个`sessionId`

     * `sessionId`格式：

       `Set-Cookie: value[; expires=date][; domain=domain][; path=path][; secure]`

  3. 客户端发送请求且请求头自动携带`cookie`，服务端通过`sessionId`查找`session`，没找到创建一新的`session`，并返回新的`sessionId`

  4. `cookie`验证通过正常响应请求

  > * `session`是基于`cookie`实现的
  >   1. `cookie`只支持字符串数据，`session`支持任意数据
  >   2. `cookie`可以存储较长时间，`session`存储时间短
  >   3. `cookie`存储4kb，`session`存储不限制
  > * 优点
  >   1. 查询速度更快，因为是个绘画，在内存中操作
  >   2. 存在服务端更安全
  > * 缺点
  >   1. 增加服务端资源消耗，每个客户端都会创建`session`，包含用户所有信息

* ==Token==：

  1. 客户端发送登录请求

  2. 服务端生成`token`，其中带有用户id等信息

  3. 客户端发送请求且并把存储的`token`放到请求头中

  4. `token`验证通过正常响应请求

  > * `token`是加密字符串，体积很小，通常使用`uid`（用户唯一标识）、时间戳、签名以及其它参数加密而成，可以自由操作存储位置
  > * 优点
  >   1. 安全，用户`id`就算被截取也没用
  >   2. 不占用服务器资源，`token`只存了用户`id`
  >   3. 跨域请求较为方便，多台服务器可以共用一个`token`
  > * 缺点
  >   1. 查询速度慢，每次都需要通过`token`中的用户`id`查询数据库
  
  

#### 对比

| 名称           | 容量 | 可随请求发送 | 易用性   | 生命周期                         |
| -------------- | ---- | ------------ | -------- | -------------------------------- |
| cookie         | 4kb  | 是           | 需要封装 |                                  |
| localstorage   | 5mb  | 否           |          | 一直存在浏览器，除非用户手动清除 |
| sessionstorage | 5mb  | 否           |          | 结束于浏览器或者tab页的关闭      |

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

* 指向构造函数实例化`new`出来的对象（class的this指向实例）

* 指向事件触发的对象

  

### 箭头函数

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



### null 和 undefined

* `null`定义引用类型，`undefined`定义基本类型
* `null`明确定义给变量的值，`undefined`未指定变量的默认值
* `null`不代表任何值的值，`undefined`没有显式返回的函数

```js
console.log(typeof a) //undefined
```

### undeclared 和 undefined

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

### 数组API

#### `Array.of(..args)`

* 根据指定==数组项==创建数组

  ```js
  const arr = Array.of(1, 2, 3, 5, 7)
  ```

#### `Array.from(arg)`

* 根据给定的==类数组==或==可迭代的对象==创建数组

  ```js
  const div = document.querySelectAll("div")
  const arr = Array.from(div) //Array.prototype.slice.call(div)
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

### 遍历器

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
  function deepClone(obj={}){
      if(typeof obj !== 'object' || obj == null){
          return obj
      }
      let result 
      if(obj instanceOf Array){
          result = []
      }else{
          result = {}
      }
      for(let key in obj){
          // hasOwnProperty 检查自己是否拥有该属性，而不是原型拥有
          if(obj.hasOwnProperty(key)){
              result[key] = deepClone(obj[key])
          }
      }
      return result
  }
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

#### async/await相比于Promise的优势

* 代码读起来更加同步，摆脱链式调用，非常优雅
* 使用`try/catch`错误处理更加友好，更便于调试

#### 循环中使用异步

```js
function delayLog(item){
    return new Promise(resolve => {
        setTimeout(() = > resolve(item), 1000)
    })
}

function processArr(arr){
    arr.forEach(async item => {
        console.log(await delayLog(item))
    })
    console.log('打印完毕')
}
/*
打印完毕
...arr
*/

async function processArr(arr){
    for(let item of arr){
        console.log(await delayLog(item))
    }
    console.log('打印完毕')
}
/*
打印完毕
...arr
*/
```

ES9 for await of

```js
for await (const item of arr){}
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

# 实用方法

### 首字母大写

```js
firstUpperCase(){
    let [first, ...rest] = this.fullName
    return first.toUpperCase() + rest.join('')
}

firstUpperCase() {
    return this.fullName.split(' ').map((word)=>{
      return word[0].toUpperCase() + word.slice(1)
    }).join(' ')
  }
```



### 动态添加类名

* 判断是否有这个类名

```js
hasClass(el,className){
    const reg = new RegExp('(^|\\s)'+ className +'(\\s|$)')  
    // \\s    /\s/ 空格
    // ^开头  |或  $结尾
	return reg.test(el.className)
}
```

```js
addClass(el,className){
    if(hasClass(el, className)){
        return;
    }

    let newClass = el.className.split(' ')    //Array
    newClass.push('className')
    newClass.join(' ')    //String
}

```



### ClassList方法

```js
Element.classList.length
Element.classList.contains('className')  //判断一个类型是不是存在，返回true和false
Element.classList.add('test')            //添加一个类名
Element.classList.remove('test')         //去掉一个类名
Element.classList.toggle('test')         //引号中的类名，有就删除，没有就添加

```

### 获取数组重复2次或者两次以上的元素

```js
let arr = [12,3,4,3,4,5,22,3,4,6,7,6,75,67,56,7,12];
let Arr = [];
let repArr = [];
for(let i = 0; i < arr.length; i++){
    if(Arr.indexOf(arr[i]) == -1){
        Arr.push(arr[i])
    }else{
        if(repArr.indexOf(arr[i]) == -1){
            repArr.push(arr[i])
        }
    }
}
```

### 递归拼接树形结构

```js
//树形菜单结构
const rootList = [
    { id:1,  parent:null, text:'菜单1' },
    { id:11, parent:1,    text:'菜单1-1' },
    { id:12, parent:1,    text:'菜单1-2' },
    { id:2,  parent:null, text:'菜单2' },
    { id:21, parent:2,    text:'菜单2-1' }
]

function getTreeList(rootList, id, list){
    for(let item of rootList){
        if(item.parent == id){
            list.push(item)
        }
    }
    
    for(let i of list){
        i.children = []
        
        getTreeList(rootList, i.id, i.children)
            
        if(i.children.length == 0){
            delete i.children
        }
    }
    
    return list
}

const res = getTreeList(rootList, null, [])

/**
 [
 	{
 		id: 1,
		parent: null,
		text: "菜单1",
		children: [
			{
				id: 11
				parent: 1
				text: "菜单1-1"
			},
			{
				id: 12
				parent: 1
				text: "菜单1-2"
			}
		]
 	},
 	{
 		id: 2,
		parent: null,
		text: "菜单2",
		children: [
			{
				id: 21
                parent: 2
                text: "菜单2-1"
			}
		]
 	}
 ]
 */
```

### newSet解构

```js
var arr = new Set([1,2,3,4,5])
[...arr][arr.size-1]
```

### 触屏即播放

```javascript
$('html').one('touchstart',function(){  
 audio.play()  
})
```

#### **获取数组重复2次或者两次以上的元素**

```js
let arr = [12,3,4,3,4,5,22,3,4,6,7,6,75,67,56,7,12];
let Arr = [];
let repArr = [];
for(let i = 0; i < arr.length; i++){
    if(Arr.indexOf(arr[i]) == -1){
        Arr.push(arr[i])
    }else{
        if(repArr.indexOf(arr[i]) == -1){
            repArr.push(arr[i])
        }
    }
}
```

### **ajax问题/错误**

* 通过设置`tranditional`来阻止深度序列化

```js
$.ajax(
    url:"xxx",
    tranditional:true,
    data:data
}
```

### 立即执行函数里传window

```js
(function (window, undefined){
    
})(window)
```

* 减少作用域链查找，访问速度更快
* `undefined`是变量，可以重新赋值但无效，`null`是关键字不能赋值

### Object.defineProperty()取代直接修改原型链

```js
vue.prototype.$router = {}

Object.defineProperty(vue.prtotype, '$route', {
	set:function(){
		...
	}
})
```

### 架构模式

* 工厂模式

* 建造者（适用于经常需要构造）

* 函数式（适合tree-shaking）

# 原生JS

### 元素视图的各个尺寸

| 属性           | 说明                                                         |
| -------------- | ------------------------------------------------------------ |
| `offsetLeft`   | 获取当前元素到定位父节点的left方向的距离                     |
| `offsetTop`    | 获取当前元素到定位父节点的top方向的距离                      |
| `offsetWidth`  | 获取当前元素 width + 左右padding + 左右border-width          |
| `offsetHeight` | 获取当前元素 height + 上下padding + 上下border-width         |
| `clientWidth`  | 获取当前元素 width + 左右padding                             |
| `clientHeight` | 获取当前元素 height + 上下padding                            |
| `scrollWidth`  | 当前元素内容真实的宽度，内容不超出盒子宽度时为盒子的`clientWidth` |
| `scrollHeight` | 当前元素内容真实的高度，内容不超出盒子高度时为盒子的`clientHeight` |

### 宽高获取方法

| 属性                         | 说明                                                         |
| :--------------------------- | :----------------------------------------------------------- |
| `window.innerWidth`          | 除去菜单栏的窗口宽度                                         |
| `window.innerHeight`         | 除去菜单栏的窗口高度                                         |
| `window.outerWidth`          | 包括菜单栏的窗口宽度                                         |
| `window.outerHeight`         | 包括菜单栏的窗口高度                                         |
| `window.screen.width`        | 电脑屏幕的宽度                                               |
| `window.screen.height`       | 电脑屏幕的高度                                               |
| `window.screen.availWidth`   | 电脑屏幕的可利用宽度                                         |
| `window.screen.availHeight`  | 电脑屏幕的可利用高度                                         |
| `window.screenLeft`          | 浏览器距离屏幕的宽度                                         |
| `window.screenTop`           | 浏览器距离屏幕的高度                                         |
| `document.body.clientWidth`  | 指元素的自身的宽度（包括padding）                            |
| `document.body.clientHeight` | 指元素的自身的高度（包括padding）                            |
| `document.body.clientLeft`   | 子级div内容位置到父级内容区域的宽度距离（即border值）        |
| `document.body.clientTop`    | 子级div内容位置到父级内容区域的高度距离（即border值）        |
| `document.body.offsetWidth`  | 指定元素的宽度（包括padding，border和内容）                  |
| `document.body.offsetHeight` | 指定元素的高度（包括padding，border和内容）                  |
| `document.body.offsetLeft`   | 距离父级元素的宽度                                           |
| `document.body.offsetTop`    | 距离父级元素的高度                                           |
| `document.body.scrollWidth`  | 获取的是文档的宽度（当指定的宽度小于浏览器窗口的时候，为浏览器的宽度） |
| `document.body.scrollHeight` | 获取的是文档的高度（当指定的高度小于浏览器窗口的时候，为浏览器的高度） |
| `document.body.scrollLeft`   | 文档被滚动右去的时候（即滚动条往右滚动的距离）               |
| `document.body.scrollTop`    | 文档被滚动上去的时候（即滚动条往上滚动的距离）               |

### 防抖

```js
function debounce(fn, wait){
    let timer = null
    return () => {
         //每次触发，都把前面的定时器关闭，尽管第一次定时器并不存在
        if(timer) clearTimeout(timer);
        timer = setTimeout(（） => {fn()}, wait)
	}
}
```

### 节流

```js
function throttle(fn, wait) {
      let start = 0
      return () => {
        const end = new Date().getTime()
        if (end - start > wait) {
          fn()
          start = end
        }
      }
    }
```

#### 应用场景

1. DOM 元素的拖拽`mousemove`

2. 射击游戏在单位时间只能发射一颗子弹`mousedown/keydown`

3. Canvas 模拟画板功能`mousemove`

4. 懒加载，在滚动过程中判断是否需要加载图片`scroll`

5. 页面滚动到底部加载更多`scroll`
   ﻿
   ﻿
   ﻿


﻿
﻿





