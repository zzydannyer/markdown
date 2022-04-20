#### vue2响应式原理

通过**发布订阅**和**数据劫持**的方式实现

```js
/* 订阅器模型 */
let Dep = {
    clientList:{} /* 容器 */
    /* 添加订阅 */
    listen:function(key,fn){
       (this.clientList[key]||(this.clientList[key]=[])).push(fn);/* 短路表达式 */
    }
	/* 添加订阅 */
	trigger:function(){
        let key = Array.prototype.shift.call(arguments),
            fns = this.clientList[key];
        if(!fns||fns.length===0){
            return false
        }
        for(let i=0, fn;fn =fns[i++];){
            fn.apply(this, arguments)
        }
    }
}
/* 数据劫持 */
let dataBase = function({data, tag, datakey, selector}){
    let value = '',	/* 获取响应数据的值*/
        el = document.querySelector(selector); /* 获取元素 */
    
    Object.defineProperty(data, datakey,{
        get:function(){
            return value;
        },
        set:function(val){
            value = val
            /* 发布 */
            Dep.trigger(tag, val)
        }
    })
    /* 订阅 */
    Dep.listen(tag, function(text){
        el.innerHTML = text
    })
}

/* 使用 */
let obj = {}
dataBase({
    data:obj,
    tag:'tag1',
    datakey:'key1',
    selector:'.box-1'
})
dataBase({
    data:obj,
    tag:'tag2',
    datakey:'key2',
    selector:'.box-2'
})
obj.key1 = 'value1'
obj.key2 = 'value2'
```

