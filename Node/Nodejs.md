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

## npm

### 初始化

```shell
npm init 
```



### 快速删除node_modules

```shell
rmdir /s/q node_modules 
```



### 清除npm缓存

```shell
npm cache clear --force / npm cache clear -f
```

### 命令

| npm 命令               | pnpm 等价命令           |
| ---------------------- | ----------------------- |
| `npm install`          | `pnpm install / pnpm i` |
| `npm i <pkg>`          | `pnpm add `             |
| `npm run <cmd>`        | `pnpm `                 |
| `dependencies`         | `pnpm add <pkg>`        |
| `devDependencies`      | `pnpm add -D <pkg>`     |
| `optionalDependencies` | `pnpm add -O <pkg>`     |
| `path`                 | `pnpm add -g <pkg>`     |
| 标记为 `next` 的版本   | `pnpm add <pkg>@next`   |
| 指定版本               | `pnpm add <pkg>@3.0.0`  |



## pnpm

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

  

