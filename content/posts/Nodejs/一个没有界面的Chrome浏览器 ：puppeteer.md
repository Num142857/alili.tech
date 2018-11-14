---
title: 一个没有界面的Chrome浏览器：puppeteer
tags: puppeteer
abbrlink: b9985e69
keywords:  Nodejs,ts,map,typescript,puppeteer,Chrome,浏览器
date: 2017-12-21 20:32:05
---

## Puppeteer介绍

Puppeteer是一个node库，提供了一组用来操纵Chrome的API。
相对PhantomJS来说，他可以直接在你的node项目里面直接调用Chrome的API。
以后很多的自动化测试，爬虫都可以基于Puppeteer来做。

## 安装
```
npm install puppeteer
```

## 使用

### 截屏
```javascript
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();
```

### 保存页面为PDF
```javascript
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
  await page.pdf({path: 'hn.pdf', format: 'A4'});

  await browser.close();
})();
```
Puppeteer 还提供了很多的Chrome API
[https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md]()