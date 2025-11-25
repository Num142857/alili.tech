---
title: "A Headless Chrome Browser: Puppeteer"
tags: [Puppeteer]
slug: a-headless-chrome-browser-puppeteer
keywords: Node.js,ts,map,typescript,Puppeteer,Chrome,Browser
date: 2017-12-21 20:32:05
---

## Puppeteer Introduction

Puppeteer is a Node.js library that provides a set of APIs to control Chrome.
Compared to PhantomJS, it can directly call Chrome's API in your Node.js project.
Many automation tests and crawlers can be based on Puppeteer in the future.

## Installation
```
npm install puppeteer
```

## Usage

### Screenshot
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

### Save Page as PDF
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
Puppeteer also provides many Chrome APIs
[https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md]()

