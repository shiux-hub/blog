---
title: Windows使用Laragon快速搭建开发环境
reprint: false
date: 2021-07-29 05:16:06
categories:
  - Windows
tags:
  - 笔记
cover: /images/a8548753808d6a162ab4dd816ab54652.png
coverWidth:
coverHeight:
---

## 简介

- 自动创建虚拟主机（Virtual Host，Valet 也有这样的功能）
- 邮件接收和发送
- 非常方便地切换环境的版本
- 轻松创建框架应用，如Laravel、Symfony、WordPress、Joomla等
- 基于自己的需求为不同的环境设置不同的配置

所以，从今天起，可以抛弃那些传统的集成开发环境了，Windows上也可以搭建优雅的开发环境！

**官网** - <https://laragon.org/>

## 安装

**GitHub** - <https://github.com/leokhoa/laragon/releases>

咱们在GitHub下载便携版，也就是后缀带`portable`的zip文件

![下载](/images/bd4774fa70ca0b2da7f1b88815cd2036.png)

解压后目录结构如下

![目录结构](/images/bba14809b65d76717f343828de7af3fe.png)

双击打开`laragon.exe`后界面如下

![主界面](/images/8561045e47da9ea4c35eb6dc44c2fef7.png)

点击右上角齿轮按钮，将`General->language`修改成`ChineseSimplified`可以将界面设置成中文。也可以对系统进行设置。

![语言设置](/images/705581308c69b8c1b38e1f8163ddea20.png)

要启动 Apache、MySQL 服务，需要点击启动所有按钮：

![启动服务](/images/e4ace6d02f78f9d53e502d2d7ba29dda.png)

这样点击网站即可打开浏览器访问默认站点`http://localhost`：

![打开默认地址](/images/60f39927c25aa38bc804e9a51ae7c454.png)

要访问数据库，可以点击数据库按钮：

![访问数据库](/images/9e50f907d906f7008728975b215948ad.png)

默认数据库是`Laragon`，用户名是`root`，密码是空字符串，点击打开按钮，就可以访问这个默认的数据库：

![管理数据库](/images/9aa9dcc52f0217305bd4519fdc6b038a.png)

当然你也可以使用其他自己喜欢的数据库客户端连接到这个数据库进行操作。

点击`Laragon`界面的终端按钮可以进入到一个类Unix的终端工具Cmder进行命令行操作：

![Cmder](/images/def61d48a1577c3225f892405ea64c2a.png)

最后，`Laragon`界面还有一个根目录按钮，点击之后即可进入文档根目录，我的Laragon放在F盘下，所以对应的文档根目录是 `{LARAGON_ROOT}\www`。

## 切换环境版本

你可以通过点击Laragon界面上的菜单来切换不同软件的版本：

![切换版本](/images/4f2c0140b44feaf87b363619363d2d24.png)

现在默认安装的Laragon每个软件都只有一个版本。

下面列出常用环境的官方下载地址

**Apache** - <http://httpd.apache.org/docs/current/platform/windows.html>
**Nginx** - <http://nginx.org/en/download.html>
**PHP** - <https://windows.php.net/download>
**MySQL** - <https://dev.mysql.com/downloads/mysql/>
**Composer** - <https://getcomposer.org/download/>
**MariaDB** - <https://mariadb.org/download/>
**phpMyAdmin** - <https://www.phpmyadmin.net/downloads/>
**Node.js** - <https://nodejs.org/zh-cn/download/>
**MongoDB** - <https://www.mongodb.com/download-center/community>
**Python** - <https://www.python.org/downloads/windows/>
**PostgreSQL** - <https://www.enterprisedb.com/downloads/postgres-postgresql-downloads>
**Go** - <https://golang.org/dl/>
**java** - <https://www.oracle.com/cn/java/technologies/javase-downloads.html>

以PHP为例如果想要支持多个版本的切换和测试，需要去下载不同版本（需要下载 Non Thread Safe 版本），然后将下载后的文件解压到`{LARAGON_ROOT}\bin\php`目录下：

![下载PHP](/images/e363188312ba4c643a681a818015633b.png)

这样就可以进行版本切换了：

![切换PHP版本](/images/e13ada7438d92d54c957c424ac3b30cf.png)

切换 MySQL 和 Apache 的版本也是类似，这里不再赘述，一般这种场景也不多。

## 注意事项

1. 如果提示端口已被占用，可以修改端口，可以参考下图示例
![修改端口](/images/9b21f3802ad658ac382a8a0e9465eda9.png)

2. 如果提示dll文件缺失，下载运行库安装重启即可。
**三方下载地址** - <http://dreamcast2.ys168.com/>

## 更多功能

Laragon还有更多功能等着你去挖掘，比如也支持基于 Ngrok 进行站点分享，支持 Node、Putty、Yarn、文件传输等等，欢迎你在使用的过程中与我分享。
