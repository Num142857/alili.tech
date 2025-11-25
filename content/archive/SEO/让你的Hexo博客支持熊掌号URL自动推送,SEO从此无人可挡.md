---
title: 让你的Hexo博客支持熊掌号URL自动推送,百度24小时收录
tags: [SEO]
keywords: "Hexo,SEO,搜索引擎优化,百度,熊掌号,baidu,google,优化,曝光,推送"
slug: 9d64fe09
date: 2018-10-24 21:32:05
---

百度推出熊掌号,为了让 hexo 支持熊掌号推送,我在 `hexo-baidu-url-submit` 这个插件的基础上加上了熊掌号推送功能.
当天推送的 24 小时内会直接收录. 用这个,百度的收录速度是非常快的.

以后再也不用等百度收录等到死也不会理你了.

# 熊掌号支持

`package.json` 里面的内容改为

```
 "hexo-baidu-url-submit": "https://github.com/Num142857/hexo-baidu-url-submit",
```

## baidu_url_submit 配置

```
baidu_url_submit:
  count: 1000 ## 提交最新的一个链接
  host: alili.tech ## 在百度站长平台中注册的域名
  token: xxxxx ## 请注意这是您的秘钥， 所以请不要把博客源代码发布在公众仓库里!
  path: baidu_urls.txt ## 文本文档的地址， 新链接会保存在此文本文档里
  xz_appid: 'xxxxxx' ## 你的熊掌号 appid
  xz_token: 'xxxxxx' ## 你的熊掌号 token
  xz_count: 10 ## 从所有的提交的数据当中选取最新的10条,该数量跟你的熊掌号而定
```

## deploy 配置

```
deploy:
- type: baidu_url_submitter # 百度
- type: baidu_xz_url_submitter # 百度熊掌号
```
