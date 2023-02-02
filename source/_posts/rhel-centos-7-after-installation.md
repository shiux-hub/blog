---
title: RHEL/CentOS 7最小化安装后需做的30件事情
reprint: false
tags:
  - CentOS
  - 技巧
  - 笔记
categories:
  - Linux
date: 2020-02-09 17:25:50
cover:
coverWidth:
coverHeight:
---

> CentOS是一个工业标准的Linux发行版，是红帽企业版Linux的衍生版本。你安装完后马上就可以使用，但是为了更好地使用你的系统，你需要进行一些升级、安装新的软件包、配置特定服务和应用程序等操作。

阅读帖子的时候请先完成RHEL/CentOS最小化安装，这是首选的企业和生产环境。如果还没有，你可以按照下面的指南，它会告诉你两者的最小化安装方法。

- 最小化安装CentOS 7
- 最小化安装RHEL 7

我们会基于工业标准的需求来介绍以下列出的这些重要工作。我们希望这些东西在你配置服务器的时候能有所帮助。

## 注册并启用红帽订阅

RHEL 7最小化安装完成后，就应该注册并启用系统红帽订阅库，并执行一个完整的系统更新。这只当你有一个可用的红帽订阅时才能有用。你要注册才能启用官方红帽系统库，并时不时进行操作系统更新。（LCTT译注：订阅服务是收费的）

> 这一步仅适用于有一个有效订阅的红帽企业版Linux。如果你用的是CentOS服务器，请查看后面的章节。

## 使用静态 `IP` 地址配置网络

你第一件要做的事情就是为你的`CentOS`服务器配置静态`IP`地址、路由以及`DNS`。我们会使用`ip`命令代替`ifconfig`命令。当然，`ifconfig`命令对于大部分Linux发行版来说还是可用的，还能从默认库安装。

```bash
yum install net-tools # [它提供ifconfig工具，如果你不习惯ip命令，还可以使用它]
```

![安装net-tools](https://s2.ax1x.com/2020/02/09/1hJOTP.jpg)

但正如我之前说，我们会使用ip命令来配置静态IP地址。所以，确认你首先检查了当前的IP地址。

```bash
ip addr show
```

![获取IP地址](https://s2.ax1x.com/2020/02/09/1hYQmR.jpg)

现在用你的编辑器打开并编辑文件`/etc/sysconfig/network-scripts/ifcfg-enp0s3`。

这里，我使用`vi`编辑器，另外你要确保你是`root`用户才能保存更改。

```bash
vi /etc/sysconfig/network-scripts/ifcfg-enp0s3
```

我们会编辑文件中的四个地方。注意下面的四个地方并保证不碰任何其它的东西。也保留双引号，在它们中间输入你的数据。

```ini
IPADDR = "[在这里输入你的静态 IP]"
GATEWAY = "[输入你的默认网关]"
DNS1 = "[你的DNS 1]"
DNS2 = "[你的DNS 2]"
```

更改了`ifcfg-enp0s3`之后，它看起来像下面的图片。注意你的IP，网关和DNS可能会变化，请和你的 ISP(译者注：互联网服务提供商，即给你提供接入的服务的电信或IDC) 确认。保存并退出。

![编辑网络配置文件](https://s2.ax1x.com/2020/02/09/1htAud.jpg)

重启网络服务并检查IP是否和分配的一样。如果一切都顺利，用Ping查看网络状态。

```bash
service network restart
```

![重启网络设备](https://s2.ax1x.com/2020/02/09/1htM8S.jpg)

重启网络后，确认检查了IP地址和网络状态。

```bash
ip addr show
ping -c4 google.com
```

![获取IP地址](https://s2.ax1x.com/2020/02/09/1ht6V1.jpg)

![ping测试](https://s2.ax1x.com/2020/02/09/1htoqA.jpg)

## 设置服务器的主机名称

下一步是更改`CentOS`服务器的主机名称。查看当前分配的主机名称。

```bash
echo $HOSTNAME
```

![获取主机名](https://s2.ax1x.com/2020/02/09/1hNPI0.jpg)

要设置新的主机名称，我们需要编辑`/etc/hostsname`文件并用想要的名称替换旧的主机名称。

```bash
vi /etc/hostname
```

![修改主机名](https://s2.ax1x.com/2020/02/09/1hNli6.jpg)

设置完了主机名称之后，务必注销后重新登录确认主机名称。登录后检查新的主机名称。

```bash
echo $HOSTNAME
```

![再次获取主机名](https://s2.ax1x.com/2020/02/09/1hNtLd.jpg)

你也可以用`hostname`命令查看你当前的主机名。

```bash
hostname
```

## 更新或升级最小化安装的CentOS

这样做除了更新安装已有的软件最新版本以及安全升级，不会安装任何新的软件。总的来说更新（update）和升级（upgrade）是相同的，除了事实上升级 = 更新 + 更新时进行废弃处理。

```bash
yum update && yum upgrade
```

![更新软件包](https://s2.ax1x.com/2020/02/09/1hNDW8.jpg)

> 你也可以运行下面的命令，这不会弹出软件更新的提示，你也就不需要输入‘y’接受更改。 然而，查看服务器上会发生的变化总是一个好主意，尤其是在生产中。因此使用下面的命令虽然可以为你自动更新和升级，但并不推荐。

```bash
yum -y update && yum -y upgrade
```

## 安装命令行 Web 浏览器

大部分情况下，尤其是在生产环境中，我们通常用没有GUI的命令行安装CentOS，在这种情况下我们必须有一个能通过终端查看网站的命令行浏览工具。为了实现这个目的，我们打算安装名为`links`的著名工具。

```bash
yum install links`
```

![安装links](https://s2.ax1x.com/2020/02/09/1hNRwn.jpg)

## 安装 Apache HTTP 服务器

不管你因为什么原因使用服务器，大部分情况下你都需要一个HTTP服务器运行网站、多媒体、用户端脚本和很多其它的东西。

```bash
yum install httpd
```

![安装apache服务器](https://s2.ax1x.com/2020/02/09/1hNOT1.jpg)

如果你想更改Apache HTTP服务器的默认端口号(80)为其它端口，你需要编辑配置文件`/etc/httpd/conf/httpd.conf`并查找以下面开始的行：

`LISTEN 80`

把端口号`80`改为其它任何端口(例如`3221`)，保存并退出。

![修改端口](https://s2.ax1x.com/2020/02/09/1hNxfK.jpg)

增加刚才分配给`Apache`的端口通过防火墙，然后重新加载防火墙。

允许http服务通过防火墙(永久)。

```bash
firewall-cmd –add-service=http
```

允许`3221`号端口通过防火墙(永久)。

```bash
firewall-cmd –permanent –add-port=3221/tcp
```

重新加载防火墙。

```bash
firewall-cmd –reload
```

完成上面的所有事情之后，是时候重启`Apache HTTP`服务器了，然后新的端口号才能生效。

```bash
systemctl restart httpd.service
```

现在添加Apache服务到系统层使其随系统自动启动。

```bash
systemctl start httpd.service
systemctl enable httpd.service
```

如下图所示，用`links`命令行工具验证`Apache HTTP`服务器。

```bash
links 127.0.0.1`
```

![验证服务器](https://s2.ax1x.com/2020/02/09/1hUkTI.jpg)
