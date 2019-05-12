---
title: '前端路由之 Hash 路由原生实现' 
date: 2019-01-12 2:30:24
hidden: true
slug: m8986x1rtoq
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Hash 路由的实现</h1>
<h2 id="articleHeader1">使用过框架路由的人肯定都有注意到url中的#号，为什么hash路由页面不会跳转——还记得a链接的锚点是怎么实现的吗。</h2>
<blockquote><ul>
<li>多个路由集中处理</li>
<li>匹配对应路由</li>
<li>利用回调处理相应的逻辑</li>
</ul></blockquote>
<h3 id="articleHeader2">代码(详细的注释)</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <ul>
    <li><a href=&quot;#/&quot;>index</a></li>
    <li><a href=&quot;#/item&quot;>item</a></li>
    <li><a href=&quot;#/list&quot;>list</a></li>
  </ul>
  <br>
  <br>
  <div>头部</div>
  <h1 class='result'></h1>


    function Router() {
       // 路由储存
       this.routes = {};
       // 当前路由
       this.currentUrl = '';
    }
    Router.prototype = {
      // 路由处理
      route: function (path, callback) {
        this.routes[path] = callback || function(){};
      },
       // 页面刷新
      refresh: function () {
        // 当前的hash值
        this.currentUrl = location.hash.slice(1) || '/';
        // 执行hash值改变后相对应的回调函数
        this.routes[this.currentUrl]();
      },
      // 页面初始化
      init: function () {
        // 页面加载事件
        window.addEventListener('load', this.refresh.bind(this), false);
        // hash 值改变事件
        window.addEventListener('hashchange', this.refresh.bind(this), false);
      }
    }
   
    // 全局挂载
    window.Router = new Router();
    // 初始化
    window.Router.init();

    let obj = document.querySelector('.result');
    
    function changeConent (cnt) {
      obj.innerHTML = cnt
    }

    // 匹配路由做相应的操作
    Router.route('/', () => {
      changeConent(&quot;当前是首页&quot;);
    })

    Router.route('/item', () => {
      changeConent('当前是item页面');
    })

    Router.route('/list', () => {
      // ajax 的数据就可以这样去拼接
      setTimeout(() => {
        obj.innerHTML = '<h1 style=&quot;color: red&quot;>Hello World</h1>'
      }, 1000)
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>  &lt;ul&gt;
    &lt;li&gt;&lt;a href=<span class="hljs-string">"#/"</span>&gt;index&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href=<span class="hljs-string">"#/item"</span>&gt;item&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href=<span class="hljs-string">"#/list"</span>&gt;list&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
  &lt;br&gt;
  &lt;br&gt;
  &lt;div&gt;头部&lt;/div&gt;
  &lt;h1 <span class="hljs-class"><span class="hljs-keyword">class</span>='<span class="hljs-title">result</span>'&gt;&lt;/<span class="hljs-title">h1</span>&gt;


    <span class="hljs-title">function</span> <span class="hljs-title">Router</span>() </span>{
       <span class="hljs-comment">// 路由储存</span>
       <span class="hljs-keyword">this</span>.routes = {};
       <span class="hljs-comment">// 当前路由</span>
       <span class="hljs-keyword">this</span>.currentUrl = <span class="hljs-string">''</span>;
    }
    Router.prototype = {
      <span class="hljs-comment">// 路由处理</span>
      route: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(path, callback)</span> </span>{
        <span class="hljs-keyword">this</span>.routes[path] = callback || <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{};
      },
       <span class="hljs-comment">// 页面刷新</span>
      refresh: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-comment">// 当前的hash值</span>
        <span class="hljs-keyword">this</span>.currentUrl = location.hash.slice(<span class="hljs-number">1</span>) || <span class="hljs-string">'/'</span>;
        <span class="hljs-comment">// 执行hash值改变后相对应的回调函数</span>
        <span class="hljs-keyword">this</span>.routes[<span class="hljs-keyword">this</span>.currentUrl]();
      },
      <span class="hljs-comment">// 页面初始化</span>
      init: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-comment">// 页面加载事件</span>
        window.addEventListener(<span class="hljs-string">'load'</span>, <span class="hljs-keyword">this</span>.refresh.bind(<span class="hljs-keyword">this</span>), <span class="hljs-literal">false</span>);
        <span class="hljs-comment">// hash 值改变事件</span>
        window.addEventListener(<span class="hljs-string">'hashchange'</span>, <span class="hljs-keyword">this</span>.refresh.bind(<span class="hljs-keyword">this</span>), <span class="hljs-literal">false</span>);
      }
    }
   
    <span class="hljs-comment">// 全局挂载</span>
    window.Router = <span class="hljs-keyword">new</span> Router();
    <span class="hljs-comment">// 初始化</span>
    window.Router.init();

    let obj = document.querySelector(<span class="hljs-string">'.result'</span>);
    
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">changeConent</span> <span class="hljs-params">(cnt)</span> </span>{
      obj.innerHTML = cnt
    }

    <span class="hljs-comment">// 匹配路由做相应的操作</span>
    Router.route(<span class="hljs-string">'/'</span>, () =&gt; {
      changeConent(<span class="hljs-string">"当前是首页"</span>);
    })

    Router.route(<span class="hljs-string">'/item'</span>, () =&gt; {
      changeConent(<span class="hljs-string">'当前是item页面'</span>);
    })

    Router.route(<span class="hljs-string">'/list'</span>, () =&gt; {
      <span class="hljs-comment">// ajax 的数据就可以这样去拼接</span>
      setTimeout(() =&gt; {
        obj.innerHTML = <span class="hljs-string">'&lt;h1 style="color: red"&gt;Hello World&lt;/h1&gt;'</span>
      }, <span class="hljs-number">1000</span>)
    })</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端路由之 Hash 路由原生实现

## 原文链接
[https://segmentfault.com/a/1190000009799576](https://segmentfault.com/a/1190000009799576)

