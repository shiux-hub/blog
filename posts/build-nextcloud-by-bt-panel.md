---
title: 使用宝塔面板和NextCloud搭建私有云/网盘图文教程
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

## 简介

NextCloud是一款自由 (开源) 的类Dropbox软件，由ownCloud分支演化形成。它使用PHP和JavaScript编写，支持多种数据库系统，比如`MySQL/MariaDB`、`PostgreSQL`、`OracleDatabase`和`SQLite`。它可以使你的桌面系统和云服务器中的文件保持同步，NextCloud为Windows、[Linux](https://www.linuxprobe.com/)、Mac、Android以及IOS都提供了客户端支持。

NextCloud并非只是Dropbox的克隆，它还提供了很多附加特性，如日历、联系人、计划任务以及流媒体`Ampache`。 在这篇文章中，我将向你展示如何在`宝塔面板`服务器中安装和配置最新版本的`NextCloud 18.1`。我会通过`Nginx`和`PHP7-FPM`来运行`NextCloud`，同时使用`MariaDB`做为数据库系统。

![NextCloud](https://i.loli.net/2020/02/19/VZmg2MXO1ApN6tD.jpg)

## 安装NextCloud的过程

1. 提前把域名解析到vps的IP。
2. 使用宝塔面板（宝塔面板官方网址：[点我进入](https://www.bt.cn/)）搭建好 php 环境，安装的时候选择lnmp环境，php7以上版本速度更快，效率更高。
3. 到这个地址 <https://NextCloud.com/install/> 下载 NextCloud 最新安装文件，打开后点击download，在弹窗中右键点击 Download NextCloud，复制链接地址。
4. 进入宝塔面板后台>>文件，选择网站根目录，点击远程下载后在弹窗中粘贴上面的下载地址，点击确定开始下载。安装文件才58M，几秒钟就下载完毕了。
![下载文件](https://i.loli.net/2020/02/19/m7Te8tIvoBCxwkW.png)
5. 刷新一下当前页面就看到下载后的NextCloud安装包了，在名字后面点击解压，会解压缩到NextCloud文件夹。进入这个文件夹，全选，剪切，回到网站根目录，粘贴所有（后台右上角），这样就把NextCloud的安装文件放到网站根目录了。
![解压文件](https://i.loli.net/2020/02/19/SzAQuNrMc5R1ikU.png)
   > 以上复制、剪切、粘贴的功能全都在宝塔面板后台的网页端完成的，不需要登陆服务器操作，确实很方便，即使没操作过的新手也能很快上手。
6. 打开域名就看到了创建管理员账号界面，输入管理员账号密码，数据库名和密码，数据库用户名。点击“安装完成”。
![登陆](https://i.loli.net/2020/02/19/AfFkQKYv6LRd4Ee.png)
7. 进入 NextCloud 后台界面。看到提示可以下载 PC 端、手机端、苹果系统的 app 使用。
8. 进入 `设置 -> 概览` 可以看到还有很多安全问题。

![报错](https://i.loli.net/2020/02/19/STcQfVUZYKCIe9B.png)

## 报错解决

采用LAMP架构安装NextCloud私有云盘是一个很简单的过程，但是由于是开源软件，难免会存在一些BUG和小问题，这里罗列了安装过程中可能会出现的一些问题并汇总，仅供参考。

先看一下我遇到的问题。

![报错](https://i.loli.net/2020/02/19/STcQfVUZYKCIe9B.png)

当时看到的时候头都大了，问题太多了，下面咱们来一一解决。

### 红色问题

- 您的数据目录和文件可以从互联网直接访问。`.htaccess` 文件不起作用。强烈建议您配置 `Web` 服务器，以便数据目录不再可访问，或者您可以将数据目录移动到 `Web` 服务器文档根目录。

解决方法是修改NextCloud绑定的网站配置文件，添加NextCloud常用目录禁止访问即可，加入下列代码

```nginx
location ~ ^/(?:build|tests|config|lib|3rdparty|templates|data) / {
  deny all;
}
```

![.htaccess修改](https://i.loli.net/2020/02/19/V7ZwytdpWP2L6Rk.png)

## 黄色问题

- PHP的安装似乎不正确，无法访问系统环境变量。`getenv("PATH")`函数测试返回了一个空值。请参照[安装说明文档](https://docs.nextcloud.com/server/18/go.php?to=admin-php-fpm)中的`PHP`配置说明查阅您服务器的PHP配置信息，特别是在使用`php-fpm`时。
  从宝塔文件管理，打开`/www/server/php/74/etc/php-fpm.conf`，在其尾部添加一行

  ```nginx
  env[PATH] = /usr/local/bin:/usr/bin:/bin:/usr/local/php/bin
  ```

  保存并重启PHP即可解决该问题。
  ![配置php-fpm](https://i.loli.net/2020/02/19/qcpvSMj8BO9tF5n.png)
- PHP 内存限制低于建议值`512MB`。
在**宝塔PHP配置修改**中把**脚本运行内存**修改为512MB以上就行。这里我修改为**1024MB**。然后点击保存即可。
![PHP配置](https://i.loli.net/2020/02/19/N1dTyMnQRXZujsI.png)
- HTTP请求头"**X-Content-Type-Options**"没有配置为"`nosniff`"。这是一个潜在的安全或隐私风险，我们建议您调整这项设置。
浏览器会根据响应头的Content-Type字段来分辨它们的类型。例如：”text/html”代表html文档，”image/png”是PNG图片，”text/css”是CSS样式文档。然而，有些资源的Content-Type是错的或者未定义。这时，某些浏览器会启用MIME-sniffing来猜测该资源的类型，解析内容并执行。设置为nosniff这个响应头则可以禁用浏览器的类型猜测行为

```nginx
add_header X-Content-Type-Options 'nosniff';
```

- HTTP 头 "X-XSS-Protection" 未包含 "1; mode=block"。这是一种潜在的安全或隐私风险，因此推荐调整此项设置。
用于启用浏览器的 XSS 过滤功能，以防止 XSS 跨站脚本攻击。

```nginx
add_header X-XSS-Protection '1;mode=block';
```

- 通过 HTTP 访问网站不安全。强烈建议您将服务器设置成要求使用HTTPS协议，请查阅安全贴士。

只需在宝塔面板中申请证书，并强制HTTPS即可。
