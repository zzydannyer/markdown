### 快捷键

| 快捷键               | 功能       | 备注                               |
| -------------------- | ---------- | ---------------------------------- |
| `Ctrl + Shift + I`   | 开发者工具 |                                    |
| `Ctrl + Shift + D`   | 切换布局   |                                    |
| `Ctrl +  [ / ]`      | 切换面板   |                                    |
| `Ctrl + Tab `        | 下个标签页 |                                    |
| `Ctrl + Shift + Tab` | 上个标签页 |                                    |
| `Ctrl + f `          | 查找       | Elements、Console、Network、Source |
| `Ctrl + Shif + P`    | 运行命令   | `Capture full size screenshot`截屏 |
|                      |            |                                    |
|                      |            |                                    |

#### console的使用

|                                  |                   |
| -------------------------------- | ----------------- |
| console.log('log')               |                   |
| console.info('info')             |                   |
| console.warn('warn')             |                   |
| console.error('error')           |                   |
| console.log({a,b,c})             | 解构赋值          |
| console.time('timer')            | console会损耗性能 |
| console.timeEnd('timer')         | 计算用时          |
| console.dir(obj)                 | 折叠对象属性      |
| console.table(obj)               | 表格化数据        |
| console.log(`%c ${a}`,'css样式') | 带样式的输出      |
| console.log('%o',obj)            | HTML格式输出      |
| console.log('%O',obj)            | 属性格式输出      |
|                                  |                   |

### 面板

| 面板       | 功能                           |
| ---------- | ------------------------------ |
| 元素面板   | 编辑DOM和CSS                   |
| 控制台面板 | 命令行交互                     |
| 源代码面板 | 断点调试、持久化保存           |
| 网络面板   | 网络请求、资源时间轴、网络带宽 |
| 性能面板   | 提高页面运行时性能             |
| 内存面板   | CPU、内存分析器                |
| 应用面板   | 检查所有资源，管理数据         |



### 通用技巧

#### copy(...)

通过copy()方法拿到资源，例如`copy(location)`、`copy($_)`、`copy($0)`

#### Store as global

右键点击log出来的变量·`Store as global variable`，通过使用这些变量来操作对应的数据，不用再担心影响到他们原来的值

#### Stack trace

右键将信息保存为一个文件

#### Copy HTML

右键复制或者直接`Ctrl + C/V`

#### 递增递减

| 快捷键    | step |
| --------- | ---- |
| ↑         | 1    |
| Shift + ↑ | 10   |
| Ctrl + ↑  | 100  |
| Alt + ↑   | 0.1  |

### 使用命令

#### 重置面板

运行`layout / 布局`命令

#### 切换主题

运行`theme / 主题` 命令

#### Snippets 片段

新建代码块 Ctrl + Enter 运行

> 也可以通过命令行 删除> 输入!查找片段

#### $符

Elements:

*  `$0`当前选中的节点，`$1`上一次选中的节点，`$2`以此类推

Console:

*  `$_`上一次执行的结果

* `$i` with [Chrome插件:Console Importer](https://link.juejin.cn/?target=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Fconsole-importer%2Fhgajpakhafplebkdljleajgbpdmplhie%2Frelated)安装npm包

  `$i('lodash')`、`$i('moment')`、`$i('react')`



### console.log

#### 打印对象

* `console` 中打印出的对象，在你打印出他内容之前，是以引用的方式保存的。

  解决方法：

  1. 打印一个从这个对象复制出来的对象。
  2. 使用资源面中的断点来调试
  3. 使用 `JSON.stringify()` 方法处理打印的结果
  4. 更多...

### 异步console

* console默认被asyn包裹，可以直接await

  * `Storage` 系统的 **占用数** 和 **空闲数**

    ```js
    await navigator.storage.estimate()
    ```

  * 获取电池信息

    ```js
    console.table(await navigator.getBattery())
    ```

  * 媒体信息

    ```js
    console.table(await navigator.mediaCapabilities.decodingInfo(query))
    ```

  * 缓存req和res

    ```js
    await caches.keys()
    ```

    

  
