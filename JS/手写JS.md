## 手写instanceof

```javascript
function myInstanceOf ( obj, className) {
    const pointer = obj   /* 指针 */
    while(pointer){
        if ( pointer === className.prototype ){
           return true
        }
        pointer = pointer.__proto__
    }
    return false
}
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
