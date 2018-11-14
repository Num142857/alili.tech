---
title: Hexo的SEO优化(搜索引擎优化)
tags: SEO
abbrlink: 4105a341
keywords: Hexo,SEO,搜索引擎优化,百度,谷歌,baidu,google,优化,曝光
date: 2016-01-19 21:32:05
---

今天给大家聊一聊hexo的seo也就是百度跟谷歌的一些搜索引擎优化.


## sitemap网站地图

1. 安装site map网站地图插件
```bash
npm install hexo-generator-sitemap --save
npm install hexo-generator-baidu-sitemap --save
```


2. _config.yml中增加以下配置
```
itemap:
  path: sitemap.xml
baidusitemap:
  path: baidusitemap.xml
```

3. 生成网站地图

```
hexo clean
hexo g
```


## 百度主动推送

1. 安装插件
```
npm install hexo-baidu-url-submit --save
```

2.  _config.yml插件配置

```
baidu_url_submit:
  count: 10 # 提交最新的链接数
  host: alili.tech # 在百度站长平台中注册的域名,虽然官方推荐要带有 www, 但可以不带.
  token: your_token ## 请注意这是您的秘钥， 请不要发布在公众仓库里!
  path: baidu_urls.txt # 文本文档的地址,新链接会保存在此文本文档里
```

3. _config.yml发布配置
```
deploy:
- type: git    #部署类型
  repository: xxxxx  #部署的仓库
  branch: master  
- type: baidu_url_submitter # 新增这一行类型
```

4. 推送且发布
```
hexo clean
hexo g
```