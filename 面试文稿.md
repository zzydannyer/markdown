### 自我介绍

我从事前端大概有一年半的时间，刚毕业第一家公司做设计，机缘巧合/工作需要，参与到前端开发工作，也是边学习边做一些项目，刚开始也是写点静态页面，后来学习js、vue、项目都是vue开发的

目前比较熟悉vue2，写过vue3，也用uniapp写过小程序，独立搭建过vueli，vite项目，独立搭建项目，配置router和store，封装请求，开发页面，打包部署

### 简历

技术能力深度，对开源框架技术原理的了解，对业内难题的解决方案有一定实践

项目产生的价值，不关心实现的功能，着重优化方案，对页面加载及渲染速度进行优化

### 了解公司

个人发展、技术栈、负责的内容

### 技能

Htmlcss能凭经验和百度解决基础的页面布局、浏览器兼容问题和性能优化问题

Axios能封装拦截器并配置基础请求

uniapp，能使用其进行小程序开发Webpack基本loader的配置

使用过koa框架实现基本的CRUD接口

webpack在公司项目中的实践：使用vue-cli中的webpack

后台管理产品：打包成产品卖出

### 登录

使用js-md5进行密码加密md5(password)

验证码 百度使用canvas画布实现，定义一串字串A-Z0-9，随机生成4个，然后生成干扰线和干扰点，判断是否与输入值相等

#### 动态路由

Permission.js设置基本、普通管理员、超级管理员路由

通过store获取角色信息，将routes添加到store的state里设定的addRoutes[]

Router.beforeEach判断是否登录，登陆成功异步添加到addRoutes[]

然后router.addRoute()添加对应角色的路由

#### 住房入住退房

一个订单多张票，与房间进行绑定然后入住，房间信息显示入住时间

使用amap插件进行地址的选择

当天票绑定完才能绑定下一天的票，不同房型不能连续绑定

解决方案：对应房间设一个数组，包含不同房型，不同房型里面包含不同时间

退票页面根据login请求到的角色信息判断是否可点击退票按钮，普通用户需登录管理员账号

房间信息的添加和修改

包含 房型

其他已有项目，景区购票系统，闸机界面

时间插件使用momentjs

#### Echats功能的实现

//引入china.js

Mounted初始化图表实例

配置option，

设置title标题，tooltip提示文字，legend图例，xAxis，series数据

访问来源 - 饼图pie展示，直接访问，广告，搜索引擎、营销等信息

游客停留分布 - 散点图scatter展示，游客人数和停留天数的关系

### Html

Canvas和svg

Canvas绘制2d位图图形，svg绘制不规则矢量图，都用来绘制2d图形

Svg渲染慢，支持分层和事件，canvas性能好，更复杂

### Css

- 权重specificity !important > 内联 > id > 类class = 属性attribute = 伪类 > 标签type = 伪元素 > * 通配符

* 伪类` :firstchild`、 `:focus :active` 、`:hover` 伪元素` ::before`、 `::after `、`::selection`

- 兄弟选择器：

  * ` +`紧挨着的

  * ` ~`下边所有的

- 单双行`nth-child odd even`

- 长宽比例2：1  `padding:200%`

- `Bfc` 块级格式化上下文，触发`bfc：overflowhidden`、`display：flex`、`position`，触发后独立渲染区域，可用来清除浮动

- 块级margin高度塌陷

- 禁止选择`user-select: none` 禁止复制粘贴 禁用`oncopy`事件

- 盒模型

- 雪碧图 放置多个`http`请求 `background-position`

- `DataURL`生成小图标，可以通过`base64`表示，图片较小没必要再发http请求

- 图标 iconfont

- 左侧固定右侧自适应布局

  *  `flex-basic`固定 `flex-grow` / `flex 1` 

  *  `grid 300px 1fr`

### Js

原型链 __proto__指向构造函数的prototype属性,prototype的__proto__也一样

闭包 局部变量避免污染全局环境, 浏览器未销毁变量容易造成内存泄漏（IE6,IE7）

防抖节流

\- Commonjs同步 module.exports require

\- esmodule异步的 export import

### Http

- Http2.0 压缩头部 多路复用 1.0是文本格式 2.0是二进制格式长连接

强制缓存cache-controll  max-age

协商缓存

last-modified - 时间戳，精度是秒 ，通过ttime获取上次修改时间

e-tag - hash优先级更高 如有返回304

- 同源策略和跨域 协议域名端口相同才能访问，

- JSONP -通过 scripts标签...，只能get请求，无法监听状态码 

- Cors 简单请求，Access-Control-Allow-Origin 复杂请求
  1. 预请求option确认请求
  2. 然后实际请求

- 取消请求发送 AbortControl

- 状态码

  200成功 201 204 301永久重定向 302临时重定向 304协商缓存 400客户端错误 401 429 403无权限 404Not found 500服务端错误 502网关问题

- Promise，resolve返回一个promise对象

### 性能优化

- 图片懒加载
  1. 视图未到先不加载，`data-src`赋值给`src `
  2. `img.offsetTop < document.documentElement.scrollTop + clientHeight`
  3. ` imgs[i].src = imgs[i].dataset.src;`
  4. 调用`intersectionObserver()`

### Vue

组件通讯、eventbus、vuex

生命周期bforecrete，created，beforeMount，mounted，beforeDestory，destroyed，beforeUpdate，updated，keepalive activated，deactivated，errorCaptured

Object.defineProperty循环递归，proxy代理

2和3的区别

Proxy/defineProperty 生命周期的改变

treeshaking打包优化，生命周期，双向绑定defineproperty proxy，单节点和多节点fragement

### Vuerouter

hash和history模式，hashchange和historyAPI，需要后端进行重定向

全局守卫，局部守卫beforeEach，beforeEnter

路由懒加载 ()=>import

Jwt

### VueX 

State，mutation，getter，action，module

### Nodejs

 Npm

\- Koa中间件

Koa-parameter验证参数类型 koa-router配置路由 koa-cors处理跨域 jsonwebtoken生成token koa-boy配置上传

Koa-static设置的静态文件路径sequelize mysql操作数据库 bcryptjs加密密码

Eventloop

浏览器微任务宏任务

### Uniapp

码云游小程序首页商品列表购物车个人中心页面

账号密码登入 

手机登入 传手机号，发送验证码

第三方登入 传provide和openid

确认订单

### 为什么离职

朋友建议来上海发展

寻求更好的发展

六月份中旬才来，家里希望我留在家准备考公

朋友建议我来上海找找机会

### 缺点

容易钻牛角尖，耽误进度

先记录下来有空再去解决

团队融入较慢，能做的就是尽力做好自己能做的事情

 