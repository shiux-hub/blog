---
title: 使用Charles抓高版本Android包的ssl证书问题
reprint: false
date: 2021-08-24 16:20:38
categories:
  - Windows
tags:
  - 笔记
cover: /images/7505b78322238a0df5d8aa007d0b2734.png
coverWidth:
coverHeight:
---

Android7以后，Android不信任用户安装的证书，所以抓https时无法解码请求，对于第三方应用，需要将证书添加为系统证书，网上解决方法较多，比如使用安卓模拟器（兼容性差，很多应用闪退），使用xposed框架等，这里使用Android手机添加证书。

ps: 需要手机有root权限，以下操作以Redmi为准，其他品牌手机操作可能有差别。

## 导出证书（以Charles为例）

`help --> SSL Proxying --> Save Charles Root Certificate...`

![保存证书到本地目录](https://s2.loli.net/2023/07/02/zuRUXpx6O2VqG4k.png)

## Android 证书存储格式

**证书路径：**：`/system/etc/security/cacerts`

![证书路径](https://s2.loli.net/2023/07/09/OihywAoP4TRUu52.jpg)

**文件命名格式（如果计算出来的hash值已经存在则编号依次+1）**：`<hash>.%d`

## 将导出的证书计算hash值

需要安装openssl，Windows11默认安装openssl。

根据导出格式2选1。

```bash
openssl x509 -inform DER -subject_hash_old -in <filename>.cer # .cer格式证书
openssl x509 -inform PEM -subject_hash_old -in <filename>.pem # .pem格式证书
```

## 导入到手机

使用任何传输工具（比如微信、QQ等）将证书文件传输到手机。

到手机系统设置 > 密码与安全 > 系统安全 > 更多安全设置 > 加密与凭据 > 安装证书 > CA证书。

选择在手机根目录的证书文件安装。

## 使用Magisk模块提高权限

在Magisk中安装[Move Certificates](https://github.com/Magisk-Modules-Repo/movecert)模块（直接下载压缩包安装），重启手机即可使用Charles抓取手机https包。
