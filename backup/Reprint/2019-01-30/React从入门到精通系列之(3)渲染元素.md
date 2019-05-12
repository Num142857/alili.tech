---
title: 'React从入门到精通系列之(3)渲染元素' 
date: 2019-01-30 2:30:22
hidden: true
slug: xv1rd3jjekp
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">三、渲染元素</h2>
<p>React元素是React应用程序的最小构建结构。<br>React元素描述了您想在屏幕上看到什么：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const element = <h1>hello world</h1>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> element = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>hello world<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;</code></pre>
<p>与浏览器DOM元素不同，React元素是纯对象，创建起来很方便。 React DOM负责匹配React元素并更新DOM。</p>
<blockquote><p><strong>note</strong><br>人们可能将元素与更广为人知的“组件”概念混淆。 我们将在下一节中介绍组件。 元素是由什么组件组成的，我们建议您在向前跳过之前阅读此部分。</p></blockquote>
<h3 id="articleHeader1">渲染元素到DOM中</h3>
<p>假设您的HTML文件中有一个<code>&lt;div&gt;</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;root&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">&lt;div id=<span class="hljs-string">"root"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>我们将其称为“root”DOM节点，接下来其中的所有内容将由React DOM来管理。</p>
<p>仅使用React构建的应用程序通常具有单个 root DOM节点。 如果你正在将React集成到现有的应用程序中，则可以创建尽可能多单独的 root DOM节点。</p>
<p>要将React元素渲染到 root DOM节点，可以将它们都传递给<code>ReactDOM.render()</code>方法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';

const element = <h1>hello world</h1>;
ReactDOM.render(
    element,
    document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-keyword">const</span> element = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>hello world<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
ReactDOM.render(
    element,
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>)
);</code></pre>
<h3 id="articleHeader2">更新渲染元素</h3>
<p>React元素是不可变的。 创建元素后，您不能更改其子元素或属性。 <br><strong>React元素就像电影中的单个帧：它表示某个时间点的UI。</strong></p>
<p>到目前为止，以我们的知识，更新UI的唯一方法是创建一个新的元素，并将其传递给<code>ReactDOM.render()</code>。</p>
<p>考虑这个滴答时钟示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';

function tick() {
    const element = (
        <div>
            <h1>hello world</h1>
            <h2>it is {new Date().toLocaleTimeString()}</h2>
        </div>
    );
    ReactDOM.render(
        element,
        document.getElementById('root')
    )
}

setInterval(tick, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">tick</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> element = (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>hello world<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>it is {new Date().toLocaleTimeString()}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
    ReactDOM.render(
        element,
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>)
    )
}

setInterval(tick, <span class="hljs-number">1000</span>);</code></pre>
<p>它每秒从<code>setInterval()</code>的回调函数中调用<code>ReactDOM.render()</code>。</p>
<blockquote><p><strong>note</strong><br>实际上，大多数React应用程序只调用<code>ReactDOM.render()</code>一次。 在接下来的章节中，我们将学习如何将这样的代码封装成有状态的组件。</p></blockquote>
<h3 id="articleHeader3">按需更新</h3>
<p>React DOM将元素及其子元素的内容与该元素变化之前的内容进行比较，并仅进行DOM更新以使DOM达到所需的状态。<br>您可以通过使用浏览器工具检查最后一个示例来验证。<br>即使我们在每个tick上创建一个描述整个UI树的元素，只有内容发生改变的文本节点才被React DOM更新。</p>
<p>在我们的经验中，思考UI应该如何更新给定的时间，而不是随着时间的更改去修改整体的内容(DOM比较，按需更新)。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React从入门到精通系列之(3)渲染元素

## 原文链接
[https://segmentfault.com/a/1190000007790604](https://segmentfault.com/a/1190000007790604)

