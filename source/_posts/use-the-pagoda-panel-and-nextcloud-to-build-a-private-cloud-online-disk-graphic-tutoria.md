---
title: 使用宝塔面板和NextCloud 搭建私有云/网盘图文教程
reprint: false
tags:
  - MySQL
  - NextCloud
  - NGINX
  - PHP
  - 笔记
categories:
  - Linux
date: 2020-02-19 12:17:23
cover:
coverWidth:
coverHeight:
---

> **NextCloud 是一款自由 (开源) 的类 Dropbox 软件，由 ownCloud 分支演化形成。它使用 PHP 和 JavaScript 编写，支持多种数据库系统，比如 `MySQL/MariaDB`、`PostgreSQL`、`OracleDatabase`和 `SQLite`。它可以使你的桌面系统和云服务器中的文件保持同步，NextCloud 为 Windows、[Linux](https://www.linuxprobe.com/)、Mac、安卓以及苹果手机都提供了客户端支持。**

`NextCloud`并非只是`Dropbox`的克隆，它还提供了很多附加特性，如日历、联系人、计划任务以及流媒体`Ampache`。 在这篇文章中，我将向你展示如何在`宝塔面板`服务器中安装和配置最新版本的`NextCloud 18.1`。我会通过`Nginx`和`PHP7-FPM`来运行`NextCloud`，同时使用`MariaDB`做为数据库系统。

![NextCloud](https://i.loli.net/2020/02/19/VZmg2MXO1ApN6tD.jpg)

## 安装 NextCloud 的过程

1. 提前把域名解析到 vps 的 IP。
2. 使用宝塔面板（宝塔面板官方网址：[点我进入](https://www.bt.cn/)）搭建好 php 环境，安装的时候选择 lnmp 环境，php7 以上版本速度更快，效率更高。
3. 到这个地址 <https://NextCloud.com/install/> 下载 NextCloud 最新安装文件，打开后点击 download，在弹窗中右键点击 Download NextCloud，复制链接地址。
4. 进入宝塔面板后台>>文件，选择网站根目录，点击远程下载后在弹窗中粘贴上面的下载地址，点击确定开始下载。安装文件才 58M，几秒钟就下载完毕了。
![](https://i.loli.net/2020/02/19/m7Te8tIvoBCxwkW.png)
5. 刷新一下当前页面就看到下载后的 NextCloud 安装包了，在名字后面点击解压，会解压缩到 NextCloud 文件夹。进入这个文件夹，全选，剪切，回到网站根目录，粘贴所有（后台右上角），这样就把 NextCloud 的安装文件放到网站根目录了。
![](https://i.loli.net/2020/02/19/SzAQuNrMc5R1ikU.png)
   > 以上复制、剪切、粘贴的功能全都在宝塔面板后台的网页端完成的，不需要登陆服务器操作，确实很方便，即使没操作过的新手也能很快上手。
6. 打开域名就看到了创建管理员账号界面，输入管理员账号密码，数据库名和密码，数据库用户名。点击“安装完成”。
![](https://i.loli.net/2020/02/19/AfFkQKYv6LRd4Ee.png)
7. 进入 NextCloud 后台界面。看到提示可以下载 PC 端、手机端、苹果系统的 app 使用。
8. 进入 `设置 -> 概览` 可以看到还有很多安全问题。

![](https://i.loli.net/2020/02/19/STcQfVUZYKCIe9B.png)
