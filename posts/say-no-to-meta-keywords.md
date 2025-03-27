---
title: Meta Keywords：是什么、为什么不
reprint: false
date: 2023-01-17 18:26:31
categories:
  - Code
tags:
  - HTML
  - 笔记
cover: /images/cover/say-no-to-meta-keywords.png
coverWidth:
coverHeight:
---

形如`<meta keywords="shiux, shiux.com">`的Meta Keywords是Meta标签的一种，仅存在于HTML代码中、不会在浏览器中展示。过去，Meta Keywords标签被用于告诉搜索引擎爬虫关于网页的信息。但是，现在搜索引擎还尊重Meta Keywords么？Meta Keywords是否仍然是SEO的最佳实践？

## Meta Keywords的历史

Meta Keywords的历史可以追溯到 1995 年，当时的 HTML 标准制定者认为通过 Meta Keywords 可以帮助搜索引擎获取关于页面的信息。然而，Meta Keywords只存在于HTML源码中，对搜索引擎爬虫可见，但是在浏览器中不会显示、大部分访客也看不到这些关键词。于是，从 1999 年开始，几乎所有网站都开始滥用 Meta Keywords，在 Meta Keywords 其中塞入大量不相关的标签和关键词以欺骗搜索引擎排名、抢夺流量。

有人甚至认为，正是网站对Meta Keywords的滥用才导致了Google的崛起。Google并不是全世界第一个搜索引擎（而是第 11 个、或者第 13 个？），但是Google是第一个认识到Meta Keywords滥用问题严重性的搜索引擎。于是Google不再依赖网站提供关键词，转而依赖更多的因素，例如网站全文内容、内链和外链。除了Google，其他搜索引擎如Yahoo也开始使用更多的网页衡量指标。但是Meta Keywords实在太容易被滥用了，2000年以来，几乎所有网站仍然在滥用Meta Keywords。

2009年是一个分水岭，Google首次公开明确宣布他们不使用Meta Keywords。同年，Yahoo也透漏他们很久以前就不再将Meta Keywords作为衡量指标了。到了2015年，绝大部分搜索引擎都不再将Meta Keywords作为关键衡量指标。

## Google - 完全忽略

Google自2009年以来就不再使用Meta Keywords标签作为衡量Ranking的因素；Google还会对滥用Meta Keywords的网站进行降权惩罚。

> Our web search (the well-known search at Google.com that hundreds of millions of people use each day) disregards keyword metatags completely. They simply don't have any effect in our search ranking at present.

- [Google does not use the keywords meta tag in web ranking - Google Search Central Blog](https://developers.google.com/search/blog/2009/09/google-does-not-use-keywords-meta-tag), 2009 年 9 月 21 日
- [Unsupported tags and attributes - Google Search Central Documentation](https://developers.google.com/search/docs/crawling-indexing/special-tags#unsupported)

## Bing - 完全忽略

Microsoft Bing于2014年正式公开宣布，Meta Keywords对于Bing SEO来说毫无价值：

> Today, it’s pretty clear the meta keyword tag is dead in terms of SEO value. Sure, it might have value for contextual ad systems or serve as a signal to ‘bots plying the web looking for topics to target, but as far as search goes, that tag flat lined years ago as a booster.

2020年，Microsoft Bing时任CEO在Twitter上回推时再次表示，Bing会无视、忽略、排除Meta Keywords。

- [Blame The Meta Keyword Tag - Microsoft Bing Blog](https://blogs.bing.com/webmaster/2014/10/03/blame-the-meta-keyword-tag), 2014年10月4日
- [The meta keyword tag is dead in terms of SEO value for @BingWMC. We exclude it and ignore it - ChristiJOlson, Head of Paid Search at Microsoft](https://twitter.com/christijolson/status/1266415751172247552), 2020年5月29日

## Yahoo - 几乎不用

在2009年Search Marketing Expo大会上，Yahoo时任搜索部门负责人Cris Pierry在问答环节上表示，Yahoo其实早就不再将Meta Keywords作为一个指标。Search Engine Land于是进行了一项测试，发现Yahoo仍然会索引Meta Keywords的信息。Yahoo官方对此的回复是，当Yahoo无法从网页的标题、description、链接、媒体文件等获取有关网页的信息时，Yahoo仍然会使用Meta Keywords作为最后的稻草。

- [Yahoo Search No Longer Uses Meta Keywords Tag](https://searchengineland.com/yahoo-search-no-longer-uses-meta-keywords-tag-27303), 2009年10月6日

  > The news came [during](https://www.seroundtable.com/archives/020827.html) the Ask The Search Engines session at[ SMX East](https://searchmarketingexpo.com/east/) in New York today. The search engines were all asked about their support of the tag. Moderator Danny Sullivan noted that only Yahoo provided support of the tag — prompting Cris Pierry, senior director of search at Yahoo, to announce that support actually had been ended unannounced “several” months ago.

- [Sorry, Yahoo, You DO Index The Meta Keywords Tag](https://searchengineland.com/sorry-yahoo-you-do-index-the-meta-keywords-tag-27743), 2009年10月14日

  > What changed with Yahoo’s ranking algorithms is that while we still index the meta keyword tag, the ranking importance given to meta keyword tags receives the lowest ranking signal in our system.
  > Words that appear in any other part of documents, including the body, title, description, anchor text etc., will take priority in ranking the document – the re-occurrence of these words in the meta keyword tag will not help in boosting the signal for these words. Therefore, keyword stuffing in the keyword tag will not help a page’s recall or ranking, it will actually have less effect than introducing those same words in the body of the document, or any other section.

## 百度 - 非关键衡量指标

自从2012年以来，百度一直在刻意弱化Meta Keywords的重要性。2018年，一名来自中国的中文SEO专家写了一篇博客，援引2013年时一名百度搜索工程师公开发表的观点，介绍为什么你不应该使用Meta Keywords作为优化百度SEO的手段：

> Meta Keywords 早就进了历史的垃圾堆了，我们会直接忽略。

- [Why You shouldn’t Use Meta Keywords Tag for Baidu SEO Anymore - Jinray China SEO Diary](https://www.jinrayseo.com/blog/meta-keywords-for-baidu-seo/), 2018年7月4日

## Yandex - 非关键衡量指标

俄罗斯最大的搜索引擎Yandex也是为数不多仍然使用Meta Keywords作为衡量指标之一的搜索引擎，但是许多来自俄罗斯的SEO专家都曾表示过Meta Keywords对改善Yandex SEO收效甚微。

- [Meta tags that Yandex takes into account](https://yandex.com/support/webmaster/controlling-robot/html.html)
- ["Officially" they say they still do, but I think this is a very low weight factor, even for яндекс. This is the consensus among most of us who have done SEO in Russian :) - orun bhuiyan on Twitter](https://twitter.com/orvn/status/1266417952515067904), 2020年5月30日

## 结论

Meta Keywords已死。网站应该停止使用Meta Keywords标签。搜索引擎更加注重于其它维度，如Title标签、Meta Description和结构化数据。对于内容导向的网站，我推荐采取一些我之前在「[如何写一篇同时面向人和搜索引擎的文章](https://blog.skk.moe/post/how-to-write-for-seo/)」一文中提到的手段。
