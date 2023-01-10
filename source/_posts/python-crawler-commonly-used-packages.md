---
title: Python爬虫常用包
reprint: false
date: 2021-09-02 17:03:51
categories:
  - Code
tags:
  - 笔记
cover: /images/9169d43e06c57fe8e49be96450a5beaa.png
coverWidth:
coverHeight:
---

可用于爬虫的编程语言有不少,但Python绝对是其中的主流之一。下面就为大家介绍下Python在编写网络爬虫常常用到的一些包。

## 请求：实现 HTTP 请求操作

**urllib** - <https://docs.python.org/zh-cn/3/library/urllib.html>

一系列用于操作URL的功能。

**requests** - <https://docs.python-requests.org/zh_CN/latest/>

基于 urllib 编写的，阻塞式 HTTP 请求库，发出一个请求，一直等待服务器响应后，程序才能进行下一步处理。

**aiohttp** - <https://docs.aiohttp.org/en/stable/>

基于 asyncio 实现的 HTTP 框架。异步操作借助于 async/await 关键字，使用异步库进行数据抓取，可以大大提高效率。

**httpx** - <https://www.python-httpx.org/>

全功能 HTTP 客户端，提供同步和异步 API，并支持 HTTP/1.1 和 HTTP/2。

## 解析：从网页中提取信息

**Beautiful Soup** - <https://www.crummy.com/software/BeautifulSoup/bs4/doc/>

html 和 XML 的解析,从网页中提取信息，同时拥有强大的API和多样解析方式。

[中文文档](https://beautifulsoup.readthedocs.io/zh_CN/v4.4.0/)

**pyquery** - <https://pyquery.readthedocs.io/en/latest/>

jQuery 的 Python 实现，能够以 jQuery 的语法来操作解析 HTML 文档，易用性和解析速度都很好。

**lxml** - <https://lxml.de/>

支持HTML和XML的解析，支持XPath解析方式，而且解析效率非常高。

**tesserocr** - <https://tesseract-ocr.github.io/>

在遇到验证码（图形验证码为主）的时候，可直接用 OCR 进行识别。

**feedparser** - <https://pythonhosted.org/feedparser/>

通用 feed 解析器。

**Readability** - <https://readability-python-library.readthedocs.io/en/latest/>

它提供了对Parser API和Reader API的访问

## 存储：Python 与数据库交互

**PyMysql** - <https://pymysql.readthedocs.io/en/latest/>

纯 Python 实现的 MySQL 客户端操作包。

**PyMongo** - <https://pymongo.readthedocs.io/en/stable/>

MongoDB官方开发的操作MongoDB数据库的包。

**redis** - <https://redis-py.readthedocs.io/en/stable/>

用于连接 redis 数据库的包。

**aioredis** - <https://aioredis.readthedocs.io/en/latest/>

基于asyncio为Redis提供简单清晰的接口。

## 框架

**Scrapy** - <https://docs.scrapy.org/en/latest/>

很强大的爬虫框架，可以满足简单的页面爬取（比如可以明确获知url pattern的情况）。用这个框架可以轻松爬下来如亚马逊商品信息之类的数据。但是对于稍微复杂一点的页面，如 weibo 的页面信息，这个框架就满足不了需求了。

**Portia** - <https://portia.readthedocs.io/en/latest/index.html>

可视化爬取网页内容。

**PySpider** - <http://docs.pyspider.org/en/latest/>

一个强大的爬虫系统。

**Ruia** - <https://www.howie6879.cn/ruia/>

基于asyncio和aiohttp的异步爬虫框架，目标在于让开发者编写爬虫尽可能地方便快速。

[开源地址](https://github.com/howie6879/ruia)

**Newspaper** - <https://newspaper.readthedocs.io/en/latest/>

提取新闻、文章以及内容分析。

**Grab** - <https://grab.readthedocs.io/en/latest/>

你可以构建各种复杂的web爬虫，从简单的5行脚本到复杂的异步网站爬虫处理数百万个网页。

**Cola** - <https://github.com/qinxuye/cola/wiki>

一个分布式爬虫框架。项目整体设计有点糟，模块间耦合度较高。

## 自动化

**selenium** - <https://www.selenium.dev/documentation/>

自动化测试工具。一个调用浏览器的 driver，通过这个库你可以直接调用浏览器完成某些操作，比如输入验证码。

[中文文档](https://docs.python-requests.org/zh_CN/latest/)

**MechanicalSoup** - <https://mechanicalsoup.readthedocs.io/en/stable/>

用于自动和网络站点交互的 Python 库。

## Web 框架

**Flask** - <https://flask.palletsprojects.com/en/2.0.x/>

轻量级的 web 服务程序，简单，易用，灵活，主要来做一些 API 服务。做代理时可能会用到。

**Django** - <https://docs.djangoproject.com/zh-hans/3.2/>

一个 web 服务器框架，提供了一个完整的后台管理，引擎、接口等，使用它可做一个完整网站。

**FastAPI** - <https://fastapi.tiangolo.com/zh/>

用于构建 API 的现代、快速（高性能）的 web 框架，使用 Python 3.6+ 并基于标准的 Python 类型提示。

**Masonite** - <https://docs.masoniteproject.com/>

非常适合初学者开发他们的第一个 Web 应用程序。

**Tornado** - <https://www.tornadoweb.org/en/stable/>

通过使用非阻塞网络 I/O，Tornado 可以扩展到数万个打开的连接，使其成为长轮询、WebSockets 和其他需要与每个用户建立长期连接的应用程序的理想选择。

**web2py** - <http://www.web2py.com/books/default/chapter/35>

目前功能最全的开源web框架之一。

**Quixote** - <http://quixote.ca/>

灵活和高性能的web框架。
