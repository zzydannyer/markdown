### **第一步：安装插件   ---   mini-program-iconfont-cli**
```
// Yarn
yarn add mini-program-iconfont-cli --dev

// Npm
npm install mini-program-iconfont-cli --save-dev
```
### **第二步：生成配置文件**
先执行npx iconfont-init ---   不然会报错，提示没有iconfont.json
只输入npx iconfont   ---   回车会提示相关命令供选择
```
npx iconfont-init
 
// 或者
 
npx iconfont-wechat
```

项目根目录会生成一个iconfont.json文件
* iconfont.json：
symbol_url   ---   Symbol链接
trim_icon_prefix："icon-"  ---   图标前缀省略
### **第三步：修改symbol_url的值**
 修改Symbol链接
### **第四步：生成小程序组件**
```
npx iconfont-wechat
```
根目录中生成了iconfont目录   ---   全局图标组件

### **第五步：注册iconfont组件并使用**
* 注册：可以在app.json文件中引入全局图标组件，避免每个page都去引入。
```
// 绝对路径
{
    "usingComponents": {
        "iconfont": "/iconfont/iconfont"
    }
}
```

*  使用：在.wxml文件中去使用
```
<iconfont name="icon_salary"></iconfont>
```

#### **补充1：修改iconfont图标大小**
* 在iconfont标签中加入size属性设置图标大小
* 在iconfont.json全局设置
![](images/screenshot_1622601065000.png)


#### **补充2：更新iconfont项目中的图标后**
如果图标修改了，需要更新参数symbol_url，再执行
```
npx iconfont-wechat
```
<<<<<<< HEAD

=======

>>>>>>> c38a18ae1c1d2ff4d33831d99dff05b2d05e0364
