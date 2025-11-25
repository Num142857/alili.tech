---
title: WeChat Browser Dynamically Modify Title
tags: [weChat]
slug: 1e2d080b
keywords: WeChat,Browser,Modify title
date: 2016-05-26 11:43:05
---

## WeChat Browser Dynamically Modify Title

Why this article? Previously when doing spa page development, discovered something very puzzling.

The following code in WeChat browser is invalid.

```javascript
document.title = "I am title"
```

After title is first generated, cannot be changed.

But it's okay,

Below we use black magic code to complete title modification in WeChat browser.

<!-- more -->

```javascript
document.title = "I am title";
var iframe = document.createElement("iframe");
iframe.src = "/favicon.ico";
document.body.appendChild(iframe);
iframe.onload = function() {
  setTimeout(function() {
    document.body.removeChild(iframe);
  }, 0)
}
```

Like this, title changed.

