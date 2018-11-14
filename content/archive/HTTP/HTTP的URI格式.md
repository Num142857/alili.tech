---
title: HTTP的URI格式说明
tags: HTTP
abbrlink: 84afbeeb
keywords: http,浏览器特性,URI,格式
date: 2017-07-25 16:14:25
---

下面是URI的各个组成部分
```
                       权限                 路径
        ┌───────────────┴───────────────┐┌───┴────┐
  abc://username:password@example.com:123/path/data?key=value&key2=value2#fragid1
  └┬┘   └───────┬───────┘ └────┬────┘ └┬┘           └─────────┬─────────┘ └──┬──┘
  协议        用户信息         主机名    端口                  查询参数          片段

```