# Nodejs

## nvm

|                                     |                                                       |
| ----------------------------------- | ----------------------------------------------------- |
| `nvm install stable`                | 安装最新稳定版 node                                   |
| `nvm install / uninstall <version>` | 安装 / 删除指定版本                                   |
| `nvm use <version>`                 | 切换使用指定的版本node                                |
| `nvm ls`                            | 列出所有安装的版本                                    |
| `nvm ls-remote`                     | 列出所有远程服务器的版本                              |
| `nvm current`                       | 显示当前的版本                                        |
| `nvm alias <name> <version>`        | 给不同的版本号添加别名                                |
| `nvm unalias <name>`                | 删除已定义的别名                                      |
| `nvm reinstall-packages <version> ` | 在当前版本node环境下，重新全局安装指定版本号的 npm 包 |
| `nvm alias default [node版本号]`    | 设置默认版本                                          |

## npm、yarn、pnpm

#### 初始化

```shell
npm init 
```

#### 快速删除node_modules

```shell
rmdir /s/q node_modules 
```

#### 清除npm缓存

```shell
npm cache clear --force / npm cache clear -f
```

#### 命令

| npm                                            | pnpm                   | yarn               |
| ---------------------------------------------- | ---------------------- | ------------------ |
| `npm install / i`                              | `pnpm install / i`     | `yarn`             |
| `npm i <pkg>`                                  | `pnpm add `            | `yarn add`         |
| `npm run <cmd>`                                | `pnpm `                | `yarn`             |
| `dependencies`                                 | `pnpm add <pkg>`       |                    |
| `devDependencies`                              | `pnpm add -D <pkg>`    |                    |
| `optionalDependencies`                         | `pnpm add -O <pkg>`    |                    |
| `path`                                         | `pnpm add -g <pkg>`    |                    |
| 标记为 `next` 的版本                           | `pnpm add <pkg>@next`  |                    |
| 指定版本                                       | `pnpm add <pkg>@3.0.0` |                    |
| `npm cache clear --force / npm cache clear -f` |                        | `yarn cache clean` |
|                                                |                        | `yarn list `       |
| `npm info`                                     |                        | `yarn info`        |
|                                                | `npm i -g pnpm@next-7` | `npm i -g yarn`    |
| `npm init`                                     |                        | `yarn init`        |
| `npm update`                                   |                        | `yarn upgrade`     |
| `npm unistall`                                 |                        | `yarn remove`      |
|                                                |                        |                    |
|                                                |                        |                    |
|                                                |                        |                    |

### pnpm

* #### 使用 npm 安装

  ```powershell
  npm install -g pnpm@next-7
  ```

* #### 更新

  ```powershell
  pnpm add -g pnpm
  ```

* #### 兼容性

  | Node.js    | pnpm 4 | pnpm 5 | pnpm 6 | pnpm 7 |
  | ---------- | ------ | ------ | ------ | ------ |
  | Node.js 10 | ✔️      | ✔️      | ❌      | ❌      |
  | Node.js 12 | ✔️      | ✔️      | ✔️      | ❌      |
  | Node.js 14 | ✔️      | ✔️      | ✔️      | ✔️      |
  | Node.js 16 | ?️      | ?️      | ✔️      | ✔️      |
  | Node.js 18 | ?️      | ?️      | ✔️      | ✔️      |

## npx

查看sass版本

```bash
npx node-sass -v
```



### 版本问题

#### node-sass版本

| Nodejs           | node-sass      | sass-loader | Node Module |
| ---------------- | -------------- | ----------- | ----------- |
| Node 17          | 7.0+           |             | 102         |
| Node 16, ^16.4.0 | 6.0+, ^6.0.1   | ^10.0.1     | 93          |
| Node 15          | 5.0+, ^5.0.0   | ^10.1.1     | 88          |
| Node 14          | 4.14+, ^4.14.1 | ^7.3.1      | 83          |
| Node 13          | 4.13+, < 5.0   |             | 79          |
| Node 12          | 4.12+          |             | 72          |
| Node 11          | 4.10+          |             | 67          |
| Node 10          | 4.9+, < 5.0    |             | 64          |
| Node 8           | 4.5.3+, <5.0   |             | 57          |
| Node < 8         | < 5.0          |             | <57         |

#### 重装node-sass sass-loader

```bash
npm uninstall node-sass sass-loader
npm install node-sass@4.14.1 sass-loader@7.3.1 -D
npm install
npm rebuild
```



### npm报错

#### npm intall / npm i 报错

```shell
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

原因：系版本问题

解决方案：

1. 在命令后加上`--legacy-peer-deps`

2. 使用低版本npm

   ```shell
   npx -p npm@版本号 npm i --legacy-peer-deps
   ```

## EventLoop

* nodejs将任务分成六类，分阶段调用，node会不停循环处理事件，这个过程称为事件循环
  1. `timer `(setTimeout)
  2. `I/O callbacks`
  3. `idle、 preoare`
  4. `poll`轮询，停留时间最，可随时离开
     *  主要处理I/O事件，node不停询问系统有无文件数据，网络数据等
     * 如果node发现timer事件快到了或者有`setImmediate`事件，就会主动离开此阶段
  5. `check`，处理`setImmediate`事件
  6. `close callback`
* process.nextTick
  * node11之前会在队尾执行
  * node11之后在任务间隙插队执行

## express

### 安装

* 全局安装

  ```shell
  npm install express-generator -g
  ```

* 进入项目目录

  ```shell
  express --view=ejs server
  ```


## fs

### 创建文件

#### fs.writeFile()

```js
fs.writeFile('newfile.txt', 'content', (err) =>{ 
  //有文件则覆盖掉内容，没有则创建文件再写入内容
  if (err) throw err; 
});
```

#### fs.appendFile()

```js
fs.appendFile('newfile_2.txt', 'content', (err) =>{ 
  //不会覆盖掉原文件的内容
  if (err) throw err; 
});
```

#### fs.open()

```js
fs.open('newfile_3.txt', 'w', (err, file) =>{ 
  if (err) throw err; 
});
```

### 创建文件夹

#### fs.mkdir()

```js
fs.mkdir('./test', (err) =>{
 if(err) console.log(err)
 console.log('创建成功')
}) 
```

### 删除文件

#### fs.unlink()

```JavaScript
fs.unlink('./tests.js', (err,data) =>{
   if(err) console.log(err);
   console.log('删除成功')
})
```

###  删除文件夹

#### fs.rmdir()

```JavaScript
fs.rmdir('module', (err,data) =>{
  //删除文件夹，要删除的文件夹的必须是空的
  if(err) console.log(err);
  console.log(data)
})
```

###

### 判断文件夹或文件

#### fs.stat()

```js
fs.stat('./module', (err,data) =>{
   if(err) console.log(err)
   if(data.isFile()){
       console.log('./module是文件')
   }else{
       console.log('./module是文件夹')
   }
})
```

### 读取文件

#### fs.readFile()

```js
fs.readFile('./tests.js', (err,data) =>{
  if(err) console.log(err);
  //因为读取出来的内容是十六进制的，所以我们需要使用toString方法转换为字符串
  console.log(data.toString());
})
```

### 读取文件夹

#### fs.readdir()

```JavaScript
fs.readdir('./module', (err,data) =>{
  if(err) console.log(err);
  //data是一个数组包含了文件夹里的文件和文件夹
  console.log(data)
})
```

### 重命名文件

#### fs.rename()

```JavaScript
 fs.rename('./tests.js', './module/inde.js', (err,data) =>{
  //对文件重命名，并且移动文件
  //第一个参数是要重命名的文件，第二个文件是要移动的路径和新的名称
  if(err) console.log(err);
  console.log(data)
})
```

### 流读取

#### fs.createReadSteam()

```JavaScript
const reader = fs.createReadStream('./tests.js');
reader.on('data', data =>{
   console.log(data. toString(), 'data')
})
reader.on('end', () =>{
  
})
```

### 流写入

#### fs.createWriteSteam()

```JavaScript
const stream = fs.createWriteStream('./tests.js');
stream.write('var cod=3;'); //写入内容，会覆盖掉原文件的内容
stream.end();
stream.on('finish',()=>{
   //监听写入完成
   console.log('写入完成')
})
```

### 管道流

#### .pipe()

```JavaScript
const reader = fs.createReadStream('./tests.js');
const stream = fs.createWriteStream('./aa.js');
//读取一个文件的内容写入到另一个文件中
reader.pipe(stream)
```

### 文件真实路径

#### fs.realpath

```js
fs.realpath('./test.js', (err,data) =>{
       if(err) console.log(err);
       console.log(data);
})
```

