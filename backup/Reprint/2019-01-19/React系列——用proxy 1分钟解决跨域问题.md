---
title: 'React系列——用proxy 1分钟解决跨域问题' 
date: 2019-01-19 2:30:09
hidden: true
slug: qysnegb4ch
categories: [reprint]
---

{{< raw >}}

                    
<p>这已经是个老生常谈的问题了，对于前后端分离的前端工程师来说，遇到这个问题总是会想尽各种办法，比如后端配置cors，前端用script包装。</p>
<p>这是个让人头痛的❌</p>
<p>XMLHttpRequest cannot load <a href="http://www.xxx.com/login." rel="nofollow noreferrer" target="_blank">http://www.xxx.com/login.</a> Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin '<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3213' is therefore not allowed access.</p>
<p>上面这段英文提示就是常见的跨域报错，首先，我是在react工程项目中做的测试，前端项目开启的是本地的3213端口，而后端login的API接口在www.xxx.com域名下面。</p>
<p>为了保证前端测试的可行性，为了你的老板不扣你工资，用一个最简单的办法解决API资源请求跨域问题： <strong>http-proxy-middleware</strong></p>
<p>http-proxy-middleware不需要自己安装，在安装webpack过程中，会自动依赖安装到你的node_modules文件夹下，如果你发现没有，那么请自行安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev http-proxy-middleware
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code>npm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> http-proxy-middleware
</code></pre>
<p>在react开发中，分下面2种情况。</p>
<p>1、前端部署了nodejs服务器，采用app.listen()启动前端服务器，那么你只需要在你的js中添加下面几行代码即可</p>
<p>假设你的前端服务器js文件叫做server.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//导入proxy
var proxy = require('http-proxy-middleware')

//context可以是单个字符串，也可以是多个字符串数组，分别对应你需要代理的api,星号（*）表示匹配当前路径下面的所有api
const context = [`/login`, `/admin/*`]

//options可选的配置参数请自行看readme.md文档，通常只需要配置target，也就是你的api所属的域名。
const options = {
    target: 'http://www.xxx.com',
    changeOrigin: true
}

//将options对象用proxy封装起来，作为参数传递
const apiProxy = proxy(options)

//现在你只需要执行这一行代码，当你访问需要跨域的api资源时，就可以成功访问到了。
app.use(context, apiProxy)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//导入proxy</span>
<span class="hljs-keyword">var</span> proxy = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http-proxy-middleware'</span>)

<span class="hljs-comment">//context可以是单个字符串，也可以是多个字符串数组，分别对应你需要代理的api,星号（*）表示匹配当前路径下面的所有api</span>
<span class="hljs-keyword">const</span> context = [<span class="hljs-string">`/login`</span>, <span class="hljs-string">`/admin/*`</span>]

<span class="hljs-comment">//options可选的配置参数请自行看readme.md文档，通常只需要配置target，也就是你的api所属的域名。</span>
<span class="hljs-keyword">const</span> options = {
    <span class="hljs-attr">target</span>: <span class="hljs-string">'http://www.xxx.com'</span>,
    <span class="hljs-attr">changeOrigin</span>: <span class="hljs-literal">true</span>
}

<span class="hljs-comment">//将options对象用proxy封装起来，作为参数传递</span>
<span class="hljs-keyword">const</span> apiProxy = proxy(options)

<span class="hljs-comment">//现在你只需要执行这一行代码，当你访问需要跨域的api资源时，就可以成功访问到了。</span>
app.use(context, apiProxy)
</code></pre>
<p>2、你可能没有前端node服务器，但是你用来webpack的devServer来启动前端项目，这个时候的配置跟上面类似。</p>
<p>在你的webpack.config.js里面添加proxy配置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //导入proxy
    var proxy = require('http-proxy-middleware')
    
    //context可以是单个字符串，也可以是多个字符串数组，分别对应你需要代理的api,星号（*）表示匹配当前路径下面的所有api
    const context = [`/login`, `/admin/*`]
    
    module.exports = {
        devServer: {
           host: 'localhost',
           port: '3011',
           proxy: [
               {
                    context: context,
                    target: 'https://www.xxx.com',
                    changeOrigin: true,
                    secure: false
              }
           ]
        }
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-comment">//导入proxy</span>
    <span class="hljs-keyword">var</span> proxy = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http-proxy-middleware'</span>)
    
    <span class="hljs-comment">//context可以是单个字符串，也可以是多个字符串数组，分别对应你需要代理的api,星号（*）表示匹配当前路径下面的所有api</span>
    <span class="hljs-keyword">const</span> context = [<span class="hljs-string">`/login`</span>, <span class="hljs-string">`/admin/*`</span>]
    
    <span class="hljs-built_in">module</span>.exports = {
        <span class="hljs-attr">devServer</span>: {
           <span class="hljs-attr">host</span>: <span class="hljs-string">'localhost'</span>,
           <span class="hljs-attr">port</span>: <span class="hljs-string">'3011'</span>,
           <span class="hljs-attr">proxy</span>: [
               {
                    <span class="hljs-attr">context</span>: context,
                    <span class="hljs-attr">target</span>: <span class="hljs-string">'https://www.xxx.com'</span>,
                    <span class="hljs-attr">changeOrigin</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-attr">secure</span>: <span class="hljs-literal">false</span>
              }
           ]
        }
    }
</code></pre>
<p>现在，跨域将不会成为你的烦恼，可以放心写代码了。</p>
<p><strong>最新补充：</strong><br><strong>axios支持设置proxy，相关文档有demo。</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React系列——用proxy 1分钟解决跨域问题

## 原文链接
[https://segmentfault.com/a/1190000008635891](https://segmentfault.com/a/1190000008635891)

