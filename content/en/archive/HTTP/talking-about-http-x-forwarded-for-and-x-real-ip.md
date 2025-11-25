---
title: Talking About HTTP X-Forwarded-For and X-Real-IP
tags: [HTTP]
slug: talking-about-http-x-forwarded-for-and-x-real-ip
keywords: http,X-Forwarded-For,X-Real-IP,Get IP
date: 2018-12-29 16:14:25
---

Recently when looking at [NetEase Cloud Music API nodejs](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%E8%B0%83%E7%94%A8%E5%89%8D%E9%A1%BB%E7%9F%A5) project documentation.

Found in the calling instructions, there's a section that says:

> Due to NetEase restrictions, using this project on foreign servers will be restricted. To solve this, you can use mainland servers or use a proxy. Thanks to @hiyangguo for the solution: add X-Real-IP':'211.161.244.70' // any domestic IP in the 'headers' section of 'util.js' to solve

NetEase Cloud Music API calls have restrictions for foreign countries. To bypass such restrictions, you must modify `X-Real-IP` in headers to solve.

So what is `X-Real-IP`? What is it used for?

# X-Real-IP

X-Real-IP is a custom header field. X-Real-IP is usually used by HTTP proxies to represent the device IP that established the TCP connection with it. This device could be another proxy, or the real requesting end. It should be noted that X-Real-IP currently doesn't belong to any standard,

Very related to it, there's also a custom header field called `X-Forwarded-For`.

# X-Forwarded-For

X-Forwarded-For is an HTTP extension header. The HTTP/1.1 (RFC 2616) protocol doesn't define it. It was first introduced by the Squid caching proxy software to represent the real IP of the HTTP requesting end. Today it has become a de facto standard, widely used by major HTTP proxies, load balancers and other forwarding services, and written into RFC 7239 (Forwarded HTTP Extension) standard.

Format:

```
X-Forwarded-For: client, proxy1, proxy2
```

If an HTTP request reaches the server after passing through three proxies Proxy1, Proxy2, Proxy3, with IPs IP1, IP2, IP3 respectively, and user real IP is IP0, then according to XFF standard, the server will finally receive the following information:

```
X-Forwarded-For: IP0, IP1, IP2
```

`X-Forwarded-For` records the user IP and each proxy server IP used for forwarding.

At this time, the `X-Real-IP` we mentioned earlier will be IP0, the IP address from which the user sent the request.

```
X-Real-IP: IP0
```

So often `X-Real-IP` and the first IP in `X-Forwarded-For` are the real user IP.


# Get Real User IP

Because `X-Real-IP` and `X-Forwarded-For` are custom header fields, getting user IP based on these two fields is not the most rigorous.
Because they can be forged.

At this time, we should get user IP according to `remote_address`. Because `remote_address` cannot be forged,
if `remote_address` is modified, the TCP three-way handshake cannot be completed.

That's all for today.

