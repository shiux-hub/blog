---
title: CentOS8宝塔下安装aria2和AriaNg添加HTTPS访问支持
reprint: false
tags:
  - APP
  - Aria2
  - Cloud
  - 技巧
categories:
  - Linux
date: 2020-02-20 17:01:34
cover:
coverWidth:
coverHeight:
---

首先你安装得有一台安装了CentOS8的KVM架构的vps，安装宝塔完毕。 首先安装Aria2，这个我们直接用某大佬的一键脚本吧：

```bash
wget -N –no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubiBackup/doubi/master/aria2.sh && chmod +x aria2.sh && bash aria2.sh
```

安装完毕后，会展示出你的服务器地址，你的NPC访问密码，端口和默认下载目录。 宝塔里面创建站点，比如创建<https://download.shiux.com/>（如果你懒得折腾，而且也愿意用安全的`HTTPS`走你的数据，你直接用我搭建的`AriaNg`前端访问即可，后面都不用看了，填写你的`ARIA2`配置信息即可，反正这个只有你自己填写好你的`NPC`密码，服务器地址，端口等信息后才可以用，而且服务端不会有任何记录）

为了自己的数据传输安全，在宝塔后台申请**Let’s Encrypt**的证书，这个简单，只要你的域名提前做好解析，填写好邮箱，很快就可以申请成功。

去宝塔的后台界面远程下载`AriaNg`

**下载地址** - <https://github.com/mayswind/AriaNg/releases>

下载完成后，宝塔后台就可以解压缩，解压缩到根目录。

现在问题来了，你用你创建好的[download.shiux.com](https://download.shiux.com)在浏览器里访问，填写我们前面安装aria2的NPC密码后依然显示未连接。原因？就是因为我们需要更改`Aria2`的配置文件。

```bash
vi /root/.aria2/aria2.conf
```

找到，没有可以自行添加到配置文件。

```bash
#是否启用RPC服务的SSL/TLS加密
#rpc-secure=true
#申请的域名crt证书文件路径，自行修改
#rpc-certificate=/root/xxx.crt
##申请的域名key证书文件路径，自行修改
#rpc-private-key=/root/xxx.key
```

首先把上述三行的注释去掉，开启`HTTPS`访问支持，关键是下面两个证书文件路径，哪里找，其实你的站点配置信息里面有，如果你的宝塔安装的是`nginx`，在你的站点`nginx`配置文件中包含路径。进入宝塔后台，站点设置里面找到`nginx`配置： 找到：

```bash
ssl_certificate /www/server/panel/vhost/cert/aria2.zhanghaitao.com/fullchain.pem;
ssl\_certificate\_key /www/server/panel/vhost/cert/aria2.zhanghaitao.com/privkey.pem
```

先别急，你如果直接填写这两个文件地址不会成功，我在这里耽误了3个小时才折腾完毕，记得谢我，评论区见。需要把`privkey.pem`用openssl转换一下，进入这个目录：

```bash
cd /www/server/panel/vhost/cert/download.shiux.com/
openssl rsa -in privkey.pem -out privkey.key
```

转换完成后，你得到了`privkey.key`这个文件：

```bash
vi /root/.aria2/aria2.conf
```

编辑为：

```bash
# 启用加密后 RPC 服务需要使用 https 或者 wss 协议连接
rpc-secure=true
# 在 RPC 服务中启用 SSL/TLS 加密时的证书文件(.pem/.crt)
rpc-certificate=/www/server/panel/vhost/cert/aria2.shiux.com/fullchain.pem
# 在 RPC 服务中启用 SSL/TLS 加密时的私钥文件(.key)
rpc-private-key=/www/server/panel/vhost/cert/aria2.shiux.com/privkey.key
```

重新启动`Aria2`

```bash
service aria2 restart
```

再访问你的AriaNg你会发现连接成功，尽情享受吧：）
