# Uniapp

### 注意事项

1. HbuilderX运行到微信开发者工具
   *  wxdeveloper设置 -> 安全设置 -> 打开服务端口
   * 需要在manifest.json中设置APPID
2. iconfont图标
   * 引入iconfont.ttf，配置时去掉`&#x`，加上`\u`
3. rpx
   * `28rpx = 14px`

### 目录结构

```
┌─uniCloud            云空间目录，阿里云为uniCloud-aliyun,腾讯云为uniCloud-tcb（详见uniCloud）
│─components          符合vue组件规范的uni-app组件目录
│  └─comp-a.vue       可复用的a组件
├─hybrid              App端存放本地html文件的目录，详见
├─platforms           存放各平台专用页面的目录，详见
├─pages               业务页面文件存放的目录
│  ├─index
│  │  └─index.vue     index页面
│  └─list
│     └─list.vue      list页面
├─static              存放应用引用的本地静态资源（如图片、视频等）的目录，注意：静态资源只能存放于此
├─uni_modules         存放[uni_module](/uni_modules)。
├─wxcomponents        存放小程序组件的目录，详见
├─nativeplugins       App原生插件 详见
├─unpackage           非工程代码，一般存放运行或发行的编译结果
├─main.js             Vue初始化入口文件
├─App.vue             应用配置，用来配置App全局样式以及监听 应用生命周期
├─manifest.json       配置应用名称、appid、logo、版本等打包信息，详见
├─pages.json          配置页面路由、导航条、选项卡等页面类信息，详见
└─uni.scss            这里是uni-app内置的常用样式变量 
```

### 常见问题

#### 获取标题栏高度

* 先获取状态栏高度，在获取圆角按钮坐标，计算得出==标题栏高度 = 圆角底部坐标 + 圆角顶部坐标 - 2 * 状态栏高度==

  ```js
  onLoad(){
     uni.getSystemInfo({
         success: res => {
  			let statusBarHeight = res.statusBarHeight; //状态栏高度
  			let menuButton = wx.getMenuButtonBoundingClientRect(); //圆角按钮坐标
  			let titleBarHeight = menuButton.bottom + menuButton.top - statusBarHeight * 2; //标题栏高度
         }
     })
  }
  ```


#### rpx转化px

* ```js
  uni.upx2px(80)
  ```

#### 底部横条遮挡

* ```scss
  padding-bottom: env(safe-area-inset-bottom);
  ```

  


#### 真机环境

* `//`不能省略

  ```js
  // #ifdef MP 小程序
  // #endif
  // #ifdef H5 H5
  // #endif
  // #ifdef APP-PLUS APP
  // #endif
  ```

  

