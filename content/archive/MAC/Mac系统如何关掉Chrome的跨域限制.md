---
title: Mac系统如何关掉Chrome的跨域限制
tags: [mac]
slug: leqgfwbuko
keywords: Macbook,Pro,chrome,跨域,问题
date: 2020-09-16 22:30:05
---

因为调试经常需要Chrome关掉跨域限制,网上的方法大多是windows的,

这里今天记录一下:

```bash
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
```