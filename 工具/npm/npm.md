## npm
<<<<<<< HEAD

npm init -y 初始化项目，生成package.json

## npm更新但版本号未变

npm全局默认安装路径：C:\Users\Administrator\AppData\Roaming
nodejs中的npm路径：C:\Program Files\nodejs\node_modules\npm
查看版本

```
npm -v
```

查看npm路径

```shell
npm root -g
where npm
npm config get prefix //npm路径
npm config ger cache //npm cache路径
```

初始化npm路径

```shell
npm config set prefix  "..."
npm config set cache  "..."
```

重新安装npm

```shell
npm install npm@latest -g
//不行就覆盖
npm install npm@latest -g --force
```

清除cache

```shell
npm cache clean -f
```
=======
npm init -y 初始化项目，生成package.json

>>>>>>> c38a18ae1c1d2ff4d33831d99dff05b2d05e0364
