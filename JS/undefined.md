## **undefined**
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


```javascript
null == undefined //true
null === undeifned //false

typeof b //undefined 不报错
console.log(b) //b is not defined 报错

<a href="javascript:void(0)">
```

