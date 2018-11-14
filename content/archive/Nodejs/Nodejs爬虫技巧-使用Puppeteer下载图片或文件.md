---
title: Nodejs爬虫技巧-使用Puppeteer下载图片或文件
tags: puppeteer
keywords: 'Nodejs,爬虫,puppeteer,爬虫技巧,Chrome,浏览器'
slug: 84622ce5
date: 2018-10-23 20:32:05
---
> 一些网站的图片不允许外链,我们想要下载这些网站的图片通过Puppeteer是比较好解决的.
今天就给大家介绍一个爬虫技巧,通过Puppeteer下载你想要的图片或者文件.


# 怎么通过Puppeteer下载?

我们需要额外依赖的库 `fs-extra`

代码很简单,主要代码可以简化到两三行

```js
    const fse = require('fs-extra'); // 需要依赖的库,你想用原生fs也是没有问题的

    // 主要代码
    var viewSource = await page.goto(url);
    await fse.outputFile(`path`, await viewSource.buffer()) //下载到你想要的路径
```

