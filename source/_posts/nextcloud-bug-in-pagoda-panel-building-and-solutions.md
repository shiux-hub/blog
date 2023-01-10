---
title: 宝塔面板搭建NextCloud安全问题及插件推荐
reprint: false
tags:
  - MySQL
  - NextCloud
  - PHP
categories:
  - Guide
date: 2020-02-19 17:59:52
cover:
coverWidth:
coverHeight:
---

终于要写这个了啊 采用LAMP架构安装NextCloud私有云盘是一个很简单的过程，但是由于是开源软件，难免会存在一些BUG和小问题，这里罗列了安装过程中可能会出现的一些问题并汇总，仅供参考。

先看一下我遇到的问题。

![](https://i.loli.net/2020/02/19/STcQfVUZYKCIe9B.png)

当时看到的时候头都大了，问题太多了，下面咱们来一一解决。

## 红色问题

- 您的数据目录和文件可以从互联网直接访问。`.htaccess` 文件不起作用。强烈建议您配置 `Web` 服务器，以便数据目录不再可访问，或者您可以将数据目录移动到 `Web` 服务器文档根目录。

  解决方法是修改nextcloud绑定的网站配置文件，添加nextcloud常用目录禁止访问即可，加入下列代码

  ```nginx
  location ~ ^/(?:build|tests|config|lib|3rdparty|templates|data) / {
    deny all;
  }
  ```

![](https://i.loli.net/2020/02/19/V7ZwytdpWP2L6Rk.png)

## 黄色问题

- PHP 的安装似乎不正确，无法访问系统环境变量。`getenv("PATH")`函数测试返回了一个空值。请参照[安装说明文档](https://docs.nextcloud.com/server/18/go.php?to=admin-php-fpm)中的`PHP`配置说明查阅您服务器的PHP配置信息，特别是在使用`php-fpm`时。

  从宝塔文件管理，打开`/www/server/php/74/etc/php-fpm.conf`，在其尾部添加一行

  ```nginx
  env[PATH] = /usr/local/bin:/usr/bin:/bin:/usr/local/php/bin
  ```

  保存并重启PHP即可解决该问题。

  ![](https://i.loli.net/2020/02/19/qcpvSMj8BO9tF5n.png)

- PHP 内存限制低于建议值 `512MB`。

在**宝塔PHP 配置修改**中把 **脚本运行内存** 修改为512MB以上就行。这里我修改为**1024MB**。然后点击保存即可。

![](https://i.loli.net/2020/02/19/N1dTyMnQRXZujsI.png)

- HTTP 请求头 "**X-Content-Type-Options**" 没有配置为 "`nosniff`"。这是一个潜在的安全或隐私风险，我们建议您调整这项设置。

浏览器会根据响应头的Content-Type字段来分辨它们的类型。例如：”text/html”代表html文档，”image/png”是PNG图片，”text/css”是CSS样式文档。然而，有些资源的Content-Type是错的或者未定义。这时，某些浏览器会启用MIME-sniffing来猜测该资源的类型，解析内容并执行。设置为nosniff这个响应头则可以禁用浏览器的类型猜测行为

```nginx
add_header X-Content-Type-Options 'nosniff';
```

> HTTP 头 "X-XSS-Protection" 未包含 "1; mode=block"。这是一种潜在的安全或隐私风险，因此推荐调整此项设置。

用于启用浏览器的 XSS 过滤功能，以防止 XSS 跨站脚本攻击。

```nginx
add_header X-XSS-Protection '1;mode=block';
```

> 通过 HTTP 访问网站不安全。强烈建议您将服务器设置成要求使用HTTPS协议，请查阅安全贴士。

只需在宝塔面板中申请证书，并强制HTTPS即可。
