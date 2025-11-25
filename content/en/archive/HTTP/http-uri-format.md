---
title: HTTP URI Format Explanation
tags: [HTTP]
slug: http-uri-format
keywords: http,browser features,URI,format
date: 2017-07-25 16:14:25
---

Below are the various components of a URI
```
                       Authority                  Path
        ┌───────────────┴───────────────┐┌───┴────┐
  abc://username:password@example.com:123/path/data?key=value&key2=value2#fragid1
  └┬┘   └───────┬───────┘ └────┬────┘ └┬┘           └─────────┬─────────┘ └──┬──┘
  Protocol    User Info      Hostname   Port                  Query Params      Fragment

```

