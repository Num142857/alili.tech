---
title: 'Vue学习日记（二）——Vue核心思想' 
date: 2018-12-15 2:30:11
hidden: true
slug: c635gqayyl6
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>Vue.js是一个提供MVVM数据双向绑定的库，其核心思想无非就是：</p>
<ul>
<li>数据驱动</li>
<li>组件系统</li>
</ul>
<h1 id="articleHeader1">数据驱动</h1>
<p>Vue.js 的核心是一个响应的数据绑定系统，它让数据与DOM保持同步非常简单。在使用 jQuery 手工操作 DOM时，我们的代码常常是命令式的、重复的与易错的。Vue.js 拥抱数据驱动的视图概念。通俗地讲，它意味着我们在普通HTML模板中使用特殊的语法将 DOM “绑定”到底层数据。一旦创建了绑定，DOM将与数据保持同步。每当修改了数据，DOM 便相应地更新。这样我们应用中的逻辑就几乎都是直接修改数据了，不必与 DOM 更新搅在一起。这让我们的代码更容易撰写、理解与维护。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013081380?w=850&amp;h=384" src="https://static.alili.tech/img/remote/1460000013081380?w=850&amp;h=384" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>本人在阅读vue.js源码的时候，也发现了vue的数据驱动无非就是利用的是ES5Object.defineProperty和存储器属性，个人觉得也是vue比较轻便和灵活的原因之一。</p>
<p>getter和setter（所以只兼容IE9及以上版本），可称为基于依赖收集的观测机制。核心是VM，即ViewModel，保证数据和视图的一致性。</p>
<p>附：vue.js源码图在github上vue打包好的dist文件下面的vue.js可以找到（该图与核心技术无关，只是说明vue使用这个属性）</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013081381?w=506&amp;h=360" src="https://static.alili.tech/img/remote/1460000013081381?w=506&amp;h=360" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>这个存储器属性也就是vue的核心，也是比jq好的地方之一，jq是通过绑定事件来进行操作dom，而vue和react是通过操作obj的属性来重新渲染dom</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
    <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
    <title>Document</title>
</head>
<body>
    <!--
        对入输入框input输入的内容都在output里面输出
     -->
    <input type=&quot;text&quot; id=&quot;input&quot;>
    <br>
    <span id=&quot;output&quot;></span>
</body>
<script>
    // 绑定事件的做法
    // 但是没有办法从控制台控制信息修改value
    document.getElementById(&quot;input&quot;).addEventListener(&quot;keyup&quot;, function(e) {
        document.getElementById(&quot;output&quot;).innerHTML = e.target.value
    })

    // 绑定虚拟dom的做法，就是通过改变一个obj的属性值
    // 进而改变dom的值
    var obj = {}
    // @obj 可以是任何一个对象
    // @&quot;string&quot; 动态绑定的属性值
    // @{} 构造getter和setter
    Object.defineProperty(obj, &quot;string&quot;, {
        get: function() {
            console.log(&quot;getter&quot;)
        },
        set: function(val) {
            document.getElementById(&quot;output&quot;).innerHTML = val
            document.getElementById(&quot;input&quot;).value = val
        }
    })
</script>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-comment">&lt;!--
        对入输入框input输入的内容都在output里面输出
     --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"input"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"output"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">// 绑定事件的做法</span>
    <span class="hljs-comment">// 但是没有办法从控制台控制信息修改value</span>
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"input"</span>).addEventListener(<span class="hljs-string">"keyup"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"output"</span>).innerHTML = e.target.value
    })

    <span class="hljs-comment">// 绑定虚拟dom的做法，就是通过改变一个obj的属性值</span>
    <span class="hljs-comment">// 进而改变dom的值</span>
    <span class="hljs-keyword">var</span> obj = {}
    <span class="hljs-comment">// @obj 可以是任何一个对象</span>
    <span class="hljs-comment">// @"string" 动态绑定的属性值</span>
    <span class="hljs-comment">// @{} 构造getter和setter</span>
    <span class="hljs-built_in">Object</span>.defineProperty(obj, <span class="hljs-string">"string"</span>, {
        <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"getter"</span>)
        },
        <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">val</span>) </span>{
            <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"output"</span>).innerHTML = val
            <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"input"</span>).value = val
        }
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h1 id="articleHeader2">组件系统</h1>
<p>组件系统，就是由于vue有比较优秀的组件系统，所以，现在很多项目也都采用了vue框架，如果你想要深入的了解组件系统，建议可以看看vue的官方文档</p>
<p>用官方一点的话来形容，组件化就是：实现了扩展HTML元素，封装可用的代码。页面上每个独立的可视/可交互区域视为一个组件；每个组件对应一个工程目录，组件所需要的各种资源在这个目录下就近维护；页面不过是组件的容器，组件可以嵌套自由组合形成完整的页面。</p>
<p>简单的说，其实就是把页面进行分块处理，分成多个小块，每个小块就是一个组件，这样可以形成组件的复用，而且提高开发效率。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013081382?w=769&amp;h=255" src="https://static.alili.tech/img/remote/1460000013081382?w=769&amp;h=255" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue学习日记（二）——Vue核心思想

## 原文链接
[https://segmentfault.com/a/1190000013081375](https://segmentfault.com/a/1190000013081375)

