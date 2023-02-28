# GIT

* 工作区
* 版本库
  * 暂存区
  * 分支

`gitee(github)`中的README.md文件不在本地代码目录中 

执行`git pull --rebase origin master`命令README.md拉到本地

### 提交流程 IDEA

提交 - 提取 - 变基 - 推送

* 变基修改冲突

### 初始配置

右键`Git Bash Here`

```shell
git config --global user.name "用户名"
git config --global user.email "你的邮箱地址"
```

### 重命名

`git mv ` 命令用于重命名 文件，目录 或 符号链接。

```shell
git mv oldName newName
```

`git mv `命令其实是首先执行了 mv 命令，将旧文件重命名为新文件，接着删除旧文件，并使用 `git add `添加新文件。

```shell
1. mv oldName newName
2. git rm oldName
3. git add newName
```



### 常用命令

| 命令                         | 用途                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| `git clone`                  | 克隆仓库                                                     |
| `git init `                  | 初始化仓库                                                   |
| `git status`                 | 查看状态                                                     |
| `git ls-tree -r HEAD`        | 查看提交树                                                   |
| `git reset HEAD^`            | 回退到上一版本                                               |
| `git reset HEAD`             | 回退到当前版本----**将暂存区和HEAD的提交保持一致**           |
| `git reset --hard`           | 强制还原----**将工作区、暂存区和HEAD保持一致**               |
| ` git add -A `               | 提交==所有变化==                                             |
| `git add -u`                 | 提交被==修改(modified)==和被==删除(deleted)==文件，不包括新文件(new) |
| `git add .`                  | 提交==新文件(new)==和被==修改(modified)==文件，不包括被删除(deleted)文件 |
| `git log --stat`             | 查看提交的历史记录                                           |
| `git checkout branchname`    | 切换分支                                                     |
| `git checkout -b branchname` | 以当前分支为基础新建分支                                     |
| `git push origin branchname` | 把本地新建分支推送到远程                                     |
| `git checkout .`             | 放弃全部的修改                                               |
| `git checkout -- filename`   | 放弃某个文件的修改                                           |
| `git checkout -f`            | 强制放弃所有改动                                             |
| `git branch`                 | 列出所有的分支                                               |
| `git merge branchname`       | 合并分支                                                     |



### 修改远程仓库地址

* `git remote`查看所有远程仓库
  1. 通过命令直接修改远程地址
     `git remote set-url origin url`
  2. 通过命令先删除再添加远程仓库
     `git remote rm origin`
     `git remote add origin  *url`*

### 添加多个远程仓库

* `git remote add`添加远程仓库

  ```shell
  git remote add name https://xxx
  //或者
  git remote rm name //先删除仓库
  git remote set-url --add name https://xxx
  ```

* 也可以直接修改文件`.git/config `找到`[remote]` 

### **仓库**

| 命令                             | 用途                   |
| -------------------------------- | ---------------------- |
| `git remote -v   `               | 查看已有连接的远程仓库 |
| `git remote remove origin url`   | 取消已连接的远程仓库   |
| `git pull origin 分支名: master` | 推送到指定分支         |
| `git remote rm origin`           | 移除仓库               |



### 不提交指定文件

1. 右键 **git Bash Here**

2. ```shell
   $ touch .gitignore
   ```

3. 在生成的 `.gitignore` 文件里配置要忽略文件目录 如：**node_modules/**

### 撤销 commit

|                            |                                                 |
| -------------------------- | ----------------------------------------------- |
| `git reset --soft 版本号`  | 不删除工作区代码，撤销commit，不撤销git add     |
| `git reset --mixed 版本号` | 不删除工作区代码，撤销commit，==撤销git add==   |
| `git reset --hard 版本号`  | ==删除工作区代码==，撤销commit，==撤销git add== |

### 删除已提交文件

* 删除文件

  ```shell
  git rm --cached [path]
  ```

  

* 删除文件夹以及文件夹中的所有文件

  ```bash
  git rm -r --cached [path]
  ```

  

## 问题报错

### Git: fatal: will not add file alias xxx(XXX already exists in index)

```shell
Git: fatal: will not add file alias xxx(XXX already exists in index)
```

* 原因：改了**文件名大小**写导致的

* 命令行输入 `git config --get core.ignorecase`，返回 true，默认忽略大小写

* 找到` .git `文件夹下的` config `文件，修改代码 `ignorecase = false`

  可以预先全局设置`git config --global core.ignore false`

  保存重启项目，提交代码

### 换行转义问题

```shell
warning: LF will be replaced by CRLF in ...

$ git config --global core.autocrlf false
```

* 存在**符号转义问题**，在 `windows `中的换行符为 `CRLF`， 而在` linux `下的换行符为` LF`，所以在执行` git add . `或`git deploy` 语句的时候可能就会出现这个错误

* 为 `true` 时，Git 会将你 add 的所有文件视为文本文件，将结尾的CRLF转换为LF，而 checkout 时会再将文件LF格式转为CRLF格式。

  为`false`时，line endings 不做任何改变，文本文件保持其原来的样子。

  为 `input` 时，add 时 Git 会把 CRLF 转换为 LF，而 check 时仍旧为 LF，所以 Windows 操作系统**不建议设置此值**。

### VSCode登录bad credentials

终端输入

```
git config --global credential.helper store
```

