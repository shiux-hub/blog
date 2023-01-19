---
title: MySQL8 全平台安装教程
reprint: false
date: 2021-08-05 16:49:12
categories:
  - Guide
tags:
  - APP
  - MySQL
  - 笔记
cover: /images/2335e36389c0893a326ad331200ce78d.png
coverWidth:
coverHeight:
---

## MacOS安装`MySQL8`

MacOS安装MySQL的方法主要分为两种。分别是：

### 官网下载安装

1. 首先登陆[mysql](https://dev.mysql.com/downloads/mysql/)官网，下载`dmg`安装包，也就是图片中的第一个。

![](https://i.loli.net/2021/08/17/u3LTGozRjWS7Mxq.png)
![](https://i.loli.net/2021/08/17/fHXg6mwJzRSOeU5.png)
点最下面的**No thanks**即可。
![](https://i.loli.net/2021/08/17/5vtZsQPcN6hVg1X.png)
下载好了之后，长这样。双击打开。
![](https://i.loli.net/2021/08/17/sYbkJ7wotQd6Eza.png)
再次双击进行安装
2. 下载完成后，点安装，一路点“继续”，直到

![](https://i.loli.net/2020/02/14/ksVqxNF4TPduafC.png)
这里选择第二个。 初步安装成功，这里自己设置的密码要记住，以后连数据库都要用。
3. 如何配置

进入系统偏好，打开`mysql` 看一下是不是打开的，一般安装默认安装好了就打开的。 是绿色的就代表是开启状态，这个启动选项可以不选。
![](https://i.loli.net/2020/02/14/keyfSD8ErwQPnKp.png)
![](https://i.loli.net/2020/02/14/l7oiJAS6D5B4zMt.png)
4. 打开终端

输入：`cd /usr/local/mysql`，回车执行

然后输入：`sudo vim .bash_profile`，回车执行 需要输入`root`用户密码。`sudo`是使用`root`用户修改环境变量文件。

进入编辑器后，我们先按”i”，即切换到“插入”状态。就可以通过上下左右移动光标，或空格、退格及回车等进行编辑内容了，和`WINDOWS`是一样的了。

在文档的最下方输入：`export PATH=${PATH}:/usr/local/mysql/bin` 然后按`Esc`退出`insert`状态，并在最下方输入:wq保存退出(或直接按shift+zz，或者切换到大写模式按ZZ，就可以保存退出了)。

输入：`source .bash_profile` 回车执行，运行环境变量。 再输入`mysql`命令`mysql -u root -p`，即可使用。
5. 以后每次使用的话，打开终端输入`/usr/local/mysql/bin/mysql -u root -p`即可使用。

### 使用Homebrew安装MySQL

1. Homebrew安装macOS下的Homebrew就相当于CentOS下的yum或者是Ubuntu下的apt-get

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. Homebrew安装与启动MySQL服务
   * 安装mysql

   ```bash
   brew install mysql
   ```

   * 配置并启动MySQL服务

   ```bash
   brew tap homebrew/services
   brew services start mysql
   ```

3. 修改root密码

   ```bash
   mysqladmin -u root password 'yourpassword'
   ```

4. MySQL安装测试

   * 查看MySQL版本

   ```bash
   #查看MySQL版本
   mysql -V

   #输出示例
   mysql Ver 8.0.19 for osx10.15 on x86_64 (Homebrew)
   ```

   * MySQL shell测试

   ```bash
   #进入MySQL shell
   mysql -u root -p

   #成功进入会输出以下信息
   # Welcome to the MySQL monitor.  Commands end with ; or \\g.
   # Your MySQL connection id is 12
   # Server version: 8.0.12 Homebrew

   #查看数据库
   mysql> show databases;

   #退出
   mysql> exit;
   ```
