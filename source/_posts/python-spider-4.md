---
title: Python爬虫从入门到放弃（四）requests库的基本使用
reprint: false
date: 2021-09-10 03:08:33
categories:
  - Code
tags: 
  - Spider
cover:
coverWidth:
coverHeight:
---

## 什么是requests

requests是基于上篇的urllib编写的，采用的是Apache2 Licensed开源协议的HTTP库
如果你看过上篇文章关于urllib库的使用，你会发现，其实urllib还是非常不方便的，而requests它会比urllib更加方便，可以节约我们大量的工作。（用了requests之后，你基本都不愿意用urllib了）一句话，requests是python实现的最简单易用的HTTP库，建议爬虫使用requests库。

默认安装好python之后，是没有安装requests模块的，需要单独通过pip安装

```bash
pip install -U requests
```

## requests功能详解

### 总体功能的一个演示

```python
import requests

response = requests.get("https://www.baidu.com")
print(type(response))
print(response.status_code)
print(type(response.text))
print(response.text)
print(response.cookies)
print(response.content)
print(response.content.decode("utf-8"))
```

我们可以看出`response`使用起来确实非常方便，这里有个问题需要注意一下：
很多情况下的网站如果直接`response.text`会出现乱码的问题，所以这个使用`response.content`
这样返回的数据格式其实是二进制格式，然后通过`decode()`转换为`utf-8`，这样就解决了通过`response.text`直接返回显示乱码的问题.

请求发出后，requests会基于HTTP头部对响应的编码作出有根据的推测。当你访问`response.text`之时，requests会使用其推测的文本编码。你可以找出requests使用了什么编码，并且能够使用`response.encoding`属性来改变它.如：

```python
response =requests.get("http://www.baidu.com")
response.encoding="utf-8"
print(response.text)
```

不管是通过`response.content.decode("utf-8)`的方式还是通过`response.encoding="utf-8"`的方式都可以避免乱码的问题发生

### 各种请求方式

requests里提供个各种请求方式

```python
import requests
requests.post("http://httpbin.org/post")
requests.put("http://httpbin.org/put")
requests.delete("http://httpbin.org/delete")
requests.head("http://httpbin.org/get")
requests.options("http://httpbin.org/get")
```

#### 基本GET请求

```python
import requests

response = requests.get('http://httpbin.org/get')
print(response.text)
```

带参数的GET请求，例子1

```python
import requests

response = requests.get("http://httpbin.org/get?name=zhaofan&age=23")
print(response.text)
```

如果我们想要在URL查询字符串传递数据，通常我们会通过`httpbin.org/get?key=val`方式传递。requests模块允许使用`params`关键字传递参数，以一个字典来传递这些参数，例子如下：

```python
import requests
data = {
    "name":"张三",
    "age":22
}
response = requests.get("http://httpbin.org/get",params=data)
print(response.url)
print(response.text)
```

**解析json**

```python
import requests
import json

response = requests.get("http://httpbin.org/get")
print(type(response.text))
print(response.json())
print(json.loads(response.text))
print(type(response.json()))
```

从结果可以看出两者的返回是一样的，阅读源码发现requests里面集成的json其实就是执行了`json.loads()`方法，两者的结果是一样的

**获取二进制数据**

在上面提到了`response.content`，这样获取的数据是二进制数据，同样的这个方法也可以用于下载图片以及
视频资源

**添加headers**

和前面我们将urllib模块的时候一样，我们同样可以定制headers的信息，如当我们直接通过requests请求知乎网站的时候，默认是无法访问的

```python
import requests
response = requests.get("https://www.zhihu.com")
print(response.text)
```

这样会得到如下的错误

![](/images/38ad26ac8106628a0bcfc967f6de929d.png)

因为访问知乎需要头部信息，这个时候我们在谷歌浏览器里输入`chrome://version`,就可以看到用户代理，将用户代理添加到头部信息

![](/images/ff2a8bf9106d8895019cf9bda732057e.png)

```python
import requests
headers = {
    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36"
}
response = requests.get("https://www.zhihu.com", headers=headers)

print(response.text)
```

这样就可以正常的访问知乎了

#### 基本POST请求

通过在发送post请求时添加一个data参数，这个data参数可以通过字典构造成，这样对于发送post请求就非常方便

```python
import requests

data = {
    "name":"张三",
    "age":23
}
response = requests.post("http://httpbin.org/post", data=data)
print(response.text)
```

同样的在发送post请求的时候也可以和发送get请求一样通过headers参数传递一个字典类型的数据

**响应**

我们可以通过`response`获得很多属性，例子如下

```python
import requests

response = requests.get("http://www.baidu.com")
print(type(response.status_code),response.status_code)
print(type(response.headers),response.headers)
print(type(response.cookies),response.cookies)
print(type(response.url),response.url)
print(type(response.history),response.history)
```

![](/images/4a3df54401dda3764b09d1aceeaafe03.png)

**状态码判断**

requests还附带了一个内置的状态码查询对象，主要有如下内容：

```yml
100: ('continue',),
101: ('switching_protocols',),
102: ('processing',),
103: ('checkpoint',),
122: ('uri_too_long', 'request_uri_too_long'),
200: ('ok', 'okay', 'all_ok', 'all_okay', 'all_good', '\o/', '✓'),
201: ('created',),
202: ('accepted',),
203: ('non_authoritative_info', 'non_authoritative_information'),
204: ('no_content',),
205: ('reset_content', 'reset'),
206: ('partial_content', 'partial'),
207: ('multi_status', 'multiple_status', 'multi_stati', 'multiple_stati'),
208: ('already_reported',),
226: ('im_used',),

# Redirection
300: ('multiple_choices',),
301: ('moved_permanently', 'moved', '\o-'),
302: ('found',),
303: ('see_other', 'other'),
304: ('not_modified',),
305: ('use_proxy',),
306: ('switch_proxy',),
307: ('temporary_redirect', 'temporary_moved', 'temporary'),
308: ('permanent_redirect',
'resume_incomplete', 'resume',), # These 2 to be removed in 3.0

# Client Error
400: ('bad_request', 'bad'),
401: ('unauthorized',),
402: ('payment_required', 'payment'),
403: ('forbidden',),
404: ('not_found', '-o-'),
405: ('method_not_allowed', 'not_allowed'),
406: ('not_acceptable',),
407: ('proxy_authentication_required', 'proxy_auth', 'proxy_authentication'),
408: ('request_timeout', 'timeout'),
409: ('conflict',),
410: ('gone',),
411: ('length_required',),
412: ('precondition_failed', 'precondition'),
413: ('request_entity_too_large',),
414: ('request_uri_too_large',),
415: ('unsupported_media_type', 'unsupported_media', 'media_type'),
416: ('requested_range_not_satisfiable', 'requested_range', 'range_not_satisfiable'),
417: ('expectation_failed',),
418: ('im_a_teapot', 'teapot', 'i_am_a_teapot'),
421: ('misdirected_request',),
422: ('unprocessable_entity', 'unprocessable'),
423: ('locked',),
424: ('failed_dependency', 'dependency'),
425: ('unordered_collection', 'unordered'),
426: ('upgrade_required', 'upgrade'),
428: ('precondition_required', 'precondition'),
429: ('too_many_requests', 'too_many'),
431: ('header_fields_too_large', 'fields_too_large'),
444: ('no_response', 'none'),
449: ('retry_with', 'retry'),
450: ('blocked_by_windows_parental_controls', 'parental_controls'),
451: ('unavailable_for_legal_reasons', 'legal_reasons'),
499: ('client_closed_request',),

# Server Error
500: ('internal_server_error', 'server_error', '/o\', '✗'),
501: ('not_implemented',),
502: ('bad_gateway',),
503: ('service_unavailable', 'unavailable'),
504: ('gateway_timeout',),
505: ('http_version_not_supported', 'http_version'),
506: ('variant_also_negotiates',),
507: ('insufficient_storage',),
509: ('bandwidth_limit_exceeded', 'bandwidth'),
510: ('not_extended',),
511: ('network_authentication_required', 'network_auth', 'network_authentication'),
```

通过下面例子测试：（不过通常还是通过状态码判断更方便）

```python
import requests

response = requests.get("http://www.baidu.com")
if response.status_code == requests.codes.ok:
    print("访问成功")
```

### requests高级用法

#### 文件上传

实现方法和其他参数类似，也是构造一个字典然后通过`files`参数传递

```python
import requests
files = {"files": open("git.jpeg", "rb")}
response = requests.post("http://httpbin.org/post", files=files)
print(response.text)
```

结果如下：

![](/images/634a55e0d8b8c58ad854dca975cc6fc2.png)

#### 获取cookie

```python
import requests

response = requests.get("http://www.baidu.com")
print(response.cookies)

for key, value in response.cookies.items():
    print(key + "=" + value)
```

#### 会话维持

cookie的一个作用就是可以用于模拟登陆，做会话维持

```python
import requests
s = requests.Session()
s.get("http://httpbin.org/cookies/set/number/123456")
response = s.get("http://httpbin.org/cookies")
print(response.text)
```

这是正确的写法，而下面的写法则是错误的

```python
import requests

requests.get("http://httpbin.org/cookies/set/number/123456")
response = requests.get("http://httpbin.org/cookies")
print(response.text)
```

因为这种方式是两次requests请求之间是独立的，而第一次则是通过创建一个`session`对象，两次请求都通过这个对象访问

#### 证书验证

现在的很多网站都是https的方式访问，所以这个时候就涉及到证书的问题

```python
import requests

response = requests.get("https:/www.12306.cn")
print(response.status_code)
```

默认的12306网站的证书是不合法的，这样就会提示如下错误

![](/images/c452bf937dde0537cfb40b6b23c37681.png)

为了避免这种情况的发生可以通过`verify=False`

> 虽然这样可以访问到页面，但是会提示：
> InsecureRequestWarning: Unverified HTTPS request is being made. Adding certificate verification is strongly advised.
> See: https://urllib3.readthedocs.io/en/latest/advanced-usage.html#ssl-warnings InsecureRequestWarning)

解决方法为：

```python
import requests
from requests.packages import urllib3
urllib3.disable_warnings()
response = requests.get("https://www.12306.cn", verify=False)
print(response.status_code)
```

这样就不会提示警告信息，当然也可以通过`cert`参数放入证书路径

#### 代理设置

```python
import requests

proxies = {
    "http":"http://127.0.0.1:7890",
    "https":"http://127.0.0.1:7890"
}
response = requests.get("https://www.baidu.com", proxies=proxies)
print(response.text)
```

如果代理需要设置账户名和密码,只需要将字典更改为如下：

```python
proxies = {
    "http":"http://user:password@127.0.0.1:7890"
}
```

如果你的代理是通过socks这种方式则需要`pip install requests[socks]`

```python
proxies= {
    "http": "socks5://127.0.0.1:7890",
    "https": "socks5://127.0.0.1:7890"
}
```

#### 超时设置

通过`timeout`参数可以设置超时的时间

#### 认证设置

如果碰到需要认证的网站可以通过`requests.auth`模块实现

```python
import requests

from requests.auth import HTTPBasicAuth

response = requests.get("http://120.27.34.24:9001/", auth=HTTPBasicAuth("user","123"))
print(response.status_code)
```

当然这里还有一种方式

```python
import requests

response = requests.get("http://120.27.34.24:9001/", auth=("user","123"))
print(response.status_code)
```

#### 异常处理

关于requests的异常在这里可以看到详细内容：

<https://docs.python-requests.org/en/latest/api/#exceptions>

所有的异常都是在`requests.exceptions`中

![](/images/067dc096532165e860baa0830cff5a59.png)

从源码我们可以看出`RequestException`继承`IOError`,
`HTTPError`，`ConnectionError`，`Timeout`继承`RequestException`
`ProxyError`，`SSLError`继承`ConnectionError`
`ReadTimeout`继承`Timeout`异常

这里列举了一些常用的异常继承关系，详细的可以看：

<https://docs.python-requests.org/en/master/_modules/requests/exceptions/#RequestException>

通过下面的例子进行简单的演示

```python
import requests

from requests.exceptions import ReadTimeout,ConnectionError,RequestException


try:
    response = requests.get("http://httpbin.org/get", timeout=0.1)
    print(response.status_code)
except ReadTimeout:
    print("timeout")
except ConnectionError:
    print("connection Error")
except RequestException:
    print("error")
```

其实最后测试可以发现，首先被捕捉的异常是`timeout`,当把网络断掉的`haul`就会捕捉到`ConnectionError`，如果前面异常都没有捕捉到，最后也可以通过`RequestException`捕捉到

## 最后

这里只是简单介绍基本操作，高级操作请look官方文档。

**官方文档** - <https://docs.python.org/3/library/urllib.html>

[官方文档](https://docs.python-requests.org/zh_CN/latest/)
