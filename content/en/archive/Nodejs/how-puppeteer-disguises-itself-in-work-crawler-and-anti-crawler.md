---
title: How Puppeteer Disguises Itself in Work (Crawler and Anti-Crawler)
tags: [Puppeteer]
slug: 7fp151i7xnf
keywords: Node.js,ts,map,typescript,Puppeteer,Chrome,Browser
date: 2020-08-29 20:32:05
---

To better protect our data and program security.

Today I'll introduce how to detect if the web program accessing us is a headless browser,
and some of their anti-detection methods.

## Webdriver Detection

Generally, if in headless browser mode, `navigator.webdriver` will return `true`.

### Detection Method

Simplest detection method
```js
if (navigator.webdriver) {
  // Operations targeting headless browsers
}
```

#### How to Detect After Using defineProperty to Delete webdriver

If the other party uses the following method to delete the webdriver property, there's still a way to detect it

```js
 Object.defineProperty(navigator, 'webdriver', {
      get: () => undefined,
 })
```

#### Countermeasure

The following methods can still detect it

```js
webdriver in navigator
```

```js
navigator.hasOwnProperty("webdriver")
```

### Bypass Method

Directly delete the webdriver property, this is the method I've currently verified successfully.
Other methods found online are already invalid.

```js
await page.evaluateOnNewDocument(() => {
    const newProto = navigator.__proto__;
    delete newProto.webdriver;
    navigator.__proto__ = newProto;
  });
```

## Chrome Property Detection

### Detection Method
In headless browser mode, the chrome object under global object doesn't have `runtime` property

```js
if (!window.chrome || !window.chrome.runtime) {
  // Headless browser mode...
}
```

### Bypass Method

So the bypass method is also simple, we just need to forge one

```js
window.navigator.chrome = {
    runtime: {}
  };
```

If it's Puppeteer, we're the same as above, just run the above code in advance.

```js
await page.evaluateOnNewDocument(() => {
    window.navigator.chrome = {
        runtime: {}
      };
  });
```

## Afterword

I've tried other methods online, the successful ones are all here.
Because browsers and anti-crawler methods are constantly updated, when you see this article.
Some methods may already be unusable, but the core point is still to be good at observation and comparison.
All forms can have disguise and bypass methods. General ideas are similar to those mentioned above.
