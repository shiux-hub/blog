---
title: AdGuard 过滤规则分享
reprint: false
date: 2022-12-31 05:16:21
categories:
  - Guide
tags:
  - 技巧
  - AdGuard
cover: https://s2.loli.net/2022/12/31/i9u5cBvZbmr7p2w.png
coverWidth:
coverHeight:
---

## 使用方法

### MacOS

打开 AdGuard -> 设置 -> 内容拦截 -> User rules

{% gallery %}
![打开偏好设置](https://s2.loli.net/2023/01/01/CRxelVitSnzuWfb.png)
![自定义订阅地址](https://s2.loli.net/2023/01/01/M5IZsqjdo4U2BeF.png)
![输入地址](https://s2.loli.net/2023/01/01/J5D2xhrPYZUkuwX.png)
{% endgallery %}

### EasyList

**官网** - <https://easylist.to/>

#### 订阅地址

**官方** - <https://easylist.to/easylist/easylist.txt>
**中国专属** - <https://easylist-downloads.adblockplus.org/easylistchina.txt>

国内网站广告过滤的主规则。

**EasyPrivacy** - <https://easylist-downloads.adblockplus.org/easyprivacy.txt>

EasyPrivacy 是隐私保护，不被跟踪。

**CJX’s Annoyance List** - <https://raw.githubusercontent.com/cjx82630/cjxlist/master/cjx-annoyance.txt>

过滤烦人的自我推广，并补充 EasyPrivacy 隐私规则。

### HalfLife

下列各规则、各规则的不同源不要同时订阅，因为重复了，也就是所有地址**选择一个**订阅就可以了。

国内推荐使用jsdelivr。

1. ad-pc.txt：[推荐桌面端] 合并自乘风视频广告过滤规则、Easylist、EasylistChina、EasyPrivacy、CJX’sAnnoyance，以及补充的一些规则。
**jsdelivr** - <https://cdn.jsdelivr.net/gh/o0HalfLife0o/list@master/ad-pc.txt>
**Github** - <https://raw.githubusercontent.com/o0HalfLife0o/list/master/ad-pc.txt>
2. ad-mo.txt：合并自 Easylist、EasylistChina、EasyPrivacy、CJX’sAnnoyance。
**jsdelivr** - <https://cdn.jsdelivr.net/gh/o0HalfLife0o/list@master/ad-mo.txt>
**Github** - <https://raw.githubusercontent.com/o0HalfLife0o/list/master/ad-mo.txt>
3. ad.txt：[推荐移动端] 合并自乘风视频广告过滤规则、EasylistChina、EasylistLite、CJX’sAnnoyance，以及补充的一些规则。
**jsdelivr** - <https://cdn.jsdelivr.net/gh/o0HalfLife0o/list@master/ad.txt>
**Github** - <https://raw.githubusercontent.com/o0HalfLife0o/list/master/ad.txt>
4. ad2.txt：合并自乘风视频广告过滤规则、EasylistChina、EasylistLite、CJX’sAnnoyance。
**jsdelivr** - <https://cdn.jsdelivr.net/gh/o0HalfLife0o/list@master/ad2.txt>
**Github** - <https://raw.githubusercontent.com/o0HalfLife0o/list/master/ad2.txt>
5. ad3.txt：合并自乘风视频广告过滤规则、EasylistChina、EasylistLite、CJX’sAnnoyance、EasyPrivacy。
**jsdelivr** - <https://cdn.jsdelivr.net/gh/o0HalfLife0o/list@master/ad3.txt>
**Github** - <https://raw.githubusercontent.com/o0HalfLife0o/list/master/ad3.txt>
6. ad-edentw.txt：合并自 Adblock Warning Removal List、ABP filters、anti-adblock-killer-filters。
**jsdelivr** - <https://cdn.jsdelivr.net/gh/o0HalfLife0o/list@master/ad-edentw.txt>
**Github** - <https://raw.githubusercontent.com/o0HalfLife0o/list/master/ad-edentw.txt>

### anti-AD

anti-AD致力于成为中文区命中率最高的广告过滤列表，实现精确的广告屏蔽和隐私保护。现已支持AdGuardHome，dnsmasq， Surge，Pi-Hole等优秀的网络组件。

使用anti-AD能够屏蔽广告域名，能屏蔽电视盒子广告，屏蔽app内置广告，同时屏蔽了一些日志收集、大数据统计等涉及个人隐私信息的站点，能够保护个人隐私不被偷偷上传。

本工具是通过域名解析层（DNS服务）来屏蔽广告和保护隐私的，其将各大著名的hosts，ad filter lists，adblock list等的列表进行合并去重，再进行一系列的抽象化，例如主动剔除失效域名、easylist优化模糊匹配、增强的黑白名单机制等措施，最终生成期望的高命中率列表。

不同格式的过滤列表文件会定期自动更新，其分别用于不同服务中的广告过滤规则:

- <https://anti-ad.net/anti-ad-for-dnsmasq.conf>
- <https://anti-ad.net/easylist.txt>
- <https://anti-ad.net/domains.txt>
- <https://anti-ad.net/surge.txt>
- <https://anti-ad.net/surge2.txt>（据说更节省内存）
- <https://anti-ad.net/anti-ad-for-smartdns.conf>
- <https://anti-ad.net/adguard.txt>（adguard专用规则）

|           文件名            |                           操作参考                           |              适用范围               |
| :-------------------------: | :----------------------------------------------------------: | :---------------------------------: |
| `anti-ad-for-dnsmasq.conf`  | 1. 下载过滤列表文件后, 保存到你的dnsmasq配置的正确目录下；2. 重启dnsmasq服务；3. 已经生效了，enjoy it。 |         dnsmasq及其衍生版本         |
|       `easylist.txt`        | 1. 进入AdGuardHome过滤器页面； 2. 选择添加过滤器输入名称 anti-AD，url地址填raw链接或者jsDelivr； 3. 点击确认后即生效 |             AdGuardHome             |
|        `adguard.txt`        |        第一步下载adguard，第二步加载规则，第三步保存         | adguard专用，解决easylist误杀的问题 |
|        `domains.txt`        | 以Pi-Hole为例 1. 进入pi-hole设置界面 2. 添加本domains列表链接到pi-hole的过滤器列表中 3. 点击save & update 4. 更新成功后即可生效 |           Pi-Hole及其他。           |
|         `surge.txt`         |                 直接订阅本条链接，保存后生效                 |          Surge或兼容服务。          |
| `anti-ad-for-smartdns.conf` |                   下载链接后保存到合适位置                   |              SmartDNS               |

生成这些文件的脚本项目也已在**[GitHub](https://github.com/privacy-protection-tools/anti-AD)中开源**。

### Hosts过滤规则

1. 大圣净化 – 针对国内视频网站
<https://raw.githubusercontent.com/jdlingyu/ad-wars/master/hosts>
2. 1024_hosts – 1024网站和澳门皇家赌场
<https://raw.githubusercontent.com/Goooler/1024_hosts/master/hosts>
3. Google hosts – 提高网站访问速度
<https://raw.githubusercontent.com/googlehosts/hosts/master/hosts-files/hosts>
4. Hblock – 综合多种源集合体屏蔽广告跟踪和恶意软件
<https://hblock.molinero.xyz/hosts>
5. Mvps – 屏蔽美欧地区英文网站相关的广告
<https://winhelp2002.mvps.org/hosts.txt>
6. neoHosts – 国内屏蔽挖矿统计JS&360&百度&法轮功等
<https://hosts.nfz.moe/full/hosts>
7. StevenBlack – 屏蔽国外网站广告-国外维护
<https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts>
8. yhosts – 屏蔽国内网站广告-国内维护
<https://raw.githubusercontent.com/vokins/yhosts/master/hosts>
9. YousList – 屏蔽韩国网站广告
<https://raw.githubusercontent.com/yous/YousList/master/hosts.txt>

### AdGuard Home

如果你动手能力比较强，可以考虑自己搭建开源免费的AdGuard Home。

我有写过一片关于AdGuard Home的文章，可以进行参考。
