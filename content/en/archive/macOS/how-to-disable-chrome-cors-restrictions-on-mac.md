---
title: How to Disable Chrome CORS Restrictions on Mac
tags: [mac]
slug: leqgfwbuko
keywords: Macbook,Pro,chrome,Cross-Origin,Issue
date: 2020-09-16 22:30:05
---

## Disable Chrome Cross-Origin Restrictions

Because debugging often requires Chrome to disable cross-origin restrictions, most methods online are for Windows,

Here's a note today:

```bash
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
--args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
```
