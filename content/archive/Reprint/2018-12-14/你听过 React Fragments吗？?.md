---
title: '你听过 React Fragments吗？?' 
date: 2018-12-14 2:30:11
hidden: true
slug: 453msm3sw7i
categories: [reprint]
---

{{< raw >}}

                    
<p>React 中常见模式是为一个组件返回多个元素。为了包裹多个元素你肯定写过很多的 div 和 span，进行不必要的嵌套，无形中增加了浏览器的渲染压力。</p>
<h2 id="articleHeader0">版本15</h2>
<p>15以前，render 函数的返回必须有一个根节点，否则报错，为满足这一原则我会使用一个没有任何样式的 div 包裹一下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';

export default function () {
    return (
        <div>
            <div>一步 01</div>
            <div>一步 02</div>
            <div>一步 03</div>
            <div>一步 04</div>
        </div>
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>一步 01<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>一步 02<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>一步 03<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>一步 04<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
}</code></pre>
<p>代码就变成了这样</p>
<p><span class="img-wrap"><img data-src="/img/bV3DpE?w=640&amp;h=480" src="https://static.alili.tech/img/bV3DpE?w=640&amp;h=480" alt="1_Sq5De7GxbgXaXnFB_fQ7Fg.png" title="1_Sq5De7GxbgXaXnFB_fQ7Fg.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">render函数允许返回数组?</h2>
<p>react 16开始， render支持返回数组，知道这个特性的人不在少数。这一特性已经可以减少不必要节点嵌套，小伙伴们可以多多用起来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';

export default function () {
    return [
        <div>一步 01</div>,
        <div>一步 02</div>,
        <div>一步 03</div>,
        <div>一步 04</div>
    ];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> [
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>一步 01<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>,
        &lt;div&gt;一步 <span class="hljs-number">02</span>&lt;<span class="hljs-regexp">/div&gt;,
        &lt;div&gt;一步 03&lt;/</span>div&gt;,
        &lt;div&gt;一步 <span class="hljs-number">04</span>&lt;<span class="hljs-regexp">/div&gt;
    ];
}</span></code></pre>
<h2 id="articleHeader2">Fragments</h2>
<p>什么？你不喜欢写数组，怎么不懒死呢~~。好在 React 16为我们提供了Fragments。<br>Fragments与Vue.js的<code>&lt;template&gt;</code>功能类似，可做不可见的包裹元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';

export default function () {
    return (
        <React.Fragment>
            <div>一步 01</div>
            <div>一步 02</div>
            <div>一步 03</div>
            <div>一步 04</div>
        </React.Fragment>
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">React.Fragment</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>一步 01<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>一步 02<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>一步 03<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>一步 04<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">React.Fragment</span>&gt;</span>
    );
}</span></code></pre>
<h2 id="articleHeader3">Fragments简写形式<code>&lt;&gt;&lt;/&gt;</code>
</h2>
<p>简写形式<code>&lt;&gt;&lt;/&gt;</code>是不是很吊的样子，但目前有些前端工具<strong><em>支持的还不太好</em></strong>，用 create-react-app 创建的项目就不能通过编译。大家使用在线的编辑器体验一下吧。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';

export default function () {
    return (
        <>
            <div>一步 01</div>
            <div>一步 02</div>
            <div>一步 03</div>
            <div>一步 04</div>
        </>
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>一步 01<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>一步 02<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>一步 03<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>一步 04<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/&gt;</span>
    );
}</span></code></pre>
<p><a href="https://codepen.io/xiyuanyuan/pen/ZrLYMa?editors=1000" rel="nofollow noreferrer" target="_blank">&lt;&gt;&lt;/&gt;</a><button class="btn btn-xs btn-default ml10 preview" data-url="xiyuanyuan/pen/ZrLYMa" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader4">以上</h2>
<p>现在你就听过 React Fragments了 ?</p>
<blockquote>【开发环境推荐】<a href="https://studio.coding.net/intro" rel="nofollow noreferrer" target="_blank">Cloud Studio</a> 是基于浏览器的集成式开发环境，支持绝大部分编程语言，包括 HTML5、PHP、Python、Java、Ruby、C/C++、.NET 小程序等等，无需下载安装程序，一键切换开发环境。 Cloud Studio提供了完整的 Linux 环境，并且支持自定义域名指向，动态计算资源调整，可以完成各种应用的开发编译与部署。</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你听过 React Fragments吗？?

## 原文链接
[https://segmentfault.com/a/1190000013220508](https://segmentfault.com/a/1190000013220508)

