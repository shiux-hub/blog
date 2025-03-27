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

## 如何安装AdGuard Home？

基于Golang编写的AdGuard Home，[官方支持](https://adguard.com/zh_cn/adguard-home/overview.html)运行在Linux 32位 / 64位 / ARM（v6 / v7）/ MIPS、FreeBSD、Windows、macOS、Docker内，以及由第三方开发者维护的[Home Assistant拓展](https://github.com/hassio-addons/addon-adguard-home)和[Arch Linux](https://aur.archlinux.org/packages/adguardhome)。

下文将介绍如何NAS（系统：Debian 12）以及Windows电脑（系统：Windows 11|10）上安装与配置AdGuard Home，其它设备请查看[AdGuard Home - Wiki](https://github.com/AdguardTeam/AdGuardHome/wiki)中的介绍或网友们的教程。局域网中的DNS服务器推荐运行在软路由、NAS或树莓派等长期保持开机的设备上，避免因设备关闭导致DNS无法正常解析。

本人不推荐在普通路由器上运行AdGuard Home、Pi-Hole等工具，路由器的性能对AdGuard Home的运行效率有着较大影响。根据本人测试，Pi-Hole空载需占用15MB内存（不含缓存），AdGuard Home空载需占用20MB内存（不含缓存），AdGuard Home带机13台、过滤规则74000+条时占用700MB内存（含缓存）。

AdGuard Home支持以二进制文件、Docker容器两种方式安装、运行，可以根据个人喜好选择合适的方式安装。如果运行设备的系统涉及到重要业务的运行，如NAS文件存储、Web服务器等，推荐使用Docker安装，不易受到业务应用的影响。

> - 以下教程需要一定的计算机操作基础、路由器使用基础与服务器使用基础
> - 下文的需要使用的信息如下所示，不同用户的设置有所差异，请自行更改
>   - NAS 局域网 IP：10.2.168.100
>   - AdGuard Home 后台地址：<http://10.2.168.100:3000>
>   - 私人 AdGuard Home DNS 地址：10.2.168.100:53

### 下载、安装AdGuard Home

前往[AdGuard Home官网](https://adguard.com/zh_cn/adguard-home/overview.html)下载安装包。

#### Windows 系统

使用浏览器 / 下载工具下载：<https://static.adguard.com/adguardhome/edge/AdGuardHome_windows_amd64.zip>

解压压缩包得到 `AdGuardHome.exe`文件。

![解压文件](https://s2.loli.net/2023/06/29/VRf2yphtxSZrj8A.png)

将`AdGuardHome.exe`移动到任意文件夹中。

以管理员身份打开命令提示符，执行以下命令

```bash
cd "C:\Program Files\AdGuard_Home"
.\AdGuardHome.exe --service install
```

![执行命令](https://s2.loli.net/2023/06/30/YOUmWA3jlxntbRq.png)

当提示`AdGuard Home is successfully installed and will automatically start on boot.`即表示AdGuard Home在当前系统上安装成功。在命令行中会显示管理后台的地址与端口，默认为`http://IP:3000`。

#### Linux 系统

Linux用户需使用root用户登入SSH，并执行对应系统版本的命令。

如果还不知道使用SSH，可以看这篇文章{% post_link ssh-guide %}。

![登入SSH](https://s2.loli.net/2023/06/30/rILoc7knmfBsGWK.png)

下载、解压、移动二进制文件。

```bash
#Linux x64
wget https://static.adguard.com/adguardhome/edge/AdGuardHome_linux_amd64.tar.gz -O AdGuardHome.tar.gz

#Linux i386
wget https://static.adguard.com/adguardhome/edge/AdGuardHome_linux_386.tar.gz -O AdGuardHome.tar.gz

#Linux ARMv7
wget https://static.adguard.com/adguardhome/edge/AdGuardHome_linux_armv7.tar.gz -O AdGuardHome.tar.gz

#Linux ARMv6
wget https://static.adguard.com/adguardhome/edge/AdGuardHome_linux_armv6.tar.gz -O AdGuardHome.tar.gz
```

为了方便管理，我们将二进制文件移动到`/usr/local/AdGuard_Home/`文件夹中。

```bash
#解压
tar xvf AdGuardHome.tar.gz

#移动文件
mkdir /usr/local/AdGuard_Home
mv AdGuardHome/AdGuardHome /usr/local/AdGuard_Home
```

![下载、解压文件](https://s2.loli.net/2023/07/01/4Kskm5PGJIracCR.png)

安装 AdGuard Home 到系统中。

```bash
cd /usr/local/AdGuard_Home
./AdGuardHome --service install
```

![安装AdGuard Home](https://s2.loli.net/2023/07/01/FgdacrJ89zIR2St.png)

当提示`AdGuard Home is successfully installed and will automatically start on boot.`即表示 AdGuard Home 在当前系统上安装成功。在终端上会显示管理后台的地址与端口，默认为 `http://IP:3000`。

#### Docker 容器

除了直接安装到系统，我们还可以通过 Docker 来安装 AdGuard Home。安装 Docker、添加 Docker 镜像源的教程请自行搜寻。

```bash
#拉取AdGuard Home Docker镜像
docker pull adguard/adguardhome

#设置AdGuard Home的配置文件存储位置
mkdir /etc/AdGuard_Home/
```

![Docker准备](https://s2.loli.net/2023/07/01/QzJPwHpyiK78bZm.png)

创建容器。

```shell
#创建 AdGuard Home 容器
docker run \
    --name AdGuard_Home\
    -v /etc/AdGuard_Home/:/opt/adguardhome/work\
    -v /etc/AdGuard_Home/:/opt/adguardhome/conf\
    -p 53:53/tcp -p 53:53/udp\
    -p 67:67/udp -p 68:68/udp\
    -p 80:80/tcp -p 443:443/tcp -p 443:443/udp -p 3000:3000/tcp\
    -p 853:853/tcp\
    -p 784:784/udp -p 853:853/udp -p 8853:8853/udp\
    -p 5443:5443/tcp -p 5443:5443/udp\
    --restart=always\
    -d adguard/adguardhome
```

![创建容器](https://s2.loli.net/2023/07/01/ngBNbElaYt5yZsf.png)

创建容器前务必检查端口是否会发生冲突，因为我的NAS使用了OpenMediaVault，53（Debian / Ubuntu 系统中的本地 DNS 服务器）、68（DHCP 客户端）、80（OpenMediaVault 网页后台）、443（Https）端口会发生冲突，便将对应端口调整为70、446、3000，53端口冲突可通过关闭本地DNS服务器解决。如有端口被占用，可以通过`netstat -tunlp | grep 端口号`查询占用进程。

容器部署成功后，通过`http://IP:3000`成功打开安装界面即表示部署成功。

### 初始化设置

#### 进入安装向导

在浏览器中打开AdGuard Home的后台，进入安装向导，点击 “开始配置”。默认后台地址为：`http://IP:3000/`

![安装向导](https://s2.loli.net/2023/07/01/1cHPDuMLzlpjeRA.png)

#### 设置网络接口

将后台的访问端口更改为`3000`，避免与NAS后台的80端口发生冲突，DNS端口保持为53即可。

![网络接口](https://s2.loli.net/2023/07/01/2wAXCvQ87ktRHIr.png)

#### 设置管理员账户

![设置管理员账户](https://s2.loli.net/2023/07/01/sRutD1fPrg3ISTN.png)

#### 完成初始化设置

![完成初始化设置](https://s2.loli.net/2023/07/01/k6lgDB4tZUAuNqh.png)

### 后期配置

![AdGuard Home后台](https://s2.loli.net/2023/07/01/f5lHIY9eOqXpS7A.png)

安装完成后，我们还需要进一步的设置，根据需要作出一定的优化。

![设置项目列表](https://s2.loli.net/2023/07/01/nu9cV35X2AyQp1d.png)

#### 常规设置

![常规设置](https://s2.loli.net/2023/07/01/rqz9gK4juSQMXTO.png)

- 过滤器更新间隔：DNS过滤清单默认更新间隔，一般为3 天 - 7 天
- 使用AdGuard「浏览安全」网页服务：作用与Chrome网页安全性检查类似，开启后，当用户访问存在潜在威胁的网站时，AdGuard会主动拦截并弹出提示
- 使用AdGuard「家长控制」服务：如果家中有尚未成年的孩子，建议开启，避免访问不良网站
- 强制安全搜索：隐藏Bing、Google、Yandex、YouTube网站上NSFW等不适宜的内容
- 查询记录保留时间：AdGuard Home服务端采用Sqlite文件数据库存储日志，长时间保留可能会降低运行速度，同时占用大量的储存空间，家庭用户一般保留24 小时 - 7天即可
- 统计数据保留时间：用于仪表盘的数据展示，一般保留24 小时 - 7天即可

#### DNS 设置

![DNS设置](https://s2.loli.net/2023/07/01/WfmuHBaZ8hd5Li2.png)

- 上游DNS服务器：AdGuard Home的上游DNS服务器，可参考下方推荐列表，一般保留1 - 2个即可。AdGuard Home除了可以作为广告过滤网关，如果设置了纯净DNS后，还可以避免运营商的DNS劫持
- BootStrap DNS服务器地址：作为DoH / DoT DNS的前置DNS解析器，可参考下方推荐列表
- 查询方式、速度限制、EDNS、DNSSEC、拦截模式、DNS 缓存设置、访问设置可根据需要进行调整，一般保持默认设置即可

#### DNS服务器推荐

不同地区连接至DNS服务器的速度各有差异，各位可以通过Ping测速的方式寻找当地连接延迟最低的DNS服务器。更多DNS服务器可以在[AdGuard文档](https://adguard.com/kb/zh-CN/)中找到。

![DNS服务器](https://s2.loli.net/2023/07/01/pCLh81HU2mlEcMP.png)

#### DNS 封锁清单

为了更好地发挥AdGuard Home去广告的功能，仅依靠默认的过滤规则是不够的，但也不宜过多，过多的过滤规则会影响解析的速度，各位可以根据需要添加过滤规则。

详情请看这篇文章：<a href="{% post_path adguard-rules %}#Hosts过滤规则">Hosts过滤规则</a>

以浏览国内网站为主的用户可以使用anti-AD + Halflife过滤规则，如有浏览国外网站的需要，可以根据需要添加AdGuard DNS Filter、Fanboy's Annoyances List等规则。不同规则之间会存在重叠的情况，可以通过AdGuard Home的拦截日志分析哪些规则的使用频率最高，哪些规则拦截频率最低，再加以取舍。

### 替换设备DNS

完成AdGuard Home的设置后，便可将AdGuard Home的DNS地址部署到局域网设备上。

#### 更改路由器 DNS 地址

不同品牌路由器修改的方法各有差异，具体步骤可参照说明书或网上的教程（路由器型号 + 更改 DNS），下方以 Redmi AC2100 路由器为例。

打开并登录路由器的后台管理页面。

![路由器后台](https://s2.loli.net/2023/07/01/YTiRy3vEKBfx8nt.png)

在局域网设置中找到DNS设置，将首选DNS服务器更改为AdGuard Home的 DNS 地址，可设置为其它的DNS服务商，避免因AdGuard Home服务器宕机而导致局域网无法访问互联网。更改完成后点击保存即可。在路由器更改DNS后，局域网内的所有设备的DNS解析都会通过AdGuard Home DNS完成，实现过滤广告与反隐私跟踪。

![DNS设置](https://s2.loli.net/2023/07/01/a4UpG8CjXTWVFPg.png)

#### 更改手机 DNS 地址

Android 设备

![更改Android设备DNS](https://s2.loli.net/2023/07/01/QB3jFptGxSWc1rJ.png)

- 进入「设定 - 网络和互联网 - Wi-Fi」，点击当前已连接网络的一旁的设置按钮
- 在Wi-Fi详情信息页面点击「编辑」按钮
- 找到「IP 设定」
- 分别输入该设备的IP、网关与AdGuard Home服务器地址

iOS 设备

![更改iOS设备DNS](https://s2.loli.net/2023/07/01/4VwtuWS8nRYe6gf.png)

- 进入「设置 - 无线局域网」，点击当前已连接网络的名称
- 在Wi-Fi详情信息页面找到「配置DNS」
- 切换为手动设置，并输入AdGuard Home服务器地址

#### **更改电脑 DNS 地址**

macOS 设备

![更改macOS设备DNS](https://s2.loli.net/2023/07/01/jDf5yaIXsgOSmkp.png)

- 打开「网络偏好设置」，选中当前已连接的网络，点击右下方的「高级」按钮
- 切换到「DNS」选项卡，填写AdGuard Home服务器地址

Windows设备

![更改Windows设备DNS](https://s2.loli.net/2023/07/01/tXMRcSQEvwWs2Tj.png)

## 使用效果

![运行12小时拦截效果](https://s2.loli.net/2023/07/01/dxP4ByFOcKmi8Ze.png)

![网页拦截效果](https://s2.loli.net/2023/07/01/GCpRuQf49XdMNHO.png)

使用AdGuard Home处理局域网中的DNS请求后（时长 12 小时），有6%的DNS请求被拦截下来。在客户端上，浏览网页时的浮窗广告、页面弹窗都能够被阻挡，一些隐私追踪服务同样也被AdGuard屏蔽。

当然，AdGuard Home也不是万能的，在官方文档中说到，面对广告资源域名与网站域名相同、Twitch广告、YouTube视频广告、国外社交平台上的赞助推文，AdGuard Home无能为力，只能借助Adblock Plus、AdGuard、uBlock Origin等内容拦截工具。

## 常见问题

### 端口冲突

在Linux设备上运行AdGuard Home，通常会出现53（本地 DNS 服务器）、68（DHCP 客户端）、80（Http）、443（Https）端口冲突的问题，可以通过`netstat -tunlp | grep 端口号`查询占用进程。有两种解决方案：使用不同端口、停用冲突进程。

如果是通过Docker方式运行AdGuard Home，出现

`listen udp 0.0.0.0:53: bind: address already in use`的提示，需要手动处理，方法如下：

```bash
#停止 DNSStubListener
systemctl stop systemd-resolved

#创建文件夹（如果不存在）
mkdir /etc/systemd/resolved.conf.d/

#使用 Nano 创建配置文件
nano /etc/systemd/resolved.conf.d/adguardhome.conf
```

在编辑器中粘贴以下内容：

```ini
[Resolve]
DNS=127.0.0.1
DNSStubListener=no
```

保存后执行以下命令。

```bash
#创建备份
sudo mv /etc/resolv.conf /etc/resolv.conf.backup

#将 /etc/resolv.conf 链接至 /run/systemd/resolve/resolv.conf
ln -s /run/systemd/resolve/resolv.conf /etc/resolv.conf

#重启 DNSStubListener
systemctl restart systemd-resolved
```

完成后使用`netstat -tunlp | grep 53`命令检查是否依旧有进程占用53端口，如无冲突，重启AdGuard Home容器即可。

### 平均处理时间过长？

以下几个因素会使AdGuard Home的处理时间过长：

- 本地到上游DNS的速度：如果本地运营商的DNS没有DNS劫持、投毒的问题，建议使用运营商DNS + 公共 DNS的方案，DNS速度可以通过Ping值比较。并在AdGuard Home中选择以「并行请求」的方式处理DNS请求
- 浏览安全、家庭控制与强制安全搜索服务：以上三个功能，在DNS请求时不会经过DNS缓存，直接向上游DNS服务器请求，从而减慢AdGuard Home的处理速度
- IPv6：如果使用的宽带、校园网不支持IPv6，可以禁用解析IPv6，提高响应速度
- 过滤规则：过多的过滤规则会影响响应速度，宁缺毋滥，选择最合适自己的规则，一般保留3 - 4个广告过滤规则即可。
- 统计周期： 在完成以上优化后，发现平均处理时间并没有太大改变，使用体验上也并不慢，有可能是因为统计周期过长，将优化前的结果计入，导致优化前后的结果无太大差异。不妨将仪表盘的统计周期缩短为24 小时再看看。

完成以上步骤后使用体验比没有使用AdGuard Home还要糟糕，问题有亿点严重了。这个时候需要查找AdGuard Home的日志，寻找问题的原因。

### 部分网页被 AdGuard Home 误杀

如果一些网页被AdGuard Home误杀，可以在AdGuard Home的日志寻找是否被拦截。如果与规则发生冲突，需要将误杀网址通过自定义过滤规则添加至白名单中，或选择其它的过滤规则。常见的冲突有网站统计服务（Google Analytics）、广告联盟等。

### 自定义过滤规则

AdGuard Home的过滤规则兼容Adblock语法、Hosts语法及Domain-only语法。

| 语法                    | 作用                                    |
| ----------------------- | --------------------------------------- |
| `||example.org^`        | 拦截example.org域名及其所有子域名       |
| `@@||example.org^`      | 放行example.org 及其所有子域名          |
| `127.0.0.1 example.org` | 将example.org解析到127.0.0.1            |
| `/REGEX/`               | 阻止访问与example_regex_meaning匹配的域 |
| `! 这是一行注释`        | 只是一条注释                            |
| `# 这是一行注释`        | 只是一条注释                            |

### 能否将AdGuard Home DNS与Surge / Clash网关结合使用？

可以。Surge与Clash分别提供了`dns-server`与`dns-nameserver`字段以供用户修改DNS解析服务器，在配置文件中填入AdGuard Home的DNS服务器地址即可。

## 尾言

如果你有在多设备上对去除广告的需求，恰巧手上有一台可以发光发热的树莓派、软路由、NAS甚至是旧电脑，AdGuard Home或许是一个不错的选择，它能够给你带来一个清爽的网络世界。同类的工具还有Pi-Hole，升级到5.0版本后，除了缺乏多语言支持、内置的过滤器选择较少、兼容性弱于AdGuard Home的不足外，使用体验与AdGuard Home无太大差异。

## **参考篇目**

- [AdGuard Home Wiki](https://github.com/AdguardTeam/AdGuardHome/wiki)
- [AdGuard: How ad blocking works](https://kb.adguard.com/en/general/how-ad-blocking-works)
- [How to run AdGuard Home in Docker with 'resolved' daemon](https://hub.docker.com/r/adguard/adguardhome)
- [想获得「干净」的网页浏览体验？你需要这份全平台去广告指南](https://sspai.com/post/56617)
- [AdGuard 语法规则 —— 如何创建属于你自己的广告过滤器](https://www.leeyiding.com/archives/50/)
- [W3C DOM](https://www.w3.org/TR/dom41/#introduction-to-the-dom)
- [The Coalition for Better Ads - Better Ads Standards](https://www.betterads.org/standards/)
