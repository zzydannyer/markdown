# **JS基础**

### typeof **返回以下原始类型**

* ### number/string/boolean

* ### function

* ### object

* ### undefined

```js
let c=[1,2,3]
type﻿of c    //object
```

### 变量提升

var声明提升 => undefined

### let&const暂时性死区

```js
let i = "name";
function func(){
    console.log(i)    //TDZ
    let i = "sum"
}

function run(a=b, b=1){}    //TDZ
run();
```
### 全局污染

* 立即执行函数

* 块级作用域

### 锁定变量

```
Object.freeze(变量)
```
### null和undefined

null定义引用类型，undefined定义基本类型

```js
console.log(typeof a) //undefined
```
### undeclared 与 undefined 的区别？

- undefined：声明了变量，但是没有赋值
- undeclared：没有声明变量就直接使用

```js
var a; //undefined
b;    // b is not defined
```

### 严格模式

作用于当前作用域及其子作用域

```js
"use strict"
//禁用关键词变量
```
### 重复输出

```js
function star(num){
    return"*".repeat(num || 8)
}
star(3) //***
```
### 表单去空白

```js
query.("input").value.trim();

```














﻿










﻿




﻿
﻿
﻿
﻿


﻿
﻿





