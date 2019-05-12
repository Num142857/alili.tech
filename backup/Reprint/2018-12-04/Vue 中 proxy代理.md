---
title: 'Vue 中 proxy代理' 
date: 2018-12-04 2:30:05
hidden: true
slug: tguc2fjhebo
categories: [reprint]
---

{{< raw >}}

                    
<p>Vue 框架开发的时候，会遇到跨域的问题，可在config/index.js 里配置proxyTable内容，使用proxy 代理。</p>
<pre><code>// config/index.js  文件
proxyTable: {
      '/api': {
        target: 'http://192.168.149.90:8080/', // 设置你调用的接口域名和端口号
        changeOrigin: true,     // 跨域
        pathRewrite: {
          '^/api': '/'          
        }
      }
    },</code></pre>
<p>这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'<a href="http://192.168.149.90" rel="nofollow noreferrer">http://192.168.149.90</a>:8080/xxx/duty?time=2017-07-07 14:57:22'，直接写‘/api/xxx/duty?time=2017-07-07 14:57:22’即可</p>
<p>在dev.env.js 里配置开发环境请求地址</p>
<pre><code>// config/dev.env.js 文件
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ADMIN_SERVER: '"/api/"',
});</code></pre>
<p>若请求插件用的 axios，配置如下</p>
<pre><code>const adminServer = axios.create({
  baseURL: process.env.ADMIN_SERVER,
});</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 中 proxy代理

## 原文链接
[https://segmentfault.com/a/1190000014492336](https://segmentfault.com/a/1190000014492336)

