---
title: Python爬虫从入门到放弃（六）BeautifulSoup库的使用
reprint: false
date: 2021-09-11 02:07:45
categories:
  - Code
tags: 
  - Spider
cover:
coverWidth:
coverHeight:
---

上一篇文章的正则，其实对很多人来说用起来是不方便的，加上需要记很多规则，所以用起来不是特别熟练，而这篇我们提到的BeautifulSoup就是一个非常强大的工具，爬虫利器。

BeautifulSoup “美味的汤，绿色的浓汤”

一个灵活又方便的网页解析库，处理高效，支持多种解析器。

利用它就不用编写正则表达式也能方便的实现网页信息的抓取

## 快速使用

通过下面的一个例子，对bs4有个简单的了解，以及看一下它的强大之处：

```python
from bs4 import BeautifulSoup

html = '''
<html><head><title>The Dormouse's story</title></head>
<body>
<p class="title"><b>The Dormouse's story</b></p>

<p class="story">Once upon a time there were three little sisters; and their names were
<a href="http://example.com/elsie" class="sister" id="link1">Elsie</a>,
<a href="http://example.com/lacie" class="sister" id="link2">Lacie</a> and
<a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>;
and they lived at the bottom of a well.</p>
<p class="story">...</p>
'''
soup = BeautifulSoup(html,'lxml')
print(soup.prettify())
print(soup.title)
print(soup.title.name)
print(soup.title.string)
print(soup.title.parent.name)
print(soup.p)
print(soup.p["class"])
print(soup.a)
print(soup.find_all('a'))
print(soup.find(id='link3'))
```

结果：

![](/images/649b156d7470d31208cb691f5697b1ec.png)

使用BeautifulSoup解析这段代码，能够得到一个BeautifulSoup的对象，并能按照标准的缩进格式的结构输出。

同时我们通过下面代码可以分别获取所有的链接，以及文字内容：

```python
for link in soup.find_all('a'):
    print(link.get('href'))

print(soup.get_text())
```

## 解析器

BeautifulSoup支持Python标准库中的HTML解析器，还支持一些第三方的解析器，如果我们不安装它，则Python会使用Python默认的解析器，lxml解析器更加强大，速度更快，推荐安装。

下面是常见解析器：

![](/images/7f3c92a1dbfd8c0b5f8a165fb7a033f0.png)

推荐使用lxml作为解析器，因为效率更高。

在Python2.7.3之前的版本和Python3中3.2.2之前的版本,必须安装lxml或html5lib，因为那些Python版本的标准库中内置的HTML解析方法不够稳定。

## 基本使用

### 标签选择器

在快速使用中我们添加如下代码：

```python
print(soup.title)
print(type(soup.title))
print(soup.head)
print(soup.p)
```

通过这种`soup.{tag_name}`我们就可以获得这个标签的内容。

这里有个问题需要注意，通过这种方式获取标签，如果文档中有多个这样的标签，返回的结果是第一个标签的内容，如上面我们通过`soup.p`获取p标签，而文档中有多个p标签，但是只返回第一个p标签内容。

### 获取名称

当我们通过`soup.title.name`的时候就可以获得该标签的名称，即`title`

### 获取属性

```python
print(soup.p.attrs['name'])
print(soup.p['name'])
```

上面两种方式都可以获取p标签的`name`属性值

### 获取内容

```python
print(soup.p.string)
```

结果就可以获取第一个p标签的内容。

### 嵌套选择

我们直接可以通过下面嵌套的方式获取

```python
print(soup.head.title.string)
```

### 子节点和子孙节点

contents的使用

通过下面例子演示：

```python
from bs4 import BeautifulSoup

html = """
<html>

    <head>
        <title>The Dormouse's story</title>
    </head>

    <body>
        <p class="story">
            Once upon a time there were three little sisters; and their names were
            <a href="http://example.com/elsie" class="sister" id="link1">
                <span>Elsie</span>
            </a>
            <a href="http://example.com/lacie" class="sister" id="link2">Lacie</a>
            and
            <a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>
            and they lived at the bottom of a well.
        </p>
        <p class="story">...</p>
"""
soup = BeautifulSoup(html, 'lxml')
print(soup.p.contents)
```

结果是将p标签下的所有子标签存入到了一个列表中

列表中会存入如下元素

![](/images/55496cb2654fb2a0815bcfc962ea4a90.png)

#### children的使用

通过下面的方式也可以获取p标签下的所有子节点内容和通过`contents`获取的结果是一样的，但是不同的地方是`soup.p.children`是一个迭代对象，而不是列表，只能通过循环的方式获取素有的信息

```python
print(soup.p.children)
for i,child in enumerate(soup.p.children):
    print(i,child)
```

通过`contents`以及`children`都是获取子节点，如果想要获取子孙节点可以通过`descendants`

`print(soup.descendants)`同时这种获取的结果也是一个迭代器

### 父节点和祖先节点

通过`soup.a.parent`就可以获取父节点的信息

通过`list(enumerate(soup.a.parents))`可以获取祖先节点，这个方法返回的结果是一个列表，会分别将a标签的父节点的信息存放到列表中，以及父节点的父节点也放到列表中，并且最后还会将整个文档放到列表中，所有列表的最后一个元素以及倒数第二个元素都是存的整个文档的信息

### 兄弟节点

- `soup.a.next_siblings` 获取后面的兄弟节点
- `soup.a.previous_siblings` 获取前面的兄弟节点
- `soup.a.next_sibling` 获取下一个兄弟标签
- `soup.a.previous_sibling` 获取上一个兄弟标签

## 标准选择器

### find_all

`find_all(name, attrs, recursive, text, **kwargs)`

可以根据标签名，属性，内容查找文档

#### name的用法

```python
from bs4 import BeautifulSoup

html = '''
<div class="panel">
    <div class="panel-heading">
        <h4>Hello</h4>
    </div>
    <div class="panel-body">
        <ul class="list" id="list-1">
            <li class="element">Foo</li>
            <li class="element">Bar</li>
            <li class="element">Jay</li>
        </ul>
        <ul class="list list-small" id="list-2">
            <li class="element">Foo</li>
            <li class="element">Bar</li>
        </ul>
    </div>
</div>
'''

soup = BeautifulSoup(html, 'lxml')
print(soup.find_all('ul'))
print(type(soup.find_all('ul')[0]))
```

结果是以列表的方式返回。

![](/images/963ceb63e1f24cd215c2189196bc824f.png)

同时我们是可以针对结果再次find_all,从而获取所有的li标签信息

```python
for ul in soup.find_all('ul'):
    print(ul.find_all('li'))
```

#### attrs

例子：

```python
from bs4 import BeautifulSoup

html = '''
<div class="panel">
    <div class="panel-heading">
        <h4>Hello</h4>
    </div>
    <div class="panel-body">
        <ul class="list" id="list-1" name="elements">
            <li class="element">Foo</li>
            <li class="element">Bar</li>
            <li class="element">Jay</li>
        </ul>
        <ul class="list list-small" id="list-2">
            <li class="element">Foo</li>
            <li class="element">Bar</li>
        </ul>
    </div>
</div>
'''

soup = BeautifulSoup(html, 'lxml')
print(soup.find_all(attrs={'id': 'list-1'}))
print(soup.find_all(attrs={'name': 'elements'}))
```

`attrs`可以传入字典的方式来查找标签，但是这里有个特殊的就是class,因为class在python中是特殊的字段，所以如果想要查找`class`相关的可以更改`attrs={'class_': 'element'}`或者`soup.find_all('',{"class":"element})`，特殊的标签属性可以不写`attrs`，例如`id`

#### text

例子：

```python
from bs4 import BeautifulSoup

html='''
<div class="panel">
    <div class="panel-heading">
        <h4>Hello</h4>
    </div>
    <div class="panel-body">
        <ul class="list" id="list-1">
            <li class="element">Foo</li>
            <li class="element">Bar</li>
            <li class="element">Jay</li>
        </ul>
        <ul class="list list-small" id="list-2">
            <li class="element">Foo</li>
            <li class="element">Bar</li>
        </ul>
    </div>
</div>
'''

soup = BeautifulSoup(html, 'lxml')
print(soup.find_all(text='Foo'))
```

结果返回的是查到的所有的`text='Foo'`的文本

![](/images/5d02769e753956280f2562c80cb3d674.png)

### find

`find(name, attrs, recursive, text, **kwargs)`

`find`返回匹配结果的第一个元素

其他一些类似的用法：

- `find_parents()`返回所有祖先节点，`find_parent()`返回直接父节点。
- `find_next_siblings()`返回后面所有兄弟节点，`find_next_sibling()`返回后面第一个兄弟节点。
- `find_previous_siblings()`返回前面所有兄弟节点，`find_previous_sibling()`返回前面第一个兄弟节点。
- `find_all_next()`返回节点后所有符合条件的节点，`find_next()`返回第一个符合条件的节点
- `find_all_previous()`返回节点后所有符合条件的节点，`find_previous()`返回第一个符合条件的节点

## CSS选择器

通过`select()`直接传入CSS选择器就可以完成选择。

熟悉前端的人对CSS可能更加了解，其实用法也是一样的。

- `.`表示`class`，`#`表示id
- `tag1, tag2`找到所有的标签1和标签2
- `tag1 tag1-1`找到标签1内部的所有的标签2
- `[attr]` 可以通过这种方法找到具有某个属性的所有标签
- `[attr=value]` 例子`[target=_blank]`表示查找所有`target=_blank`的标签

**完整教程** - <https://developer.mozilla.org/zh-CN/docs/Web/CSS>

### 获取内容

通过`get_text()`就可以获取文本内容

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```python
from bs4 import BeautifulSoup

html='''
<div class="panel">
    <div class="panel-heading">
        <h4>Hello</h4>
    </div>
    <div class="panel-body">
        <ul class="list" id="list-1">
            <li class="element">Foo</li>
            <li class="element">Bar</li>
            <li class="element">Jay</li>
        </ul>
        <ul class="list list-small" id="list-2">
            <li class="element">Foo</li>
            <li class="element">Bar</li>
        </ul>
    </div>
</div>
'''

soup = BeautifulSoup(html, 'lxml')
for li in soup.select('li'):
    print(li.get_text())
```

### 获取属性

或者属性的时候可以通过[属性名]或者attrs[属性名]

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```python
from bs4 import BeautifulSoup

html='''
<div class="panel">
    <div class="panel-heading">
        <h4>Hello</h4>
    </div>
    <div class="panel-body">
        <ul class="list" id="list-1">
            <li class="element">Foo</li>
            <li class="element">Bar</li>
            <li class="element">Jay</li>
        </ul>
        <ul class="list list-small" id="list-2">
            <li class="element">Foo</li>
            <li class="element">Bar</li>
        </ul>
    </div>
</div>
'''

soup = BeautifulSoup(html, 'lxml')
for ul in soup.select('ul'):
    print(ul['id'])
    print(ul.attrs['id'])
```

## 总结

- 推荐使用`lxml`解析库，必要时使用`html.parser`
- 标签选择筛选功能弱但是速度快
- 建议使用`find()`、`find_all()`查询匹配单个结果或者多个结果
- 如果对CSS选择器熟悉建议使用`select()`
- 记住常用的获取属性和文本值的方法

## 最后

这里只是简单介绍基本操作，高级操作请look官方文档。

**官方文档** - <https://beautifulsoup.readthedocs.io/zh_CN/v4.4.0/>
