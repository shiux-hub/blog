---
title: 使用Charles抓Android 11的包ssl证书问题
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
Android 7以后，Android不信任用户安装的证书，所以抓https时无法解码请求，对于第三方应用，需要将证书添加为系统证书，网上解决方法较多，比如使用安卓模拟器（兼容性差，很多应用闪退），使用xposed框架等，这里使用Android手机添加证书。

ps: 需要手机有root权限，以下操作以Redmi为准，其他品牌手机操作可能有差别。

## 导出证书（以Charles为例）

help --> SSL Proxying --> Save Charles Root Certificate...

![](/images/8d26a15cb56c0eb03267a071633d28e6.png)

## Android 证书存储格式

**证书路径**

`/system/etc/security/cacerts`

![](/images/bc2ede2fd6f39e332872caa7cad7781c.jpg)

**文件命名格式（如果计算出来的hash值已经存在则编号依次+1）**：`<hash>.%d`

## 将导出的证书计算hash值

需要安装openssl

根据导出格式2选1

**.cer格式证书**

```bash
openssl x509 -inform DER -subject_hash_old -in filename.cer
```

**.pem格式证书**

```bash
openssl x509 -inform PEM -subject_hash_old -in filename.pem
```
