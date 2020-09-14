---
title: Hexo Process Out of Memory 内存溢出问题
tags: [Hexo]
keywords: ['Hexo,Process Out of Memory,内存溢出,问题']
slug: c38d0045
date: 2018-11-13 21:32:05
---

## hexo内存溢出问题

当hexo生成文章大概在1000左右的时候,便有可能出现该问题.
```
FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - process out of memory
```

## 解决方法:

```bash
# 找到hexo 命令的位置
which hexo
```

编辑hexo命令的bin文件的第一行为以下内容.
```js
#!/usr/bin/env node --max_old_space_size=8192
```
便暂时解决内存溢出的问题.

## hexo的性能
hexo的性能相对hugo确实差太多,同样1000+的页面,用hugo却只用了不到2s.
这让我开始开始犹豫是否要放弃使用hexo.
