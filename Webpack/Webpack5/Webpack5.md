# Webpack5

```js
/* 安装webpack */
$ pwd - /* person work directory 当前目录 */
$ npm install webpack webpack-cli --save-dev /* 本地安装webpack  */
$ npm install/uninstall webpack webpack-cli --global 
  /* 全局安装/卸载 webpack !不推荐全局安装webpack */

/* 获取权限 */
$ get-ExecutionPolicy /* Restricted：禁止 RemoteSigned：拥有权限*/
$ set-ExecutionPolicy RemoteSigned /* 获取权限 */

/* 文件配置 */
$ npm init -y /* npm 配置文件 */
$ webpack --stats detailed /* 查看打包的详细配置 */
$ webpack /* 全局安装前提下的打包 */
$ npx webapck /* 本地安装前提下的打包 */
$ npx webpack 
	--entry ./src/index.js /* 指定入口文件 */
	--mode production /* 指定环境 */
    
/* webpack.config.js配置 */
```

