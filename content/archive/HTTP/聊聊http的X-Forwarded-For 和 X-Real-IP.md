---
title: 聊聊HTTP的X-Forwarded-For 和 X-Real-IP
tags: [HTTP]
slug: izbidk3gu3s
keywords: http,X-Forwarded-For,X-Real-IP,获取ip
date: 2018-12-29 16:14:25
---

最近在看[网易云音乐API nodejs](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%E8%B0%83%E7%94%A8%E5%89%8D%E9%A1%BB%E7%9F%A5)这个项目的文档的时候.

发现调用须知里,有一段是这样的说的:

> 由于网易限制,此项目在国外服务器上使用会受到限制,如需解决 , 可使用大陆服务器或者使用代理 , 感谢 @hiyangguo提出的解决方法: 在 'util.js' 的 'headers' 处增加 X-Real-IP':'211.161.244.70' // 任意国内 IP 即可解决

网易云音乐的接口调用对国外加了限制,想要跳过这样的限制的话,就必须在headers里修改`X-Real-IP` 就可以解决.

那`X-Real-IP`是什么?是干什么用的?

# X-Real-IP

X-Real-IP，这是一个自定义头部字段。X-Real-IP 通常被 HTTP 代理用来表示与它产生 TCP 连接的设备 IP，这个设备可能是其他代理，也可能是真正的请求端。需要注意的是，X-Real-IP 目前并不属于任何标准，

跟他非常相关的,还有一个`X-Forwarded-For`的自定义头部字段.

# X-Forwarded-For

X-Forwarded-For 是一个 HTTP 扩展头部。HTTP/1.1（RFC 2616）协议并没有对它的定义，它最开始是由 Squid 这个缓存代理软件引入，用来表示 HTTP 请求端真实 IP。如今它已经成为事实上的标准，被各大 HTTP 代理、负载均衡等转发服务广泛使用，并被写入 RFC 7239（Forwarded HTTP Extension）标准之中。

格式:

```
X-Forwarded-For: client, proxy1, proxy2
```

如果一个 HTTP 请求到达服务器之前，经过了三个代理 Proxy1、Proxy2、Proxy3，IP 分别为 IP1、IP2、IP3，用户真实 IP 为 IP0，那么按照 XFF 标准，服务端最终会收到以下信息：

```
X-Forwarded-For: IP0, IP1, IP2
```

`X-Forwarded-For` 会记录用户ip与每次转发用的代理服务器ip.

而这时,我们之前提到的 `X-Real-IP` 会是ip0,是用户发送请求的ip地址.

```
X-Real-IP: IP0
```

所以往往`X-Real-IP`与`X-Forwarded-For`第一个ip就是真实用户的ip.


# 获取真实用户的ip

因为`X-Real-IP`与`X-Forwarded-For`是自定义头部字段,基于这两个字段得到用户ip,并不是最严谨的.
因为他是可以伪造的.

这个时候,我们应该根据`remote_address`来获取用户ip.因为`remote_address`是不能伪造的,
如果`remote_address `被修改,tcp的三次握手都是不能完成的.

今天就到这里.