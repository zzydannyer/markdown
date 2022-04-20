#### chrome的使用
```shell
ctrl + Tab            //下个标签页
ctrl + Shift + Tab    //上个标签页
```

#### console的使用

```js
console.log('log')
console.info('info')
console.warn('warn')
console.error('error')

console.log({a,b,c})    //解构赋值

console.time('timer')
...    //console会损耗性能    
console.timeEnd('timer')    //计算用时

console.dir(obj)    //折叠对象属性
console.table(obj)    //表格化数据

//格式化输出
console.log(`%c ${a}`,'css样式')    //带样式的输出
console.log('%o',obj)    //HTML格式输出
console.log('%O',obj)    //属性格式输出
```