---
title: Hexo Process Out of Memory Issue
tags: [Hexo]
keywords: ['Hexo,Process Out of Memory,Memory Overflow,Issue']
slug: hexo-process-out-of-memory
date: 2018-11-13 21:32:05
---

## Hexo Memory Overflow Issue

When Hexo generates around 1000 articles, this issue may occur.
```
FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - process out of memory
```

## Solution:

```bash
# Find hexo command location
which hexo
```

Edit the first line of the hexo command's bin file to the following content.
```js
#!/usr/bin/env node --max_old_space_size=8192
```
This temporarily solves the memory overflow issue.

## Hexo Performance
Hexo's performance is indeed much worse than Hugo. For the same 1000+ pages, Hugo only took less than 2s.
This makes me hesitate whether to abandon using Hexo.

