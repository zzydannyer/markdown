vue3.axios

* 安装

  ```shel
  $ npm i axios -S
  ```

* main.js中添加 / 注册

  ```js
  import axios from 'axios' 
  axios.defaults.baseURL = 'url'
  app.config.globalProperties.$http
  ```

* 使用

  ```js
  import { getCurrentInstance } from 'vue' 
  
  const { appContext } = getCurrentInstance();
  appContext.config.globalProperties.$http(...)
  ```

  