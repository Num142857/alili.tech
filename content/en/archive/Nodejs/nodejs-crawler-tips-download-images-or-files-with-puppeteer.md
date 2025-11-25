---
title: Node.js Crawler Tips - Download Images or Files with Puppeteer
tags: [Puppeteer]
keywords: 'Node.js,Crawler,Puppeteer,Crawler Tips,Chrome,Browser'
slug: 84622ce5
date: 2018-10-23 20:32:05
---

> Some websites' images don't allow external links. If we want to download these websites' images, Puppeteer is a good solution.
Today I'll introduce a crawler tip to download images or files you want through Puppeteer.

# How to Download Through Puppeteer?

We need an additional dependency library `fs-extra`

Code is very simple, main code can be simplified to two or three lines

```js
    const fse = require('fs-extra'); // Required dependency library, you can use native fs if you want

    // Main code
    var viewSource = await page.goto(url);
    await fse.outputFile(`path`, await viewSource.buffer()) // Download to path you want
```

