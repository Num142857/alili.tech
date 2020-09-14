---
title: 'vue + webpack 实用技巧' 
date: 2018-12-04 2:30:05
hidden: true
slug: f9y3xrmamb
categories: [reprint]
---

{{< raw >}}

                    
<h1>vue + webpack 实用技巧</h1>
<h2>利用 webpack 给生产环境和发布环境配置不同的接口地址</h2>
<blockquote>在开发时，前后端分离同时进行开发。前端调用后端给的接口也是在局域网内部的。但是，当项目推到线上的时候,会从真实服务器上获取接口,在测试接口和真实接口之间频繁切换，让人十分恶心。</blockquote>
<p>第一步，在webpack配置文件中，分别设置不同的接口地址</p>
<p>打开dev.en.js文件。修改如下：</p>
<pre><code>var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"//192.168.1.8/api"' // 添加api地址
})</code></pre>
<p>同样在prod.env.js文件中</p>
<pre><code>module.exports = {
  NODE_ENV: '"production"',
  API_ROOT: '"//www.baidu.com/api"'
}</code></pre>
<p>第二步，在代码中调用设置好的参数</p>
<p>比如我的：　src/config/api.js文件</p>
<pre><code>// 原来的API接口地址
var root = 'https://cnodejs.org/api/v1'</code></pre>
<pre><code>// 新配置的API接口地址
var root = process.env.API_ROOT</code></pre>
<p>最后</p>
<p>npm run dev　的时候，跑的就是测试接口。而我们运行</p>
<p>npm run build　打包项目的时候，打包的是服务器正式接口</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue + webpack 实用技巧

## 原文链接
[https://segmentfault.com/a/1190000014536019](https://segmentfault.com/a/1190000014536019)

