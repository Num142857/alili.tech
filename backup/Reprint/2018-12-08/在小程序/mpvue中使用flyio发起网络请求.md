---
title: '在小程序/mpvue中使用flyio发起网络请求' 
date: 2018-12-08 2:30:30
hidden: true
slug: qux5rhsst4f
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<a href="https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fwendux%2Ffly" rel="nofollow noreferrer" target="_blank">Fly.js</a> 一个基于Promise的、强大的、支持多种JavaScript运行时的http请求库. 有了它，您可以使用一份http请求代码在浏览器、微信小程序、Weex、Node、React Native、快应用中都能正常运行。同时可以方便配合主流前端框架 ，最大可能的实现 <em>Write Once Run Everywhere</em>。上一篇文章介绍了在<a href="https://juejin.im/post/5ab8667d518825557459af9a" rel="nofollow noreferrer" target="_blank">快应用中使用flyio</a>，本文主要介绍一下如何在微信小程序中使用flyio。</blockquote>
<p>Flyio Github: <a href="https://github.com/wendux/fly" rel="nofollow noreferrer" target="_blank">https://github.com/wendux/fly</a></p>
<h2 id="articleHeader0">问题</h2>
<p>随着 Weex 、<a href="https://github.com/Meituan-Dianping/mpvue" rel="nofollow noreferrer" target="_blank">mpvue</a> 的发布，他们都是支持Vue.js语法。目前vue已经你能够运行在浏览器、小程序和Native了。尽管各个平台仍有差异，但已经基本能实现 <em>Write Once Run Everywhere</em> 。这使得我们可以在多个端上实现尽可能大限度在代码复用。但是无论是 vue 还是Weex 、mpvue，它们本质上都只是一个View层，也就说最好的情况，也只能实现UI复用。但对于一个应用程序来说，除了UI，最重要的就是数据了，而数据来源一般都是来自网络请求（大多数都是http）。在使用这些框架时，您的网络请求，都需要使用平台特定的API！这很糟糕，意味着您网络请求的代码不能复用，所以尽管UI可以复用，但我们还需要去适配网络请求部分的代码。</p>
<h2 id="articleHeader1">Flyio简介</h2>
<p>要上述问题，就需要一个能支持多个平台网络库，用户层提供统一的API，将平台差异在底层屏蔽。而 <a href="https://github.com/wendux/fly" rel="nofollow noreferrer" target="_blank">Fly.js</a>就是这酱紫的一个网络库，为了方便axios使用者迁移，fly.js API设计风格和axios相似（但不完全相同）！</p>
<p><a href="https://github.com/wendux/fly" rel="nofollow noreferrer" target="_blank">Fly.js</a> 通过在不同 JavaScript 运行时通过在底层切换不同的 Http Engine来实现多环境支持，但同时对用户层提供统一、标准的Promise API。不仅如此，<a href="https://github.com/wendux/fly" rel="nofollow noreferrer" target="_blank">Fly.js</a>还支持请求/响应拦截器、自动转化JSON、请求转发等功能，详情请参考：<a href="https://github.com/wendux/fly" rel="nofollow noreferrer" target="_blank">https://github.com/wendux/fly</a> 。下面我们看看在微信小程序、<a href="https://github.com/Meituan-Dianping/mpvue" rel="nofollow noreferrer" target="_blank">mpvue</a>中和中如何使用fly.</p>
<h2 id="articleHeader2">微信小程序</h2>
<p>微信小程序采用web开发技术栈，使用JavaScript语言开发，但是JavaScript运行时和浏览器又有所不同，导致axios、jQuery等库无法在微信小程序中使用，而flyio可以。下面给出具体使用方法</p>
<h3 id="articleHeader3">引入fly</h3>
<p>Flyio在各个平台下的标准API是一致的，只是入口文件不同，在微信小程序中引入：</p>
<p>Npm安装：<code>npm install flyio --save</code>.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Fly=require(&quot;flyio/dist/npm/wx&quot;) 
var fly=new Fly" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Fly=<span class="hljs-built_in">require</span>(<span class="hljs-string">"flyio/dist/npm/wx"</span>) 
<span class="hljs-keyword">var</span> fly=<span class="hljs-keyword">new</span> Fly</code></pre>
<p>如果您的微信小程序项目没有使用<code>npm</code>来管理依赖，您可以直接下载源码到您的小程序工程，下载链接<a href="https://github.com/wendux/fly/tree/master/dist/npm/wx.js" rel="nofollow noreferrer" target="_blank">wx.js</a> 或 <a href="https://github.com/wendux/fly/tree/master/dist/umd/wx.umd.min.js" rel="nofollow noreferrer" target="_blank">wx.umd.min.js</a> .下载任意一个，保存到本地工程目录，假设在“lib”目录，接下来引入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Fly=require(&quot;../lib/wx&quot;) //wx.js为您下载的源码文件
var fly=new Fly; //创建fly实例" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Fly=<span class="hljs-built_in">require</span>(<span class="hljs-string">"../lib/wx"</span>) <span class="hljs-comment">//wx.js为您下载的源码文件</span>
<span class="hljs-keyword">var</span> fly=<span class="hljs-keyword">new</span> Fly; <span class="hljs-comment">//创建fly实例</span></code></pre>
<p>引入之后，您就可以对fly实例进行全局配置、添加拦截器、发起网络请求了。</p>
<h3 id="articleHeader4">使用</h3>
<p>Fly基于Promise提供了Restful API，你可以方便的使用它们，具体请参考<a href="https://github.com/wendux/fly" rel="nofollow noreferrer" target="_blank">fly 文档</a> 。下面给出一个简单的示例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//添加拦截器
fly.interceptors.request.use((config,promise)=>{
    //给所有请求添加自定义header
    config.headers[&quot;X-Tag&quot;]=&quot;flyio&quot;;
    return config;
})
//配置请求基地址
fly.config.baseURL='http://www.dtworkroom.com/doris/1/2.0.0/'
...

Page({
  //事件处理函数
  bindViewTap: function() {
    //发起get请求
    fly.get(&quot;/test&quot;,{xx:6}).then((d)=>{
      //输出请求数据
      console.log(d.data)
      //输出响应头
      console.log(d.header)
    }).catch(err=>{
      console.log(err.status,err.message)
    })
    ...
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//添加拦截器</span>
fly.interceptors.request.use(<span class="hljs-function">(<span class="hljs-params">config,promise</span>)=&gt;</span>{
    <span class="hljs-comment">//给所有请求添加自定义header</span>
    config.headers[<span class="hljs-string">"X-Tag"</span>]=<span class="hljs-string">"flyio"</span>;
    <span class="hljs-keyword">return</span> config;
})
<span class="hljs-comment">//配置请求基地址</span>
fly.config.baseURL=<span class="hljs-string">'http://www.dtworkroom.com/doris/1/2.0.0/'</span>
...

Page({
  <span class="hljs-comment">//事件处理函数</span>
  bindViewTap: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//发起get请求</span>
    fly.get(<span class="hljs-string">"/test"</span>,{<span class="hljs-attr">xx</span>:<span class="hljs-number">6</span>}).then(<span class="hljs-function">(<span class="hljs-params">d</span>)=&gt;</span>{
      <span class="hljs-comment">//输出请求数据</span>
      <span class="hljs-built_in">console</span>.log(d.data)
      <span class="hljs-comment">//输出响应头</span>
      <span class="hljs-built_in">console</span>.log(d.header)
    }).catch(<span class="hljs-function"><span class="hljs-params">err</span>=&gt;</span>{
      <span class="hljs-built_in">console</span>.log(err.status,err.message)
    })
    ...
  })
})</code></pre>
<h2 id="articleHeader5">在mpvue中使用</h2>
<p>在<a href="https://github.com/Meituan-Dianping/mpvue" rel="nofollow noreferrer" target="_blank">mpvue</a> 中您也可以将fly实例挂在vue原型上，这样就可以在任何组件中通过<code>this</code>方便的调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Fly=require(&quot;flyio/dist/npm/wx&quot;) 
var fly=new Fly
... //添加全局配置、拦截器等
Vue.prototype.$http=fly //将fly实例挂在vue原型上" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Fly=<span class="hljs-built_in">require</span>(<span class="hljs-string">"flyio/dist/npm/wx"</span>) 
<span class="hljs-keyword">var</span> fly=<span class="hljs-keyword">new</span> Fly
... <span class="hljs-comment">//添加全局配置、拦截器等</span>
Vue.prototype.$http=fly <span class="hljs-comment">//将fly实例挂在vue原型上</span></code></pre>
<p>在组件中您可以方便的使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$http.get(&quot;/test&quot;,{xx:6}).then((d)=>{
      //输出请求数据
      console.log(d.data)
      //输出响应头
      console.log(d.header)
    }).catch(err=>{
      console.log(err.status,err.message)
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">"/test"</span>,{<span class="hljs-attr">xx</span>:<span class="hljs-number">6</span>}).then(<span class="hljs-function">(<span class="hljs-params">d</span>)=&gt;</span>{
      <span class="hljs-comment">//输出请求数据</span>
      <span class="hljs-built_in">console</span>.log(d.data)
      <span class="hljs-comment">//输出响应头</span>
      <span class="hljs-built_in">console</span>.log(d.header)
    }).catch(<span class="hljs-function"><span class="hljs-params">err</span>=&gt;</span>{
      <span class="hljs-built_in">console</span>.log(err.status,err.message)
    })</code></pre>
<h2 id="articleHeader6">反馈</h2>
<p>如果您有问题欢迎在 在github 提issue . fly.js github: <a href="https://github.com/wendux/fly" rel="nofollow noreferrer" target="_blank">github.com/fly</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在小程序/mpvue中使用flyio发起网络请求

## 原文链接
[https://segmentfault.com/a/1190000014039585](https://segmentfault.com/a/1190000014039585)

