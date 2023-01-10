---
title: Python爬虫从入门到放弃（五）正则的基本使用
reprint: false
date: 2021-09-10 03:11:27
categories:
  - Code
tags: 
  - Spider
cover:
coverWidth:
coverHeight:
---

## 什么是正则表达式

正则表达式是对字符串操作的一种逻辑公式，就是事先定义好的一些特定字符及这些特定字符的组合，组成一个“规则字符”，这个“规则字符” 来表达对字符的一种过滤逻辑。

正则并不是Python独有的，其他语言也都有正则，Python中的正则，封装成了re模块。

## python正则的详细讲解

### 特殊字符

| 字符 |         描述         |
| :--: | :------------------: |
|  \w  | 匹配字母数字及下划线              |
|  \W  | 匹配f非字母数字下划线             |
|  \s  | 匹配任意空白字符，等价于[\t\n\r\f] |
| \S | 匹配任意非空字符 |
| \d | 匹配任意数字 |
| \D | 匹配任意非数字 |
| \A | 匹配字符串开始 |
| \Z | 匹配字符串结束，如果存在换行，只匹配换行前的结束字符串 |
| \z | 匹配字符串结束 |
| \G | 匹配最后匹配完成的位置 |
| \n | 匹配一个换行符 |
| \t | 匹配一个制表符 |
| ^ | 匹配字符串的开头 |
| $ | 匹配字符串的末尾 |
| . | 匹配任意字符，除了换行符，re.DOTALL标记被指定时，则可以匹配包括换行符的任意字符 |
| [....] | 用来表示一组字符，单独列出：[amk]匹配a,m或k |
| [^...] | 不在[]中的字符：[^abc]匹配除了a,b,c之外的字符 |

### 限定符

| 字符  |                         描述                         |
| :---: | :--------------------------------------------------: |
|   *   |                匹配0个或多个的表达式                 |
|   +   |               匹配1个或者多个的表达式                |
|   ?   | 匹配0个或1个由前面的正则表达式定义的片段，非贪婪方式 |
|  {n}  |                 精确匹配n前面的表示                  |
| {m,m} |    匹配n到m次由前面的正则表达式定义片段，贪婪模式    |
| a\|b  |                      匹配a或者b                      |
|  ()   |           匹配括号内的表达式，也表示一个组           |

### re.match()

尝试从字符串的起始位置匹配一个模式，如果不是起始位置匹配的话，`match()`就会返回`None`，语法格式：

```python
re.match(pattern,string,flags=0)
```

#### 最常规的匹配

```python
import re

content = "hello 123 4567 World_This is a regex Demo"
result = re.match(r"^hello\s\d\d\d\s\d{4}\s\w{10}.*Demo$", content)
print(result)
print(result.group())
print(result.span())
```

结果如下：

![](/images/c137ac114bd70380fc34e6c605634ad5.png)

`result.group()` - 获取匹配的结果
`result.span()` - 获去匹配字符串的长度范围

#### 泛匹配

其实相对来说上面的方式并不是非常方便，其实可以将上述的正则规则进行更改

```python
import re

content = "hello 123 4567 World_This is a regex Demo"
result = re.match(r"^hello.*Demo$", content)
print(result)
print(result.group())
print(result.span())
```

这段代码的结果和上面常规匹配的结果是一样的，但是写起来会方便很多

#### 匹配目标

如果为了匹配字符串中具体的目标，则需要通过`()`括起来，例子如下：

```python
import re

content = "hello 1234567 World_This is a regex Demo"
result = re.match(r'^hello\s(\d+)\sWorld.*Demo$', content)
print(result)
print(result.group())
print(result.group(1))
print(result.span())
```

结果如下：

![](/images/672a83f07cf4e4a71811b6363fd0cfd8.png)

这里需要说一下的是通过`re.group()`获得结果后，如果正则表达式中有括号，则`re.group(1)`获取的就是第一个括号中匹配的结果

#### 贪婪匹配

先看下面代码：

```python
import re

content = "hello 1234567 World_This is a regex Demo"
result = re.match(r'^hello.*(\d+).*Demo', content)
print(result)
print(result.group(1))
```

结果：

![](/images/011c8f755dd2dd1d09ce6376778e6fea.png)

从结果中可以看出只匹配到了`7`，并没有匹配到`1234567`，出现这种情况的原因是前面的`.*`给匹配掉了，`.*`在这里会尽可能的匹配多的内容，也就是我们所说的贪婪匹配，

如果我们想要匹配到`1234567`则需要将正则表达式改为：

```python
result = re.match(r'^he.*?(\d+).*Demo', content)
```

这样结果就可以匹配到`1234567`

#### 匹配模式

很多时候匹配的内容是存在换行的问题的，这个时候的就需要用到匹配模式`re.S`来匹配换行的内容

```python
import re

content = """hello 123456 world_this
my name is zhangsan
"""

result = re.match(r'^he.*?(\d+).*?zhangsan$', content, re.S)
print(result)
print(result.group())
print(result.group(1))
```

结果：

![](/images/fea8d8cdd554a9b5ec9007ce593df7a4.png)

#### 转义

当我们要匹配的内容中存在特殊字符的时候，就需要用到转移符号`\`，例子如下：

```python
import re

content = "price is $5.00"

result = re.match(r'price is \$5\.00', content)
print(result)
print(result.group())
```

对上面的一个小结：

- 尽量使用泛匹配，使用括号得到匹配目标，尽量使用非贪婪模式，有换行符就用`re.S`
- 强调`re.match`是从字符串的起始位置匹配一个模式

### re.search

re.search扫描整个字符串返回第一个成功匹配的结果

```python
import re

content = "extra things hello 123455 world_this is a Re Extra things"

result = re.search(r"hello.*?(\d+).*?Re", content)
print(result)
print(result.group())
print(result.group(1))
```

结果：

![](/images/7b4af2cf5d312a378e7bdd83dd2229cc.png)

其实这个时候我们就不需要在写`^`以及`$`，因为`search`是扫描整个字符串

> 注意：所以为了匹配方便，我们会更多的用search，不用match,match必须匹配头部，所以很多时候不是特别方便

#### 匹配演练

```python
import re

html = '''<div id="songs-list">
    <h2 class="title">经典老歌</h2>
    <p class="introduction">
        经典老歌列表
    </p>
    <ul id="list" class="list-group">
        <li data-view="2">一路上有你</li>
        <li data-view="7">
            <a href="/2.mp3" singer="任贤齐">沧海一声笑</a>
        </li>
        <li data-view="4" class="active">
            <a href="/3.mp3" singer="齐秦">往事随风</a>
        </li>
        <li data-view="6"><a href="/4.mp3" singer="beyond">光辉岁月</a></li>
        <li data-view="5"><a href="/5.mp3" singer="陈慧琳">记事本</a></li>
        <li data-view="5">
            <a href="/6.mp3" singer="邓丽君">但愿人长久</a>
        </li>
    </ul>
</div>'''

result = re.search(r'<li.*?active.*?singer="(.*?)">(.*?)</a>', html, re.S)
print(result)
print(result.groups())
print(result.group(1))
print(result.group(2))
```

结果：

![](/images/32c971c9f7be5035924a96e66118cad5.png)

### re.findall

搜索字符串，以列表的形式返回全部能匹配的子串

例子：

```python
import re

html = '''<div id="songs-list">
    <h2 class="title">经典老歌</h2>
    <p class="introduction">
        经典老歌列表
    </p>
    <ul id="list" class="list-group">
        <li data-view="2">一路上有你</li>
        <li data-view="7">
            <a href="/2.mp3" singer="任贤齐">沧海一声笑</a>
        </li>
        <li data-view="4" class="active">
            <a href="/3.mp3" singer="齐秦">往事随风</a>
        </li>
        <li data-view="6"><a href="/4.mp3" singer="beyond">光辉岁月</a></li>
        <li data-view="5"><a href="/5.mp3" singer="陈慧琳">记事本</a></li>
        <li data-view="5">
            <a href="/6.mp3" singer="邓丽君">但愿人长久</a>
        </li>
    </ul>
</div>'''

results = re.findall(r'<li.*?href="(.*?)".*?singer="(.*?)">(.*?)</a>', html, re.S)
print(results)
print(type(results))
for result in results:
    print(result)
    print(result[0], result[1], result[2])
```

结果：

![](/images/35ec50b34e4e1e4bf8089d51a81b19a5.png)

例子2：

```python
import re

html = '''<div id="songs-list">
    <h2 class="title">经典老歌</h2>
    <p class="introduction">
        经典老歌列表
    </p>
    <ul id="list" class="list-group">
        <li data-view="2">一路上有你</li>
        <li data-view="7">
            <a href="/2.mp3" singer="任贤齐">沧海一声笑</a>
        </li>
        <li data-view="4" class="active">
            <a href="/3.mp3" singer="齐秦">往事随风</a>
        </li>
        <li data-view="6"><a href="/4.mp3" singer="beyond">光辉岁月</a></li>
        <li data-view="5"><a href="/5.mp3" singer="陈慧琳">记事本</a></li>
        <li data-view="5">
            <a href="/6.mp3" singer="邓丽君">但愿人长久</a>
        </li>
    </ul>
</div>'''

results = re.findall(r'<li.*?>\s*?(<a.*?>)?(\w+)(</a>)?\s*?</li>', html, re.S)
print(results)
for result in results:
    print(result[1])
```

结果：

![](/images/6b0446b855af699ae8e72364cd7bab13.png)

其实这里我们就可以看出

`\s*?`这种用法其实就是为了解决有的有换行，有的没有换行的问题

`(<a.*?>)?` 这种用法是因为html中有的有a标签，有的没有的，？表示匹配一个或0个，正好可以用于匹配

### re.sub

替换字符串中每一个匹配的子串后返回替换后的字符串

`re.sub(pattern, repl, string, count=0, flags=0)`

例子1：

```python
import re

content = "Extra things hello 123455 World_this is a regex Demo extra things"

content = re.sub(r' \d+', '', content)
print(content)
```

结果为数字替换为空：

![](/images/3a182c09a5ba42ce14c160d8b3214cae.png)

例子2，在有些情况下我们替换字符的时候，还想获取我们匹配的字符串，然后在后面添加一些内容，可以通过下面方式实现：

```python
import re

content = "Extra things hello 12345 World_this is a regex Demo extra things"

content = re.sub(r'(\d+)', r'\1 7890',content)
print(content)
```

结果：

![](/images/bbe3d1050dbcf180b6d089c36ee441be.png)

这里需要注意的一个问题是`\1`是获取第一个匹配的结果，为了防止转义字符的问题，我们需要在前面加上`r`

### re.compile

将正则表达式编译成正则表达式对象，方便复用该正则表达式

```python
import re
content = """hello 12345 world_this
123 fan
"""

pattern = re.compile("hello.*fan", re.S)

result = re.match(pattern, content)
print(result)
print(result.group())
```

## 正则的综合练习

获取豆瓣网书籍的页面的书籍信息，通过正则实现

```python
import requests
import re
content = requests.get('https://book.douban.com/').text
pattern = re.compile('<li.*?cover.*?href="(.*?)".*?title="(.*?)".*?more-meta.*?author">(.*?)</span>.*?year">(.*?)</span>.*?</li>', re.S)
results = re.findall(pattern, content)

for result in results:
    url,name,author,date = result
    author = re.sub('\s','',author)
    date = re.sub('\s','',date)
    print(url,name,author,date)
```

![](/images/97851a5157c46f083307e20e9ce9f177.png)

## 最后

这里只是简单介绍基本操作，高级操作请look官方文档。

**官方文档** - <https://docs.python-requests.org/zh_CN/latest/>
