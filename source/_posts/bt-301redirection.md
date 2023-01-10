---
title: 宝塔BT面板301重定向不带www跳转教程
reprint: false
tags:
  - 咨询
  - 技巧
categories:
  - Guide
date: 2020-03-05 12:36:32
cover:
coverWidth:
coverHeight:
---

网站统一URL有利于SEO，宝塔BT面板自带301重定向功能，将不带www的域名跳转到带www的域名，LAMPLNMP分享宝塔面板301重定向教程两种：

## 宝塔301重定向后台自带功能

宝塔面板后台自带了301重定向功能，可以帮助我们将域名进行www和不带www之间的跳转转换。

1. 登录到宝塔面板后台：`http://[ip address]:8888`
2. 点击左侧“网站”，找到需要设置的域名，点击右侧的“设置”；
3. 点击切换到“301重定向”选项卡，如下图所示：

![重定向](/images/c866b7f8b206ccc1c0cf5bef8d794e42.png)

上述设置方法，是将不带www的域名301重定向到带www的域名上，至此宝塔面板301重定向跳转完成。

## 代码设置301重定向

通过编写宝塔面板后台自带的伪静态规则实现301重定向，将不带www跳转到带www域名规则：

```nginx
if ($host ~ '^shiux.com')
{return 301 http://www.shiux.com$uri;}
```

点击切换到“伪静态”选项卡，如下图所示：

![伪静态](https://i.loli.net/2020/03/05/SPXBElKu8kjGDMa.png)

至此，宝塔面板301重定向教程完毕。

<http://www.lamplnmp.com/baota/440/>
