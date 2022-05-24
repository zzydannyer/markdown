# Vue

### Reactivity

* 源码

```js
const depsMap = new Map()   /*创建一个dep集合*/

function track(key){                /*追踪函数*/
    let dep = depsMap.get(key)
    if(!dep){
        desMap.set(key, (dep = new Set()))
    }
    dep.add(effect)
}

function trigger(key){                /*触发函数*/
    let dep = depsMap.get(key)
    if(dep){
        dep.forEach(effect => {
            effect()
        })
    }
}
```

* 使用

```js
let product = { price:5, quantity:2 }
let total = 0

let effect = () => {
    total = product.price * product.quantity
}

track('quantity')
effect()
```

* ==WeakMap 的 key 是 Object==

```js
/*举例*/
const tagetMap = new WeekMap()
target.set(product, 'example code to test')
console.log(target.get(product))      /*example code to test'/
```

