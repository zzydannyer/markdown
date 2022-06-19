### 一、项目搭建

#### 初始化

* 初始化项目

  ```shell
  $ npm init -y
  ```

* 局部安装vue-cli

  ```shell
  $ npm install @vue/cli -D
  ```

* 查看版本

  ```shell
  $ npx vue -V
  ```

* 创建项目（`-m npm` 使用`npm`创建）

  ```shell
  $ npx vue create <project-name> 
  ```

* 安装依赖

  ```shell
  $ npm install element-plus -S
  $ npm install sass -S
  $ npm install axios -S
  $ npm install vue-router -S
  ```
  
  

### 二、项目配置

#### vue.config.js

* 添加配置[配置参考 | Vue CLI (vuejs.org)](https://cli.vuejs.org/zh/config/#devserver)

  ```js
   devServer: {
      open: true,
      host: 'localhost'
   }
  ```

  

