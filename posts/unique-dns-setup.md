---
title: 独特的DNS配置
reprint: true
categories:
  - NetWork
tags:
  - DNS
  - IP
  - MacOS
  - 技巧
date: 2020-02-23 19:22:04
cover: https://s1.ax1x.com/2023/02/17/pSbzwGV.png
coverWidth:
coverHeight:
---

众所周知，DNS的作用与电话簿类似，将人类可读的域名映射到机器可读IP地址、使人更方便地访问互联网。DNS是非常重要的互联网基础设施，对于改善上网冲浪的体验中的重要程度不容小觑。

## 避免不必要的DNS解析

如果想要通过优化DNS来改善自己的网络体验，第一步其实是避免不必要的DNS解析。

### 使用Fake IP避免本机DNS解析

对于不支持设置SOCKS/HTTP(S)代理的软件，Surge/Clash等软件一般选择通过TUN/TAP或转发redir透明网关接管网络请求，从而拿到原始的TCP/IP连接。

在POSIX规范下，执行网络请求需要先通过gethostbyname、getremoteaddr等操作系统提供的方法进行DNS解析，获取到IP地址以后发起连接；如果DNS解析不成功，网络请求就无从谈起了。因此绝大部分依赖TUN和TAP的某些软件都会接管系统DNS解析。接管DNS解析后随之而来的便是一系列问题：

* DNS污染：由于特殊的网络环境，通过你本机直接进行DNS解析得到的结果可能不可靠。
* CDN优化：如果要访问的目标网站使用了CDN，最理想的结果是 距离代理服务器最近的CDN节点 - 代理服务器 - 你。如果你通过本机直接进行DNS解析，获取到的IP地址可能并不是距离你远端代理服务器 最近的CDN节点。

由于常见的某些协议都运行在Layer 4上、支持封装域名；因此Surge/Clash等软件在转发流量时，都是封装目标域名，而不是目标域名在本机解析到的IP地址，从而规避DNS污染和实现CDN优化。

如果软件一旦决定将某个域名转发给远端代理服务器，远端代理服务器也需要对拿到的域名进行一次解析，在本机解析的IP地址其实没有起任何作用，白白浪费一个RTT。于是2001年四月，IETF通过了RFC3089，描述了一种网关通过接管DNS、返回Fake IP来建立TCP/IP链接的方法。简单的流程如下：

* 代理网关接管本机的DNS解析
* 一个软件意图对一个域名发起网络请求，于是先通过DNS解析获取域名对应的IP
* 代理网关收到DNS解析请求后，不做任何DNS解析，而是直接返回一个保留IP地址（Fake IP）
* 发起网络请求的软件获取到Fake IP后，试图以Fake IP为目标发起网络请求
* 代理网关截获网络请求，通过目标的Fake IP反推出目标域名
* 代理网关将流量和目标域名使用某种协议重新封装后、转发给远端代理服务器

不过在日常使用中，即使有了Fake IP也不能完全避免本机进行DNS解析。Surge/Clash使用Fake IP后，当且只当以下两种情况时会在本机进行DNS解析：

* 目标域名需要使用DIRECT策略（即直连）、此时Surge/Clash需要得到真实的目标IP、不通过代理服务器直接发起连接
* Surge/Clash遇到了基于IP分流的策略（如 IP-CIDR、IP-ASN、GEOIP、LAN 等），此时Surge/Clash需要得到一个IP用于匹配分流

也就是说，如果Surge和Clash能够匹配到了一条域名规则、指示网络请求需要被转发给远端代理服务器，Surge和Clash便不会在本地进行DNS解析。因此在编写Surge和Clash（以及同类软件Shadowrocket、Quantumult(X)、Surfboard等）的规则时，将IP相关规则（IP-CIDR、IP-ASN、GEOIP等）放在其余的规则（DOMAIN、DST-PORT、SRC-PORT、PROTOCOL、URL-REGEX）的后面；除此以外，需要代理的域名的规则组越完善、Surge/Clash匹配到IP类规则的概率也就越低，需要本机DNS解析的次数也就越少。

### 使用域名分流规则直接拦截广告

不论是去广告Hosts还是AdGuardHome等解决方案，本质上都是在DNS解析环节拦截域名；由于DNS的局限性，这类解决方案只能拦截完整的广告域名，不能拦截某一个域名下的具体URL，因此要么不够强力、要么误杀严重，不能取代专业的浏览器去广告插件（如ADBlock Plus、AdGuard for Chrome）和去广告软件（如AdGuard for Android）。

除此以外，由于Surge/Clash等支持使用域名规则进行分流的软件也都提供了对REJECT策略的支持（Surge还额外支持两种特殊的REJECT策略：不回复任何数据包、任由链接自行超时的REJECT-DROP，和返回空白1像素GIF图像文件的TINY-GIF）。因此，我们可以编写域名规则拦截广告请求、彻底杜绝被拦截域名的DNS解析、加快阻断。

> 目前Surge支持DOMAIN-SET格式，可以在一个配置文件里记录数十万条域名，而不会内存泄漏或崩溃；Clash、Quantumult(X) 的域名规则可能不支持上万级别数量的域名、强行导入可能导致内存泄漏或Panic；Surfboard虽然完全兼容Surge的DOMAIN-SET格式，但是可能存在优化程度不够、达不到Surge同等速度和效率。
> 建议先对有关软件进行测试，如果不能很好的处理大量域名规则的，仍然可以使用AdGuardHome作为去广告的替代。

## 中场休息：递归DNS是怎么知道哪个CDN节点距离我最近的？

先暂时抛开对我的DNS配置的介绍，简单谈谈递归DNS（Local DNS）是如何实现「CDN优化」的。

假设你的宽带IP是`114.5.1.4`，你现在试图访问一个使用了阿里云 CDN 的网站`alicdn.example.com`、接入CDN的方式是CNAME到`alicdn.example.com.w.alikunlun.com`。

> 注意，为了节省篇幅，在接下来的描述中，我刻意省去了Local DNS向Root DNS查询`com`和`example.com`的权威DNS的过程。如果想要了解完整的DNS查询过程，可以阅读由Cloudflare编写的[What is DNS? | How DNS works](https://www.cloudflare.com/learning/dns/what-is-dns/)。

### 运营商DNS

一开始，你使用的是由运营商下发给你的运营商DNS，假设运营商的递归DNS的IP是`1.2.3.4`，于是：

* 你向`1.2.3.4`发起DNS查询：请问`alicdn.example.com`的解析结果是什么？
* `1.2.3.4`问`example.com`的权威DNS查询：`alicdn.example.com`的解析结果是什么？
* `example.com`的权威DNS告诉`1.2.3.4`：`alicdn.example.com`用CNAME指向了`alicdn.example.com.w.alikunlun.com`。
* 于是`1.2.3.4`把结果返回给你：`alicdn.example.com`用CNAME指向了`alicdn.example.com.w.alikunlun.com`
* 你问`1.2.3.4`：请问`alicdn.example.com.w.alikunlun.com`的解析结果是什么？
* `1.2.3.4`问`alikunlun.com`的权威DNS：`alicdn.example.com.w.alikunlun.com`的解析结果是什么？
* `alikunlun.com`是阿里云CDN的域名，阿里的权威DNS开始找：地理位置最接近`1.2.3.4`的CDN节点是哪些？有`19.19.8.10`。
* `alikunlun.com`告诉`1.2.3.4`：`alicdn.example.com.w.alikunlun.com`解析到了`19.19.8.10`。
* `1.2.3.4`把结果返回给你：`alicdn.example.com.w.alikunlun.com`解析到了`19.19.8.10`。

![运营商DNS](https://s1.ax1x.com/2023/02/17/pSqQy9K.png)

因此，阿里云CDN并不是返回「最适合你」的CDN节点IP，而是返回「最适合这个运营商DNS」的CDN节点IP。只不过由于运营商DNS一般都距离你很近，所以也可以把这个结果当作是「最适合你」的CDN节点IP。

### 公共DNS

再后来，你听说南京信风提供的公共递归DNS `114.114.114.114`很有名，于是你手动将你的DNS设置为`114.114.114.114`。

`114.114.114.114`是一个Anycast IP，即一个IP能够对应不同区域、不同ISP的多个数据中心、多台服务器。截止到本文写就，南京信风仅在江苏南京的 电信、联通、移动 和 美国伊利诺伊州芝加哥的Cogent广播了`114.114.114.114`，也就是说`114.114.114.114`仅对应到了这两地的服务器节点。一般的，国内的用户连接`114.114.114.114`，都是访问位于江苏南京的节点。

你通过`114.114.114.114`和通过运营商DNS获取`alicdn.example.com`的解析结果的过程大同小异，区别在于这一次，`alikunlun.com`并不会试图返回最适合`1.2.3.4`（你的运营商DNS）的CDN节点，而是试图返回最适合江苏南京的CDN节点。

由于中国复杂的互联网环境和封闭的网络基础设施建设，很难将Anycast覆盖到中国30余省市的十数个主流运营商、如上文所说，南京信风的`114.114.114.114`在国内甚至只有一个节点、只能覆盖三个运营商；即使是腾讯云DNSPod和阿里的公共DNS，在国内也只有不到10个节点。

![公用DNS](https://s1.ax1x.com/2023/02/17/pSqQ61O.png)

因此，在国内使用公共DNS，不仅不能够优化CDN，反而还会劣化CDN。也是因为同一个原因，运营商要劫持你的DNS查询，避免因为你的DNS设置不当、反而投诉运营商的网络速度慢、差。

与此同时，公共DNS为了解决少数Anycast节点无法对应到全国30余省市数十个运营商的问题，另辟蹊径想出了一个新的方案：

### 多出口IP的公共DNS

有的公共DNS除了在全国设立Anycast节点、负责接收DNS查询以外，还在全国30余省市均部署了额外的服务器（称作「DNS出口服务器」）。这些DNS出口服务器不会直接接收来自终端用户的DNS查询，而是Anycast节点接收到终端用户的DNS查询后，转交给DNS出口服务器再进行解析：

* 你（`114.5.1.4`）向`233.5.5.5`发起查询：请问`alicdn.example.com`的解析结果是什么？
* `223.5.5.5`的众多Anycast节点中的一个收到了你的查询、开始寻找：我在全国部署的上百个DNS出口服务器中，哪一个是距离`114.5.1.4`最近的？
* 223.5.5.5 将DNS查询转交给距离你最近的 DNS 出口服务器（称作「DNS 出口 A」）。
* DNS出口A问alikunlun.com的权威DNS：`alicdn.example.com.w.alikunlun.com`的解析结果是什么？
* 阿里云CDN开始找：地理位置最接近A的CDN节点都是哪些？
* `alikunlun.com`告诉A：`alicdn.example.com.w.alikunlun.com`解析到了这些IP。
* A告诉`223.5.5.5`：`alicdn.example.com.w.alikunlun.com`解析到了这些IP。
* `223.5.5.5`告诉你：`alicdn.example.com.w.alikunlun.com`解析到了这些IP。

![多出口IP的公共DNS](https://s1.ax1x.com/2023/02/17/pSqQfHA.png)

这样，虽然接收到你查询的公共DNS的Anycast节点不一定距离你非常非常近，但是最终向权威DNS发起查询的，却是距离你尽可能近的「DNS出口服务器」，因此得到的「最适合DNS出口服务器」的CDN节点IP、也是最适合你的。

### 支持EDNS Client Subnet的公共DNS

为了解决权威DNS难以根据终端用户的真实IP返回最适合用户的CDN节点的问题，IETF通过了[RFC7871](https://datatracker.ietf.org/doc/html/rfc7871)，即EDNS Client Subnet（ECS）。RFC7871定义了在DNS查询时，用户可以指定一个IP网段，权威DNS可以据此返回最适合这个IP网段的CDN节点：

* 你（`114.5.1.4`）问支持ECS的公共DNS`119.29.29.29`：我是`114.5.1.0/24`，请问`alicdn.example.com.w.alikunlun.com`的解析结果是什么？
* `119.29.29.29`问`alikunlun.com`的权威DNS：`114.5.1.0/24`在问`alicdn.example.com.w.alikunlun.com`的解析结果是什么？
* 阿里云CDN开始找：地理位置最接近`114.5.1.0/24`的CDN节点都是哪些？
* `alikunlun.com`告诉`119.29.29.29`：`alicdn.example.com.w.alikunlun.com`解析到了这些IP。
* `119.29.29.29`把结果返回给你：`alicdn.example.com.w.alikunlun.com`解析到了这些IP。

![支持EDNS Client Subnet的公共DNS](https://s1.ax1x.com/2023/02/17/pSqQHgS.png)

虽然ECS解决了权威DNS无法获取用户真实IP的问题，但是在实践中仍然存在一些困难：

* 使用ECS有可能泄漏用户的隐私信息，一些公共DNS（如Cloudflare的`1.1.1.1`和`1.0.0.1`）因此拒绝提供ECS支持。
* 在[RFC7871的11.2章节](https://datatracker.ietf.org/doc/html/rfc7871#section-11.2)中提到了一种针对ECS的攻击（即Birthday Attack），因此当DNS请求/响应中的ECS信息不完整时、需要彻底忽略ECS，降级回传统DNS查询。
* 使用ECS会降低递归DNS的性能、甚至可以被用于发动针对递归DNS的攻击：以前一个递归DNS可以为所有人缓存同一个CDN节点IP，现在却需要为每个人缓存不同的CDN节点IP。[RFC7871的11.3章节](https://datatracker.ietf.org/doc/html/rfc7871#section-11.3)也因此指出，并非所有的递归DNS都需要支持ECS。
* ECS需要从用户、到递归DNS、到权威DNS全链路均提供支持才能生效。虽然在[DNSFlagDay](https://dnsflagday.net/)的大力推动下，绝大部分权威DNS已经支持ECS，但在递归DNS中ECS的普及率仍然不容乐观。

---

在补充介绍了递归DNS是如何优化CDN结果后，不难得出结论：

* 需要被代理的域名、**必须在远端代理服务器上进行解析**、才能得到最合适的解析结果。
* 在本地对需要代理的域名进行DNS解析，只不过是为了让Surge/Clash等软件能够基于IP分流（Surge/Clash的TUN/TAP会直接返回Fake IP、本地 DNS解析的结果根本不会暴露给外部）罢了。本地DNS解析的结果不需要很精确，**建议牺牲准确度换更快的速度。**
* 为了能够让被代理的域名在远端服务器上解析，**在通过某种协议将代理请求发送给远端代理服务器时，必须直接封装该网络请求的域名。**
* 使用Surge/Clash等软件后，**完全无需使用dnsproxy或dns2socks转发本地DNS查询。代理此类DNS查询不仅没有必要，反而会导致延迟升高、影响上网体验。**

## 正确配置SmartDNS

> SmartDNS是一个运行在本地的DNS服务器，它接受来自本地客户端的DNS查询请求，然后从多个上游DNS服务器获取DNS查询结果，并将访问速度最快的结果返回给客户端，以此提高网络访问速度。SmartDNS同时支持指定特定域名IP地址，能够以极高的性能进行匹配，可用于过滤广告或分流。

由于SmartDNS的极致性能和强大特性，以及「提高网络访问速度」的功能，许多YouTube视频和教程文档都将其奉若神明、称为一切的解药。然而事实上，如果不经过仔细的配置，SmartDNS不仅不能起到预期的效果，反而还会导致负优化。

如果一个网络请求将会被封装转发给远端代理服务器、会在远端代理服务器进行DNS解析，因此在本机进行的DNS解析得到的结果是没有任何意义的。因此，需要被代理的域名，并不在乎能否得到延时最低的IP，**只需要不干扰Surge/Clash等软件的IP分流规则即可，无需非常精确。**

> 不需要对SmartDNS产生的DNS查询请求和测速握手进行代理。将DNS查询转发给远端代理服务器会大幅增加DNS解析用时、影响上网体验！

因此，需要被代理的域名不需要进行测速——测速不仅浪费一个RTT，而且ISP和其它中间人可能会记录你的ICMP或TCP握手行为。除此以外，考虑到绝大部分递归DNS（Local DNS）都可能存留日志用作各种用途（如下图所示的「中国科学技术大学USTC校园网DNS最近10分钟查询统计」），需要被代理的域名也最好不要选用位于国内的递归DNS作为上游。

![最近10分钟查询统计](https://s1.ax1x.com/2023/02/17/pSqlCgU.png)

### 中场休息：SmartDNS是如何避免因测速导致DNS解析过慢的

第二个中场休息环节，这次简单讲讲 SmartDNS 的工作原理。

有一些人认为，SmartDNS配置了数十个上游，需要对上游返回的每一个IP都进行测速，反而严重影响DNS解析速度。但是实际使用SmartDNS后，并没有出现DNS解析过慢的情况。这是因为SmartDNS早就考虑到了测速与延时的问题、并进行了相关的优化。SmartDNS在首次DNS解析请求时，会同时向所有上游发起并发查询；一旦有一个上游返回了结果，SmartDNS就会对这第一个返回的结果进行测速，得到其中延时最低的IP，将其返回给用户、设置TTL为10；与此同时，SmartDNS仍然会等待剩余上游返回结果、异步进行测速，直到所有上游都返回了结果（或超时）、SmartDNS将所有的IP都进行测速以后，才会得到最优IP：

* 假设我们向SmartDNS解析一个域名`example.com`，由于没有命中SmartDNS的缓存，因此不得不向上游获取结果。
* SmartDNS同时向上游A、B、C发起查询请求
* 假设上游B最先返回了查询结果，查询结果包含了三个IP：`114.5.1.4`、`11.45.1.4`和`19.19.8.10`。
* SmartDNS立刻开始对这三个IP进行测速。假设测得延时最低的IP是`11.45.1.4`
* SmartDNS会立刻返回`11.45.1.4`给客户端，同时设置TTL为10（即指示`11.45.1.4`只应该在客户端被缓存10秒中）
* 在接下来10秒内，客户端都会使用都会使用`11.45.1.4`来处理发往`example.com`的网络连接；与此同时SmartDNS仍然在等待上游A和C的结果。
* 一旦上游A和C的查询结果也都返回，SmartDNS会把上游A、B、C的结果进行汇总去重、重新测速，最终得到最快的那个IP。
* 由于SmartDNS有着非常严格的超时设置，因此上述「等待剩余上游结果并分别进行测速」步骤不会超过10秒。
* 等到10秒过去、客户端再次向SmartDNS查询`example.com`时，SmartDNS才会返回最快的IP、并设置一个「正确」的TTL。

总而言之，SmartDNS首先会尽快返回一个「次优」的IP、要求客户端仅在接下来10秒钟内使用「次优」的IP，之后SmartDNS就能返回「最优」的IP。

> 不过正如我在前文所说，Surge支持针对DNS返回的多个IP同时进行握手、并使用最先完成握手的TCP进行后续请求（丢弃其余的TCP握手），因此Surge使用的IP一定是延时最低的、而且能够跳过出现故障的IP；而且Surge复用了并发握手时的TCP连接进行后续请求，因此延时比SmartDNS「先测速、后返回IP」更低。
> 因此在搭配Surge使用时，上游DNS不需要自带测速；最好是能合并多个上游返回的结果，将多个上游返回的一大堆IP全部喂给Surge、让其并发握手。我给SmartDNS开了[对应的Feature Request](https://github.com/pymumu/smartdns/issues/994)，感兴趣的可以关注一下。

### 在SmartDNS中使用dnsmasq-china-list进行分流

[felixonmars/dnsmasq-china-list](https://github.com/felixonmars/dnsmasq-china-list)是一组开源的，覆盖了绝大部分中国大陆的域名的dnsmasq配置文件，也可以通过预定义的`Makefile`生成供unbound、bind9、dnscrypt-proxy、SmartDNS、AdGuardHome、coredns使用的配置文件。截至本文写就，`dnsmasq-china-list`已经收录了65743个域名。满足以下任意两条规则之一的域名即会被收录到列表中：

* 是`.cn`后缀的域名（包括`.edu.cn`、`.gov.cn`、`.org.cn`、`.ac.cn`等）
* 满足以下两条规则中任意一条的、非`.cn`后缀的域名：
  * 域名使用的权威DNS（Authoritative DNS）拥有位于中国大陆境内的节点
  * 通过位于中国大陆境内的递归DNS解析时，解析得到的IP位于中国大陆境内

如果需要设置SmartDNS针对指定域名使用与默认配置不同的上游进行解析，可以使用nameserver，如下所示：

```properties
nameserver /example.cn/domestic
```

如果需要设置SmartDNS针对指定域名不使用默认配置的上游、且采用与默认不同的测速方式，需要使用`domain-rules`，如下所示：

```properties
domain-rules /example.cn/ -speed-check-mode tcp:80 -nameserver domestic
```

`dnsmasq-china-list`预定义的`Makefile`同时支持生成上述两种配置格式的文件。使用下述命令可以生成使用`nameserver`的配置条目：

```bash
make SERVER=domestic smartdns
```

我给`dnsmasq-china-list`开了PR（[felixonmars/dnsmasq-china-list#381](https://github.com/felixonmars/dnsmasq-china-list/pull/381)）且已经被合并，现在已经可以生成使用`domain-rules`的配置条目：

```bash
make SERVER=domestic SMARTDNS_SPEEDTEST_MODE=tcp:80 smartdns-domain-rules
```

> 注意，你可能需要安装`make`才可以使用上述命令。在macOS上，`make`包含在Xcode Command Line Tools之中。

### 配置 SmartDNS 上游和仅测速国内域名

如前文所说，在本地解析需要被代理的域名时，不需要测速、也不一定要绝对准确，只需要解析得到的IP不会干扰Surge/Clash分流即可；只将国内的递归DNS作为上游解析国内直连域名，也只对其进行测速。因此，我们使用「白名单」策略，默认解析不测速、不使用国内递归DNS作为上游。

首先需要禁用SmartDNS全局的测速设置：

```properties
speed-check-mode none
```

然后设置两组上游DNS：默认的一组不位于中国大陆境内的递归DNS；另一组位于中国大陆境内的递归DNS，仅用于解析`dnsmasq-china-list`列表中的域名：

```properties
# ----- Default Group -----
# 默认使用的上游 DNS 组
# OpenDNS 非常规 443 端口、支持 TCP 查询
server-tcp 208.67.220.220:443
# OpenDNS 的 IP DoH
server-https https://146.112.41.2/dns-query
# TWNIC 的 IP DoH
server-https https://101.101.101.101/dns-query
# 你也可以配置其它 DNS 作为上游

# ----- Domestic Group: domestic -----
# 仅用于解析 dnsmasq-china-list 列表中的域名
# 腾讯 DNSPod IP DoT
server-tls 1.12.12.12:853 -group domestic -exclude-default-group
server-tls 120.53.53.53:853 -group domestic -exclude-default-group
# 阿里 IP DoT
server-tls 223.5.5.5:853 -group domestic -exclude-default-group
server-tls 223.6.6.6:853 -group domestic -exclude-default-group
# 114 DNS、使用 TCP 查询
server-tcp 114.114.114.114 -group domestic -exclude-default-group
server-tcp 114.114.115.115 -group domestic -exclude-default-group
# CNNIC 公共 DNS、仅支持 UDP 查询
server 1.2.4.8 -group domestic -exclude-default-group
server 210.2.4.8 -group domestic -exclude-default-group
```

其中，设置有`-exclude-default-group`的上游DNS默认不会被使用，仅当`domain-rules`或`nameserver`配置明确指定时使用。

> 你可能注意到，我的配置中添加了CNNIC（中国互联网络信息中心）的公共DNS。这是考虑到CNNIC的公共DNS节点质量较差、出口IP位置稀少、基本没有针对CDN做任何优化（截至本文写就，`1.2.4.8`的Anycast仅在浙江杭州阿里云和香港Zenlayer广播路由，`210.2.4.8`的Anycast仅在 北京联通广播路由）。所以，一般情况下，只有CNNIC的公共DNS**一定不能**返回距离我位置最近的CDN节点（其余的公共DNS基本都会返回给我最优的CDN节点）。
> 设想一下，除CNNIC外、大部分公共DNS都会尽可能返回距离我本地运营商最近的、最优的CDN节点；由于SmartDNS的测速和优选，CNNIC返回的非最优CDN节点一般会被忽略。然而，假如距离我最近的CDN节点出现故障，只有CNNIC能够给我返回不一样的CDN节点、能够响应SmartDNS测速，因此我能够使用并非最优、但是可用的CDN节点「救急」、不至于直接「断网」。
> 简单来说，就是因为CNNIC公共DNS**能够非常稳定地提供质量最差的递归DNS服务、不会间歇发生解析质量好转**，才得以入选。

最后，引入前文由`dnsmasq-china-list`生成的`domain-rules`配置文件：

```properties
conf-file /path/to/dnsmasq-china-list/accelerated-domains.china.domain.smartdns.conf
conf-file /path/to/dnsmasq-china-list/apple.china.domain.smartdns.conf
```
