---
title: AdGuard Home使用指南
reprint: false
date: 2022-12-31 01:43:51
categories:
  - Guide
tags:
  - APP
  - 技巧
  - AdGuard
cover: https://s2.loli.net/2022/12/31/i9u5cBvZbmr7p2w.png
coverWidth:
coverHeight:
---

## 简介

**AdGuard**是一系列用于Mozilla Firefox、Google Chrome、Opera、Apple Safari、Yandex Browser、Microsoft Edge等网页浏览器及跨平台内容过滤的广告拦截和隐私保护软件、开放源代码和共享软件的浏览器扩展程序产品，AdGuard允许用户使用阻止广告等页面元素的显示，借此保护Microsoft Windows、Mac OS、Linux、Android和iOS等操作系统用户免受不必要的广告、弹出窗口、视频、文字、横幅、跟踪、淫秽内容、恶意网站及软件和网络钓鱼的危害。据报道，2018年有超过500万人正在使用该软件。

**官网** - <https://adguard.com/zh_cn/welcome.html>

## 为什么用户不喜欢广告，以及追踪器？

一个好产品，需要广而告之，才能活下去，一部好影片，需要广而告之，才有好的票房。因此便有了广告。从最初的口口相传发展到今日的「千人千面、猜你喜欢」，广告已从单向的传播形式发展成为基于个人喜好专门投放，用户的接受权由主动变为被动。

![网页中的广告](https://s2.loli.net/2022/12/31/gRDMWT31bt7wNeC.png)

但当广告时时刻刻充斥在我们的生活，看新闻有贴片广告，刷朋友圈有欧巴的互动广告，看电视剧有90秒片头广告，小网站上还有*感荷官在线发牌，在《一千五百万个积点》中，男主居住在一个被屏幕环绕的房子里，屏幕全天候地播放广告，想要屏蔽广告只能选择付费，甚至在你屏蔽广告后还会提醒用户「为了网站的持续发展，请关闭广告屏蔽插件」，为了正常浏览网页，用户也只能妥协。

并非所有广告都是侵入性、影响用户体验的广告，其中不乏制作精良、体验良好的广告，在由The Coalition for Better Ads提出的[Better Ads Standards](https://www.betterads.org/standards/)中，边栏广告、小型贴片广告、顶栏 / 底部广告对用户的浏览体验影响较小，浮窗广告、大型/全屏贴片广告、自动播放的视频广告则会影响用户心情。而用户只能选择全部屏蔽，广告商的收益会受到极大的影响。除了广告，一并被屏蔽掉的还有信息收集与分析工具，如Google Analytics，此类工具可以在不过分侵犯用户隐私的前提下帮助网站主改善网站运营，提供更好的内容。

## 广告拦截/反追踪插件是如何起作用的？

广告拦截插件的实现原理大致可分为三种。

- Url 匹配屏蔽
- 流量过滤
- 网页 DOM 过滤

前两者属于Request Blocking，后者属于Page Code Filtering & CSS Injection and JavaScript。

### Url匹配屏蔽

广告联盟的广告资源通常会与网站站点分开放置，以百度联盟为例，百度联盟的广告域名为`https://cpro.baidustatic.com/`，因此我们可以单独屏蔽来自`https://cpro.baidustatic.com/`的内容，同时不会影响网站内容的正常加载。当网站域名与广告资源域名相同时，基于 Url 匹配的广告屏蔽方法如同「南橘北枳」。

### 流量过滤

在实体网关/虚拟网关处设置过滤器，对具备广告特征的流量实施拦截，如网站使用了Https加密，则采取MITM（Man-in-the-middle attack，中间人攻击）对Https加密流量进行解密，并对其中的广告流量进行拦截，这一功能在部分第三方路由器固件非常常见，如KoolProxy、广告屏蔽大师Plus。

在解密前，客户端上需要安装并信任由广告拦截软件生成的证书，如果网站采取了Https加密并需要验证证书，流量过滤的广告拦截功能则会影响网页的正常浏览。此外，如果设备性能偏低，这种拦截方式一定程度上会减慢网速。

### 网页DOM过滤

DOM（Document Object Model，文件物件模型），在W3C DOM标准3下，网页中的任何一个标签、元素都是树状结构中的一个节点。网页DOM过滤广告弥补了基于匹配Url屏蔽广告的缺点，通过CSS3 Selector定位到广告DOM元素，使用`display=none!important`等语法隐藏广告。DOM过滤过程发生在网页加载时，缺点是无法拦截通过Ajax、Pjax新加载的广告内容。

---

以往我们习惯在电脑浏览器上使用AdBlock Plus、AdGuard、Ghostery、uBlock Origin之类的广告拦截与隐私防护插件，从而去除网页上扰人的广告。对于Android与iOS，受限于系统权限（如Root权限、系统证书与用户证书）、过滤模式，想在手机上「找到一块净土」，需要花费一番功夫。

上述方法操作后只对单个设备生效，随着设备数量的增加，逐个逐个去设置十分麻烦，此外还会增加软件的订阅费用，面对智能电视、智能音箱，传统的广告拦截软件难以应付。而如果家中有使用软路由、NAS 甚至是树莓派，不妨试试在上面安装 DNS 广告拦截软件，实现网关级的广告拦截。

今天向大家介绍的DNS广告过滤软件是AdGuard团队开发的AdGuard Home。

AdGuard Home是AdGuard开源的一个私人DNS服务端，只需在网关部署，即可实现全局域网的广告拦截与隐私反追踪。在DNS解析的过程中，匹配规则库内的Url进行拦截，同时在客户端中，还可以通过自定义过滤规则实现网页DOM的拦截。
