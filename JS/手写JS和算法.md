## 手写instanceof

```js
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
}
const person = new Person('王五', 16)

function myInstanceOf(obj, className) {

    let pointer = obj   /* 指针 */
    while (pointer) {
        if (pointer === className.prototype) {
            return true
        }
        pointer = pointer.__proto__
    }
    return false
}

console.log(myInstanceOf(person, Array));
```

## 手写Call

```javascript
Function.prototype.myCall = function( ) {
    const args = Array.from( arguments ) /*把传参转化为真正的数组*/
    const t = args.shift()         /*拿到数组第一项，会改变原数组*/
    const t.fn= this               /*拿到调用myCall的方法*/
    const res = t.fn(...args)      /*改变this指向*/
    delete t.fn                    /*改变this后删除fn*/
    return res
}
```

## 手写Promise

~~~js
class HD {
    static PENDING = 'pending';
    static FULFILLED = 'fulfilled';
    static REJECTED = 'rejected';
    constructor(executor) {
        this.status = HD.PENDING;
        this.value = null;
        this.callbacks = [];
        try {
            executor(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            this.reject(error)
        }
    }
    resolve(value) {
        if (this.status == HD.PENDING) {
            this.status = HD.FULFILLED;
            this.value = value;
            setTimeout(() => {
                this.callbacks.map(callback => {
                    callback.onFulfilled(this.value)
                })
            })
        }

    }
    reject(reason) {
        if (this.status == HD.PENDING) {
            this.status = HD.REJECTED;
            this.value = reason;
            setTimeout(() => {
                this.callbacks.map(callback => {
                    callback.onRejected(this.value)
                })
            })
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : () => this.value
        onRejected = typeof onRejected === 'function' ? onRejected : () => this.value

        let promise = new HD((resolve, reject) => {
            if (this.status == HD.PENDING) {
                this.callbacks.push({
                    onFulfilled: value => {
                        this.parse(promise, onFulfilled(value), resolve, reject)
                    },
                    onRejected: value => {
                        this.parse(promise, onRejected(value), resolve, reject)
                    }
                })
            }
            if (this.status == HD.FULFILLED) {
                setTimeout(() => {
                    this.parse(promise, onFulfilled(this.value), resolve, reject)
                })
            }
            if (this.status == HD.REJECTED) {
                setTimeout(() => {
                    this.parse(promise, onRejected(this.value), resolve, reject)
                })
            }
        })
        return promise
    }
    //解耦
    parse(promise, result, resolve, reject) {
        if (promise == result) {
            throw new TypeError('chaining cycle detected')
        }
        try {
            if (result instanceof HD) {
                result.then(resolve, reject)
                // value => {
                //     resolve(value)
                // },
                // reason => {
                //     reject(reason)
                // })
            } else {
                resolve(result)
            }
        } catch (error) {
            reject(error)
        }
    }
    static resolve(value) {
        return new HD((resolve, reject) => {
            if (value instanceof HD) {
                value.then(resolve, reject)
            } else {
                resolve(value)
            }
        })
    }
    static reject(value) {
        return new HD((resolve, reject) => {
            reject(value)
        })
    }
    static all(promises) {
        const values = [];
        return new HD((resolve, reject) => {
            promises.forEach(promise => {
                promise.then(
                    value => {
                        values.push(value)
                        if (values.length == promises.length) {
                            resolve(values)
                        }
                    },
                    reason => {
                        reject(reason)
                    }
                )
            })
        })
    }
    static race(promises) {
        return new HD((resolve, reject) => {
            promises.map(promise => {
                promise.then(
                    value => {
                        resolve(value)
                    },
                    reason => {
                        reject(reason)
                    }
                )
            })
        })
    }
}
~~~

## 修改this指向

方案1：

```js
function bindThis(f，oTarget){
    return function (){
        return f.apply(oTarget,arguments);
        };
}
```

方案2：

```js
function bindThis(f，oTarget){
    return f.bind(oTarget);
}
```


方案3：

```js
function bindThis(f, oTarget) {
    return function(x,y){
        return f.call(oTarget,x,y);
    };
```

## 初级算法

#### 1. 生成 0 到指定值的数组

```js
const getArr = (startNum, endNum) => {
    let arr = [];
    for (let i=startNum; i<=endNum; i++){
        arr.push(i)
    }
    return arr
}

getArr(1, 4)
```



#### 2. 获取数组最大值

```js
const getArrMaxVal = (arr) => {
    return Math.max(...arr) //Math.max 和 min 传入参数序列
}

getArrMaxVal([1,6,3,4,6])
```

#### 3. 获取数组的最小值

```js
const getArrMinVal = (arr) => {
    return Math.min(...arr)
}

getArrMinVal([1,6,3,4,6])
```

#### 4. <font color=red>数组去重 *</font>

```js
//1. 使用filter过滤
const removeEqual = （arr) => {
    const result = arr.filter((item, index, self) => {
        return self.indexOf(item) === index;
    })
    return result
}

//2. 使用set
const removeEqual = (arr) => {
	const setArr = new Set(arr)
    const result = Array.from(setArr)
    return result 
}

removeRqual([1,4,4,5,6,8])
```



### 手写原生方法

#### 1. repeat

```js
String.prototype.repeat = function(n){
	let self = String(this)
    let str = ""
    for(let i=0; i<n; i++){
        str += self
    }
    return str
}
```



## 中级算法

#### 1. 斐波那契数列

>  Fibonacci sequence：0、1、1、2、3、5、8、13、21、34…

* `F(0)=0 , F(1)=1, F(n)=F(n-1)+F(n-2) (n >=2, n ∈ N*)`

  ```js
  const generateFib = (n) => {
      let fibArr = []
      let i = 0
      while(i < n){
          if(i<=1){
              fibArr.push(i)
          }else{
              fibArr.push(fibArr[i-1] + fibArr[i-2])
          }
          i++
      }
      return fibArr
  }
  
  generateFib(8)
  ```

* 求第n项

  ```js
  //1. 递归
  const fib = (num) => {
      if(num < 2) {
          return num
      }
      return fib(num-1) + fib(num-2)
  }
  
  //2. 动态规划
  const fib = (num) => {
      if(num < 2){
          return num
      }
      
      const numArr = [0, 1]
      for (let i=2; i<=num; i++){
          numArr.push(numArr[0] + numArr[1])
          numArr.splice(0,1)
      }
      return numArr[1]
  }
  
  fib(6)
  ```

#### 2. 正数组的最大差值

* 要求只能是右边的数减左边的数

```js
const getMaxProfit = (arr) => {
    let maxProfig = 0
    let minvalue = arr[0]
}

getMaxProfit([1,8,6,3,7])
```

#### 3. <font color=red>冒泡排序 *</font>

```js
const bubbleSort = (arr) => {
    for (let i=0; i<arr.length; i++){
        for (let j=0; j<arr.length-i; j++){
            let temp = arr[j+1]
            arr[j+1] = arr[j]
            arr[j] = temp
        }
    }
    return arr
}

bubbleSort([10,5,11,7,8,9])
```

#### 4. <font color=red>数组交集 *</font>

```js
const intersectionFn = (arr1, arr2) => {
	const result = arr1.filter(item1 => arr2.some(item2 => item1 === item2))
    return result
}

intersectionFn([1,2,3],[2,3,4,5,6])
```

#### 5. <font color=red> 数组补集 *</font>

* arr1中有arr2中没有或arr2中有arr1中没有的部分

```js
const complementFn = (arr1, arr2) => {
    const result = arr1.filter(item1 => arr2.every(item2 => item1 !== item2))
    return result
}

complementFn([1,2,3],[2,3,4,5,6])
```

#### 6. <font color=red> 数组并集 *</font>

* arr1和arr2共有的部分并去重

```js
const unionFn = (arr1, arr2) => {
    const result = arr1.concat(arr2.filter(item2 => arr1.every(item1 => item1 !== item2)))
    //arr1 合并 arr2中过滤出的arr1中没有的部分
    return result
}

unionFn([1,2,3],[2,3,4,5,6])
```

#### 7. 将对象数组中的key，value转换成对象键值对

```js
const data = [
	{key:'name', value:'tom'},
	{key:'age', value:'11'},
]
const res = {
    name:'tom',
    age:11
}

const processFn = (data) => {
    const result = {}
    for(let i=0; i<data.length; i++){
        const {key, value} = data[i]
        result[key] = value
    }
    return result
}

processFn(data)
```

#### 8. <font color=red>数组求和 *</font>

```js
const arrSum = (arr) => {
    const temp = arr.reduce((pre, cur) =>{
        return pre + cur
    },0)
    return temp
}

arrSum([1,2,4])
```

