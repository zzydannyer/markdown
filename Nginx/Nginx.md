### 配置Nginx

* `conf/nginx.conf`

  ```nginx
  location / {
              root   [dist];
              index  index.html index.htm;
      		try_files $uri $uri/ @router; #找指定路径下的文件，如果不存在，则转给哪个文件执行
          }
  location @router {
              rewrite ^.*$/ index.html last;
          }
  ```

* 测试：验证配置是否修改成功

  ```shell
  $ nginx -t -c [nginx.conf]
  ```

* 启动

  ```shell
  $ start nginx
  ```

* 停止

  ```shell
  $ nginx -s quit 等待任务结束停止
  $ nginx -s stop 强制停止
  ```

  

