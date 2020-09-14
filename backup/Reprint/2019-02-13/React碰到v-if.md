---
title: 'React碰到v-if' 
date: 2019-02-13 2:31:23
hidden: true
slug: 5sk300yp4o
categories: [reprint]
---

{{< raw >}}

                    
<p>最近在重构公司老项目，由于本人以前的技术栈是vue, 换工作后发现现在公司的技术栈是react, 所以重构的过程是及其痛苦。加之项目又是几年前的老项目，不敢大改，比葫芦画瓢比比皆是。本文就介绍下遇到的一个常用的痛点。欢迎大佬指正。</p>
<p>废话不多说，直接上一段代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'

const App = () => {
  const record = {
    toKe: true, // 贝壳首页
    toSecondHand: true, // 二手房
    toFang: true, // 新房
  }
  return (
    <div style="{{"width: 600, margin: '50px auto'"}}">
      <ul>
        <li>
          <h3>react常规写法</h3>
          {
            record.toKe
            ? <a style="{{"padding: 20"}}" href=&quot;https://bj.ke.com&quot;>贝壳首页</a>
            : null
          }
          {
            record.toSecondHand
            ? <a style="{{"padding: 20"}}" href=&quot;https://bj.ke.com/ershoufang/&quot;>二手房</a>
            : null
          }
          {
            record.toFang
            ? <a style="{{"padding: 20"}}" href=&quot;https://bj.fang.ke.com/loupan/&quot;>新房</a>
            : null
          }
        </li>
      </ul>
    </div>
  )
}
export default App" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>

<span class="hljs-keyword">const</span> App = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> record = {
    <span class="hljs-attr">toKe</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 贝壳首页</span>
    toSecondHand: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 二手房</span>
    toFang: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 新房</span>
  }
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"width:</span> <span class="hljs-attr">600</span>, <span class="hljs-attr">margin:</span> '<span class="hljs-attr">50px</span> <span class="hljs-attr">auto</span>'"}}"&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>react常规写法<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
          {
            record.toKe
            ? <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"padding:</span> <span class="hljs-attr">20</span>"}}" <span class="hljs-attr">href</span>=<span class="hljs-string">"https://bj.ke.com"</span>&gt;</span>贝壳首页<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            : null
          }
          {
            record.toSecondHand
            ? <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"padding:</span> <span class="hljs-attr">20</span>"}}" <span class="hljs-attr">href</span>=<span class="hljs-string">"https://bj.ke.com/ershoufang/"</span>&gt;</span>二手房<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            : null
          }
          {
            record.toFang
            ? <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"padding:</span> <span class="hljs-attr">20</span>"}}" <span class="hljs-attr">href</span>=<span class="hljs-string">"https://bj.fang.ke.com/loupan/"</span>&gt;</span>新房<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            : null
          }
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  )
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> App</code></pre>
<p>如上述代码，我们在项目中会遇到很多这样的写法, 细看一下没什么问题，可是当在重构老项目的时候，你会发现这个代码结构是多么痛苦，特别是如下的结构。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    record.toFang &amp;&amp; record.toKe &amp;&amp; record.toSecondHand
    &amp;&amp; <div>
       <a style="{{"padding: 20"}}" href=&quot;https://bj.ke.com&quot;>贝壳首页</a>
       <a style="{{"padding: 20"}}" href=&quot;https://bj.ke.com/ershoufang/&quot;>二手房</a>
       <a style="{{"padding: 20"}}" href=&quot;https://bj.fang.ke.com/loupan/&quot;>新房</a>
   </div>
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>{
    record<span class="hljs-selector-class">.toFang</span> &amp;&amp; record<span class="hljs-selector-class">.toKe</span> &amp;&amp; record<span class="hljs-selector-class">.toSecondHand</span>
    &amp;&amp; &lt;div&gt;
       &lt;<span class="hljs-selector-tag">a</span> style="{{"<span class="hljs-attribute">padding</span>: <span class="hljs-number">20</span>"}}" href=<span class="hljs-string">"https://bj.ke.com"</span>&gt;贝壳首页&lt;/a&gt;
       &lt;<span class="hljs-selector-tag">a</span> style="{{"<span class="hljs-attribute">padding</span>: <span class="hljs-number">20</span>"}}" href=<span class="hljs-string">"https://bj.ke.com/ershoufang/"</span>&gt;二手房&lt;/a&gt;
       &lt;<span class="hljs-selector-tag">a</span> style="{{"<span class="hljs-attribute">padding</span>: <span class="hljs-number">20</span>"}}" href=<span class="hljs-string">"https://bj.fang.ke.com/loupan/"</span>&gt;新房&lt;/a&gt;
   &lt;/div&gt;
}</code></pre>
<p>虽然代码逻辑没问题，但人生就是这样，有时候出场顺序真的很重要。突然就想起vue的v-if了。<br>没错，回归主题，就是：<strong>react中模拟<a href="https://cn.vuejs.org/v2/guide/" rel="nofollow noreferrer" target="_blank">vue</a>的<a href="https://cn.vuejs.org/v2/guide/conditional.html" rel="nofollow noreferrer" target="_blank">v-if</a></strong></p>
<p>先上代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import Hidden from './Hidden'
const App = () => {
  const record = {
    toKe: true, // 贝壳首页
    toSecondHand: true, // 二手房
    toFang: true, // 新房
  }
  return (
    <div style="{{"width: 600, margin: '50px auto'"}}">
      <ul>
        <li>
          <h3>react模拟实现vue中v-if指令</h3>
          <Hidden visible={record.toKe} tag='span'>
            <a href=&quot;https://bj.ke.com&quot;>贝壳首页</a>
          </Hidden>
          <Hidden visible={record.toSecondHand} tag='span' style="{{"padding: 20"}}">
            <a href=&quot;https://bj.ke.com/ershoufang/&quot;>二手房</a>
          </Hidden>
          <Hidden visible={record.toFang} tag='p'>
            <a href=&quot;https://bj.fang.ke.com/loupan/&quot;>新房</a>
          </Hidden>
        </li>
      </ul>
    </div>
  )
}
export default App
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> Hidden <span class="hljs-keyword">from</span> <span class="hljs-string">'./Hidden'</span>
<span class="hljs-keyword">const</span> App = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> record = {
    <span class="hljs-attr">toKe</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 贝壳首页</span>
    toSecondHand: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 二手房</span>
    toFang: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 新房</span>
  }
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"width:</span> <span class="hljs-attr">600</span>, <span class="hljs-attr">margin:</span> '<span class="hljs-attr">50px</span> <span class="hljs-attr">auto</span>'"}}"&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>react模拟实现vue中v-if指令<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Hidden</span> <span class="hljs-attr">visible</span>=<span class="hljs-string">{record.toKe}</span> <span class="hljs-attr">tag</span>=<span class="hljs-string">'span'</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://bj.ke.com"</span>&gt;</span>贝壳首页<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">Hidden</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Hidden</span> <span class="hljs-attr">visible</span>=<span class="hljs-string">{record.toSecondHand}</span> <span class="hljs-attr">tag</span>=<span class="hljs-string">'span'</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"padding:</span> <span class="hljs-attr">20</span>"}}"&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://bj.ke.com/ershoufang/"</span>&gt;</span>二手房<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">Hidden</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Hidden</span> <span class="hljs-attr">visible</span>=<span class="hljs-string">{record.toFang}</span> <span class="hljs-attr">tag</span>=<span class="hljs-string">'p'</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://bj.fang.ke.com/loupan/"</span>&gt;</span>新房<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">Hidden</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  )
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> App
</code></pre>
<p>简单就是封装Hidden组件，通过visible去控制是否渲染。</p>
<p>相信聪明的你一定知道怎么去封装Hidden</p>
<p>笔者刚开始是这么写的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'

export default class Hidden extends Component {
  render() {
    const { visible, children } = this.props
    const content = visible ? children : null
    return (
      <div>
       { content }
      </div>
    )
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t'

export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Hidden</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    const { visible, children } = <span class="hljs-keyword">this</span>.props
    const content = visible ? children : <span class="hljs-literal">null</span>
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
       { content }
      &lt;/div&gt;
    )
  }
}
</code></pre>
<p>如此简单，但笔者审查元素的时候发现，每个Hidden下的children莫名被嵌套了一层div<br>如下<br><span class="img-wrap"><img data-src="/img/bVbi3QF?w=1234&amp;h=546" src="https://static.alili.tech/img/bVbi3QF?w=1234&amp;h=546" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>原来的横着排列的元素，一下子竖着排列了。这可不太好，本来给我套个div，我都可以勉强接收，现在连我布局都给我变了。<br>怎么办？笔者突然想到使用<strong><a href="https://router.vuejs.org/zh/guide/#html" rel="nofollow noreferrer" target="_blank">vue-router</a></strong>中的<strong><a href="https://router.vuejs.org/zh/api/#tag" rel="nofollow noreferrer" target="_blank">router-link</a></strong>时，标签是可以通过tag去替换默认标签的。<br>那我们再给它个tag呗，连带自定义属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'

export default class Hidden extends Component {
  render() {
    const { visible, children, tag = 'div', ...rest } = this.props
    const content = visible ? children : null
    return (
      React.createElement(tag, rest, content)
    )
    // return (
    // 尝试用这种方法去实现，发现不符合react的规则，所以使用最原始的渲染方法
    // React.createElement
    //  `<`${tag}`>` + { content } + `</`${tag}`>` 
    // )
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t'

export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Hidden</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    const { visible, children, tag = <span class="hljs-symbol">'di</span>v', ...rest } = <span class="hljs-keyword">this</span>.props
    const content = visible ? children : <span class="hljs-literal">null</span>
    <span class="hljs-keyword">return</span> (
      <span class="hljs-type">React</span>.createElement(tag, rest, content)
    )
    <span class="hljs-comment">// return (</span>
    <span class="hljs-comment">// 尝试用这种方法去实现，发现不符合react的规则，所以使用最原始的渲染方法</span>
    <span class="hljs-comment">// React.createElement</span>
    <span class="hljs-comment">//  `&lt;`${tag}`&gt;` + { content } + `&lt;/`${tag}`&gt;` </span>
    <span class="hljs-comment">// )</span>
  }
}
</code></pre>
<p>问题：<strong>笔者的初衷是模拟vue的v-if, 所以对传入的children并没做太多处理</strong>，不建议做多做封装。有兴趣的同学可以自己玩。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    record.toFang &amp;&amp; record.toKe &amp;&amp; record.toSecondHand
    &amp;&amp; <span>
       <a style="{{"padding: 20"}}" href=&quot;https://bj.ke.com&quot;>贝壳首页</a>
       <a style="{{"padding: 20"}}" href=&quot;https://bj.ke.com/ershoufang/&quot;>二手房</a>
       <a style="{{"padding: 20"}}" href=&quot;https://bj.fang.ke.com/loupan/&quot;>新房</a>
    </span>
}
<Hidden 
   visible={record.toFang &amp;&amp; record.toKe &amp;&amp; record.toSecondHand} 
   tag='span'>
   <a href=&quot;https://bj.ke.com&quot;>贝壳首页</a>
   <a style="{{"padding: 20"}}" href=&quot;https://bj.ke.com/ershoufang/&quot;>二手房</a>
   <a style="{{"padding: 20"}}" href=&quot;https://bj.fang.ke.com/loupan/&quot;>新房</a>
</Hidden>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>{
    record<span class="hljs-selector-class">.toFang</span> &amp;&amp; record<span class="hljs-selector-class">.toKe</span> &amp;&amp; record<span class="hljs-selector-class">.toSecondHand</span>
    &amp;&amp; &lt;span&gt;
       &lt;<span class="hljs-selector-tag">a</span> style="{{"<span class="hljs-attribute">padding</span>: <span class="hljs-number">20</span>"}}" href=<span class="hljs-string">"https://bj.ke.com"</span>&gt;贝壳首页&lt;/a&gt;
       &lt;<span class="hljs-selector-tag">a</span> style="{{"<span class="hljs-attribute">padding</span>: <span class="hljs-number">20</span>"}}" href=<span class="hljs-string">"https://bj.ke.com/ershoufang/"</span>&gt;二手房&lt;/a&gt;
       &lt;<span class="hljs-selector-tag">a</span> style="{{"<span class="hljs-attribute">padding</span>: <span class="hljs-number">20</span>"}}" href=<span class="hljs-string">"https://bj.fang.ke.com/loupan/"</span>&gt;新房&lt;/a&gt;
    &lt;/span&gt;
}
&lt;Hidden 
   visible={record<span class="hljs-selector-class">.toFang</span> &amp;&amp; record<span class="hljs-selector-class">.toKe</span> &amp;&amp; record.toSecondHand} 
   tag=<span class="hljs-string">'span'</span>&gt;
   &lt;<span class="hljs-selector-tag">a</span> href=<span class="hljs-string">"https://bj.ke.com"</span>&gt;贝壳首页&lt;/a&gt;
   &lt;<span class="hljs-selector-tag">a</span> style="{{"<span class="hljs-attribute">padding</span>: <span class="hljs-number">20</span>"}}" href=<span class="hljs-string">"https://bj.ke.com/ershoufang/"</span>&gt;二手房&lt;/a&gt;
   &lt;<span class="hljs-selector-tag">a</span> style="{{"<span class="hljs-attribute">padding</span>: <span class="hljs-number">20</span>"}}" href=<span class="hljs-string">"https://bj.fang.ke.com/loupan/"</span>&gt;新房&lt;/a&gt;
&lt;/Hidden&gt;</code></pre>
<p>其实感觉也没多大用处hhhh</p>
<p>好了，讲解完毕。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React碰到v-if

## 原文链接
[https://segmentfault.com/a/1190000016897137](https://segmentfault.com/a/1190000016897137)

