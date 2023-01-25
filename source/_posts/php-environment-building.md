---
title: PHP环境搭建
reprint: false
date: 2019-09-10 08:37:14
tags:
  - 技巧
categories:
  - Guide
cover:
coverWidth:
coverHeight:
---

## XAMPP简介

XAMPP（Apache+MySQL/MariaDB+PHP+Perl）  

开头的X代表X-OS，代表可以在任何常见操作系统下使用，包括Windows、Mac、Linux，开源平台。

XAMPP（Apache+MySQL+PHP+PERL）是一个功能强大的建站集成软件包。这个软件包原来的名字是 LAMPP，但是为了避免误解，最新的几个版本就改名为 XAMPP 了。它可以在Windows、Linux、Solaris、Mac OS X 等多种操作系统下安装使用，支持多语言：英文、简体中文、繁体中文、韩文、俄文、日文等。

许多人通过他们自己的经验认识到安装 Apache 服务器是件不容易的事儿。如果您想添加 MySQL、PHP 和 Perl，那就更难了。XAMPP 是一个易于安装且包含 MySQL、PHP 和 Perl 的 Apache 发行版。XAMPP 的确非常容易安装和使用：只需下载，解压缩，启动即可。

**官网** - <https://www.apachefriends.org/zh_cn/index.html>

上面的是官方地址，100多M，很快就下好了。

## 安装XMAPP

1. 首先我在D盘创建了一个文件夹XMAPP，然后在XMAPP创建了三个文件夹。  
![](https://img-blog.csdnimg.cn/20181111120338184.png)
package目录存放软件安装包
path目录存放软件安装目录
`virtualhost`目录是虚拟主机,也就是应用目录
2. 首先下载好XMAPP，放到一个位置，我放在`D:\XAMPP\package`这个位置的。  
3. 然后双击，进入安装界面，一直next...。
我将安装路径选择了D:\XAMPP\path
4. 直到安装完毕是这个样子的。
![](https://img-blog.csdnimg.cn/2018111112100880.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2d1b2Jpbmh1aQ==,size_16,color_FFFFFF,t_70)

## 配置虚拟主机

1. 然后我在`D:\XMAPP\virtualhost`中新建了一个文件`index.php`
![](https://img-blog.csdnimg.cn/20181111121229408.png)
很简单的一个函数，就当做首页了吧
2. 找到`XAMPP的安装目录==>apache==>conf==>extra`
然后用编辑器打开`httpd-vhosts.conf`
在文件的最下面写如下代码：

```html
<VirtualHost *:80>
    ServerName ceshi.com
    DocumentRoot "D:/XAMPP/virtualhost"
    <Directory "D:/XAMPP/virtualhost"> 
        Options FollowSymLinks IncludesNOEXEC Indexes
        DirectoryIndex index.html index.htm index.php
        AllowOverride all 
        Order Deny,Allow 
        Allow from all 
        Require all granted
    </Directory>
</VirtualHost>
```

## 修改hosts文件

进入`C盘==>Windows==>system32==>drivers==>etc==>hosts`文件

![](https://img-blog.csdnimg.cn/20181111121715261.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2d1b2Jpbmh1aQ==,size_16,color_FFFFFF,t_70)

在hosts文件添加一行配置即可==>127.0.0.1 主机名

## 测试是否XAMPP成功运行

1. 先打开`Apache`
![](https://img-blog.csdnimg.cn/2018111112185328.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2d1b2Jpbmh1aQ==,size_16,color_FFFFFF,t_70)
2. 在浏览器中输入 主机名==>我的主机名为：localhost

现在XAMPP就安装并配置好了。
