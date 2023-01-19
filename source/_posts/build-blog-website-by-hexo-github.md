---
title: 在本地搭建Hexo博客框架并部署到Github
reprint: false
tags:
  - Git
  - Hexo
  - Nodejs
  - npm
  - 技巧
  - 笔记
categories:
  - Guide
date: 2020-02-14 21:38:23
cover: /images/9d81d3ceb7793031cbb580c24ab2fa88.png
coverWidth:
coverHeight:
---

## 简介

### 什么是 Hexo ？

Hexo 是一个快速、简单且强大的部落格框架。能够使用`Markdown`语法来新增文章，快速渲染你的文章，有强大的外挂系统及丰富的扩充性，简单易用，让你可以专注与写作中，不被複杂的操作影响写作的体验，对于习惯使用`Markdown`纪录内容的人可说是一大福音，可以套用主题让你的网页变得更加漂亮，重点来了！Hexo 是由台湾人制作的，官方文件都有中文语系的支援，更能降低入门的门槛。

**官网** - <http://hexo.io>
**GitHub** - <https://github.com/hexojs/hexo>

### 什么是GitHub？

GitHub是一个在线软件源代码托管服务平台，使用Git作为版本控制软件，由开发者Chris Wanstrath、P. J. Hyett和汤姆·普雷斯顿·沃纳使用Ruby on Rails编写而成。在2018年，GitHub被微软公司收购。（维基百科）

**官网** - <https://github.com>

## 前言

使用`Github Pages`服务搭建博客的好处有：

1. 全是静态文件，访问速度快；
2. 免费方便，不用花一分钱就可以搭建一个自由的个人博客，不需要服务器不需要后台；
3. 可以随意绑定自己的域名，不仔细看的话根本看不出来你的网站是基于`Github`的；
4. 数据绝对安全，基于`Github`的版本管理，想恢复到哪个历史版本都行；
5. 博客内容可以轻松打包、转移、发布到其它平台；
6. 等等；

### 准备工作

在开始一切之前，你必须已经：

- 有一个`Github`账号，没有的话去注册一个；
- 安装了`node.js`、`npm`，并了解相关基础知识；
- 安装了`git for windows`（或者其它git客户端）

本文所使用的环境：

- Windows10
- [~~node.js@12.14.1~~node.js@19.3.0](https://nodejs.org/en/)
- [~~git@2.25.0~~git@2.39.0](https://git-scm.com/downloads)
- [~~hexo@3.9.0~~hexo@6.3.0](https://hexo.io/zh-cn/docs/index.html)

> 版本不同内容可能有删改，请酌情使用。

## 搭建Github博客

### 创建仓库

~~新建一个名为`[username].github.io`的仓库，比如说，如果你的Github用户名是test，那么你就新建`test.github.io`的仓库（必须是你的用户名，其它名称无效），将来你的网站访问地址就是`https://test.github.io`了，是不是很方便？~~

新版Github将Pages功能分割了出来，现在不需要像`[username].github.com`这样设置仓库名了。

![新建仓库](https://i.loli.net/2020/07/24/IipTgvmKF6yrR1c.png)

~~由此可见，每一个Github账户最多只能创建一个这样可以直接使用域名访问的仓库。~~

几个注意的地方：

1. 注册的邮箱一定要验证，否则不会成功；
2. ~~仓库名字必须是：`username.github.io`，其中`username`是你的用户名；~~
3. 仓库创建成功不会立即生效，需要过一段时间，大概10-30分钟，或者更久，我的等了半个小时才生效；

创建成功后，默认会在你这个仓库里生成一些示例页面，以后你的网站所有代码都是放在这个仓库里啦。

### 安装hexo基本框架

#### 新建文件夹

这一步是为了给你的博客找一个合适的位置。新建的文件夹的命名是随意的。如下图。

![新建文件夹](https://i.loli.net/2020/07/24/qDPyxdHz3GUXguE.png)

#### 使用`VSCode`打开文件夹并新建终端

打开`VSCode->`打开文件夹`->`选择文件夹`->`点击打开

![使用VSCode打开文件夹](https://i.loli.net/2020/07/24/VYLKwh67ezbcHSp.png)

点击菜单栏中的终端`->`新终端

![新建终端](https://i.loli.net/2020/07/24/YIpiFcCyNnZj3og.png)

## 配置SSH key

为什么要配置这个呢？因为你提交代码肯定要拥有你的Github权限才可以，但是直接使用用户名和密码太不安全了，所以我们使用ssh key来解决本地和服务器的连接问题。

```bash
cd ~/. ssh #检查本机已存在的ssh密钥
```

如果提示：`No such file or directory`说明你是第一次使用git。

```bash
ssh-keygen -t rsa -C "邮件地址"
```

然后连续3次回车，最终会生成一个文件在用户目录下，打开用户目录，找到`.ssh\id_rsa.pub`文件，记事本打开并复制里面的内容，打开你的Github主页，进入个人设置 -> SSH and GPG keys -> New SSH key：

![SHH key](https://i.loli.net/2020/02/14/tnmoY5iSaWBX2kJ.png)

将刚复制的内容粘贴到`key`那里，`title`随便填，保存。

### 测试是否成功

```bash
ssh -T git@github.com # 注意邮箱地址不用改
```

如果提示`Are you sure you want to continue connecting (yes/no)?`，输入`yes`，然后会看到：

> Hi shiux! You've successfully authenticated, but GitHub does not provide shell access.

看到这个信息说明SSH已配置成功！

此时你还需要配置：

```bash
git config --global user.name "shiux" // 你的Github用户名，非昵称
git config --global user.email "xxx@qq.com" // 填写你的Github注册邮箱
```

如果没有配置git的话

## 使用hexo写博客

### 原理

由于Github Pages存放的都是静态文件，博客存放的不只是文章内容，还有文章列表、分类、标签、翻页等动态内容，假如每次写完一篇文章都要手动更新博文目录和相关链接信息，相信谁都会疯掉，所以hexo所做的就是将这些md文件都放在本地，每次写完文章后调用写好的命令来批量完成相关页面的生成，然后再将有改动的页面提交到Github。

### 注意事项

安装之前先来说几个注意事项：

1. 很多命令既可以用Windows的cmd来完成，也可以使用git bash来完成，但是部分命令会有一些问题，为避免不必要的问题，建议全部使用git bash来执行；
2. hexo不同版本差别比较大，网上很多文章的配置信息都是基于2.x的，所以注意不要被误导；
~~hexo有2种`_config.yml`文件，一个是根目录下的全局的`_config.yml`，一个是各个`theme`下的；~~
3. 自hexo5.x以来，基本所有主题的配置文件都需要复制到根目录，为了好更新主题。

### 安装

```bash
npm install hexo-cli -g
```

### 初始化

在电脑的某个地方新建一个名为hexo的文件夹（名字可以随便取），比如我的是`F:\Workspaces\blog`，由于这个文件夹将来就作为你存放代码的地方，所以最好不要随便放。

```bash
cd /f/Workspaces/blog/
hexo init # 初始化项目
```

hexo会自动下载一些文件到这个目录，包括node_modules，目录结构如下图：

![博客结构](https://s2.loli.net/2022/12/30/1gUti4z6akcxdmv.png)

```bash
hexo g # 生成
hexo s # 启动服务
```

执行以上命令之后，hexo就会在public文件夹生成相关html文件，这些文件将来都是要提交到Github去的：

![生成文件](https://s2.loli.net/2022/12/30/oZQNBI5h2UCm7fr.png)

`hexo s`是开启本地预览服务，打开浏览器访问`http://localhost:4000`即可看到内容。

![预览服务](https://i.loli.net/2020/02/14/3ktMhDWcORioaup.png)

### 修改主题

既然默认主题很丑，那我们别的不做，首先来替换一个好看点的主题。这是<https://hexo.io/themes/>。

个人比较喜欢主题：

**Next** - <https://github.com/next-theme/hexo-theme-next>

首先下载这个主题：

```bash
cd /f/Workspaces/blog/
git clone https://github.com/next-theme/hexo-theme-next.git themes/next
```

修改`_config.yml`中的`theme: landscape`改为`theme: next`，然后重新执行`hexo g`来重新生成。 如果出现一些莫名其妙的问题，可以先执行`hexo clean`来清理一下public的内容，然后再来重新生成和发布。

### 部署之前

> 在上传代码到Github之前，一定要记得先把你以前所有代码下载下来（虽然Github有版本管理，但备份一下总是好的），因为从hexo提交代码时会把你以前的所有代码都删掉。

### 部署到Github

目前有两种方式进行部署。

#### 使用GitHub Workflows进行部署（推荐）

在博客目录新建一个文件`.github/workflows/deploy-blog.yml`写入以下内容。

![完整目录结构](https://s2.loli.net/2022/12/30/PlXuoGjdLZ5yvQE.png)

```yaml
name: 部署博客

on:
  push:
    branches:
      # 确保这是你正在使用的分支名称
      - main

jobs:
  deploy-gh-pages:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
          # 如果你文档需要 Git 子模块，取消注释下一行
          # submodules: true

      - name: 安装 pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 7
          run_install: true


      - name: 设置 Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: pnpm


      - name: 构建文档
        env:
          NODE_OPTIONS: --max_old_space_size=8192
        run: |-
          pnpm run build

      - name: 部署文档
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          # 这是文档部署到的分支名称
          branch: gh-pages
          folder: public
```

之后使用以下命令提交代码到GitHub，之后GitHub会自动处理代码并部署到`gh-pages`分支。

```bash
git init
git add .
git commit -m "Init Blog"
git branch -M main
git remote add origin https://github.com/shiux/shiux.github.io.git
git push -u origin main
```

GitHub开始自动部署。

![自动部署](https://s2.loli.net/2022/12/30/eSZQJdxgDoWPBKp.png)

#### 本地插件部署（不推荐）。使用`hexo-deployer-git`插件部署

如果你一切都配置好了，发布上传很容易，一句`hexo d`就搞定，当然关键还是你要把所有东西配置好。 首先，`ssh key`肯定要配置好。 其次，配置`_config.yml`中有关deploy的部分：

正确写法：

```yaml
deploy:
  type: git
  repository: git@github.com:shiux/shiux.github.io.git
  branch: main
```

错误写法：

```yaml
deploy:
  type: github
  repository: https://github.com/shiux/shiux.github.io.git
  branch: main
```

Github将默认分支从`master`修改为了`main`，注意分支选择。

后面一种写法是hexo2.x的写法，现在已经不行了，无论是哪种写法，此时直接执行`hexo d`的话一般会报如下错误：

> Deployer not found: Github 或者 Deployer not found: git

原因是还需要安装一个插件：

```bash
npm install hexo-deployer-git --save
```

其它命令不确定，部署这个命令一定要用git bash，否则会提示`Permission denied (public key).`打开你的git bash，输入`hexo d`就会将本次有改动的代码全部提交，没有改动的不会。

### 开启pages功能

![开启pages功能](https://s2.loli.net/2022/12/30/RCG4FZ9IxfPcTJY.png)

- 如果使用的是本地插件部署，选择`main`分支。
- 如果使用的是GitHub自动部署，选择`gh-pages`分支。

### 绑定域名

当然，你不绑定域名肯定也是可以的，就用默认的 `xxx.github.io` 来访问，如果你想更个性一点，想拥有一个属于自己的域名，那也是OK的。

首先你要注册一个域名，域名注册以前总是推荐去`godaddy`，现在觉得其实国内的阿里云也挺不错的，价格也不贵，毕竟是大公司，放心！

绑定域名分2种情况：带`www`和不带`www`的。

域名配置最常见有2种方式，`CNAME`和`A`记录，`CNAME`填写域名，`A`记录填写`IP`，由于不带`www`方式只能采用A记录，所以必须先ping一下`[username].github.io`的IP，然后到你的域名`DNS`设置页，将A记录指向你`ping`出来的IP，将`CNAME`指向`[username].github.io`，这样可以保证无论是否添加www都可以访问，如下：

![域名配置](https://i.loli.net/2020/02/15/oCH6dlQSvz9y3On.png)

然后到你的`Github`项目根目录新建一个名为`CNAME`的文件（无后缀），里面填写你的域名，加不加`www`看你自己喜好，因为经测试：

- 如果你填写的是没有`www`的，比如`shiux.com`，那么无论是访问`https://www.shiux.com`还是`https://shiux.com`，都会自动跳转到`https://shiux.com`
- 如果你填写的是带`www`的，比如`www.shiux.com`，那么无论是访问`https://www.shiux.com`还是`https://shiux.com`，都会自动跳转到`https://www.shiux.com`
- 如果你填写的是其它子域名，比如`abc.shiux.com`，那么访问`https://abc.shiux.com`没问题，但是访问`https://shiux.com`，不会自动跳转到`https://abc.shiux.com`

![创建CNAME](https://i.loli.net/2020/02/14/mkpGldxjHu53Jvc.png)

![写入域名地址](https://i.loli.net/2020/02/14/jU6AiKkHY3ZSbd4.png)

另外说一句，在你绑定了新域名之后，原来的`username.github.io`并没有失效，而是会自动跳转到你的新域名。

### 保留CNAME、README.md等文件

提交之后网页上一看，发现以前其它代码都没了，此时不要慌，一些非md文件可以把他们放到source文件夹下，这里的所有文件都会原样复制（除了md文件）到`public`目录的：

![source文件夹](https://i.loli.net/2020/02/14/WdeYlXztnFsH587.png)

由于hexo默认会把所有md文件都转换成html，包括`README.md`，所有需要每次生成之后、上传之前，手动将`README.md`复制到`public`目录，并删除README.html。

### 常用hexo命令

```bash
# 常见命令
hexo new "postName" #新建文章
hexo new page "pageName" #新建页面
hexo generate #生成静态页面至public目录
hexo server #开启预览访问端口（默认端口4000，'ctrl + c'关闭server）
hexo deploy #部署到GitHub
hexo help  # 查看帮助
hexo version  #查看Hexo的版本

# 缩写
hexo n == hexo new
hexo g == hexo generate
hexo s == hexo server
hexo d == hexo deploy

# 组合命令
hexo s -g #生成并本地预览
hexo d -g #生成并上传
```

### _config.yml

这里面都是一些全局配置，每个参数的意思都比较简单明了，所以就不作详细介绍了。 需要特别注意的地方是，冒号后面必须有一个空格，否则可能会出问题。

### 写博客

定位到我们的hexo根目录，执行命令： `hexo new 'my-first-blog'` hexo会帮我们在`_posts`下生成相关md文件：

![新建文章](https://i.loli.net/2020/02/14/sUKjNzRLxEVPS2g.png)

当然你也可以直接自己新建md文件，用这个命令的好处是帮我们自动生成了时间。 一般完整格式如下：

```yaml
title: postName # 文章页面上的显示名称，一般是中文
date: 2013-12-02 15:30:16 # 文章生成时间，一般不改，当然也可以任意修改
categories: 默认分类 # 分类
tags: # 文章标签，可空，多标签请用格式，注意:后面有个空格
  - tag1
  - tag2
  - tag3
description: 附加一段文章摘要，字数最好在140字以内，会出现在meta的description里面
```

以下是正文

那么`hexo new page 'postName'`命令和`hexo new 'postName'`有什么区别呢？ `hexo new page 'my-second-blog'` 最终部署时生成：`hexo\public\my-second-blog\index.html`，但是它不会作为文章出现在博文目录。

#### 写博客工具

那么用什么工具写博客呢？这个我还没去找，以前自己使用editor.md简单弄了个，大家有好用的hexo写博客工具可以推荐个。

#### 如何让博文列表不显示全部内容

```markdown
## 简介

### 什么是 Hexo ？

Hexo 是一个快速、简单且强大的部落格框架。能够使用`Markdown`语法来新增文章，快速渲染你的文章，有强大的外挂系统及丰富的扩充性，简单易用，让你可以专注与写作中，不被複杂的操作影响写作的体验，对于习惯使用`Markdown`纪录内容的人可说是一大福音，可以套用主题让你的网页变得更加漂亮，重点来了！Hexo 是由台湾人制作的，官方文件都有中文语系的支援，更能降低入门的门槛。

**官网** - <http://hexo.io>
**GitHub** - <https://github.com/hexojs/hexo>

```
