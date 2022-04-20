### 处理Appx命令

* 以管理员权限运行

  ```powershell
  列出所有的卷
  Get-AppxVolume
  删除指定卷
  Remove-AppxVolume XXXXX
  ```


### VSCode终端管理员权限

* 先给安装文件夹下的启动文件设置以**管理员权限运行**

  ```shell
  > get-ExecutionPolicy
  Restricted 表示状态是禁止的
  > set-ExecutionPolicy RemoteSigned
  > Y
  ```

  